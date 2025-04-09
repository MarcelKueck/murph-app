// components/features/ChatMessage.tsx
'use client';

import React, { useState, useEffect, useRef, useTransition } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { format, isWithinInterval, subMilliseconds } from 'date-fns';
import { UserRole } from '@prisma/client';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { Pencil, Trash2, Check, X, Loader2 } from 'lucide-react'; // Icons for actions
import { Textarea } from '../ui/textarea'; // For editing
import { MESSAGE_EDIT_DELETE_LIMIT_MS } from '@/lib/constants'; // Import time limit
import { toast } from 'sonner'; // For feedback
import { editMessage, deleteMessage } from '@/actions/messages'; // Import the real actions
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Type Definition
export type MessageData = {
  id: string;
  content: string;
  createdAt: string | Date; // Allow string for initial prop pass
  sender: {
    id: string;
    role: UserRole;
    firstName: string;
    lastName: string;
    image?: string | null;
  };
};

interface ChatMessageProps {
  message: MessageData;
  currentUserId: string;
  // Callbacks removed as updates are handled via Pusher
}

const messageVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
    exit: { opacity: 0, transition: { duration: 0.1 } }
};

const ChatMessage = React.forwardRef<HTMLDivElement, ChatMessageProps>(
  ({ message, currentUserId }, ref) => {
    const { id: messageId, content, createdAt, sender } = message;
    const isOwnMessage = sender.id === currentUserId;
    const messageTimestamp = new Date(createdAt); // Ensure it's a Date object

    const [isHovering, setIsHovering] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(content);
    const [isSavingEdit, startSavingTransition] = useTransition();
    const [isDeleting, startDeletingTransition] = useTransition();
    const editInputRef = useRef<HTMLTextAreaElement>(null);

    const initials = `${sender.firstName?.[0] ?? ''}${sender.lastName?.[0] ?? ''}`.toUpperCase() || '?';
    const displayName = `${sender.firstName} ${sender.lastName}`;
    const displayTime = format(messageTimestamp, 'HH:mm');

    // Calculate if message is within the editable/deletable time window
    const now = new Date();
    const isEditable = isOwnMessage && isWithinInterval(messageTimestamp, {
        start: subMilliseconds(now, MESSAGE_EDIT_DELETE_LIMIT_MS),
        end: now
    });

    // --- Edit Handlers ---
    const handleEditClick = () => {
      setIsEditing(true);
      setEditedContent(content); // Reset to original content when starting edit
    };

    const handleCancelEdit = () => {
      setIsEditing(false);
      setEditedContent(content); // Reset content if cancelled
    };

    const handleSaveEdit = async () => {
        if (!isEditable || isSavingEdit) return;
        const trimmedContent = editedContent.trim();
        if (trimmedContent === content || trimmedContent.length === 0) {
             setIsEditing(false); // Cancel if no change or empty
             return;
        }

        startSavingTransition(async () => {
            try {
                const result = await editMessage(messageId, trimmedContent); // Call real action

                 if (result.success) {
                     toast.success("Nachricht bearbeitet.");
                     // Let Pusher handle the update
                 } else {
                     toast.error("Fehler beim Bearbeiten", { description: result.message });
                     setEditedContent(content); // Revert on error
                 }
            } catch (error) {
                 toast.error("Fehler beim Bearbeiten", { description: "Ein unerwarteter Fehler ist aufgetreten." });
                 setEditedContent(content); // Revert on error
            } finally {
                 // Let transition manage loading state, just set editing false
                 setIsEditing(false);
            }
       });
    };

     // Focus input when editing starts
     useEffect(() => {
         if (isEditing && editInputRef.current) {
             editInputRef.current.focus();
             editInputRef.current.select(); // Select text
         }
     }, [isEditing]);


     // --- Delete Handler ---
     const handleDeleteConfirm = async () => {
         if (!isEditable || isDeleting) return;

         startDeletingTransition(async () => {
           try {
             const result = await deleteMessage(messageId); // Call real action

              if (result.success) {
                   toast.success("Nachricht gelöscht.");
                   // Let Pusher handle the deletion visually
              } else {
                   toast.error("Fehler beim Löschen", { description: result.message });
              }
          } catch (error) {
               toast.error("Fehler beim Löschen", { description: "Ein unerwarteter Fehler ist aufgetreten." });
          }
         });
     };

    return (
       <motion.div
        ref={ref}
        variants={messageVariants}
        initial="hidden"
        animate="visible"
        exit="exit" // Add exit animation for deletion
        layout // Animate layout changes smoothly
        className={cn(
          "group flex items-start space-x-3 py-3", // Added group for hover effects
          isOwnMessage ? "justify-end" : "justify-start"
        )}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Avatar (Other user) */}
        {!isOwnMessage && (
             <Avatar className="h-8 w-8 flex-shrink-0 border">
                <AvatarImage src={sender.image ?? undefined} alt={displayName} />
                <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
        )}

        {/* Message Bubble & Actions */}
        <div className={cn(
          "flex items-end gap-2", // Align actions to the end
          isOwnMessage ? "flex-row-reverse" : "flex-row" // Reverse for own messages
        )}>
             {/* Action Buttons (Show on hover for own editable messages) */}
             {isOwnMessage && isEditable && !isEditing && (
                 <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: isHovering ? 1 : 0, scale: isHovering ? 1 : 0.8 }}
                    transition={{ duration: 0.15 }}
                    className={cn(
                        "flex items-center gap-0.5 self-center", // Align vertically
                         isOwnMessage ? "mr-1" : "ml-1" // Margin to separate from bubble
                    )}
                 >
                    {/* Edit Button */}
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-foreground" onClick={handleEditClick} title="Bearbeiten" disabled={isSavingEdit || isDeleting}>
                        <Pencil className="h-3.5 w-3.5" />
                    </Button>
                     {/* Delete Button (Triggers Dialog) */}
                     <AlertDialog>
                        <AlertDialogTrigger asChild>
                             <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive/70 hover:text-destructive" title="Löschen" disabled={isSavingEdit || isDeleting}>
                                 <Trash2 className="h-3.5 w-3.5" />
                             </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Nachricht löschen?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Möchten Sie diese Nachricht wirklich löschen? Dies kann nicht rückgängig gemacht werden.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel disabled={isDeleting}>Abbrechen</AlertDialogCancel> {/* Disable cancel while deleting */}
                                <AlertDialogAction
                                     onClick={handleDeleteConfirm}
                                     className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                     disabled={isDeleting} // Disable while deleting
                                 >
                                     {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                                     Löschen
                                 </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                     </AlertDialog>
                 </motion.div>
             )}

            {/* Message Content OR Edit Form */}
            <div className={cn(
              "max-w-[70%] rounded-lg px-3 py-2",
              isOwnMessage ? "bg-brand-primary text-primary-foreground" : "bg-muted"
            )}>
                {!isOwnMessage && ( <p className="text-xs font-medium mb-1 text-muted-foreground">{displayName}</p> )}

                 {isEditing ? (
                     // --- Edit Mode ---
                     <div className='space-y-2'>
                         <Textarea
                              ref={editInputRef}
                              value={editedContent}
                              onChange={(e) => setEditedContent(e.target.value)}
                              disabled={isSavingEdit} // Use transition state
                              className="text-sm min-h-[60px] bg-background/20 text-current p-2 resize-none" // Style for inline editing
                              rows={2}
                              onKeyDown={(e) => {
                                  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSaveEdit(); }
                                  if (e.key === 'Escape') { handleCancelEdit(); }
                              }}
                         />
                         <div className='flex justify-end gap-1'>
                             <Button variant='ghost' size='icon' className='h-6 w-6' onClick={handleCancelEdit} disabled={isSavingEdit} title="Abbrechen">
                                 <X className='h-4 w-4'/>
                             </Button>
                             <Button variant='ghost' size='icon' className='h-6 w-6' onClick={handleSaveEdit} disabled={isSavingEdit || editedContent.trim() === content || editedContent.trim().length === 0} title="Speichern">
                                 {isSavingEdit ? <Loader2 className='h-4 w-4 animate-spin'/> : <Check className='h-4 w-4'/>}
                             </Button>
                         </div>
                     </div>
                 ) : (
                     // --- Display Mode ---
                     <>
                         <p className={cn("text-sm whitespace-pre-wrap break-words", !isOwnMessage && "text-card-foreground")}>
                             {content}
                         </p>
                         <p className={cn("text-xs mt-1", isOwnMessage ? "text-primary-foreground/70 text-right" : "text-muted-foreground text-left")}>
                             {displayTime}
                             {isEditable && isOwnMessage && <span className='ml-1 opacity-70 italic text-xs'>(Bearbeitbar)</span>} {/* Optional indicator */}
                         </p>
                     </>
                 )}
            </div>
        </div>

        {/* Avatar (Own user) */}
        {isOwnMessage && (
             <Avatar className="h-8 w-8 flex-shrink-0 border ml-3">
                <AvatarImage src={sender.image ?? undefined} alt={displayName} />
                <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
        )}
      </motion.div>
    );
  }
);

ChatMessage.displayName = "ChatMessage";

export default ChatMessage;
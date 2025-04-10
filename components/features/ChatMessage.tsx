// components/features/ChatMessage.tsx
'use client';

import React, { useState, useEffect, useRef, useTransition } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { format, isWithinInterval, subMilliseconds } from 'date-fns';
import { UserRole } from '@prisma/client';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { Pencil, Trash2, Check, X, Loader2, FileText, Sparkles, AlertTriangle } from 'lucide-react'; // Removed Brain, added AlertTriangle
import { Textarea } from '../ui/textarea';
import { MESSAGE_EDIT_DELETE_LIMIT_MS } from '@/lib/constants';
import { toast } from 'sonner';
import { editMessage, deleteMessage } from '@/actions/messages';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,
  AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { getAIDocumentSummary } from '@/actions/ai';
import {
    Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog";
import { ScrollArea } from '../ui/scroll-area';

// Type for basic document info attached to a message
type AttachedDocumentInfo = {
    id: string;
    fileName: string;
    storageUrl: string;
    mimeType: string;
    fileSize?: number | null;
};

export type MessageData = {
  id: string;
  content: string;
  createdAt: string | Date;
  sender: {
    id: string;
    role: UserRole;
    firstName: string;
    lastName: string;
    image?: string | null;
  };
  attachedDocuments?: AttachedDocumentInfo[]; // Array for docs in this message
};

interface ChatMessageProps {
  message: MessageData;
  currentUserId: string;
}

const messageVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: { opacity: 0, transition: { duration: 0.1 } }
};

// --- Component for Summarize Button and Dialog ---
const DocumentSummarizer = ({ document }: { document: AttachedDocumentInfo }) => {
    const { data: session } = useSession();
    const [isSummarizing, startSummarizeTransition] = useTransition();
    const [summaryResult, setSummaryResult] = useState<string | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const canSummarize = session?.user?.role === UserRole.STUDENT || session?.user?.role === UserRole.ADMIN;
    const isPdf = document.mimeType === 'application/pdf';

    if (!isPdf || !canSummarize) {
        return null; // Don't render button if not PDF or not authorized
    }

    // Fetch summary only when dialog opens and no result/fetch is active
    const fetchSummary = () => {
        if (isSummarizing || summaryResult) return;
        console.log(`Fetching summary for doc ${document.id}...`);
        startSummarizeTransition(async () => {
            const result = await getAIDocumentSummary(document.id);
            const message = result.success ? result.message : `Fehler: ${result.message}`;
            setSummaryResult(message);
            if (!result.success) {
                toast.error("Fehler bei der Zusammenfassung", { description: result.message });
            }
        });
    }

    // Fetch when dialog becomes open
    useEffect(() => {
       if (isDialogOpen && !summaryResult && !isSummarizing) {
            fetchSummary();
       }
    }, [isDialogOpen]); // Dependency: only run when dialog open state changes


    const onOpenChange = (open: boolean) => {
        if (!open) {
            // Delay clearing result to allow fade-out animation of dialog
            setTimeout(() => setSummaryResult(null), 150);
        }
        setIsDialogOpen(open);
    }

    return (
         // Root Dialog controls open state
         <Dialog open={isDialogOpen} onOpenChange={onOpenChange}>
             {/* Trigger is now always inside Dialog */}
             <DialogTrigger asChild>
                 <Button
                     variant="ghost"
                     size="sm"
                     className="h-auto px-1 py-0.5 text-xs opacity-80 hover:opacity-100"
                     disabled={isSummarizing} // Disable trigger only while actually fetching
                     title={`Dokument "${document.fileName}" zusammenfassen (KI)`}
                 >
                     {/* Show spinner only if dialog is open AND summarizing */}
                     {(isDialogOpen && isSummarizing) ? (
                         <Loader2 className="h-3 w-3 animate-spin" />
                     ) : (
                         <Sparkles className="h-3 w-3" /> // Use Sparkles for AI trigger
                     )}
                 </Button>
             </DialogTrigger>
             {/* Dialog Content */}
             <DialogContent className="sm:max-w-lg">
                 <DialogHeader>
                     <DialogTitle>KI-Zusammenfassung: {document.fileName}</DialogTitle>
                     <DialogDescription>
                         Dies ist eine automatisch generierte Zusammenfassung. Bitte prüfen Sie die Inhalte.
                     </DialogDescription>
                 </DialogHeader>
                 <ScrollArea className="max-h-[60vh] my-4 pr-4 min-h-[100px]">
                     {isSummarizing && ( <div className="flex justify-center items-center py-10"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div> )}
                     {!isSummarizing && summaryResult && (
                         <div className="text-sm whitespace-pre-wrap">
                             {summaryResult.startsWith('Fehler:') ? (
                                 <p className="text-destructive flex items-start gap-2"><AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0"/><span>{summaryResult}</span></p>
                             ) : (
                                 <p className="text-muted-foreground">{summaryResult}</p>
                             )}
                         </div>
                     )}
                      {/* Show initial loading text before fetch completes */}
                      {!isSummarizing && !summaryResult && ( <div className="flex justify-center items-center py-10 text-muted-foreground italic">Zusammenfassung wird geladen...</div> )}
                 </ScrollArea>
             </DialogContent>
        </Dialog>
    );
};
// --- End DocumentSummarizer Component ---


const ChatMessage = React.forwardRef<HTMLDivElement, ChatMessageProps>(
  ({ message, currentUserId }, ref) => {
    const { id: messageId, content, createdAt, sender, attachedDocuments } = message;
    const isOwnMessage = sender.id === currentUserId;
    const messageTimestamp = new Date(createdAt);

    const [isHovering, setIsHovering] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(content);
    const [isSavingEdit, startSavingTransition] = useTransition();
    const [isDeleting, startDeletingTransition] = useTransition();
    const editInputRef = useRef<HTMLTextAreaElement>(null);

    const initials = `${sender.firstName?.[0] ?? ''}${sender.lastName?.[0] ?? ''}`.toUpperCase() || '?';
    const displayName = `${sender.firstName} ${sender.lastName}`;
    const displayTime = format(messageTimestamp, 'HH:mm');
    const now = new Date();
    // Disable edit/delete if documents are attached for simplicity
    const isEditable = isOwnMessage && !attachedDocuments?.length && isWithinInterval(messageTimestamp, {
        start: subMilliseconds(now, MESSAGE_EDIT_DELETE_LIMIT_MS),
        end: now
    });

    const handleEditClick = () => { setIsEditing(true); setEditedContent(content); };
    const handleCancelEdit = () => { setIsEditing(false); setEditedContent(content); };
    const handleSaveEdit = async () => {
        if (!isEditable || isSavingEdit) return;
        const trimmedContent = editedContent.trim();
        if (trimmedContent === content || trimmedContent.length === 0) { setIsEditing(false); return; }
        startSavingTransition(async () => {
            try {
                const result = await editMessage(messageId, trimmedContent);
                 if (result.success) { toast.success("Nachricht bearbeitet."); }
                 else { toast.error("Fehler beim Bearbeiten", { description: result.message }); setEditedContent(content); }
            } catch (error) { toast.error("Fehler beim Bearbeiten", { description: "Ein unerwarteter Fehler ist aufgetreten." }); setEditedContent(content); }
            finally { setIsEditing(false); } // Always exit edit mode after attempt
        });
    };

     useEffect(() => {
         if (isEditing && editInputRef.current) { editInputRef.current.focus(); editInputRef.current.select(); }
     }, [isEditing]);

     const handleDeleteConfirm = async () => {
         if (!isEditable || isDeleting) return;
         startDeletingTransition(async () => {
           try {
             const result = await deleteMessage(messageId);
              if (result.success) { toast.success("Nachricht gelöscht."); }
              else { toast.error("Fehler beim Löschen", { description: result.message }); }
          } catch (error) { toast.error("Fehler beim Löschen", { description: "Ein unerwarteter Fehler ist aufgetreten." }); }
         });
     };

    const hasTextContent = content && content.trim().length > 0;
    const hasAttachments = attachedDocuments && attachedDocuments.length > 0;
    const hasVisibleContent = hasTextContent || hasAttachments; // Render bubble if text OR attachments

    return (
       <motion.div
        ref={ref}
        variants={messageVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        layout
        className={cn("group flex items-start space-x-3 py-3", isOwnMessage ? "justify-end" : "justify-start")}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Avatar (Other user) */}
        {!isOwnMessage && ( <Avatar className="h-8 w-8 flex-shrink-0 border"> <AvatarImage src={sender.image ?? undefined} alt={displayName} /> <AvatarFallback>{initials}</AvatarFallback> </Avatar> )}

        {/* Message Bubble & Actions */}
        <div className={cn("flex items-end gap-2", isOwnMessage ? "flex-row-reverse" : "flex-row")}>
             {/* Action Buttons (Show on hover for own editable messages WITHOUT attachments) */}
             {isOwnMessage && isEditable && !isEditing && (
                 <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: isHovering ? 1 : 0, scale: isHovering ? 1 : 0.8 }}
                    transition={{ duration: 0.15 }}
                    className={cn( "flex items-center gap-0.5 self-center", isOwnMessage ? "mr-1" : "ml-1" )}
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
                                <AlertDialogCancel disabled={isDeleting}>Abbrechen</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive text-destructive-foreground hover:bg-destructive/90" disabled={isDeleting} >
                                     {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                                     Löschen
                                 </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                     </AlertDialog>
                 </motion.div>
             )}

            {/* Message Content OR Edit Form */}
            {hasVisibleContent && (
                <div className={cn( "max-w-[70%] rounded-lg px-3 py-2", isOwnMessage ? "bg-brand-primary text-primary-foreground" : "bg-muted" )}>
                    {!isOwnMessage && ( <p className="text-xs font-medium mb-1 text-muted-foreground">{displayName}</p> )}

                     {isEditing ? (
                         // --- Edit Mode ---
                         <div className='space-y-2'>
                             <Textarea ref={editInputRef} value={editedContent} onChange={(e) => setEditedContent(e.target.value)} disabled={isSavingEdit} className="text-sm min-h-[60px] bg-background/20 text-current p-2 resize-none" rows={2} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSaveEdit(); } if (e.key === 'Escape') { handleCancelEdit(); } }} />
                             <div className='flex justify-end gap-1'>
                                 <Button variant='ghost' size='icon' className='h-6 w-6' onClick={handleCancelEdit} disabled={isSavingEdit} title="Abbrechen"><X className='h-4 w-4'/></Button>
                                 <Button variant='ghost' size='icon' className='h-6 w-6' onClick={handleSaveEdit} disabled={isSavingEdit || editedContent.trim() === content || editedContent.trim().length === 0} title="Speichern">{isSavingEdit ? <Loader2 className='h-4 w-4 animate-spin'/> : <Check className='h-4 w-4'/>}</Button>
                             </div>
                         </div>
                     ) : (
                         // --- Display Mode ---
                         <>
                            {/* Display Text Content if it exists */}
                            {hasTextContent && (
                                <p className={cn("text-sm whitespace-pre-wrap break-words", !isOwnMessage && "text-card-foreground")}>
                                    {content}
                                </p>
                            )}

                            {/* Display Attached Documents if they exist */}
                            {hasAttachments && attachedDocuments && ( // Check attachedDocuments exists before mapping
                                <div className={cn( "mt-2 pt-2 space-y-1.5", hasTextContent ? (isOwnMessage ? "border-t border-primary-foreground/30" : "border-t border-muted-foreground/20") : "" )}>
                                    {attachedDocuments.map(doc => (
                                         <div key={doc.id} className="flex items-center justify-between gap-1">
                                            <Link href={doc.storageUrl} target="_blank" rel="noopener noreferrer" className={cn( "flex items-center gap-1.5 text-xs px-2 py-1 rounded max-w-[calc(100%-2rem)]", isOwnMessage ? "bg-brand-primary/80 hover:bg-brand-primary/70 text-primary-foreground" : "bg-background/50 hover:bg-background/80 text-foreground", )} title={`Öffne ${doc.fileName}`} >
                                                <FileText className="h-3.5 w-3.5 flex-shrink-0" />
                                                <span className="truncate">{doc.fileName}</span>
                                            </Link>
                                             {/* Render Summarize Button Here */}
                                             <DocumentSummarizer document={doc} />
                                         </div>
                                    ))}
                                </div>
                            )}

                             {/* Timestamp and Edit Indicator */}
                             <p className={cn( "text-xs mt-1.5", isOwnMessage ? "text-primary-foreground/70 text-right" : "text-muted-foreground text-left" )}>
                                 {displayTime}
                                 {isEditable && isOwnMessage && <span className='ml-1 opacity-70 italic text-xs'>(Bearbeitbar)</span>}
                             </p>
                         </>
                     )}
                </div>
             )}
        </div>

        {/* Avatar (Own user) */}
        {isOwnMessage && ( <Avatar className="h-8 w-8 flex-shrink-0 border ml-3"> <AvatarImage src={sender.image ?? undefined} alt={displayName} /> <AvatarFallback>{initials}</AvatarFallback> </Avatar> )}
      </motion.div>
    );
  }
);

ChatMessage.displayName = "ChatMessage";

export default ChatMessage;
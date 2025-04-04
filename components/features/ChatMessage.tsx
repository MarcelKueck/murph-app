// components/features/ChatMessage.tsx
'use client'; // Ensure this is a client component

import React from 'react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { format } from 'date-fns';
import { UserRole } from '@prisma/client';
import { motion } from 'framer-motion'; // Import motion

// Define type for the message data expected by this component
export type MessageData = {
  id: string;
  content: string;
  createdAt: string | Date;
  sender: {
    id: string;
    role: UserRole;
    firstName: string;
    lastName: string;
    // image?: string | null;
  };
};

interface ChatMessageProps {
  message: MessageData;
  currentUserId: string;
}

// Define animation variants for the message
const messageVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: { opacity: 0, transition: { duration: 0.1 } } // Optional exit animation
};

// Use React.forwardRef to allow AnimatePresence to track the component
const ChatMessage = React.forwardRef<HTMLDivElement, ChatMessageProps>(
  ({ message, currentUserId }, ref) => {
    const { content, createdAt, sender } = message;
    const isOwnMessage = sender.id === currentUserId;

    const initials = `${sender.firstName?.[0] ?? ''}${sender.lastName?.[0] ?? ''}`.toUpperCase() || '?';
    const displayName = `${sender.firstName} ${sender.lastName}`;
    const displayTime = format(new Date(createdAt), 'HH:mm');

    return (
       // Wrap the entire message div with motion.div
       <motion.div
        ref={ref} // Forward the ref here
        variants={messageVariants}
        initial="hidden"
        animate="visible"
        exit="exit" // Define exit animation if needed with AnimatePresence
        layout // Add layout prop for smoother animations if list reorders/resizes
        className={cn(
          "flex items-start space-x-3 py-3",
          isOwnMessage ? "justify-end" : "justify-start"
        )}
      >
        {/* Avatar (Show for other user's messages) */}
        {!isOwnMessage && (
          <Avatar className="h-8 w-8 flex-shrink-0">
            {/* <AvatarImage src={sender.image || undefined} alt={displayName} /> */}
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        )}

        {/* Message Bubble */}
        <div className={cn(
          "max-w-[70%] rounded-lg px-3 py-2",
          isOwnMessage
            ? "bg-brand-primary text-primary-foreground"
            : "bg-muted"
        )}>
          {/* Sender Name (Show for other user's messages) */}
          {!isOwnMessage && (
            <p className="text-xs font-medium mb-1 text-muted-foreground">{displayName}</p>
          )}
          {/* Message Content */}
          <p className={cn(
            "text-sm whitespace-pre-wrap break-words",
            !isOwnMessage && "text-card-foreground"
          )}>
            {content}
          </p>
          {/* Timestamp */}
          <p className={cn(
            "text-xs mt-1",
            isOwnMessage ? "text-primary-foreground/70 text-right" : "text-muted-foreground text-left"
          )}>
            {displayTime}
          </p>
        </div>
      </motion.div>
    );
  }
);

ChatMessage.displayName = "ChatMessage"; // Add display name for forwardRef component

export default ChatMessage;
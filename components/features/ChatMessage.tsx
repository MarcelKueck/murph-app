// components/features/ChatMessage.tsx
'use client';

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Import AvatarImage
import { cn } from "@/lib/utils";
import { format } from 'date-fns';
import { UserRole } from '@prisma/client';
import { motion } from 'framer-motion';

// Update MessageData type
export type MessageData = {
  id: string;
  content: string;
  createdAt: string | Date;
  sender: {
    id: string;
    role: UserRole;
    firstName: string;
    lastName: string;
    image?: string | null; // <<< Add image field
  };
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

const ChatMessage = React.forwardRef<HTMLDivElement, ChatMessageProps>(
  ({ message, currentUserId }, ref) => {
    const { content, createdAt, sender } = message;
    const isOwnMessage = sender.id === currentUserId;

    const initials = `${sender.firstName?.[0] ?? ''}${sender.lastName?.[0] ?? ''}`.toUpperCase() || '?';
    const displayName = `${sender.firstName} ${sender.lastName}`;
    const displayTime = format(new Date(createdAt), 'HH:mm');

    return (
       <motion.div
        ref={ref}
        variants={messageVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        layout
        className={cn(
          "flex items-start space-x-3 py-3",
          isOwnMessage ? "justify-end" : "justify-start"
        )}
      >
        {/* Avatar (Show for other user's messages) */}
        {!isOwnMessage && (
          <Avatar className="h-8 w-8 flex-shrink-0 border"> {/* Added border */}
            <AvatarImage src={sender.image ?? undefined} alt={displayName} /> {/* <<< Use sender.image */}
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
          {!isOwnMessage && (
            <p className="text-xs font-medium mb-1 text-muted-foreground">{displayName}</p>
          )}
          <p className={cn(
            "text-sm whitespace-pre-wrap break-words",
            !isOwnMessage && "text-card-foreground"
          )}>
            {content}
          </p>
          <p className={cn(
            "text-xs mt-1",
            isOwnMessage ? "text-primary-foreground/70 text-right" : "text-muted-foreground text-left"
          )}>
            {displayTime}
          </p>
        </div>

        {/* Optional: Show own avatar on the right */}
        {isOwnMessage && (
           <Avatar className="h-8 w-8 flex-shrink-0 border ml-3"> {/* Added border & margin */}
             <AvatarImage src={sender.image ?? undefined} alt={displayName} /> {/* <<< Use sender.image */}
             <AvatarFallback>{initials}</AvatarFallback>
           </Avatar>
        )}
      </motion.div>
    );
  }
);

ChatMessage.displayName = "ChatMessage";

export default ChatMessage;
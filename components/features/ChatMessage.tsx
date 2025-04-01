// components/features/ChatMessage.tsx
import React from 'react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { format } from 'date-fns';
import { UserRole } from '@prisma/client';

// Define type for the message data expected by this component
// Matches the Pusher payload structure and initial fetch structure
export type MessageData = {
  id: string;
  content: string;
  createdAt: string | Date; // Can be string from Pusher/API or Date from initial fetch
  sender: {
    id: string;
    role: UserRole;
    firstName: string;
    lastName: string;
    // image?: string | null; // Add image later if needed
  };
};

interface ChatMessageProps {
  message: MessageData;
  currentUserId: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, currentUserId }) => {
  const { content, createdAt, sender } = message;
  const isOwnMessage = sender.id === currentUserId;

  const initials = `${sender.firstName?.[0] ?? ''}${sender.lastName?.[0] ?? ''}`.toUpperCase() || '?';
  const displayName = `${sender.firstName} ${sender.lastName}`;
  const displayTime = format(new Date(createdAt), 'HH:mm'); // Format time only

  return (
    <div className={cn(
      "flex items-start space-x-3 py-3",
      isOwnMessage ? "justify-end" : "justify-start"
    )}>
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

      {/* Avatar (Show for own messages on the right? Optional) */}
      {/* {isOwnMessage && ( ... Avatar ... )} */}

    </div>
  );
};

export default ChatMessage;
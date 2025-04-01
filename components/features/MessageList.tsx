// components/features/MessageList.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import ChatMessage, { MessageData } from './ChatMessage'; // Component for a single message

interface MessageListProps {
  messages: MessageData[]; // Array of message objects
  currentUserId: string;   // ID of the user viewing the list
}

const MessageList: React.FC<MessageListProps> = ({ messages, currentUserId }) => {
  // Ref to the dummy div at the end of the list for scrolling
  const messagesEndRef = useRef<HTMLDivElement>(null);

  /**
   * Effect to automatically scroll to the bottom when the 'messages' array changes.
   */
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    // Container div: flex-1 makes it grow, overflow-y-auto enables scrolling
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {/* Map through the messages array and render a ChatMessage component for each */}
      {messages.map((msg) => {
        // Ensure a unique key is provided for each message in the list
        return <ChatMessage key={msg.id} message={msg} currentUserId={currentUserId} />;
      })}
      {/* An empty div at the very end of the list. We scroll this into view. */}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
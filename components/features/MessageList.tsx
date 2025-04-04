// components/features/MessageList.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import ChatMessage, { MessageData } from './ChatMessage';
import { AnimatePresence, motion } from 'framer-motion'; // Import AnimatePresence and motion

interface MessageListProps {
  messages: MessageData[];
  currentUserId: string;
}

const MessageList: React.FC<MessageListProps> = ({ messages, currentUserId }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null); // Ref for the scrolling container

  // Scroll to bottom effect
  useEffect(() => {
    // Scroll immediately when messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "auto" }); // Use 'auto' for immediate scroll with AnimatePresence
    }

    // Optional: Smooth scroll only if user is already near the bottom
    // const listElement = listRef.current;
    // if (listElement) {
    //   const isScrolledToBottom = listElement.scrollHeight - listElement.clientHeight <= listElement.scrollTop + 100; // 100px threshold
    //   if (isScrolledToBottom) {
    //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    //   }
    // }

  }, [messages]);


  return (
    // Add ref to the scrolling container
    <div ref={listRef} className="flex-1 overflow-y-auto p-4 space-y-0"> {/* Remove space-y-4, handled by message margin */}
      {/* Wrap the list mapping with AnimatePresence */}
      <AnimatePresence initial={false}> {/* initial=false prevents initial animation on load */}
        {messages.map((msg) => (
          <ChatMessage
             key={msg.id} // Key must be on the direct child of AnimatePresence
             message={msg}
             currentUserId={currentUserId}
           />
        ))}
      </AnimatePresence>
      {/* Dummy div for scrolling */}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
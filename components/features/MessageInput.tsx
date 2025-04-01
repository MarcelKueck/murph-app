// components/features/MessageInput.tsx
'use client';

import React, { useState, useTransition } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { SendHorizontal, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface MessageInputProps {
  consultationId: string;
  onMessageSent: (newMessage: any) => void; // Callback to update UI optimistically
  disabled?: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({ consultationId, onMessageSent, disabled = false }) => {
  const [content, setContent] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleSend = async () => {
    const trimmedContent = content.trim();
    if (!trimmedContent || isPending) return;

    setContent(''); // Clear input immediately

    startTransition(async () => {
       try {
            const response = await fetch('/api/nachrichten', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ consultationId, content: trimmedContent }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }

            const newMessage = await response.json();
            // Callback to update parent's message list optimistically
            // Note: Pusher will also send this, parent needs to handle potential duplicates
            onMessageSent(newMessage);

        } catch (error) {
            console.error("Failed to send message:", error);
            toast.error("Fehler beim Senden", {
                description: error instanceof Error ? error.message : "Nachricht konnte nicht gesendet werden.",
            });
             // Optionally: Restore content on error?
             setContent(trimmedContent);
        }
    });
  };

   // Handle Shift+Enter for newline, Enter for send
   const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
     if (event.key === 'Enter' && !event.shiftKey) {
       event.preventDefault(); // Prevent default newline on Enter
       handleSend();
     }
   };


  return (
    <div className="flex items-center p-4 border-t bg-background">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Schreiben Sie Ihre Nachricht..."
        className="flex-1 mr-2 resize-none" // Prevent resize handle
        rows={1} // Start with 1 row, expands automatically
        disabled={disabled || isPending}
      />
      <Button onClick={handleSend} disabled={!content.trim() || disabled || isPending} size="icon">
        {isPending ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <SendHorizontal className="h-5 w-5" />
        )}
         <span className="sr-only">Nachricht senden</span>
      </Button>
    </div>
  );
};

export default MessageInput;
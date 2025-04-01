// components/features/ChatInterface.tsx
'use client';

import React, { useState, useCallback, useEffect } from 'react';
import MessageList from './MessageList'; // Component to render the list of messages
import MessageInput from './MessageInput'; // Component for typing and sending messages
import DocumentLink from './DocumentLink'; // Component to display links to documents
import { usePusherSubscription } from '@/hooks/usePusherSubscription'; // Custom hook for Pusher interaction
import { MessageData } from './ChatMessage'; // Shared type definition for message structure
import { ConsultationStatus } from '@prisma/client'; // Enum for consultation status
import { AlertCircle } from 'lucide-react'; // Icon for alerts
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"; // Alert component for UI feedback
import { pusherClient } from '@/lib/pusher/client'; // The configured Pusher client instance

// Define types for initial data passed as props from the server component
type InitialDocument = {
  id: string;
  fileName: string;
  storageUrl: string;
  mimeType: string;
  fileSize?: number | null;
};

type InitialMessage = MessageData; // Reuse the MessageData type for initial messages

interface ChatInterfaceProps {
  consultationId: string; // ID of the current consultation
  currentUserId: string;  // ID of the user viewing the chat
  initialMessages: InitialMessage[]; // Messages fetched initially from the server
  initialDocuments: InitialDocument[]; // Documents fetched initially from the server
  consultationStatus: ConsultationStatus; // Current status of the consultation
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  consultationId,
  currentUserId,
  initialMessages,
  initialDocuments,
  consultationStatus,
}) => {
  // State to hold the list of messages displayed in the chat
  const [messages, setMessages] = useState<MessageData[]>(initialMessages);
  // State to hold the list of documents
  const [documents, setDocuments] = useState<InitialDocument[]>(initialDocuments);
  // State to track the real-time connection status
  const [isConnected, setIsConnected] = useState(true); // Assume connected initially

  /**
   * Callback function to handle new messages received via Pusher.
   * It ignores messages sent by the current user.
   */
  const handleIncomingMessage = useCallback((newMessage: MessageData) => {
    // Ignore own messages received via Pusher broadcast
    if (newMessage.sender.id === currentUserId) {
        return;
    }

    // Add message from another user, preventing duplicates.
    setMessages((currentMessages) => {
      if (!currentMessages.some(msg => msg.id === newMessage.id)) {
        const updatedMessages = [...currentMessages, newMessage];
        return updatedMessages;
      }
      return currentMessages;
    });
  }, [currentUserId]);

  // Set up the Pusher subscription using the custom hook
  const channelName = `private-consultation-${consultationId}`;
  usePusherSubscription(
      channelName,          // Channel to subscribe to
      'new-message',        // Event name to listen for
      handleIncomingMessage // Callback function to execute when event occurs
  );

  /**
   * Effect to monitor the Pusher connection state.
   */
  useEffect(() => {
    if (!pusherClient) return;
    const handleConnectionChange = () => {
      setIsConnected(pusherClient?.connection.state === 'connected');
    }
    pusherClient.connection.bind('state_change', handleConnectionChange);
    handleConnectionChange(); // Set initial state
    return () => {
      pusherClient?.connection.unbind('state_change', handleConnectionChange);
    }
  }, []); // Runs only on mount and unmount

  /**
   * Callback function passed to MessageInput for optimistic UI update.
   */
  const handleMessageSent = (newMessage: MessageData) => {
    setMessages((currentMessages) => {
      const updatedMessages = [...currentMessages, newMessage];
      return updatedMessages;
    });
  };

  // Determine if the chat input should be disabled
  const isChatDisabled = consultationStatus !== ConsultationStatus.IN_PROGRESS;

  // Render the Chat UI
  return (
    <div className="flex flex-col h-[calc(100vh-22rem)] md:h-[calc(100vh-18rem)] border rounded-lg overflow-hidden bg-card"> {/* Adjusted height */}

       {/* Connection Status Indicator */}
       {!isConnected && (
           <div className="p-2 bg-yellow-100 text-yellow-800 text-xs text-center border-b border-yellow-200">
                Verbindung zum Echtzeit-Chat wird hergestellt... (Nachrichten könnten verzögert ankommen)
           </div>
       )}

        {/* Display Documents */}
        {documents.length > 0 && (
            <div className="p-4 border-b max-h-40 md:max-h-48 overflow-y-auto bg-muted/30">
                 <h3 className="text-sm font-medium mb-2 text-foreground/80">Dokumente</h3>
                 {documents.map(doc => <DocumentLink key={doc.id} document={doc} />)}
            </div>
        )}

        {/* The main list where messages are displayed */}
        <MessageList messages={messages} currentUserId={currentUserId} />

        {/* Input area: Show input or a status message */}
         {isChatDisabled ? (
             <div className="p-4 text-center text-sm text-muted-foreground border-t bg-muted/50">
                {/* Display appropriate message based on why chat is disabled */}
                {consultationStatus === ConsultationStatus.COMPLETED
                    ? "Diese Beratung wurde abgeschlossen."
                    : consultationStatus === ConsultationStatus.REQUESTED
                    ? "Diese Beratung wurde noch nicht von einem Studenten angenommen."
                     : consultationStatus === ConsultationStatus.CANCELLED
                     ? "Diese Beratung wurde abgebrochen."
                    : "Der Chat ist derzeit nicht verfügbar."}
            </div>
         ) : (
             // Render the message input component if chat is active
            <MessageInput
                consultationId={consultationId}
                onMessageSent={handleMessageSent} // Pass callback for optimistic update
                disabled={isChatDisabled || !isConnected} // Also disable if not connected
            />
         )}
    </div>
  );
};

export default ChatInterface;
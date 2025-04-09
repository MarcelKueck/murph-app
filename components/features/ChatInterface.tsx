// components/features/ChatInterface.tsx
'use client';

import React, { useState, useCallback, useEffect } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import DocumentLink from './DocumentLink';
import { usePusherSubscription } from '@/hooks/usePusherSubscription';
import { MessageData } from './ChatMessage';
import { ConsultationStatus } from '@prisma/client';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { pusherClient } from '@/lib/pusher/client';

type InitialDocument = {
  id: string;
  fileName: string;
  storageUrl: string;
  mimeType: string;
  fileSize?: number | null;
};

type InitialMessage = MessageData;

interface ChatInterfaceProps {
  consultationId: string;
  currentUserId: string;
  initialMessages: InitialMessage[];
  initialDocuments: InitialDocument[];
  consultationStatus: ConsultationStatus;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  consultationId,
  currentUserId,
  initialMessages,
  initialDocuments,
  consultationStatus,
}) => {
  const [messages, setMessages] = useState<MessageData[]>(initialMessages);
  const [documents, setDocuments] = useState<InitialDocument[]>(initialDocuments);
  const [isConnected, setIsConnected] = useState(true);

  // --- Pusher Event Handlers ---
  const handleIncomingMessage = useCallback((newMessage: MessageData) => {
    // Ignore self-messages received via Pusher (optimistic update handles this)
    if (newMessage.sender.id === currentUserId) {
       console.log("Pusher: Ignoring self-sent new message.");
       return;
    }
    setMessages((currentMessages) => {
      // Add message only if it doesn't already exist
      if (!currentMessages.some(msg => msg.id === newMessage.id)) {
        console.log("Pusher: Adding new message", newMessage.id);
        return [...currentMessages, newMessage];
      }
      console.log("Pusher: Duplicate new message ignored", newMessage.id);
      return currentMessages;
    });
  }, [currentUserId]);

 const handleMessageUpdated = useCallback((updatedData: { id: string; content: string }) => {
     console.log("Pusher: Handling message-updated", updatedData.id);
     setMessages((currentMessages) =>
       currentMessages.map((msg) =>
         msg.id === updatedData.id ? { ...msg, content: updatedData.content } : msg
       )
     );
 }, []); // Empty dependency array as it doesn't depend on external state

 const handleMessageDeleted = useCallback((deletedData: { id: string }) => {
      console.log("Pusher: Handling message-deleted", deletedData.id);
     setMessages((currentMessages) =>
       currentMessages.filter((msg) => msg.id !== deletedData.id)
     );
 }, []); // Empty dependency array
  // --- End Pusher Handlers ---


  // Setup Pusher subscriptions
  const channelName = `private-consultation-${consultationId}`;
  usePusherSubscription(channelName, 'new-message', handleIncomingMessage);
  usePusherSubscription(channelName, 'message-updated', handleMessageUpdated);
  usePusherSubscription(channelName, 'message-deleted', handleMessageDeleted);


  // Monitor Pusher connection state effect
  useEffect(() => {
    if (!pusherClient) return;
    const handleConnectionChange = () => {
      setIsConnected(pusherClient?.connection.state === 'connected');
    } ;
    pusherClient.connection.bind('state_change', handleConnectionChange);
    handleConnectionChange(); // Set initial state
    return () => {
      pusherClient?.connection.unbind('state_change', handleConnectionChange);
    }
  }, []);

  // Callback for optimistic UI update when *sending* a message
  const handleMessageSent = (newMessage: MessageData) => {
    setMessages((currentMessages) => {
        // Ensure no duplicate addition if Pusher is fast
       if (!currentMessages.some(msg => msg.id === newMessage.id)) {
           console.log("Optimistic: Adding sent message", newMessage.id);
           return [...currentMessages, newMessage];
       }
        console.log("Optimistic: Duplicate sent message ignored", newMessage.id);
       return currentMessages;
    });
  };

  const isChatDisabled = consultationStatus !== ConsultationStatus.IN_PROGRESS;

  return (
    <div className="flex flex-col h-[calc(100vh-22rem)] md:h-[calc(100vh-18rem)] border rounded-lg overflow-hidden bg-card">
       {/* Connection Status */}
       {!isConnected && (
           <div className="p-2 bg-yellow-100 text-yellow-800 text-xs text-center border-b border-yellow-200">
                Verbindung zum Echtzeit-Chat wird hergestellt...
           </div>
       )}

        {/* Documents Display */}
        {documents.length > 0 && (
            <div className="p-4 border-b max-h-40 md:max-h-48 overflow-y-auto bg-muted/30">
                 <h3 className="text-sm font-medium mb-2 text-foreground/80">Dokumente</h3>
                 {documents.map(doc => <DocumentLink key={doc.id} document={doc} />)}
            </div>
        )}

        {/* Message List */}
        <MessageList messages={messages} currentUserId={currentUserId} />

        {/* Input Area or Disabled Message */}
         {isChatDisabled ? (
             <div className="p-4 text-center text-sm text-muted-foreground border-t bg-muted/50">
                { consultationStatus === ConsultationStatus.COMPLETED ? "Diese Beratung wurde abgeschlossen."
                  : consultationStatus === ConsultationStatus.REQUESTED ? "Diese Beratung wurde noch nicht von einem Studenten angenommen."
                  : consultationStatus === ConsultationStatus.CANCELLED ? "Diese Beratung wurde abgebrochen."
                  : "Der Chat ist derzeit nicht verfügbar."}
            </div>
         ) : (
            // Render MessageInput only when chat is active
            <MessageInput
                consultationId={consultationId}
                onMessageSent={handleMessageSent} // Optimistic update for *sending*
                disabled={isChatDisabled || !isConnected}
            />
         )}
    </div>
  );
};

export default ChatInterface;
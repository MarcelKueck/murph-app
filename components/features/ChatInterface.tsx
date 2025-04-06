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
  // REMOVED: patientQuestion?: string; // Removed as Explanation Draft feature is removed
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  consultationId,
  currentUserId,
  initialMessages,
  initialDocuments,
  consultationStatus,
  // REMOVED: patientQuestion
}) => {
  const [messages, setMessages] = useState<MessageData[]>(initialMessages);
  const [documents, setDocuments] = useState<InitialDocument[]>(initialDocuments);
  const [isConnected, setIsConnected] = useState(true);

  // Callback for incoming Pusher messages
  const handleIncomingMessage = useCallback((newMessage: MessageData) => {
    if (newMessage.sender.id === currentUserId) {
        return; // Ignore self-messages from Pusher
    }
    setMessages((currentMessages) => {
      if (!currentMessages.some(msg => msg.id === newMessage.id)) {
        return [...currentMessages, newMessage];
      }
      return currentMessages;
    });
  }, [currentUserId]);

  // Setup Pusher subscription hook
  const channelName = `private-consultation-${consultationId}`;
  usePusherSubscription(channelName, 'new-message', handleIncomingMessage);

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

  // Callback for optimistic UI update when message is sent
  const handleMessageSent = (newMessage: MessageData) => {
    setMessages((currentMessages) => {
       if (!currentMessages.some(msg => msg.id === newMessage.id)) {
           return [...currentMessages, newMessage];
       }
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
                onMessageSent={handleMessageSent}
                disabled={isChatDisabled || !isConnected}
                // REMOVED: patientQuestion prop removed
            />
         )}
    </div>
  );
};

export default ChatInterface;
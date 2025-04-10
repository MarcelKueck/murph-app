// components/features/ChatInterface.tsx
'use client';

import React, { useState, useCallback, useEffect } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import DocumentLink from './DocumentLink';
import { usePusherSubscription } from '@/hooks/usePusherSubscription';
import { MessageData } from './ChatMessage';
import { ConsultationStatus, UserRole } from '@prisma/client'; // Added UserRole
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { pusherClient } from '@/lib/pusher/client';
import { toast } from 'sonner'; // Added toast for potential notifications

// Use a more descriptive type name
type DocumentDataForUI = {
  id: string;
  fileName: string;
  storageUrl: string;
  mimeType: string;
  fileSize?: number | null;
  // Add uploaderId if needed for display logic later
  uploaderId?: string;
};

type InitialMessage = MessageData;

interface ChatInterfaceProps {
  consultationId: string;
  currentUserId: string;
  initialMessages: InitialMessage[];
  initialDocuments: DocumentDataForUI[]; // Use updated type name
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
  const [documents, setDocuments] = useState<DocumentDataForUI[]>(initialDocuments); // Use updated type name
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
 }, []);

 const handleMessageDeleted = useCallback((deletedData: { id: string }) => {
      console.log("Pusher: Handling message-deleted", deletedData.id);
     setMessages((currentMessages) =>
       currentMessages.filter((msg) => msg.id !== deletedData.id)
     );
 }, []);

 // Handler for new documents
 const handleNewDocument = useCallback((newDocument: DocumentDataForUI) => {
     console.log("Pusher: Handling new-document", newDocument.id);
     setDocuments((currentDocuments) => {
         // Add document only if it doesn't already exist
         if (!currentDocuments.some(doc => doc.id === newDocument.id)) {
             console.log("Pusher: Adding new document", newDocument.fileName);
             // Add to the end of the list
             return [...currentDocuments, newDocument];
         }
         return currentDocuments;
     });
     // Optional: Show a subtle toast notification, differentiate if it was self-uploaded?
     // Can check newDocument.uploaderId === currentUserId if uploaderId is included in payload
     // toast.info(`Neues Dokument hinzugefügt: ${newDocument.fileName}`);
 }, []);
  // --- End Pusher Handlers ---


  // Setup Pusher subscriptions
  const channelName = `private-consultation-${consultationId}`;
  usePusherSubscription(channelName, 'new-message', handleIncomingMessage);
  usePusherSubscription(channelName, 'message-updated', handleMessageUpdated);
  usePusherSubscription(channelName, 'message-deleted', handleMessageDeleted);
  usePusherSubscription(channelName, 'new-document', handleNewDocument); // Subscribe to new event


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
                 <h3 className="text-sm font-medium mb-2 text-foreground/80">Dokumente ({documents.length})</h3> {/* Show count */}
                 <div className='space-y-1'> {/* Add space between links */}
                     {documents.map(doc => <DocumentLink key={doc.id} document={doc} />)}
                 </div>
            </div>
        )}

        {/* Message List */}
        <MessageList messages={messages} currentUserId={currentUserId} />

        {/* Input Area or Disabled Message */}
         {isChatDisabled ? (
             <div className="p-4 text-center text-sm text-muted-foreground border-t bg-muted/50">
                { consultationStatus === ConsultationStatus.COMPLETED ? "Diese Beratung wurde abgeschlossen."
                  : consultationStatus === ConsultationStatus.REQUESTED ? "Diese Beratung wurde noch nicht von einem Studenten angenommen."
                  : consultationStatus === ConsultationStatus.CANCELLED ? "Diese Beratung wurde abgebrochen." // Assuming CANCELLED status exists
                  : "Der Chat ist derzeit nicht verfügbar."}
            </div>
         ) : (
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
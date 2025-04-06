// components/features/MessageInput.tsx
'use client';

import React, { useState, useTransition } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { SendHorizontal, Loader2, CheckCheck } from 'lucide-react'; // Removed Sparkles, MessageSquarePlus
import { toast } from 'sonner';
import { getAIClaritySafetyCheck } from '@/actions/ai'; // Removed getAIExplanationDraft import
import AICheckResultDisplay from './AICheckResultDisplay';

interface MessageInputProps {
  consultationId: string;
  onMessageSent: (newMessage: any) => void; // Callback for optimistic UI
  disabled?: boolean;
  // REMOVED: patientQuestion prop
}

export default function MessageInput({
    consultationId,
    onMessageSent,
    disabled = false,
    // REMOVED: patientQuestion
}: MessageInputProps) {
  const [content, setContent] = useState('');
  const [isSending, startSendTransition] = useTransition();
  const [isChecking, startCheckTransition] = useTransition();
  // REMOVED: const [isDrafting, startDraftTransition] = useTransition();
  const [checkResult, setCheckResult] = useState<any | null>(null);
  const [checkError, setCheckError] = useState<string | null>(null);

  // Adjusted busy state
  const isBusy = isSending || isChecking;

  // --- Send Message Handler ---
  const handleSend = async () => {
    const trimmedContent = content.trim();
    if (!trimmedContent || isBusy) return;

    setCheckResult(null);
    setCheckError(null);
    setContent('');

    startSendTransition(async () => {
       try {
            const response = await fetch('/api/nachrichten', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ consultationId, content: trimmedContent }), });
            if (!response.ok) { const errorData = await response.json(); throw new Error(errorData.error || `HTTP error! status: ${response.status}`); }
            const newMessage = await response.json();
            onMessageSent(newMessage);
        } catch (error) {
            console.error("Failed to send message:", error);
            toast.error("Fehler beim Senden", { description: error instanceof Error ? error.message : "Nachricht konnte nicht gesendet werden.", });
            setContent(trimmedContent); // Restore content on error
        }
    });
  };

  // --- AI Clarity/Safety Check Handler ---
  const handleCheckContent = () => {
     const textToVerify = content.trim();
     if (!textToVerify || isBusy) return;

     setCheckResult(null);
     setCheckError(null);

     startCheckTransition(async () => {
         const result = await getAIClaritySafetyCheck(textToVerify);
         if (result.success) {
             setCheckResult(result.data);
             toast.info("Prüfung abgeschlossen", { description: "Ergebnis wird unten angezeigt." });
         } else {
             setCheckError(result.message);
             toast.error("Fehler bei der Prüfung", { description: result.message });
         }
     });
  };

  // --- REMOVED: handleDraftExplanation Handler ---

  // Handle Enter key press for sending
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
     if (event.key === 'Enter' && !event.shiftKey) {
       event.preventDefault();
       handleSend();
     }
   };

   // Clear AI check results when user types
   const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
        if (checkResult || checkError) {
            setCheckResult(null);
            setCheckError(null);
        }
   }

  return (
    <div className="p-4 border-t bg-background">
        <div className="flex items-start gap-2">
          <Textarea
            value={content}
            onChange={handleContentChange}
            onKeyDown={handleKeyDown}
            placeholder="Schreiben Sie Ihre Nachricht..." // Updated placeholder
            className="flex-1 resize-none"
            rows={3} // Default rows
            disabled={disabled || isBusy}
          />
          {/* Vertical stack of buttons */}
          <div className="flex flex-col gap-1">
                 {/* Check Button */}
                 <Button
                     onClick={handleCheckContent}
                     variant="outline"
                     size="icon"
                     disabled={!content.trim() || disabled || isBusy}
                     title="Klarheit & Sicherheit prüfen (KI)"
                 >
                    {isChecking ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCheck className="h-4 w-4" />}
                     <span className="sr-only">Prüfen</span>
                 </Button>
                 {/* Send Button */}
                 <Button onClick={handleSend} disabled={!content.trim() || disabled || isBusy} size="icon" title="Nachricht senden">
                    {isSending ? <Loader2 className="h-4 w-4 animate-spin" /> : <SendHorizontal className="h-4 w-4" />}
                     <span className="sr-only">Senden</span>
                </Button>
          </div>
        </div>
        {/* Display Check Results */}
        <AICheckResultDisplay result={checkResult} isLoading={isChecking} error={checkError} />
    </div>
  );
}
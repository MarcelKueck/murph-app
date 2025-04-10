// components/features/MessageInput.tsx
'use client';

import React, { useState, useTransition, useRef, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { SendHorizontal, Loader2, CheckCheck, Plus, FileUp, Camera, X, File as FileIcon } from 'lucide-react';
import { toast } from 'sonner';
import { getAIClaritySafetyCheck } from '@/actions/ai';
import AICheckResultDisplay from './AICheckResultDisplay';
import { type PutBlobResult, upload } from '@vercel/blob/client';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useSession } from 'next-auth/react';
import { UserRole } from '@prisma/client';
import { cn } from '@/lib/utils';

// Define acceptable types for chat uploads
const CHAT_ACCEPTED_FILE_TYPES = "application/pdf,image/jpeg,image/png,image/gif,image/webp";
const CHAT_MAX_FILE_SIZE_MB = 10;

// Updated StagedFile type to explicitly include size
interface StagedFile extends Omit<PutBlobResult, 'size'> { // Omit size from PutBlobResult if it's unreliable
    tempId: string; // ID for tracking during upload/staging
    name: string; // Original filename
    size: number; // Make size required here
    uploadError?: string; // To store potential upload errors
}

interface UploadProgress {
    id: string;
    name: string;
    progress: number;
}

interface MessageInputProps {
  consultationId: string;
  onMessageSent: (newMessage: any) => void; // Keep for optimistic text message update
  disabled?: boolean;
}

export default function MessageInput({
    consultationId,
    onMessageSent,
    disabled = false,
}: MessageInputProps) {
  const { data: session } = useSession();
  const [content, setContent] = useState('');
  const [isSending, startSendTransition] = useTransition();
  const [isChecking, startCheckTransition] = useTransition();
  const [checkResult, setCheckResult] = useState<any | null>(null);
  const [checkError, setCheckError] = useState<string | null>(null);
  const [stagedFiles, setStagedFiles] = useState<StagedFile[]>([]); // State for staged files after upload
  const [uploadProgresses, setUploadProgresses] = useState<Record<string, UploadProgress>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isLikelyMobile, setIsLikelyMobile] = useState(false); // State for mobile detection

  // Effect to detect mobile on client side
  useEffect(() => {
    // Ensure this runs only in the browser
    if (typeof window !== 'undefined') {
      const checkMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsLikelyMobile(checkMobile);
    }
  }, []); // Empty dependency array ensures it runs once on mount

  const isUploading = Object.keys(uploadProgresses).length > 0;
  const isBusy = isSending || isChecking || isUploading;
  const canSend = (content.trim().length > 0 || stagedFiles.length > 0) && !isBusy;

  // --- Send Message Handler ---
  const handleSend = async () => {
    if (!canSend) return;

    const textContent = content.trim();
    // Map now uses f.size which should be present in StagedFile state
    const filesToSend = stagedFiles.map((f, index) => {
        console.log(`[MessageInput] Mapping stagedFile[${index}]:`, f); // Optional log
        console.log(`[MessageInput] Mapping stagedFile[${index}].size:`, f.size); // Optional log
        return {
            url: f.url,
            pathname: f.pathname,
            contentType: f.contentType,
            size: f.size, // <<< Should now correctly map from StagedFile state
            originalFilename: f.name,
        }
    });

    const payloadToSend = { consultationId, content: textContent, files: filesToSend };
    console.log("[MessageInput] Payload to be sent:", JSON.stringify(payloadToSend, null, 2)); // Now includes size

    // Optimistically clear state
    setContent('');
    setStagedFiles([]);
    setCheckResult(null);
    setCheckError(null);

    startSendTransition(async () => {
       try {
            const response = await fetch('/api/nachrichten', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payloadToSend), // Use the prepared payload
            });
            if (!response.ok) {
                 const errorData = await response.json();
                 console.error("Server responded with error:", errorData); // Log the specific error object from server
                 throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
            }
            const newMessage = await response.json(); // Backend should return the created message
            onMessageSent(newMessage); // Optimistic update for the message itself
            // Document updates handled via separate Pusher events triggered by backend
        } catch (error) {
            console.error("Failed to send message/files:", error);
            toast.error("Fehler beim Senden", { description: error instanceof Error ? error.message : "Nachricht/Dateien konnten nicht gesendet werden.", });
            setContent(textContent); // Restore text content on error
        }
    });
  };

  // --- AI Clarity/Safety Check Handler ---
  const handleCheckContent = () => {
    const textToVerify = content.trim();
     if (!textToVerify || isBusy) return;
     setCheckResult(null); setCheckError(null);
     startCheckTransition(async () => {
         const result = await getAIClaritySafetyCheck(textToVerify);
         if (result.success) { setCheckResult(result.data); toast.info("Prüfung abgeschlossen"); }
         else { setCheckError(result.message); toast.error("Fehler bei der Prüfung", { description: result.message }); }
     });
  };

  // --- File Selection/Upload Handler ---
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || disabled || isBusy) { return; }
    const filesToUpload = Array.from(event.target.files);
    if (fileInputRef.current) { fileInputRef.current.value = ""; }
    setIsPopoverOpen(false);

    if (stagedFiles.length + filesToUpload.length > 5) { toast.error("Limit erreicht", { description: "Maximal 5 Dateien pro Nachricht erlaubt." }); return; }

    filesToUpload.forEach(async (file) => { // Process each file asynchronously
        if (!file.type || !CHAT_ACCEPTED_FILE_TYPES.includes(file.type)) { toast.error(`Dateityp nicht erlaubt: ${file.name}`); return; }
        if (file.size > CHAT_MAX_FILE_SIZE_MB * 1024 * 1024) { toast.error(`Datei zu groß: ${file.name}`); return; }

      const tempId = `${file.name}-${Date.now()}`;
      const originalFileSize = file.size; // <<< Store original size BEFORE upload call
      setUploadProgresses(prev => ({ ...prev, [tempId]: { id: tempId, name: file.name, progress: 0 } }));

      try {
        // Upload immediately client-side
        const blobResult = await upload(file.name, file, {
          access: 'public',
          handleUploadUrl: '/api/upload', // Endpoint expects consultationId in payload
          clientPayload: JSON.stringify({ consultationId: consultationId }), // Pass consultationId
          onUploadProgress: (progressUpdate) => {
             let numericProgress = 0;
             if (typeof progressUpdate === 'number') { numericProgress = progressUpdate; }
             else if (typeof progressUpdate === 'object' && progressUpdate !== null && typeof (progressUpdate as any).percentage === 'number') { numericProgress = (progressUpdate as any).percentage; }
             numericProgress = Math.max(0, Math.min(100, numericProgress));
             setUploadProgresses(prev => ({ ...prev, ...(prev[tempId] && { [tempId]: { ...prev[tempId], progress: numericProgress } }) }));
          },
        });
        // Add successfully uploaded blob result AND ORIGINAL size to staged files
        console.log("[MessageInput] Blob Upload Result:", blobResult); // Log the full blob result
        setStagedFiles(prev => [
            ...prev,
            {
                // Spread the result from upload (which might miss size)
                ...blobResult,
                // Explicitly add needed fields from original file/context
                tempId: tempId,
                name: file.name,
                size: originalFileSize // <<< Use the stored original file size
            }
        ]);
      } catch (error) {
        console.error('Chat Upload Error:', error);
        const message = error instanceof Error ? error.message : 'Unbekannter Upload-Fehler.';
        toast.error(`Fehler bei "${file.name}"`, { description: message });
      } finally {
          // Remove from progress tracking
          setUploadProgresses(prev => { const newState = { ...prev }; delete newState[tempId]; return newState; });
      }
    });
  };
  // --- End File Upload Handler ---

   // --- Remove Staged File Handler ---
   const handleRemoveStagedFile = (tempIdToRemove: string) => {
       setStagedFiles(prev => prev.filter(file => file.tempId !== tempIdToRemove));
   };
   // --- End Remove Staged File Handler ---

  // --- Event Handlers ---
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); handleSend(); } };
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => { setContent(e.target.value); if (checkResult || checkError) { setCheckResult(null); setCheckError(null); } };

  return (
    <div className="p-4 border-t bg-background space-y-2">
        {/* Staged Files Area */}
         {stagedFiles.length > 0 && (
            <div className="flex flex-wrap gap-2 pb-2 border-b mb-2">
                {stagedFiles.map((file) => (
                    <div key={file.tempId} className="flex items-center gap-1.5 bg-muted/70 border rounded-md pl-2 pr-1 py-0.5 text-sm">
                        <FileIcon className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                        <span className="truncate max-w-[150px]" title={file.name}>{file.name}</span>
                        <Button type="button" variant="ghost" size="icon" className="h-5 w-5 p-0 text-muted-foreground hover:text-destructive" onClick={() => handleRemoveStagedFile(file.tempId)} disabled={isBusy} title="Anhang entfernen" >
                             <X className="h-3.5 w-3.5" />
                        </Button>
                    </div>
                ))}
            </div>
         )}

        {/* Upload Progress Area */}
        {Object.values(uploadProgresses).map((up) => (
             <div key={up.id} className="flex items-center space-x-2 p-1.5 border rounded-md bg-muted/60 animate-pulse">
                 <FileIcon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                 <span className="text-xs truncate flex-grow" title={up.name}>{up.name}</span>
                 <Progress value={up.progress} className="w-20 h-1.5 flex-shrink-0" />
                 <span className="text-xs text-muted-foreground w-10 text-right flex-shrink-0">{up.progress.toFixed(0)}%</span>
             </div>
        ))}

        {/* Input and Buttons */}
        <div className="flex items-start gap-2">
            {/* Hidden File Input */}
            <Input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} accept={CHAT_ACCEPTED_FILE_TYPES} disabled={disabled || isBusy} multiple/>

            {/* Attachment Trigger (+ Popover) */}
            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild>
                     <Button variant="ghost" size="icon" disabled={disabled || isBusy} title="Datei anhängen oder Foto aufnehmen" className={cn( 'flex-shrink-0 transition-transform duration-200 ease-in-out', isPopoverOpen ? 'rotate-45' : 'rotate-0' )} aria-expanded={isPopoverOpen} >
                        <Plus className="h-5 w-5" /> <span className="sr-only">Anhang hinzufügen</span>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-1" align="start">
                    <div className='flex flex-col gap-1'>
                        {/* File Upload Button */}
                        <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => { fileInputRef.current?.removeAttribute('capture'); fileInputRef.current?.click(); }}>
                            <FileUp className="mr-2 h-4 w-4" /> Datei hochladen
                        </Button>
                        {/* Camera Button - Disable on non-mobile */}
                        <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => { if (isLikelyMobile) { fileInputRef.current?.setAttribute('capture', 'environment'); fileInputRef.current?.click(); } }} disabled={!isLikelyMobile} title={!isLikelyMobile ? "Nur auf Mobilgeräten verfügbar" : "Foto direkt aufnehmen"} >
                            <Camera className={cn("mr-2 h-4 w-4", !isLikelyMobile && "opacity-50")} /> Foto aufnehmen
                        </Button>
                    </div>
                </PopoverContent>
            </Popover>

            {/* Textarea */}
            <Textarea value={content} onChange={handleContentChange} onKeyDown={handleKeyDown} placeholder="Nachricht schreiben..." className="flex-1 resize-none" rows={2} disabled={disabled || isBusy} />

            {/* Vertical stack of Check/Send buttons */}
            <div className="flex flex-col gap-1 flex-shrink-0">
                 {/* Check Button */}
                 <Button onClick={handleCheckContent} variant="outline" size="icon" disabled={!content.trim() || disabled || isBusy || session?.user?.role === UserRole.PATIENT} title="Klarheit & Sicherheit prüfen (KI)" className={session?.user?.role === UserRole.PATIENT ? 'hidden' : ''} >
                    {isChecking ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCheck className="h-4 w-4" />} <span className="sr-only">Prüfen</span>
                 </Button>
                 {/* Send Button */}
                 <Button onClick={handleSend} disabled={!canSend} size="icon" title="Nachricht senden">
                    {isSending ? <Loader2 className="h-4 w-4 animate-spin" /> : <SendHorizontal className="h-4 w-4" />} <span className="sr-only">Senden</span>
                </Button>
            </div>
        </div>
        {/* Display Check Results */}
        <AICheckResultDisplay result={checkResult} isLoading={isChecking} error={checkError} />
    </div>
  );
}
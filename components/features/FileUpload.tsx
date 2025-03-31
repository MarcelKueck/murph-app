// components/features/FileUpload.tsx
'use client';

import React, { useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { UploadCloud, X, File as FileIcon, Loader2 } from 'lucide-react';
import { type PutBlobResult } from '@vercel/blob';
import { upload } from '@vercel/blob/client'; // Client-side upload function
import { toast } from 'sonner';
import { UploadedDocument } from '@/lib/validation'; // Import type
import { FormLabel } from '@/components/ui/form'; // Ensure FormLabel is imported

interface FileUploadProps {
  onUploadComplete: (uploadedFile: UploadedDocument) => void;
  onUploadError: (fileName: string, message: string) => void;
  onFileRemove: (uploadId: string) => void;
  maxFiles?: number;
  currentFileCount: number;
  disabled?: boolean;
}

// Define acceptable file types (adjust as needed)
const ACCEPTED_FILE_TYPES = "application/pdf,image/jpeg,image/png,image/gif";
const MAX_FILE_SIZE_MB = 10; // Example: 10MB limit

export default function FileUpload({
  onUploadComplete,
  onUploadError,
  onFileRemove,
  maxFiles = 3, // Default max 3 files
  currentFileCount,
  disabled = false,
}: FileUploadProps) {
  const inputFileRef = useRef<HTMLInputElement>(null);
  // Track progress by temp ID. Value can be number or potentially object from blob client
  const [uploadingFiles, setUploadingFiles] = useState<Record<string, { name: string; progress: number | object }>>({});

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }

    const filesToUpload = Array.from(event.target.files);

    // Filter out files if max count reached
     if (currentFileCount + filesToUpload.length > maxFiles) {
      toast.error(`Maximal ${maxFiles} Dateien erlaubt.`);
      // Reset file input to allow re-selection
       if (inputFileRef.current) {
         inputFileRef.current.value = "";
       }
      return;
    }

    for (const file of filesToUpload) {
       // Client-side validation
        if (!file.type || !ACCEPTED_FILE_TYPES.includes(file.type)) {
             onUploadError(file.name, `Dateityp ${file.type || 'unbekannt'} nicht erlaubt. Erlaubt: PDF, JPG, PNG, GIF.`);
             continue; // Skip this file
         }
         if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
             onUploadError(file.name, `Datei ist zu groß (max. ${MAX_FILE_SIZE_MB}MB).`);
             continue; // Skip this file
         }

      const tempId = `${file.name}-${Date.now()}`; // Simple temporary ID
      // Initialize progress as 0 (number)
      setUploadingFiles(prev => ({ ...prev, [tempId]: { name: file.name, progress: 0 } }));

      try {
        const newBlob = await upload(file.name, file, {
          access: 'public',
          handleUploadUrl: '/api/upload',
          // --- Pass progress updates directly to the state setter ---
          onUploadProgress: (progressUpdate) => {
             // 'progressUpdate' might be just the number or an object
             // Store the raw value received. We'll parse it during render.
            setUploadingFiles(prev => ({
              ...prev,
              // Only update if the entry still exists (wasn't cancelled/errored)
              ...(prev[tempId] && {
                  [tempId]: { ...prev[tempId], progress: progressUpdate }
              })
            }));
          },
        });

        // Upload successful
        setUploadingFiles(prev => {
          const newState = { ...prev };
          delete newState[tempId]; // Remove from progress tracking
          return newState;
        });

        // Pass necessary data back to the parent form
        onUploadComplete({
            fileName: file.name,
            storageUrl: newBlob.url,
            mimeType: file.type,
            fileSize: file.size,
            uploadId: tempId,
        });

      } catch (error) {
        console.error('Upload Error:', error);
        const message = error instanceof Error ? error.message : 'Unbekannter Upload-Fehler.';
         setUploadingFiles(prev => {
          const newState = { ...prev };
          delete newState[tempId]; // Remove from progress on error
          return newState;
        });
        onUploadError(file.name, `Upload fehlgeschlagen: ${message}`);
      }
    }

     // Reset file input after processing all selected files
     if (inputFileRef.current) {
       inputFileRef.current.value = "";
     }
  };

  return (
    <div className="space-y-2">
      <FormLabel>Dokumente hinzufügen (Optional)</FormLabel>
      <div className="relative border-2 border-dashed border-muted rounded-lg p-6 text-center hover:border-primary transition-colors">
        <UploadCloud className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
        <p className="text-sm text-muted-foreground mb-2">
          Datei hierher ziehen oder klicken zum Hochladen
        </p>
        <p className="text-xs text-muted-foreground mb-4">
          Max. {maxFiles} Dateien, bis zu {MAX_FILE_SIZE_MB}MB pro Datei. Erlaubte Typen: PDF, JPG, PNG, GIF.
        </p>
        <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => inputFileRef.current?.click()}
            disabled={disabled || currentFileCount >= maxFiles}
        >
            Datei auswählen
        </Button>
        <Input
            ref={inputFileRef}
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" // Hidden input
            onChange={handleFileChange}
            accept={ACCEPTED_FILE_TYPES}
            multiple
            disabled={disabled || currentFileCount >= maxFiles}
        />
      </div>

       {/* Display Upload Progress */}
      {Object.entries(uploadingFiles).map(([id, { name, progress }]) => {
           // --- FIX: Handle progress being number or object ---
           let numericProgress = 0;
            if (typeof progress === 'number') {
                numericProgress = progress;
            } else if (typeof progress === 'object' && progress !== null && typeof (progress as any).percentage === 'number') {
                // If progress is an object like { percentage: number, ... }
                numericProgress = (progress as any).percentage;
            }
            // Ensure value is within 0-100 range for Progress component
            numericProgress = Math.max(0, Math.min(100, numericProgress));
           // --- END FIX ---

         return (
            <div key={id} className="flex items-center space-x-2 p-2 border rounded-md bg-muted/50">
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground flex-shrink-0" />
                <span className="text-sm truncate flex-grow" title={name}>{name}</span>
                <Progress value={numericProgress} className="w-20 h-2 flex-shrink-0" />
                <span className="text-xs text-muted-foreground w-10 text-right flex-shrink-0">{numericProgress.toFixed(0)}%</span>
                {/* Optional: Add a cancel button during upload */}
                {/* <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-destructive hover:bg-destructive/10"> <X className="h-4 w-4" /> </Button> */}
            </div>
        );
      })}

    </div>
  );
}
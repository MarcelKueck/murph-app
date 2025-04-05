// components/features/ProfilePictureUpload.tsx
'use client';

import React, { useState, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UploadCloud, X, Loader2 } from 'lucide-react';
import { upload } from '@vercel/blob/client';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface ProfilePictureUploadProps {
  initialImageUrl?: string | null;
  initials: string;
  onUploadComplete: (url: string) => void; // Callback with the new blob URL
  onRemovePicture: () => void; // Callback to signal removal
  disabled?: boolean;
}

const ProfilePictureUpload: React.FC<ProfilePictureUploadProps> = ({
  initialImageUrl,
  initials,
  onUploadComplete,
  onRemovePicture,
  disabled = false,
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialImageUrl ?? null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Simple client-side validation
    if (!['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(file.type)) {
      toast.error('Ungültiger Dateityp.', { description: 'Bitte wählen Sie eine JPG, PNG, GIF oder WEBP Datei.' });
      return;
    }
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast.error('Datei zu groß.', { description: 'Maximale Dateigröße ist 5MB.' });
      return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Start upload
    setIsUploading(true);
    try {
      const newBlob = await upload(file.name, file, {
        access: 'public',
        handleUploadUrl: '/api/upload/profile-picture', // Use the dedicated endpoint
        onUploadProgress: (progress) => {
          // Optional: display progress if needed, maybe as overlay on avatar
           console.log('Upload progress:', progress);
        },
      });

      // Success
      onUploadComplete(newBlob.url); // Pass the final URL back
      // Keep preview URL until saved
      toast.success('Bild erfolgreich hochgeladen. Speichern Sie das Profil, um die Änderung zu übernehmen.');

    } catch (error) {
      console.error('Profile picture upload error:', error);
      const message = error instanceof Error ? error.message : 'Upload fehlgeschlagen.';
      toast.error('Fehler beim Upload', { description: message });
      setPreviewUrl(initialImageUrl ?? null); // Revert preview on error
    } finally {
      setIsUploading(false);
      // Reset file input
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleRemoveClick = (e: React.MouseEvent) => {
     e.stopPropagation(); // Prevent triggering file input if overlayed
     setPreviewUrl(null);
     onRemovePicture(); // Notify parent form to set image URL to null on save
     if (fileInputRef.current) fileInputRef.current.value = "";
     toast.info('Profilbild wird beim Speichern entfernt.');
  }

  return (
    <div className="relative group w-24 h-24 mx-auto"> {/* Center the avatar */}
      <Avatar className="w-full h-full text-3xl border">
        <AvatarImage src={previewUrl ?? undefined} alt="Profilbild" />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <div className={cn(
          "absolute inset-0 bg-black/50 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer",
          disabled || isUploading ? "hidden" : "" // Hide overlay when disabled/uploading
          )}
          onClick={() => !disabled && !isUploading && fileInputRef.current?.click()}
      >
           <UploadCloud className="h-6 w-6 text-white mb-1" />
           <span className="text-xs text-white text-center">Ändern</span>
           {/* Hidden file input */}
           <Input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/jpeg,image/png,image/gif,image/webp"
                onChange={handleFileChange}
                disabled={disabled || isUploading}
           />
      </div>
      {/* Loading Indicator */}
       {isUploading && (
          <div className="absolute inset-0 bg-black/70 rounded-full flex items-center justify-center">
              <Loader2 className="h-8 w-8 text-white animate-spin" />
          </div>
       )}
      {/* Remove Button (show if there's a picture and not uploading) */}
      {previewUrl && !isUploading && !disabled && (
          <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute -top-1 -right-1 h-6 w-6 rounded-full z-10 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={handleRemoveClick}
              aria-label="Profilbild entfernen"
          >
             <X className="h-4 w-4" />
          </Button>
      )}
    </div>
  );
};

export default ProfilePictureUpload;
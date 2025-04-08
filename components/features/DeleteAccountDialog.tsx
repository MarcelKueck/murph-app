// components/features/DeleteAccountDialog.tsx
'use client';

import React, { useState, useTransition } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import { deleteCurrentUserAccount } from '@/actions/account';
import { signOut } from 'next-auth/react';
import { Textarea } from '../ui/textarea'; // Import Textarea

interface DeleteAccountDialogProps {
  userEmail: string; // Pass the user's email for confirmation check
  children: React.ReactNode; // The trigger button
}

export default function DeleteAccountDialog({ userEmail, children }: DeleteAccountDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [confirmationEmail, setConfirmationEmail] = useState('');
  const [feedback, setFeedback] = useState(''); // State for feedback
  const [isDeleting, startDeleteTransition] = useTransition();
  const isConfirmationMatch = confirmationEmail === userEmail;

  const handleDelete = () => {
    if (!isConfirmationMatch || isDeleting) return;

    startDeleteTransition(async () => {
      // Pass feedback to the action
      const result = await deleteCurrentUserAccount(confirmationEmail, feedback);
      if (result.success) {
        toast.success("Konto erfolgreich gelöscht.");
        setIsOpen(false); // Close dialog
        // Sign out and redirect (handled by signOut callbackUrl)
        await signOut({ callbackUrl: '/' });
      } else {
        toast.error("Fehler beim Löschen", { description: result.message });
        // Keep dialog open on error
      }
    });
  };

  // Reset confirmation input and feedback when dialog is closed
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setConfirmationEmail('');
      setFeedback(''); // Reset feedback on close
    }
    setIsOpen(open);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
             <AlertTriangle className="text-destructive" /> Sind Sie absolut sicher?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Diese Aktion kann nicht rückgängig gemacht werden. Ihr Konto und alle damit verbundenen Daten (Beratungen, Nachrichten, Dokumente, Profil) werden **dauerhaft gelöscht**.
            <br /><br />
            Um fortzufahren, geben Sie bitte Ihre E-Mail-Adresse (<strong className='break-all'>{userEmail}</strong>) in das Feld unten ein. Sie können uns optional mitteilen, warum Sie gehen.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="py-2 space-y-4">
            {/* Email Confirmation */}
            <div>
                <Label htmlFor="email-confirmation" className="text-sm font-medium">
                    E-Mail Bestätigung
                </Label>
                <Input
                    id="email-confirmation"
                    type="email"
                    placeholder="Ihre E-Mail-Adresse zur Bestätigung"
                    value={confirmationEmail}
                    onChange={(e) => setConfirmationEmail(e.target.value)}
                    disabled={isDeleting}
                    className='mt-1'
                />
                {!isConfirmationMatch && confirmationEmail.length > 0 && (
                    <p className="text-xs text-destructive mt-1">Die eingegebene E-Mail stimmt nicht überein.</p>
                )}
            </div>

            {/* Optional Feedback */}
             <div>
                <Label htmlFor="deletion-feedback" className="text-sm font-medium">
                    Grund für die Löschung (Optional)
                </Label>
                <Textarea
                    id="deletion-feedback"
                    placeholder="Warum möchten Sie Ihr Konto löschen? (Optional)"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    rows={3}
                    className="mt-1 resize-y"
                    disabled={isDeleting}
                />
            </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Abbrechen</AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={!isConfirmationMatch || isDeleting}
          >
            {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Ich verstehe, Konto löschen
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
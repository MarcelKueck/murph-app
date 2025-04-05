// components/admin/VerifyStudentButton.tsx
'use client';

import React, { useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Check, X, Loader2 } from 'lucide-react';
import { toggleStudentVerification } from '@/actions/admin'; // Action to be created
import { toast } from 'sonner';

interface VerifyStudentButtonProps {
  userId: string;
  isVerified: boolean;
}

export default function VerifyStudentButton({ userId, isVerified }: VerifyStudentButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    // Optional: Add confirmation dialog here for critical actions
    // if (!confirm(`Sind Sie sicher, dass Sie den Status ändern möchten?`)) {
    //    return;
    // }

    startTransition(async () => {
      try {
        const result = await toggleStudentVerification(userId, isVerified);
        if (result.success) {
          toast.success(result.message);
          // Revalidation happens via the server action
        } else {
          toast.error('Fehler', { description: result.message });
        }
      } catch (error) {
        toast.error('Fehler', { description: 'Aktion fehlgeschlagen.' });
        console.error("Verification toggle error:", error);
      }
    });
  };

  return (
    <Button
      variant={isVerified ? "outline" : "default"} // Use outline for "Entziehen"
      size="sm"
      onClick={handleClick}
      disabled={isPending}
      className="w-28" // Fixed width for consistency
    >
      {isPending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : isVerified ? (
        <>
          <X className="mr-1 h-4 w-4" /> Entziehen
        </>
      ) : (
        <>
          <Check className="mr-1 h-4 w-4" /> Verifizieren
        </>
      )}
    </Button>
  );
}
// components/features/ConsultationPreviewDialog.tsx
'use client';

import React, { useTransition, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose, // Import DialogClose
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area'; // Use ScrollArea for long content
import DocumentLink from './DocumentLink'; // Reuse DocumentLink
import { Consultation, Document, UserRole } from '@prisma/client';
import { Loader2, Handshake } from 'lucide-react';
import { toast } from 'sonner';
import AnimatedCheckmark from '../ui/AnimatedCheckmark';

type AcceptAction = (consultationId: string) => Promise<{ success: boolean; message: string; error?: any }>;

// Type matching the data passed from the dashboard page
type ConsultationForPreview = Consultation & {
    patientQuestion: string;
    documents: Document[];
    patient: {
        patientProfile?: {
            firstName: string;
            lastName: string;
        } | null;
    } | null;
};

interface ConsultationPreviewDialogProps {
  consultation: ConsultationForPreview | null; // Can be null when closed
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAccept?: AcceptAction;
}

export default function ConsultationPreviewDialog({
  consultation,
  isOpen,
  onOpenChange,
  onAccept,
}: ConsultationPreviewDialogProps) {
  const [isAccepting, startAcceptTransition] = useTransition();
  const [showSuccess, setShowSuccess] = useState(false);

  if (!consultation) {
    return null; // Don't render if no consultation is selected
  }

  const handleAccept = () => {
    if (!onAccept || !consultation) return;
    setShowSuccess(false);

    startAcceptTransition(async () => {
      try {
        const result = await onAccept(consultation.id);
        if (result.success) {
          setShowSuccess(true);
          setTimeout(() => {
            toast.success("Beratung angenommen!", { description: result.message });
            onOpenChange(false); // Close dialog on success after delay
            // Revalidation should happen via action, refreshing the list
          }, 1200);
        } else {
          toast.error("Fehler beim Annehmen", {
            description: result.message || "Die Beratung konnte nicht angenommen werden.",
          });
        }
      } catch (error) {
        console.error("Error accepting consultation:", error);
        toast.error("Fehler beim Annehmen", {
          description: "Ein unerwarteter Fehler ist aufgetreten.",
        });
      }
    });
  };

  // Reset success state when dialog closes
  const handleOpenChange = (open: boolean) => {
      if (!open) {
          setShowSuccess(false);
      }
      onOpenChange(open);
  }

  const patientName = consultation.patient?.patientProfile
    ? `${consultation.patient.patientProfile.firstName} ${consultation.patient.patientProfile.lastName}`
    : 'Unbekannt';

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[625px]"> {/* Adjust width as needed */}
        <DialogHeader>
          <DialogTitle>Anfragedetails: {consultation.topic}</DialogTitle>
          <DialogDescription>
            Anfrage von Patient: {patientName} vom {new Date(consultation.createdAt).toLocaleDateString('de-DE')}
          </DialogDescription>
        </DialogHeader>

        {/* Use ScrollArea for potentially long question and document list */}
        <ScrollArea className="max-h-[60vh] pr-6"> {/* Add padding-right for scrollbar */}
            <div className="py-4 space-y-4">
                <div>
                    <h4 className="font-medium mb-2 text-sm">Frage des Patienten</h4>
                    <p className="text-sm text-muted-foreground bg-muted/50 p-3 border rounded whitespace-pre-wrap">
                        {consultation.patientQuestion}
                    </p>
                </div>

                {consultation.documents && consultation.documents.length > 0 && (
                    <div>
                        <h4 className="font-medium mb-2 text-sm">Angehängte Dokumente</h4>
                        <div className="space-y-2">
                            {consultation.documents.map((doc) => (
                                <DocumentLink key={doc.id} document={doc} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </ScrollArea>

        <DialogFooter className="sm:justify-between gap-2">
          {/* Close Button using DialogClose */}
          <DialogClose asChild>
             <Button type="button" variant="outline" disabled={isAccepting || showSuccess}>
                Schließen
             </Button>
          </DialogClose>
          {/* Accept Button */}
          {onAccept && (
             <Button
                type="button"
                onClick={handleAccept}
                disabled={isAccepting || showSuccess}
                animateInteraction={!isAccepting && !showSuccess}
             >
                {showSuccess ? (
                    <AnimatedCheckmark />
                ) : isAccepting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <Handshake className="mr-2 h-4 w-4" />
                )}
                {!showSuccess && 'Anfrage Annehmen'}
             </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
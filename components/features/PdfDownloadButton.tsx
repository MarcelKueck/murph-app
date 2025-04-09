// components/features/PdfDownloadButton.tsx
'use client';

import React, { useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
import { generateSummaryPdf } from '@/actions/pdf'; // Import the server action
import { toast } from 'sonner';

interface PdfDownloadButtonProps {
  consultationId: string;
  defaultFileName: string; // Suggest a filename (e.g., murph_summary_topic.pdf)
  buttonText?: string;
  buttonVariant?: "default" | "secondary" | "outline" | "ghost" | "link" | null | undefined;
  buttonSize?: "default" | "sm" | "lg" | "icon" | null | undefined;
}

export default function PdfDownloadButton({
    consultationId,
    defaultFileName = 'murph_zusammenfassung.pdf', // Fallback filename
    buttonText = 'PDF Herunterladen',
    buttonVariant = "outline", // Default to outline style
    buttonSize = "sm", // Default to small size
}: PdfDownloadButtonProps) {
  const [isDownloading, startDownloadTransition] = useTransition();

  const handleDownload = () => {
    if (isDownloading) return;

    startDownloadTransition(async () => {
      try {
        const result = await generateSummaryPdf(consultationId);

        if (result.success && result.pdfData && result.fileName) {
          // Convert Base64 to Blob
          const byteCharacters = atob(result.pdfData);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], { type: 'application/pdf' });

          // Create Object URL
          const url = window.URL.createObjectURL(blob);

          // Create temporary link and trigger download
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', result.fileName); // Use filename from action
          document.body.appendChild(link);
          link.click();

          // Clean up
          link.parentNode?.removeChild(link);
          window.URL.revokeObjectURL(url); // Release object URL memory

          toast.success("PDF-Download gestartet.");

        } else {
          // Handle specific errors known from the action, or generic message
          const errorMessage = result.message || "PDF konnte nicht generiert werden.";
           if (errorMessage.includes("Feedback required")) {
               toast.error("Fehler", { description: "Bitte geben Sie zuerst Feedback, um die Zusammenfassung herunterzuladen." });
           } else {
                toast.error("Fehler beim PDF-Download", { description: errorMessage });
           }
        }
      } catch (error) {
        console.error("Error downloading PDF:", error);
        toast.error("Fehler beim PDF-Download", { description: "Ein unerwarteter Fehler ist aufgetreten." });
      }
    });
  };

  return (
    <Button
        onClick={handleDownload}
        disabled={isDownloading}
        variant={buttonVariant}
        size={buttonSize}
        title="Zusammenfassung als PDF herunterladen"
    >
      {isDownloading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Download className="mr-2 h-4 w-4" />
      )}
      {buttonText}
    </Button>
  );
}
// components/features/DocumentLink.tsx
'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import { FileText, Download, Sparkles, Loader2, AlertTriangle, X } from 'lucide-react'; // Use Sparkles icon
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { UserRole } from '@prisma/client';
import { getAIDocumentSummary } from '@/actions/ai';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from '../ui/scroll-area';
import { cn } from '@/lib/utils'; // Import cn

interface DocumentData {
    id: string;
    fileName: string;
    storageUrl: string;
    mimeType: string;
    fileSize?: number | null;
}

interface DocumentLinkProps {
  document: DocumentData;
}

const DocumentLink: React.FC<DocumentLinkProps> = ({ document }) => {
  const { data: session } = useSession();
  const [isSummarizing, startSummarizeTransition] = useTransition();
  const [summaryResult, setSummaryResult] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { id: documentId, fileName, storageUrl, fileSize, mimeType } = document;

  const displaySize = fileSize ? `${(fileSize / 1024).toFixed(1)} KB` : '';

  // Determine if the current user can summarize (Student or Admin)
  const canSummarize = session?.user?.role === UserRole.STUDENT || session?.user?.role === UserRole.ADMIN;
  const isPdf = mimeType === 'application/pdf';

  const handleSummarizeClick = () => {
    if (isSummarizing || !isPdf || !canSummarize) return;

    setIsDialogOpen(true); // Open dialog immediately
    setSummaryResult(null); // Clear previous result

    startSummarizeTransition(async () => {
      const result = await getAIDocumentSummary(documentId);
      if (result.success) {
        setSummaryResult(result.message); // Store the summary text
      } else {
        setSummaryResult(`Fehler: ${result.message}`); // Store the error message
        toast.error("Fehler bei der Zusammenfassung", { description: result.message });
      }
    });
  };

  // Reset state when dialog closes
  const onOpenChange = (open: boolean) => {
      if (!open) {
          // Delay resetting result slightly to allow fade-out animation
          setTimeout(() => setSummaryResult(null), 150);
      }
      setIsDialogOpen(open);
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={onOpenChange}>
        <div className="flex items-center justify-between p-3 border rounded-md bg-muted/50 my-2 gap-2">
            {/* Document Info */}
            <div className="flex items-center gap-3 truncate flex-grow min-w-0"> {/* Ensure truncation works */}
                <FileText className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <div className="flex flex-col truncate">
                    <span className="text-sm font-medium truncate" title={fileName}>{fileName}</span>
                    {displaySize && <span className="text-xs text-muted-foreground">{displaySize}</span>}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 flex-shrink-0"> {/* Increased gap slightly */}
                {/* View/Download Button */}
                {/* Updated Style and Icon Position */}
                <Button variant="outline" size="sm" asChild>
                    <Link href={storageUrl} target="_blank" rel="noopener noreferrer" title={`Öffne ${fileName}`}>
                        <Download className="mr-1.5 h-4 w-4" /> Anzeigen
                    </Link>
                </Button>

                {/* Summarize Button (Conditional) */}
                {isPdf && canSummarize && (
                    /* Updated Style, Icon, and Text */
                    <Button
                        variant="outline" // Changed from ghost to outline
                        size="sm"
                        onClick={handleSummarizeClick}
                        disabled={isSummarizing}
                        title={`Dokument "${fileName}" zusammenfassen (KI)`}
                    >
                        {isSummarizing ? (
                            <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
                        ) : (
                            <Sparkles className="mr-1.5 h-4 w-4" /> // Changed icon
                        )}
                        Zusammenfassen
                    </Button>
                )}
            </div>
        </div>

        {/* Dialog Content for Summary */}
        <DialogContent className="sm:max-w-lg">
            <DialogHeader>
                <DialogTitle>KI-Zusammenfassung: {fileName}</DialogTitle>
                <DialogDescription>
                    Dies ist eine automatisch generierte Zusammenfassung des Dokuments. Bitte prüfen Sie die Inhalte sorgfältig.
                </DialogDescription>
            </DialogHeader>
            <ScrollArea className="max-h-[60vh] my-4 pr-4"> {/* Make content scrollable */}
                {isSummarizing && (
                    <div className="flex justify-center items-center py-10">
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    </div>
                )}
                {!isSummarizing && summaryResult && (
                    <div className="text-sm whitespace-pre-wrap">
                        {summaryResult.startsWith('Fehler:') ? (
                            <p className="text-destructive flex items-start gap-2">
                                <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0"/>
                                <span>{summaryResult}</span>
                            </p>
                        ) : (
                            <p className="text-muted-foreground">{summaryResult}</p>
                        )}
                    </div>
                )}
                 {!isSummarizing && !summaryResult && ( // Handle case where dialog opens but no result yet (unlikely but possible)
                     <div className="flex justify-center items-center py-10 text-muted-foreground italic">
                         Keine Zusammenfassung verfügbar.
                     </div>
                 )}
            </ScrollArea>
             {/* No explicit footer/close button needed as clicking outside or X works */}
        </DialogContent>
    </Dialog>
  );
};

export default DocumentLink;
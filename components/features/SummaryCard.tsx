// components/features/SummaryCard.tsx
'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Lock, Unlock, Edit, FileText, Download } from 'lucide-react'; // Added Download
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import Link from 'next/link';
import PdfDownloadButton from './PdfDownloadButton'; // Import the download button
import { ConsultationStatus } from '@prisma/client';

// Type matching the data fetched in dashboard page
// Re-exporting or importing from dashboard page is also an option
type CompletedConsultationSummary = {
    id: string;
    topic: string;
    status: ConsultationStatus;
    updatedAt: Date; // Completion date
    patientRating: number | null; // Check for null to determine lock status
    summary: string | null; // Optional summary text
};

interface SummaryCardProps {
  consultation: CompletedConsultationSummary;
}

export default function SummaryCard({ consultation }: SummaryCardProps) {
    const { id, topic, updatedAt, patientRating, summary } = consultation;
    const isLocked = patientRating === null;
    // Use updatedAt as the completion date for display
    const completionDate = format(new Date(updatedAt), 'dd.MM.yyyy');

    // Prepare filename for potential download
    const safeTopic = topic.replace(/[^a-z0-9]/gi, '_').toLowerCase() || 'beratung';
    const defaultPdfFilename = `murph_zusammenfassung_${safeTopic}.pdf`;

  return (
    <Card className="flex flex-col h-full border shadow-sm hover:shadow-md transition-shadow duration-200"> {/* Ensure card takes full height & add subtle effects */}
        <CardHeader className="pb-3">
            <div className="flex justify-between items-start gap-2">
                {/* Make title slightly smaller for card view */}
                <CardTitle className="text-md font-semibold line-clamp-2 leading-tight">{topic}</CardTitle>
                <Badge variant={isLocked ? "secondary" : "default"} className={!isLocked ? 'bg-green-100 text-green-800 border border-green-300' : 'border'}>
                    {isLocked ? <Lock className="h-3 w-3 mr-1" /> : <Unlock className="h-3 w-3 mr-1" />}
                    {isLocked ? 'Gesperrt' : 'Verfügbar'}
                </Badge>
            </div>
            <CardDescription className="text-xs pt-1">
                Abgeschlossen am: {completionDate}
            </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow pt-2 pb-4 text-sm">
             {isLocked ? (
                 <p className="text-muted-foreground italic">
                    Feedback geben, um Zusammenfassung freizuschalten.
                 </p>
            ) : (
                 summary ? (
                    // Only show a brief indication, not full preview on dashboard card
                    <div className='flex items-center gap-2 text-muted-foreground'>
                         <FileText className='h-4 w-4 flex-shrink-0' />
                         <span>Zusammenfassung verfügbar.</span>
                    </div>
                 ) : (
                    <p className="text-muted-foreground italic">
                        Keine Zusammenfassung hinterlegt.
                    </p>
                 )

            )}
        </CardContent>
         <CardFooter className="flex flex-col sm:flex-row justify-end gap-2 pt-3 border-t"> {/* Added border-t */}
             {isLocked && (
                 <Button variant="default" size="sm" asChild className="w-full sm:w-auto">
                    <Link href={`/feedback?consultationId=${id}`}>
                         <Edit className="mr-2 h-4 w-4" /> Feedback geben
                    </Link>
                 </Button>
             )}
             {!isLocked && (
                <>
                    {/* Link to view the full details including summary text */}
                    <Button variant="secondary" size="sm" asChild className="w-full sm:w-auto order-last sm:order-first">
                        <Link href={`/patient/beratungen/${id}`}>
                            Details ansehen <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                    {/* Download button appears directly on the card */}
                    <PdfDownloadButton
                        consultationId={id}
                        defaultFileName={defaultPdfFilename}
                        buttonVariant="outline"
                        buttonSize="sm"
                        buttonText='Download'
                    />
                </>
             )}
        </CardFooter>
    </Card>
  );
}
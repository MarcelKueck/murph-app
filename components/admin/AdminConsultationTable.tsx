// components/admin/AdminConsultationTable.tsx
'use client';

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Eye, Star, Brain, Handshake, Smile } from 'lucide-react';
import type { AdminConsultationView } from '@/app/admin/consultations/page'; // Verify this path is correct
import { CONSULTATION_STATUS_LABELS, CONSULTATION_STATUS_COLORS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AdminConsultationTableProps {
  consultations: AdminConsultationView[];
}

// Helper to display stars with optional tooltip
const RatingStars = ({ rating, label }: { rating: number | null | undefined, label?: string }) => {
    if (rating === null || rating === undefined) return <span className="text-xs text-muted-foreground">-</span>;

    const starDisplay = (
        // Center the stars within the cell
        <div className="flex items-center justify-center gap-0.5">
            {[...Array(5)].map((_, i) => (
                <Star
                    key={i}
                    className={cn(
                        "w-3 h-3", // Small stars for the table
                        i < rating ? "fill-yellow-400 text-yellow-500" : "fill-muted stroke-muted-foreground/50"
                    )}
                />
            ))}
            {/* Number removed for cleaner table view, shown in tooltip */}
        </div>
    );

   // Wrap with Tooltip if label is provided
   if (label) {
       return (
           <TooltipProvider delayDuration={100}>
               <Tooltip>
                   <TooltipTrigger asChild>
                        {/* TooltipTrigger needs a valid child, div works */}
                       <div>{starDisplay}</div>
                   </TooltipTrigger>
                   <TooltipContent>
                       <p>{label}: {rating}/5</p>
                   </TooltipContent>
               </Tooltip>
           </TooltipProvider>
       );
   }

    return starDisplay; // Fallback if no label needed
};

export default function AdminConsultationTable({ consultations }: AdminConsultationTableProps) {

  // Helper function to get patient name or email
  const getPatientName = (consultation: AdminConsultationView): string => {
    return consultation.patient?.patientProfile
        ? `${consultation.patient.patientProfile.firstName} ${consultation.patient.patientProfile.lastName}`
        : consultation.patient.email; // Fallback to email
  };

  // Helper function to get student name or email, or placeholder
  const getStudentName = (consultation: AdminConsultationView): string => {
    return consultation.student?.studentProfile
        ? `${consultation.student.studentProfile.firstName} ${consultation.student.studentProfile.lastName}`
        : (consultation.student?.email ?? '-'); // Show '-' if no student assigned
  };

  return (
     <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Thema</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead className="hidden lg:table-cell">Student</TableHead> {/* Show Student on lg+ */}
              <TableHead>Status</TableHead>
              {/* Use Tooltip directly in header for icons */}
              <TableHead className='text-center'><TooltipProvider><Tooltip><TooltipTrigger><Star className="h-4 w-4 inline-block"/></TooltipTrigger><TooltipContent>Gesamt</TooltipContent></Tooltip></TooltipProvider></TableHead>
              {/* Adjusted Responsive Classes */}
              <TableHead className="hidden sm:table-cell text-center"><TooltipProvider><Tooltip><TooltipTrigger><Brain className="h-4 w-4 inline-block"/></TooltipTrigger><TooltipContent>Klarheit</TooltipContent></Tooltip></TooltipProvider></TableHead> {/* Show Clarity on sm+ */}
              <TableHead className="hidden sm:table-cell text-center"><TooltipProvider><Tooltip><TooltipTrigger><Handshake className="h-4 w-4 inline-block"/></TooltipTrigger><TooltipContent>Hilfreichkeit</TooltipContent></Tooltip></TooltipProvider></TableHead> {/* Show Helpfulness on sm+ */}
              <TableHead className="hidden lg:table-cell text-center"><TooltipProvider><Tooltip><TooltipTrigger><Smile className="h-4 w-4 inline-block"/></TooltipTrigger><TooltipContent>Kommunikation</TooltipContent></Tooltip></TooltipProvider></TableHead> {/* Show Communication on lg+ */}
              <TableHead className="hidden lg:table-cell">Erstellt am</TableHead> {/* Show Date on lg+ */}
              <TableHead className="text-right">Aktion</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Empty State Row */}
            {consultations.length === 0 && (
                <TableRow>
                    <TableCell colSpan={10} className="h-24 text-center"> {/* Adjusted colSpan */}
                        Keine Beratungen gefunden für die aktuelle Filterauswahl.
                    </TableCell>
                </TableRow>
            )}
            {/* Data Rows */}
            {consultations.map((consultation) => (
              <TableRow key={consultation.id}>
                <TableCell className="font-medium max-w-[150px] sm:max-w-[200px] truncate" title={consultation.topic}>{consultation.topic}</TableCell> {/* Adjusted max-width */}
                <TableCell>{getPatientName(consultation)}</TableCell>
                <TableCell className="hidden lg:table-cell">{getStudentName(consultation)}</TableCell> {/* Show Student on lg+ */}
                <TableCell>
                    <Badge variant="outline" className={cn("border text-xs", CONSULTATION_STATUS_COLORS[consultation.status] || 'bg-gray-100 text-gray-800 border-gray-300')}>
                        {CONSULTATION_STATUS_LABELS[consultation.status] || consultation.status}
                    </Badge>
                </TableCell>
                 {/* Rating Cells */}
                 <TableCell>
                    <RatingStars rating={consultation.patientRating} label="Gesamt"/>
                </TableCell>
                {/* Adjusted Responsive Classes */}
                <TableCell className="hidden sm:table-cell"> {/* Show Clarity on sm+ */}
                    <RatingStars rating={consultation.clarityRating} label="Klarheit"/>
                </TableCell>
                <TableCell className="hidden sm:table-cell"> {/* Show Helpfulness on sm+ */}
                    <RatingStars rating={consultation.helpfulnessRating} label="Hilfreichkeit"/>
                </TableCell>
                 <TableCell className="hidden lg:table-cell"> {/* Show Communication on lg+ */}
                    <RatingStars rating={consultation.communicationRating} label="Kommunikation"/>
                 </TableCell>
                <TableCell className="hidden lg:table-cell">{format(new Date(consultation.createdAt), 'dd.MM.yyyy', { locale: de })}</TableCell> {/* Show Date on lg+ */}
                <TableCell className="text-right">
                     <Button variant="ghost" size="sm" asChild>
                         <Link href={`/admin/consultations/${consultation.id}`} title={`Beratung ${consultation.topic} ansehen`}>
                               Anzeigen <Eye className="ml-1 h-3 w-3" />
                           </Link>
                      </Button>
                 </TableCell>
               </TableRow>
             ))}
          </TableBody>
        </Table>
     </div>
   );
}
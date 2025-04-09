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
import { Eye, Star, Brain, Handshake, Smile } from 'lucide-react'; // Icons kept for header if we revert
import type { AdminConsultationView } from '@/app/admin/consultations/page';
import { CONSULTATION_STATUS_LABELS, CONSULTATION_STATUS_COLORS } from '@/lib/constants';
import { cn } from '@/lib/utils';
// Tooltip temporarily removed as RatingStars component call is removed
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface AdminConsultationTableProps {
  consultations: AdminConsultationView[];
}

// RatingStars component is NOT used in this debugging version

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
        {/* The Table component includes overflow-auto for horizontal scroll if needed */}
        <Table>
          <TableHeader>
            <TableRow>
              {/* TEMPORARILY ALWAYS SHOWING ALL HEADERS */}
              <TableHead>Thema</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead>Student</TableHead> {/* Removed hidden lg:table-cell */}
              <TableHead>Status</TableHead>
              <TableHead className='text-center'>Gesamt</TableHead> {/* Simple text header */}
              <TableHead className="text-center">Klarheit</TableHead> {/* Simple text header, removed hidden */}
              <TableHead className="text-center">Hilfreich</TableHead> {/* Simple text header, removed hidden */}
              <TableHead className="text-center">Komm.</TableHead> {/* Simple text header, removed hidden */}
              <TableHead>Erstellt am</TableHead> {/* Removed hidden lg:table-cell */}
              <TableHead className="text-right">Aktion</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Empty State Row */}
            {consultations.length === 0 && (
                <TableRow>
                    <TableCell colSpan={10} className="h-24 text-center"> {/* Ensure colSpan is 10 */}
                        Keine Beratungen gefunden für die aktuelle Filterauswahl.
                    </TableCell>
                </TableRow>
            )}
            {/* Data Rows */}
            {consultations.map((consultation) => {
                // Optional: Uncomment to log data for each row being rendered
                // console.log(`Rendering row for ${consultation.id}, Rating: ${consultation.patientRating}, Clarity: ${consultation.clarityRating}`);
                return (
                    <TableRow key={consultation.id}>
                        <TableCell className="font-medium max-w-[150px] sm:max-w-[200px] truncate" title={consultation.topic}>{consultation.topic}</TableCell>
                        <TableCell>{getPatientName(consultation)}</TableCell>
                        <TableCell>{getStudentName(consultation)}</TableCell> {/* Removed hidden class */}
                        <TableCell>
                            <Badge variant="outline" className={cn("border text-xs", CONSULTATION_STATUS_COLORS[consultation.status] || 'bg-gray-100 text-gray-800 border-gray-300')}>
                                {CONSULTATION_STATUS_LABELS[consultation.status] || consultation.status}
                            </Badge>
                        </TableCell>
                        {/* Temporarily display rating values as simple text */}
                        <TableCell className="text-center text-xs">{consultation.patientRating ?? '-'}</TableCell>
                        <TableCell className="text-center text-xs">{consultation.clarityRating ?? '-'}</TableCell> {/* Removed hidden class */}
                        <TableCell className="text-center text-xs">{consultation.helpfulnessRating ?? '-'}</TableCell> {/* Removed hidden class */}
                        <TableCell className="text-center text-xs">{consultation.communicationRating ?? '-'}</TableCell> {/* Removed hidden class */}
                        <TableCell>{format(new Date(consultation.createdAt), 'dd.MM.yyyy', { locale: de })}</TableCell> {/* Removed hidden class */}
                        <TableCell className="text-right">
                            <Button variant="ghost" size="sm" asChild>
                                <Link href={`/admin/consultations/${consultation.id}`} title={`Beratung ${consultation.topic} ansehen`}>
                                    Anzeigen <Eye className="ml-1 h-3 w-3" />
                                </Link>
                            </Button>
                        </TableCell>
                    </TableRow>
                )
            })}
          </TableBody>
        </Table>
     </div>
   );
}
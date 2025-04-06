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
import { ArrowRight, Eye, Star } from 'lucide-react'; // <<< Added Star icon
import type { AdminConsultationView } from '@/app/admin/consultations/page';
import { CONSULTATION_STATUS_LABELS, CONSULTATION_STATUS_COLORS } from '@/lib/constants';
import { cn } from '@/lib/utils';


interface AdminConsultationTableProps {
  consultations: AdminConsultationView[];
}

// Helper to display stars
const RatingStars = ({ rating }: { rating: number | null | undefined }) => {
    if (rating === null || rating === undefined) return <span className="text-xs text-muted-foreground">-</span>;
    return (
        <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
                <Star
                    key={i}
                    className={cn(
                        "w-3 h-3",
                        i < rating ? "fill-yellow-400 text-yellow-500" : "fill-muted stroke-muted-foreground/50"
                    )}
                />
            ))}
        </div>
    );
};

export default function AdminConsultationTable({ consultations }: AdminConsultationTableProps) {

  const getPatientName = (consultation: AdminConsultationView): string => {
    return consultation.patient?.patientProfile
        ? `${consultation.patient.patientProfile.firstName} ${consultation.patient.patientProfile.lastName}`
        : consultation.patient.email;
  }
  const getStudentName = (consultation: AdminConsultationView): string => {
    return consultation.student?.studentProfile
        ? `${consultation.student.studentProfile.firstName} ${consultation.student.studentProfile.lastName}`
        : (consultation.student?.email ?? '-');
  }

  return (
     <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              {/* <TableHead className="hidden sm:table-cell w-[130px]">ID</TableHead> */}
              <TableHead>Thema</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead className="hidden md:table-cell">Student</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Bewertung</TableHead> {/* <<< Added Rating Column */}
              <TableHead className="hidden lg:table-cell">Erstellt am</TableHead>
              <TableHead className="text-right">Aktion</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {consultations.length === 0 && (
                <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                        Keine Beratungen gefunden für die aktuelle Filterauswahl.
                    </TableCell>
                </TableRow>
            )}
            {consultations.map((consultation) => (
              <TableRow key={consultation.id}>
                {/* <TableCell className="font-mono text-xs hidden sm:table-cell">{consultation.id}</TableCell> */}
                <TableCell className="font-medium">{consultation.topic}</TableCell>
                <TableCell>{getPatientName(consultation)}</TableCell>
                <TableCell className="hidden md:table-cell">{getStudentName(consultation)}</TableCell>
                <TableCell>
                    <Badge variant="outline" className={cn("border text-xs", CONSULTATION_STATUS_COLORS[consultation.status] || 'bg-gray-100 text-gray-800 border-gray-300')}>
                        {CONSULTATION_STATUS_LABELS[consultation.status] || consultation.status}
                    </Badge>
                </TableCell>
                {/* <<< Rating Cell >>> */}
                <TableCell>
                    <RatingStars rating={consultation.patientRating} />
                </TableCell>
                <TableCell className="hidden lg:table-cell">{format(new Date(consultation.createdAt), 'dd.MM.yyyy', { locale: de })}</TableCell>
                <TableCell className="text-right">
                     <Button variant="ghost" size="sm" asChild>
                         <Link href={`/admin/consultations/${consultation.id}`} target="_blank" rel="noopener noreferrer">
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
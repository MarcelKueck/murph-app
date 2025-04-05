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
import { ArrowRight } from 'lucide-react';
import type { AdminConsultationView } from '@/app/admin/consultations/page'; // Import type
import { CONSULTATION_STATUS_LABELS, CONSULTATION_STATUS_COLORS } from '@/lib/constants';
import { cn } from '@/lib/utils';


interface AdminConsultationTableProps {
  consultations: AdminConsultationView[];
}

export default function AdminConsultationTable({ consultations }: AdminConsultationTableProps) {

  const getPatientName = (consultation: AdminConsultationView): string => {
    return consultation.patient?.patientProfile
        ? `${consultation.patient.patientProfile.firstName} ${consultation.patient.patientProfile.lastName}`
        : consultation.patient.email;
  }
  const getStudentName = (consultation: AdminConsultationView): string => {
    return consultation.student?.studentProfile
        ? `${consultation.student.studentProfile.firstName} ${consultation.student.studentProfile.lastName}`
        : (consultation.student?.email ?? '-'); // Show '-' if no student assigned
  }

  return (
     <div className="border rounded-lg overflow-hidden"> {/* Added border & overflow */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden sm:table-cell w-[130px]">ID</TableHead>
              <TableHead>Thema</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead className="hidden md:table-cell">Student</TableHead>
              <TableHead>Status</TableHead>
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
                <TableCell className="font-mono text-xs hidden sm:table-cell">{consultation.id}</TableCell>
                <TableCell className="font-medium">{consultation.topic}</TableCell>
                <TableCell>{getPatientName(consultation)}</TableCell>
                <TableCell className="hidden md:table-cell">{getStudentName(consultation)}</TableCell>
                <TableCell>
                    <Badge variant="outline" className={cn("border text-xs", CONSULTATION_STATUS_COLORS[consultation.status] || 'bg-gray-100 text-gray-800 border-gray-300')}>
                        {CONSULTATION_STATUS_LABELS[consultation.status] || consultation.status}
                    </Badge>
                </TableCell>
                <TableCell className="hidden lg:table-cell">{format(new Date(consultation.createdAt), 'dd.MM.yyyy', { locale: de })}</TableCell>
                <TableCell className="text-right">
                    {/* Link to respective detail page - Admin view might need specific permissions later */}
                    <Button variant="ghost" size="sm" asChild>
                        <Link href={
                            // Link to student view if assigned, otherwise patient view
                             consultation.studentId
                             ? `/student/beratungen/${consultation.id}`
                             : `/patient/beratungen/${consultation.id}`
                         } target="_blank" rel="noopener noreferrer"> {/* Open in new tab */}
                             Details <ArrowRight className="ml-1 h-3 w-3" />
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
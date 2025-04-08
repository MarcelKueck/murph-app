// components/features/ConsultationCard.tsx
'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Loader2, User, Users, Handshake, Eye, Tag } from "lucide-react"; // <<< Added Tag icon
import { ConsultationStatus, UserRole, Document } from '@prisma/client';
import { formatDistanceToNow } from 'date-fns';
import { de } from 'date-fns/locale';
import { motion } from 'framer-motion';
import { CONSULTATION_STATUS_LABELS, CONSULTATION_STATUS_COLORS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import AnimatedCheckmark from '../ui/AnimatedCheckmark';

type AcceptAction = (consultationId: string) => Promise<{ success: boolean; message: string; error?: any }>;

// Type including potential fields needed across different views
type ConsultationForCard = {
    id: string;
    topic: string;
    status: ConsultationStatus;
    createdAt: Date;
    patientQuestion?: string;
    documents?: Document[];
    summary?: string | null;
    categories?: string[] | null; // <<< Add categories field
    patient: {
        patientProfile?: {
            firstName: string;
            lastName: string;
        } | null;
    } | null;
    student?: {
        studentProfile?: {
            firstName: string;
            lastName: string;
        } | null;
    } | null;
};

interface ConsultationCardProps {
  consultation: ConsultationForCard;
  userRole: UserRole;
  onAccept?: AcceptAction;
  showAcceptButton?: boolean;
  onPreviewClick?: () => void;
}

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

export default function ConsultationCard({
    consultation,
    userRole,
    onAccept,
    showAcceptButton = true,
    onPreviewClick
}: ConsultationCardProps) {

    const { id, topic, status, createdAt, student, patient, summary, categories } = consultation; // <<< Destructure categories
    const statusLabel = CONSULTATION_STATUS_LABELS[status] || status;
    const statusColor = CONSULTATION_STATUS_COLORS[status] || 'bg-gray-100 text-gray-800 border-gray-300';

    const timeAgo = formatDistanceToNow(new Date(createdAt), { addSuffix: true, locale: de });

    const detailLink = userRole === UserRole.PATIENT
        ? `/patient/beratungen/${id}`
        : `/student/beratungen/${id}`;

    const studentName = student?.studentProfile
        ? `${student.studentProfile.firstName} ${student.studentProfile.lastName}`
        : 'Noch nicht zugewiesen';

     const patientName = patient?.patientProfile
        ? `${patient.patientProfile.firstName} ${patient.patientProfile.lastName}`
        : 'Unbekannt';

    const isRequestForStudent = userRole === UserRole.STUDENT && status === ConsultationStatus.REQUESTED;
    const canPreview = isRequestForStudent && onPreviewClick;

    const showCategories = userRole === UserRole.STUDENT || userRole === UserRole.ADMIN; // Only show categories to Student/Admin

  return (
     <motion.div variants={cardVariants} initial="hidden" animate="visible">
        <Card
            className={cn(
                "group hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col h-full",
                 canPreview ? "cursor-pointer" : ""
                 )}
            onClick={canPreview ? onPreviewClick : undefined}
        >
            <CardHeader>
                <div className="flex justify-between items-start gap-2">
                    <CardTitle className="text-lg font-semibold leading-tight">{topic}</CardTitle>
                     <Badge variant="outline" className={cn("whitespace-nowrap border", statusColor)}>
                        {statusLabel}
                    </Badge>
                </div>
                 {(userRole === UserRole.STUDENT) && ( // Show patient name for student regardless of status
                    <CardDescription className="flex items-center text-xs text-muted-foreground pt-1">
                        <User className="h-3 w-3 mr-1" /> Patient: {patientName}
                    </CardDescription>
                 )}
                 {/* <<< Display Categories for Student/Admin >>> */}
                 {showCategories && categories && categories.length > 0 && (
                     <div className="flex flex-wrap gap-1 pt-1.5">
                         {categories.map((category) => (
                             <Badge key={category} variant="secondary" className="text-xs px-1.5 py-0">
                                 <Tag className="h-2.5 w-2.5 mr-1"/>{category}
                             </Badge>
                         ))}
                     </div>
                 )}
                 {/* <<< End Category Display >>> */}
                <CardDescription className="flex items-center text-xs text-muted-foreground pt-1">
                    <Clock className="h-3 w-3 mr-1" /> {timeAgo}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow text-sm">
                {userRole === UserRole.PATIENT && status !== ConsultationStatus.REQUESTED && (
                    <p className="text-muted-foreground mb-2">
                        <Users className="inline-block h-4 w-4 mr-1 align-text-bottom" />
                        Student: {studentName}
                    </p>
                )}
                {canPreview && (
                    <p className="text-muted-foreground italic text-xs mt-2">Klicken, um Details zu sehen und anzunehmen.</p>
                )}
                 {status === ConsultationStatus.COMPLETED && summary && userRole === UserRole.STUDENT && (
                    <div className="mt-3 pt-3 border-t border-muted/50">
                        <p className="text-xs font-semibold text-muted-foreground mb-1">Ihre Zusammenfassung:</p>
                        <p className="text-xs text-card-foreground line-clamp-3">
                            {summary}
                        </p>
                    </div>
                 )}
            </CardContent>
            <CardFooter className="flex gap-2">
                {/* --- Button Logic --- */}
                {/* Student: Show Preview Indicator for Requested */}
                {canPreview && status === ConsultationStatus.REQUESTED && (
                     <div className='flex items-center justify-end w-full text-xs text-muted-foreground'>
                         <Eye className='w-4 h-4 mr-1 opacity-70'/> Vorschau anzeigen
                     </div>
                )}

                {/* Everyone: Show Details Button for InProgress or Completed */}
                 {(status === ConsultationStatus.IN_PROGRESS || status === ConsultationStatus.COMPLETED) && (
                     <Button variant="outline" size="sm" asChild className="flex-grow">
                        <Link href={detailLink} onClick={(e) => e.stopPropagation()}>
                            {/* <<< Adjust text based on role and status >>> */}
                            {userRole === UserRole.PATIENT && status === ConsultationStatus.COMPLETED ? "Details & Zusammenfassung" : "Details anzeigen"}
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                 )}

                {/* Patient: Show Details Button also for Requested/Assigned */}
                 {userRole === UserRole.PATIENT && (status === ConsultationStatus.REQUESTED || status === ConsultationStatus.ASSIGNED) && (
                     <Button variant="outline" size="sm" asChild className="flex-grow">
                        <Link href={detailLink} onClick={(e) => e.stopPropagation()}>
                            Details anzeigen
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                 )}

                 {/* Student: Show Direct Accept Button (Disabled) only if showAcceptButton and Requested */}
                 {/* This state should ideally not be reachable if preview is always used */}
                  {showAcceptButton && isRequestForStudent && onAccept && !canPreview && (
                    <Button
                        variant="default"
                        size="sm"
                        className="flex-grow"
                        disabled={true}
                        title="Details in Vorschau ansehen zum Annehmen"
                        >
                        <Handshake className="mr-2 h-4 w-4 opacity-50" />
                        <span className='opacity-50'>Annehmen</span>
                    </Button>
                )}
            </CardFooter>
        </Card>
     </motion.div>
  );
}
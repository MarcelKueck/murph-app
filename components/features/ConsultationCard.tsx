// components/features/ConsultationCard.tsx
'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Loader2, User, Users, Handshake, Eye } from "lucide-react"; // Added Eye icon
import { ConsultationStatus, UserRole, Document } from '@prisma/client'; // Added Document
import { formatDistanceToNow } from 'date-fns';
import { de } from 'date-fns/locale';
import { motion } from 'framer-motion';
import { CONSULTATION_STATUS_LABELS, CONSULTATION_STATUS_COLORS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import AnimatedCheckmark from '@/components/ui/AnimatedCheckmark';

type AcceptAction = (consultationId: string) => Promise<{ success: boolean; message: string; error?: any }>;

// Updated type to include documents and question (needed if logic changes, but preview handled by parent now)
type ConsultationForCard = {
    id: string;
    topic: string;
    status: ConsultationStatus;
    createdAt: Date;
    patientQuestion: string; // Keep this for potential future card logic
    documents: Document[];   // Keep this for potential future card logic
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
  onAccept?: AcceptAction; // Still needed for the dialog
  showAcceptButton?: boolean; // Control if accept button shows directly on card
  onPreviewClick?: () => void; // Callback to open preview
}

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

export default function ConsultationCard({
    consultation,
    userRole,
    onAccept, // Still needed for the dialog, passed via parent
    showAcceptButton = true, // Default to true (for patient/non-preview student view)
    onPreviewClick // Callback from parent
}: ConsultationCardProps) {
    // Note: isPending and showSuccess state are now managed within the Dialog for the Accept action
    // const [isPending, startTransition] = useTransition(); // Removed from here
    // const [showSuccess, setShowSuccess] = useState(false); // Removed from here

    const { id, topic, status, createdAt, student, patient } = consultation;
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

    // Determine if this specific card instance should trigger a preview
    const isRequestForStudent = userRole === UserRole.STUDENT && status === ConsultationStatus.REQUESTED;
    const canPreview = isRequestForStudent && onPreviewClick;

  return (
     <motion.div variants={cardVariants} initial="hidden" animate="visible">
        <Card
            className={cn(
                "group hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col h-full",
                 canPreview ? "cursor-pointer" : "" // Add cursor pointer if clickable for preview
                 )}
            onClick={canPreview ? onPreviewClick : undefined} // Trigger preview on click if applicable
        >
            <CardHeader>
                <div className="flex justify-between items-start gap-2">
                    <CardTitle className="text-lg font-semibold leading-tight">{topic}</CardTitle>
                     <Badge variant="outline" className={cn("whitespace-nowrap border", statusColor)}>
                        {statusLabel}
                    </Badge>
                </div>
                 {userRole === UserRole.STUDENT && status === ConsultationStatus.REQUESTED && (
                    <CardDescription className="flex items-center text-xs text-muted-foreground pt-1">
                        <User className="h-3 w-3 mr-1" /> Patient: {patientName}
                    </CardDescription>
                 )}
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
                {/* Hint for preview */}
                {canPreview && (
                    <p className="text-muted-foreground italic text-xs mt-2">Klicken, um Details zu sehen und anzunehmen.</p>
                )}
            </CardContent>
            <CardFooter className="flex gap-2">
                {/* Show Accept button ONLY if showAcceptButton is true AND it's a REQUESTED status */}
                {showAcceptButton && isRequestForStudent && onAccept ? (
                    <Button
                        variant="default"
                        size="sm"
                        className="flex-grow"
                        onClick={(e) => { e.stopPropagation(); /* TODO: Decide if direct accept from card is needed */ }}
                        // disabled={isPending || showSuccess} // State now handled in Dialog
                        animateInteraction
                        // This button is likely obsolete now with the dialog handling acceptance
                        >
                         {/* Simplified icon/text for now */}
                        <Handshake className="mr-2 h-4 w-4" />
                        Annehmen (Direct - Remove?)
                    </Button>
                ) : !canPreview ? ( // If NOT previewable (e.g., patient view, or student ongoing), show Details
                    <Button variant="outline" size="sm" asChild className="flex-grow">
                        <Link href={detailLink} onClick={(e) => e.stopPropagation()}> {/* Prevent card click */}
                             Details anzeigen
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                ) : (
                     // If it *can* preview, show a subtle indicator instead of a button,
                     // as the main click action opens the dialog.
                     <div className='flex items-center justify-end w-full text-xs text-muted-foreground'>
                         <Eye className='w-4 h-4 mr-1 opacity-70'/> Vorschau anzeigen
                     </div>
                )}
            </CardFooter>
        </Card>
     </motion.div>
  );
}
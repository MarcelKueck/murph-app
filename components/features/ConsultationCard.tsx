// components/features/ConsultationCard.tsx
'use client';

import React, { useTransition } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Loader2, User, Users, Handshake } from "lucide-react";
import { ConsultationStatus, User as PrismaUser, UserRole } from '@prisma/client';
import { formatDistanceToNow } from 'date-fns';
import { de } from 'date-fns/locale';
import { motion } from 'framer-motion';
import { CONSULTATION_STATUS_LABELS, CONSULTATION_STATUS_COLORS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

type AcceptAction = (consultationId: string) => Promise<{ success: boolean; message: string; error?: any }>;

type ConsultationForCard = {
    id: string;
    topic: string;
    status: ConsultationStatus;
    createdAt: Date;
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
}

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

export default function ConsultationCard({ consultation, userRole, onAccept }: ConsultationCardProps) {
    const [isPending, startTransition] = useTransition();
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


    const handleAccept = () => {
        if (!onAccept) return;

        startTransition(async () => {
            try {
                const result = await onAccept(id);
                if (result.success) {
                    toast.success("Beratung angenommen!", {
                        description: result.message,
                    });
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

    const showAcceptButton = userRole === UserRole.STUDENT && status === ConsultationStatus.REQUESTED && !!onAccept;

  return (
     <motion.div variants={cardVariants} initial="hidden" animate="visible">
        {/* Add group class for potential group-hover usage if needed later */}
        <Card className="group hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col h-full">
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
                 {/* Add placeholder content if needed */}
                 {status === ConsultationStatus.REQUESTED && userRole === UserRole.STUDENT && (
                     <p className="text-muted-foreground italic">Klicken Sie auf "Annehmen", um diese Anfrage zu bearbeiten.</p>
                 )}
            </CardContent>
            <CardFooter className="flex gap-2">
                {showAcceptButton ? (
                     <Button
                        variant="default"
                        size="sm"
                        className="flex-grow"
                        onClick={handleAccept}
                        disabled={isPending}
                        animateInteraction
                        >
                        {isPending ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <Handshake className="mr-2 h-4 w-4" />
                        )}
                        Annehmen
                    </Button>
                ) : (
                    <Button variant="outline" size="sm" asChild className="flex-grow">
                        <Link href={detailLink}>
                             Details anzeigen
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                 )}
            </CardFooter>
        </Card>
     </motion.div>
  );
}
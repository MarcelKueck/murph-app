// components/features/ConsultationCard.tsx
'use client'; // Use client for Framer Motion

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageSquare, Clock } from "lucide-react";
import { ConsultationStatus, User, UserRole } from '@prisma/client';
import { formatDistanceToNow } from 'date-fns';
import { de } from 'date-fns/locale';
import { motion } from 'framer-motion';
import { CONSULTATION_STATUS_LABELS, CONSULTATION_STATUS_COLORS } from '@/lib/constants';
import { cn } from '@/lib/utils';

// Define the expected props structure, fetching necessary related data
interface ConsultationCardProps {
  consultation: {
    id: string;
    topic: string;
    status: ConsultationStatus;
    createdAt: Date; // Use Date object
    _count?: { // Example if you fetch message count
        messages: number;
    };
    student?: { // Include student data if available/needed
      studentProfile?: {
          firstName: string;
          lastName: string;
      } | null;
    } | null;
  };
  userRole: UserRole; // To determine link destination
}

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

export default function ConsultationCard({ consultation, userRole }: ConsultationCardProps) {
    const { id, topic, status, createdAt, student } = consultation;
    const statusLabel = CONSULTATION_STATUS_LABELS[status] || status;
    const statusColor = CONSULTATION_STATUS_COLORS[status] || 'bg-gray-100 text-gray-800 border-gray-300'; // Fallback color

    // Format date relative to now
    const timeAgo = formatDistanceToNow(new Date(createdAt), { addSuffix: true, locale: de });

    const detailLink = userRole === UserRole.PATIENT
        ? `/patient/beratungen/${id}`
        : `/student/beratungen/${id}`;

    const studentName = student?.studentProfile
        ? `${student.studentProfile.firstName} ${student.studentProfile.lastName}`
        : 'Noch nicht zugewiesen';

  return (
     <motion.div variants={cardVariants} initial="hidden" animate="visible" >
        <Card className="hover:shadow-md transition-shadow duration-200 flex flex-col h-full"> {/* Ensure cards have consistent height if needed */}
            <CardHeader>
                <div className="flex justify-between items-start gap-2">
                    <CardTitle className="text-lg font-semibold leading-tight">{topic}</CardTitle>
                     <Badge variant="outline" className={cn("whitespace-nowrap border", statusColor)}>
                        {statusLabel}
                    </Badge>
                </div>
                <CardDescription className="flex items-center text-xs text-muted-foreground pt-1">
                    <Clock className="h-3 w-3 mr-1" /> {timeAgo}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
                {/* Show assigned student for patients if applicable */}
                {userRole === UserRole.PATIENT && status !== ConsultationStatus.REQUESTED && (
                    <p className="text-sm text-muted-foreground mb-2">
                        Student: {studentName}
                    </p>
                )}
                 {/* Placeholder for a snippet of the last message or question? Might be too complex for V1 Card */}
                 {/* <p className="text-sm line-clamp-2">{consultation.patientQuestionSnippet || 'Keine Vorschau verfügbar.'}</p> */}
            </CardContent>
            <CardFooter>
                <Button variant="outline" size="sm" asChild className="w-full">
                    <Link href={detailLink}>
                         Details anzeigen
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
     </motion.div>
  );
}
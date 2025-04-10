// components/features/ConsultationCard.tsx
'use client';

import React from 'react'; // Removed useState, useTransition
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
// Removed Button import as it's only used conditionally in footer text now
import { ArrowRight, Clock, User, Users, Eye, Tag } from "lucide-react"; // Adjusted imports
import { ConsultationStatus, UserRole, Document } from '@prisma/client';
import { formatDistanceToNow } from 'date-fns';
import { de } from 'date-fns/locale';
import { motion } from 'framer-motion';
import { CONSULTATION_STATUS_LABELS, CONSULTATION_STATUS_COLORS } from '@/lib/constants';
import { cn } from '@/lib/utils';

// Type definition
type ConsultationForCard = {
    id: string;
    topic: string;
    status: ConsultationStatus;
    createdAt: Date;
    patientQuestion?: string;
    documents?: Document[];
    summary?: string | null;
    categories?: string[] | null;
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
  onPreviewClick?: () => void; // Keep preview handler
}

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

export default function ConsultationCard({
    consultation,
    userRole,
    onPreviewClick
}: ConsultationCardProps) {

    const { id, topic, status, createdAt, student, patient, summary, categories } = consultation;
    const statusLabel = CONSULTATION_STATUS_LABELS[status] || status;
    const statusColor = CONSULTATION_STATUS_COLORS[status] || 'bg-gray-100 text-gray-800 border-gray-300';

    const timeAgo = formatDistanceToNow(new Date(createdAt), { addSuffix: true, locale: de });

    // Determine the primary action target URL (if applicable)
    const detailLink = (status === ConsultationStatus.IN_PROGRESS || status === ConsultationStatus.COMPLETED || (userRole === UserRole.PATIENT && (status === ConsultationStatus.REQUESTED || status === ConsultationStatus.ASSIGNED)))
        ? (userRole === UserRole.PATIENT ? `/patient/beratungen/${id}` : `/student/beratungen/${id}`)
        : null;

    const studentName = student?.studentProfile
        ? `${student.studentProfile.firstName} ${student.studentProfile.lastName}`
        : 'Noch nicht zugewiesen';

     const patientName = patient?.patientProfile
        ? `${patient.patientProfile.firstName} ${patient.patientProfile.lastName}`
        : 'Unbekannt';

    const isRequestForStudent = userRole === UserRole.STUDENT && status === ConsultationStatus.REQUESTED;
    // Determine if the card should act as a preview trigger
    const canPreview = isRequestForStudent && onPreviewClick;
    // Determine if the card should act as a navigation link
    const isNavLink = !!detailLink && !canPreview; // Only act as link if NOT a preview trigger

    const showCategories = userRole === UserRole.STUDENT || userRole === UserRole.ADMIN;

    // Define the wrapper component based on action
    const CardWrapper = isNavLink ? Link : React.Fragment;
    // Define wrapper props conditionally
    const wrapperProps = isNavLink ? { href: detailLink, className: "block h-full focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-xl" } : {}; // Add focus styles to link wrapper

  return (
     // Ensure motion div takes full height of its grid cell
     <motion.div variants={cardVariants} initial="hidden" animate="visible" className="h-full">
        {/* CardWrapper is either Link or Fragment */}
        <CardWrapper {...wrapperProps}>
             <Card
                 className={cn(
                    "group transition-all duration-200 flex flex-col h-full",
                    // Apply hover styles and cursor only if it's interactive
                    (canPreview || isNavLink) ? "hover:shadow-lg hover:-translate-y-1 cursor-pointer" : "cursor-default"
                 )}
                 // Apply onClick only if it's a preview trigger AND not also a nav link
                 onClick={canPreview ? (e) => {
                    // If wrapped in a Link, prevent default link navigation when clicking for preview
                    if (isNavLink) e.preventDefault();
                    onPreviewClick(); // Trigger the preview dialog
                 } : undefined}
                 // Add tabIndex only if clickable for preview but NOT a link, to make it focusable
                 tabIndex={canPreview && !isNavLink ? 0 : undefined}
                 // Handle Enter/Space key press for preview trigger if it's not a link
                 onKeyDown={canPreview && !isNavLink ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onPreviewClick(); } } : undefined}
             >
                 {/* Card Content and Footer remain structurally INSIDE Card */}
                <CardHeader>
                    <div className="flex justify-between items-start gap-2">
                        <CardTitle className="text-lg font-semibold leading-tight">{topic}</CardTitle>
                         <Badge variant="outline" className={cn("whitespace-nowrap border", statusColor)}>
                            {statusLabel}
                        </Badge>
                    </div>
                     {userRole === UserRole.STUDENT && (
                         <CardDescription className="flex items-center text-xs text-muted-foreground pt-1">
                            <User className="h-3 w-3 mr-1" /> Patient: {patientName}
                         </CardDescription>
                     )}
                     {showCategories && categories && categories.length > 0 && (
                         <div className="flex flex-wrap gap-1 pt-1.5">
                            {categories.map((category) => (
                                <Badge key={category} variant="secondary" className="text-xs px-1.5 py-0">
                                    <Tag className="h-2.5 w-2.5 mr-1"/>{category}
                                </Badge>
                             ))}
                         </div>
                     )}
                    <CardDescription className="flex items-center text-xs text-muted-foreground pt-1">
                        <Clock className="h-3 w-3 mr-1" /> {timeAgo}
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow text-sm pb-4"> {/* Ensure some padding at bottom */}
                    {userRole === UserRole.PATIENT && status !== ConsultationStatus.REQUESTED && (
                        <p className="text-muted-foreground mb-2">
                            <Users className="inline-block h-4 w-4 mr-1 align-text-bottom" /> Student: {studentName}
                         </p>
                    )}
                    {canPreview && (
                        <p className="text-muted-foreground italic text-xs mt-2">Klicken, um Details zu sehen und anzunehmen.</p>
                    )}
                     {status === ConsultationStatus.COMPLETED && summary && userRole === UserRole.STUDENT && (
                         <div className="mt-3 pt-3 border-t border-muted/50">
                             <p className="text-xs font-semibold text-muted-foreground mb-1">Ihre Zusammenfassung:</p>
                             <p className="text-xs text-card-foreground line-clamp-3"> {summary} </p>
                         </div>
                     )}
                </CardContent>
                 {/* Footer for visual reinforcement of action */}
                 <CardFooter className="pt-0 mt-auto"> {/* Push footer down */}
                     {(canPreview || isNavLink) && (
                        <span className={cn(
                            "text-xs text-primary inline-flex items-center w-full justify-end",
                            // Make underline appear on group hover (card hover)
                            "group-hover:underline"
                         )}>
                           {canPreview ? 'Vorschau anzeigen' : 'Details anzeigen'} <ArrowRight className="ml-1 h-3 w-3"/>
                        </span>
                    )}
                </CardFooter>
             </Card>
        </CardWrapper>
      </motion.div>
   );
}
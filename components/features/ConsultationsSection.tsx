// components/features/ConsultationsSection.tsx
'use client';

import React, { useState } from 'react'; // Import useState
import { motion } from 'framer-motion';
import ConsultationCard from './ConsultationCard';
import { MessageSquare } from 'lucide-react';
import { Consultation, UserRole, Document } from '@prisma/client'; // Added Document
import { acceptConsultation } from '@/actions/consultations';
import ConsultationPreviewDialog from './ConsultationPreviewDialog'; // Import the dialog

// Updated type to include documents and question
type ConsultationForDashboard = Consultation & {
    patientQuestion: string;
    documents: Document[];
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

interface ConsultationsSectionProps {
    consultations: ConsultationForDashboard[];
    userRole: UserRole;
    onAccept?: typeof acceptConsultation;
    emptyMessage?: string;
    allowPreview?: boolean; // New prop to control preview behavior
}

const listContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const ConsultationsSection: React.FC<ConsultationsSectionProps> = ({
    consultations,
    userRole,
    onAccept,
    emptyMessage = "Keine Beratungen in dieser Kategorie.",
    allowPreview = false, // Default to false
}) => {
    // State for managing the preview dialog
    const [selectedConsultation, setSelectedConsultation] = useState<ConsultationForDashboard | null>(null);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    const handlePreview = (consultation: ConsultationForDashboard) => {
        setSelectedConsultation(consultation);
        setIsPreviewOpen(true);
    };

    const handleClosePreview = () => {
         setIsPreviewOpen(false);
         // Optionally delay setting selectedConsultation to null for transition animations
         setTimeout(() => setSelectedConsultation(null), 300);
    }

    if (consultations.length === 0) {
        return (
             <div className="text-center py-16 text-muted-foreground border border-dashed rounded-lg mt-6">
                <MessageSquare className="mx-auto h-12 w-12 mb-4 text-gray-400" />
                <p className="text-lg">{emptyMessage}</p>
            </div>
        );
    }

    return (
        <>
            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
                variants={listContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
            >
                {consultations.map((consultation) => (
                    <ConsultationCard
                        key={consultation.id}
                        consultation={consultation as any} // Cast needed due to type mismatch possibility
                        userRole={userRole}
                        onAccept={onAccept} // Pass down accept action (might not be used directly by card now)
                        showAcceptButton={!allowPreview} // Only show accept button directly if preview is not allowed
                        onPreviewClick={allowPreview ? () => handlePreview(consultation) : undefined} // Pass preview handler only if allowed
                    />
                ))}
            </motion.div>

            {/* Render the Dialog conditionally */}
            {allowPreview && (
                 <ConsultationPreviewDialog
                    consultation={selectedConsultation}
                    isOpen={isPreviewOpen}
                    onOpenChange={handleClosePreview} // Use custom handler to reset selected on close
                    onAccept={onAccept}
                 />
            )}
        </>
    );
};

export default ConsultationsSection;
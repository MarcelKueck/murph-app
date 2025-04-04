// components/features/ConsultationsSection.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import ConsultationCard from './ConsultationCard';
import { MessageSquare } from 'lucide-react';
import { Consultation, UserRole } from '@prisma/client'; // Import necessary types
import { acceptConsultation } from '@/actions/consultations'; // Import action type if needed

// Define type for consultation data passed as props
type ConsultationForDashboard = Consultation & {
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

// Props interface for the component
interface ConsultationsSectionProps {
    consultations: ConsultationForDashboard[];
    userRole: UserRole;
    onAccept?: typeof acceptConsultation;
    emptyMessage?: string;
}

// Combined variants for container and items
const listContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      // Stagger children when the container becomes visible
      staggerChildren: 0.1,
      delayChildren: 0.1, // Optional delay before starting stagger
    },
  },
};

// Note: Card variants are now defined *within* ConsultationCard.tsx
// We just need to ensure the parent (this component) triggers the 'visible' state.

const ConsultationsSection: React.FC<ConsultationsSectionProps> = ({
    consultations,
    userRole,
    onAccept,
    emptyMessage = "Keine Beratungen in dieser Kategorie."
}) => {
    if (consultations.length === 0) {
        return (
             <div className="text-center py-16 text-muted-foreground border border-dashed rounded-lg mt-6">
                <MessageSquare className="mx-auto h-12 w-12 mb-4 text-gray-400" />
                <p className="text-lg">{emptyMessage}</p>
            </div>
        );
    }

    return (
        <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
            // Use the container variants
            variants={listContainerVariants}
            // Start hidden
            initial="hidden"
            // Animate to visible when the component scrolls into view
            whileInView="visible"
            // Trigger animation only once when it enters the viewport
            viewport={{ once: true, amount: 0.1 }} // Adjust amount (0 to 1) for when to trigger
        >
            {consultations.map((consultation) => (
                // ConsultationCard already uses motion.div and variants,
                // they will inherit the "visible" state from the parent container's animation control.
                <ConsultationCard
                    key={consultation.id}
                    consultation={consultation as any}
                    userRole={userRole}
                    onAccept={onAccept}
                />
            ))}
        </motion.div>
    );
};

export default ConsultationsSection;
// components/features/ConsultationsSection.tsx
'use client'; // <--- Add directive here

import React from 'react';
import { motion } from 'framer-motion';
import ConsultationCard from './ConsultationCard';
import { MessageSquare } from 'lucide-react';
import { Consultation, ConsultationStatus, UserRole } from '@prisma/client'; // Import necessary types
import { acceptConsultation } from '@/actions/consultations'; // Import action type if needed

// Define type for consultation data passed as props
// Ensure it includes necessary nested profile data for the Card
type ConsultationForDashboard = Consultation & {
    patient: {
        patientProfile?: {
            firstName: string;
            lastName: string;
        } | null;
    } | null;
    student?: { // Include student relation if needed
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

// Animation variants
const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// The actual Client Component
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
            variants={listVariants}
            initial="hidden"
            animate="visible"
        >
            {consultations.map((consultation) => (
                <ConsultationCard
                    key={consultation.id}
                    // Make sure the passed consultation object matches the type expected by ConsultationCard
                    consultation={consultation as any} // Use 'as any' for now or refine types
                    userRole={userRole}
                    onAccept={onAccept}
                />
            ))}
        </motion.div>
    );
};

export default ConsultationsSection;
// components/features/ConsultationList.tsx
'use client'; // <--- Add this directive

import React from 'react';
// Removed prisma and auth imports as data is passed via props
import ConsultationCard from './ConsultationCard';
import { Consultation, ConsultationStatus, UserRole } from '@prisma/client';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, MessageSquare } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

// Define type for consultation data passed as props
// Ensure it includes necessary nested profile data for the Card
type ConsultationWithDetails = Consultation & {
     student?: {
         studentProfile?: {
            firstName: string;
            lastName: string;
        } | null;
    } | null;
    patient?: { // Include patient for student view if needed later
        patientProfile?: {
            firstName: string;
            lastName: string;
        } | null;
    } | null;
};

// Updated props interface
interface ConsultationListProps {
    consultations: ConsultationWithDetails[];
    userRole: UserRole;
    isLoading: boolean;
    error: string | null;
    // Remove statusFilter/limit if fetching is done by parent
}

// Animation variants remain the same
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

// This is now a Client Component
export default function ConsultationList({
    consultations,
    userRole,
    isLoading,
    error
}: ConsultationListProps) {

    // --- Loading State ---
    if (isLoading) {
         return (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, index) => ( // Show 3 skeletons during load
                     <Card key={index} className="flex flex-col">
                        <CardHeader>
                            <Skeleton className="h-5 w-3/4 mb-2" />
                            <Skeleton className="h-3 w-1/2" />
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <Skeleton className="h-4 w-full mb-2" />
                            <Skeleton className="h-4 w-2/3" />
                        </CardContent>
                         <CardFooter>
                            <Skeleton className="h-9 w-full" />
                        </CardFooter>
                    </Card>
                ))}
            </div>
         );
    }

    // --- Error State ---
     if (error) {
        return (
            <Alert variant="destructive" className="mt-6"> {/* Added margin */}
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Fehler</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        );
    }

    // --- Empty State ---
    if (consultations.length === 0) {
         return (
             <div className="text-center py-16 text-muted-foreground border border-dashed rounded-lg mt-6">
                <MessageSquare className="mx-auto h-12 w-12 mb-4 text-gray-400" />
                <p className="text-lg">Keine Beratungen gefunden.</p>
                 {userRole === UserRole.PATIENT && (
                     <p className="text-sm mt-2">Sie haben noch keine Beratung angefordert.</p>
                )}
                 {userRole === UserRole.STUDENT && ( // Keep this check if component is reused
                     <p className="text-sm mt-2">Ihnen sind derzeit keine Beratungen zugewiesen.</p>
                )}
            </div>
         );
    }

    // --- Success State ---
    return (
        <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={listVariants}
            initial="hidden"
            animate="visible"
        >
            {consultations.map((consultation) => (
                 <ConsultationCard
                    key={consultation.id}
                    consultation={consultation}
                    userRole={userRole}
                    // onAccept prop would be passed down if needed (not for patient list)
                />
            ))}
        </motion.div>
    );
}
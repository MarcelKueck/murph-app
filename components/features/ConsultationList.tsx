// components/features/ConsultationList.tsx
import React from 'react';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import ConsultationCard from './ConsultationCard';
import { Consultation, ConsultationStatus, UserRole } from '@prisma/client';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"; // Add Alert component

// Define type for consultations fetched with necessary relations
type ConsultationWithDetails = Consultation & {
     student?: {
         studentProfile?: {
            firstName: string;
            lastName: string;
        } | null;
    } | null;
     // Add _count or other fields if needed by ConsultationCard
};

interface ConsultationListProps {
    statusFilter?: ConsultationStatus[]; // Optional filter by status
    limit?: number; // Optional limit
    showLoading?: boolean; // Prop to control skeleton display (useful if parent handles loading)
}

// This component fetches its own data server-side
export default async function ConsultationList({ statusFilter, limit, showLoading = true }: ConsultationListProps) {
    const session = await auth();

    if (!session?.user) {
        redirect('/login'); // Should be caught by middleware/layout, but good failsafe
    }

    const userId = session.user.id;
    const userRole = session.user.role;

    let consultations: ConsultationWithDetails[] = [];
    let isLoading = showLoading; // Start loading if prop allows
    let error: string | null = null;

    try {
        consultations = await prisma.consultation.findMany({
            where: {
                // Filter by patient or student ID based on role
                ...(userRole === UserRole.PATIENT ? { patientId: userId } : { studentId: userId }),
                // Apply status filter if provided
                ...(statusFilter && statusFilter.length > 0 && { status: { in: statusFilter } }),
            },
            include: {
                // Include student profile only if user is patient and consultation is not just REQUESTED
                ...(userRole === UserRole.PATIENT && {
                    student: {
                        include: {
                            studentProfile: {
                                select: { firstName: true, lastName: true } // Select only needed fields
                            }
                        }
                    }
                }),
                 // Could include patient profile if user is student
                 // ...(userRole === UserRole.STUDENT && {
                 //    patient: { include: { patientProfile: true } }
                 // }),
                // _count: { select: { messages: true } } // Example: Include message count
            },
            orderBy: {
                createdAt: 'desc', // Show newest first
            },
            take: limit, // Apply limit if provided
        });
        isLoading = false; // Data fetched successfully
    } catch (e) {
        console.error("Error fetching consultations:", e);
        error = "Beratungen konnten nicht geladen werden.";
        isLoading = false; // Stop loading on error
    }

    // --- Loading State ---
    if (isLoading) {
         return (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(limit || 3)].map((_, index) => ( // Show skeletons based on limit or default
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
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Fehler</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        );
    }

    // --- Empty State ---
    if (consultations.length === 0) {
         return (
             <div className="text-center py-12 text-muted-foreground">
                <MessageSquare className="mx-auto h-12 w-12 mb-4" />
                <p>Keine Beratungen gefunden.</p>
                {/* Optionally add a CTA here if it makes sense */}
            </div>
         );
    }

    // --- Success State ---
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {consultations.map((consultation) => (
                <ConsultationCard
                    key={consultation.id}
                    consultation={consultation}
                    userRole={userRole}
                />
            ))}
        </div>
    );
}
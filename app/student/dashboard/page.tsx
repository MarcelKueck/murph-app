// app/student/dashboard/page.tsx
import React, { Suspense } from 'react';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { ConsultationStatus, UserRole } from '@prisma/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ConsultationCard from '@/components/features/ConsultationCard';
import { acceptConsultation } from '@/actions/consultations'; // Import the server action
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, MessageSquare } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Define type for consultations fetched for the dashboard
type ConsultationForDashboard = Awaited<ReturnType<typeof fetchConsultations>>[number];

// Function to fetch consultations server-side
async function fetchConsultations(studentId: string) {
    try {
         // Fetch requested consultations (available to all students, include patient profile)
         const requestedConsultations = await prisma.consultation.findMany({
            where: {
                status: ConsultationStatus.REQUESTED,
            },
            include: {
                patient: { // Include patient details for the queue
                    include: {
                        patientProfile: {
                            select: { firstName: true, lastName: true }
                        }
                    }
                }
            },
            orderBy: { createdAt: 'asc' }, // Show oldest requests first
        });

        // Fetch consultations already in progress for *this* student
        const inProgressConsultations = await prisma.consultation.findMany({
            where: {
                studentId: studentId,
                status: ConsultationStatus.IN_PROGRESS,
            },
             include: { // Include patient details for ongoing consultations too
                patient: {
                    include: {
                        patientProfile: {
                            select: { firstName: true, lastName: true }
                        }
                    }
                }
            },
            orderBy: { updatedAt: 'desc' }, // Show most recently updated first
        });

        return { requested: requestedConsultations, inProgress: inProgressConsultations, error: null };

    } catch (error) {
        console.error("Error fetching student consultations:", error);
        return { requested: [], inProgress: [], error: "Beratungen konnten nicht geladen werden." };
    }
}

// Loading Skeleton for Consultation List
const ConsultationListSkeleton = ({ count = 3 }: { count?: number }) => (
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {[...Array(count)].map((_, index) => (
             <Card key={index} className="flex flex-col">
                <CardHeader>
                    <Skeleton className="h-5 w-3/4 mb-2" />
                    <Skeleton className="h-3 w-1/2" />
                    <Skeleton className="h-3 w-1/3" />
                </CardHeader>
                <CardContent className="flex-grow">
                    {/* Add skeleton content matching card */}
                </CardContent>
                 <CardFooter>
                    <Skeleton className="h-9 w-full" />
                </CardFooter>
            </Card>
        ))}
    </div>
);

// Separate component to render list to keep main component clean
const ConsultationsSection = ({
    title,
    consultations,
    userRole,
    onAccept,
    emptyMessage = "Keine Beratungen in dieser Kategorie."
} : {
    title: string;
    consultations: ConsultationForDashboard[];
    userRole: UserRole;
    onAccept?: typeof acceptConsultation; // Pass action conditionally
    emptyMessage?: string;
}) => {
    if (consultations.length === 0) {
        return (
            <div className="text-center py-12 text-muted-foreground mt-6 border border-dashed rounded-lg">
                <MessageSquare className="mx-auto h-10 w-10 mb-3" />
                <p>{emptyMessage}</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {consultations.map((consultation) => (
                <ConsultationCard
                    key={consultation.id}
                    consultation={consultation}
                    userRole={userRole}
                    onAccept={onAccept} // Pass the action down
                />
            ))}
        </div>
    );
};


export default async function StudentDashboardPage() {
    const session = await auth();
    // Redirect handled by layout/middleware
    if (!session?.user || session.user.role !== UserRole.STUDENT) {
       redirect('/login'); // Failsafe
    }
    const studentId = session.user.id;

    // Fetch data directly in the server component
    const { requested, inProgress, error } = await fetchConsultations(studentId);

    if (error) {
         return (
             <div className="space-y-8">
                 <h1 className="text-3xl font-bold tracking-tight">Studenten Dashboard</h1>
                 <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Fehler</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
             </div>
        );
    }

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold tracking-tight">Studenten Dashboard</h1>

             <Tabs defaultValue="anfragen" className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
                    <TabsTrigger value="anfragen">Offene Anfragen ({requested.length})</TabsTrigger>
                    <TabsTrigger value="laufend">Meine Beratungen ({inProgress.length})</TabsTrigger>
                </TabsList>

                {/* Tab for Open Requests */}
                <TabsContent value="anfragen">
                     <Suspense fallback={<ConsultationListSkeleton count={requested.length || 3} />}>
                        {/* Pass the acceptConsultation action to the section */}
                         <ConsultationsSection
                             title="Offene Anfragen"
                             consultations={requested}
                             userRole={UserRole.STUDENT}
                             onAccept={acceptConsultation} // Pass server action directly
                             emptyMessage="Derzeit gibt es keine offenen Anfragen."
                         />
                     </Suspense>
                </TabsContent>

                {/* Tab for In-Progress Consultations */}
                <TabsContent value="laufend">
                    <Suspense fallback={<ConsultationListSkeleton count={inProgress.length || 3} />}>
                         <ConsultationsSection
                             title="Meine laufenden Beratungen"
                             consultations={inProgress}
                             userRole={UserRole.STUDENT}
                             // No accept action needed here
                             emptyMessage="Sie haben derzeit keine laufenden Beratungen."
                         />
                     </Suspense>
                </TabsContent>
            </Tabs>
        </div>
    );
}
// Add Card imports if needed by skeleton in this file scope
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
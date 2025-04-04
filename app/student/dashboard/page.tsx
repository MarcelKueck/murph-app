// app/student/dashboard/page.tsx
import React, { Suspense } from 'react';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { Consultation, ConsultationStatus, UserRole, Document } from '@prisma/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { acceptConsultation } from '@/actions/consultations';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, MessageSquare, CheckCheck } from 'lucide-react'; // Added CheckCheck icon
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import ConsultationsSection from '@/components/features/ConsultationsSection';

// Update type to include summary
type ConsultationForDashboard = Consultation & {
    summary?: string | null; // <<< Add summary
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

// Function to fetch consultations server-side (UPDATED QUERY for completed)
async function fetchConsultations(studentId: string) {
    try {
         const requestedConsultations = await prisma.consultation.findMany({
            where: { status: ConsultationStatus.REQUESTED },
            include: {
                patient: { include: { patientProfile: { select: { firstName: true, lastName: true } } } },
                documents: true
            },
            orderBy: { createdAt: 'asc' },
        });
        const inProgressConsultations = await prisma.consultation.findMany({
            where: { studentId: studentId, status: ConsultationStatus.IN_PROGRESS },
             include: {
                patient: { include: { patientProfile: { select: { firstName: true, lastName: true } } } },
                documents: true
             },
            orderBy: { updatedAt: 'desc' },
        });
        // <<< Fetch Completed Consultations >>>
        const completedConsultations = await prisma.consultation.findMany({
             where: { studentId: studentId, status: ConsultationStatus.COMPLETED },
             include: {
                 patient: { include: { patientProfile: { select: { firstName: true, lastName: true } } } },
                 // Documents usually not needed here, summary is key
             },
             orderBy: { updatedAt: 'desc' }, // Order by completion date
         });

        return {
            requested: requestedConsultations as ConsultationForDashboard[],
            inProgress: inProgressConsultations as ConsultationForDashboard[],
            completed: completedConsultations as ConsultationForDashboard[], // <<< Add completed
            error: null
        };
    } catch (error) {
        console.error("Error fetching student consultations:", error);
        return { requested: [], inProgress: [], completed: [], error: "Beratungen konnten nicht geladen werden." }; // <<< Add completed init
    }
}

// Loading Skeleton remains the same
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
                    <Skeleton className="h-4 w-full mb-1" />
                    <Skeleton className="h-4 w-2/3" />
                </CardContent>
                 <CardFooter>
                    <Skeleton className="h-9 w-full" />
                </CardFooter>
            </Card>
        ))}
    </div>
);

// Main Page Component (Server Component)
export default async function StudentDashboardPage() {
    const session = await auth();
    if (!session?.user || session.user.role !== UserRole.STUDENT) {
       redirect('/login');
    }
    const studentId = session.user.id;

    // Fetch data using the updated function
    const { requested, inProgress, completed, error } = await fetchConsultations(studentId); // <<< Get completed

    if (error) {
         return (
             <div className="container mx-auto py-8 space-y-8">
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
        <div className="container mx-auto py-8 space-y-8">
            <h1 className="text-3xl font-bold tracking-tight">Studenten Dashboard</h1>
            <p className="text-muted-foreground">Verwalten Sie Ihre Beratungsanfragen und laufenden Erklärungen.</p>

             <Tabs defaultValue="anfragen" className="w-full">
                 {/* <<< Update TabsList for 3 columns >>> */}
                <TabsList className="grid w-full grid-cols-3 md:w-[600px]">
                    <TabsTrigger value="anfragen">Offene Anfragen ({requested.length})</TabsTrigger>
                    <TabsTrigger value="laufend">Meine Beratungen ({inProgress.length})</TabsTrigger>
                    <TabsTrigger value="abgeschlossen">Abgeschlossen ({completed.length})</TabsTrigger> {/* <<< Add Completed Trigger >>> */}
                </TabsList>

                <TabsContent value="anfragen">
                     <Card>
                         <CardHeader>
                             <CardTitle>Verfügbare Anfragen</CardTitle>
                             <CardDescription>Wählen Sie eine Anfrage aus, um die Details zu sehen und sie anzunehmen.</CardDescription>
                         </CardHeader>
                         <CardContent>
                             <Suspense fallback={<ConsultationListSkeleton count={requested.length || 3} />}>
                                <ConsultationsSection
                                    consultations={requested}
                                    userRole={UserRole.STUDENT}
                                    onAccept={acceptConsultation}
                                    emptyMessage="Derzeit gibt es keine offenen Anfragen."
                                    allowPreview={true}
                                />
                             </Suspense>
                        </CardContent>
                     </Card>
                </TabsContent>

                <TabsContent value="laufend">
                     <Card>
                         <CardHeader>
                             <CardTitle>Ihre aktiven Beratungen</CardTitle>
                             <CardDescription>Dies sind die Beratungen, die Sie derzeit bearbeiten.</CardDescription>
                         </CardHeader>
                        <CardContent>
                             <Suspense fallback={<ConsultationListSkeleton count={inProgress.length || 3} />}>
                                <ConsultationsSection
                                    consultations={inProgress}
                                    userRole={UserRole.STUDENT}
                                    emptyMessage="Sie haben derzeit keine laufenden Beratungen."
                                    allowPreview={false}
                                />
                            </Suspense>
                         </CardContent>
                    </Card>
                </TabsContent>

                {/* <<< Add TabsContent for Completed >>> */}
                <TabsContent value="abgeschlossen">
                     <Card>
                         <CardHeader>
                             <CardTitle>Abgeschlossene Beratungen</CardTitle>
                             <CardDescription>Eine Übersicht Ihrer abgeschlossenen Erklärungen und Zusammenfassungen.</CardDescription>
                         </CardHeader>
                        <CardContent>
                             <Suspense fallback={<ConsultationListSkeleton count={completed.length || 3} />}>
                                <ConsultationsSection
                                    consultations={completed}
                                    userRole={UserRole.STUDENT}
                                    emptyMessage="Sie haben noch keine Beratungen abgeschlossen."
                                    allowPreview={false} // No preview needed here
                                />
                            </Suspense>
                         </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
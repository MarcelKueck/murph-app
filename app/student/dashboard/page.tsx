// app/student/dashboard/page.tsx
import React, { Suspense } from 'react';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { Consultation, ConsultationStatus, UserRole } from '@prisma/client'; // Keep types
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// Remove ConsultationCard import if only used within ConsultationsSection
// import ConsultationCard from '@/components/features/ConsultationCard';
import { acceptConsultation } from '@/actions/consultations';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, MessageSquare } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"; // Keep card imports
// Remove motion import if no longer used directly here
// import { motion } from 'framer-motion';
import ConsultationsSection from '@/components/features/ConsultationsSection'; // <--- Import the new component

// Define type for consultations fetched for the dashboard (matching the one in the new component file)
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

// Function to fetch consultations server-side (remains the same)
async function fetchConsultations(studentId: string) {
    try {
         const requestedConsultations = await prisma.consultation.findMany({
            where: { status: ConsultationStatus.REQUESTED },
            include: { patient: { include: { patientProfile: { select: { firstName: true, lastName: true } } } } },
            orderBy: { createdAt: 'asc' },
        });
        const inProgressConsultations = await prisma.consultation.findMany({
            where: { studentId: studentId, status: ConsultationStatus.IN_PROGRESS },
             include: { patient: { include: { patientProfile: { select: { firstName: true, lastName: true } } } } },
            orderBy: { updatedAt: 'desc' },
        });
        return {
            requested: requestedConsultations as ConsultationForDashboard[],
            inProgress: inProgressConsultations as ConsultationForDashboard[],
            error: null
        };
    } catch (error) {
        console.error("Error fetching student consultations:", error);
        return { requested: [], inProgress: [], error: "Beratungen konnten nicht geladen werden." };
    }
}

// Loading Skeleton for Consultation List (remains the same)
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
            <p className="text-muted-foreground">Verwalten Sie Ihre Beratungsanfragen und laufenden Erklärungen.</p>

             <Tabs defaultValue="anfragen" className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
                    <TabsTrigger value="anfragen">Offene Anfragen ({requested.length})</TabsTrigger>
                    <TabsTrigger value="laufend">Meine Beratungen ({inProgress.length})</TabsTrigger>
                </TabsList>

                <TabsContent value="anfragen">
                     <Card>
                         <CardHeader>
                             <CardTitle>Verfügbare Anfragen</CardTitle>
                             <CardDescription>Wählen Sie eine Anfrage aus, um die Details zu sehen und sie anzunehmen.</CardDescription>
                         </CardHeader>
                         <CardContent>
                             <Suspense fallback={<ConsultationListSkeleton count={requested.length || 3} />}>
                                {/* Use the imported Client Component */}
                                <ConsultationsSection
                                    consultations={requested}
                                    userRole={UserRole.STUDENT}
                                    onAccept={acceptConsultation}
                                    emptyMessage="Derzeit gibt es keine offenen Anfragen."
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
                                {/* Use the imported Client Component */}
                                <ConsultationsSection
                                    consultations={inProgress}
                                    userRole={UserRole.STUDENT}
                                    emptyMessage="Sie haben derzeit keine laufenden Beratungen."
                                />
                            </Suspense>
                         </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
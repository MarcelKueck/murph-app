// app/student/dashboard/page.tsx
import React, { Suspense } from 'react';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { Consultation, ConsultationStatus, UserRole, Document } from '@prisma/client'; // Added Document type
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { acceptConsultation } from '@/actions/consultations';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, MessageSquare } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import ConsultationsSection from '@/components/features/ConsultationsSection';

// Update type to include patientQuestion and documents for the preview
type ConsultationForDashboard = Consultation & {
    patientQuestion: string; // Ensure this is fetched
    documents: Document[];   // Ensure documents are fetched
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

// Function to fetch consultations server-side (UPDATED QUERY)
async function fetchConsultations(studentId: string) {
    try {
         const requestedConsultations = await prisma.consultation.findMany({
            where: { status: ConsultationStatus.REQUESTED },
            include: {
                patient: { include: { patientProfile: { select: { firstName: true, lastName: true } } } },
                documents: true // <<< Include documents for preview
            },
            // Select patientQuestion explicitly if not automatically included by default with model
            // select: { patientQuestion: true, ... }, // Prisma often includes all scalar fields by default
            orderBy: { createdAt: 'asc' },
        });
        const inProgressConsultations = await prisma.consultation.findMany({
            where: { studentId: studentId, status: ConsultationStatus.IN_PROGRESS },
             include: {
                patient: { include: { patientProfile: { select: { firstName: true, lastName: true } } } },
                documents: true // Also include here for consistency if needed later
             },
            orderBy: { updatedAt: 'desc' },
        });
        return {
            // Cast to the updated type
            requested: requestedConsultations as ConsultationForDashboard[],
            inProgress: inProgressConsultations as ConsultationForDashboard[],
            error: null
        };
    } catch (error) {
        console.error("Error fetching student consultations:", error);
        return { requested: [], inProgress: [], error: "Beratungen konnten nicht geladen werden." };
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

// Main Page Component (Server Component) - No structural changes needed here
export default async function StudentDashboardPage() {
    const session = await auth();
    if (!session?.user || session.user.role !== UserRole.STUDENT) {
       redirect('/login');
    }
    const studentId = session.user.id;

    // Fetch data using the updated function
    const { requested, inProgress, error } = await fetchConsultations(studentId);

    if (error) {
         return (
             <div className="container mx-auto py-8 space-y-8"> {/* Added container/padding */}
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
        <div className="container mx-auto py-8 space-y-8"> {/* Added container/padding */}
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
                                {/* ConsultationsSection now handles the preview dialog */}
                                <ConsultationsSection
                                    consultations={requested}
                                    userRole={UserRole.STUDENT}
                                    onAccept={acceptConsultation}
                                    emptyMessage="Derzeit gibt es keine offenen Anfragen."
                                    allowPreview={true} // Add prop to indicate preview is needed
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
                                    allowPreview={false} // No preview for ongoing consultations
                                />
                            </Suspense>
                         </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
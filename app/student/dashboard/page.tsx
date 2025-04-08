// app/student/dashboard/page.tsx
import React, { Suspense } from 'react';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { Consultation, ConsultationStatus, UserRole, Document } from '@prisma/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { acceptConsultation } from '@/actions/consultations';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, MessageSquare, CheckCheck } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import ConsultationsSection from '@/components/features/ConsultationsSection';
import CategoryFilter from '@/components/features/CategoryFilter'; // <<< Import the filter component
import { PREDEFINED_CONSULTATION_CATEGORIES } from '@/lib/constants'; // <<< Import categories

// Update type to include summary and categories
type ConsultationForDashboard = Consultation & {
    summary?: string | null;
    categories?: string[] | null; // <<< Ensure categories is included
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

// Update fetchConsultations to accept filters
async function fetchConsultations(studentId: string, categoryFilters?: string[]) {
    try {
        // Build the where clause for requested consultations based on filters
        const requestedWhere: any = { status: ConsultationStatus.REQUESTED };
        if (categoryFilters && categoryFilters.length > 0) {
           // Prisma 'hasSome' filter checks if the array field contains ANY of the specified values
            requestedWhere.categories = { hasSome: categoryFilters };
        }

        const requestedConsultations = await prisma.consultation.findMany({
            where: requestedWhere, // Use the dynamic where clause
            include: {
                patient: { include: { patientProfile: { select: { firstName: true, lastName: true } } } },
                documents: true
            },
            orderBy: { createdAt: 'asc' },
        });

        // Fetching inProgress consultations (filters not applied here)
        const inProgressConsultations = await prisma.consultation.findMany({
             where: { studentId: studentId, status: ConsultationStatus.IN_PROGRESS },
             include: {
                patient: { include: { patientProfile: { select: { firstName: true, lastName: true } } } },
                documents: true
             },
            orderBy: { updatedAt: 'desc' },
        });

        // Fetching Completed Consultations (filters not applied here)
        const completedConsultations = await prisma.consultation.findMany({
             where: { studentId: studentId, status: ConsultationStatus.COMPLETED },
             include: {
                 patient: { include: { patientProfile: { select: { firstName: true, lastName: true } } } },
             },
             orderBy: { updatedAt: 'desc' },
         });

        return {
            requested: requestedConsultations as ConsultationForDashboard[],
            inProgress: inProgressConsultations as ConsultationForDashboard[],
            completed: completedConsultations as ConsultationForDashboard[],
            error: null
        };
    } catch (error) {
        console.error("Error fetching student consultations:", error);
        return { requested: [], inProgress: [], completed: [], error: "Beratungen konnten nicht geladen werden." };
    }
}

// Loading Skeleton
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

// Update Page Component Props to include searchParams
export default async function StudentDashboardPage({
    searchParams
}: {
    searchParams?: { [key: string]: string | string[] | undefined };
}) {
    const session = await auth();
    if (!session?.user || session.user.role !== UserRole.STUDENT) {
       redirect('/login');
    }
    const studentId = session.user.id;

   // Extract category filters from search params
   let categoryFilters: string[] = [];
   if (searchParams?.categories) {
       const cats = searchParams.categories;
       categoryFilters = Array.isArray(cats) ? cats : [cats];
        // Optional: Validate if needed against PREDEFINED_CONSULTATION_CATEGORIES
   }

    // Fetch data using the updated function with filters
    const { requested, inProgress, completed, error } = await fetchConsultations(studentId, categoryFilters); // Pass filters

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

    // Determine the total number of *unfiltered* requested consultations for the badge
    // We need a separate query for this, or we could fetch all requested and filter client-side (less ideal for large lists)
    // Let's do a quick extra count for accuracy.
    const totalRequestedCount = await prisma.consultation.count({ where: { status: ConsultationStatus.REQUESTED } });

    return (
        <div className="container mx-auto py-8 space-y-8">
            <h1 className="text-3xl font-bold tracking-tight">Studenten Dashboard</h1>
            <p className="text-muted-foreground">Verwalten Sie Ihre Beratungsanfragen und laufenden Erklärungen.</p>

             <Tabs defaultValue="anfragen" className="w-full">
                <TabsList className="grid w-full grid-cols-3 md:w-[600px]">
                    {/* Use total count for the badge */}
                    <TabsTrigger value="anfragen">Offene Anfragen ({totalRequestedCount})</TabsTrigger>
                    <TabsTrigger value="laufend">Meine Beratungen ({inProgress.length})</TabsTrigger>
                    <TabsTrigger value="abgeschlossen">Abgeschlossen ({completed.length})</TabsTrigger>
                </TabsList>

                <TabsContent value="anfragen">
                     <Card>
                         <CardHeader>
                             {/* Wrap Title/Description and Filter in a flex container */}
                             <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4'>
                                 <div>
                                     <CardTitle>Verfügbare Anfragen</CardTitle>
                                     <CardDescription>Wählen Sie eine Anfrage aus, um die Details zu sehen und sie anzunehmen.</CardDescription>
                                 </div>
                                 {/* Add Category Filter Component */}
                                 <CategoryFilter
                                      allCategories={PREDEFINED_CONSULTATION_CATEGORIES}
                                      selectedCategories={categoryFilters}
                                 />
                             </div>
                         </CardHeader>
                         <CardContent>
                             <Suspense fallback={<ConsultationListSkeleton count={requested.length || 3} />}>
                                <ConsultationsSection
                                    consultations={requested}
                                    userRole={UserRole.STUDENT}
                                    onAccept={acceptConsultation}
                                    emptyMessage={categoryFilters.length > 0 ? "Keine Anfragen entsprechen den gewählten Filtern." : "Derzeit gibt es keine offenen Anfragen."} // Update empty message based on filters
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
                                    allowPreview={false} // No preview needed for active consultations
                                />
                            </Suspense>
                         </CardContent>
                    </Card>
                </TabsContent>

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
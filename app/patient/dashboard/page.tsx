// app/patient/dashboard/page.tsx
import React, { Suspense } from 'react';
import ConsultationList from '@/components/features/ConsultationList';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FilePlus2, MessageSquare, FileText, AlertCircle } from 'lucide-react'; // Added FileText, AlertCircle
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { UserRole, ConsultationStatus, Consultation, Document } from '@prisma/client'; // Added Document
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import SummaryCard from '@/components/features/SummaryCard'; // Import SummaryCard
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'; // Import Alert components

// Type for active/requested consultations (for the main list)
type ConsultationWithDetails = Consultation & {
     summary?: string | null;
     categories?: string[] | null; // Keep categories if needed for other parts
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
    documents?: Document[]; // Ensure documents are available if ConsultationList uses them
    patientQuestion?: string; // Ensure question is available if ConsultationList uses it
};

// Type for Completed Consultation Summaries
export type CompletedConsultationSummary = Pick<Consultation,
    'id' | 'topic' | 'status' | 'updatedAt' | 'patientRating' | 'summary'
>;

// Fetch both active (requested/in-progress) and completed consultations
async function getPatientConsultations(userId: string): Promise<{
    activeConsultations: ConsultationWithDetails[],
    completedConsultations: CompletedConsultationSummary[],
    error: string | null
}> {
    try {
       // Fetch Active (Requested + In Progress)
        const activeConsultations = await prisma.consultation.findMany({
            where: {
                patientId: userId,
                status: { in: [ConsultationStatus.REQUESTED, ConsultationStatus.IN_PROGRESS] }
            },
            include: {
                // Include details needed for ConsultationList/ConsultationCard
                patient: { include: { patientProfile: { select: { firstName: true, lastName: true } } } },
                student: { include: { studentProfile: { select: { firstName: true, lastName: true } } } },
                documents: true, // Include documents if card needs them
                // Also need patientQuestion if card uses it
                // patientQuestion: true // Uncomment if ConsultationCard needs this for Patient role
                // Also need categories if card needs them
                // categories: true // Uncomment if ConsultationCard needs this for Patient role
            },
            orderBy: {
                createdAt: 'desc', // Order active ones by creation date
            },
        });

       // Fetch Completed (for Summary Section)
       const completedConsultations = await prisma.consultation.findMany({
            where: {
               patientId: userId,
               status: ConsultationStatus.COMPLETED,
           },
           select: { // Select only fields needed for SummaryCard
                id: true,
                topic: true,
                status: true,
                updatedAt: true, // Use this as completion date
                patientRating: true,
                summary: true, // Fetch summary for potential preview (optional)
           },
           orderBy: {
               updatedAt: 'desc', // Order completed by completion date
           }
       });

       return {
           activeConsultations: activeConsultations as ConsultationWithDetails[],
           completedConsultations: completedConsultations as CompletedConsultationSummary[],
           error: null
       };
    } catch (e) {
        console.error("Error fetching patient consultations:", e);
       return { activeConsultations: [], completedConsultations: [], error: "Beratungen konnten nicht geladen werden." };
    }
}

// Loading component for main list
const ConsultationListLoading = () => (
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, index) => (
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

// Loading component for Summary List
const SummaryListLoading = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {[...Array(2)].map((_, index) => (
             <Card key={index} className="flex flex-col">
                <CardHeader className='pb-2'>
                    <Skeleton className="h-5 w-3/4 mb-1" />
                    <Skeleton className="h-3 w-1/2" />
                </CardHeader>
                <CardContent className="flex-grow pt-2 pb-4">
                    <Skeleton className="h-8 w-full" /> {/* Placeholder for status/button */}
                </CardContent>
                 <CardFooter>
                    <Skeleton className="h-8 w-1/2" /> {/* Placeholder for download/link */}
                </CardFooter>
            </Card>
        ))}
    </div>
);

// Page Component
export default async function PatientDashboardPage() {
    const session = await auth();

    if (!session?.user || session.user.role !== UserRole.PATIENT) {
        redirect('/login');
    }
    const userId = session.user.id;

   const { activeConsultations, completedConsultations, error } = await getPatientConsultations(userId);

    return (
        <div className="container mx-auto py-8 space-y-8">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                   <h1 className="text-3xl font-bold tracking-tight">Patienten-Dashboard</h1>
                   <p className="text-muted-foreground">Ihre Anfragen, laufenden Beratungen und Zusammenfassungen.</p>
                </div>
                <Button asChild size="lg" animateInteraction>
                    <Link href="/patient/anfrage">
                        <FilePlus2 className="mr-2 h-5 w-5" />
                        Neue Beratung anfordern
                    </Link>
                </Button>
            </div>

           {/* Active Consultation List Section */}
           <Card>
                <CardHeader>
                    <CardTitle>Aktive Anfragen & Beratungen</CardTitle>
                    <CardDescription>Übersicht Ihrer angefragten und laufenden medizinischen Erklärungen.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Suspense fallback={<ConsultationListLoading />}>
                         <ConsultationList
                             consultations={activeConsultations}
                             userRole={UserRole.PATIENT}
                             error={error} // Pass error down if needed
                             isLoading={false} // Loading handled by Suspense
                             // Need to update ConsultationList to handle empty state maybe?
                         />
                    </Suspense>
               </CardContent>
           </Card>

           {/* --- Summary Section --- */}
            <Card>
                 <CardHeader>
                    <CardTitle>Meine Zusammenfassungen</CardTitle>
                    <CardDescription>Hier finden Sie die Zusammenfassungen Ihrer abgeschlossenen Beratungen.</CardDescription>
                 </CardHeader>
                 <CardContent>
                     <Suspense fallback={<SummaryListLoading />}>
                         {/* Display error specific to this section if needed, or rely on ConsultationList error */}
                         {error && !completedConsultations.length && ( // Show error only if no completed consultations were loaded AND there was an error
                             <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Fehler</AlertTitle>
                                <AlertDescription>{error}</AlertDescription>
                             </Alert>
                         )}
                         {/* Display empty state if no errors and no completed consultations */}
                         {!error && completedConsultations.length === 0 && (
                            <div className="text-center py-10 text-muted-foreground border border-dashed rounded-lg">
                                <FileText className="mx-auto h-10 w-10 mb-3 text-gray-400" />
                                <p className="text-md">Keine abgeschlossenen Beratungen gefunden.</p>
                                <p className="text-sm mt-1">Zusammenfassungen erscheinen hier nach Abschluss und Abgabe des Feedbacks.</p>
                            </div>
                         )}
                         {/* Display summary cards if no errors and consultations exist */}
                         {!error && completedConsultations.length > 0 && (
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {completedConsultations.map((consultation) => (
                                     <SummaryCard key={consultation.id} consultation={consultation} />
                                ))}
                             </div>
                         )}
                     </Suspense>
                 </CardContent>
            </Card>
           {/* --- End Summary Section --- */}
        </div>
    );
}
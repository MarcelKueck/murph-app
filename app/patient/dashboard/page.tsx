// app/patient/dashboard/page.tsx
import React, { Suspense } from 'react';
import ConsultationList from '@/components/features/ConsultationList';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FilePlus2 } from 'lucide-react';
import { auth } from '@/lib/auth'; // Import auth
import prisma from '@/lib/prisma'; // Import prisma
import { redirect } from 'next/navigation'; // Import redirect
import { UserRole } from '@prisma/client'; // Import UserRole

// --- Define Consultation type consistent with ConsultationList ---
import { type Consultation } from '@prisma/client'; // Import base type if needed

type ConsultationWithDetails = Consultation & {
     student?: {
         studentProfile?: {
            firstName: string;
            lastName: string;
        } | null;
    } | null;
    patient?: { // Keep patient relation for potential reuse consistency
        patientProfile?: {
            firstName: string;
            lastName: string;
        } | null;
    } | null;
};
// --- ---

// --- Data Fetching Function ---
async function getPatientConsultations(userId: string): Promise<{ consultations: ConsultationWithDetails[], error: string | null }> {
    try {
        const consultations = await prisma.consultation.findMany({
            where: {
                patientId: userId,
                // Add status filters here if needed by parent component logic
            },
            include: {
                patient: { // Include patient profile
                    include: { patientProfile: { select: { firstName: true, lastName: true } } }
                },
                student: { // Include student profile
                    include: { studentProfile: { select: { firstName: true, lastName: true } } }
                }
            },
            orderBy: {
                createdAt: 'desc',
            },
            // Add limit here if needed
        });
        return { consultations, error: null };
    } catch (e) {
        console.error("Error fetching patient consultations:", e);
        return { consultations: [], error: "Beratungen konnten nicht geladen werden." };
    }
}
// --- ---

// --- Loading component remains the same ---
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

const ConsultationListLoading = () => (
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
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
// --- ---

// Make the Page component async to fetch data
export default async function PatientDashboardPage() {
    const session = await auth();

    // Re-verify auth and role (layout should handle, but good practice)
    if (!session?.user || session.user.role !== UserRole.PATIENT) {
        redirect('/login');
    }
    const userId = session.user.id;

    // Fetch data server-side
    const { consultations, error } = await getPatientConsultations(userId);

    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Meine Beratungen</h1>
                    <p className="text-muted-foreground">Übersicht Ihrer angefragten und laufenden medizinischen Erklärungen.</p>
                </div>
                <Button asChild size="lg" animateInteraction>
                    <Link href="/patient/anfrage">
                        <FilePlus2 className="mr-2 h-5 w-5" />
                        Neue Beratung anfordern
                    </Link>
                </Button>
            </div>

            {/* Consultation List Section */}
            {/* Wrap Client Component in Suspense */}
            <Suspense fallback={<ConsultationListLoading />}>
                 {/* Pass fetched data and props to the Client Component */}
                 <ConsultationList
                     consultations={consultations}
                     userRole={UserRole.PATIENT}
                     isLoading={false} // Data is already loaded here
                     error={error}
                 />
            </Suspense>
        </div>
    );
}
// app/admin/consultations/page.tsx
import React, { Suspense } from 'react';
import prisma from '@/lib/prisma';
import { ConsultationStatus, Consultation, PatientProfile, StudentProfile, User } from '@prisma/client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import AdminConsultationTable from '@/components/admin/AdminConsultationTable'; // Correct path for component
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// Type for consultation view in admin
export type AdminConsultationView = Consultation & {
    patient: User & { patientProfile: PatientProfile | null };
    student: (User & { studentProfile: StudentProfile | null }) | null;
    // Explicitly add ratings for type safety during selection
   patientRating?: number | null;
   clarityRating?: number | null;
   helpfulnessRating?: number | null;
   communicationRating?: number | null;
};

async function getConsultationsForAdmin(filter?: string): Promise<AdminConsultationView[]> {
     let whereCondition: any = {};
     // Filter logic remains the same...
     if (filter === 'active') {
         whereCondition = { status: { in: [ConsultationStatus.REQUESTED, ConsultationStatus.IN_PROGRESS] } };
     } else if (Object.values(ConsultationStatus).includes(filter as ConsultationStatus)) {
         whereCondition = { status: filter as ConsultationStatus };
     }

     console.log("[Admin Consultations] Fetching consultations with filter:", filter || "None");
     const consultations = await prisma.consultation.findMany({
         where: whereCondition,
         // Use explicit SELECT to guarantee fields
         select: {
            // Include all original Consultation fields needed by the table/card
            id: true,
            patientId: true,
            studentId: true,
            status: true,
            topic: true,
            patientQuestion: false, // Not needed for table
            summary: false, // Not needed for table
            categories: true, // Keep if needed later
            createdAt: true,
            updatedAt: true,
            // Explicitly select ALL rating fields
            patientRating: true,
            clarityRating: true,
            helpfulnessRating: true,
            communicationRating: true,
            patientFeedback: false, // Not needed for table
            // Include related data needed
            patient: { include: { patientProfile: true } }, // Keep full include here ok
            student: { include: { studentProfile: true } }, // Keep full include here ok
         },
         orderBy: {
             createdAt: 'desc',
         }
     });

    // Add console log to check fetched data
    if (consultations.length > 0) {
        console.log("[Admin Consultations] Sample fetched data[0]:", {
            id: consultations[0].id,
            topic: consultations[0].topic,
            status: consultations[0].status,
            patientRating: consultations[0].patientRating,
            clarityRating: consultations[0].clarityRating,
            helpfulnessRating: consultations[0].helpfulnessRating,
            communicationRating: consultations[0].communicationRating,
            patientName: consultations[0].patient?.patientProfile?.firstName,
            studentName: consultations[0].student?.studentProfile?.firstName,
        });
    } else {
        console.log("[Admin Consultations] No consultations found for current filter.");
    }

     return consultations as AdminConsultationView[];
}

// Loading Skeleton
const TableSkeleton = () => (
    <div className="space-y-2 mt-4">
        <Skeleton className="h-10 w-full rounded-md" />
        <Skeleton className="h-10 w-full rounded-md" />
        <Skeleton className="h-10 w-full rounded-md" />
        <Skeleton className="h-10 w-full rounded-md" />
        <Skeleton className="h-10 w-full rounded-md" />
    </div>
);

export default async function AdminConsultationsPage({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
   // Await searchParams
   const awaitedSearchParams = await searchParams;
   const filter = awaitedSearchParams?.filter as string | undefined;
    console.log("[Admin Consultations Page] Rendering with filter:", filter || "None");

    // Await the data fetching
    const consultations = await getConsultationsForAdmin(filter);
    const getFilterDescription = () => {
        switch(filter) {
            case 'active': return 'Filter: Aktive (Angefragt & Laufend).';
            case ConsultationStatus.REQUESTED: return 'Filter: Nur Angefragt.';
            case ConsultationStatus.IN_PROGRESS: return 'Filter: Nur Laufend.';
            case ConsultationStatus.COMPLETED: return 'Filter: Nur Abgeschlossen.';
            default: return 'Alle Beratungen im System.';
        }
    };

    return (
        <Card>
            <CardHeader>
                 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                     <div>
                        <CardTitle>Beratungsübersicht</CardTitle>
                        <CardDescription>
                            {getFilterDescription()}
                        </CardDescription>
                    </div>
                    {/* Filter Links */}
                    <div className="flex gap-2 flex-wrap">
                        <Button size="sm" variant={!filter ? "secondary" : "outline"} asChild>
                            <Link href="/admin/consultations">Alle</Link>
                        </Button>
                         <Button size="sm" variant={filter === 'active' ? "secondary" : "outline"} asChild>
                            <Link href="/admin/consultations?filter=active">Aktive</Link>
                        </Button>
                         <Button size="sm" variant={filter === ConsultationStatus.REQUESTED ? "secondary" : "outline"} asChild>
                            <Link href={`/admin/consultations?filter=${ConsultationStatus.REQUESTED}`}>Angefragt</Link>
                        </Button>
                        <Button size="sm" variant={filter === ConsultationStatus.IN_PROGRESS ? "secondary" : "outline"} asChild>
                            <Link href={`/admin/consultations?filter=${ConsultationStatus.IN_PROGRESS}`}>Laufend</Link>
                        </Button>
                        <Button size="sm" variant={filter === ConsultationStatus.COMPLETED ? "secondary" : "outline"} asChild>
                            <Link href={`/admin/consultations?filter=${ConsultationStatus.COMPLETED}`}>Abgeschlossen</Link>
                        </Button>
                    </div>
                 </div>
            </CardHeader>
            <CardContent>
                <Suspense fallback={<TableSkeleton />}>
                    <AdminConsultationTable consultations={consultations} />
                </Suspense>
            </CardContent>
        </Card>
    );
}
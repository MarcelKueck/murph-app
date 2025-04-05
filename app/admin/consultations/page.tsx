// app/admin/consultations/page.tsx
import React, { Suspense } from 'react';
import prisma from '@/lib/prisma';
import { ConsultationStatus, Consultation, PatientProfile, StudentProfile, User } from '@prisma/client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import AdminConsultationTable from '@/components/admin/AdminConsultationTable'; // Create this next
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// Type for consultation view in admin
export type AdminConsultationView = Consultation & {
    patient: User & { patientProfile: PatientProfile | null };
    student: (User & { studentProfile: StudentProfile | null }) | null; // Student can be null
};

async function getConsultationsForAdmin(filter?: string): Promise<AdminConsultationView[]> {
     let whereCondition: any = {};
      // Example filter
     if (filter === 'active') {
         whereCondition = {
             status: {
                 in: [ConsultationStatus.REQUESTED, ConsultationStatus.IN_PROGRESS]
             }
         };
     } else if (Object.values(ConsultationStatus).includes(filter as ConsultationStatus)) {
         whereCondition = { status: filter as ConsultationStatus };
     }


    const consultations = await prisma.consultation.findMany({
         where: whereCondition,
        include: {
            patient: { include: { patientProfile: true } },
            student: { include: { studentProfile: true } },
        },
        orderBy: {
            createdAt: 'desc',
        }
    });
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
    const filter = searchParams?.filter as string | undefined;
    const consultations = await getConsultationsForAdmin(filter);

    const getFilterDescription = () => {
        switch(filter) {
            case 'active': return 'Filter: Aktive (Angefragt & Laufend).';
            case ConsultationStatus.REQUESTED: return 'Filter: Nur Angefragt.';
            case ConsultationStatus.IN_PROGRESS: return 'Filter: Nur Laufend.';
            case ConsultationStatus.COMPLETED: return 'Filter: Nur Abgeschlossen.';
            default: return 'Alle Beratungen im System.';
        }
    }

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
                    {/* Simple Filter Links */}
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
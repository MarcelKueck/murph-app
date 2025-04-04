// app/patient/dashboard/page.tsx
import React, { Suspense } from 'react';
import ConsultationList from '@/components/features/ConsultationList';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FilePlus2 } from 'lucide-react';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { UserRole } from '@prisma/client';
import { type Consultation } from '@prisma/client';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

type ConsultationWithDetails = Consultation & {
     student?: {
         studentProfile?: {
            firstName: string;
            lastName: string;
        } | null;
    } | null;
    patient?: {
        patientProfile?: {
            firstName: string;
            lastName: string;
        } | null;
    } | null;
};

async function getPatientConsultations(userId: string): Promise<{ consultations: ConsultationWithDetails[], error: string | null }> {
    try {
        const consultations = await prisma.consultation.findMany({
            where: {
                patientId: userId,
            },
            include: {
                patient: {
                    include: { patientProfile: { select: { firstName: true, lastName: true } } }
                },
                student: {
                    include: { studentProfile: { select: { firstName: true, lastName: true } } }
                }
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        return { consultations, error: null };
    } catch (e) {
        console.error("Error fetching patient consultations:", e);
        return { consultations: [], error: "Beratungen konnten nicht geladen werden." };
    }
}

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

export default async function PatientDashboardPage() {
    const session = await auth();

    if (!session?.user || session.user.role !== UserRole.PATIENT) {
        redirect('/login');
    }
    const userId = session.user.id;

    const { consultations, error } = await getPatientConsultations(userId);

    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Meine Beratungen</h1>
                    <p className="text-muted-foreground">Übersicht Ihrer angefragten und laufenden medizinischen Erklärungen.</p>
                </div>
                {/* Apply animateInteraction to this primary CTA */}
                <Button asChild size="lg" animateInteraction>
                    <Link href="/patient/anfrage">
                        <FilePlus2 className="mr-2 h-5 w-5" />
                        Neue Beratung anfordern
                    </Link>
                </Button>
            </div>

            {/* Consultation List Section */}
            <Suspense fallback={<ConsultationListLoading />}>
                 <ConsultationList
                     consultations={consultations}
                     userRole={UserRole.PATIENT}
                     isLoading={false}
                     error={error}
                 />
            </Suspense>
        </div>
    );
}
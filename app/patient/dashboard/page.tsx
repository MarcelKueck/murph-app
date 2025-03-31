// app/patient/dashboard/page.tsx
import React, { Suspense } from 'react';
import ConsultationList from '@/components/features/ConsultationList';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FilePlus2, Loader2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton'; // Use Skeleton directly for Suspense fallback

// Define a simple loading component for Suspense fallback
const ConsultationListLoading = () => (
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
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


export default function PatientDashboardPage() {
    // Middleware and Layout already handle auth checks

    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Meine Beratungen</h1>
                    <p className="text-muted-foreground">Übersicht Ihrer angefragten und laufenden medizinischen Erklärungen.</p>
                </div>
                <Button asChild size="lg">
                    <Link href="/patient/anfrage">
                        <FilePlus2 className="mr-2 h-5 w-5" />
                        Neue Beratung anfordern
                    </Link>
                </Button>
            </div>

            {/* Consultation List Section */}
            {/* Wrap ConsultationList in Suspense for better loading UX */}
            <Suspense fallback={<ConsultationListLoading />}>
                 {/* @ts-expect-error Server Component */}
                <ConsultationList />
            </Suspense>

            {/* Optional: Could add sections filtered by status later */}
            {/* <section>
                 <h2 className="text-xl font-semibold mb-4">Laufende Beratungen</h2>
                 <Suspense fallback={<ConsultationListLoading />}>
                     <ConsultationList statusFilter={[ConsultationStatus.IN_PROGRESS]} showLoading={false} />
                 </Suspense>
             </section>
              <section>
                 <h2 className="text-xl font-semibold mb-4">Angefragte Beratungen</h2>
                  <Suspense fallback={<ConsultationListLoading />}>
                     <ConsultationList statusFilter={[ConsultationStatus.REQUESTED]} showLoading={false} />
                 </Suspense>
             </section> */}
        </div>
    );
}
// Re-add Card imports if ConsultationListLoading needs them defined in this file scope
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
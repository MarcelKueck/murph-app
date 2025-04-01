// app/student/beratungen/[consultationId]/page.tsx
import React from 'react';
import { auth } from '@/lib/auth'; // Import server-side auth helper
import prisma from '@/lib/prisma'; // Import Prisma client
import { notFound, redirect } from 'next/navigation'; // Next.js navigation functions
import ChatInterface from '@/components/features/ChatInterface'; // Import the chat UI component
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'; // Shadcn Card components
import Link from 'next/link'; // Next.js Link component
import { Button } from '@/components/ui/button'; // Shadcn Button component
import { ArrowLeft } from 'lucide-react'; // Icon component
import { ConsultationStatus, UserRole } from '@prisma/client'; // Prisma enums
import ConsultationSummaryForm from '@/components/features/ConsultationSummaryForm'; // Form for summary
import { cn } from '@/lib/utils'; // Shadcn utility function

// Define props structure for the page component
interface ConsultationDetailPageProps {
  params: { consultationId: string };
}

// Server-side function to fetch consultation data (STUDENT perspective)
async function getConsultationData(consultationId: string, studentId: string) {
    try {
        const consultation = await prisma.consultation.findUnique({
            where: {
            id: consultationId,
            // Security Check: Ensure the logged-in user is the ASSIGNED student
            studentId: studentId,
            },
            include: {
            messages: { // Include messages
                orderBy: { createdAt: 'asc' },
                include: {
                sender: { // Include sender details
                    select: {
                    id: true,
                    role: true,
                    patientProfile: { select: { firstName: true, lastName: true } },
                    studentProfile: { select: { firstName: true, lastName: true } },
                    }
                }
                }
            },
            documents: { // Include documents
                orderBy: { createdAt: 'asc' },
            },
            patient: { // Include patient's details for context
                include: {
                    patientProfile: {
                        select: { firstName: true, lastName: true }
                    }
                }
            }
            }
        });
        return consultation; // Return fetched data
    } catch (error) {
        console.error(`Error fetching student consultation data for ID ${consultationId}:`, error);
        return null; // Return null on error
    }
}


// The main Server Component for the page
export default async function StudentConsultationDetailPage({ params }: ConsultationDetailPageProps) {
    // ---- Data Fetching and Authorization ----
    const session = await auth(); // Get user session
    const { consultationId } = params; // Access consultationId after potential await

    // Authorization check: Ensure user is logged in and is a student
    if (!session?.user?.id || session.user.role !== UserRole.STUDENT) {
        redirect(`/login?callbackUrl=/student/beratungen/${consultationId}`);
    }
    const studentId = session.user.id;

    // Fetch the consultation data
    const consultation = await getConsultationData(consultationId, studentId);

    // If consultation not found (or student isn't assigned), render 404
    if (!consultation) {
        notFound();
    }
    // ---- End Data Fetching and Authorization ----


    // ---- Data Preparation for Client Components ----
    // Map messages to the required format
    const initialMessages = consultation.messages.map(msg => {
        const senderProfile = msg.sender.role === UserRole.PATIENT
            ? msg.sender.patientProfile
            : msg.sender.studentProfile;
        return {
            id: msg.id,
            content: msg.content,
            createdAt: msg.createdAt.toISOString(),
            sender: {
                id: msg.sender.id,
                role: msg.sender.role,
                firstName: senderProfile?.firstName ?? 'Nutzer',
                lastName: senderProfile?.lastName ?? '',
            }
        };
    });

    // Map documents to the required format
    const initialDocuments = consultation.documents.map(doc => ({
        id: doc.id,
        fileName: doc.fileName,
        storageUrl: doc.storageUrl,
        mimeType: doc.mimeType,
        fileSize: doc.fileSize,
    }));

    // Prepare patient display name
    const patientName = consultation.patient?.patientProfile
        ? `${consultation.patient.patientProfile.firstName} ${consultation.patient.patientProfile.lastName}`
        : 'Unbekannt';
     // ---- End Data Preparation ----


    // ---- Render Page UI ----
    return (
        <div className="container mx-auto py-8 space-y-6">
            {/* Back Button & Page Header */}
            <div className="flex items-center justify-between mb-4">
                <Button variant="outline" size="sm" asChild>
                    <Link href="/student/dashboard">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Zurück zum Dashboard
                    </Link>
                </Button>
                {/* Optional: Status Badge */}
            </div>

            {/* Consultation Info Card */}
            <Card>
                <CardHeader>
                <CardTitle className="text-2xl">Beratung: {consultation.topic}</CardTitle>
                <CardDescription>
                    Anfrage von Patient: {patientName}
                </CardDescription>
                </CardHeader>
                {/* Optional: Display original patient question for context */}
                <CardContent>
                    <p className="text-sm font-medium mb-1">Ursprüngliche Frage des Patienten:</p>
                    <p className="text-sm text-muted-foreground p-3 border rounded bg-muted/50 whitespace-pre-wrap">{consultation.patientQuestion}</p>
                </CardContent>
            </Card>

            {/* Chat Interface Card */}
            {/* Added flex classes to manage height */}
            <Card className="flex flex-col overflow-hidden">
                <CardHeader>
                    <CardTitle>Chatverlauf</CardTitle>
                </CardHeader>
                {/* CardContent grows, allowing ChatInterface height calc to work */}
                <CardContent className="flex-grow p-0 md:p-6 md:pt-0">
                        <ChatInterface
                            consultationId={consultation.id}
                            currentUserId={studentId} // Student's ID
                            initialMessages={initialMessages}
                            initialDocuments={initialDocuments}
                            consultationStatus={consultation.status}
                        />
                </CardContent>
            </Card>

            {/* Summary & Completion Card (Only render if In Progress) */}
            {consultation.status === ConsultationStatus.IN_PROGRESS && (
                <Card>
                    <CardHeader>
                        <CardTitle>Zusammenfassung & Abschluss</CardTitle>
                        <CardDescription>
                            Fassen Sie hier die Erklärung kurz zusammen (mind. 10 Zeichen) und schließen Sie die Beratung ab.
                            Diese Zusammenfassung dient Ihrer Dokumentation.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {/* Render the summary form */}
                        <ConsultationSummaryForm
                            consultationId={consultation.id}
                            initialSummary={consultation.summary} // Pass summary if editing is allowed later
                        />
                    </CardContent>
                </Card>
            )}

            {/* Display Saved Summary (Only render if Completed) */}
            {consultation.status === ConsultationStatus.COMPLETED && consultation.summary && (
                <Card>
                    <CardHeader>
                        <CardTitle>Ihre gespeicherte Zusammenfassung</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground p-3 border rounded bg-muted/50 whitespace-pre-wrap">{consultation.summary}</p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
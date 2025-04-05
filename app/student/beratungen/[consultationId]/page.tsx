// app/student/beratungen/[consultationId]/page.tsx
import React from 'react';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { notFound, redirect } from 'next/navigation';
import ChatInterface from '@/components/features/ChatInterface';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { ConsultationStatus, UserRole } from '@prisma/client';
import ConsultationSummaryForm from '@/components/features/ConsultationSummaryForm';
import { cn } from '@/lib/utils';
import { CONSULTATION_STATUS_LABELS, CONSULTATION_STATUS_COLORS } from '@/lib/constants'; // <<< Import constants

// Server-side function to fetch consultation data (STUDENT perspective)
async function getConsultationData(consultationId: string, studentId: string) {
    try {
        const consultation = await prisma.consultation.findUnique({
            where: {
            id: consultationId,
            studentId: studentId, // Ensure student is assigned
            },
            include: {
            messages: {
                orderBy: { createdAt: 'asc' },
                include: {
                sender: {
                    select: {
                        id: true,
                        role: true,
                        image: true, // <<< Include sender image
                        patientProfile: { select: { firstName: true, lastName: true } },
                        studentProfile: { select: { firstName: true, lastName: true } },
                    }
                }
                }
            },
            documents: {
                orderBy: { createdAt: 'asc' },
            },
            patient: {
                include: {
                    patientProfile: {
                        select: { firstName: true, lastName: true }
                    }
                }
            }
            }
        });
        return consultation;
    } catch (error) {
        console.error(`Error fetching student consultation data for ID ${consultationId}:`, error);
        return null;
    }
}


// The main Server Component for the page
interface ConsultationDetailPageProps {
  params: { consultationId: string };
}
export default async function StudentConsultationDetailPage({ params }: ConsultationDetailPageProps) {
    const session = await auth();
    const { consultationId } = params;

    if (!session?.user?.id || session.user.role !== UserRole.STUDENT) {
        redirect(`/login?callbackUrl=/student/beratungen/${consultationId}`);
    }
    const studentId = session.user.id;

    const consultation = await getConsultationData(consultationId, studentId);

    if (!consultation) {
        notFound();
    }

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
                image: msg.sender.image, // <<< Pass sender image
            }
        };
    });

    const initialDocuments = consultation.documents.map(doc => ({
        id: doc.id,
        fileName: doc.fileName,
        storageUrl: doc.storageUrl,
        mimeType: doc.mimeType,
        fileSize: doc.fileSize,
    }));

    const patientName = consultation.patient?.patientProfile
        ? `${consultation.patient.patientProfile.firstName} ${consultation.patient.patientProfile.lastName}`
        : 'Unbekannt';

    return (
        <div className="container mx-auto py-8 space-y-6">
            <div className="flex items-center justify-between mb-4">
                <Button variant="outline" size="sm" asChild>
                    <Link href="/student/dashboard">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Zurück zum Dashboard
                    </Link>
                </Button>
                {/* Status Badge */}
                <span className={cn("px-2 py-0.5 rounded text-xs font-medium border",
                    CONSULTATION_STATUS_COLORS[consultation.status] || 'bg-gray-100 text-gray-800 border-gray-300'
                )}>
                    {CONSULTATION_STATUS_LABELS[consultation.status] || consultation.status}
                </span>
            </div>

            <Card>
                <CardHeader>
                <CardTitle className="text-2xl">Beratung: {consultation.topic}</CardTitle>
                <CardDescription>
                    Anfrage von Patient: {patientName}
                </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm font-medium mb-1">Ursprüngliche Frage des Patienten:</p>
                    <p className="text-sm text-muted-foreground p-3 border rounded bg-muted/50 whitespace-pre-wrap">{consultation.patientQuestion}</p>
                </CardContent>
            </Card>

            <Card className="flex flex-col overflow-hidden">
                <CardHeader>
                    <CardTitle>Chatverlauf</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow p-0 md:p-6 md:pt-0">
                        <ChatInterface
                            consultationId={consultation.id}
                            currentUserId={studentId}
                            initialMessages={initialMessages} // <<< Pass updated initialMessages
                            initialDocuments={initialDocuments}
                            consultationStatus={consultation.status}
                        />
                </CardContent>
            </Card>

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
                        <ConsultationSummaryForm
                            consultationId={consultation.id}
                            initialSummary={consultation.summary}
                        />
                    </CardContent>
                </Card>
            )}

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
// app/student/beratungen/[consultationId]/page.tsx
import React from 'react';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { notFound, redirect } from 'next/navigation';
import ChatInterface from '@/components/features/ChatInterface';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Star, MessageSquareQuote, User, Users } from 'lucide-react';
import { ConsultationStatus, UserRole } from '@prisma/client';
import ConsultationSummaryForm from '@/components/features/ConsultationSummaryForm';
import { cn } from '@/lib/utils';
import { CONSULTATION_STATUS_LABELS, CONSULTATION_STATUS_COLORS } from '@/lib/constants';
import JargonExplainer from '@/components/features/JargonExplainer';
import { MessageData } from '@/components/features/ChatMessage';

// Helper to display stars
const RatingDisplay = ({ rating }: { rating: number | null | undefined }) => {
    if (rating === null || rating === undefined) return null;
    return (
        <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => ( <Star key={i} className={cn( "w-4 h-4", i < rating ? "fill-yellow-400 text-yellow-500" : "fill-muted stroke-muted-foreground/50" )} /> ))}
            <span className="text-sm font-medium ml-1">({rating}/5)</span>
        </div>
    );
};


// Server-side function
async function getConsultationData(consultationId: string, studentId: string) {
    try {
        const consultation = await prisma.consultation.findUnique({
            where: { id: consultationId, studentId: studentId, },
            include: {
                messages: { orderBy: { createdAt: 'asc' }, include: { sender: { select: { id: true, role: true, image: true, patientProfile: { select: { firstName: true, lastName: true } }, studentProfile: { select: { firstName: true, lastName: true } }, } } } },
                documents: { orderBy: { createdAt: 'asc' } },
                patient: { select: { email: true, patientProfile: { select: { firstName: true, lastName: true } } } },
                student: { include: { studentProfile: { select: { firstName: true, lastName: true, university: true } } } }
            }
        });
        return consultation;
    } catch (error) {
        console.error(`Error fetching student consultation data for ID ${consultationId}:`, error);
        return null;
    }
}

interface ConsultationDetailPageProps {
  params: { consultationId: string };
}
export default async function StudentConsultationDetailPage({ params }: ConsultationDetailPageProps) {
    const awaitedParams = await params;
    const { consultationId } = awaitedParams;
    const session = await auth();

    if (!session?.user?.id || session.user.role !== UserRole.STUDENT) {
        redirect(`/login?callbackUrl=/student/beratungen/${consultationId}`);
    }
    const studentId = session.user.id;

    const consultation = await getConsultationData(consultationId, studentId);

    if (!consultation) { notFound(); }

    const initialMessages: MessageData[] = consultation.messages.map(msg => {
        const senderProfile = msg.sender.role === UserRole.PATIENT ? msg.sender.patientProfile : msg.sender.studentProfile;
        return { id: msg.id, content: msg.content, createdAt: msg.createdAt.toISOString(), sender: { id: msg.sender.id, role: msg.sender.role, firstName: senderProfile?.firstName ?? 'Nutzer', lastName: senderProfile?.lastName ?? '', image: msg.sender.image, } };
    });
    const initialDocuments = consultation.documents.map(doc => ({ id: doc.id, fileName: doc.fileName, storageUrl: doc.storageUrl, mimeType: doc.mimeType, fileSize: doc.fileSize, }));
    const patientName = consultation.patient?.patientProfile ? `${consultation.patient.patientProfile.firstName} ${consultation.patient.patientProfile.lastName}` : consultation.patient.email;

    return (
        <div className="container mx-auto py-8 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                 {/* --- CORRECTED Back Button Structure --- */}
                <Button variant="outline" size="sm" asChild>
                    <Link href="/student/dashboard">
                         {/* Content goes INSIDE the Link */}
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Zurück zum Dashboard
                    </Link>
                </Button>
                 {/* --- End Correction --- */}

                 <span className={cn("px-2 py-0.5 rounded text-xs font-medium border", CONSULTATION_STATUS_COLORS[consultation.status] || 'bg-gray-100 text-gray-800 border-gray-300' )}>
                    {CONSULTATION_STATUS_LABELS[consultation.status] || consultation.status}
                </span>
            </div>

            {/* Consultation Info Card */}
            <Card>
                <CardHeader> <CardTitle className="text-2xl">Beratung: {consultation.topic}</CardTitle> <CardDescription> Anfrage von Patient: {patientName} </CardDescription> </CardHeader>
                <CardContent> <p className="text-sm font-medium mb-1">Ursprüngliche Frage des Patienten:</p> <p className="text-sm text-muted-foreground p-3 border rounded bg-muted/50 whitespace-pre-wrap">{consultation.patientQuestion}</p> </CardContent>
            </Card>

            {/* Chat Interface Card */}
            <Card className="flex flex-col overflow-hidden">
                <CardHeader> <CardTitle>Chatverlauf</CardTitle> </CardHeader>
                <CardContent className="flex-grow p-0 md:p-6 md:pt-0">
                        <ChatInterface
                            consultationId={consultation.id}
                            currentUserId={studentId}
                            initialMessages={initialMessages}
                            initialDocuments={initialDocuments}
                            consultationStatus={consultation.status}
                            // patientQuestion prop removed
                        />
                        {consultation.status === ConsultationStatus.IN_PROGRESS && ( <div className="px-4 pb-4 md:px-0 md:pb-0"> <JargonExplainer /> </div> )}
                </CardContent>
            </Card>

            {/* Summary & Completion Card */}
            {consultation.status === ConsultationStatus.IN_PROGRESS && (
                <Card>
                    <CardHeader> <CardTitle>Zusammenfassung & Abschluss</CardTitle> <CardDescription> Fassen Sie hier die Erklärung kurz zusammen... </CardDescription> </CardHeader>
                    <CardContent> <ConsultationSummaryForm consultationId={consultation.id} initialSummary={consultation.summary} chatHistory={initialMessages} /> </CardContent>
                </Card>
            )}

            {/* Completed Info */}
            {consultation.status === ConsultationStatus.COMPLETED && (
                <div className="space-y-6">
                    {consultation.summary && ( <Card> <CardHeader> <CardTitle>Ihre gespeicherte Zusammenfassung</CardTitle> </CardHeader> <CardContent> <p className="text-sm text-muted-foreground p-3 border rounded bg-muted/50 whitespace-pre-wrap">{consultation.summary}</p> </CardContent> </Card> )}
                     <Card>
                        <CardHeader> <CardTitle>Patientenfeedback</CardTitle> </CardHeader>
                        <CardContent className="space-y-3">
                             <div className="flex items-center"> <span className="text-sm font-medium mr-2">Bewertung:</span> <RatingDisplay rating={consultation.patientRating} /> {(consultation.patientRating === null || consultation.patientRating === undefined) && ( <span className="text-sm text-muted-foreground italic">Keine Bewertung abgegeben.</span> )} </div>
                            {consultation.patientFeedback ? ( <div> <span className="text-sm font-medium block mb-1">Kommentar:</span> <p className="text-sm text-muted-foreground p-3 border rounded bg-muted/50 whitespace-pre-wrap">{consultation.patientFeedback}</p> </div> ) : ( <p className="text-sm text-muted-foreground italic">Kein schriftliches Feedback vom Patienten abgegeben.</p> )}
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
// app/student/beratungen/[consultationId]/page.tsx
import React from 'react';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { notFound, redirect } from 'next/navigation';
import ChatInterface from '@/components/features/ChatInterface';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'; // Added CardFooter back
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Star, User, Smile, Brain, Handshake } from 'lucide-react'; // Added detailed rating icons
import { ConsultationStatus, UserRole, Message, Document as DbDocument, PatientProfile } from '@prisma/client'; // Use Prisma types
import ConsultationSummaryForm from '@/components/features/ConsultationSummaryForm';
import { cn } from '@/lib/utils';
import { CONSULTATION_STATUS_LABELS, CONSULTATION_STATUS_COLORS } from '@/lib/constants';
import JargonExplainer from '@/components/features/JargonExplainer';
import { MessageData } from '@/components/features/ChatMessage'; // Keep type for form
import DocumentLink from '@/components/features/DocumentLink'; // Import to display docs in header if needed
import { format } from 'date-fns'; // Import date-fns format
import { de } from 'date-fns/locale'; // Import German locale for date-fns

// Helper to display stars with Label
const RatingDisplay = ({ rating, label, icon: Icon }: { rating: number | null | undefined, label: string, icon?: React.ElementType }) => {
    if (rating === null || rating === undefined) return null; // Don't display if no rating
    return (
        <div className="flex items-center gap-2">
            {Icon && <Icon className="w-4 h-4 text-muted-foreground" />}
            <span className="text-sm font-medium">{label}:</span>
            {[...Array(5)].map((_, i) => (
                <Star key={i} className={cn("w-4 h-4", i < rating ? "fill-yellow-400 text-yellow-500" : "fill-muted stroke-muted-foreground/50")} />
            ))}
            <span className="text-sm font-medium">({rating}/5)</span>
        </div>
    );
};


// Server-side function
async function getConsultationData(consultationId: string, studentId: string) {
    try {
        const consultation = await prisma.consultation.findUnique({
            where: {
                id: consultationId,
                studentId: studentId, // Ensure student owns it
            },
            select: { // Select needed fields explicitly
                id: true, topic: true, status: true, patientQuestion: true, summary: true,
                createdAt: true, updatedAt: true, patientId: true, studentId: true,
                // Feedback fields for display
                patientRating: true, clarityRating: true, helpfulnessRating: true,
                communicationRating: true, patientFeedback: true,
                messages: {
                    orderBy: { createdAt: 'asc' },
                    include: {
                        sender: { select: { id: true, role: true, image: true, patientProfile: { select: { firstName: true, lastName: true } }, studentProfile: { select: { firstName: true, lastName: true } } } },
                        attachedDocuments: { // <<< Include linked documents >>>
                            select: { id: true, fileName: true, storageUrl: true, mimeType: true, fileSize: true },
                            orderBy: { createdAt: 'asc'}
                        }
                    }
                },
                documents: { // Fetch all documents for top list
                    orderBy: { createdAt: 'asc' },
                     select: { id: true, fileName: true, storageUrl: true, mimeType: true, fileSize: true, uploaderId: true }
                },
                patient: { // Select patient details
                     select: { email: true, patientProfile: { select: { firstName: true, lastName: true } } }
                },
                // student relation already confirmed by where clause, no need to select again
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

    // Map messages including attached documents
    const initialMessages: MessageData[] = consultation.messages.map(msg => {
        // Added safe navigation for sender potentially being null in edge cases
        const senderProfile = msg.sender?.role === UserRole.PATIENT ? msg.sender.patientProfile : msg.sender?.studentProfile;
        return {
            id: msg.id, content: msg.content, createdAt: msg.createdAt.toISOString(),
            sender: {
                id: msg.sender?.id ?? 'unknown', role: msg.sender?.role ?? UserRole.PATIENT,
                firstName: senderProfile?.firstName ?? 'Nutzer', lastName: senderProfile?.lastName ?? '',
                image: msg.sender?.image,
            },
            attachedDocuments: msg.attachedDocuments.map(doc => ({ // Map the included docs
                 id: doc.id, fileName: doc.fileName, storageUrl: doc.storageUrl,
                 mimeType: doc.mimeType, fileSize: doc.fileSize,
            })) ?? [] // Default to empty array if attachedDocuments relation is missing
        };
    });
    // Map all documents for top list
    const initialDocuments = consultation.documents.map(doc => ({
        id: doc.id, fileName: doc.fileName, storageUrl: doc.storageUrl,
        mimeType: doc.mimeType, fileSize: doc.fileSize, uploaderId: doc.uploaderId
    }));
    const patientName = consultation.patient?.patientProfile ? `${consultation.patient.patientProfile.firstName} ${consultation.patient.patientProfile.lastName}` : consultation.patient?.email ?? 'Unbekannt';

    // Filter initial documents (only those not attached to any message already mapped)
    const initialDocsNotInMessages = initialDocuments.filter(doc =>
        !initialMessages.some(msg => msg.attachedDocuments?.some(ad => ad.id === doc.id))
    );


    return (
        <div className="container mx-auto py-8 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                 {/* Wrap Link directly inside Button with asChild */}
                 <Button variant="outline" size="sm" asChild>
                     {/* Ensure Link is the single direct child, add layout classes */}
                     <Link href="/student/dashboard" className="inline-flex items-center">
                         <ArrowLeft className="mr-2 h-4 w-4" />
                         Zurück zum Dashboard
                     </Link>
                 </Button>
                <span className={cn("px-2 py-0.5 rounded text-xs font-medium border", CONSULTATION_STATUS_COLORS[consultation.status] || 'bg-gray-100 text-gray-800 border-gray-300' )}> {CONSULTATION_STATUS_LABELS[consultation.status] || consultation.status} </span>
            </div>

            {/* Consultation Info Card */}
            <Card>
                <CardHeader> <CardTitle className="text-2xl">Beratung: {consultation.topic}</CardTitle> <CardDescription> Anfrage von Patient: {patientName} </CardDescription> </CardHeader>
                <CardContent> <p className="text-sm font-medium mb-1">Ursprüngliche Frage des Patienten:</p> <p className="text-sm text-muted-foreground p-3 border rounded bg-muted/50 whitespace-pre-wrap">{consultation.patientQuestion}</p> </CardContent>
                 {/* Display initial documents here if they exist and aren't in messages */}
                 {initialDocsNotInMessages.length > 0 && (
                     <CardFooter className='flex-col items-start border-t pt-4'>
                        <h4 className='text-sm font-medium mb-2'>Ursprüngliche Dokumente</h4>
                        <div className='w-full space-y-1'>
                            {initialDocsNotInMessages.map(doc =>
                                <DocumentLink key={doc.id} document={doc} />
                            )}
                        </div>
                    </CardFooter>
                 )}
            </Card>

            {/* Chat Interface Card */}
            <Card className="flex flex-col overflow-hidden">
                <CardHeader> <CardTitle>Chatverlauf</CardTitle> </CardHeader>
                <CardContent className="flex-grow p-0 md:p-6 md:pt-0">
                        <ChatInterface
                            consultationId={consultation.id}
                            currentUserId={studentId}
                            initialMessages={initialMessages} // Includes attachedDocs
                            initialDocuments={initialDocuments} // Pass all docs for top list
                            consultationStatus={consultation.status} />
                        {consultation.status === ConsultationStatus.IN_PROGRESS && ( <div className="px-4 pb-4 md:px-0 md:pb-0"> <JargonExplainer /> </div> )}
                </CardContent>
            </Card>

            {/* Summary & Completion Card */}
            {consultation.status === ConsultationStatus.IN_PROGRESS && (
                <Card>
                    <CardHeader> <CardTitle>Zusammenfassung & Abschluss</CardTitle> <CardDescription> Fassen Sie die Erklärung kurz zusammen (wird dem Patienten angezeigt). </CardDescription> </CardHeader>
                    <CardContent> <ConsultationSummaryForm consultationId={consultation.id} initialSummary={consultation.summary} chatHistory={initialMessages} /> </CardContent>
                </Card>
            )}

            {/* Completed Info */}
            {consultation.status === ConsultationStatus.COMPLETED && (
                <div className="space-y-6">
                    {consultation.summary && ( <Card> <CardHeader> <CardTitle>Ihre gespeicherte Zusammenfassung</CardTitle> </CardHeader> <CardContent> <p className="text-sm text-muted-foreground p-3 border rounded bg-muted/50 whitespace-pre-wrap">{consultation.summary}</p> </CardContent> </Card> )}
                     <Card>
                        <CardHeader> <CardTitle>Patientenfeedback</CardTitle> <CardDescription>Dieses Feedback haben Sie vom Patienten erhalten.</CardDescription></CardHeader>
                        <CardContent className="space-y-3">
                             {/* Display detailed ratings if available */}
                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                                 <RatingDisplay rating={consultation.patientRating} label="Gesamt" icon={Star} />
                                 <RatingDisplay rating={consultation.clarityRating} label="Klarheit" icon={Brain} />
                                 <RatingDisplay rating={consultation.helpfulnessRating} label="Hilfreichkeit" icon={Handshake} />
                                 <RatingDisplay rating={consultation.communicationRating} label="Kommunikation" icon={Smile} />
                             </div>
                             {/* Display comment */}
                            {consultation.patientFeedback ? (
                                 <div className='pt-2'>
                                    <span className="text-sm font-medium block mb-1">Kommentar:</span>
                                    <p className="text-sm text-muted-foreground p-3 border rounded bg-muted/50 whitespace-pre-wrap">{consultation.patientFeedback}</p>
                                 </div>
                             ) : ( <p className="text-sm text-muted-foreground italic pt-2">Kein schriftlicher Kommentar vom Patienten abgegeben.</p> )}
                              {/* Message if no feedback at all */}
                              {consultation.patientRating === null && ( <p className="text-sm text-muted-foreground italic border-t pt-4 mt-4">Noch kein Feedback vom Patienten erhalten.</p> )}
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
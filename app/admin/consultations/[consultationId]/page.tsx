// app/admin/consultations/[consultationId]/page.tsx
import React from 'react';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { notFound, redirect } from 'next/navigation';
import ChatInterface from '@/components/features/ChatInterface'; // Ensure correct import path
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, User, Users, FileText, Info, Star, MessageSquareQuote, Mail, Brain, Handshake, Smile } from 'lucide-react';
import { ConsultationStatus, UserRole, Message, Document as DbDocument, PatientProfile, StudentProfile } from '@prisma/client';
import { cn } from '@/lib/utils';
import { CONSULTATION_STATUS_LABELS, CONSULTATION_STATUS_COLORS } from '@/lib/constants';
import DocumentLink from '@/components/features/DocumentLink'; // Ensure correct import path
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns'; // Import date-fns format
import { de } from 'date-fns/locale'; // Import German locale for date-fns


// Helper to display stars with Label
const RatingDisplay = ({ rating, label, icon: Icon }: { rating: number | null | undefined, label: string, icon?: React.ElementType }) => {
    if (rating === null || rating === undefined) {
         return (
             <div className="flex items-center gap-2">
                 {Icon && <Icon className="w-4 h-4 text-muted-foreground" />}
                 <span className="text-sm font-medium">{label}:</span>
                 <span className="text-sm text-muted-foreground italic">N/A</span>
             </div>
         );
     }
    return (
        <div className="flex items-center gap-2">
            {Icon && <Icon className="w-4 h-4 text-muted-foreground" />}
            <span className="text-sm font-medium">{label}:</span>
            {[...Array(5)].map((_, i) => (
                <Star
                    key={i}
                    className={cn(
                        "w-4 h-4", // Size for detail view
                        i < rating ? "fill-yellow-400 text-yellow-500" : "fill-muted stroke-muted-foreground/50"
                    )}
                />
            ))}
            <span className="text-sm font-medium">({rating}/5)</span>
        </div>
    );
};

// Server-side function to fetch data (Admin perspective) - CORRECTED QUERY
async function getConsultationDataForAdmin(consultationId: string) {
  try {
      const consultation = await prisma.consultation.findUnique({
        where: { id: consultationId },
        // Select fields explicitly
        select: {
            id: true, topic: true, status: true, patientQuestion: true, summary: true, categories: true,
            createdAt: true, updatedAt: true, patientId: true, studentId: true,
            // Feedback ratings
            patientRating: true, clarityRating: true, helpfulnessRating: true, communicationRating: true, patientFeedback: true,
            messages: {
                orderBy: { createdAt: 'asc' },
                include: {
                    sender: {
                        select: {
                            id: true, role: true, image: true,
                            patientProfile: { select: { firstName: true, lastName: true } },
                            studentProfile: { select: { firstName: true, lastName: true } }
                        }
                    },
                    attachedDocuments: { // Include linked documents for each message
                        select: {
                            id: true, fileName: true, storageUrl: true,
                            mimeType: true, fileSize: true,
                        },
                        orderBy: { createdAt: 'asc'}
                    }
                }
            },
            documents: { // Fetch all documents for top list
                 orderBy: { createdAt: 'asc' },
                 select: {
                      id: true, fileName: true, storageUrl: true, mimeType: true,
                      fileSize: true, uploaderId: true
                 }
            },
            patient: {
                select: {
                    id: true, email: true, role: true,
                    patientProfile: { select: { firstName: true, lastName: true } },
                },
            },
            student: {
                select: {
                    id: true, email: true, role: true,
                    studentProfile: { select: { firstName: true, lastName: true, university: true } },
                },
            }
        }
      });
      return consultation;
  } catch (error) {
      console.error(`Error fetching admin consultation data for ID ${consultationId}:`, error);
      return null; // Return null on error
  }
}


// The main Server Component for the admin detail page
export default async function AdminConsultationDetailPage({ params }: { params: { consultationId: string } }) {
  // Await params before accessing its properties
  const awaitedParams = await params;
  const { consultationId } = awaitedParams;

  // Layout already performs role check
  const session = await auth();
  if (!session?.user?.id || session.user.role !== UserRole.ADMIN) {
      redirect('/login');
  }

  const consultation = await getConsultationDataForAdmin(consultationId);

  if (!consultation) {
    notFound(); // Show 404 if fetch failed or record doesn't exist
  }

  // Data Preparation for ChatInterface
  const initialMessages = consultation.messages.map(msg => {
     // Ensure sender exists before accessing properties
     if (!msg.sender) {
          console.warn(`Message ${msg.id} is missing sender data.`);
          // Provide a default structure if sender is unexpectedly null
          return {
              id: msg.id, content: msg.content, createdAt: msg.createdAt.toISOString(),
              sender: { id: 'unknown', role: UserRole.PATIENT, firstName: 'Unbekannt', lastName: '', image: null },
              attachedDocuments: [] // Assume no documents if sender is missing
          };
     }
     const senderProfile = msg.sender.role === UserRole.PATIENT ? msg.sender.patientProfile : msg.sender.studentProfile;
     return {
         id: msg.id,
         content: msg.content,
         createdAt: msg.createdAt.toISOString(),
         sender: {
             id: msg.sender.id,
             role: msg.sender.role,
             firstName: senderProfile?.firstName ?? 'Nutzer',
             lastName: senderProfile?.lastName ?? '',
             image: msg.sender.image,
         },
         attachedDocuments: msg.attachedDocuments.map(doc => ({ // Map the included docs
             id: doc.id,
             fileName: doc.fileName,
             storageUrl: doc.storageUrl,
             mimeType: doc.mimeType,
             fileSize: doc.fileSize,
         }))
     };
  });

  // Map all documents for top list
   const initialDocuments = consultation.documents.map(doc => ({
      id: doc.id,
      fileName: doc.fileName,
      storageUrl: doc.storageUrl,
      mimeType: doc.mimeType,
      fileSize: doc.fileSize,
      uploaderId: doc.uploaderId
  }));

  // Safely access nested properties
  const patientName = consultation.patient?.patientProfile ? `${consultation.patient.patientProfile.firstName} ${consultation.patient.patientProfile.lastName}` : consultation.patient?.email ?? 'Patient nicht gefunden';
  const patientEmail = consultation.patient?.email ?? '-';
  const studentName = consultation.student?.studentProfile ? `${consultation.student.studentProfile.firstName} ${consultation.student.studentProfile.lastName}` : 'Nicht zugewiesen';
  const studentEmail = consultation.student?.email ?? '-';

  return (
    <div className="space-y-6">
        {/* Back Button & Header */}
       <div className="flex items-center justify-between mb-4">
            <Button variant="outline" size="sm" asChild>
                <Link href="/admin/consultations">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Zurück zur Übersicht
                </Link>
            </Button>
            <span className={cn("px-2 py-0.5 rounded text-xs font-medium border", CONSULTATION_STATUS_COLORS[consultation.status] || 'bg-gray-100 text-gray-800 border-gray-300' )}>
                {CONSULTATION_STATUS_LABELS[consultation.status] || consultation.status}
            </span>
        </div>

        {/* Consultation Info Card */}
        <Card>
            <CardHeader>
            <CardTitle className="text-xl">Beratung: {consultation.topic}</CardTitle>
            <CardDescription className="flex flex-col sm:flex-row sm:flex-wrap gap-x-4 gap-y-1 text-xs pt-1">
                 <span className="flex items-center"><User className="w-3 h-3 mr-1.5"/>Patient: {patientName} <code className="ml-1 text-muted-foreground/80">({patientEmail})</code></span>
                 <span className="flex items-center"><Users className="w-3 h-3 mr-1.5"/>Student: {studentName} {consultation.student ? <code className="ml-1 text-muted-foreground/80">({studentEmail})</code> : ''}</span>
                 <span className="flex items-center"><Info className="w-3 h-3 mr-1.5"/>ID: <code className="text-xs">{consultation.id}</code></span>
            </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <h4 className="font-medium mb-1 text-sm">Ursprüngliche Frage</h4>
                    <p className="text-sm text-muted-foreground p-3 border rounded bg-muted/50 whitespace-pre-wrap">{consultation.patientQuestion}</p>
                </div>
                 {initialDocuments.length > 0 && (
                    <div>
                        <h4 className="font-medium mb-1 text-sm">Alle Dokumente</h4> {/* Changed title */}
                        <div className="space-y-1"> {/* Reduced spacing slightly */}
                            {initialDocuments.map(doc => <DocumentLink key={doc.id} document={doc} />)}
                        </div>
                    </div>
                 )}
                 {consultation.summary && (
                    <div>
                         <h4 className="font-medium mb-1 text-sm">Zusammenfassung (Student)</h4>
                         <p className="text-sm text-muted-foreground p-3 border rounded bg-muted/50 whitespace-pre-wrap">{consultation.summary}</p>
                    </div>
                 )}
                 {/* Display Patient Feedback */}
                  {consultation.status === ConsultationStatus.COMPLETED && (
                    <div className="pt-4 border-t space-y-3">
                        <h4 className="font-medium text-base">Patientenfeedback</h4>
                        {/* Display detailed ratings */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                            <RatingDisplay rating={consultation.patientRating} label="Gesamt" icon={Star} />
                            <RatingDisplay rating={consultation.clarityRating} label="Klarheit" icon={Brain} />
                            <RatingDisplay rating={consultation.helpfulnessRating} label="Hilfreichkeit" icon={Handshake} />
                            <RatingDisplay rating={consultation.communicationRating} label="Kommunikation" icon={Smile} />
                        </div>

                        {/* Display comment */}
                        {consultation.patientFeedback ? (
                             <div className='pt-2'>
                                 <span className="text-sm font-medium">Kommentar:</span>
                                 <p className="text-sm text-muted-foreground p-3 border rounded bg-muted/50 whitespace-pre-wrap mt-1">{consultation.patientFeedback}</p>
                             </div>
                        ) : (
                            <p className="text-sm text-muted-foreground italic pt-2">Kein schriftlicher Kommentar abgegeben.</p>
                        )}
                         {/* Message if no feedback at all */}
                         {consultation.patientRating === null && ( <p className="text-sm text-muted-foreground italic border-t pt-4 mt-4">Kein Feedback vom Patienten abgegeben.</p> )}
                    </div>
                 )}
            </CardContent>
        </Card>

        {/* Chat History Card */}
        <Card className="flex flex-col overflow-hidden">
            <CardHeader>
                <CardTitle>Chatverlauf</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow p-0 md:p-6 md:pt-0">
                    <ChatInterface
                        consultationId={consultation.id}
                        currentUserId={"ADMIN_VIEWER"} // Use a distinct ID for admin view
                        initialMessages={initialMessages} // Pass messages with attached docs
                        initialDocuments={initialDocuments} // Pass all docs again for top list
                        consultationStatus={consultation.status}
                    />
            </CardContent>
        </Card>
    </div>
  );
}
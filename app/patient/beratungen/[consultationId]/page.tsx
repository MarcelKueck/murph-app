// app/patient/beratungen/[consultationId]/page.tsx
import React from 'react';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { notFound, redirect } from 'next/navigation';
import ChatInterface from '@/components/features/ChatInterface';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Lock, Unlock, Edit } from 'lucide-react';
import { ConsultationStatus, UserRole, Message, Document as DbDocument, StudentProfile } from '@prisma/client'; // Use Prisma types
import { cn } from '@/lib/utils';
import { CONSULTATION_STATUS_LABELS, CONSULTATION_STATUS_COLORS } from '@/lib/constants';
import PdfDownloadButton from '@/components/features/PdfDownloadButton'; // Import download button
import { format } from 'date-fns';
import { de } from 'date-fns/locale';

// Define type for the full consultation data needed on this page
type ConsultationDataPatient = NonNullable<Awaited<ReturnType<typeof getConsultationData>>>;

// Server-side function to fetch data for the specific consultation
async function getConsultationData(consultationId: string, userId: string) {
  try {
      const consultation = await prisma.consultation.findUnique({
        where: {
          id: consultationId,
          patientId: userId, // Ensure it belongs to the logged-in patient
        },
        select: { // Select only necessary fields
           id: true,
           topic: true,
           status: true,
           summary: true,
           patientRating: true,
           createdAt: true,
           updatedAt: true,
           patientId: true,
           studentId: true,
           messages: {
               orderBy: { createdAt: 'asc' },
               include: {
                   sender: {
                       select: {
                          id: true, role: true, image: true,
                          patientProfile: { select: { firstName: true, lastName: true } },
                          studentProfile: { select: { firstName: true, lastName: true } },
                       }
                   },
                   // Include the linked documents for each message
                   attachedDocuments: {
                        select: {
                            id: true, fileName: true, storageUrl: true,
                            mimeType: true, fileSize: true,
                        },
                        orderBy: { createdAt: 'asc' } // Optional: order attached docs
                   }
               }
           },
           documents: { // Fetch all documents for the top list as well
               orderBy: { createdAt: 'asc' },
               select: { // Select only needed fields for top list
                    id: true, fileName: true, storageUrl: true, mimeType: true, fileSize: true, uploaderId: true
               }
           },
           student: { // Include student details
                select: {
                     studentProfile: {
                         select: { firstName: true, lastName: true, university: true }
                     }
                }
           }
        }
      });
      return consultation;
  } catch (error) {
      console.error(`Error fetching consultation data for ID ${consultationId}:`, error);
      return null;
  }
}

// The main Server Component for the page
export default async function PatientConsultationDetailPage({ params }: { params: { consultationId: string } }) {
  const session = await auth();
  const awaitedParams = await params;
  const { consultationId } = awaitedParams;

  if (!session?.user?.id || session.user.role !== UserRole.PATIENT) {
    redirect(`/login?callbackUrl=/patient/consultations/${consultationId}`);
  }
  const userId = session.user.id;

  const consultation = await getConsultationData(consultationId, userId);

  if (!consultation) {
    notFound();
  }

  const isCompleted = consultation.status === ConsultationStatus.COMPLETED;
  const feedbackGiven = consultation.patientRating !== null;
  const showLockedSummary = isCompleted && !feedbackGiven;
  const showUnlockedSummary = isCompleted && feedbackGiven;

  // Data Preparation for ChatInterface - mapping attachedDocuments
  const initialMessages = consultation.messages.map(msg => {
     const senderProfile = msg.sender?.role === UserRole.PATIENT ? msg.sender.patientProfile : msg.sender?.studentProfile;
     return {
         id: msg.id,
         content: msg.content,
         createdAt: msg.createdAt.toISOString(),
         sender: {
             id: msg.sender?.id ?? 'unknown', // Handle potential null sender
             role: msg.sender?.role ?? UserRole.PATIENT,
             firstName: senderProfile?.firstName ?? 'Nutzer',
             lastName: senderProfile?.lastName ?? '',
             image: msg.sender?.image,
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

   // Map all documents for the top list
   const initialDocuments = consultation.documents.map(doc => ({
      id: doc.id,
      fileName: doc.fileName,
      storageUrl: doc.storageUrl,
      mimeType: doc.mimeType,
      fileSize: doc.fileSize,
      uploaderId: doc.uploaderId, // Pass uploaderId if DocumentLink needs it
  }));

  const studentName = consultation.student?.studentProfile
    ? `${consultation.student.studentProfile.firstName} ${consultation.student.studentProfile.lastName}`
    : 'Wird zugewiesen...';
  const studentUniversity = consultation.student?.studentProfile?.university ?? '';

  const safeTopic = consultation.topic.replace(/[^a-z0-9]/gi, '_').toLowerCase() || 'beratung';
  const defaultPdfFilename = `murph_zusammenfassung_${safeTopic}.pdf`;

  return (
    <div className="container mx-auto py-8 space-y-6">
       {/* Back Button */}
       <div className="flex items-center justify-between mb-4">
            <Button variant="outline" size="sm" asChild>
                <Link href="/patient/dashboard">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Zurück zum Dashboard
                </Link>
            </Button>
        </div>

      {/* Chat Card */}
      <Card className="flex flex-col overflow-hidden">
        <CardHeader>
          <CardTitle className="text-2xl">Beratung: {consultation.topic}</CardTitle>
           <CardDescription>
                {consultation.studentId
                    ? `Ihre Erklärung von: ${studentName} (${studentUniversity})`
                    : 'Ihre Anfrage wartet auf die Zuweisung eines Studenten.'
                }
                 <span className={cn("ml-2 px-2 py-0.5 rounded text-xs font-medium border",
                     CONSULTATION_STATUS_COLORS[consultation.status] || 'bg-gray-100 text-gray-800 border-gray-300'
                 )}>
                     {CONSULTATION_STATUS_LABELS[consultation.status] || consultation.status}
                 </span>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow p-0 md:p-6 md:pt-0">
          <ChatInterface
            consultationId={consultation.id}
            currentUserId={userId}
            initialMessages={initialMessages} // Pass messages with attached docs
            initialDocuments={initialDocuments} // Pass all docs for top list
            consultationStatus={consultation.status}
          />
        </CardContent>
      </Card>

       {/* Conditional Summary Section */}
       {showLockedSummary && (
            <Card className="border-dashed border-amber-400 bg-amber-50/50">
                <CardHeader className="text-center">
                     <Lock className="mx-auto h-8 w-8 text-amber-500 mb-2" />
                    <CardTitle>Zusammenfassung gesperrt</CardTitle>
                    <CardDescription className="max-w-md mx-auto">
                        Vielen Dank für Ihre Nutzung von Murph! Bitte geben Sie kurzes Feedback zur erhaltenen Erklärung, um Ihre persönliche Zusammenfassung freizuschalten und herunterzuladen.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                    <Button asChild>
                        <Link href={`/feedback?consultationId=${consultation.id}`}>
                            <Edit className="mr-2 h-4 w-4" /> Feedback geben & Freischalten
                        </Link>
                    </Button>
                </CardContent>
            </Card>
       )}

       {showUnlockedSummary && (
           <Card>
               <CardHeader>
                    <div className="flex justify-between items-start gap-2">
                         <div>
                            <CardTitle className="flex items-center gap-2">
                                <Unlock className='h-5 w-5 text-green-600'/> Zusammenfassung der Erklärung
                            </CardTitle>
                            <CardDescription>Dies ist die Zusammenfassung, die der Medizinstudent für Sie erstellt hat.</CardDescription>
                        </div>
                        <div className='flex-shrink-0'>
                             <PdfDownloadButton
                                consultationId={consultation.id}
                                defaultFileName={defaultPdfFilename}
                                buttonSize="sm"
                             />
                        </div>
                    </div>
               </CardHeader>
               <CardContent>
                   {consultation.summary ? (
                        <p className="text-sm text-muted-foreground bg-muted/50 p-4 border rounded whitespace-pre-wrap">
                            {consultation.summary}
                        </p>
                   ) : (
                        <p className="text-sm text-muted-foreground italic">
                            Keine Zusammenfassung vom Studenten hinterlegt.
                        </p>
                   )}
               </CardContent>
           </Card>
       )}
       {/* --- End Conditional Summary Section --- */}
    </div>
  );
}
// app/patient/beratungen/[consultationId]/page.tsx
import React from 'react';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { notFound, redirect } from 'next/navigation';
import ChatInterface from '@/components/features/ChatInterface';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Lock, Unlock, Edit, User, Users } from 'lucide-react'; // <<< Added User, Users
import { ConsultationStatus, UserRole } from '@prisma/client';
import { cn } from '@/lib/utils';
import { CONSULTATION_STATUS_LABELS, CONSULTATION_STATUS_COLORS } from '@/lib/constants';
import PdfDownloadButton from '@/components/features/PdfDownloadButton'; // <<< Import the download button

// Server-side function to fetch data for the specific consultation
async function getConsultationData(consultationId: string, userId: string) {
  try {
      // Fetch consultation with necessary relations and selected fields
      const consultation = await prisma.consultation.findUnique({
        where: {
          id: consultationId,
          patientId: userId, // Ensure it belongs to the logged-in patient
        },
        // Select only the fields needed for this page
        select: {
            id: true,
            topic: true,
            status: true,
            summary: true,
            patientRating: true, // Needed for feedback check
            createdAt: true,
            updatedAt: true,
            patientId: true,
            studentId: true,
            messages: {
                orderBy: { createdAt: 'asc' },
                include: {
                  sender: {
                    select: {
                      id: true,
                      role: true,
                      image: true,
                      patientProfile: { select: { firstName: true, lastName: true } },
                      studentProfile: { select: { firstName: true, lastName: true } },
                    }
                  }
                }
            },
            documents: {
                orderBy: { createdAt: 'asc' },
                // Select necessary document fields if needed, otherwise true is fine
                select: { id: true, fileName: true, storageUrl: true, mimeType: true, fileSize: true }
            },
            student: { // Include student details
                 select: {
                    studentProfile: {
                        select: { firstName: true, lastName: true, university: true }
                    }
                 }
            }
           // No need to select 'patient' again as we filter by patientId
        }
      });
      return consultation; // Can be null if not found or access denied by where clause
  } catch (error) {
      console.error(`Error fetching consultation data for ID ${consultationId}:`, error);
      return null; // Return null on error
  }
}


// The main Server Component for the page
export default async function PatientConsultationDetailPage({ params }: { params: { consultationId: string } }) {
  const session = await auth();
  const awaitedParams = await params; // Await params
  const { consultationId } = awaitedParams;

  // Authentication and Role Check
  if (!session?.user?.id || session.user.role !== UserRole.PATIENT) {
    redirect(`/login?callbackUrl=/patient/beratungen/${consultationId}`);
  }
  const userId = session.user.id;

  // Fetch Consultation Data
  const consultation = await getConsultationData(consultationId, userId);

  // Handle Not Found or Access Denied
  if (!consultation) {
    notFound();
  }

  // Determine Summary State
  const isCompleted = consultation.status === ConsultationStatus.COMPLETED;
  const feedbackGiven = consultation.patientRating !== null;
  const showLockedSummary = isCompleted && !feedbackGiven;
  const showUnlockedSummary = isCompleted && feedbackGiven;

  // Prepare Data for Child Components
  const initialMessages = consultation.messages.map(msg => {
     // Add check for potentially missing sender (though unlikely with correct query)
     if (!msg.sender) return null; // Or return a default sender structure
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
        }
    };
  }).filter(Boolean) as any[]; // Filter out any null messages

  const initialDocuments = consultation.documents.map(doc => ({
      id: doc.id,
      fileName: doc.fileName,
      storageUrl: doc.storageUrl,
      mimeType: doc.mimeType,
      fileSize: doc.fileSize,
  }));

  // Get Student Info Safely
  const studentName = consultation.student?.studentProfile
    ? `${consultation.student.studentProfile.firstName} ${consultation.student.studentProfile.lastName}`
    : 'Wird zugewiesen...';
  const studentUniversity = consultation.student?.studentProfile?.university ?? '';

  // Prepare filename for download button
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
                    ? (<span className='flex items-center'><Users className="h-4 w-4 mr-1.5"/> Erklärung von: {studentName} ({studentUniversity})</span>)
                    : 'Ihre Anfrage wartet auf die Zuweisung eines Studenten.'
                }
                 <span className={cn("ml-2 px-2 py-0.5 rounded text-xs font-medium border align-middle", // Use align-middle if needed
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
            initialMessages={initialMessages}
            initialDocuments={initialDocuments}
            consultationStatus={consultation.status}
          />
        </CardContent>
      </Card>

       {/* --- Conditional Summary Section --- */}
       {/* Locked Summary */}
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

       {/* Unlocked Summary */}
       {showUnlockedSummary && (
           <Card>
               <CardHeader>
                    {/* Flex container for Title/Desc and Button */}
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                         <div className='flex-grow'> {/* Allow text to take space */}
                            <CardTitle className="flex items-center gap-2">
                                <Unlock className='h-5 w-5 text-green-600'/> Zusammenfassung der Erklärung
                            </CardTitle>
                            <CardDescription>Dies ist die Zusammenfassung, die der Medizinstudent für Sie erstellt hat.</CardDescription>
                        </div>
                         {/* Download Button */}
                        <div className='flex-shrink-0 mt-2 sm:mt-0'> {/* Prevent button shrink/wrap */}
                             <PdfDownloadButton
                                consultationId={consultation.id}
                                defaultFileName={defaultPdfFilename}
                                buttonSize="sm" // Consistent button size
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
                        <p className="text-sm text-muted-foreground italic text-center py-4">
                            (Für diese Beratung wurde keine Zusammenfassung vom Studenten hinterlegt.)
                        </p>
                   )}
               </CardContent>
           </Card>
       )}
       {/* --- End Conditional Summary Section --- */}

    </div>
  );
}
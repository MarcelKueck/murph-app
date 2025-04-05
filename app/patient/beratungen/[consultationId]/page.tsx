// app/patient/beratungen/[consultationId]/page.tsx
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
import { cn } from '@/lib/utils';
import { CONSULTATION_STATUS_LABELS, CONSULTATION_STATUS_COLORS } from '@/lib/constants';

// Server-side function to fetch data for the specific consultation
async function getConsultationData(consultationId: string, userId: string) {
  try {
      const consultation = await prisma.consultation.findUnique({
        where: {
          id: consultationId,
          patientId: userId,
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
          student: {
              include: {
                  studentProfile: {
                      select: { firstName: true, lastName: true, university: true }
                  }
              }
          },
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
  const { consultationId } = await params;

  if (!session?.user?.id || session.user.role !== UserRole.PATIENT) {
    redirect(`/login?callbackUrl=/patient/consultations/${consultationId}`);
  }
  const userId = session.user.id;

  const consultation = await getConsultationData(consultationId, userId);

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

  const studentName = consultation.student?.studentProfile
    ? `${consultation.student.studentProfile.firstName} ${consultation.student.studentProfile.lastName}`
    : 'Wird zugewiesen...';
  const studentUniversity = consultation.student?.studentProfile?.university ?? '';

  return (
    <div className="container mx-auto py-8 space-y-6">
       <div className="flex items-center justify-between mb-4">
            <Button variant="outline" size="sm" asChild>
                <Link href="/patient/dashboard">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Zurück zum Dashboard
                </Link>
            </Button>
        </div>

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
            initialMessages={initialMessages} // <<< Pass updated initialMessages
            initialDocuments={initialDocuments}
            consultationStatus={consultation.status}
          />
        </CardContent>
      </Card>

       {consultation.status === ConsultationStatus.COMPLETED && consultation.summary && (
           <Card>
               <CardHeader>
                   <CardTitle>Zusammenfassung der Erklärung</CardTitle>
                   <CardDescription>Dies ist die Zusammenfassung, die der Medizinstudent für Sie erstellt hat.</CardDescription>
               </CardHeader>
               <CardContent>
                   <p className="text-sm text-muted-foreground bg-muted/50 p-4 border rounded whitespace-pre-wrap">
                       {consultation.summary}
                   </p>
               </CardContent>
           </Card>
       )}
    </div>
  );
}
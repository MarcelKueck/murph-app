// app/admin/consultations/[consultationId]/page.tsx (NEW FILE)
import React from 'react';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { notFound, redirect } from 'next/navigation';
import ChatInterface from '@/components/features/ChatInterface'; // Re-use Chat UI
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, User, Users, FileText, Info } from 'lucide-react';
import { ConsultationStatus, UserRole } from '@prisma/client';
import { cn } from '@/lib/utils';
import { CONSULTATION_STATUS_LABELS, CONSULTATION_STATUS_COLORS } from '@/lib/constants';
import DocumentLink from '@/components/features/DocumentLink'; // Re-use DocumentLink

// Server-side function to fetch data (Admin perspective - less restrictive)
async function getConsultationDataForAdmin(consultationId: string) {
  try {
      // Fetch consultation without restricting by patient/student ID
      const consultation = await prisma.consultation.findUnique({
        where: { id: consultationId },
        include: {
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
          },
           patient: { // Include patient details
              include: {
                  patientProfile: { select: { firstName: true, lastName: true } }
              }
          },
          student: { // Include student details if assigned
              include: {
                  studentProfile: { select: { firstName: true, lastName: true, university: true } }
              }
          }
        }
      });
      return consultation;
  } catch (error) {
      console.error(`Error fetching admin consultation data for ID ${consultationId}:`, error);
      return null;
  }
}

// The main Server Component for the admin detail page
export default async function AdminConsultationDetailPage({ params }: { params: { consultationId: string } }) {
  // Auth is handled by the admin layout

  const { consultationId } = params;
  const session = await auth(); // Still useful to get admin ID if needed later

  const consultation = await getConsultationDataForAdmin(consultationId);

  if (!consultation) {
    notFound();
  }

  // Data Preparation for ChatInterface
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
            image: msg.sender.image,
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

  // Prepare names
  const patientName = consultation.patient?.patientProfile
        ? `${consultation.patient.patientProfile.firstName} ${consultation.patient.patientProfile.lastName}`
        : consultation.patient.email; // Fallback to email
  const studentName = consultation.student?.studentProfile
    ? `${consultation.student.studentProfile.firstName} ${consultation.student.studentProfile.lastName}`
    : 'Nicht zugewiesen';

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
            <span className={cn("px-2 py-0.5 rounded text-xs font-medium border",
                CONSULTATION_STATUS_COLORS[consultation.status] || 'bg-gray-100 text-gray-800 border-gray-300'
            )}>
                {CONSULTATION_STATUS_LABELS[consultation.status] || consultation.status}
            </span>
        </div>

        {/* Consultation Info Card */}
        <Card>
            <CardHeader>
            <CardTitle className="text-xl">Beratung: {consultation.topic}</CardTitle>
            <CardDescription className="flex flex-col sm:flex-row gap-x-4 gap-y-1 text-xs">
                 <span className="flex items-center"><User className="w-3 h-3 mr-1.5"/>Patient: {patientName} ({consultation.patient.email})</span>
                 <span className="flex items-center"><Users className="w-3 h-3 mr-1.5"/>Student: {studentName} {consultation.student ? `(${consultation.student.email})` : ''}</span>
                 <span className="flex items-center"><Info className="w-3 h-3 mr-1.5"/>ID: <code className="text-xs">{consultation.id}</code></span>
            </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <h4 className="font-medium mb-1 text-sm">Ursprüngliche Frage</h4>
                    <p className="text-sm text-muted-foreground p-3 border rounded bg-muted/50 whitespace-pre-wrap">{consultation.patientQuestion}</p>
                </div>
                 {/* Display Documents if they exist */}
                 {initialDocuments.length > 0 && (
                    <div>
                        <h4 className="font-medium mb-1 text-sm">Dokumente</h4>
                        <div className="space-y-2">
                            {initialDocuments.map(doc => <DocumentLink key={doc.id} document={doc} />)}
                        </div>
                    </div>
                 )}
                 {/* Display Summary if it exists */}
                 {consultation.summary && (
                    <div>
                         <h4 className="font-medium mb-1 text-sm">Zusammenfassung (Student)</h4>
                         <p className="text-sm text-muted-foreground p-3 border rounded bg-muted/50 whitespace-pre-wrap">{consultation.summary}</p>
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
                        // Pass admin ID? Or null/special ID? For now, pass patient ID as viewer to disable input correctly
                        // IMPORTANT: This assumes ChatInterface disables input based on status != IN_PROGRESS
                        // We *must* ensure admins cannot send messages from this view.
                        currentUserId={consultation.patientId} // Treat admin as observer like patient
                        initialMessages={initialMessages}
                        initialDocuments={[]} // Documents shown above, don't repeat in chat component itself
                        consultationStatus={consultation.status} // Pass status to disable input if needed
                    />
            </CardContent>
        </Card>
    </div>
  );
}
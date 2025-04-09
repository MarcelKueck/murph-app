// app/admin/consultations/[consultationId]/page.tsx
import React from 'react';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { notFound, redirect } from 'next/navigation';
import ChatInterface from '@/components/features/ChatInterface';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, User, Users, FileText, Info, Star, MessageSquareQuote, Mail } from 'lucide-react'; // Added Mail
import { ConsultationStatus, UserRole } from '@prisma/client';
import { cn } from '@/lib/utils';
import { CONSULTATION_STATUS_LABELS, CONSULTATION_STATUS_COLORS } from '@/lib/constants';
import DocumentLink from '@/components/features/DocumentLink';
import { Separator } from '@/components/ui/separator'; // Import Separator

// Helper to display stars
const RatingDisplay = ({ rating }: { rating: number | null | undefined }) => {
    if (rating === null || rating === undefined) return <span className="text-sm text-muted-foreground italic">Keine Bewertung</span>;
    return (
        <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
                <Star
                    key={i}
                    className={cn(
                        "w-4 h-4", // Size for detail view
                        i < rating ? "fill-yellow-400 text-yellow-500" : "fill-muted stroke-muted-foreground/50"
                    )}
                />
            ))}
            <span className="text-sm font-medium ml-1">({rating}/5)</span>
        </div>
    );
};

// Server-side function to fetch data (Admin perspective) - CORRECTED QUERY
async function getConsultationDataForAdmin(consultationId: string) {
  try {
      const consultation = await prisma.consultation.findUnique({
        where: { id: consultationId },
        include: {
          messages: {
              orderBy: { createdAt: 'asc' },
              include: {
                  sender: { // Include sender details for messages
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
          documents: { orderBy: { createdAt: 'asc' } },
          // --- Corrected Patient Selection ---
          patient: {
              select: { // Select specific fields from the User model for patient
                  id: true,
                  email: true,
                  role: true,
                  patientProfile: { // Select the related profile
                      select: { // Select fields within the profile
                          firstName: true,
                          lastName: true,
                      },
                  },
              },
          },
          // --- Corrected Student Selection ---
          student: { // Student can be null, so use select here too
              select: { // Select specific fields from the User model for student
                  id: true,
                  email: true,
                  role: true,
                  studentProfile: { // Select the related profile
                      select: { // Select fields within the profile
                          firstName: true,
                          lastName: true,
                          university: true,
                      },
                  },
              },
          }
        }
      });
      // Add explicit null check before returning? Prisma findUnique returns null if not found.
      // The notFound() call later handles the null case.
      return consultation;
  } catch (error) {
      // Log the specific error
      console.error(`Error fetching admin consultation data for ID ${consultationId}:`, error);
      return null; // Return null on error
  }
}


// The main Server Component for the admin detail page
// --- CORRECTED: await params ---
export default async function AdminConsultationDetailPage({ params }: { params: { consultationId: string } }) {
  // <<< Await params before accessing its properties >>>
  const awaitedParams = await params;
  const { consultationId } = awaitedParams;
  // --- End Correction ---

  const session = await auth(); // Required for layout check, might be useful here later

  const consultation = await getConsultationDataForAdmin(consultationId);

  if (!consultation) {
    notFound(); // Show 404 if fetch failed or record doesn't exist
  }

  // Data Preparation for ChatInterface
  const initialMessages = consultation.messages.map(msg => {
     // Sender can be null if relation wasn't loaded correctly (shouldn't happen with corrected query)
     if (!msg.sender) {
          console.warn(`Message ${msg.id} is missing sender data.`);
          return { id: msg.id, content: msg.content, createdAt: msg.createdAt.toISOString(), sender: { id: 'unknown', role: UserRole.PATIENT, firstName: 'Unbekannt', lastName: '', image: null } };
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

  // Safely access nested properties after fixing the Prisma query
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
                        <h4 className="font-medium mb-1 text-sm">Dokumente</h4>
                        <div className="space-y-2">
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
                    <div className="pt-4 border-t">
                        <h4 className="font-medium mb-2 text-sm">Patientenfeedback</h4>
                        <div className="flex items-center mb-2">
                            <span className="text-sm mr-2">Bewertung:</span>
                            <RatingDisplay rating={consultation.patientRating} />
                        </div>
                        {consultation.patientFeedback ? (
                             <div>
                                 <span className="text-sm mr-2">Kommentar:</span>
                                 <p className="text-sm text-muted-foreground p-3 border rounded bg-muted/50 whitespace-pre-wrap mt-1">{consultation.patientFeedback}</p>
                             </div>
                        ) : (
                            <p className="text-sm text-muted-foreground italic">Kein schriftliches Feedback abgegeben.</p>
                        )}
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
                        // Pass a non-participant ID to ensure read-only if ChatInterface uses it
                        currentUserId={"ADMIN_VIEWER"} // Use a distinct ID for admin view
                        initialMessages={initialMessages}
                        initialDocuments={[]} // Documents shown above
                        consultationStatus={consultation.status} // Status still important for UI state
                    />
            </CardContent>
        </Card>
    </div>
  );
}
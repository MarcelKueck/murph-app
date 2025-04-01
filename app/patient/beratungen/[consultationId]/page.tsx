// app/patient/beratungen/[consultationId]/page.tsx
import React from 'react';
import { auth } from '@/lib/auth'; // Import server-side auth helper
import prisma from '@/lib/prisma'; // Import Prisma client
import { notFound, redirect } from 'next/navigation'; // Next.js navigation functions
import ChatInterface from '@/components/features/ChatInterface'; // Import the main chat UI component
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'; // Shadcn Card components
import Link from 'next/link'; // Next.js Link component
import { Button } from '@/components/ui/button'; // Shadcn Button component
import { ArrowLeft } from 'lucide-react'; // Icon component
import { ConsultationStatus, UserRole } from '@prisma/client'; // Prisma enums
import { cn } from '@/lib/utils'; // Shadcn utility function

// Define props structure for the page component, receiving params from dynamic route
interface ConsultationDetailPageProps {
  params: { consultationId: string };
}

// Server-side function to fetch data for the specific consultation
async function getConsultationData(consultationId: string, userId: string) {
  try {
      const consultation = await prisma.consultation.findUnique({
        where: {
          id: consultationId,
          // Security check: Ensure the logged-in user is the patient for this consultation
          patientId: userId,
        },
        include: {
          messages: { // Include all messages for this consultation
            orderBy: { createdAt: 'asc' }, // Order messages chronologically
            include: {
              sender: { // Include sender details needed for display
                select: {
                  id: true,
                  role: true,
                  // Select appropriate profile based on role
                  patientProfile: { select: { firstName: true, lastName: true } },
                  studentProfile: { select: { firstName: true, lastName: true } },
                }
              }
            }
          },
          documents: { // Include associated documents
            orderBy: { createdAt: 'asc' },
          },
          student: { // Include assigned student's details if available
              include: {
                  studentProfile: {
                      select: { firstName: true, lastName: true, university: true } // Select specific fields
                  }
              }
          }
        }
      });
      return consultation; // Return the fetched data
  } catch (error) {
      console.error(`Error fetching consultation data for ID ${consultationId}:`, error);
      return null; // Return null on error
  }
}


// The main Server Component for the page
export default async function PatientConsultationDetailPage({ params }: { params: { consultationId: string } }) {
  // ---- Data Fetching and Authorization ----
  const session = await auth(); // Get user session server-side
  const { consultationId } = await params; // Await params before accessing properties

  // Authorization check: Ensure user is logged in and is a patient
  if (!session?.user?.id || session.user.role !== UserRole.PATIENT) {
    // Redirect to login, preserving the intended destination URL
    redirect(`/login?callbackUrl=/patient/consultations/${consultationId}`);
  }
  const userId = session.user.id;

  // Fetch the consultation data using the helper function
  const consultation = await getConsultationData(consultationId, userId);

  // If consultation not found (or user isn't the patient), render 404 page
  if (!consultation) {
    notFound();
  }
  // ---- End Data Fetching and Authorization ----


  // ---- Data Preparation for Client Component ----
  // Map message data to the structure expected by ChatInterface, converting dates
  const initialMessages = consultation.messages.map(msg => {
     // Determine which profile (patient or student) contains the sender's name
     const senderProfile = msg.sender.role === UserRole.PATIENT
        ? msg.sender.patientProfile
        : msg.sender.studentProfile;
    return {
        id: msg.id,
        content: msg.content,
        createdAt: msg.createdAt.toISOString(), // Pass dates as ISO strings
        sender: {
            id: msg.sender.id,
            role: msg.sender.role,
            firstName: senderProfile?.firstName ?? 'Nutzer', // Use fallback name
            lastName: senderProfile?.lastName ?? '',
        }
    };
  });

  // Map document data to the structure expected by ChatInterface
  const initialDocuments = consultation.documents.map(doc => ({
      id: doc.id,
      fileName: doc.fileName,
      storageUrl: doc.storageUrl,
      mimeType: doc.mimeType,
      fileSize: doc.fileSize,
  }));

  // Prepare student display name and university
  const studentName = consultation.student?.studentProfile
    ? `${consultation.student.studentProfile.firstName} ${consultation.student.studentProfile.lastName}`
    : 'Wird zugewiesen...';
  const studentUniversity = consultation.student?.studentProfile?.university ?? '';
  // ---- End Data Preparation ----


  // ---- Render Page UI ----
  return (
    <div className="container mx-auto py-8 space-y-6">
      {/* Back Button and Page Header */}
       <div className="flex items-center justify-between mb-4">
            <Button variant="outline" size="sm" asChild>
                <Link href="/patient/dashboard">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Zurück zum Dashboard
                </Link>
            </Button>
            {/* Optional: Add status badge or other info here */}
        </div>

      {/* Main Card containing the Chat Interface */}
      {/* Added flex classes here to help manage ChatInterface height */}
      <Card className="flex flex-col overflow-hidden">
        <CardHeader>
          <CardTitle className="text-2xl">Beratung: {consultation.topic}</CardTitle>
           <CardDescription>
                {/* Display student info if assigned */}
                {consultation.studentId
                    ? `Ihre Erklärung von: ${studentName} (${studentUniversity})`
                    : 'Ihre Anfrage wartet auf die Zuweisung eines Studenten.'
                }
          </CardDescription>
        </CardHeader>
        {/* CardContent grows to fill space, allowing ChatInterface height calc to work */}
        <CardContent className="flex-grow p-0 md:p-6 md:pt-0">
          {/* Render the Chat Interface Client Component, passing initial data */}
          <ChatInterface
            consultationId={consultation.id}
            currentUserId={userId} // Pass the logged-in user's ID
            initialMessages={initialMessages}
            initialDocuments={initialDocuments}
            consultationStatus={consultation.status} // Pass the current status
          />
        </CardContent>
      </Card>
    </div>
  );
}
// actions/consultations.ts
'use server'; // Ensure this directive is at the top

import { z } from 'zod';
import { ConsultationRequestSchema, UploadedDocument } from '@/lib/validation';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth'; // Server-side auth helper
import { ConsultationStatus, UserRole } from '@prisma/client'; // Make sure UserRole is imported if used
import { revalidatePath } from 'next/cache'; // To update dashboard data after actions

// --- Type Definitions for Action Results ---

export type ConsultationActionResult = {
    success: boolean;
    message: string; // User-facing message (German)
    consultationId?: string; // Optionally return ID of created consultation
    fieldErrors?: { [key: string]: string[] | undefined }; // For validation errors
};

export type AcceptConsultationResult = {
    success: boolean;
    message: string; // User-facing message (German)
    error?: any; // Optional error details for logging
};


// --- Action to Create a New Consultation ---

export async function createConsultation(
    values: z.infer<typeof ConsultationRequestSchema>,
    documents: UploadedDocument[] // Array of successfully uploaded documents
): Promise<ConsultationActionResult> {

    // 1. Authenticate user and check role
    const session = await auth();
    if (!session?.user?.id || session.user.role !== UserRole.PATIENT) {
        return { success: false, message: "Nicht autorisiert. Nur Patienten können Anfragen erstellen." };
    }
    const patientId = session.user.id;

    // 2. Validate input data (server-side)
    const validatedFields = ConsultationRequestSchema.safeParse(values);
    if (!validatedFields.success) {
         console.log("Create Consultation Server Validation Failed:", validatedFields.error.flatten().fieldErrors);
        return {
            success: false,
            message: "Ungültige Eingabe.",
            fieldErrors: validatedFields.error.flatten().fieldErrors,
        };
    }
    const { topic, patientQuestion } = validatedFields.data;

    // 3. Create Consultation and Documents in Database within a transaction
    try {
        const newConsultation = await prisma.consultation.create({
            data: {
                patientId: patientId,
                topic: topic,
                patientQuestion: patientQuestion,
                status: ConsultationStatus.REQUESTED, // Initial status
                // Conditionally create related documents if the array is not empty
                ...(documents.length > 0 && {
                    documents: {
                        create: documents.map(doc => ({
                            uploaderId: patientId, // Document uploaded by the patient
                            fileName: doc.fileName,
                            storageUrl: doc.storageUrl,
                            mimeType: doc.mimeType,
                            fileSize: doc.fileSize,
                        })),
                    },
                }),
            },
        });

        console.log(`Consultation created successfully: ID ${newConsultation.id} for user ${patientId}`);

        // Revalidate the patient dashboard path so the new consultation appears
        revalidatePath('/patient/dashboard');

        return {
            success: true,
            message: "Ihre Beratungsanfrage wurde erfolgreich übermittelt.",
            consultationId: newConsultation.id,
        };

    } catch (error) {
        console.error("Error creating consultation:", error);
        return {
            success: false,
            message: "Fehler beim Erstellen der Beratung. Bitte versuchen Sie es später erneut.",
        };
    }
}


// --- Action for a Student to Accept a Consultation ---

export async function acceptConsultation(
    consultationId: string
): Promise<AcceptConsultationResult> {

    // 1. Authenticate and authorize user (must be a logged-in student)
    const session = await auth();
    if (!session?.user?.id || session.user.role !== UserRole.STUDENT) {
        return { success: false, message: "Nicht autorisiert. Nur Studenten können Beratungen annehmen." };
    }
    const studentId = session.user.id;

     // 2. Basic validation of the consultation ID input
    if (!consultationId || typeof consultationId !== 'string') {
        return { success: false, message: "Ungültige Beratungs-ID angegeben." };
    }

    console.log(`Student ${studentId} attempting to accept consultation ${consultationId}`);

    try {
        // 3. Use a transaction for atomicity: Find the consultation and update it if available
        const updatedConsultation = await prisma.$transaction(async (tx) => {
            const consultation = await tx.consultation.findUnique({
                where: { id: consultationId },
                select: { status: true } // Select only status for checking availability
            });

            if (!consultation) {
                throw new Error("Beratung nicht gefunden."); // Error handled in catch block
            }

            if (consultation.status !== ConsultationStatus.REQUESTED) {
                // Consultation already taken or in another state
                throw new Error("Diese Beratung ist nicht mehr verfügbar oder wurde bereits angenommen."); // Error handled in catch block
            }

            // Update the consultation: Assign student and change status
            return await tx.consultation.update({
                where: {
                    id: consultationId,
                    // Add status check again inside update for extra safety against race conditions
                    status: ConsultationStatus.REQUESTED,
                },
                data: {
                    studentId: studentId,
                    status: ConsultationStatus.IN_PROGRESS,
                    // Optionally set updatedAt timestamp implicitly by Prisma
                },
            });
        });

        // If transaction was successful:
        console.log(`Consultation ${updatedConsultation.id} accepted by student ${studentId}`);

        // 4. Revalidate relevant paths to reflect the change in UI lists
        revalidatePath('/student/dashboard'); // Update the student's dashboard queue
        // Consider if other paths need revalidation (e.g., maybe the specific patient's dashboard)
        // revalidatePath(`/patient/dashboard`); // Might be too broad or unnecessary if patient uses real-time updates later

        return { success: true, message: "Beratung erfolgreich angenommen." };

    } catch (error: any) {
        console.error(`Error accepting consultation ${consultationId} by student ${studentId}:`, error);

        // Provide specific feedback if it was our custom error, otherwise generic
        const errorMessage = (error instanceof Error && (error.message === "Beratung nicht gefunden." || error.message === "Diese Beratung ist nicht mehr verfügbar oder wurde bereits angenommen."))
            ? error.message
            : "Ein Fehler ist beim Annehmen der Beratung aufgetreten.";

        return {
            success: false,
            message: errorMessage,
            error: error, // Include original error for server logging if needed
        };
    }
}

// --- Placeholder for Future Actions ---

// export async function completeConsultation(consultationId: string, summary: string): Promise<ActionResult> {
//   // Logic to mark consultation as COMPLETED and save summary
//   // Needs auth check (must be assigned student)
//   // Needs validation (summary content)
//   // Needs revalidation
// }
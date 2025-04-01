// actions/consultations.ts
'use server';

import { z } from 'zod';
import { ConsultationRequestSchema, UploadedDocument } from '@/lib/validation';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth'; // Server-side auth helper
import { ConsultationStatus, UserRole } from '@prisma/client'; // Enums
import { revalidatePath } from 'next/cache'; // For updating cached pages

// --- Shared Type Definition for Action Results ---
export type ConsultationActionResult = {
    success: boolean;
    message: string; // User-facing message
    consultationId?: string; // Optionally return ID
    fieldErrors?: { [key: string]: string[] | undefined }; // Optional field-specific validation errors
};


// --- Action 1: Create a New Consultation Request (by Patient) ---
export async function createConsultation(
    values: z.infer<typeof ConsultationRequestSchema>,
    documents: UploadedDocument[] // Array of successfully uploaded documents
): Promise<ConsultationActionResult> {

    // 1. Authenticate user and check role
    const session = await auth();
    if (!session?.user?.id || session.user.role !== 'PATIENT') {
        return { success: false, message: "Nicht autorisiert. Nur Patienten können Anfragen erstellen." };
    }
    const patientId = session.user.id;

    // 2. Validate input data (server-side check)
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
                            uploaderId: patientId, // Link document to the patient
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

        // Revalidate the patient dashboard path so the new request appears
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


// --- Action 2: Accept a Consultation Request (by Student) ---
export async function acceptConsultation(
    consultationId: string
): Promise<{ success: boolean; message: string; error?: any }> { // Using simpler return type for now

    // 1. Authenticate user and check role
    const session = await auth();
    if (!session?.user?.id || session.user.role !== UserRole.STUDENT) {
        return { success: false, message: "Nicht autorisiert. Nur Studenten können Beratungen annehmen." };
    }
    const studentId = session.user.id;

     // 2. Basic validation of input ID
    if (!consultationId || typeof consultationId !== 'string') {
        return { success: false, message: "Ungültige Beratungs-ID." };
    }

    console.log(`Student ${studentId} attempting to accept consultation ${consultationId}`);

    try {
        // 3. Find the consultation and ensure it's available (REQUESTED status)
        // Use transaction to prevent race conditions (optional but safer)
        const updatedConsultation = await prisma.$transaction(async (tx) => {
            const consultation = await tx.consultation.findUnique({
                where: { id: consultationId },
                select: { status: true } // Select only status for checking
            });

            if (!consultation) {
                throw new Error("Beratung nicht gefunden."); // Will be caught below
            }

            if (consultation.status !== ConsultationStatus.REQUESTED) {
                throw new Error("Diese Beratung ist nicht mehr verfügbar oder wurde bereits angenommen.");
            }

             // 4. Update the consultation: Assign student and change status
             return await tx.consultation.update({
                where: { id: consultationId }, // Already checked status above
                data: {
                    studentId: studentId,
                    status: ConsultationStatus.IN_PROGRESS,
                },
            });
        });


        console.log(`Consultation ${updatedConsultation.id} accepted by student ${studentId}`);

        // 5. Revalidate relevant paths to update UI
        revalidatePath('/student/dashboard'); // Update the student's dashboard queue/list

        return { success: true, message: "Beratung erfolgreich angenommen." };

    } catch (error: any) {
        console.error(`Error accepting consultation ${consultationId} by student ${studentId}:`, error);
        // Return specific error messages if available
        return { success: false, message: error.message || "Ein Fehler ist beim Annehmen der Beratung aufgetreten.", error: error };
    }
}


// --- Action 3: Complete a Consultation (by Student) ---
export async function completeConsultation(
    consultationId: string,
    summary: string
): Promise<ConsultationActionResult> { // Using shared return type
     // 1. Authenticate user and check role
    const session = await auth();
    if (!session?.user?.id || session.user.role !== UserRole.STUDENT) {
        return { success: false, message: "Nicht autorisiert. Nur Studenten können Beratungen abschließen." };
    }
    const studentId = session.user.id;

     // 2. Basic validation
    if (!consultationId || typeof consultationId !== 'string') {
        return { success: false, message: "Ungültige Beratungs-ID." };
    }
     // Validate summary length server-side
    const trimmedSummary = summary.trim();
    if (trimmedSummary.length < 10 || trimmedSummary.length > 2000) {
         return {
            success: false,
            message: "Zusammenfassung ist ungültig (10-2000 Zeichen erforderlich).",
            fieldErrors: { summary: ["Zusammenfassung muss zwischen 10 und 2000 Zeichen lang sein."] }
         };
    }

    console.log(`Student ${studentId} attempting to complete consultation ${consultationId}`);

    try {
        // 3. Find the consultation, ensure it's assigned to this student and IN_PROGRESS
        // Use transaction for safety? Less critical than accept, but doesn't hurt.
        const updatedConsultation = await prisma.$transaction(async (tx) => {
             const consultation = await tx.consultation.findFirst({
                where: {
                    id: consultationId,
                    studentId: studentId, // Ensure it's assigned to this student
                },
                select: { status: true }
            });

            if (!consultation) {
                // Either doesn't exist or isn't assigned to this student
                throw new Error("Beratung nicht gefunden oder nicht zugewiesen.");
            }

            if (consultation.status !== ConsultationStatus.IN_PROGRESS) {
                // Consultation already completed or in another state
                throw new Error("Diese Beratung ist nicht aktiv und kann nicht abgeschlossen werden.");
            }

             // 4. Update the consultation: Set summary and change status to COMPLETED
             return await tx.consultation.update({
                where: {
                    id: consultationId,
                    // Optional: Add studentId again as safety check
                    // studentId: studentId,
                },
                data: {
                    summary: trimmedSummary,
                    status: ConsultationStatus.COMPLETED,
                },
            });
        });

         console.log(`Consultation ${updatedConsultation.id} completed by student ${studentId}`);

        // 5. Revalidate relevant paths
        revalidatePath('/student/dashboard'); // Update the student's dashboard list
        revalidatePath(`/student/beratungen/${consultationId}`); // Update the detail page itself

        return { success: true, message: "Beratung erfolgreich abgeschlossen." };

    } catch (error: any) {
         console.error(`Error completing consultation ${consultationId} by student ${studentId}:`, error);
        return { success: false, message: error.message || "Ein Fehler ist beim Abschließen der Beratung aufgetreten." };
    }
}
// actions/consultations.ts
'use server';

import { z } from 'zod';
import { ConsultationRequestSchema, UploadedDocument } from '@/lib/validation';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth'; // Server-side auth
import { ConsultationStatus } from '@prisma/client';
import { revalidatePath } from 'next/cache'; // To update dashboard data

export type ConsultationActionResult = {
    success: boolean;
    message: string;
    consultationId?: string; // Optionally return ID of created consultation
    fieldErrors?: { [key: string]: string[] | undefined };
};

export async function createConsultation(
    values: z.infer<typeof ConsultationRequestSchema>,
    documents: UploadedDocument[] // Array of successfully uploaded documents
): Promise<ConsultationActionResult> {

    // 1. Authenticate user
    const session = await auth();
    if (!session?.user?.id || session.user.role !== 'PATIENT') {
        return { success: false, message: "Nicht autorisiert." };
    }
    const patientId = session.user.id;

    // 2. Validate input data (already validated on client, but good practice to re-validate)
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

    // 3. Create Consultation and Documents in Database
    try {
        const newConsultation = await prisma.consultation.create({
            data: {
                patientId: patientId,
                topic: topic,
                patientQuestion: patientQuestion,
                status: ConsultationStatus.REQUESTED,
                // Conditionally create related documents if the array is not empty
                ...(documents.length > 0 && {
                    documents: {
                        create: documents.map(doc => ({
                            uploaderId: patientId,
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

        // Revalidate the patient dashboard path to show the new consultation
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
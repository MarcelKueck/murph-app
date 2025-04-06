// actions/consultations.ts
'use server';

import { z } from 'zod';
import { ConsultationRequestSchema, UploadedDocument } from '@/lib/validation';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { ConsultationStatus, UserRole } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { sendEmail, templates } from '@/lib/email'; // Correct import

export type ConsultationActionResult = {
    success: boolean;
    message: string;
    consultationId?: string;
    fieldErrors?: { [key: string]: string[] | undefined };
};

// --- Action 1: Create a New Consultation Request (by Patient) ---
export async function createConsultation(
    values: z.infer<typeof ConsultationRequestSchema>,
    documents: UploadedDocument[]
): Promise<ConsultationActionResult> {

    const session = await auth();
    if (!session?.user?.id || session.user.role !== 'PATIENT') {
        return { success: false, message: "Nicht autorisiert. Nur Patienten können Anfragen erstellen." };
    }
    const patientId = session.user.id;

    // Fetch patient details for email personalization
    const patientUser = await prisma.user.findUnique({
        where: { id: patientId },
        select: { email: true, patientProfile: { select: { firstName: true } } }
    });
    if (!patientUser) {
        return { success: false, message: "Patient nicht gefunden." }; // Should not happen if session is valid
    }


    const validatedFields = ConsultationRequestSchema.safeParse(values);
    if (!validatedFields.success) {
        return { success: false, message: "Ungültige Eingabe.", fieldErrors: validatedFields.error.flatten().fieldErrors };
    }
    const { topic, patientQuestion } = validatedFields.data;

    try {
        const newConsultation = await prisma.consultation.create({
            data: {
                patientId: patientId,
                topic: topic,
                patientQuestion: patientQuestion,
                status: ConsultationStatus.REQUESTED,
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

        // <<< Send Request Confirmation Email >>>
        const templateData = templates.requestConfirmation(
            { email: patientUser.email, firstName: patientUser.patientProfile?.firstName },
            { id: newConsultation.id, topic: newConsultation.topic }
        );
        await sendEmail({
            to: patientUser.email,
            subject: templateData.subject,
            text: templateData.text,
            html: templateData.html,
        }).catch(err => {
            console.error(`Failed to send confirmation email for consultation ${newConsultation.id}:`, err);
        });
        // <<< End Email Sending >>>

        revalidatePath('/patient/dashboard');

        return {
            success: true,
            message: "Ihre Beratungsanfrage wurde erfolgreich übermittelt.",
            consultationId: newConsultation.id,
        };

    } catch (error) {
        console.error("Error creating consultation:", error);
        return { success: false, message: "Fehler beim Erstellen der Beratung. Bitte versuchen Sie es später erneut." };
    }
}


// --- Action 2: Accept a Consultation Request (by Student) ---
export async function acceptConsultation(
    consultationId: string
): Promise<{ success: boolean; message: string; error?: any }> {

    const session = await auth();
    if (!session?.user?.id || session.user.role !== UserRole.STUDENT) {
        return { success: false, message: "Nicht autorisiert. Nur Studenten können Beratungen annehmen." };
    }
    const studentId = session.user.id;

    if (!consultationId || typeof consultationId !== 'string') {
        return { success: false, message: "Ungültige Beratungs-ID." };
    }

    console.log(`Student ${studentId} attempting to accept consultation ${consultationId}`);

    try {
        let acceptedConsultation; // To hold result for email
        await prisma.$transaction(async (tx) => {
            const consultation = await tx.consultation.findUnique({
                where: { id: consultationId },
                select: { status: true }
            });

            if (!consultation) throw new Error("Beratung nicht gefunden.");
            if (consultation.status !== ConsultationStatus.REQUESTED) throw new Error("Diese Beratung ist nicht mehr verfügbar oder wurde bereits angenommen.");

            const studentProfile = await tx.studentProfile.findUnique({ where: { userId: studentId }, select: { isVerified: true } });
            if (!studentProfile?.isVerified) throw new Error("Nur verifizierte Studenten können Anfragen annehmen.");

            // Update and fetch related data needed for email
            acceptedConsultation = await tx.consultation.update({
                where: { id: consultationId },
                data: { studentId: studentId, status: ConsultationStatus.IN_PROGRESS },
                include: {
                    patient: { select: { email: true, patientProfile: { select: { firstName: true } } } },
                    student: { select: { studentProfile: { select: { firstName: true, lastName: true } } } } // Get accepting student's name
                }
            });
        });

        if (!acceptedConsultation) {
            throw new Error("Failed to retrieve accepted consultation details after update.");
        }

        console.log(`Consultation ${acceptedConsultation.id} accepted by student ${studentId}`);

        // <<< Send Consultation Accepted Email to Patient >>>
        if (acceptedConsultation.patient && acceptedConsultation.patient.email && acceptedConsultation.student?.studentProfile) {
            const studentName = `${acceptedConsultation.student.studentProfile.firstName} ${acceptedConsultation.student.studentProfile.lastName}`.trim();
            const templateData = templates.consultationAccepted(
                { email: acceptedConsultation.patient.email, firstName: acceptedConsultation.patient.patientProfile?.firstName },
                { name: studentName },
                { id: acceptedConsultation.id, topic: acceptedConsultation.topic }
            );
            await sendEmail({
                to: acceptedConsultation.patient.email,
                subject: templateData.subject,
                text: templateData.text,
                html: templateData.html,
            }).catch(err => {
                console.error(`Failed to send accepted email for consultation ${acceptedConsultation.id}:`, err);
            });
        } else {
            console.warn(`Could not send accepted email for consultation ${acceptedConsultation.id}: Missing patient/student details.`);
        }
        // <<< End Email Sending >>>

        revalidatePath('/student/dashboard');
        revalidatePath(`/patient/beratungen/${consultationId}`); // Revalidate patient detail page too
        revalidatePath('/patient/dashboard'); // Revalidate patient dashboard

        return { success: true, message: "Beratung erfolgreich angenommen." };

    } catch (error: any) {
        console.error(`Error accepting consultation ${consultationId} by student ${studentId}:`, error);
        return { success: false, message: error.message || "Ein Fehler ist beim Annehmen der Beratung aufgetreten.", error: error };
    }
}


// --- Action 3: Complete a Consultation (by Student) ---
// (Already sends email)
export async function completeConsultation(
    consultationId: string,
    summary: string
): Promise<ConsultationActionResult> {
     const session = await auth();
     if (!session?.user?.id || session.user.role !== UserRole.STUDENT) {
         return { success: false, message: "Nicht autorisiert." };
     }
     const studentId = session.user.id;
     if (!consultationId) return { success: false, message: "Ungültige Beratungs-ID." };
     const trimmedSummary = summary.trim();
     if (trimmedSummary.length < 10 || trimmedSummary.length > 2000) {
          return { success: false, message: "Zusammenfassung ist ungültig (10-2000 Zeichen erforderlich).", fieldErrors: { summary: ["Zusammenfassung muss zwischen 10 und 2000 Zeichen lang sein."] } };
     }
    console.log(`Student ${studentId} attempting to complete consultation ${consultationId}`);
    try {
        let completedConsultation;
        await prisma.$transaction(async (tx) => {
             const consultation = await tx.consultation.findFirst({ where: { id: consultationId, studentId: studentId }, select: { status: true, patientId: true } });
             if (!consultation) throw new Error("Beratung nicht gefunden oder nicht zugewiesen.");
             if (consultation.status !== ConsultationStatus.IN_PROGRESS) throw new Error("Diese Beratung ist nicht aktiv.");
             completedConsultation = await tx.consultation.update({
                where: { id: consultationId },
                data: { summary: trimmedSummary, status: ConsultationStatus.COMPLETED },
                 include: { patient: { select: { email: true, patientProfile: { select: { firstName: true } } } } }
            });
        });
        if (!completedConsultation) { throw new Error("Failed to retrieve completed consultation details after update."); }
        console.log(`Consultation ${completedConsultation.id} completed by student ${studentId}`);

        // Send Completion Email to Patient
        if (completedConsultation.patient && completedConsultation.patient.email) {
            const feedbackLink = `${process.env.NEXT_PUBLIC_APP_BASE_URL}/feedback?consultationId=${completedConsultation.id}`;
            const templateData = templates.consultationCompleted(
                 { email: completedConsultation.patient.email, firstName: completedConsultation.patient.patientProfile?.firstName },
                 { id: completedConsultation.id, topic: completedConsultation.topic },
                 feedbackLink
            );
             await sendEmail({
                to: completedConsultation.patient.email,
                subject: templateData.subject,
                text: templateData.text,
                html: templateData.html
             }).catch(err => { console.error(`Failed to send completion email for consultation ${completedConsultation.id}:`, err); });
        } else {
             console.warn(`Could not send completion email for consultation ${completedConsultation.id}: Patient email missing.`);
        }

        // Revalidate paths
        revalidatePath('/student/dashboard');
        revalidatePath(`/student/beratungen/${consultationId}`);
        revalidatePath(`/patient/beratungen/${consultationId}`);
        revalidatePath('/patient/dashboard');

        return { success: true, message: "Beratung erfolgreich abgeschlossen." };

    } catch (error: any) {
         console.error(`Error completing consultation ${consultationId} by student ${studentId}:`, error);
        return { success: false, message: error.message || "Ein Fehler ist beim Abschließen der Beratung aufgetreten." };
    }
}
// actions/feedback.ts
'use server';

import { z } from 'zod';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { ConsultationStatus, UserRole } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { SubmitFeedbackSchema } from '@/lib/validation';
import { sendEmail, templates } from '@/lib/email'; // <<< Import email helpers

export async function submitFeedback(
    values: z.infer<typeof SubmitFeedbackSchema>
): Promise<{ success: boolean; message: string; fieldErrors?: any }> {
    const session = await auth();

    // 1. Authentication & Role Check
    if (!session?.user?.id || session.user.role !== UserRole.PATIENT) {
        return { success: false, message: "Nur Patienten können Feedback geben." };
    }
    const patientId = session.user.id;

    // 2. Validation
    const validatedFields = SubmitFeedbackSchema.safeParse(values);
    if (!validatedFields.success) {
        return { success: false, message: "Ungültige Eingabe.", fieldErrors: validatedFields.error.flatten().fieldErrors };
    }
    const { consultationId, rating, feedback } = validatedFields.data;

    try {
        // 3. Verify consultation ownership, status, and if feedback already exists
        // <<< Include student data for email notification >>>
        const consultation = await prisma.consultation.findUnique({
            where: { id: consultationId },
            select: {
                patientId: true,
                status: true,
                patientRating: true,
                topic: true, // Needed for email
                student: { // Needed for email recipient
                    select: {
                        email: true,
                        studentProfile: { select: { firstName: true } }
                    }
                },
                patient: { // Needed for email sender name
                     select: {
                        patientProfile: { select: { firstName: true, lastName: true } }
                    }
                }
            }
        });

        if (!consultation) { return { success: false, message: "Beratung nicht gefunden." }; }
        if (consultation.patientId !== patientId) { return { success: false, message: "Sie können nur für Ihre eigenen Beratungen Feedback geben." }; }
        if (consultation.status !== ConsultationStatus.COMPLETED) { return { success: false, message: "Feedback kann nur für abgeschlossene Beratungen gegeben werden." }; }
        if (consultation.patientRating !== null) { return { success: false, message: "Für diese Beratung wurde bereits Feedback abgegeben." }; }

        // 4. Save feedback
        await prisma.consultation.update({
            where: { id: consultationId },
            data: {
                patientRating: rating,
                patientFeedback: feedback || null,
            }
        });

        console.log(`Feedback submitted for consultation ${consultationId} by user ${patientId}`);

        // <<< Send Feedback Received Email to Student >>>
        if (consultation.student && consultation.student.email) {
             const patientName = `${consultation.patient?.patientProfile?.firstName || 'Ein Patient'} ${consultation.patient?.patientProfile?.lastName || ''}`.trim();
             const templateData = templates.feedbackReceived(
                 { email: consultation.student.email, firstName: consultation.student.studentProfile?.firstName },
                 { name: patientName },
                 { id: consultationId, topic: consultation.topic },
                 { rating: rating, comment: feedback }
             );
             await sendEmail({
                 to: consultation.student.email,
                 subject: templateData.subject,
                 text: templateData.text,
                 html: templateData.html,
             }).catch(err => {
                  console.error(`Failed to send feedback received email for consultation ${consultationId} to student ${consultation.student?.email}:`, err);
             });
        } else {
             console.warn(`Could not send feedback received email for consultation ${consultationId}: Student email missing.`);
        }
        // <<< End Email Sending >>>

        // Optional: Revalidate relevant pages
        // revalidatePath(`/student/beratungen/${consultationId}`); // Student detail page
        // revalidatePath('/admin/consultations'); // Admin table

        return { success: true, message: "Vielen Dank für Ihr Feedback!" };

    } catch (error) {
         console.error("Error submitting feedback:", error);
         return { success: false, message: "Ein Fehler ist beim Senden des Feedbacks aufgetreten." };
    }
}
// actions/feedback.ts
'use server';

import { z } from 'zod';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { ConsultationStatus, UserRole } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { SubmitFeedbackSchema, SubmitFeedbackFormData } from '@/lib/validation'; // <<< Use new type
import { sendEmail, templates } from '@/lib/email'; // <<< Import email helpers

export async function submitFeedback(
   values: SubmitFeedbackFormData // <<< Use new FormData type
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
        console.log("Feedback Validation Errors:", validatedFields.error.flatten().fieldErrors);
        // Provide more specific feedback if possible
        const firstError = Object.values(validatedFields.error.flatten().fieldErrors)[0]?.[0];
        const generalMessage = "Ungültige Eingabe. Bitte überprüfen Sie alle Bewertungen.";
        return { success: false, message: firstError || generalMessage, fieldErrors: validatedFields.error.flatten().fieldErrors };
    }
    // <<< Destructure all fields >>>
    const {
       consultationId,
       rating, // Overall rating
       clarityRating,
       helpfulnessRating,
       communicationRating,
       feedback // Optional text feedback
   } = validatedFields.data;

    try {
        // 3. Verify consultation ownership, status, and if feedback already exists
        const consultation = await prisma.consultation.findUnique({
            where: { id: consultationId },
            select: {
                patientId: true,
                status: true,
                patientRating: true, // Check if overall rating already exists (primary indicator)
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
        // Use patientRating as the key indicator if feedback was already given
        if (consultation.patientRating !== null) {
             // Consider if this check is still needed or if the form should prevent submission if already rated.
             // For robustness, keeping it here is fine.
            return { success: false, message: "Für diese Beratung wurde bereits Feedback abgegeben." };
        }

        // 4. Save feedback (including new fields)
        await prisma.consultation.update({
            where: { id: consultationId },
            data: {
                patientRating: rating, // Save overall rating
                clarityRating: clarityRating, // Save clarity rating
                helpfulnessRating: helpfulnessRating, // Save helpfulness rating
                communicationRating: communicationRating, // Save communication rating
                patientFeedback: feedback?.trim() || null, // Save optional text feedback, ensure null if empty
            }
        });

        console.log(`Feedback submitted for consultation ${consultationId} by user ${patientId}`);

        // Send Feedback Received Email to Student (No change needed here unless you want to include detailed ratings)
        if (consultation.student && consultation.student.email) {
             const patientName = `${consultation.patient?.patientProfile?.firstName || 'Ein Patient'} ${consultation.patient?.patientProfile?.lastName || ''}`.trim();
             const templateData = templates.feedbackReceived(
                 { email: consultation.student.email, firstName: consultation.student.studentProfile?.firstName },
                 { name: patientName },
                 { id: consultationId, topic: consultation.topic },
                 { rating: rating, comment: feedback } // Pass overall rating + comment to email
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

        // Revalidate relevant pages to reflect unlocked summary
        revalidatePath(`/patient/beratungen/${consultationId}`); // Revalidate the detail page for the patient
        revalidatePath('/patient/dashboard'); // Revalidate the patient dashboard to update summary cards
        // Optional: Revalidate admin views if they show detailed feedback
        // revalidatePath(`/admin/consultations/${consultationId}`);
        // revalidatePath('/admin/consultations');

        return { success: true, message: "Vielen Dank für Ihr Feedback!" };

    } catch (error) {
         console.error("Error submitting feedback:", error);
         return { success: false, message: "Ein Fehler ist beim Senden des Feedbacks aufgetreten." };
    }
}
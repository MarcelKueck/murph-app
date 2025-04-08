// actions/account.ts
'use server';

import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { z } from 'zod';
import { sendEmail, templates } from '@/lib/email'; // <<< Import email functions

// Basic validation schema for the input email
const EmailSchema = z.string().email();

type DeleteAccountResult = {
    success: boolean;
    message: string;
};

export async function deleteCurrentUserAccount(
    confirmationEmail: string,
    feedback?: string // <<< Accept optional feedback
): Promise<DeleteAccountResult> {
    const session = await auth();

    // 1. Check Authentication
    if (!session?.user?.id || !session.user.email) {
        return { success: false, message: "Nicht autorisiert." };
    }
    const userId = session.user.id;
    const userEmail = session.user.email;

    // 2. Validate Confirmation Email Format (basic check)
    const validatedEmail = EmailSchema.safeParse(confirmationEmail);
    if (!validatedEmail.success) {
        return { success: false, message: "Ungültiges E-Mail-Format für Bestätigung." };
    }

    // 3. Verify Confirmation Email Match
    if (validatedEmail.data !== userEmail) {
        return { success: false, message: "Bestätigungs-E-Mail stimmt nicht überein." };
    }

    // --- Prepare data for feedback and email *before* transaction ---
    const feedbackToSave = feedback?.trim() || null; // Use null if empty/whitespace
    const emailInfo = { email: userEmail }; // Store email before user is gone

    try {
        console.log(`Attempting to delete account for user ID: ${userId}, Email: ${userEmail}`);

        // Use a transaction to ensure feedback is saved before deletion
        await prisma.$transaction(async (tx) => {
            // 4. Save Feedback (if provided)
            if (feedbackToSave) {
                console.log(`Saving deletion feedback for user ${userId}`);
                await tx.deletionFeedback.create({
                    data: {
                        userId: userId, // Link to user ID before deletion
                        userEmail: userEmail,
                        feedback: feedbackToSave,
                    }
                });
            }

            // 5. Delete User (Prisma Cascade handles related data)
            console.log(`Executing user deletion for user ${userId}`);
            // Important: Ensure cascade deletes are set correctly in schema.prisma
            await tx.user.delete({
                where: { id: userId },
            });
        });

        console.log(`Successfully deleted user ID: ${userId}`);

        // 6. Send Confirmation Email (after successful deletion)
        try {
            console.log(`Sending deletion confirmation email to ${emailInfo.email}`);
            const templateData = templates.accountDeleted(emailInfo);
            await sendEmail({
                to: emailInfo.email,
                subject: templateData.subject,
                text: templateData.text,
                html: templateData.html,
            });
        } catch (emailError) {
            console.error(`Failed to send deletion confirmation email to ${emailInfo.email}:`, emailError);
            // Log the error, but don't make the overall deletion fail just because the email failed
        }

        return { success: true, message: "Ihr Konto wurde erfolgreich gelöscht." };

    } catch (error) {
        console.error(`Error deleting account for user ID ${userId}:`, error);
        // Check for specific Prisma errors if necessary, e.g., Foreign Key constraints if cascade isn't set right
        // if (error instanceof Prisma.PrismaClientKnownRequestError) { ... }
        return { success: false, message: "Fehler beim Löschen des Kontos. Bitte versuchen Sie es später erneut oder kontaktieren Sie den Support." };
    }
}
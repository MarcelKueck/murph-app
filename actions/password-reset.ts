// actions/password-reset.ts
'use server';

import { z } from 'zod';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import crypto from 'crypto'; // Use built-in crypto for token generation
import { sendEmail, templates } from '@/lib/email';
// <<< Import schemas from validation lib >>>
import { ResetPasswordSchema, RequestPasswordResetSchema } from '@/lib/validation';

const SALT_ROUNDS = 10;
const RESET_TOKEN_EXPIRY_HOURS = 1; // Token valid for 1 hour

/**
 * Action to initiate the password reset process.
 * Generates a token, stores its hash, and sends a reset link email.
 */
export async function requestPasswordReset(
    values: z.infer<typeof RequestPasswordResetSchema>
): Promise<{ success: boolean; message: string }> {

    const validatedFields = RequestPasswordResetSchema.safeParse(values);
    if (!validatedFields.success) {
        // Although schema might catch this on client, double-check server-side
        return { success: false, message: "Ungültige E-Mail-Adresse." };
    }
    const { email } = validatedFields.data;

    try {
        // 1. Find user by email
        const user = await prisma.user.findUnique({
            where: { email },
            // Include profile data needed for email template personalization
            include: { patientProfile: {select: {firstName: true}}, studentProfile: {select: {firstName: true}} }
        });

        // 2. Security: Always return a generic success message regardless of whether the user exists
        // This prevents attackers from figuring out which emails are registered (email enumeration).
        if (!user) {
            console.log(`Password reset requested for non-existent email: ${email}`);
            // Log for admin/debugging purposes, but return generic message to user
            return { success: true, message: "Wenn ein Konto mit dieser E-Mail existiert, wurde ein Link zum Zurücksetzen gesendet." };
        }

        // 3. Generate a secure, unguessable token
        const resetToken = crypto.randomBytes(32).toString('hex');
        // 4. Hash the token before storing it in the database
        const hashedToken = await bcrypt.hash(resetToken, SALT_ROUNDS);

        // 5. Calculate the expiry date for the token
        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + RESET_TOKEN_EXPIRY_HOURS);

        // 6. Store the hashed token in the database
        // Use a transaction to delete any old tokens for the user and create the new one atomically.
        await prisma.$transaction([
            prisma.passwordResetToken.deleteMany({ where: { userId: user.id } }),
            prisma.passwordResetToken.create({
                data: {
                    userId: user.id,
                    tokenHash: hashedToken,
                    expiresAt: expiresAt,
                },
            })
        ]);

        // 7. Construct the password reset link (using the *unhashed* token)
        const resetLink = `${process.env.NEXT_PUBLIC_APP_BASE_URL}/reset-password?token=${resetToken}`;

        // 8. Send the password reset email (Simulated for now)
        const userName = user.patientProfile?.firstName || user.studentProfile?.firstName || null;
        const templateData = templates.passwordReset({ email: user.email, firstName: userName }, resetLink);
        await sendEmail({
            to: user.email,
            subject: templateData.subject,
            text: templateData.text,
            html: templateData.html,
        }).catch(err => {
            // Log email sending errors but don't necessarily fail the whole request
            console.error(`Failed to send password reset email to ${user.email}:`, err);
        });

        console.log(`Password reset link generated for ${email}: ${resetLink}`); // Log the raw token/link for development/testing

        // 9. Return the same generic success message to the user
        return { success: true, message: "Wenn ein Konto mit dieser E-Mail existiert, wurde ein Link zum Zurücksetzen gesendet." };

    } catch (error) {
        console.error("Error requesting password reset:", error);
        // Return a generic server error message
        return { success: false, message: "Ein interner Fehler ist aufgetreten. Bitte versuchen Sie es später erneut." };
    }
}

/**
 * Action to reset the user's password using a valid token.
 */
export async function resetPassword(
     values: z.infer<typeof ResetPasswordSchema>
): Promise<{ success: boolean; message: string; fieldErrors?: any }> {

    const validatedFields = ResetPasswordSchema.safeParse(values);
    if (!validatedFields.success) {
        return {
            success: false,
            message: "Ungültige Eingabe.",
            fieldErrors: validatedFields.error.flatten().fieldErrors,
        };
    }
    const { token, password } = validatedFields.data;

    try {
        // 1. Find potential tokens: Since we only store the hash, we need to fetch potentially valid ones
        // and compare the provided token against their hashes.
        // Fetch tokens that haven't expired yet.
        // In a high-traffic system, this could be optimized (e.g., smaller token expiry, indexing).
        const potentialDbTokens = await prisma.passwordResetToken.findMany({
             where: {
                 expiresAt: { gt: new Date() } // Check for expiry server-side
             }
         });

         let dbTokenRecord = null;
         // Compare the provided token against the hash of each potential DB token
         for (const record of potentialDbTokens) {
             const isValidToken = await bcrypt.compare(token, record.tokenHash);
             if (isValidToken) {
                 dbTokenRecord = record; // Found the matching token record
                 break;
             }
         }

        // 2. Validate Token Existence and Expiry
        if (!dbTokenRecord) {
            // If no matching, non-expired token hash was found
            return { success: false, message: "Ungültiger oder abgelaufener Token." };
        }

        // 3. Hash the new password
        const newPasswordHash = await bcrypt.hash(password, SALT_ROUNDS);

        // 4. Update the user's password and delete the used token in a transaction
        await prisma.$transaction([
            prisma.user.update({
                where: { id: dbTokenRecord.userId },
                data: { passwordHash: newPasswordHash },
            }),
            prisma.passwordResetToken.delete({
                where: { id: dbTokenRecord.id }, // Delete the specific token used
            })
        ]);

        console.log(`Password successfully reset for user ${dbTokenRecord.userId}`);
        // Maybe send a confirmation email here? (Optional)

        return { success: true, message: "Passwort erfolgreich zurückgesetzt. Sie können sich jetzt anmelden." };

    } catch (error) {
         console.error("Error resetting password:", error);
        // Return a generic server error message
        return { success: false, message: "Ein interner Fehler ist aufgetreten. Das Passwort konnte nicht zurückgesetzt werden." };
    }
}
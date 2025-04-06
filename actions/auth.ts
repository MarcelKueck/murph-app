// actions/auth.ts
'use server';

import { z } from 'zod';
import { RegisterSchema } from '@/lib/validation';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { UserRole } from '@prisma/client';
import { sendEmail, templates } from '@/lib/email'; // Correct import

const SALT_ROUNDS = 10;

export type RegistrationResult = {
    success: boolean;
    message: string;
    fieldErrors?: { [key: string]: string[] | undefined };
};

export async function registerUser(
    values: z.infer<typeof RegisterSchema>
): Promise<RegistrationResult> {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        console.log("Registration Validation Failed:", validatedFields.error.flatten().fieldErrors);
        return {
            success: false,
            message: "Ungültige Eingabe. Bitte überprüfen Sie die markierten Felder.",
            fieldErrors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { email, password, firstName, lastName, role, dob, university, clinicalYear } = validatedFields.data;

    try {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return { success: false, message: "Diese E-Mail-Adresse ist bereits registriert." };
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        let newUser;

        await prisma.$transaction(async (tx) => {
             newUser = await tx.user.create({
                data: {
                    email,
                    passwordHash: hashedPassword,
                    role,
                },
            });

            if (role === UserRole.PATIENT) {
                await tx.patientProfile.create({
                    data: { userId: newUser.id, firstName, lastName, dob: dob || null },
                });
            } else if (role === UserRole.STUDENT) {
                 if (!university || !clinicalYear) {
                     throw new Error("Universitäts- oder Jahresinformationen fehlen für Studenten.")
                 }
                await tx.studentProfile.create({
                    data: { userId: newUser.id, firstName, lastName, university, clinicalYear, isVerified: false },
                });
            }
        });

        // Send Welcome Email
        if (newUser) {
             const templateData = templates.welcome({ email: newUser.email, firstName: firstName });
             // <<< Construct the full EmailOptions object >>>
             await sendEmail({
                 to: newUser.email, // <<< Add the 'to' field here
                 subject: templateData.subject,
                 text: templateData.text,
                 html: templateData.html,
             });
        }

        console.log(`Successfully registered user: ${email}, Role: ${role}`);
        return { success: true, message: "Registrierung erfolgreich! Sie können sich nun anmelden." };

    } catch (error) {
        console.error("Registration Error:", error);
        return { success: false, message: "Registrierung fehlgeschlagen. Bitte versuchen Sie es später erneut." };
    }
}
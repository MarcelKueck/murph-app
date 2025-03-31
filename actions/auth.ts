// actions/auth.ts
'use server'; // Mark this as a Server Action

import { z } from 'zod';
import { RegisterSchema } from '@/lib/validation';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { UserRole } from '@prisma/client';

const SALT_ROUNDS = 10;

export type RegistrationResult = {
    success: boolean;
    message: string; // User-facing message (German)
    fieldErrors?: { [key: string]: string[] | undefined }; // Field-specific errors
};

export async function registerUser(
    values: z.infer<typeof RegisterSchema>
): Promise<RegistrationResult> {
    // 1. Validate input using Zod schema
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

    // 2. Check if user already exists
    try {
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return { success: false, message: "Diese E-Mail-Adresse ist bereits registriert." };
        }

        // 3. Hash the password
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        // 4. Create User and Profile in a transaction
        await prisma.$transaction(async (tx) => {
             const newUser = await tx.user.create({
                data: {
                    email,
                    passwordHash: hashedPassword,
                    role,
                },
            });

            if (role === UserRole.PATIENT) {
                await tx.patientProfile.create({
                    data: {
                        userId: newUser.id,
                        firstName,
                        lastName,
                        dob: dob || null, // Assign dob or null
                    },
                });
            } else if (role === UserRole.STUDENT) {
                // Ensure university and clinicalYear are defined (Zod refine should guarantee this)
                 if (!university || !clinicalYear) {
                     throw new Error("Universitäts- oder Jahresinformationen fehlen für Studenten.")
                 }
                await tx.studentProfile.create({
                    data: {
                        userId: newUser.id,
                        firstName,
                        lastName,
                        university: university,
                        clinicalYear: clinicalYear,
                        isVerified: false, // IMPORTANT: New students are NOT verified by default
                    },
                });
            }
        });

        console.log(`Successfully registered user: ${email}, Role: ${role}`);
        return { success: true, message: "Registrierung erfolgreich! Sie können sich nun anmelden." };

    } catch (error) {
        console.error("Registration Error:", error);
        // Handle potential database errors (e.g., unique constraints if check failed somehow)
        // In a real app, differentiate errors more granularly
        return { success: false, message: "Registrierung fehlgeschlagen. Bitte versuchen Sie es später erneut." };
    }
}
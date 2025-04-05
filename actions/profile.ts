// actions/profile.ts
'use server';

import { z } from 'zod';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { UserRole } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { UpdatePatientProfileSchema, UpdateStudentProfileSchema } from '@/lib/validation';

export type ProfileUpdateResult = {
    success: boolean;
    message: string;
    fieldErrors?: { [key: string]: string[] | undefined };
};

// Combined action to update profile based on role
export async function updateProfile(
    formData: z.infer<typeof UpdatePatientProfileSchema> | z.infer<typeof UpdateStudentProfileSchema>,
    newImageUrl?: string | null // Pass the new image URL separately
): Promise<ProfileUpdateResult> {
    const session = await auth();

    if (!session?.user?.id) {
        return { success: false, message: "Nicht autorisiert." };
    }
    const userId = session.user.id;
    const userRole = session.user.role;

    try {
        // Update User's image URL if provided
        if (newImageUrl !== undefined) { // Check if explicitly passed (even if null)
            await prisma.user.update({
                where: { id: userId },
                data: { image: newImageUrl }, // Set to null if newImageUrl is null
            });
            console.log(`Updated profile image for user ${userId} to ${newImageUrl}`);
        }

        // Update role-specific profile
        if (userRole === UserRole.PATIENT) {
            const validatedFields = UpdatePatientProfileSchema.safeParse(formData);
            if (!validatedFields.success) {
                return {
                    success: false,
                    message: "Ungültige Eingabe.",
                    fieldErrors: validatedFields.error.flatten().fieldErrors,
                };
            }
            const { firstName, lastName, dob } = validatedFields.data;
            await prisma.patientProfile.update({
                where: { userId: userId },
                data: { firstName, lastName, dob: dob ?? null },
            });
             console.log(`Updated patient profile for user ${userId}`);

        } else if (userRole === UserRole.STUDENT) {
            const validatedFields = UpdateStudentProfileSchema.safeParse(formData);
            if (!validatedFields.success) {
                return {
                    success: false,
                    message: "Ungültige Eingabe.",
                    fieldErrors: validatedFields.error.flatten().fieldErrors,
                };
            }
             const { firstName, lastName, university, clinicalYear } = validatedFields.data;
             // IMPORTANT: Prevent students from editing verification status via this form
             await prisma.studentProfile.update({
                where: { userId: userId },
                data: { firstName, lastName, university, clinicalYear },
            });
             console.log(`Updated student profile for user ${userId}`);
        } else {
             return { success: false, message: "Unbekannte Benutzerrolle." };
        }

        // Revalidate the relevant profile page path
        const profilePath = userRole === UserRole.PATIENT ? '/patient/profil' : '/student/profil';
        revalidatePath(profilePath);
        // Also revalidate layout if header needs immediate image update (though session update might handle this)
        // revalidatePath('/');

        return { success: true, message: "Profil erfolgreich aktualisiert." };

    } catch (error) {
        console.error("Profile Update Error:", error);
        // Handle potential errors (e.g., profile not found, DB errors)
        return { success: false, message: "Profil konnte nicht aktualisiert werden. Bitte versuchen Sie es später erneut." };
    }
}
// actions/admin.ts
'use server';

import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { UserRole } from '@prisma/client';
import { revalidatePath } from 'next/cache';

type ActionResult = {
    success: boolean;
    message: string;
};

// Action to toggle the verification status of a student
export async function toggleStudentVerification(
    targetUserId: string,
    currentStatus: boolean
): Promise<ActionResult> {
    const session = await auth();

    // 1. Authorize: Ensure logged-in user is ADMIN
    if (!session?.user || session.user.role !== UserRole.ADMIN) {
        return { success: false, message: "Zugriff verweigert: Nur Administratoren dürfen diese Aktion ausführen." };
    }

    // 2. Validate Input (Basic check)
    if (!targetUserId) {
        return { success: false, message: "Ungültige Benutzer-ID." };
    }

    // 3. Prevent admin from changing their own status if they happen to also be a student
    if (session.user.id === targetUserId) {
        return { success: false, message: "Administratoren können ihren eigenen Verifizierungsstatus nicht ändern." };
    }

    try {
        // 4. Find the student profile
        const studentProfile = await prisma.studentProfile.findUnique({
            where: { userId: targetUserId },
            select: { id: true, isVerified: true } // Select current status to double-check
        });

        if (!studentProfile) {
            return { success: false, message: "Studentenprofil nicht gefunden." };
        }

        // 5. Optional: Double-check if the currentStatus passed matches the DB status to prevent race conditions
        if (studentProfile.isVerified !== currentStatus) {
             console.warn(`Verification status mismatch for user ${targetUserId}. Client says ${currentStatus}, DB says ${studentProfile.isVerified}. Proceeding with toggle.`);
             // Decide how to handle mismatch - proceed based on DB or return error?
             // For now, we proceed based on toggling the *database's* current state.
        }

        // 6. Update the verification status
        const newStatus = !studentProfile.isVerified; // Toggle based on DB state
        await prisma.studentProfile.update({
            where: { userId: targetUserId },
            data: { isVerified: newStatus },
        });

        console.log(`Admin ${session.user.id} ${newStatus ? 'verified' : 'unverified'} student ${targetUserId}`);

        // 7. Revalidate the admin users page path
        revalidatePath('/admin/users');

        return {
            success: true,
            message: `Student erfolgreich ${newStatus ? 'verifiziert' : 'Verifizierung entzogen'}.`
        };

    } catch (error) {
        console.error("Error toggling student verification:", error);
        return { success: false, message: "Ein Fehler ist aufgetreten. Die Aktion konnte nicht abgeschlossen werden." };
    }
}

// Add more admin actions here later (e.g., view consultation details, manage users)
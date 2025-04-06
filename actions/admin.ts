// actions/admin.ts
'use server';

import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { UserRole } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { sendEmail, templates } from '@/lib/email'; // Correct import

type ActionResult = {
    success: boolean;
    message: string;
};

export async function toggleStudentVerification(
    targetUserId: string,
    currentStatus: boolean
): Promise<ActionResult> {
    const session = await auth();

    if (!session?.user || session.user.role !== UserRole.ADMIN) {
        return { success: false, message: "Zugriff verweigert: Nur Administratoren dürfen diese Aktion ausführen." };
    }
    if (!targetUserId) {
        return { success: false, message: "Ungültige Benutzer-ID." };
    }
    if (session.user.id === targetUserId) {
        return { success: false, message: "Administratoren können ihren eigenen Verifizierungsstatus nicht ändern." };
    }

    try {
        const student = await prisma.user.findUnique({
            where: { id: targetUserId },
            include: {
                 studentProfile: { select: { id: true, isVerified: true, firstName: true } }
             }
        });

        if (!student || !student.studentProfile) {
            return { success: false, message: "Studentenprofil nicht gefunden." };
        }
        if (student.studentProfile.isVerified !== currentStatus) {
             console.warn(`Verification status mismatch for user ${targetUserId}. Client says ${currentStatus}, DB says ${student.studentProfile.isVerified}. Proceeding with toggle.`);
        }

        const newStatus = !student.studentProfile.isVerified;
        await prisma.studentProfile.update({
            where: { userId: targetUserId },
            data: { isVerified: newStatus },
        });

        console.log(`Admin ${session.user.id} ${newStatus ? 'verified' : 'unverified'} student ${targetUserId}`);

        // Send Verification Email (only if newly verified)
        if (newStatus === true) {
             const templateData = templates.studentVerified({ email: student.email, firstName: student.studentProfile.firstName });
             // <<< Add 'to' field when calling sendEmail >>>
             await sendEmail({
                to: student.email,
                subject: templateData.subject,
                text: templateData.text,
                html: templateData.html,
             }).catch(err => {
                  console.error(`Failed to send verification email for student ${targetUserId}:`, err);
             });
         }

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
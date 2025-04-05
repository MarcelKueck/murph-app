// app/student/layout.tsx
import React from 'react';
import { auth } from '@/lib/auth'; // Use the auth helper with full session access
import { redirect } from 'next/navigation';
import { UserRole } from '@prisma/client';

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const session = await auth(); // Get session data with role

    // Redirect immediately if no session
    if (!session?.user) {
        console.log("StudentLayout: No session found, redirecting to login.");
        redirect('/login?callbackUrl=/student/dashboard'); // Or use current path
        return null;
    }

    // Enforce STUDENT role
    if (session.user.role !== UserRole.STUDENT) {
        console.log(`StudentLayout: User ${session.user.id} (Role: ${session.user.role}) is not a student. Redirecting.`);
        // Redirect non-students away
        const redirectUrl = session.user.role === UserRole.PATIENT ? '/patient/dashboard' : session.user.role === UserRole.ADMIN ? '/admin/dashboard' : '/';
        redirect(redirectUrl);
        return null; // Stop rendering
    }

    // If logged in and IS a student, render children
    return <>{children}</>;
}
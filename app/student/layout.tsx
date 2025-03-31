// app/student/layout.tsx
import React from 'react';
import { auth } from '@/lib/auth'; // Import server-side auth
import { redirect } from 'next/navigation';
import { UserRole } from '@prisma/client';

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const session = await auth(); // Get session data

    // Double-check login status and role *within the layout*
  if (!session?.user) {
      // Should have been caught by middleware, but belts and braces
      redirect('/login');
  }

    if (session.user.role !== UserRole.STUDENT) {
        // Logged in, but wrong role, redirect to patient area
        console.log(`StudentLayout: User ${session.user.id} is not a student. Redirecting.`);
        redirect('/patient/dashboard'); // Redirect patient away
    }

    // If checks pass, render children
    return <>{children}</>;
}
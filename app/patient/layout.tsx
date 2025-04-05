// app/patient/layout.tsx
import React from 'react';
import { auth } from '@/lib/auth'; // Use the auth helper with full session access
import { redirect } from 'next/navigation';
import { UserRole } from '@prisma/client';

export default async function PatientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth(); // Get session data with role

  // Redirect immediately if no session (middleware should prevent this, but double-check)
  if (!session?.user) {
      console.log("PatientLayout: No session found, redirecting to login.");
      redirect('/login?callbackUrl=/patient/dashboard'); // Or use current path
      return null;
  }

  // Enforce PATIENT role
  if (session.user.role !== UserRole.PATIENT) {
     console.log(`PatientLayout: User ${session.user.id} (Role: ${session.user.role}) is not a patient. Redirecting.`);
     // Redirect non-patients away
     const redirectUrl = session.user.role === UserRole.STUDENT ? '/student/dashboard' : session.user.role === UserRole.ADMIN ? '/admin/dashboard' : '/';
     redirect(redirectUrl);
     return null; // Stop rendering
  }

  // If logged in and IS a patient, render children
  return <>{children}</>;
}
// app/patient/layout.tsx
import React from 'react';
import { auth } from '@/lib/auth'; // Import server-side auth
import { redirect } from 'next/navigation';
import { UserRole } from '@prisma/client';

export default async function PatientLayout({
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

  if (session.user.role !== UserRole.PATIENT) {
     // Logged in, but wrong role, redirect to student area
     console.log(`PatientLayout: User ${session.user.id} is not a patient. Redirecting.`);
     redirect('/student/dashboard'); // Redirect student away
  }

  // If checks pass, render children
  return <>{children}</>;
}
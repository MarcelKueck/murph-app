// app/admin/layout.tsx
import React from 'react';
import { auth } from '@/lib/auth'; // <<< Make sure it's this import
import { redirect } from 'next/navigation';
import { UserRole } from '@prisma/client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Users, FileText } from 'lucide-react';
import UserMenuButton from '@/components/core/UserMenuButton';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth(); // Get session data with role

  // 1. Check if logged in
  if (!session?.user) {
      redirect('/login?callbackUrl=/admin/dashboard');
      return null;
  }

  // 2. Check if user is ADMIN - This logic was correct
  if (session.user.role !== UserRole.ADMIN) {
     console.warn(`AdminLayout: User ${session.user.id} is not an admin. Redirecting.`);
     const redirectUrl = session.user.role === UserRole.PATIENT ? '/patient/dashboard' : session.user.role === UserRole.STUDENT ? '/student/dashboard' : '/';
     redirect(redirectUrl);
     return null;
  }

  const user = session.user;

  // Render admin layout
  return (
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
          {/* --- Sidebar --- */}
          <aside className="hidden border-r bg-muted/40 md:block">
              <div className="flex h-full max-h-screen flex-col gap-2 sticky top-0">
                  <div className="flex h-16 items-center border-b px-4 lg:px-6">
                      <Link href="/admin/dashboard" className="flex items-center gap-2 font-semibold">
                          <LayoutDashboard className="h-6 w-6" />
                          <span className="">Admin Konsole</span>
                      </Link>
                  </div>
                  <div className="flex-1 overflow-auto py-2">
                      <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                          {/* Add logic here later to highlight active link */}
                          <Link href="/admin/dashboard" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                              <LayoutDashboard className="h-4 w-4" />
                              Dashboard
                          </Link>
                          <Link href="/admin/users" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                              <Users className="h-4 w-4" />
                              Benutzer
                          </Link>
                          <Link href="/admin/consultations" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                              <FileText className="h-4 w-4" />
                              Beratungen
                          </Link>
                      </nav>
                  </div>
              </div>
          </aside>

          {/* --- Main Content Area --- */}
          <div className="flex flex-col">
              {/* --- Header --- */}
               <header className="flex h-16 items-center gap-4 border-b bg-background px-4 lg:px-6 sticky top-0 z-30">
                   <div className="flex-1">
                        {/* Mobile Nav Trigger Placeholder */}
                   </div>
                   <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                        <UserMenuButton user={user} />
                   </div>
               </header>
               {/* --- Page Content --- */}
               <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-muted/40">
                  {children}
              </main>
           </div>
      </div>
  );
}
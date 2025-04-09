// components/core/Header.tsx
'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { LayoutGrid } from "lucide-react"; // Removed LogOut, UserIcon as they are in UserMenuButton
import { Skeleton } from "@/components/ui/skeleton";
import Logo from './Logo'; // Import the updated Logo component
import { UserRole } from '@prisma/client';
import UserMenuButton from './UserMenuButton'; // Import UserMenuButton
import { cn } from '@/lib/utils'; // Import cn

export default function Header() {
  const { data: session, status } = useSession();
  const isLoading = status === 'loading';

  const user = session?.user;
  const userRole = user?.role;

  // Determine dashboard link based on role
  let dashboardHref = '/'; // Default fallback
  if (userRole === UserRole.PATIENT) {
    dashboardHref = '/patient/dashboard';
  } else if (userRole === UserRole.STUDENT) {
    dashboardHref = '/student/dashboard';
  } else if (userRole === UserRole.ADMIN) {
    dashboardHref = '/admin/dashboard';
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Updated Link structure */}
        <Link href="/" className="flex items-center space-x-2" aria-label="Murph Startseite">
            {/* Container for the SVG logo to control its size */}
            <div className="h-7 w-7 text-brand-primary"> {/* Adjust h/w & color here */}
                <Logo />
            </div>
            {/* Add the Murph text */}
            <span className={cn(
                "font-semibold text-xl", // Use site font (default), make bold, set size
                "text-foreground" // Use standard text color
             )}>
                Murph
            </span>
        </Link>

        <div className="flex items-center space-x-2 md:space-x-4">
          {isLoading ? (
             // Loading Skeleton
             <div className="flex items-center space-x-2 md:space-x-4">
                 <Skeleton className="h-8 w-24 rounded-md" />
                 <Skeleton className="h-9 w-9 rounded-full" />
             </div>
          ) : user ? (
            // Logged-in user view
            <>
              {/* Dashboard Link */}
              <Button variant="ghost" size="sm" asChild>
                <Link href={dashboardHref}>
                  <LayoutGrid className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </Button>

              {/* User Menu Button Component */}
              <UserMenuButton user={user} />
            </>
          ) : (
            // Logged-out view
            <>
              <Button variant="outline" size="sm" asChild>
                <Link href="/login">Anmelden</Link>
              </Button>
              <Button size="sm" asChild animateInteraction>
                <Link href="/registrieren">Registrieren</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
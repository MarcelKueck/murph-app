// components/core/Header.tsx
'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LayoutGrid, LogOut, User as UserIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Logo from './Logo'; // Import the updated Logo component
import { UserRole } from '@prisma/client';
import { getInitials } from '@/lib/utils'; // Import getInitials
import UserMenuButton from './UserMenuButton'; // Import UserMenuButton

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
        <Link href="/" className="flex items-center space-x-2" aria-label="Murph Startseite">
          {/* Use the Logo component */}
          <Logo />
          {/* Text removed as it's in the SVG now */}
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
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
import Logo from './Logo';
import { UserRole } from '@prisma/client';
import { getInitials } from '@/lib/utils'; // Assuming getInitials is moved/available

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

  const fallbackInitials = user ? getInitials(undefined, undefined, user.email) : '?';

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Logo />
          <span className="font-bold inline-block">Murph</span>
        </Link>

        <div className="flex items-center space-x-2 md:space-x-4">
          {isLoading ? (
             <div className="flex items-center space-x-2 md:space-x-4">
                 <Skeleton className="h-8 w-24 rounded-md" />
                 <Skeleton className="h-9 w-9 rounded-full" />
             </div>
          ) : user ? (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href={dashboardHref}>
                  <LayoutGrid className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0">
                    <Avatar className="h-9 w-9 border">
                      <AvatarImage src={user.image ?? undefined} alt={user.email || 'User Avatar'} />
                      <AvatarFallback>{fallbackInitials}</AvatarFallback>
                    </Avatar>
                     <span className="sr-only">Benutzermenü öffnen</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.email}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                         {userRole === UserRole.PATIENT ? 'Patient*in'
                         : userRole === UserRole.STUDENT ? 'Student*in'
                         : userRole === UserRole.ADMIN ? 'Administrator*in'
                         : 'Unbekannt'}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {userRole !== UserRole.ADMIN && (
                       <DropdownMenuItem asChild>
                           <Link href={userRole === UserRole.PATIENT ? '/patient/profil' : '/student/profil'}>
                            <UserIcon className="mr-2 h-4 w-4" />
                            <span>Profil</span>
                           </Link>
                        </DropdownMenuItem>
                  )}
                  {userRole === UserRole.ADMIN && (
                        <DropdownMenuItem asChild>
                            <Link href="/">
                                <span>Zur Hauptseite</span>
                            </Link>
                        </DropdownMenuItem>
                   )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/' })}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Abmelden</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
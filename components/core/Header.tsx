// components/core/Header.tsx
'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button'; // Correct import path
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Correct import path
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Correct import path
import { LayoutGrid, LogOut, User as UserIcon, Handshake } from "lucide-react"; // Removed FileText, added Handshake if needed elsewhere, Skeleton removed as UI element used
import { Skeleton } from "@/components/ui/skeleton"; // <--- Import Skeleton from ui
import Logo from './Logo'; // Assuming Logo is simple SVG or client-safe
import { UserRole } from '@prisma/client'; // Keep if needed for role checks

export default function Header() {
  const { data: session, status } = useSession();
  const isLoading = status === 'loading';

  const user = session?.user;
  const userRole = user?.role;

  // Using simple role-based initials for V1 fallback
  const fallbackInitials = userRole === UserRole.PATIENT ? 'P' : userRole === UserRole.STUDENT ? 'S' : '?';

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Logo />
          <span className="font-bold inline-block">Murph</span>
        </Link>

        <div className="flex items-center space-x-2 md:space-x-4">
          {isLoading ? (
             // Use Skeleton component for loading state
             <div className="flex items-center space-x-2 md:space-x-4">
                 <Skeleton className="h-8 w-24 rounded-md" /> {/* Skeleton for Dashboard link */}
                 <Skeleton className="h-9 w-9 rounded-full" /> {/* Skeleton for Avatar */}
             </div>
          ) : user ? (
            // Logged-in user view
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href={userRole === UserRole.PATIENT ? '/patient/dashboard' : '/student/dashboard'}>
                  <LayoutGrid className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  {/* Ensure Button itself is okay */}
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0">
                    <Avatar className="h-9 w-9">
                      {/* Casting user.image to string | undefined */}
                      <AvatarImage src={user.image as string | undefined} alt={user.email || 'User Avatar'} />
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
                        {userRole === UserRole.PATIENT ? 'Patient*in' : 'Student*in'}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                     <Link href={userRole === UserRole.PATIENT ? '/patient/profil' : '/student/profil'}>
                      <UserIcon className="mr-2 h-4 w-4" />
                      <span>Profil</span>
                     </Link>
                  </DropdownMenuItem>
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
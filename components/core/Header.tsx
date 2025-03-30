// components/core/Header.tsx
'use client'; // Needs to be client component to use hooks like useSession

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
import { LayoutGrid, LogOut, User as UserIcon, FileText, Handshake } from "lucide-react"; // Import icons
import Logo from './Logo'; // Assuming Logo component exists or will be created
import { UserRole } from '@prisma/client'; // Import enum if needed elsewhere or use string directly

export default function Header() {
  const { data: session, status } = useSession(); // Use the hook to get session
  const isLoading = status === 'loading';

  const user = session?.user;
  const userRole = user?.role; // Access role from extended Session type

   // Get initials for Avatar Fallback
  const getInitials = (firstName?: string, lastName?: string) => {
    const first = firstName?.[0] ?? '';
    const last = lastName?.[0] ?? '';
    return `${first}${last}`.toUpperCase();
  };

  // Fallback needs user profile data - for now just 'P' or 'S'
  const fallbackInitials = userRole === UserRole.PATIENT ? 'P' : userRole === UserRole.STUDENT ? 'S' : '?';
  // Later, fetch profile to get actual names for initials

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Logo /> {/* Replace with your actual Logo component */}
          <span className="font-bold inline-block">Murph</span>
        </Link>

        {/* Navigation & User Menu */}
        <div className="flex items-center space-x-4">
          {isLoading ? (
            <div className="h-8 w-20 animate-pulse bg-muted rounded-md"></div> // Skeleton for loading state
          ) : user ? (
            <>
              {/* Dashboard Link based on Role */}
              <Button variant="ghost" asChild>
                <Link href={userRole === UserRole.PATIENT ? '/patient/dashboard' : '/student/dashboard'}>
                  <LayoutGrid className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </Button>

              {/* User Dropdown Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      {/* Placeholder image - Add user image logic later if needed */}
                      <AvatarImage src={user.image || undefined} alt="User Avatar" />
                      <AvatarFallback>{fallbackInitials}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {/* Display name later when profile is fetched */}
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
                  {/* Add other links like Settings if needed later */}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/' })}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Abmelden</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            // Show Login/Register buttons if not logged in
            <>
              <Button variant="ghost" asChild>
                <Link href="/login">Anmelden</Link>
              </Button>
              <Button asChild>
                <Link href="/registrieren">Registrieren</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
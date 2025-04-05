// components/core/UserMenuButton.tsx
'use client';

import React from 'react';
import { signOut, Session } from 'next-auth/react'; // Import Session type
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
import { LogOut, User as UserIcon } from "lucide-react";
import { getInitials } from '@/lib/utils'; // Import getInitials
import Link from 'next/link';
import { UserRole } from '@prisma/client';

// Define the expected user prop structure based on session data
interface UserMenuButtonProps {
  user: Session['user']; // Use the Session user type from next-auth
}

export default function UserMenuButton({ user }: UserMenuButtonProps) {
  if (!user) return null; // Should not happen if used correctly in layout

  const userRole = user.role;
  const fallbackInitials = getInitials(undefined, undefined, user.email); // Use helper

  const profileLink = userRole === UserRole.PATIENT ? '/patient/profil'
                    : userRole === UserRole.STUDENT ? '/student/profil'
                    : '/admin/dashboard'; // Admin might not have a dedicated profile page for V1

  return (
     <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <Avatar className="h-8 w-8 border">
              <AvatarImage src={user.image ?? undefined} alt={user.email || 'User Avatar'} />
              <AvatarFallback>{fallbackInitials}</AvatarFallback>
            </Avatar>
            <span className="sr-only">Benutzermenü öffnen</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                    {user.email}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                        {userRole === UserRole.PATIENT ? 'Patient*in'
                         : userRole === UserRole.STUDENT ? 'Student*in'
                         : 'Administrator*in'}
                    </p>
                </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {userRole !== UserRole.ADMIN && ( // Admins might not have an editable profile page
               <DropdownMenuItem asChild>
                 <Link href={profileLink}>
                  <UserIcon className="mr-2 h-4 w-4" />
                  <span>Profil</span>
                 </Link>
              </DropdownMenuItem>
          )}
          {/* Optional: Link to main site if needed */}
           {userRole === UserRole.ADMIN && (
              <DropdownMenuItem asChild>
                  <Link href="/">
                      {/* <Home className="mr-2 h-4 w-4" /> */}
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
  );
}
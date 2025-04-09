// components/admin/AdminUserTable.tsx
'use client';

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { UserRole } from '@prisma/client';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { getInitials } from '@/lib/utils';
import VerifyStudentButton from './VerifyStudentButton';
import type { AdminUserView } from '@/app/admin/users/page'; // Import type from page
import Link from 'next/link'; // Import Link

interface AdminUserTableProps {
  users: AdminUserView[];
}

export default function AdminUserTable({ users }: AdminUserTableProps) {

    const getDisplayName = (user: AdminUserView): string => {
        if (user.role === UserRole.PATIENT && user.patientProfile) {
        return `${user.patientProfile.firstName} ${user.patientProfile.lastName}`;
        }
        if (user.role === UserRole.STUDENT && user.studentProfile) {
        return `${user.studentProfile.firstName} ${user.studentProfile.lastName}`;
        }
        // Admins might not have profiles
        if (user.role === UserRole.ADMIN) {
            return user.email;
        }
        return user.email; // Fallback
    };

    const getProfileInitials = (user: AdminUserView): string => {
       if (user.role === UserRole.PATIENT && user.patientProfile) {
            return getInitials(user.patientProfile.firstName, user.patientProfile.lastName);
        }
        if (user.role === UserRole.STUDENT && user.studentProfile) {
            return getInitials(user.studentProfile.firstName, user.studentProfile.lastName);
        }
        return getInitials(undefined, undefined, user.email);
    };

  // <<< Updated function to point to the new admin route >>>
  const getProfileLink = (user: AdminUserView): string | null => {
    // Only provide links for roles that have a dedicated view page
    if (user.role === UserRole.PATIENT || user.role === UserRole.STUDENT) {
      return `/admin/users/${user.id}`;
    }
    // Admins (or other roles without a profile view) won't get a link
    return null;
  };


  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[60px] hidden sm:table-cell">Bild</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="hidden md:table-cell">Email</TableHead>
            <TableHead>Rolle</TableHead>
            <TableHead>Status</TableHead> {/* For Verification */}
            <TableHead className="hidden lg:table-cell">Registriert</TableHead>
            <TableHead className="text-right">Aktionen</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length === 0 && (
              <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                      Keine Benutzer gefunden für die aktuelle Filterauswahl.
                  </TableCell>
              </TableRow>
          )}
          {users.map((user) => {
            const profileLink = getProfileLink(user);
             return (
             <TableRow key={user.id}>
               <TableCell className="hidden sm:table-cell">
                 <Avatar className="h-9 w-9 border">
                   <AvatarImage src={user.image ?? undefined} alt={getDisplayName(user)} />
                   <AvatarFallback>{getProfileInitials(user)}</AvatarFallback>
                 </Avatar>
               </TableCell>
               {/* <<< Updated Name Cell Link >>> */}
               <TableCell className="font-medium">
                 {profileLink ? (
                   <Link
                     href={profileLink}
                     // No target="_blank" - stay within admin context
                     className="inline-flex items-center gap-1 hover:underline hover:text-primary group"
                     title={`Details für ${getDisplayName(user)} ansehen`}
                    >
                     {getDisplayName(user)}
                     {/* Icon removed as we are not opening a new tab */}
                   </Link>
                 ) : (
                   // Display name without link for Admins or if link is null
                   getDisplayName(user)
                 )}
               </TableCell>
               <TableCell className="hidden md:table-cell">{user.email}</TableCell>
               <TableCell>
                   <Badge variant={user.role === UserRole.ADMIN ? "destructive" : user.role === UserRole.STUDENT ? "secondary" : "outline"}>
                       {user.role}
                   </Badge>
               </TableCell>
               <TableCell>
                 {user.role === UserRole.STUDENT && user.studentProfile && (
                   <Badge variant={user.studentProfile.isVerified ? "default" : "outline"} className={user.studentProfile.isVerified ? 'bg-green-100 text-green-800' : ''}>
                     {user.studentProfile.isVerified ? 'Verifiziert' : 'Nicht Verifiziert'}
                   </Badge>
                 )}
                 {user.role !== UserRole.STUDENT && '-'}
               </TableCell>
               <TableCell className="hidden lg:table-cell">{format(new Date(user.createdAt), 'dd.MM.yyyy', { locale: de })}</TableCell>
               <TableCell className="text-right">
                 {/* Render Verify button only for Students and potentially exclude the Admin viewing their own student profile if applicable */}
                 {user.role === UserRole.STUDENT && user.studentProfile /* && user.id !== currentAdminUserId */ && (
                     <VerifyStudentButton
                       userId={user.id}
                       isVerified={user.studentProfile.isVerified}
                     />
                 )}
                 {/* Render '-' or other placeholder if no actions applicable for the role */}
                 {user.role !== UserRole.STUDENT && <span className="text-xs text-muted-foreground">-</span>}
               </TableCell>
             </TableRow>
          )})}
         </TableBody>
      </Table>
    </div>
  );
}
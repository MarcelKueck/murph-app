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
  }

  return (
    <div className="border rounded-lg overflow-hidden"> {/* Added border & overflow */}
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
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="hidden sm:table-cell">
                <Avatar className="h-9 w-9 border">
                  <AvatarImage src={user.image ?? undefined} alt={getDisplayName(user)} />
                  <AvatarFallback>{getProfileInitials(user)}</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className="font-medium">{getDisplayName(user)}</TableCell>
              <TableCell className="hidden md:table-cell">{user.email}</TableCell>
              <TableCell>
                  <Badge variant={user.role === UserRole.ADMIN ? "destructive" : user.role === UserRole.STUDENT ? "secondary" : "outline"}>
                      {user.role}
                  </Badge>
              </TableCell>
              <TableCell>
                {user.role === UserRole.STUDENT && (
                  <Badge variant={user.studentProfile?.isVerified ? "default" : "outline"} className={user.studentProfile?.isVerified ? 'bg-green-100 text-green-800' : ''}>
                    {user.studentProfile?.isVerified ? 'Verifiziert' : 'Nicht Verifiziert'}
                  </Badge>
                )}
                {user.role !== UserRole.STUDENT && '-'}
              </TableCell>
              <TableCell className="hidden lg:table-cell">{format(new Date(user.createdAt), 'dd.MM.yyyy', { locale: de })}</TableCell>
              <TableCell className="text-right">
                {user.role === UserRole.STUDENT && user.studentProfile && user.role !== UserRole.ADMIN && ( // Prevent self-verify/unverify if admin is also student?
                    <VerifyStudentButton
                      userId={user.id}
                      isVerified={user.studentProfile.isVerified}
                    />
                )}
                {/* Render '-' or other placeholder if no actions applicable */}
                {user.role !== UserRole.STUDENT && <span className="text-xs text-muted-foreground">-</span>}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
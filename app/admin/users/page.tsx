// app/admin/users/page.tsx
import React, { Suspense } from 'react';
import prisma from '@/lib/prisma';
import { UserRole, User, PatientProfile, StudentProfile } from '@prisma/client';
import AdminUserTable from '@/components/admin/AdminUserTable';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { Button } from '@/components/ui/button'; // Import Button for filter links

// Define type for user data including profiles
export type AdminUserView = User & {
    patientProfile: PatientProfile | null;
    studentProfile: StudentProfile | null;
}

async function getUsersForAdmin(filter?: string): Promise<AdminUserView[]> {
     let whereCondition: any = {};
     // Handle unverified student filter
     if (filter === 'unverified') {
         whereCondition = {
             role: UserRole.STUDENT,
             studentProfile: {
                 isVerified: false
             }
         };
     } else if (filter === 'students') {
          whereCondition = { role: UserRole.STUDENT };
     } else if (filter === 'patients') {
          whereCondition = { role: UserRole.PATIENT };
     }

    const users = await prisma.user.findMany({
        where: whereCondition,
        include: {
            patientProfile: true,
            studentProfile: true,
        },
        orderBy: {
            createdAt: 'desc',
        }
    });
    return users as AdminUserView[];
}

// Loading Skeleton for the table
const TableSkeleton = () => (
    <div className="space-y-2 mt-4">
        <Skeleton className="h-10 w-full rounded-md" />
        <Skeleton className="h-10 w-full rounded-md" />
        <Skeleton className="h-10 w-full rounded-md" />
        <Skeleton className="h-10 w-full rounded-md" />
        <Skeleton className="h-10 w-full rounded-md" />
    </div>
);

export default async function AdminUsersPage({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
    const filter = searchParams?.filter as string | undefined;
    const users = await getUsersForAdmin(filter);

    const getFilterDescription = () => {
        switch(filter) {
            case 'unverified': return 'Filter: Nur unbestätigte Studenten.';
            case 'students': return 'Filter: Nur Studenten.';
            case 'patients': return 'Filter: Nur Patienten.';
            default: return 'Alle registrierten Benutzer.';
        }
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <CardTitle>Benutzerverwaltung</CardTitle>
                        <CardDescription>
                            {getFilterDescription()}
                        </CardDescription>
                    </div>
                    {/* Simple Filter Links */}
                    <div className="flex gap-2 flex-wrap">
                        <Button size="sm" variant={!filter ? "secondary" : "outline"} asChild>
                            <Link href="/admin/users">Alle</Link>
                        </Button>
                         <Button size="sm" variant={filter === 'unverified' ? "secondary" : "outline"} asChild>
                            <Link href="/admin/users?filter=unverified">Unbestätigt</Link>
                        </Button>
                        <Button size="sm" variant={filter === 'students' ? "secondary" : "outline"} asChild>
                            <Link href="/admin/users?filter=students">Studenten</Link>
                        </Button>
                        <Button size="sm" variant={filter === 'patients' ? "secondary" : "outline"} asChild>
                            <Link href="/admin/users?filter=patients">Patienten</Link>
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <Suspense fallback={<TableSkeleton />}>
                    <AdminUserTable users={users} />
                </Suspense>
            </CardContent>
        </Card>
    );
}
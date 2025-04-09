// app/admin/users/[userId]/page.tsx
import React from 'react';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { notFound, redirect } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, User, CalendarDays, Building, GraduationCap, CheckCircle, AlertCircle, Mail } from 'lucide-react';
import { UserRole, User as DbUser, PatientProfile, StudentProfile } from '@prisma/client'; // Use alias for User type from DB
import { getInitials } from '@/lib/utils';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { Separator } from '@/components/ui/separator'; // Import Separator


// Type for the fetched user data
type UserDetailsForAdmin = DbUser & {
    patientProfile: PatientProfile | null;
    studentProfile: StudentProfile | null;
};

// Server-side function to fetch the specific user's data
async function getUserDataForAdmin(userId: string): Promise<UserDetailsForAdmin | null> {
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                patientProfile: true,
                studentProfile: true,
            },
        });
        return user as UserDetailsForAdmin | null;
    } catch (error) {
        console.error(`Error fetching user data for admin view (ID: ${userId}):`, error);
        return null;
    }
}

export default async function AdminUserProfileViewPage({ params }: { params: { userId: string } }) {
    const { userId } = params;
    // Layout already ensures the viewer is an Admin

    const user = await getUserDataForAdmin(userId);

    if (!user) {
        notFound(); // Show 404 if user doesn't exist
    }

    const profile = user.role === UserRole.PATIENT ? user.patientProfile : user.studentProfile;
    const displayName = profile ? `${profile.firstName} ${profile.lastName}` : user.email;
    const initials = getInitials(profile?.firstName, profile?.lastName, user.email);

    return (
        <div className="space-y-6">
            {/* Back Button & Header */}
            <div className="flex items-center justify-between mb-4">
                <Button variant="outline" size="sm" asChild>
                    <Link href="/admin/users">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Zurück zur Benutzerliste
                    </Link>
                </Button>
                <Badge variant={user.role === UserRole.ADMIN ? "destructive" : user.role === UserRole.STUDENT ? "secondary" : "outline"}>
                    {user.role}
                </Badge>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-start gap-4">
                        <Avatar className="h-16 w-16 border text-2xl">
                            <AvatarImage src={user.image ?? undefined} alt={displayName} />
                            <AvatarFallback>{initials}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <CardTitle className="text-2xl">{displayName}</CardTitle>
                            <CardDescription className="flex items-center gap-1.5 mt-1">
                                <Mail className='h-3.5 w-3.5'/> {user.email}
                            </CardDescription>
                             <p className="text-xs text-muted-foreground mt-2">
                                Registriert seit: {format(new Date(user.createdAt), 'dd. MMMM yyyy', { locale: de })}
                             </p>
                        </div>
                         {/* Verification Status for Students */}
                         {user.role === UserRole.STUDENT && user.studentProfile && (
                             <Badge variant={user.studentProfile.isVerified ? "default" : "destructive"} className={user.studentProfile.isVerified ? 'bg-green-100 text-green-800' : ''}>
                                {user.studentProfile.isVerified ? (
                                    <CheckCircle className="mr-1 h-3.5 w-3.5" />
                                ) : (
                                    <AlertCircle className="mr-1 h-3.5 w-3.5" />
                                )}
                                {user.studentProfile.isVerified ? 'Verifiziert' : 'Nicht verifiziert'}
                            </Badge>
                         )}
                    </div>
                </CardHeader>
                <Separator />
                <CardContent className="pt-6 grid gap-4 text-sm">
                    {/* Role Specific Details */}
                    {user.role === UserRole.PATIENT && user.patientProfile && (
                        <>
                             <h4 className="font-medium text-base mb-2">Patientenprofil</h4>
                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                                <div className="flex items-center gap-2">
                                    <User className="h-4 w-4 text-muted-foreground" />
                                    <span>{user.patientProfile.firstName} {user.patientProfile.lastName}</span>
                                </div>
                                {user.patientProfile.dob && (
                                     <div className="flex items-center gap-2">
                                        <CalendarDays className="h-4 w-4 text-muted-foreground" />
                                        <span>Geb.: {format(new Date(user.patientProfile.dob), 'dd.MM.yyyy')}</span>
                                     </div>
                                )}
                            </div>
                        </>
                    )}
                    {user.role === UserRole.STUDENT && user.studentProfile && (
                         <>
                            <h4 className="font-medium text-base mb-2">Studentenprofil</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                                <div className="flex items-center gap-2">
                                    <User className="h-4 w-4 text-muted-foreground" />
                                    <span>{user.studentProfile.firstName} {user.studentProfile.lastName}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Building className="h-4 w-4 text-muted-foreground" />
                                    <span>Uni: {user.studentProfile.university}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                                    <span>Klinisches Jahr: {user.studentProfile.clinicalYear}</span>
                                </div>
                            </div>
                         </>
                    )}
                    {user.role === UserRole.ADMIN && (
                        <p className="text-muted-foreground italic">Für Administratoren sind keine weiteren Profildetails verfügbar.</p>
                    )}
                    {!profile && user.role !== UserRole.ADMIN && (
                         <p className="text-destructive italic">Fehler: Profildatensatz für diesen Benutzer nicht gefunden.</p>
                    )}

                    {/* TODO: Add sections for recent activity/consultations if needed later */}
                </CardContent>
            </Card>
        </div>
    );
}
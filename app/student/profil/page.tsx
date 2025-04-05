// app/student/profil/page.tsx
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle } from 'lucide-react';
import StudentProfileForm from '@/components/features/StudentProfileForm'; // Import the form component
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// Helper function (can be moved)
const getInitials = (firstName?: string, lastName?: string) => {
    const first = firstName?.[0] ?? '';
    const last = lastName?.[0] ?? '';
    return `${first}${last}`.toUpperCase() || '?';
};

export default async function StudentProfilePage() {
    const session = await auth();

    if (!session?.user || session.user.role !== 'STUDENT') {
        redirect('/login');
    }
    const userId = session.user.id;

    const userWithProfile = await prisma.user.findUnique({
        where: { id: userId },
        include: {
            studentProfile: true,
        },
    });

    if (!userWithProfile || !userWithProfile.studentProfile) {
         return (
             <div className="container mx-auto max-w-2xl py-8">
                 <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Fehler</AlertTitle>
                    <AlertDescription>Studentenprofil nicht gefunden. Bitte kontaktieren Sie den Support.</AlertDescription>
                 </Alert>
             </div>
        );
    }

    const profile = userWithProfile.studentProfile;
    // const initials = getInitials(profile.firstName, profile.lastName); // Initials handled in form

    return (
         <div className="container mx-auto max-w-2xl py-8">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                         <div>
                            <CardTitle className="text-2xl">Mein Profil</CardTitle>
                            <CardDescription>Bearbeiten Sie hier Ihre Profildaten.</CardDescription>
                        </div>
                        {/* Display Verification Status */}
                        <Badge variant={profile.isVerified ? "default" : "destructive"} className={profile.isVerified ? 'bg-green-100 text-green-800' : ''}>
                            {profile.isVerified ? (
                                <CheckCircle className="mr-1 h-3.5 w-3.5" />
                            ) : (
                                <AlertCircle className="mr-1 h-3.5 w-3.5" />
                            )}
                            {profile.isVerified ? 'Verifiziert' : 'Nicht verifiziert'}
                        </Badge>
                    </div>
                 </CardHeader>
                 <CardContent>
                    {/* Render the Client Component Form */}
                     <StudentProfileForm user={userWithProfile} />

                     {/* Add Note about non-editable fields */}
                      <p className="text-xs text-muted-foreground mt-6 pt-4 border-t">
                          Hinweis: E-Mail und Verifizierungsstatus können nicht geändert werden.
                      </p>
                 </CardContent>
            </Card>
        </div>
    );
}
// app/patient/profil/page.tsx
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import PatientProfileForm from '@/components/features/PatientProfileForm'; // Import the form component
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// Helper function for initials (can be moved to utils if reused)
const getInitials = (firstName?: string, lastName?: string) => {
    const first = firstName?.[0] ?? '';
    const last = lastName?.[0] ?? '';
    return `${first}${last}`.toUpperCase() || '?';
};

export default async function PatientProfilePage() {
    const session = await auth();

    if (!session?.user || session.user.role !== 'PATIENT') {
        redirect('/login');
    }
    const userId = session.user.id;

    // Fetch user with profile data
    const userWithProfile = await prisma.user.findUnique({
        where: { id: userId },
        include: {
            patientProfile: true,
        },
    });

    if (!userWithProfile || !userWithProfile.patientProfile) {
         // Provide better feedback if profile is missing
        return (
             <div className="container mx-auto max-w-2xl py-8">
                 <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Fehler</AlertTitle>
                    <AlertDescription>Patientenprofil nicht gefunden. Bitte kontaktieren Sie den Support.</AlertDescription>
                 </Alert>
             </div>
        );
    }

    // const initials = getInitials(userWithProfile.patientProfile.firstName, userWithProfile.patientProfile.lastName); // Initials handled in form

    return (
        <div className="container mx-auto max-w-2xl py-8">
            <Card>
                <CardHeader>
                     <CardTitle className="text-2xl">Mein Profil</CardTitle>
                    <CardDescription>Bearbeiten Sie hier Ihre Profildaten.</CardDescription>
                </CardHeader>
                <CardContent>
                    {/* Render the Client Component Form */}
                    <PatientProfileForm user={userWithProfile} />
                </CardContent>
            </Card>
        </div>
    );
}
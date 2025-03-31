// app/patient/profil/page.tsx
import { auth } from '@/lib/auth'; // Import server-side auth helper
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from 'date-fns'; // For formatting date
import { de } from 'date-fns/locale'; // German locale

// Helper function for initials (can be moved to utils)
const getInitials = (firstName?: string, lastName?: string) => {
    const first = firstName?.[0] ?? '';
    const last = lastName?.[0] ?? '';
    return `${first}${last}`.toUpperCase() || '?';
};

export default async function PatientProfilePage() {
    const session = await auth(); // Get session server-side

    // Redirect if not logged in or not a patient (middleware should handle this too)
    if (!session?.user || session.user.role !== 'PATIENT') {
        redirect('/login');
    }

    const userId = session.user.id;

    // Fetch patient profile data
    const userWithProfile = await prisma.user.findUnique({
        where: { id: userId },
        include: {
            patientProfile: true,
        },
    });

    if (!userWithProfile || !userWithProfile.patientProfile) {
        // Handle case where profile might be missing (shouldn't happen with current setup)
        return <div className="text-red-500">Fehler: Patientenprofil nicht gefunden.</div>;
    }

    const profile = userWithProfile.patientProfile;
    const userEmail = userWithProfile.email;
    const initials = getInitials(profile.firstName, profile.lastName);

    return (
        <div className="container mx-auto max-w-2xl py-8">
            <Card>
                <CardHeader>
                    <div className="flex items-center space-x-4 mb-4">
                         <Avatar className="h-16 w-16">
                            {/* Add image source later if available */}
                            <AvatarImage src={undefined} alt={`${profile.firstName} ${profile.lastName}`} />
                            <AvatarFallback className="text-xl">{initials}</AvatarFallback>
                        </Avatar>
                        <div>
                             <CardTitle className="text-2xl">{`${profile.firstName} ${profile.lastName}`}</CardTitle>
                            <CardDescription>Patientenprofil</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="grid grid-cols-3 gap-4 items-center">
                        <span className="text-sm font-medium text-muted-foreground">E-Mail</span>
                        <span className="col-span-2 text-sm">{userEmail}</span>
                    </div>
                     <div className="grid grid-cols-3 gap-4 items-center">
                        <span className="text-sm font-medium text-muted-foreground">Vorname</span>
                        <span className="col-span-2 text-sm">{profile.firstName}</span>
                    </div>
                     <div className="grid grid-cols-3 gap-4 items-center">
                        <span className="text-sm font-medium text-muted-foreground">Nachname</span>
                        <span className="col-span-2 text-sm">{profile.lastName}</span>
                    </div>
                     <div className="grid grid-cols-3 gap-4 items-center">
                        <span className="text-sm font-medium text-muted-foreground">Geburtsdatum</span>
                        <span className="col-span-2 text-sm">
                            {profile.dob
                                ? format(new Date(profile.dob), 'dd. MMMM yyyy', { locale: de })
                                : 'Nicht angegeben'}
                             {/* V1 Enhancement Placeholder: If DOB is null, show an 'Add DOB' button/form here */}
                             {/* {!profile.dob && <Button size="sm" variant="outline" className="ml-4">Hinzufügen</Button>} */}
                        </span>
                    </div>
                     <div className="grid grid-cols-3 gap-4 items-center">
                        <span className="text-sm font-medium text-muted-foreground">Registriert seit</span>
                        <span className="col-span-2 text-sm">{format(new Date(userWithProfile.createdAt), 'dd.MM.yyyy')}</span>
                    </div>

                     {/* Add more profile fields if necessary */}

                     {/* Placeholder for Edit Button (Not in V1 scope, except maybe DOB) */}
                      {/* <div className="pt-4 border-t">
                         <Button variant="outline">Profil bearbeiten</Button>
                     </div> */}
                </CardContent>
            </Card>
        </div>
    );
}
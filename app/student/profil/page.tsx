// app/student/profil/page.tsx
import { auth } from '@/lib/auth'; // Import server-side auth helper
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge"; // For verification status
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { CheckCircle, AlertCircle } from 'lucide-react'; // Icons for verification

// Helper function for initials (can be moved to utils)
const getInitials = (firstName?: string, lastName?: string) => {
    const first = firstName?.[0] ?? '';
    const last = lastName?.[0] ?? '';
    return `${first}${last}`.toUpperCase() || '?';
};

export default async function StudentProfilePage() {
    const session = await auth(); // Get session server-side

    // Redirect if not logged in or not a student
    if (!session?.user || session.user.role !== 'STUDENT') {
        redirect('/login');
    }

    const userId = session.user.id;

    // Fetch student profile data
    const userWithProfile = await prisma.user.findUnique({
        where: { id: userId },
        include: {
            studentProfile: true,
        },
    });

    if (!userWithProfile || !userWithProfile.studentProfile) {
        // Handle case where profile might be missing
        return <div className="text-red-500">Fehler: Studentenprofil nicht gefunden.</div>;
    }

    const profile = userWithProfile.studentProfile;
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
                            <CardDescription>Medizinstudentenprofil</CardDescription>
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
                        <span className="text-sm font-medium text-muted-foreground">Universität</span>
                        <span className="col-span-2 text-sm">{profile.university}</span>
                    </div>
                     <div className="grid grid-cols-3 gap-4 items-center">
                        <span className="text-sm font-medium text-muted-foreground">Klinisches Jahr/Semester</span>
                        <span className="col-span-2 text-sm">{profile.clinicalYear}.</span>
                    </div>
                     <div className="grid grid-cols-3 gap-4 items-center">
                        <span className="text-sm font-medium text-muted-foreground">Verifizierungsstatus</span>
                        <span className="col-span-2 text-sm">
                             <Badge variant={profile.isVerified ? "default" : "destructive"} className={profile.isVerified ? 'bg-green-100 text-green-800' : ''}>
                                {profile.isVerified ? (
                                    <CheckCircle className="mr-1 h-3.5 w-3.5" />
                                ) : (
                                     <AlertCircle className="mr-1 h-3.5 w-3.5" />
                                )}
                                {profile.isVerified ? 'Verifiziert' : 'Nicht verifiziert'}
                            </Badge>
                        </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 items-center">
                        <span className="text-sm font-medium text-muted-foreground">Registriert seit</span>
                        <span className="col-span-2 text-sm">{format(new Date(userWithProfile.createdAt), 'dd.MM.yyyy')}</span>
                    </div>

                    {/* Note: Profile editing is out of scope for V1.0 for students */}
                     <div className="pt-4 border-t text-xs text-muted-foreground">
                         Profilinformationen können derzeit nicht bearbeitet werden.
                     </div>
                </CardContent>
            </Card>
        </div>
    );
}
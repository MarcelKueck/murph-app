// app/admin/dashboard/page.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import prisma from '@/lib/prisma';
import { UserRole, ConsultationStatus } from '@prisma/client';
import { Users, FileText, UserCheck, Clock } from 'lucide-react';
import Link from 'next/link';

// Simple Stats Card Component (can be moved to components/admin later)
const AdminStatsCard = ({ title, value, icon: Icon, description, link }: { title: string, value: number | string, icon: React.ElementType, description?: string, link?: string }) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{value}</div>
            {description && <p className="text-xs text-muted-foreground">{description}</p>}
            {link && (
                <Link href={link} className="text-xs text-primary hover:underline mt-1 block">
                    Details anzeigen
                </Link>
            )}
        </CardContent>
    </Card>
);

async function getAdminStats() {
    const totalUsers = await prisma.user.count();
    const patientCount = await prisma.user.count({ where: { role: UserRole.PATIENT } });
    const studentCount = await prisma.user.count({ where: { role: UserRole.STUDENT } });
    const unverifiedStudents = await prisma.studentProfile.count({ where: { isVerified: false } });

    const requestedConsultations = await prisma.consultation.count({ where: { status: ConsultationStatus.REQUESTED } });
    const inProgressConsultations = await prisma.consultation.count({ where: { status: ConsultationStatus.IN_PROGRESS } });
    const completedConsultations = await prisma.consultation.count({ where: { status: ConsultationStatus.COMPLETED } });
    const totalConsultations = requestedConsultations + inProgressConsultations + completedConsultations; // Add other statuses if needed

    return {
        totalUsers,
        patientCount,
        studentCount,
        unverifiedStudents,
        requestedConsultations,
        inProgressConsultations,
        completedConsultations,
        totalConsultations,
    };
}

export default async function AdminDashboardPage() {
    const stats = await getAdminStats();

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight">Übersicht</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <AdminStatsCard title="Benutzer Gesamt" value={stats.totalUsers} icon={Users} description={`${stats.patientCount} Patienten, ${stats.studentCount} Studenten`} link="/admin/users"/>
                <AdminStatsCard title="Verifizierung Ausstehend" value={stats.unverifiedStudents} icon={UserCheck} description="Studenten zur Prüfung" link="/admin/users?filter=unverified"/>
                <AdminStatsCard title="Beratungen Gesamt" value={stats.totalConsultations} icon={FileText} description="Angefragt, Laufend, Abgeschlossen" link="/admin/consultations"/>
                 <AdminStatsCard title="Aktive Anfragen" value={stats.requestedConsultations + stats.inProgressConsultations} icon={Clock} description={`${stats.requestedConsultations} Angefragt, ${stats.inProgressConsultations} Laufend`} link="/admin/consultations?filter=active"/>
            </div>

             {/* Optionally add more sections, e.g., recent activity */}
             {/* Example: Placeholder for recent unverified students */}
              {/* <Card>
                 <CardHeader>
                     <CardTitle>Kürzlich registrierte, unbestätigte Studenten</CardTitle>
                 </CardHeader>
                 <CardContent>
                     <p className="text-sm text-muted-foreground">Liste hier anzeigen...</p>
                 </CardContent>
             </Card> */}
        </div>
    );
}
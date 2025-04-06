// app/api/nachrichten/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { triggerPusherEvent } from '@/lib/pusher/server';
import { z } from 'zod';
import { ConsultationStatus, UserRole } from '@prisma/client';
import { sendEmail, templates } from '@/lib/email'; // Correct import

const messageSchema = z.object({
  consultationId: z.string().cuid({ message: "Ungültige Beratungs-ID." }),
  content: z.string().trim().min(1, "Nachricht darf nicht leer sein.").max(5000),
});

export async function POST(request: Request) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
        }
        const userId = session.user.id; // This is the sender

        const body = await request.json();
        const validation = messageSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json({ error: 'Ungültige Eingabe.', details: validation.error.flatten() }, { status: 400 });
        }
        const { consultationId, content } = validation.data;

        // Fetch consultation details including participants' emails/names/roles
        const consultation = await prisma.consultation.findUnique({
            where: { id: consultationId },
            select: {
                id: true, topic: true, patientId: true, studentId: true, status: true,
                patient: { select: { email: true, role: true, patientProfile: { select: { firstName: true } } } },
                student: { select: { email: true, role: true, studentProfile: { select: { firstName: true } } } },
            }
        });

        if (!consultation) { return NextResponse.json({ error: 'Beratung nicht gefunden.' }, { status: 404 }); }

        const isPatient = consultation.patientId === userId;
        const isAssignedStudent = consultation.studentId === userId;

        if (!isPatient && !isAssignedStudent) { return NextResponse.json({ error: 'Sie sind nicht Teil dieser Beratung.' }, { status: 403 }); }
        if (consultation.status !== ConsultationStatus.IN_PROGRESS) { return NextResponse.json({ error: 'Nachrichten können nur in laufenden Beratungen gesendet werden.' }, { status: 400 }); }

        // Create message
        const newMessage = await prisma.message.create({
            data: { consultationId, senderId: userId, content },
            include: { sender: { select: { id: true, role: true, image: true, patientProfile: { select: { firstName: true, lastName: true } }, studentProfile: { select: { firstName: true, lastName: true } } } } }
        });

         const senderProfile = newMessage.sender.role === UserRole.PATIENT ? newMessage.sender.patientProfile : newMessage.sender.studentProfile;
         const senderName = `${senderProfile?.firstName || 'Nutzer'} ${senderProfile?.lastName || ''}`.trim();

         const responsePayload = { /* ... payload data ... */ id: newMessage.id, consultationId: newMessage.consultationId, senderId: newMessage.senderId, content: newMessage.content, createdAt: newMessage.createdAt.toISOString(), sender: { id: newMessage.sender.id, role: newMessage.sender.role, firstName: senderProfile?.firstName ?? 'Nutzer', lastName: senderProfile?.lastName ?? '', image: newMessage.sender.image } };

        // Trigger Pusher
        await triggerPusherEvent(`private-consultation-${consultationId}`, 'new-message', responsePayload);

        // Send Email Notification to Recipient
        let recipient = null;
        if (isPatient && consultation.student) { recipient = consultation.student; }
        else if (isAssignedStudent) { recipient = consultation.patient; }

        if (recipient && recipient.email) {
            const recipientProfile = recipient.role === UserRole.PATIENT ? recipient.patientProfile : recipient.studentProfile;
             const templateData = templates.newMessage(
                 { email: recipient.email, firstName: recipientProfile?.firstName, role: recipient.role },
                 { name: senderName },
                 { id: consultation.id, topic: consultation.topic }
             );
             // <<< Add 'to' field when calling sendEmail >>>
             sendEmail({
                to: recipient.email,
                subject: templateData.subject,
                text: templateData.text,
                html: templateData.html,
             }).catch(err => {
                 console.error(`Failed to send new message email for consultation ${consultation.id} to ${recipient.email}:`, err);
             });
         }

        return NextResponse.json(responsePayload, { status: 201 });

    } catch (error) {
        console.error("Error in POST /api/nachrichten:", error);
        return NextResponse.json({ error: 'Nachricht konnte nicht gesendet werden aufgrund eines Serverfehlers.' }, { status: 500 });
    }
}
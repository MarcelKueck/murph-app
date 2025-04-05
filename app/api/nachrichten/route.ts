// app/api/nachrichten/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { triggerPusherEvent } from '@/lib/pusher/server';
import { z } from 'zod';
import { ConsultationStatus, UserRole } from '@prisma/client';

const messageSchema = z.object({
  consultationId: z.string().cuid({ message: "Ungültige Beratungs-ID." }),
  content: z.string()
             .trim()
             .min(1, "Nachricht darf nicht leer sein.")
             .max(5000, "Nachricht darf maximal 5000 Zeichen lang sein."),
});

export async function POST(request: Request) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
        }
        const userId = session.user.id;
        const userRole = session.user.role;

        const body = await request.json();
        const validation = messageSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json({ error: 'Ungültige Eingabe.', details: validation.error.flatten() }, { status: 400 });
        }
        const { consultationId, content } = validation.data;

        const consultation = await prisma.consultation.findUnique({
            where: { id: consultationId },
            select: { patientId: true, studentId: true, status: true }
        });

        if (!consultation) {
            return NextResponse.json({ error: 'Beratung nicht gefunden.' }, { status: 404 });
        }

        const isPatient = consultation.patientId === userId;
        const isAssignedStudent = consultation.studentId === userId;

        if (!isPatient && !isAssignedStudent) {
             return NextResponse.json({ error: 'Sie sind nicht Teil dieser Beratung.' }, { status: 403 });
        }
        if (consultation.status !== ConsultationStatus.IN_PROGRESS) {
             return NextResponse.json({ error: 'Nachrichten können nur in laufenden Beratungen gesendet werden.' }, { status: 400 });
        }

        // Update Prisma query to include sender image
        const newMessage = await prisma.message.create({
            data: {
                consultationId: consultationId,
                senderId: userId,
                content: content,
            },
            include: {
                sender: {
                    select: {
                        id: true,
                        role: true,
                        image: true, // <<< Include image
                        patientProfile: { select: { firstName: true, lastName: true } },
                        studentProfile: { select: { firstName: true, lastName: true } },
                    }
                }
            }
        });

         const senderProfile = newMessage.sender.role === UserRole.PATIENT
            ? newMessage.sender.patientProfile
            : newMessage.sender.studentProfile;

         // Update payload structure
         const responsePayload = {
             id: newMessage.id,
             consultationId: newMessage.consultationId,
             senderId: newMessage.senderId,
             content: newMessage.content,
             createdAt: newMessage.createdAt.toISOString(),
             sender: {
                 id: newMessage.sender.id,
                 role: newMessage.sender.role,
                 firstName: senderProfile?.firstName ?? 'Nutzer',
                 lastName: senderProfile?.lastName ?? '',
                 image: newMessage.sender.image, // <<< Include image
             }
         };

        const channelName = `private-consultation-${consultationId}`;
        const eventName = 'new-message';

        // Send updated payload to Pusher
        await triggerPusherEvent(channelName, eventName, responsePayload);

        // Return the updated payload
        return NextResponse.json(responsePayload, { status: 201 });

    } catch (error) {
        console.error("Error in POST /api/nachrichten:", error);
        return NextResponse.json({ error: 'Nachricht konnte nicht gesendet werden aufgrund eines Serverfehlers.' }, { status: 500 });
    }
}
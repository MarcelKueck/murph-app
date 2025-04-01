// app/api/pusher/auth/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth'; // Server-side auth
import { pusherServer } from '@/lib/pusher/server'; // Pusher server instance
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return new NextResponse('Nicht autorisiert.', { status: 401 });
        }
        const userId = session.user.id;

        const data = await request.formData(); // Pusher client sends form data
        const socketId = data.get('socket_id') as string;
        const channel = data.get('channel_name') as string;

        // Basic validation
        if (!socketId || !channel) {
             return new NextResponse('Ungültige Anfrage.', { status: 400 });
        }

        // --- Authorize Channel Access ---
        // Check if channel name follows expected format: private-consultation-${consultationId}
        const match = channel.match(/^private-consultation-(.+)$/);
        if (!match || !match[1]) {
            console.warn(`Pusher Auth: Invalid channel name format: ${channel}`);
            return new NextResponse('Ungültiger Kanalname.', { status: 400 });
        }
        const consultationId = match[1];

        // Verify the user is actually part of this consultation
        const consultation = await prisma.consultation.findFirst({
            where: {
                id: consultationId,
                OR: [
                    { patientId: userId },
                    { studentId: userId },
                ],
            },
            select: { id: true } // Just need to know if they are part of it
        });

        if (!consultation) {
             console.warn(`Pusher Auth: User ${userId} denied access to channel ${channel}`);
            return new NextResponse('Zugriff auf Kanal verweigert.', { status: 403 });
        }
        // --- End Authorization ---


        // If authorized, prepare Pusher auth response data
        const userData = {
          user_id: userId,
          // user_info: { // Optional: Send additional user info if needed by presence channels
          //   name: session.user.name, // Example, if name is in session
          // }
        };

        if (!pusherServer) {
             return new NextResponse('Pusher Server nicht initialisiert.', { status: 500 });
        }

        const authResponse = pusherServer.authorizeChannel(socketId, channel, userData);
        console.log(`Pusher Auth: User ${userId} authorized for channel ${channel}`);

        // Return the authorization response required by Pusher client
        return NextResponse.json(authResponse);

    } catch (error) {
        console.error("Pusher Auth Error:", error);
        return new NextResponse('Authentifizierungsfehler.', { status: 500 });
    }
}
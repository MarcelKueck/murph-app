// app/api/nachrichten/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth'; // Server-side auth helper
import prisma from '@/lib/prisma'; // Prisma client instance
import { triggerPusherEvent } from '@/lib/pusher/server'; // Pusher helper function
import { z } from 'zod'; // For input validation
import { ConsultationStatus, UserRole } from '@prisma/client'; // Import UserRole and ConsultationStatus enums

// Define the expected structure and validation rules for the request body
const messageSchema = z.object({
  consultationId: z.string().cuid({ message: "Ungültige Beratungs-ID." }), // Ensure it's a valid CUID
  content: z.string()
             .trim() // Remove leading/trailing whitespace
             .min(1, "Nachricht darf nicht leer sein.")
             .max(5000, "Nachricht darf maximal 5000 Zeichen lang sein."), // Limit message length
});

export async function POST(request: Request) {
    try {
        // 1. Authenticate the user
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
        }
        const userId = session.user.id;
        const userRole = session.user.role; // Get role from session

        // 2. Parse and validate the request body
        const body = await request.json();
        const validation = messageSchema.safeParse(body);

        if (!validation.success) {
            // Return validation errors if parsing fails
            return NextResponse.json({ error: 'Ungültige Eingabe.', details: validation.error.flatten() }, { status: 400 });
        }

        const { consultationId, content } = validation.data;

        // 3. Authorize: Verify user is part of this consultation and it's active
        const consultation = await prisma.consultation.findUnique({
            where: { id: consultationId },
            select: { // Select only the fields needed for authorization and checks
                patientId: true,
                studentId: true,
                status: true,
            }
        });

        if (!consultation) {
            return NextResponse.json({ error: 'Beratung nicht gefunden.' }, { status: 404 });
        }

        const isPatient = consultation.patientId === userId;
        const isAssignedStudent = consultation.studentId === userId;

        // Check if the user is either the patient or the assigned student
        if (!isPatient && !isAssignedStudent) {
             return NextResponse.json({ error: 'Sie sind nicht Teil dieser Beratung.' }, { status: 403 });
        }

        // Check if the consultation is currently in progress
        if (consultation.status !== ConsultationStatus.IN_PROGRESS) {
             return NextResponse.json({ error: 'Nachrichten können nur in laufenden Beratungen gesendet werden.' }, { status: 400 });
        }
        // --- End Authorization ---


        // 4. Create the message in the database
        const newMessage = await prisma.message.create({
            data: {
                consultationId: consultationId,
                senderId: userId,
                content: content, // Consider sanitization (e.g., using DOMPurify on client or server) if rendering HTML later
            },
            include: { // Include sender details needed for the client-side display via Pusher/API response
                sender: {
                    select: {
                        id: true,
                        role: true, // Include role
                        // Include profile specifics based on role
                        patientProfile: { select: { firstName: true, lastName: true } },
                        studentProfile: { select: { firstName: true, lastName: true } },
                    }
                }
            }
        });

         // 5. Format the sender data for the Pusher payload and API response
         // Determine which profile to use based on the sender's role
         const senderProfile = newMessage.sender.role === UserRole.PATIENT // Now UserRole is defined
            ? newMessage.sender.patientProfile
            : newMessage.sender.studentProfile;

         // Construct the payload with necessary message and sender info
         const responsePayload = {
             id: newMessage.id,
             consultationId: newMessage.consultationId,
             senderId: newMessage.senderId,
             content: newMessage.content,
             createdAt: newMessage.createdAt.toISOString(), // Standard format for dates over API
             sender: {
                 id: newMessage.sender.id,
                 role: newMessage.sender.role,
                 // Provide fallbacks if profile data is somehow missing
                 firstName: senderProfile?.firstName ?? 'Nutzer',
                 lastName: senderProfile?.lastName ?? '',
             }
         };

        // 6. Trigger Pusher event for real-time update
        // Define channel name and event name
        const channelName = `private-consultation-${consultationId}`;
        const eventName = 'new-message';

        // Use the helper function (ensure socket_id is not needed or handled if preventing echo)
        // For simplicity here, we're not excluding the sender's socket_id
        await triggerPusherEvent(channelName, eventName, responsePayload);


        // 7. Return the created message data (payload) as the successful response
        return NextResponse.json(responsePayload, { status: 201 }); // 201 Created

    } catch (error) {
        // Generic error handling for unexpected issues
        console.error("Error in POST /api/nachrichten:", error);
         // Differentiate specific errors if possible (e.g., DB connection error)
        return NextResponse.json({ error: 'Nachricht konnte nicht gesendet werden aufgrund eines Serverfehlers.' }, { status: 500 });
    }
}
// app/api/nachrichten/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { triggerPusherEvent } from '@/lib/pusher/server';
import { z } from 'zod';
import { ConsultationStatus, UserRole, Document, Message } from '@prisma/client'; // Import Prisma types
import { sendEmail, templates } from '@/lib/email';

// Define the structure for file data coming from the client
const fileSchema = z.object({
    url: z.string().url("Ungültige Datei-URL."),
    pathname: z.string().optional(), // Optional pathname from Vercel Blob
    contentType: z.string({required_error: "Dateityp fehlt."}),
    size: z.number({required_error: "Dateigröße fehlt."}), // Require size from client
    originalFilename: z.string({required_error: "Dateiname fehlt."}),
});

// Base schema WITHOUT the 'files' field for initial validation
const messageBaseSchema = z.object({
  consultationId: z.string().cuid({ message: "Ungültige Beratungs-ID." }),
  content: z.string().trim().max(5000, "Nachricht zu lang.").optional(), // Optional text
});

export async function POST(request: Request) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
        }
        const userId = session.user.id;

        const body = await request.json();
        console.log("[/api/nachrichten] Received body:", JSON.stringify(body, null, 2));

        // 1. Validate only base fields with Zod
        const validation = messageBaseSchema.safeParse(body);

        if (!validation.success) {
            console.error("Base message validation failed (excluding files):", validation.error.flatten());
            return NextResponse.json({ error: 'Ungültige Eingabedaten.', details: validation.error.flatten() }, { status: 400 });
        }

        const { consultationId, content } = validation.data;

        // 2. Manually check and validate 'files' from the original body
        const filesFromBody = body.files;
        let validatedFiles: z.infer<typeof fileSchema>[] | undefined = undefined;

        if (filesFromBody !== undefined) {
            // Ensure filesFromBody is an array before validating
            if (!Array.isArray(filesFromBody)) {
                console.error("Files field is not an array:", filesFromBody);
                return NextResponse.json({ error: 'Ungültiges Dateiformat empfangen (kein Array).' }, { status: 400 });
            }
            // If files field exists and is an array, try to validate it
            const filesValidation = z.array(fileSchema).safeParse(filesFromBody);
            if (filesValidation.success) {
                validatedFiles = filesValidation.data;
                console.log(`[/api/nachrichten] Files array validated successfully with ${validatedFiles.length} items.`);
            } else {
                console.error("Files array validation failed:", filesValidation.error.flatten());
                return NextResponse.json({ error: 'Ungültiges Dateiformat empfangen.', details: filesValidation.error.flatten() }, { status: 400 });
            }
        } else {
             console.log("[/api/nachrichten] No 'files' field found in the request body.");
        }

        // 3. Manual check: Ensure at least content OR files exist
        const hasContent = content && content.length > 0;
        const hasFiles = validatedFiles && validatedFiles.length > 0;
        if (!hasContent && !hasFiles) {
            console.error("Validation failed: Message must contain text or files.");
            return NextResponse.json({ error: 'Nachricht muss entweder Text oder mindestens eine Datei enthalten.' }, { status: 400 });
        }

        // --- Fetch consultation ---
        const consultation = await prisma.consultation.findUnique({
            where: { id: consultationId },
            select: { id: true, topic: true, patientId: true, studentId: true, status: true, patient: { select: { id: true, email: true, role: true, patientProfile: { select: { firstName: true, lastName: true } } } }, student: { select: { id: true, email: true, role: true, studentProfile: { select: { firstName: true } } } } }
        });
        if (!consultation) { return NextResponse.json({ error: 'Beratung nicht gefunden.' }, { status: 404 }); }

        // --- Authorization checks ---
        const isPatient = consultation.patientId === userId;
        const isAssignedStudent = consultation.studentId === userId;
        if (!isPatient && !isAssignedStudent) { return NextResponse.json({ error: 'Sie sind nicht Teil dieser Beratung.' }, { status: 403 }); }
        if (consultation.status !== ConsultationStatus.IN_PROGRESS) { return NextResponse.json({ error: 'Nachrichten/Dateien können nur in laufenden Beratungen gesendet werden.' }, { status: 400 }); }

        // Define type for message with included relations
        type MessageWithSender = (Message & { sender: { id: string, role: UserRole, image: string | null, patientProfile: { firstName: string | null, lastName: string | null } | null, studentProfile: { firstName: string | null, lastName: string | null } | null } });
        let newMessage: MessageWithSender | null = null;
        const createdDocuments: Document[] = [];

        // --- Transaction ---
        await prisma.$transaction(async (tx) => {
            // 1. Create the message
            newMessage = await tx.message.create({
                data: {
                    consultationId,
                    senderId: userId,
                    content: content ?? "", // Ensure content is string
                },
                 include: { sender: { select: { id: true, role: true, image: true, patientProfile: { select: { firstName: true, lastName: true } }, studentProfile: { select: { firstName: true, lastName: true } } } } }
            });
            console.log(`Message ${newMessage.id} created.`);

            // 2. Create Document records if files were provided AND link to message
            if (validatedFiles && validatedFiles.length > 0) {
                 console.log(`Creating ${validatedFiles.length} document records for message ${newMessage.id}...`);
                 for (const file of validatedFiles) {
                     const doc = await tx.document.create({
                         data: {
                             consultationId: consultationId,
                             uploaderId: userId,
                             fileName: file.originalFilename,
                             storageUrl: file.url,
                             mimeType: file.contentType,
                             fileSize: file.size, // Use validated size
                             messageId: newMessage.id // <<< LINK TO THE CREATED MESSAGE >>>
                         }
                     });
                     createdDocuments.push(doc); // Add full doc object
                     console.log(`Document ${doc.id} (${doc.fileName}) created and linked to message ${newMessage.id}.`);
                 }
            }
        });
        // --- End Transaction ---

        if (!newMessage) { throw new Error("Message creation failed within transaction."); }

        // --- Prepare Payloads and Trigger Pusher Events ---
        const senderProfile = newMessage.sender.role === UserRole.PATIENT ? newMessage.sender.patientProfile : newMessage.sender.studentProfile;
        const channelName = `private-consultation-${consultationId}`;

        // 1. New Message Event Payload
        const messageResponsePayload = {
            id: newMessage.id, consultationId: newMessage.consultationId,
            senderId: newMessage.senderId, content: newMessage.content,
            createdAt: newMessage.createdAt.toISOString(),
            sender: {
                 id: newMessage.sender.id, role: newMessage.sender.role,
                 firstName: senderProfile?.firstName ?? 'Nutzer',
                 lastName: senderProfile?.lastName ?? '',
                 image: newMessage.sender.image
             },
            attachedDocuments: createdDocuments.map(doc => ({ // Include documents linked TO THIS MESSAGE
                id: doc.id, fileName: doc.fileName, storageUrl: doc.storageUrl,
                mimeType: doc.mimeType, fileSize: doc.fileSize
            }))
        };
        await triggerPusherEvent(channelName, 'new-message', messageResponsePayload);

        // 2. New Document Event Payload(s) - for the top list
        for (const doc of createdDocuments) {
             const documentPusherPayload = {
                id: doc.id, fileName: doc.fileName, storageUrl: doc.storageUrl,
                mimeType: doc.mimeType, fileSize: doc.fileSize, uploaderId: userId,
             };
             await triggerPusherEvent(channelName, 'new-document', documentPusherPayload);
        }
        // --- End Pusher Events ---

        // --- Send Email Notification ---
        let recipient = null;
        const senderName = `${senderProfile?.firstName || 'Nutzer'} ${senderProfile?.lastName || ''}`.trim();
        if (isPatient && consultation.student) { recipient = consultation.student; }
        else if (isAssignedStudent && consultation.patient) { recipient = consultation.patient; }

        if (recipient && recipient.email) {
             const recipientProfile = recipient.role === UserRole.PATIENT ? consultation.patient?.patientProfile : recipient.studentProfile; // Get patient profile from consultation data
             const templateData = templates.newMessage(
                 { email: recipient.email, firstName: recipientProfile?.firstName, role: recipient.role },
                 { name: senderName },
                 { id: consultation.id, topic: consultation.topic }
             );
             sendEmail({ to: recipient.email, subject: templateData.subject, text: templateData.text, html: templateData.html, }).catch(err => {
                 console.error(`Failed to send new message/doc email for consultation ${consultation.id} to ${recipient?.email}:`, err);
             });
         }
        // --- End Email ---

        return NextResponse.json(messageResponsePayload, { status: 201 });

    } catch (error) {
        console.error("Error in POST /api/nachrichten:", error);
        return NextResponse.json({ error: 'Nachricht/Dateien konnten nicht gesendet werden aufgrund eines Serverfehlers.' }, { status: 500 });
    }
}
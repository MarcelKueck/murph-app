// app/api/upload/route.ts
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma'; // <<< Import prisma
import { triggerPusherEvent } from '@/lib/pusher/server'; // <<< Import Pusher helper
import { UserRole, ConsultationStatus } from '@prisma/client'; // <<< Import UserRole and ConsultationStatus

// Define allowed types for chat uploads
const ALLOWED_CHAT_UPLOAD_TYPES = ['application/pdf', 'image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const MAX_FILE_SIZE_MB = 10;

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      // --- MODIFIED: Authorization and Metadata Handling ---
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        const session = await auth();
        if (!session?.user?.id) {
            throw new Error('Nicht autorisiert: Kein Benutzer angemeldet.');
        }
        const userId = session.user.id;
        const userRole = session.user.role;

        // Parse consultationId from payload
        let consultationId: string | null = null;
        if (clientPayload) {
             try {
                 const payload = JSON.parse(clientPayload);
                 consultationId = payload.consultationId;
             } catch (e) {
                 console.error("Failed to parse clientPayload:", clientPayload, e);
                 throw new Error('Ungültige Anfrage-Daten.');
             }
         }
         if (!consultationId || typeof consultationId !== 'string') {
             throw new Error('Beratungs-ID fehlt oder ist ungültig.');
         }

         // --- Authorization Check: Verify user participation in consultation ---
         const consultation = await prisma.consultation.findFirst({
             where: {
                 id: consultationId,
                 OR: [
                     { patientId: userId }, // Allow patient
                     { studentId: userId }, // Allow assigned student
                 ],
                 // Optional: Restrict uploads only to IN_PROGRESS?
                 // status: ConsultationStatus.IN_PROGRESS,
             },
             select: { id: true, status: true } // Select minimal fields
         });

         if (!consultation) {
              console.warn(`Upload Denied: User ${userId} not part of consultation ${consultationId} or consultation not found.`);
              throw new Error('Zugriff auf diese Beratung verweigert.');
         }
         // --- End Authorization Check ---


        // Generate a unique pathname within the consultation context
        const uniquePrefix = Date.now();
        // Example path: 'consultations/consultation_abc/user_xyz/timestamp-filename.pdf'
        const blobPathname = `consultations/${consultationId}/user_${userId}/${uniquePrefix}-${pathname}`;

        console.log(`[Chat Blob Upload] Authorizing path: ${blobPathname} for user: ${userId}, consultation: ${consultationId}`);

        return {
          allowedContentTypes: ALLOWED_CHAT_UPLOAD_TYPES,
          maximumSizeInBytes: MAX_FILE_SIZE_MB * 1024 * 1024,
          tokenPayload: JSON.stringify({
            userId: userId,
            consultationId: consultationId, // Pass consultationId to onUploadCompleted
            originalFilename: pathname, // Keep original name if needed
          }),
          pathname: blobPathname, // Use the server-generated path
          addRandomSuffix: false, // We added a timestamp prefix
        };
      },
      // --- MODIFIED: Save to DB and Trigger Pusher ---
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        console.log('[Chat Blob Upload] Completed:', blob.pathname);
        let payload;
        try {
            payload = JSON.parse(tokenPayload || '{}');
        } catch (e) {
            console.error("[Chat Blob Upload] Error parsing tokenPayload on completion:", e);
            return; // Stop processing if payload is invalid
        }

        const { userId, consultationId, originalFilename } = payload;

        if (!userId || !consultationId || !originalFilename) {
            console.error("[Chat Blob Upload] Missing data in tokenPayload:", payload);
            return;
        }

        try {
            // --- Save Document record to Database ---
             console.log(`[Chat Blob Upload] Saving document record for consultation ${consultationId}`);
             const newDocument = await prisma.document.create({
                 data: {
                     consultationId: consultationId,
                     uploaderId: userId,
                     fileName: originalFilename, // Use original filename for display
                     storageUrl: blob.url,
                     mimeType: blob.contentType,
                     fileSize: blob.size,
                 },
                 // Select data needed for Pusher payload
                 select: {
                     id: true,
                     fileName: true,
                     storageUrl: true,
                     mimeType: true,
                     fileSize: true,
                     createdAt: true, // Optional, maybe useful
                     uploaderId: true, // Useful to know who uploaded
                 }
             });
             console.log(`[Chat Blob Upload] Document record created: ${newDocument.id}`);
             // --- End Save Document ---

             // --- Trigger Pusher Event ---
             const channelName = `private-consultation-${consultationId}`;
             // Send necessary document details to clients
             const pusherPayload = {
                id: newDocument.id,
                fileName: newDocument.fileName,
                storageUrl: newDocument.storageUrl,
                mimeType: newDocument.mimeType,
                fileSize: newDocument.fileSize,
                uploaderId: newDocument.uploaderId, // Include uploader ID
             };
             await triggerPusherEvent(channelName, 'new-document', pusherPayload);
             console.log(`[Chat Blob Upload] Pusher event 'new-document' triggered for channel ${channelName}`);
             // --- End Pusher Event ---

        } catch (dbOrPusherError) {
             console.error(`[Chat Blob Upload] Error saving document or triggering Pusher for ${blob.url}:`, dbOrPusherError);
             // Potentially try to delete the blob if DB save fails? (More complex)
             // For now, just log the error. The blob exists, but isn't tracked in DB.
        }
      },
    });

    // Return the successful response from handleUpload (needed by the client uploader)
    return NextResponse.json(jsonResponse);

  } catch (error) {
    // Catch errors from onBeforeGenerateToken (like auth errors)
    console.error('[Chat Blob Upload] Error handling upload:', error);
    const message = (error instanceof Error) ? error.message : 'Interner Serverfehler beim Upload.';
    // Return appropriate status code based on error type if possible
    const status = (error as any)?.message?.includes('Nicht autorisiert') ? 401
                 : (error as any)?.message?.includes('Zugriff') ? 403
                 : 500;
    return NextResponse.json(
      { error: `Upload fehlgeschlagen: ${message}` },
      { status: status }
    );
  }
}
// app/api/upload/request/route.ts
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { UserRole } from '@prisma/client';

// Define allowed types for request uploads (can be same or different from chat)
const ALLOWED_REQUEST_UPLOAD_TYPES = ['application/pdf', 'image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const MAX_FILE_SIZE_MB = 10; // Same limit for consistency

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname /*, clientPayload */) => {
        // 1. Authentication
        const session = await auth();
        if (!session?.user?.id) {
            throw new Error('Nicht autorisiert: Kein Benutzer angemeldet.');
        }
        const userId = session.user.id;

        // 2. Authorization: Must be a PATIENT for request uploads
        if (session.user.role !== UserRole.PATIENT) {
             throw new Error('Nur Patienten dürfen Dateien für neue Anfragen hochladen.');
        }

        // 3. Generate Pathname (Specific to requests)
        const uniquePrefix = Date.now();
        // Use a distinct path prefix like 'requests/'
        const blobPathname = `requests/${userId}/${uniquePrefix}-${pathname}`;

        console.log(`[Request Blob Upload] Authorizing path: ${blobPathname} for user: ${userId}`);

        return {
          allowedContentTypes: ALLOWED_REQUEST_UPLOAD_TYPES,
          maximumSizeInBytes: MAX_FILE_SIZE_MB * 1024 * 1024,
          tokenPayload: JSON.stringify({ // Include basic info if needed downstream
            userId: userId,
            originalFilename: pathname
          }),
          pathname: blobPathname,
          addRandomSuffix: false, // We added a timestamp prefix
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        // NO DB save or Pusher trigger needed here for request uploads.
        // This happens later in the createConsultation action.
        console.log('[Request Blob Upload] Completed:', blob.pathname);
        try {
            const payload = JSON.parse(tokenPayload || '{}');
            // Can log if needed: console.log('[Request Blob Upload] Payload:', payload);
        } catch (e) { console.error("[Request Blob Upload] Error parsing payload", e); }
      },
    });

    // Return the successful response from handleUpload
    return NextResponse.json(jsonResponse);

  } catch (error) {
    // Catch errors from onBeforeGenerateToken
    console.error('[Request Blob Upload] Error handling upload:', error);
    const message = (error instanceof Error) ? error.message : 'Interner Serverfehler beim Upload.';
    const status = (error as any)?.message?.includes('Nicht autorisiert') ? 401
                 : (error as any)?.message?.includes('Nur Patienten') ? 403
                 : 500;
    return NextResponse.json(
      { error: `Upload fehlgeschlagen: ${message}` },
      { status: status }
    );
  }
}
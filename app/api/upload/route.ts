// app/api/upload/route.ts
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth'; // Use server-side auth helper

// IMPORTANT: Edge runtime is often recommended for Blob uploads for performance,
// BUT our current auth setup (using PrismaAdapter with JWT strategy) might have
// issues accessing the full session reliably on the Edge.
// Let's START with the Node.js runtime for stability with our auth setup.
// If performance becomes an issue, we might need to explore alternatives
// like passing JWT tokens manually or using a different auth strategy for this route.
// export const runtime = 'edge'; // DO NOT use Edge for now with current auth setup

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const session = await auth(); // Verify user session

    // --- Authorization Check ---
    // Ensure user is logged in (basic check)
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Nicht autorisiert. Bitte anmelden.' },
        { status: 401 }
      );
    }
     // Ensure user is a Patient (only patients should upload during request)
     if (session.user.role !== 'PATIENT') {
          return NextResponse.json(
            { error: 'Nur Patienten dürfen Dateien für Anfragen hochladen.' },
            { status: 403 } // Forbidden
          );
     }
     const userId = session.user.id;
     // --- ---

    // Handle the upload using Vercel Blob's server helper
    const jsonResponse = await handleUpload({
      body,
      request,
      // Important: Restrict where files can be uploaded using onBeforeGenerateToken
      onBeforeGenerateToken: async (pathname /*, clientPayload */) => {
        // Generate a unique pathname for the blob file based on user ID and filename
        // Example: 'user_xyz/requests/timestamp-filename.pdf'
        // This helps ensure users can't overwrite each other's files easily.
        // Using a timestamp or random prefix also prevents overwriting own files.
        const uniquePrefix = Date.now();
        const blobPathname = `user_${userId}/requests/${uniquePrefix}-${pathname}`;

        console.log(`[Blob Upload] Authorizing path: ${blobPathname} for user: ${userId}`);

        // Add additional checks here if needed based on clientPayload or pathname structure

        return {
          allowedContentTypes: ['application/pdf', 'image/jpeg', 'image/png', 'image/gif'],
          tokenPayload: JSON.stringify({
            // Optional: Embed metadata in the token if needed later in onUploadCompleted
            userId: userId,
            originalPathname: pathname,
          }),
          // Generate the final pathname server-side for security
          pathname: blobPathname,
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        // Optional: Server-side actions after successful upload
        // e.g., logging, potentially creating a temporary DB record (though we link it later)
        console.log('[Blob Upload] Blob upload completed:', blob.pathname, blob.url);
        try {
            const payload = JSON.parse(tokenPayload || '{}');
            // console.log('[Blob Upload] Payload:', payload);
             // Example: Log successful upload linked to user
             // await prisma.activityLog.create({ data: { userId: payload.userId, action: 'FILE_UPLOADED', details: blob.url } });
        } catch (e) {
            console.error("[Blob Upload] Error processing token payload on completion:", e);
        }
      },
    });

    // Return the successful response from handleUpload
    return NextResponse.json(jsonResponse);

  } catch (error) {
    console.error('[Blob Upload] Error handling upload:', error);
    // Return a generic server error response
     const message = (error instanceof Error) ? error.message : 'Interner Serverfehler beim Upload.';
    return NextResponse.json(
      { error: `Upload fehlgeschlagen: ${message}` },
      { status: 500 }
    );
  }
}
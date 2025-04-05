// app/api/upload/profile-picture/route.ts
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth'; // Use server-side auth helper

// Allowed image types
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const MAX_FILE_SIZE_MB = 5; // Example: 5MB limit for profile pictures

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const session = await auth(); // Verify user session

    // --- Authorization Check ---
    // Ensure user is logged in
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Nicht autorisiert. Bitte anmelden.' },
        { status: 401 }
      );
    }
    const userId = session.user.id;
     // --- ---

    // Handle the upload using Vercel Blob's server helper
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname /*, clientPayload */) => {
        // Generate a unique pathname for the profile picture
        const uniquePrefix = Date.now();
        const blobPathname = `profile-pictures/${userId}/${uniquePrefix}-${pathname}`;

        console.log(`[Blob Profile Pic Upload] Authorizing path: ${blobPathname} for user: ${userId}`);

        return {
          allowedContentTypes: ALLOWED_IMAGE_TYPES,
          maximumSizeInBytes: MAX_FILE_SIZE_MB * 1024 * 1024,
          tokenPayload: JSON.stringify({ userId: userId }),
          pathname: blobPathname, // Use the server-generated path
          // Add cache control headers for profile pictures if desired
          // addRandomSuffix: false, // Set pathname directly
          // cacheControlMaxAge: 31536000, // e.g., 1 year
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        // Optional: Server-side actions after successful upload (e.g., logging)
        // The actual User.image update happens via a separate server action triggered by the profile form save
        console.log('[Blob Profile Pic Upload] Blob upload completed:', blob.pathname, blob.url);
        try {
            const payload = JSON.parse(tokenPayload || '{}');
             // console.log('[Blob Profile Pic Upload] Payload:', payload);
        } catch (e) {
            console.error("[Blob Profile Pic Upload] Error processing token payload:", e);
        }
      },
    });

    // Return the successful response from handleUpload
    return NextResponse.json(jsonResponse);

  } catch (error) {
    console.error('[Blob Profile Pic Upload] Error handling upload:', error);
    const message = (error instanceof Error) ? error.message : 'Interner Serverfehler beim Upload.';
    return NextResponse.json(
      { error: `Upload fehlgeschlagen: ${message}` },
      { status: 500 } // Use 500 for server errors
    );
  }
}
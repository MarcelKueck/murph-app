# Murph - Version 1.0: File Upload Plan (Vercel Blob)

## 1. Goal

Implement file uploading functionality for patients submitting consultation requests, storing the files securely using Vercel Blob and associating them with the consultation record.

## 2. Vercel Blob Setup

*   **Integration:** Add the Vercel Blob integration to the Vercel project.
*   **Store:** A Blob store will be automatically created and linked.
*   **Environment Variable:** Set `BLOB_READ_WRITE_TOKEN` in the Vercel project settings and `.env.local`. **Crucially use the actual token, not the placeholder.**

## 3. Technology

*   **Client-side:** `@vercel/blob/client` package (`upload` function).
*   **Server-side:** `@vercel/blob` package (specifically server-side functions like `handleUpload` if using a dedicated API route, or implicitly via Server Actions).

## 4. Frontend Implementation (`/components/features/FileUpload.tsx`)

*   **UI:**
    *   Use a styled `<input type="file">` element, potentially hidden and triggered by a custom Shadcn `Button` ("Datei auswählen").
    *   Accept specific file types if necessary (e.g., `accept=".pdf,.jpg,.jpeg,.png"`). Add size limits if required.
    *   Display the selected file name.
    *   Show a progress indicator (Shadcn `Progress`) during upload.
    *   Display success or error messages (using Toasts or inline messages).
    *   Provide a way to remove the selected/uploaded file before submitting the main form.
*   **Logic:**
    1.  Use `useRef` to access the file input element.
    2.  On file selection (`onChange` event):
        *   Get the selected `File` object.
        *   Validate file type and size client-side (optional but recommended).
        *   Store the `File` object in component state.
    3.  When the user initiates the upload (e.g., automatically after selection or via a separate button, though likely triggered *before* the main form submission):
        *   Call the `upload` function from `@vercel/blob/client`.
        *   Pass the `File` object and the desired `pathname` (e.g., `consultations/${consultationId}/${file.name}` - ensure unique names or use generated IDs). **Note:** `consultationId` isn't known yet when creating a *new* request. Use a pattern like `requests/${userId}/${timestamp}-${file.name}` initially. The final association happens server-side during consultation creation.
        *   Provide the API endpoint/Server Action path for the upload handler (e.g., `/api/upload`).
        *   Use the `handleUploadUrl` option if using the client-directed upload approach.
        *   Implement `onUploadProgress`, `onUploadComplete`, `onUploadError` callbacks provided by the `upload` function:
            *   `onUploadProgress`: Update the progress bar state.
            *   `onUploadComplete`: Receive the Blob result (containing `url`, `pathname`, etc.). Store this result (specifically `url`, `pathname`, `contentType`, `fileName`) in the parent form's state (`ConsultationRequestForm`). Mark upload as successful.
            *   `onUploadError`: Display an error message using a Toast.

## 5. Backend Implementation (`/app/api/upload/route.ts` or Server Action)

*   **Purpose:** Handle the server-side part of the upload process initiated by `@vercel/blob/client`.
*   **Authentication:** Ensure the user is authenticated (Patient role).
*   **Logic (using Route Handler with `@vercel/blob` helper):**
    ```typescript
    // Example using handleUpload helper
    import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
    import { NextResponse } from 'next/server';
    import { auth } from '@/lib/auth'; // Your auth setup

    export async function POST(request: Request): Promise<NextResponse> {
      const body = (await request.json()) as HandleUploadBody;
      const session = await auth(); // Verify user session

      if (!session?.user?.id) {
        return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
      }

      try {
        const jsonResponse = await handleUpload({
          body,
          request,
          onBeforeGenerateToken: async (pathname /*, clientPayload */) => {
            // Check permissions based on pathname or clientPayload
            // Ensure the user (session.user.id) is allowed to upload to this path.
            // Example: Check if pathname starts with `requests/${session.user.id}/`
            if (!pathname.startsWith(`requests/${session.user.id}/`)) {
               throw new Error('Nicht autorisiert für diesen Pfad.');
            }

            return {
              allowedContentTypes: ['application/pdf', 'image/jpeg', 'image/png', 'image/gif'],
              tokenPayload: JSON.stringify({
                userId: session.user.id, // Optional: Embed metadata
              }),
            };
          },
          onUploadCompleted: async ({ blob, tokenPayload }) => {
            // Optional: Perform actions after upload is complete
            // e.g., logging, database update (though linking happens in consultation creation)
            console.log('Blob upload completed', blob, tokenPayload);
          },
        });

        return NextResponse.json(jsonResponse);
      } catch (error) {
         if (error instanceof Error) {
             return NextResponse.json({ error: error.message }, { status: 400 }); // Or 500 for server issues
         }
         return NextResponse.json({ error: 'Ein unbekannter Fehler ist aufgetreten.' }, { status: 500 });
      }
    }
    ```
*   **Security:** The `onBeforeGenerateToken` callback is crucial for authorization, ensuring users can only upload to paths designated for them (e.g., prefixed with their user ID). Define allowed content types.

## 6. Data Association (`/api/beratungen` POST endpoint)

*   The `ConsultationRequestForm` collects the successful upload results (URL, filename, metadata) from the `FileUpload` component.
*   When the main form is submitted to `/api/beratungen` (POST):
    *   The request body includes an array like `documentUrls: Array<{ fileName: string; storageUrl: string; mimeType: string; fileSize?: number }>`.
    *   The backend logic for creating the `Consultation` iterates through this array.
    *   For each item, it creates a corresponding `Document` record in the database, linking it to the newly created `Consultation` and the `uploaderId` (the patient's ID).

## 7. Document Viewing (Chat Interface)

*   Messages or a dedicated area in the chat (`/app/patient/beratungen/[consultationId]`, `/app/student/beratungen/[consultationId]`) will display links to uploaded documents.
*   The `Document` data (fetched as part of consultation details) provides `fileName` and `storageUrl`.
*   Create links (`<a>`) using the `storageUrl`. Set `target="_blank"` to open in a new tab.
*   Display the `fileName` as the link text.
*   Ensure Vercel Blob permissions allow public read access *or* implement a mechanism to generate temporary signed URLs if stricter access control is needed (more complex, likely out of scope for V1.0 basic viewing). Assume public read for simplicity in V1.0.
*   
## 8 Review 03.04.25:

# Murph - Version 1.0: File Upload Status (Vercel Blob)

## 1. Goal

Implement file uploading for patients during consultation requests, storing files via Vercel Blob.

## 2. Vercel Blob Setup

*   **Integration & Store:** Assumed to be set up in Vercel project.
*   **Environment Variable:** `BLOB_READ_WRITE_TOKEN` is required and configured in `.env.local` (placeholder used, needs actual token for deployment). *(Confirmed Setup)*

## 3. Implementation Status

*   **Technology:**
    *   Client-side: `@vercel/blob/client` (`upload` function) used in `FileUpload.tsx`. *(Confirmed)*
    *   Server-side: `@vercel/blob/client`'s `handleUpload` helper used within `/api/upload/route.ts`. *(Confirmed)*
*   **Frontend (`FileUpload.tsx`, `ConsultationRequestForm.tsx`):**
    *   UI: Input trigger button, progress display (`Progress`), file list for upload/completion status, remove button implemented. *(Confirmed)*
    *   Logic:
        *   File selection and client-side validation (type, size, max count) implemented. *(Confirmed)*
        *   Calls `@vercel/blob/client` `upload` function. *(Confirmed)*
        *   `handleUploadUrl` option points to `/api/upload`. *(Confirmed)*
        *   Callbacks (`onUploadProgress`, `onUploadComplete`, `onUploadError`) used to update UI (progress bar, toasts) and manage state. *(Confirmed)*
        *   Successful upload results (URL, name, type, size, temp ID) stored in `ConsultationRequestForm` state (`uploadedFiles`). *(Confirmed)*
*   **Backend (`/app/api/upload/route.ts`):**
    *   Authentication: Checks for authenticated user session (Patient role required). *(Confirmed)*
    *   Logic: Uses `handleUpload` helper. *(Confirmed)*
    *   Security: `onBeforeGenerateToken` implemented to authorize path based on `userId` (`requests/${userId}/...`), restrict content types, and embed `userId` in token. *(Confirmed)*
    *   `onUploadCompleted` implemented for logging. *(Confirmed)*
    *   Handles errors and returns JSON responses. *(Confirmed)*
*   **Data Association (`actions/consultations.ts` - `createConsultation`):**
    *   The `createConsultation` server action receives the array of successfully uploaded file details (`UploadedDocument[]`). *(Confirmed)*
    *   It iterates this array and creates corresponding `Document` records in the database, linked to the new `Consultation` and the `uploaderId`. *(Confirmed)*
*   **Document Viewing (`DocumentLink.tsx` in `ChatInterface.tsx`):**
    *   Fetches `Document` records as part of consultation details. *(Confirmed)*
    *   `DocumentLink` component renders a link (`<a>`) with `target="_blank"` using the `storageUrl`, displaying the `fileName`. *(Confirmed)*
    *   Relies on public read access for blobs (Vercel default). *(Confirmed)*

## 4. Conclusion

The file upload flow using Vercel Blob is fully implemented from client-side selection and progress display to server-side handling, authorization, database association, and viewing links in the chat. Requires the actual `BLOB_READ_WRITE_TOKEN` for deployment. UI polish for upload states might be beneficial.
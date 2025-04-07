# Murph - File Upload Status (Vercel Blob)

## 1. Goal

Implement file uploading (consultation documents, profile pictures) using Vercel Blob.

## 2. Vercel Blob Setup

*   **Integration & Store:** Assumed set up in Vercel project.
*   **Environment Variable:** `BLOB_READ_WRITE_TOKEN` configured. *(Confirmed Setup)*

## 3. Implementation Status

*   **Technology:**
    *   Client-side: `@vercel/blob/client` (`upload`) used in `FileUpload.tsx` and `ProfilePictureUpload.tsx`. *(Confirmed)*
    *   Server-side: `@vercel/blob/client`'s `handleUpload` helper used in API routes. *(Confirmed)*
*   **Consultation Document Upload:**
    *   Frontend (`FileUpload.tsx`, `ConsultationRequestForm.tsx`): UI for selection, progress, removal implemented. Calls client `upload` pointing to `/api/upload`. Upload results stored in form state. *(Implemented)*
    *   Backend (`/api/upload/route.ts`): Handles upload via `handleUpload`, authorizes based on logged-in Patient role and designated path (`requests/[userId]/...`), restricts content types. *(Implemented)*
    *   Data Association (`actions/consultations.ts`): `createConsultation` action receives file details array and creates `Document` records in DB linked to the consultation. *(Implemented)*
*   **Profile Picture Upload:**
    *   Frontend (`ProfilePictureUpload.tsx`, Profile Forms): UI for selection, preview, removal implemented. Calls client `upload` pointing to `/api/upload/profile-picture`. Passes blob URL back to form on success. *(Implemented)*
    *   Backend (`/api/upload/profile-picture/route.ts`): Handles upload via `handleUpload`, authorizes based on logged-in user, designates path (`profile-pictures/[userId]/...`), restricts to image types/size. *(Implemented)*
    *   Data Association (`actions/profile.ts`): `updateProfile` action receives the new image URL (or null for removal) and updates the `image` field on the `User` record. *(Implemented)*
*   **Document/Image Viewing:**
    *   Consultation Documents: `DocumentLink.tsx` displays links using `storageUrl` (opens in new tab). *(Implemented)*
    *   Profile Pictures: `AvatarImage` component uses `user.image` field (sourced from session/DB) as `src`. *(Implemented)*
    *   Assumes public read access for blobs. *(Confirmed)*

## 4. Next Steps / Refinements

*   **Error Handling:** Enhance user feedback for failed uploads (client/server).
*   **Security:** Review blob access control if stricter permissions than public read are ever needed (e.g., signed URLs - likely V2+).
*   **Image Optimization:** Consider using Next/Image or Vercel Image Optimization for profile pictures if performance becomes an issue (requires blobs to be served from a domain Next.js can optimize).
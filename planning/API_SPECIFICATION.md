# Murph - Version 1.0: API Specification

This document outlines the API endpoints (Route Handlers or Server Actions) required for Murph V1.0. Error handling should return appropriate HTTP status codes (400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 500 Internal Server Error) with a JSON body `{ "error": "German error message" }`. Authorization checks are crucial for all protected endpoints.

---

**Authentication (Handled by NextAuth.js / Auth.js)**

*   **Route:** `/api/auth/[...nextauth]`
*   **Provider:** Credentials (Email/Password)
*   **Logic:** Handles login, logout, session management via the Auth.js library and Prisma Adapter. Includes internal logic for registration if integrated within the Credentials provider or requires a separate registration endpoint.

---

**Registration (If separate from NextAuth handler)**

*   **Route:** `/api/register` (Example, could be different)
*   **Method:** POST
*   **Purpose:** Create a new User (Patient or Student).
*   **Auth:** Public
*   **Request Body:**
    ```typescript
    {
      email: string;
      password: string;
      role: 'PATIENT' | 'STUDENT';
      firstName: string;
      lastName: string;
      // Student specific:
      university?: string;
      clinicalYear?: number;
      // Patient specific:
      dob?: string; // ISO Date string e.g., "YYYY-MM-DD"
    }
    ```
*   **Response (Success - 201 Created):**
    ```typescript
    {
      id: string;
      email: string;
      role: UserRole;
    }
    ```
*   **DB Interactions:** Hash password, Create `User`, Create `PatientProfile` or `StudentProfile`. Ensure email uniqueness.
*   **Error Handling:** 400 (Validation Error, Email exists), 500.

---

**Consultations**

*   **Route:** `/api/beratungen`
*   **Method:** GET
*   **Purpose:** Fetch consultations relevant to the logged-in user.
*   **Auth:** Authenticated (Patient or Student)
*   **Query Params (Optional):** `status` (e.g., 'REQUESTED', 'IN_PROGRESS'), `role` ('PATIENT' | 'STUDENT' - inferred from session)
*   **Response (Success - 200 OK):**
    ```typescript
    {
      consultations: Array<{
        id: string;
        status: ConsultationStatus;
        topic: string;
        createdAt: string; // ISO Date string
        patient?: { firstName: string; lastName: string }; // If user is student
        student?: { firstName: string; lastName: string; university: string }; // If user is patient and assigned
      }>;
    }
    ```
*   **DB Interactions:** Find many `Consultation` based on `userId` (patientId or studentId) and filters. Include related user data selectively.
*   **Error Handling:** 401, 500.

*   **Route:** `/api/beratungen`
*   **Method:** POST
*   **Purpose:** Create a new consultation request (by Patient).
*   **Auth:** Authenticated (Patient Role)
*   **Request Body:**
    ```typescript
    {
      topic: string;
      patientQuestion: string;
      documentUrls?: Array<{ fileName: string; storageUrl: string; mimeType: string; fileSize?: number }>; // Details from Blob upload
    }
    ```
*   **Response (Success - 201 Created):**
    ```typescript
    {
      id: string; // ID of the newly created consultation
      status: ConsultationStatus; // Should be REQUESTED
    }
    ```
*   **DB Interactions:** Create `Consultation` linked to the patient. If `documentUrls` provided, create associated `Document` records.
*   **Error Handling:** 400 (Validation), 401, 403 (Not a Patient), 500.

*   **Route:** `/api/beratungen/[consultationId]`
*   **Method:** GET
*   **Purpose:** Fetch details of a specific consultation.
*   **Auth:** Authenticated (Patient who owns it OR Student assigned to it)
*   **Response (Success - 200 OK):**
    ```typescript
    {
      consultation: {
        id: string;
        status: ConsultationStatus;
        topic: string;
        patientQuestion: string;
        summary?: string;
        createdAt: string; // ISO Date string
        updatedAt: string; // ISO Date string
        patient: { id: string; firstName: string; lastName: string; };
        student?: { id: string; firstName: string; lastName: string; university: string; };
        messages: Array<{
          id: string;
          content: string;
          createdAt: string; // ISO Date string
          sender: { id: string; role: UserRole; firstName: string; lastName: string; };
        }>;
        documents: Array<{
          id: string;
          fileName: string;
          storageUrl: string;
          mimeType: string;
          createdAt: string; // ISO Date string
        }>;
      };
    }
    ```
*   **DB Interactions:** Find unique `Consultation` by ID. Include related `User` (Patient, Student), `Message` (ordered by `createdAt`), `Document`. Check if requester is the patient or assigned student.
*   **Error Handling:** 401, 403 (Not involved), 404 (Not Found), 500.

*   **Route:** `/api/beratungen/[consultationId]`
*   **Method:** PATCH
*   **Purpose:** Update a consultation (Assign student, add summary, change status).
*   **Auth:** Authenticated (Student for assigning/summary, potentially Patient for cancelling - Cancelled status not primary for V1.0 focus).
*   **Request Body (Examples):**
    *   Assign Student: `{ "studentId": string; "status": "IN_PROGRESS" }` (Requires Student role)
    *   Add Summary/Complete: `{ "summary": string; "status": "COMPLETED" }` (Requires assigned Student role)
*   **Response (Success - 200 OK):**
    ```typescript
    {
      id: string;
      status: ConsultationStatus;
      // Include other updated fields as necessary
    }
    ```
*   **DB Interactions:** Find unique `Consultation` by ID. Check authorization based on action and user role/assignment. Update relevant fields (`studentId`, `status`, `summary`).
*   **Error Handling:** 400 (Validation), 401, 403 (Incorrect role/not assigned), 404, 500.

---

**Messages**

*   **Route:** `/api/nachrichten`
*   **Method:** POST
*   **Purpose:** Send a new message in a consultation.
*   **Auth:** Authenticated (Patient who owns the consultation OR Student assigned to it)
*   **Request Body:**
    ```typescript
    {
      consultationId: string;
      content: string;
    }
    ```
*   **Response (Success - 201 Created):**
    ```typescript
    {
      id: string;
      content: string;
      createdAt: string; // ISO Date string
      sender: { id: string; role: UserRole; firstName: string; lastName: string; };
    }
    ```
*   **DB Interactions:** Verify user is part of the `consultationId`. Create `Message` linked to `consultationId` and `senderId`.
*   **Side Effects:** Trigger Pusher event (`new-message` on `private-consultation-${consultationId}`) with message data.
*   **Error Handling:** 400 (Validation), 401, 403 (Not part of consultation), 404 (Consultation not found), 500.

---

**File Upload**

*   **Route:** `/api/upload`
*   **Method:** POST
*   **Purpose:** Handle file uploads via Vercel Blob. This might be handled directly by `@vercel/blob/client`'s `upload` function calling a server action, or via this explicit endpoint which uses server-side blob functions. Plan assumes an explicit endpoint for clarity initially.
*   **Auth:** Authenticated (Patient role, potentially configurable).
*   **Request Body:** Typically `FormData` containing the file.
*   **Response (Success - 200 OK):** (From `@vercel/blob` server functions)
    ```typescript
    {
      url: string; // The final storage URL
      pathname: string;
      contentType: string;
      contentDisposition: string;
      // ... other blob metadata
    }
    ```
*   **Logic:** Use `@vercel/blob` server-side `handleUpload` or similar. Requires `BLOB_READ_WRITE_TOKEN`. The returned URL needs to be captured by the client-side form (`ConsultationRequestForm`) and included in the `/api/beratungen` POST request body's `documentUrls` array.
*   **Error Handling:** Handled by `@vercel/blob` library, potentially returning 400, 401, 500. Ensure appropriate client-side feedback.

---

**Pusher Authentication**

*   **Route:** `/api/pusher/auth`
*   **Method:** POST
*   **Purpose:** Authenticate private channel subscriptions for Pusher.
*   **Auth:** Authenticated
*   **Request Body:** `socket_id`, `channel_name` (e.g., `private-consultation-${consultationId}`)
*   **Response (Success - 200 OK):** Pusher auth signature.
*   **Logic:**
    1.  Verify user session exists.
    2.  Parse `consultationId` from `channel_name`.
    3.  Check if the authenticated user is either the patient owner or the assigned student for that `consultationId` in the database.
    4.  If authorized, use Pusher server library (`pusher.authorizeChannel`) to generate and return the signature.
*   **Error Handling:** 401 (No session), 403 (User not authorized for this channel), 500.

---

**Profile**

*   **Route:** `/api/profil`
*   **Method:** GET
*   **Purpose:** Fetch the profile data for the currently logged-in user.
*   **Auth:** Authenticated
*   **Response (Success - 200 OK):**
    ```typescript
    // Based on user role
    // Patient:
    {
      id: string;
      email: string;
      role: 'PATIENT';
      profile: {
        firstName: string;
        lastName: string;
        dob?: string; // ISO Date string or null
      };
    }
    // Student:
    {
      id: string;
      email: string;
      role: 'STUDENT';
      profile: {
        firstName: string;
        lastName: string;
        university: string;
        clinicalYear: number;
        isVerified: boolean;
      };
    }
    ```
*   **DB Interactions:** Find `User` based on session. Include related `PatientProfile` or `StudentProfile`.
*   **Error Handling:** 401, 500.
*   

## Review 03.04.25:

# Murph - Version 1.0: API Specification Status

This document reflects the implemented API endpoints and Server Actions based on code review.

## Implemented Endpoints & Actions

**Authentication (NextAuth.js)**

*   **Route:** `/api/auth/[...nextauth]/route.ts`
*   **Handler:** `handlers` from `@/lib/auth`
*   **Provider:** Credentials (Email/Password) implemented in `auth.config.ts` (`authorize` function performs DB lookup and password check).
*   **Strategy:** JWT strategy with Prisma Adapter (configured in `lib/auth.ts`).
*   **Callbacks:** `jwt` and `session` callbacks implemented in `lib/auth.ts` to add `id` and `role` to token/session. `authorized` callback in `auth.config.ts` handles basic route protection logic.

**Registration (Server Action)**

*   **Action:** `registerUser` in `actions/auth.ts`
*   **Triggered by:** `AuthForm` component.
*   **Auth:** Public
*   **Input:** `values: z.infer<typeof RegisterSchema>`
*   **Output:** `Promise<RegistrationResult>` (`{ success: boolean; message: string; fieldErrors?: ... }`)
*   **Logic:** Validates input with Zod, checks for existing email, hashes password (`bcrypt`), creates `User` and corresponding `PatientProfile` or `StudentProfile` within a transaction.
*   **Error Handling:** Returns `success: false` with messages for validation errors, existing email, or generic DB errors.

**Consultations (Server Actions)**

*   **Action:** `createConsultation` in `actions/consultations.ts`
    *   **Triggered by:** `ConsultationRequestForm` component.
    *   **Auth:** Patient Role (checked via `auth()` helper).
    *   **Input:** `values: z.infer<typeof ConsultationRequestSchema>`, `documents: UploadedDocument[]`
    *   **Output:** `Promise<ConsultationActionResult>`
    *   **Logic:** Validates input, creates `Consultation` (status `REQUESTED`), creates associated `Document` records based on input array. Calls `revalidatePath('/patient/dashboard')`.
    *   **Error Handling:** Returns `success: false` for validation, auth, or DB errors.

*   **Action:** `acceptConsultation` in `actions/consultations.ts`
    *   **Triggered by:** `ConsultationCard` component (Student Dashboard).
    *   **Auth:** Student Role (checked via `auth()` helper).
    *   **Input:** `consultationId: string`
    *   **Output:** `Promise<{ success: boolean; message: string; error?: any }>` (Simplified return type used currently)
    *   **Logic:** Validates `consultationId`, finds consultation, checks status is `REQUESTED`, updates `studentId` and sets status to `IN_PROGRESS` within a transaction. Calls `revalidatePath('/student/dashboard')`.
    *   **Error Handling:** Returns `success: false` with specific messages for 'Not Found', 'Not Available', or generic errors.

*   **Action:** `completeConsultation` in `actions/consultations.ts`
    *   **Triggered by:** `ConsultationSummaryForm` component.
    *   **Auth:** Student Role (checked via `auth()` helper, verifies student is assigned).
    *   **Input:** `consultationId: string`, `summary: string`
    *   **Output:** `Promise<ConsultationActionResult>`
    *   **Logic:** Validates `consultationId` and `summary` length. Finds consultation, checks it's assigned to the student and status is `IN_PROGRESS`. Updates `summary` and sets status to `COMPLETED`. Calls `revalidatePath` for student dashboard and consultation detail page.
    *   **Error Handling:** Returns `success: false` for validation, auth, status errors, or DB errors.

**Messages (API Route Handler)**

*   **Route:** `/api/nachrichten/route.ts`
*   **Method:** POST
*   **Auth:** Authenticated (Patient owner or assigned Student, checked via DB lookup).
*   **Request Body:** `{ consultationId: string; content: string }` (Validated with Zod).
*   **Response (Success - 201 Created):** Formatted message object including sender details (firstName, lastName, role).
*   **Logic:** Authenticates user, validates input, verifies user is part of the active (`IN_PROGRESS`) consultation, creates `Message` record in DB.
*   **Side Effects:** Triggers `new-message` event on `private-consultation-${consultationId}` channel via `triggerPusherEvent` helper.
*   **Error Handling:** Returns 400 (Validation, Not Active), 401, 403 (Not part of consultation), 404 (Consultation not found), 500 (DB/Pusher errors).

**File Upload (API Route Handler)**

*   **Route:** `/api/upload/route.ts`
*   **Method:** POST
*   **Auth:** Authenticated (Patient Role).
*   **Logic:** Uses `@vercel/blob/client`'s `handleUpload` server helper. Includes `onBeforeGenerateToken` to authorize uploads based on user ID and path (`requests/${userId}/...`), restrict content types, and embed `userId` in the token payload. `onUploadCompleted` logs success.
*   **Error Handling:** Relies on `handleUpload` and returns appropriate JSON error responses (400, 401, 500).

**Pusher Authentication (API Route Handler)**

*   **Route:** `/api/pusher/auth/route.ts`
*   **Method:** POST
*   **Auth:** Authenticated.
*   **Request Body:** `socket_id`, `channel_name` (form data).
*   **Logic:** Verifies session, extracts `consultationId` from channel name, confirms user is patient or assigned student for that consultation via DB lookup, uses `pusherServer.authorizeChannel` to generate and return signature.
*   **Error Handling:** Returns 401 (No session), 403 (Not authorized for channel), 400 (Invalid channel name), 500.

**Profile (Implicit via Server Components)**

*   No dedicated `/api/profil` endpoint was found. Profile data is fetched directly within Server Components (`/app/patient/profil/page.tsx`, `/app/student/profil/page.tsx`) using `auth()` and `prisma`.

## Remaining/Refinement Needs for V1

*   **Error Handling:** Systematically review all endpoints/actions for comprehensive error handling, ensuring consistent response formats and user-friendly German messages. Test edge cases.
*   **Authorization:** Double-check authorization logic in all endpoints/actions to ensure users can only access/modify data they are permitted to.
*   **Performance:** Consider potential optimizations for database queries if needed, although current load is likely low.
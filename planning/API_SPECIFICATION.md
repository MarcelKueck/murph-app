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
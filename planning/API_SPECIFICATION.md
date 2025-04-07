# Murph - API Specification Status

This document reflects the implemented API endpoints and Server Actions based on code review and recent feature additions.

## Implemented Endpoints & Actions

**Authentication (NextAuth.js)**

*   **Route:** `/api/auth/[...nextauth]/route.ts`
*   **Handler:** `handlers` from `@/lib/auth`
*   **Provider:** Credentials (Email/Password) implemented.
*   **Strategy:** JWT strategy with Prisma Adapter.
*   **Callbacks:** `jwt`, `session`, `authorized` implemented.

**Registration (Server Action)**

*   **Action:** `registerUser` in `actions/auth.ts`
*   **Triggered by:** `AuthForm` component.
*   **Logic:** Handles validation, hashing, DB creation, sends welcome email (simulated).

**Consultations (Server Actions)**

*   **Action:** `createConsultation` in `actions/consultations.ts`
    *   **Logic:** Creates Consultation, links Documents, sends request confirmation email (simulated).
*   **Action:** `acceptConsultation` in `actions/consultations.ts`
    *   **Logic:** Assigns student, updates status, checks verification, sends consultation accepted email (simulated).
*   **Action:** `completeConsultation` in `actions/consultations.ts`
    *   **Logic:** Adds summary, updates status, sends consultation completed email (+ feedback link) (simulated).

**Messages (API Route Handler)**

*   **Route:** `/api/nachrichten/route.ts` (POST)
*   **Logic:** Creates Message, triggers Pusher, sends new message email (simulated) to recipient.

**File Upload (API Route Handlers)**

*   **Route:** `/api/upload/route.ts` (POST)
    *   **Logic:** Handles consultation document uploads via Vercel Blob (`handleUpload`), authorizes based on user/path.
*   **Route:** `/api/upload/profile-picture/route.ts` (POST) (NEW)
    *   **Logic:** Handles profile picture uploads via Vercel Blob (`handleUpload`), authorizes based on user, restricts image types/size.

**Pusher Authentication (API Route Handler)**

*   **Route:** `/api/pusher/auth/route.ts` (POST)
*   **Logic:** Authorizes private channel subscriptions based on consultation participation.

**Profile (Server Action)**

*   **Action:** `updateProfile` in `actions/profile.ts` (NEW)
    *   **Logic:** Updates User `image` URL and role-specific `PatientProfile` or `StudentProfile` data based on validated input. Revalidates profile path. Trigger session update client-side.

**Password Reset (Server Actions)**

*   **Action:** `requestPasswordReset` in `actions/password-reset.ts` (NEW)
    *   **Logic:** Generates/stores hashed token, sends reset link email (simulated).
*   **Action:** `resetPassword` in `actions/password-reset.ts` (NEW)
    *   **Logic:** Validates token, updates password hash, deletes token.

**Feedback (Server Action)**

*   **Action:** `submitFeedback` in `actions/feedback.ts` (NEW)
    *   **Logic:** Validates input, checks ownership/status, saves rating/feedback to Consultation, sends feedback received email to student (simulated).

**Admin (Server Action)**

*   **Action:** `toggleStudentVerification` in `actions/admin.ts` (NEW)
    *   **Logic:** Toggles `isVerified` status on `StudentProfile`, checks admin role, sends verification email (simulated).

**AI Assistance (Server Actions)**

*   **Action:** `getAIJargonExplanation` in `actions/ai.ts` (NEW)
    *   **Logic:** Calls Gemini API (via fetch workaround) to explain a term, checks role.
*   **Action:** `getAIChatSummaryDraft` in `actions/ai.ts` (NEW)
    *   **Logic:** Calls Gemini API (via fetch workaround) to draft summary from chat history, checks role.
*   **Action:** `getAIClaritySafetyCheck` in `actions/ai.ts` (NEW)
    *   **Logic:** Calls Gemini API (via fetch workaround) to check text clarity/safety, requests JSON, parses response, checks role.

## API Needs for Next Phase

*   **Deregistration/Deletion Action:** Server action to handle user data deletion requests (complex due to GDPR/relationships).
*   **Admin API/Actions:** Endpoints/actions for potentially viewing full user profiles or other management tasks.
*   **Search API/Action:** Endpoint/action to handle searching messages/consultations.
*   **Email Service Integration:** Replace email simulation with actual provider calls.
*   **Student Verification Action:** Action(s) to support the automated verification workflow.
*   **Message Edit/Delete Actions:** Actions to handle timed editing/deletion of chat messages.
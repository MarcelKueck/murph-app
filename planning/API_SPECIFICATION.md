# Murph - API Specification Status

This document reflects the implemented API endpoints and Server Actions based on code review and recent feature additions.

## Implemented Endpoints & Actions

**Authentication (NextAuth.js)**
*   Route: `/api/auth/[...nextauth]/route.ts`
*   Logic: Handles login, logout, session management (JWT strategy). Credentials provider implemented.

**Registration (Server Action)**
*   Action: `registerUser` in `actions/auth.ts`
*   Logic: Handles validation, hashing, DB creation, sends welcome email (simulated).

**Consultations (Server Actions)**
*   Action: `createConsultation` in `actions/consultations.ts`
    *   Logic: Creates Consultation, links Documents, sends request confirmation email (simulated). **(To be updated to call AI categorization)**
*   Action: `acceptConsultation` in `actions/consultations.ts`
    *   Logic: Assigns student, updates status, checks verification, sends consultation accepted email (simulated).
*   Action: `completeConsultation` in `actions/consultations.ts`
    *   Logic: Adds summary, updates status, sends consultation completed email (+ feedback link) (simulated).

**Messages (API Route Handler)**
*   Route: `/api/nachrichten/route.ts` (POST)
*   Logic: Creates Message, triggers Pusher, sends new message email (simulated) to recipient.

**File Upload (API Route Handlers)**
*   Route: `/api/upload/route.ts` (POST) - For consultation documents.
*   Route: `/api/upload/profile-picture/route.ts` (POST) - For profile pictures.
*   Logic: Handles uploads via Vercel Blob (`handleUpload`), authorizes, restricts types.

**Pusher Authentication (API Route Handler)**
*   Route: `/api/pusher/auth/route.ts` (POST)
*   Logic: Authorizes private channel subscriptions.

**Profile (Server Action)**
*   Action: `updateProfile` in `actions/profile.ts`
*   Logic: Updates User image URL and profile data. Triggers session update client-side.

**Password Reset (Server Actions)**
*   Action: `requestPasswordReset` in `actions/password-reset.ts`
*   Action: `resetPassword` in `actions/password-reset.ts`
*   Logic: Handles token generation/validation, email (simulated), password update.

**Feedback (Server Action)**
*   Action: `submitFeedback` in `actions/feedback.ts`
*   Logic: Validates, saves feedback to Consultation, sends feedback received email (simulated).

**Admin (Server Action)**
*   Action: `toggleStudentVerification` in `actions/admin.ts`
*   Logic: Toggles `isVerified` status, sends verification email (simulated).

**AI Assistance (Server Actions in `actions/ai.ts`)**
*   Action: `getAIJargonExplanation` (Implemented)
*   Action: `getAIChatSummaryDraft` (Implemented - Base version) **(To be updated for document context)**
*   Action: `getAIClaritySafetyCheck` (Implemented)
*   **Action:** `getAIConsultationCategories` (NEW - To be implemented)
    *   **Logic:** Receives text (topic, question, doc content). Calls AI to get category labels. Returns labels.
*   Action: `getAIDocumentSummary` (Placeholder)

## API Needs for Next Phase

*   **AI Categorization Integration:** Update `createConsultation` to call `getAIConsultationCategories`.
*   **AI Summary Enhancement:** Update `getAIChatSummaryDraft` to handle document text input.
*   **AI Document Summarizer:** Implement `getAIDocumentSummary` action (including text extraction).
*   **Deregistration/Deletion Action:** Server action for user deletion.
*   **Admin Profile View Action:** Action/Endpoint for admins to fetch full user profiles.
*   **Search Action/API:** Endpoint/action for searching consultations/messages.
*   **Email Service Integration:** Replace email simulation calls.
*   **Student Verification Action(s):** Actions for automated verification workflow.
*   **Message Edit/Delete Actions:** Actions for timed message updates/deletions.
*   **Categorized Feedback:** Update `submitFeedback` or create new actions if needed for category storage.
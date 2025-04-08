# Murph - Component Architecture Plan

## 1. Philosophy

*   Leverage Shadcn/ui primitives. *(Confirmed)*
*   Apply custom styles via Tailwind CSS. *(Confirmed)*
*   Organize components logically: `ui`, `core`, `features`, `admin`. *(Confirmed)*
*   Utilize Framer Motion for interactions/animations. *(Partially Implemented)*
*   Prioritize reusability and maintainability. *(Ongoing)*

## 2. Component Breakdown & Status

### `/components/ui` (Shadcn Primitives - Implemented as needed)
*   (List of Shadcn components used)

### `/components/core` (App-wide Components - Implemented)
*   `Footer.tsx`, `Header.tsx`, `Logo.tsx`, `NextAuthProvider.tsx`, `TrustBadge.tsx`, `LoadingSpinner.tsx`, `UserMenuButton.tsx`, `PageTransitionWrapper.tsx`

### `/components/features` (Feature-Specific Components - Implemented)
*   **Authentication:**
    *   `AuthForm.tsx`: Implemented.
    *   (New Components Needed: `ForgotPasswordForm`, `ResetPasswordForm` - currently implemented as pages)
*   **Consultation:**
    *   `ConsultationCard.tsx`: Implemented (displays basic info, status, triggers preview/link, **needs UI for category labels**).
    *   `ConsultationsSection.tsx`: Implemented (handles list display, preview dialog state).
    *   `ConsultationRequestForm.tsx`: Implemented.
    *   `FileUpload.tsx`: Implemented.
    *   `ConsultationPreviewDialog.tsx`: Implemented.
*   **Chat:**
    *   `ChatInterface.tsx`: Implemented.
    *   `MessageList.tsx`: Implemented.
    *   `ChatMessage.tsx`: Implemented.
    *   `MessageInput.tsx`: Implemented (integrates AI Check button).
    *   `DocumentLink.tsx`: Implemented.
*   **Profile:**
    *   `PatientProfileForm.tsx`, `StudentProfileForm.tsx`, `ProfilePictureUpload.tsx`: Implemented.
*   **Feedback:**
    *   (Feedback form inline in `app/feedback/page.tsx`. **Needs Categorized Feedback UI components**).
*   **AI:**
    *   `JargonExplainer.tsx`: Implemented.
    *   `AICheckResultDisplay.tsx`: Implemented.

### `/components/admin` (Admin-Specific Components - Implemented)
*   `AdminUserTable.tsx`, `AdminConsultationTable.tsx` (needs category/feedback columns), `VerifyStudentButton.tsx`.

## 3. State Management
*   Client-Side: Primarily React Hooks, React Hook Form, `useSession`. *(Confirmed)*
*   Global State: Zustand available if needed. *(Status Unchanged)*
*   Server State: Server Components, Server Actions, API Routes. *(Confirmed)*

## 4. Components Still Needed / To Refine

*   **AI:** Component to display AI category labels (e.g., small Badges on cards/details). UI for Document Summarizer (button/display).
*   **Student Dashboard:** Filtering controls (dropdown/checkboxes) for AI categories.
*   **Authentication:** Password visibility toggle component/logic. Components for Forgot/Reset Password forms (if extracting from pages).
*   **Feedback:** UI components for submitting/displaying categorized feedback.
*   **Deregistration:** Confirmation dialog/component.
*   **Admin:** Statistic display components (charts?), Profile View component.
*   **Search:** Search input and results components.
*   **General UI/UX:** Landing page animation, Logo size adjustment, Color/Background enhancements, Card interaction consistency implementation, Disclaimer placement adjustment.
*   **Animation Refinement:** Review/polish existing animations.
*   **Error Display:** Standardize further.
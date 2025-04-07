# Murph - Component Architecture Plan

## 1. Philosophy

*   Leverage Shadcn/ui primitives extensively. *(Confirmed)*
*   Apply custom styles via Tailwind CSS (`cn` utility). *(Confirmed)*
*   Organize components logically: `ui`, `core`, `features`, `admin`. *(Confirmed)*
*   Utilize Framer Motion for meaningful interactions/animations. *(Partially Implemented)*
*   Prioritize reusability and maintainability. *(Ongoing)*

## 2. Component Breakdown & Status

### `/components/ui` (Shadcn Primitives - Implemented as needed)

*   `alert.tsx`, `avatar.tsx`, `badge.tsx`, `button.tsx`, `calendar.tsx`, `card.tsx`, `dialog.tsx`, `dropdown-menu.tsx`, `form.tsx`, `input.tsx`, `label.tsx`, `popover.tsx`, `progress.tsx`, `radio-group.tsx`, `scroll-area.tsx`, `select.tsx`, `skeleton.tsx`, `sonner.tsx`, `table.tsx`, `tabs.tsx`, `textarea.tsx`

### `/components/core` (App-wide Components - Implemented)

*   `Footer.tsx`: Implemented.
*   `Header.tsx`: Implemented (needs logo size adjustment).
*   `Logo.tsx`: Implemented (with draw animation).
*   `NextAuthProvider.tsx`: Implemented.
*   `TrustBadge.tsx`: Implemented.
*   `LoadingSpinner.tsx`: Implemented (available, not widely used yet).
*   `UserMenuButton.tsx`: Implemented (shared between Header and Admin Layout).
*   `PageTransitionWrapper.tsx`: Implemented (basic page fade).

### `/components/features` (Feature-Specific Components - Implemented)

*   **Authentication:**
    *   `AuthForm.tsx`: Implemented (Login/Register, needs password visibility toggle).
*   **Consultation:**
    *   `ConsultationCard.tsx`: Implemented (handles display, preview trigger, needs interaction consistency review).
    *   `ConsultationsSection.tsx`: Implemented (client component, handles list display, animation trigger, preview dialog state).
    *   `ConsultationRequestForm.tsx`: Implemented (includes FileUpload).
    *   `FileUpload.tsx`: Implemented (Vercel Blob client).
    *   `ConsultationPreviewDialog.tsx`: Implemented (for student request preview).
*   **Chat:**
    *   `ChatInterface.tsx`: Implemented (manages state, Pusher, renders children).
    *   `MessageList.tsx`: Implemented (with AnimatePresence).
    *   `ChatMessage.tsx`: Implemented (with motion, displays avatar).
    *   `MessageInput.tsx`: Implemented (integrates AI Check button).
    *   `DocumentLink.tsx`: Implemented.
*   **Profile:**
    *   `PatientProfileForm.tsx`: Implemented (Client component for editing).
    *   `StudentProfileForm.tsx`: Implemented (Client component for editing).
    *   `ProfilePictureUpload.tsx`: Implemented (Client component, uses Vercel Blob).
*   **Feedback:**
    *   (Feedback form is currently inline in `app/feedback/page.tsx` - Could be extracted to a component).
*   **AI:**
    *   `JargonExplainer.tsx`: Implemented (Client component, calls AI action).
    *   `AICheckResultDisplay.tsx`: Implemented (Client component for displaying AI check results).

### `/components/admin` (Admin-Specific Components - Implemented)

*   `AdminUserTable.tsx`: Implemented (displays users, includes Verify button).
*   `AdminConsultationTable.tsx`: Implemented (displays consultations, links to detail view).
*   `VerifyStudentButton.tsx`: Implemented (Client component, calls admin action).

## 3. State Management

*   **Client-Side:** Primarily React Hooks (`useState`, `useRef`, `useEffect`, `useTransition`). React Hook Form used for forms. `useSession` from NextAuth.js. *(Confirmed)*
*   **Global State:** Zustand planned but not significantly used yet. *(Status Unchanged)*
*   **Server State:** Managed via Server Components fetching data directly (Dashboards, Profile Pages, Detail Pages) or through Server Actions (`actions/*`) and API Route Handlers (`/app/api/*`). Revalidation (`revalidatePath`) used. *(Confirmed)*

## 4. Components Still Needed / To Refine

*   **Animation Refinement:** Review/polish existing animations. Implement remaining planned animations (e.g., Landing Page WOW effect).
*   **Error Display:** Standardize error display beyond toasts.
*   **Feedback Form:** Extract feedback form logic into a reusable component.
*   **Admin:** Statistic components, Profile View component.
*   **Search:** Search input and results components.
*   **Deregistration:** Confirmation dialog/component.
*   **Password Visibility:** Component/logic for input toggle.
*   **Refinement:** Review all components for responsiveness, accessibility, consistency (e.g., card interactions), visual polish (color, backgrounds).
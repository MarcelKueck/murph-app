# Murph - Version 1.0: Component Architecture Plan

## 1. Philosophy

*   Leverage Shadcn/ui primitives extensively for accessibility and base styling.
*   Apply custom styles via Tailwind CSS for unique branding, layout, and visual polish.
*   Organize components logically into `ui` (base/customized Shadcn), `core` (app-wide), and `features` (specific functionality).
*   Utilize Framer Motion for meaningful micro-interactions and animations to enhance the user experience.
*   Prioritize reusability and maintainability.

## 2. Component Breakdown

### `/components/ui` (Examples - Customized Shadcn Components)

*   `Button.tsx`: Customized variants (primary, secondary, destructive, loading state). Potentially add subtle pulse animation via Framer Motion prop.
*   `Card.tsx`: Customized base card styles for dashboards, profiles, etc.
*   `Input.tsx`, `Textarea.tsx`: Standard input fields with consistent styling.
*   `Label.tsx`: Form labels.
*   `Avatar.tsx`: User avatars.
*   `Badge.tsx`: For status indicators (Angefragt, Laufend, Abgeschlossen).
*   `Dialog.tsx`: For modals (e.g., document viewer).
*   `Toast.tsx` (via `useToast` hook): For notifications and error messages.
*   `Skeleton.tsx`: For loading states.
*   `Tooltip.tsx`: For hints or extra information.
*   `Tabs.tsx`: For student dashboard (Offene Anfragen / Meine Beratungen).
*   `Progress.tsx`: For file upload progress.

### `/components/core` (App-wide Components)

*   `Header.tsx`:
    *   Props: `user` (optional: User session data)
    *   Contains: `Logo`, `NavigationLinks` (conditional), `UserMenu` (conditional: Profil, Logout)
    *   Styling: Clean, modern, potentially sticky. Subtle hover effects on links.
*   `Footer.tsx`:
    *   Contains: Copyright, Links (Datenschutz, AGB), Trust Statements ("Medizinische Erklärung, keine Diagnose", Data Security/Confidentiality mentions).
    *   Styling: Simple, clear, reinforces trust.
*   `Logo.tsx`:
    *   Contains: SVG logo, potentially animated slightly on load or specific events.
*   `LoadingSpinner.tsx`:
    *   Contains: Animated SVG or CSS spinner for general loading indication.
*   `TrustBadge.tsx`:
    *   Props: `type` ('security', 'confidentiality')
    *   Contains: Icon (e.g., shield, lock) and brief German text snippet. Used on landing page, forms.
*   `PageWrapper.tsx`: (Optional) A common wrapper for padding/max-width if needed consistently across pages.

### `/components/features` (Feature-Specific Components)

*   **Authentication:**
    *   `AuthForm.tsx`:
        *   Props: `mode` ('login' | 'register'), `onSubmit`, `isLoading`.
        *   Contains: Shadcn Input, Label, Button components. Links for switching mode or "Passwort vergessen?". Includes German labels, placeholders, potential `TrustBadge` elements. Handles form state and validation feedback.
*   **Consultation:**
    *   `ConsultationCard.tsx`:
        *   Props: `consultation` (Consultation data), `userRole` ('PATIENT' | 'STUDENT').
        *   Displays: Topic, Status Badge, Date, Patient Name (for student), Student Name (for patient, if assigned). CTA button ('Details anzeigen', 'Annehmen').
        *   Animation: Apply Framer Motion `motion.div` for fade-in/up animation when appearing in a list (e.g., using `variants`).
    *   `ConsultationList.tsx`:
        *   Props: `consultations`, `userRole`, `isLoading`.
        *   Displays: List of `ConsultationCard` components. Handles loading state (Skeletons) and empty state.
    *   `ConsultationRequestForm.tsx`:
        *   Props: `onSubmit`, `isLoading`, `onUploadStart`, `onUploadProgress`, `onUploadComplete`, `onUploadError`.
        *   Contains: Inputs for Topic, Question, `FileUpload` component. Trust indicators.
    *   `FileUpload.tsx`:
        *   Props: Handlers for upload lifecycle.
        *   Handles: File input, displays progress bar (`Progress`), shows success/error state. Interacts with Vercel Blob client-side upload.
*   **Chat:**
    *   `ChatInterface.tsx`:
        *   Props: `consultationId`, `initialMessages`, `currentUser`, `consultationStatus`.
        *   Contains: `MessageList`, `MessageInput`, potentially `DocumentViewerTrigger`. Manages real-time updates via Pusher hook.
    *   `MessageList.tsx`:
        *   Props: `messages`, `currentUserId`.
        *   Displays: List of `ChatMessage` components, scrolls automatically. Handles different sender styles.
    *   `ChatMessage.tsx`:
        *   Props: `message`, `isOwnMessage`.
        *   Displays: Sender avatar/name (optional), message content, timestamp. Styles differently for own vs other messages. Includes links for documents.
    *   `MessageInput.tsx`:
        *   Props: `onSubmit`, `isLoading`, `disabled`.
        *   Contains: Textarea, Send Button. Handles input state.
    *   `DocumentViewerTrigger.tsx`:
        *   Props: `document` (Document data).
        *   Displays: Link/button to open the document viewer (e.g., in a Dialog or new tab).
    *   `ConsultationSummaryForm.tsx`: (For Student Chat)
        *   Props: `onSubmit`, `isLoading`, `initialSummary` (optional).
        *   Contains: Textarea for summary, Save/Complete Button.

### `/components/animations`

*   `AnimatedListItem.tsx`:
    *   Props: `children`, `index` (optional, for stagger effects), animation `variants` (optional).
    *   A wrapper using `motion.div` to apply common list item entrance animations (fade-in, slide-up).

## 3. State Management

*   **Zustand:** Preferred for global client-side state:
    *   Current user session data (beyond NextAuth's `useSession`).
    *   Potentially Pusher connection status or shared UI state.
*   **React Context / Hooks:** For localized state within feature areas (e.g., chat state within `ChatInterface`, form state within `AuthForm`).
*   **Server State:** Managed primarily via data fetching hooks (e.g., React Query or SWR, though simple `fetch` + `useState`/`useEffect` might suffice for V1.0 if complexity is low) interacting with API routes/server actions. NextAuth.js `useSession` for auth state.

## 4. Animation Strategy

*   **Framer Motion:** For layout animations (dashboard card reordering if applicable), page transitions (optional, subtle fade), list item entrance (fade-in/up), button pulse effects, SVG animations.
*   **Tailwind CSS:** For simple transitions (hover effects, color changes) and potentially basic CSS keyframe animations if suitable.
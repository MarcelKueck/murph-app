# Murph - Version 1.0: Error Handling Strategy

## 1. Goal

Implement robust and user-friendly error handling for both server-side operations and client-side interactions, providing clear German feedback to the user.

## 2. Server-Side Error Handling (API Routes / Server Actions)

*   **General Approach:** Use `try...catch` blocks within API route handlers and Server Actions to gracefully handle expected and unexpected errors.
*   **Prisma Errors:** Catch specific Prisma errors (e.g., `PrismaClientKnownRequestError` for unique constraint violations like duplicate emails, `PrismaClientValidationError` for invalid data). Map these to appropriate HTTP status codes and user-friendly messages.
*   **Validation Errors:** If using Zod or manual validation, catch validation failures early and return a 400 Bad Request status with details about the invalid fields.
*   **Authorization Errors:** Explicitly check user roles and permissions. If a user attempts an unauthorized action, return 401 Unauthorized (if not logged in) or 403 Forbidden (if logged in but lacks permissions).
*   **Not Found Errors:** When fetching specific resources (e.g., `/api/beratungen/[consultationId]`), return 404 Not Found if the resource doesn't exist or the user doesn't have access (can sometimes be preferable to 403 for security).
*   **Generic Errors:** Catch any other unexpected errors (e.g., database connection issues, Pusher API errors, unexpected exceptions) and return a generic 500 Internal Server Error. Log these errors server-side for debugging.
*   **Response Format:** Standardize error responses to include a JSON body, e.g.:
    ```json
    { "error": "Klar verständliche deutsche Fehlermeldung." }
    // Optional: Include field-specific errors for 400 responses
    { "error": "Validierungsfehler.", "fieldErrors": { "email": "Ungültiges Format." } }
    ```

## 3. Client-Side Error Handling

*   **UI Feedback:** Use Shadcn `Toast` components (via the `useToast` hook) to display non-intrusive error messages to the user.
*   **Toast Usage:**
    *   **Variant:** Use the `destructive` variant for error toasts.
    *   **Content:** Display the German error message received from the API response (`error` field). Provide a generic fallback message if the API response is malformed or the error occurs purely client-side (e.g., "Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es erneut.").
    *   **Titles:** Use clear German titles like "Fehler", "Fehler bei der Anmeldung", "Fehler beim Senden".
*   **Specific Scenarios:**
    *   **Login/Registration:** Display "Ungültige E-Mail oder Passwort." or "E-Mail bereits registriert." via Toast on failed attempts.
    *   **Form Submissions (Consultation Request, Message Send, Summary Save):** Catch errors from API calls (`fetch` or Server Action execution). Show specific error messages from the response (e.g., "Fehler beim Speichern der Zusammenfassung.") or generic ones ("Anfrage konnte nicht gesendet werden.") using Toasts. Disable submit buttons and show loading states during requests. Re-enable on error.
    *   **Data Fetching (Dashboards, Consultation Details):** Handle errors during data fetching. Display an error message within the component's area (e.g., "Beratungen konnten nicht geladen werden.") instead of rendering the data. A retry button might be useful.
    *   **File Uploads:** Use the `onUploadError` callback from `@vercel/blob/client` `upload` function. Display the error message (e.g., "Datei konnte nicht hochgeladen werden: Dateityp nicht erlaubt.") using a Toast. Reset the file input/progress state.
    *   **Pusher Connection:** While direct connection errors might be harder to catch gracefully for the user, ensure the application degrades reasonably if real-time updates fail (e.g., user might need to refresh manually). Log potential connection issues to the console for debugging.

## 4. Implementation Details

*   Create helper functions or hooks to simplify API calls and centralize error handling logic (e.g., a custom `fetch` wrapper that automatically parses JSON, checks status codes, and extracts error messages).
*   Ensure loading states (`isLoading`) are properly managed alongside error states to provide clear UI feedback during asynchronous operations.
*   

## 5. Review 03.04.25:

# Murph - Version 1.0: Error Handling Strategy Status

## 1. Goal

Implement robust and user-friendly error handling using server-side checks and client-side Toasts with clear German feedback.

## 2. Implementation Status

*   **Server-Side (API Routes / Server Actions):**
    *   `try...catch` blocks are used in implemented actions (`actions/*.ts`) and route handlers (`/app/api/**/*.ts`). *(Confirmed)*
    *   **Validation Errors:** Zod validation is used in `registerUser`, `createConsultation`, `/api/nachrichten`, `completeConsultation`. Errors are caught and returned with `success: false` and sometimes `fieldErrors`. *(Confirmed)*
    *   **Authorization Errors:** Basic role/ownership checks using `auth()` helper and DB lookups are implemented in actions and route handlers. Return `success: false` or 401/403 status codes. *(Confirmed)*
    *   **Not Found Errors:** Handled in specific cases (e.g., `acceptConsultation`, `completeConsultation` if consultation doesn't exist or isn't assignable). *(Confirmed)*
    *   **Generic Errors:** Generic `catch` blocks exist, returning 500 or `success: false` with generic messages. Server-side logging (`console.error`) is present. *(Confirmed)*
    *   **Response Format:** Actions generally return `{ success: boolean; message: string; ... }`. API routes return `NextResponse.json({ error: string }, { status: number })`. *(Confirmed, slight inconsistency between actions/routes)*
*   **Client-Side:**
    *   **UI Feedback:** `sonner` (Toasts) is implemented (`app/layout.tsx`, `AuthForm`, `ConsultationRequestForm`, `ConsultationCard`, `MessageInput`, `ConsultationSummaryForm`). *(Confirmed)*
    *   **Toast Usage:**
        *   `destructive` variant used for errors (`toast.error`). *(Confirmed)*
        *   Displays messages from server action/API responses. *(Confirmed)*
        *   Includes German titles/descriptions. *(Confirmed)*
    *   **Specific Scenarios:**
        *   Login/Registration failures show toasts. *(Confirmed)*
        *   Form submission errors (Consultation Request, Message Send, Summary Save, Accept Consultation) trigger toasts based on API/action response. *(Confirmed)*
        *   File Upload errors trigger toasts via `onUploadError` callback. *(Confirmed)*
        *   Data Fetching errors (e.g., `ConsultationList`) display an `Alert` component within the UI. *(Confirmed)*
    *   **Loading States:** `useTransition` is used to manage pending states and disable buttons during form submissions/actions. *(Confirmed)*

## 3. Conclusion & Refinement Needs for V1

The basic error handling mechanism using `try...catch`, server/action responses, and client-side toasts is implemented for key flows.
*   **Comprehensiveness:** A systematic review is needed to ensure *all* potential error points (API calls, actions, edge cases in logic) have appropriate handling.
*   **Specificity:** Improve the specificity of error messages returned from the server where possible (e.g., distinguishing different database errors or authorization failures beyond a generic message).
*   **Consistency:** Ensure consistent error response formats from both API Routes and Server Actions. Standardize German error message phrasing.
*   **User Experience:** Review toast messages for clarity and helpfulness. Consider if certain errors warrant more persistent inline feedback instead of just a transient toast.
*   **Logging:** Enhance server-side logging for better debugging (include more context with errors).
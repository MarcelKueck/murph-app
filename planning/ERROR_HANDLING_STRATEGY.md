# Murph - Error Handling Strategy Status

## 1. Goal

Implement robust and user-friendly error handling using server-side checks and client-side feedback (Toasts, inline messages) with clear German messages.

## 2. Implementation Status

*   **Server-Side (API Routes / Server Actions):**
    *   `try...catch` blocks used in actions and route handlers. *(Confirmed)*
    *   **Validation Errors:** Zod validation used; errors returned with `success: false` / `fieldErrors` or 400 status. *(Confirmed)*
    *   **Authorization Errors:** Role/ownership checks implemented using `auth()` and DB lookups. Return `success: false` or 401/403 status codes. *(Confirmed)*
    *   **Not Found Errors:** Handled in specific cases. *(Confirmed)*
    *   **Prisma Errors:** Basic handling via general `catch` blocks. *(Partially Implemented - Needs specific Prisma error code handling)*
    *   **AI API Errors:** Basic handling for common errors (API Key, Safety) implemented in AI actions. *(Implemented)*
    *   **Generic Errors:** General `catch` blocks return 500 or `success: false`. Server-side `console.error` used. *(Confirmed)*
    *   **Response Format:** Actions return `{ success: boolean; message: string; ... }`. API routes return `NextResponse.json({ error: string }, { status: number })`. *(Confirmed)*
*   **Client-Side:**
    *   **UI Feedback:** `sonner` (Toasts) implemented and used for feedback on actions/API calls. *(Confirmed)*
    *   **Toast Usage:** `destructive` variant used for errors; messages generally sourced from server response. *(Confirmed)*
    *   **Specific Scenarios:** Login/Registration, Form Submissions, File Uploads, AI Actions trigger toasts on error. *(Confirmed)*
    *   **Data Fetching Errors:** `Alert` component used in list views (e.g., Dashboards). *(Confirmed)*
    *   **Loading States:** `useTransition` manages pending states. *(Confirmed)*

## 3. Next Steps / Refinements

*   **Prisma Error Specificity:** Implement catching of specific `PrismaClientKnownRequestError` codes (e.g., `P2002` for unique constraints) to provide more targeted feedback than generic DB errors.
*   **AI Error Granularity:** Refine error handling for AI API calls to potentially distinguish rate limits, content filtering, etc., more clearly to the user or admin.
*   **Client-Side Form Errors:** Ensure `fieldErrors` returned from server actions are properly displayed next to the corresponding form fields.
*   **Consistency:** Standardize error message phrasing (German) and potentially the response structure between Actions and API Routes.
*   **User Experience:** Review if certain errors warrant inline messages or specific UI states instead of just toasts (e.g., persistent API connection issues).
*   **Logging:** Enhance server-side error logging with more context.
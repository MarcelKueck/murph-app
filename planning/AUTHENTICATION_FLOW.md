# Murph - Authentication Flow Status (NextAuth.js v5 / Auth.js)

## 1. Goal

Implement secure Email/Password authentication (Registration, Login, Password Reset) for Patients, Students, and Admins using NextAuth.js.

## 2. Implementation Status

*   **Configuration (`lib/auth.ts`, `auth.config.ts`):**
    *   `CredentialsProvider`: Implemented with `authorize` function using `prisma` and `bcrypt.compare`. Returns user `id`, `email`, `role`, `image`. *(Confirmed)*
    *   `PrismaAdapter`: Configured and used. *(Confirmed)*
    *   **Session Strategy:** `jwt` strategy configured. *(Confirmed)*
    *   `Callbacks`: `jwt` and `session` implemented to inject `id`, `role`, `image` into token/session. `authorized` callback handles route protection logic (basic login check + redirect for logged-in on auth pages). *(Confirmed)*
    *   `Secret`: Relies on `NEXTAUTH_SECRET`. *(Confirmed)*
    *   `Pages`: `signIn: '/login'` configured. *(Confirmed)*
*   **Registration (`AuthForm` + `actions/auth.ts`):**
    *   UI (`AuthForm`): Implemented with conditional fields for Patient/Student. *(Confirmed)*
    *   Server Action (`registerUser`): Implemented. Handles validation, hashing, DB creation, welcome email (simulated). *(Confirmed)*
    *   Redirects to `/login` on success. *(Confirmed)*
*   **Login (`AuthForm` + NextAuth):**
    *   UI (`AuthForm`): Implemented with Email/Password fields. Includes "Passwort vergessen?" link. *(Confirmed)*
    *   Logic: Uses `signIn('credentials', { redirect: false })`. Handles success/error feedback using toasts. Triggers `router.refresh()` on success, relying on middleware for dashboard redirect. *(Confirmed)*
*   **Password Reset:**
    *   UI: `/forgot-password` and `/reset-password` pages implemented. *(Implemented)*
    *   Backend: `PasswordResetToken` model added. `requestPasswordReset` and `resetPassword` actions implemented with token handling and email simulation. *(Implemented)*
*   **Session Management:**
    *   Handled by NextAuth.js (JWT strategy). *(Confirmed)*
    *   `useSession` hook used in client components (Header, Profile Forms). *(Confirmed)*
    *   `auth()` helper used in Server Components/Actions/Route Handlers. *(Confirmed)*
*   **Route Protection (`middleware.ts` + Layouts):**
    *   Middleware (`authorized` callback) checks **login status** for protected routes (`/patient/*`, `/student/*`, `/admin/*`) and redirects unauthenticated users to login. It also redirects **logged-in** users away from auth pages (`/login`, `/registrieren`) to their dashboards. *(Confirmed)*
    *   Specific **role enforcement** is handled within the respective layout files (`patient/layout.tsx`, `student/layout.tsx`, `admin/layout.tsx`) using `auth()`. *(Implemented)*
*   **Logout:**
    *   Implemented in `Header.tsx` / `UserMenuButton.tsx` using `signOut({ callbackUrl: '/' })`. *(Confirmed)*

## 3. Next Steps / Refinements

*   **Password Visibility Toggle:** Implement eye icon in password fields.
*   **Deregistration:** Implement self-service account deletion.
*   **Real Email:** Replace email simulation for password reset.
*   **Error Handling:** Further refine error messages for auth flows.
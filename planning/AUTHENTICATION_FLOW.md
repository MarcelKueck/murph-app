# Murph - Version 1.0: Authentication Flow Plan (NextAuth.js v5 / Auth.js)

## 1. Goal

Implement secure user authentication (Registration and Login) for both Patients and Students using the Email/Password (Credentials) provider with NextAuth.js (v5 / Auth.js).

## 2. Configuration (`/lib/auth.ts` or similar)

*   **Provider:** `CredentialsProvider`
    *   `name`: "Credentials"
    *   `credentials`: Define `email` and `password` fields.
    *   `authorize` function:
        1.  Receive `credentials` (email, password).
        2.  Validate input (basic check for presence).
        3.  Find `User` in the database via `prisma.user.findUnique({ where: { email } })`.
        4.  If user not found or `passwordHash` is null/empty, return `null`.
        5.  Compare provided `password` with stored `passwordHash` using `bcrypt.compare()`.
        6.  If match, return the `user` object (subset of fields needed for session, e.g., `id`, `email`, `role`, `name` - fetch profile for name if needed).
        7.  If no match, return `null`.
*   **Adapter:** `@auth/prisma-adapter` configured with the Prisma client instance (`lib/prisma.ts`).
*   **Session Strategy:** `database` (Store sessions in the `Session` table).
*   **Secret:** `NEXTAUTH_SECRET` from environment variables.
*   **Pages (Optional but recommended):** Define custom pages for `signIn` (`/login`).
*   **Callbacks (Potentially):**
    *   `session`: To potentially add `id`, `role` from the token to the `session.user` object, making it available client-side via `useSession`.
    *   `jwt`: To encode user `id` and `role` into the JWT token when using the `jwt` strategy (though `database` is planned). If using `database` strategy, this is less critical but good practice if JWTs are used internally.

## 3. Registration Process (`/app/(auth)/registrieren/page.tsx` + API)

*   **UI:** Use `AuthForm` component in 'register' mode. Include fields for Email, Password, Confirm Password, First Name, Last Name. Conditional fields for Role selection (Patient/Student) and role-specific details (DOB for Patient, University/Year for Student). Include clear German labels, placeholders, and trust/privacy notes.
*   **API Endpoint/Server Action:** (e.g., `/api/register` or a dedicated Server Action)
    1.  Receive registration data.
    2.  Perform validation (Zod schema recommended): check required fields, email format, password strength, password confirmation match.
    3.  Check if email already exists in the database. Return 400 error if it does.
    4.  Hash the password using `bcrypt.hash()`.
    5.  Create the `User` record in the database.
    6.  Create the corresponding `PatientProfile` or `StudentProfile` record, linking it to the new User. For Students, set `isVerified` to `false` by default (though seeded students are `true`).
    7.  Return success (e.g., 201 Created with user email/id) or error messages.
    8.  Optionally: Automatically log the user in after successful registration using NextAuth.js `signIn` programmatically (consider security implications). For V1.0, redirecting to `/login` after registration is simpler.

## 4. Login Process (`/app/(auth)/login/page.tsx`)

*   **UI:** Use `AuthForm` component in 'login' mode. Fields for Email, Password. Link to `/registrieren`. "Passwort vergessen?" link (UI only for V1.0).
*   **Logic:** The form submission will trigger the NextAuth.js `signIn('credentials', { email, password, redirect: false })` function.
    *   `redirect: false` allows handling the response client-side.
    *   If `signIn` returns successfully (no error), redirect the user to their respective dashboard (`/patient/dashboard` or `/student/dashboard`) based on the role obtained from the session (`useSession` hook or server-side session data).
    *   If `signIn` returns an error (`error` property in the response), display a user-friendly German error message (e.g., "Ungültige E-Mail oder Passwort.") using a Toast.

## 5. Session Management

*   NextAuth.js handles session creation/validation using the database adapter.
*   Client-side access via `useSession` hook from `next-auth/react`.
*   Server-side access (Server Components, API Routes, Server Actions) via `auth()` helper from `/lib/auth.ts`.

## 6. Route Protection (`/middleware.ts`)

*   Use NextAuth.js middleware config (`export { auth as middleware } from "@/lib/auth"`).
*   Configure matcher to protect specific routes: `/patient/:path*`, `/student/:path*`.
*   Unauthenticated users accessing protected routes will be redirected to the login page (`/login`, as configured in NextAuth options).

## 7. Logout

*   Provide a "Logout" ("Abmelden") button in the `UserMenu` (Header component).
*   On click, call NextAuth.js `signOut({ callbackUrl: '/' })` function to clear the session and redirect to the landing page.
*   

## 8. Review 03.04.25:

# Murph - Version 1.0: Authentication Flow Status (NextAuth.js v5 / Auth.js)

## 1. Goal

Implement secure Email/Password authentication for Patients and Students using NextAuth.js.

## 2. Implementation Status

*   **Configuration (`lib/auth.ts`, `auth.config.ts`):**
    *   `CredentialsProvider`: Implemented with `authorize` function using `prisma` and `bcrypt.compare`. Returns user `id`, `email`, `role`. *(Confirmed)*
    *   `PrismaAdapter`: Configured and used. *(Confirmed)*
    *   **Session Strategy:** `jwt` strategy is configured in `lib/auth.ts`. *(Confirmed - Note: Initial plan mentioned `database`, but implementation uses `jwt`)*
    *   `Callbacks`: `jwt` and `session` callbacks are implemented to inject `id` and `role` into the token and session object. `authorized` callback handles basic route protection. *(Confirmed)*
    *   `Secret`: Relies on `NEXTAUTH_SECRET`. *(Confirmed)*
    *   `Pages`: `signIn: '/login'` configured. *(Confirmed)*
*   **Registration (`AuthForm` + `actions/auth.ts`):**
    *   UI (`AuthForm`): Implemented with conditional fields for Patient/Student role selection and corresponding data (DOB, University/Year). *(Confirmed)*
    *   Server Action (`registerUser`): Implemented. Handles validation (Zod), email uniqueness check, password hashing (`bcrypt`), `User` & `Profile` creation in a transaction. *(Confirmed)*
    *   Redirects to `/login` on success. *(Confirmed)*
*   **Login (`AuthForm` + NextAuth):**
    *   UI (`AuthForm`): Implemented with Email/Password fields. *(Confirmed)*
    *   Logic: Uses `signIn('credentials', { redirect: false })`. Handles success/error feedback using toasts. Redirects based on `callbackUrl` (middleware handles target dashboard). *(Confirmed)*
*   **Session Management:**
    *   Handled by NextAuth.js (JWT strategy). *(Confirmed)*
    *   `useSession` hook used in `Header.tsx`. *(Confirmed)*
    *   `auth()` helper used in Server Components/Actions/Route Handlers. *(Confirmed)*
*   **Route Protection (`middleware.ts`):**
    *   Middleware implemented using `NextAuth(authConfig).auth`. *(Confirmed)*
    *   `matcher` config targets `/patient/:path*` and `/student/:path*`, excluding public/API routes. *(Confirmed)*
    *   `authorized` callback in `auth.config.ts` handles redirection logic for authenticated/unauthenticated users on protected/auth pages. *(Confirmed)*
*   **Logout:**
    *   Implemented in `Header.tsx` using `signOut({ callbackUrl: '/' })`. *(Confirmed)*

## 3. Conclusion

The core Email/Password authentication flow using NextAuth.js v5 (Auth.js) is implemented according to the plan (with JWT strategy instead of the initially mentioned database strategy for sessions). It includes registration, login, logout, session management, and route protection. Remaining work is primarily UI polish and potentially refining error message details.
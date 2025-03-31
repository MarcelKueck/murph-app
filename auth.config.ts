// auth.config.ts
import type { NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from './lib/prisma'; // Assuming prisma instance is correctly exported from here
import bcrypt from 'bcryptjs';    // Using bcryptjs
import { UserRole } from '@prisma/client'; // Import UserRole enum

export const authConfig = {
  // Define the custom login page
  pages: {
    signIn: '/login',
    // error: '/auth-error', // Optional: Custom error page
  },

  // Callbacks are functions executed at specific points in the auth flow
  callbacks: {
    /**
     * The 'authorized' callback is used to verify if a request is authorized.
     * It's invoked by the middleware.
     * We simplify this to primarily check login status for protected routes.
     * Role checks are moved to the specific layouts (PatientLayout, StudentLayout).
     */
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user; // Check if user data exists in the session/token
      const userRole = auth?.user?.role as UserRole | undefined; // Get role if available

      // Define route categories
      const isOnPatientArea = nextUrl.pathname.startsWith('/patient');
      const isOnStudentArea = nextUrl.pathname.startsWith('/student');
      const isOnAuthPages = nextUrl.pathname.startsWith('/login') || nextUrl.pathname.startsWith('/registrieren');
      const isOnProtectedArea = isOnPatientArea || isOnStudentArea;

      // --- Rule 1: Handle Protected Areas (/patient/*, /student/*) ---
      if (isOnProtectedArea) {
        if (isLoggedIn) {
          // User is logged in. Allow access for now.
          // The specific layout (PatientLayout/StudentLayout) will perform the role check.
          return true;
        } else {
          // User is NOT logged in. Redirect to the login page.
          // Returning false triggers NextAuth's default redirect to signIn page.
          return false;
        }
      }

      // --- Rule 2: Handle Auth Pages (/login, /registrieren) ---
      else if (isOnAuthPages) {
        if (isLoggedIn) {
          // User IS logged in, but trying to access login/register page.
          // Redirect them to their appropriate dashboard.
          const dashboardUrl = userRole === UserRole.STUDENT ? '/student/dashboard' : '/patient/dashboard';
          // If role isn't immediately available, redirect to landing page as a safe fallback.
          console.log(`Redirecting logged in user ${auth.user?.id} from auth page ${nextUrl.pathname} to ${dashboardUrl || '/'}.`);
          return Response.redirect(new URL(dashboardUrl || '/', nextUrl.origin));
        } else {
          // User is NOT logged in. Allow access to login/register pages.
          return true;
        }
      }

      // --- Rule 3: Allow access to all other pages ---
      // This includes the landing page, API routes, static assets, etc.
      return true;
    },

    // Note: 'jwt' and 'session' callbacks cannot be defined here as they might
    // need Node.js APIs (like DB access via Prisma Adapter). They MUST be
    // defined in the main NextAuth config file (`lib/auth.ts`).
  },

  // Define authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (optional)
      name: "Credentials",
      // `credentials` is used to generate a form on the sign-in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g., domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "E-Mail", type: "email" },
        password: { label: "Passwort", type: "password" }
      },
      // The authorize function is where you validate credentials
      async authorize(credentials) {
        // This function runs in a Node.js environment (part of the /api/auth/... route execution)
        // It has access to Prisma and bcryptjs.

        // Basic validation
        if (!credentials?.email || !credentials.password) {
            console.log("[Authorize] Missing credentials.");
            return null;
        }

        const email = credentials.email as string;
        const password = credentials.password as string;

        try {
          // Find user by email
          const user = await prisma.user.findUnique({
            where: { email: email }
          });

          // Check if user exists and has a password set
          if (!user || !user.passwordHash) {
             console.log(`[Authorize] User not found or no password for email: ${email}`);
             return null;
          }

          // Compare provided password with the stored hash
          const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

          if (!isPasswordValid) {
             console.log(`[Authorize] Invalid password for user: ${email}`);
             return null;
          }

          // If credentials are valid, return the user object containing
          // essential info needed for JWT/session callbacks.
          console.log(`[Authorize] Credentials valid for user: ${email}`);
          return {
            id: user.id,
            email: user.email,
            role: user.role, // Include role here!
            // name: user.firstName, // Add if needed later
            // image: user.image,   // Add if needed later
          };

        } catch (error) {
          console.error('[Authorize] Error during authorization:', error);
          return null; // Return null on error
        }
      }
    })
    // Add other providers like Google, GitHub etc. here if needed later
  ],
  // Providers array must exist, even if empty when only using Credentials defined above
  // providers: [], // This was incorrect, CredentialsProvider goes inside the main providers array.
} satisfies NextAuthConfig;
// auth.config.ts
import type { NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from './lib/prisma';
import bcrypt from 'bcryptjs';
import { UserRole } from '@prisma/client';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const userRole = auth?.user?.role as UserRole | undefined; // Role might be available from basic token info
      const pathname = nextUrl.pathname;

      // console.log(`[Auth Check - Simplified] Path: ${pathname}, LoggedIn: ${isLoggedIn}, Role: ${userRole}`);

      const isOnAuthPage = pathname.startsWith('/login') || pathname.startsWith('/registrieren');
      const isOnPatientArea = pathname.startsWith('/patient');
      const isOnStudentArea = pathname.startsWith('/student');
      const isOnAdminArea = pathname.startsWith('/admin');
      const isOnProtectedArea = isOnPatientArea || isOnStudentArea || isOnAdminArea;

      // --- 1. Handle Auth Pages ---
      if (isOnAuthPage) {
        if (isLoggedIn) {
          // Logged-in user on auth page -> redirect to their dashboard
          let dashboardUrl = '/'; // Fallback
          // We *can* determine dashboard here based on basic role info in token
          if (userRole === UserRole.PATIENT) dashboardUrl = '/patient/dashboard';
          else if (userRole === UserRole.STUDENT) dashboardUrl = '/student/dashboard';
          else if (userRole === UserRole.ADMIN) dashboardUrl = '/admin/dashboard';
          // console.log(`[Auth Check - Simplified] Logged-in user on auth page. Redirecting to: ${dashboardUrl}`);
          return Response.redirect(new URL(dashboardUrl, nextUrl.origin));
        }
        // Not logged in on auth page -> Allow access
        // console.log(`[Auth Check - Simplified] Not logged-in user on auth page. Allowing access.`);
        return true;
      }

      // --- 2. Handle Protected Areas ---
      if (isOnProtectedArea) {
        if (!isLoggedIn) {
          // Not logged in on protected page -> redirect to login
          const loginUrl = new URL('/login', nextUrl.origin);
          loginUrl.searchParams.set('callbackUrl', pathname);
          // console.log(`[Auth Check - Simplified] Not logged-in user on protected page. Redirecting to login: ${loginUrl.toString()}`);
          return Response.redirect(loginUrl);
        }
        // Logged in on protected page -> Allow access (Layout will handle role check)
        // console.log(`[Auth Check - Simplified] Logged-in user on protected page (${pathname}). Allowing access for layout check.`);
        return true;
      }

      // --- 3. Handle other public pages ---
      // console.log(`[Auth Check - Simplified] Public page (${pathname}). Allowing access.`);
      return true; // Allow access to all other pages (like landing page)
    },
    // Note: 'jwt' and 'session' callbacks are defined in `lib/auth.ts`.
  },

  providers: [ // Ensure providers is an array
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "E-Mail", type: "email" },
        password: { label: "Passwort", type: "password" }
      },
      async authorize(credentials) {
        // ... authorize logic remains the same ...
         if (!credentials?.email || !credentials.password) return null;
         const email = credentials.email as string;
         const password = credentials.password as string;
         try {
            const user = await prisma.user.findUnique({ where: { email } });
            if (!user || !user.passwordHash) return null;
            const isValid = await bcrypt.compare(password, user.passwordHash);
            if (!isValid) return null;
            return { id: user.id, email: user.email, role: user.role, image: user.image };
         } catch (e) { console.error(e); return null; }
      }
    })
  ],
} satisfies NextAuthConfig;
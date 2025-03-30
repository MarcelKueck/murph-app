// auth.config.ts
import type { NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from './lib/prisma'; // Import prisma client for authorize check
import bcrypt from 'bcryptjs'; // Use bcryptjs

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  // Define callbacks here IF they are Edge-compatible (don't access DB directly)
  // If callbacks MUST access DB, define them ONLY in lib/auth.ts
  callbacks: {
     // authorized is used by middleware - MUST BE EDGE COMPATIBLE
     authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnPatient = nextUrl.pathname.startsWith('/patient');
      const isOnStudent = nextUrl.pathname.startsWith('/student');

      if (isOnPatient || isOnStudent) {
        if (isLoggedIn) {
            // Optional: Add role check here if needed within middleware logic itself
            // This runs *after* basic login check
            const userRole = auth.user?.role;
            if (isOnPatient && userRole !== 'PATIENT') return Response.redirect(new URL('/student/dashboard', nextUrl)); // Redirect student from patient area
            if (isOnStudent && userRole !== 'STUDENT') return Response.redirect(new URL('/patient/dashboard', nextUrl)); // Redirect patient from student area
            return true; // Allow access if role matches or no role check needed here
        }
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        // Optional: Redirect logged-in users trying to access login/register pages?
         if (nextUrl.pathname.startsWith('/login') || nextUrl.pathname.startsWith('/registrieren')) {
           const dashboardUrl = auth.user?.role === 'STUDENT' ? '/student/dashboard' : '/patient/dashboard';
           return Response.redirect(new URL(dashboardUrl, nextUrl));
         }
      }
      return true; // Allow all other paths (landing, login, register, api, assets)
    },
     // JWT and Session callbacks MUST go in the main lib/auth.ts if using DB adapter/strategy
  },
  providers: [
    // Provider definitions are generally Edge-compatible IF the authorize function is
    CredentialsProvider({
        async authorize(credentials) {
          // IMPORTANT: This authorize function WILL RUN wherever authentication happens
          // (e.g., in the /api/auth/... route, which IS Node.js compatible).
          // It does NOT run in the middleware itself during page loads.
          if (!credentials?.email || !credentials.password) return null;

          const email = credentials.email as string;
          const password = credentials.password as string;

          try {
            const user = await prisma.user.findUnique({ where: { email } });
            if (!user || !user.passwordHash) return null;

            const isValid = await bcrypt.compare(password, user.passwordHash);
            if (!isValid) return null;

            // Return basic user info needed for session/token
            return { id: user.id, email: user.email, role: user.role };
          } catch (e) {
             console.error("Authorize Error:", e);
             return null;
          }
        }
    })
  ], // Add providers array (can be empty for now if only using Credentials)
} satisfies NextAuthConfig;
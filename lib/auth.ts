// lib/auth.ts
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient, UserRole } from '@prisma/client';
import prisma from './prisma';
import { authConfig } from '@/auth.config';
import { JWT } from "next-auth/jwt";
import bcrypt from 'bcryptjs';

// Extend Session type
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: UserRole;
      image?: string | null; // Ensure image is here
    } & Omit<User, 'id' | 'role' | 'emailVerified' | 'passwordHash' | 'image'>;
  }

  // Extend User type recognized by callbacks
  interface User {
    role?: UserRole;
    image?: string | null; // Ensure image is here
  }
}

// Extend JWT type
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: UserRole;
    picture?: string | null; // Use 'picture' standard claim
    // Add other properties if needed
  }
}

export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma as PrismaClient),
  session: { strategy: 'jwt' },

  callbacks: {
    ...authConfig.callbacks,

    async jwt({ token, user, trigger, session }) {
      // console.log(`[Auth JWT Callback] Trigger: ${trigger}`, { token, user, session });

      // Initial sign-in: Assign core data + image
      if (user) {
        token.id = user.id;
        token.role = user.role as UserRole;
        token.picture = user.image; // Assign image from initial user object
      }

      // Handle session update trigger specifically for profile changes
      if (trigger === "update" && session?.user) {
           // console.log("[Auth JWT Callback] Update Trigger - Received session data:", session.user);
           // Only update the picture if it's explicitly passed in the update call
           if (session.user.image !== undefined) {
               // console.log("[Auth JWT Callback] Updating token picture from session update trigger to:", session.user.image);
               token.picture = session.user.image; // Update token picture
           }
           // NOTE: Could potentially update other fields here too if needed during session updates
           // For example: token.name = session.user.name (if name is part of the update)
      }

      // Optional: Add a periodic refresh or check against DB if needed, but often not required
      // if (someConditionToRefresh) {
      //   const dbUser = await prisma.user.findUnique({ where: { id: token.id }, select: { image: true } });
      //   if (dbUser) token.picture = dbUser.image;
      // }

      return token;
    },

    async session({ session, token }) {
       // console.log("[Auth Session Callback] Received token:", token);
       // console.log("[Auth Session Callback] Received session (before update):", session);
      // Always repopulate session from the latest token data
      if (token?.id && session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.image = token.picture; // Ensure session image = token picture
      } else {
        console.warn("[Auth Session Callback] Token or session.user missing required fields.");
      }
       // console.log("[Auth Session Callback] Returning session:", session);
      return session;
    },
  },

  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET,
});
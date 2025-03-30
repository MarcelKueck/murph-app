// lib/auth.ts
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient, UserRole } from '@prisma/client';
import prisma from './prisma'; // Import singleton Prisma Client instance
import { authConfig } from '@/auth.config'; // Import the Edge-compatible config
import { JWT } from "next-auth/jwt"; // Import JWT type
import bcrypt from 'bcryptjs'; // Ensure bcryptjs is used

// Extend the default Session type to include custom fields like id and role
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: UserRole; // Make role mandatory on the session user
      // Include other default fields like name, email, image if needed,
      // but Omit fields we don't expose or are overriding from the base User type
    } & Omit<User, 'id' | 'role' | 'emailVerified' | 'passwordHash'>;
  }

  // Add role to the User object recognized internally by NextAuth
  // This is the object passed to callbacks like 'jwt' on initial sign-in
  interface User {
    role?: UserRole; // Role is optional here as it might not be present initially from 'authorize'
  }
}

// Extend the JWT type to include id and role for type safety
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: UserRole;
    // Add any other properties you want to encode in the JWT, e.g., email: string;
  }
}

// Initialize NextAuth using the base configuration and adding Node.js specific parts
export const {
  handlers, // Export handlers for the API route /api/auth/[...nextauth]
  auth,     // Export auth function for server-side session access (Node.js runtime only!)
  signIn,   // Export signIn function
  signOut,  // Export signOut function
} = NextAuth({
  ...authConfig, // Spread the base, Edge-compatible configuration (pages, providers, authorized callback)

  // Keep Prisma Adapter for user/account management, OAuth linking, etc.
  // Even with JWT strategy, the adapter handles user profile persistence.
  adapter: PrismaAdapter(prisma as PrismaClient),

  session: {
    strategy: 'jwt', // Use JWTs for session management
    // maxAge and updateAge are relevant for the JWT cookie expiry
    maxAge: 30 * 24 * 60 * 60, // JWT validity: 30 days
    updateAge: 24 * 60 * 60,  // Update JWT expiry only once every 24 hours on interaction
  },

  callbacks: {
    // Include any Edge-compatible callbacks defined in authConfig (like 'authorized')
    ...authConfig.callbacks,

    // Define callbacks that REQUIRE Node.js runtime / DB access or relate to JWTs

    // --- JWT Callback ---
    // This is called whenever a JWT is created or updated.
    // We add custom claims (id, role) to the token here.
    async jwt({ token, user, trigger, session }) {
       // The 'user' object is passed only on initial sign-in after 'authorize' succeeds.
      if (user) {
        token.id = user.id;
        // The 'user' object might be minimal, fetch from DB for certainty if needed,
        // but the role *should* be returned from our authorize function now.
        if (user.role) {
             token.role = user.role;
        } else {
             // Fallback: If authorize didn't return role, fetch it
             const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
             if (dbUser) {
                 token.role = dbUser.role;
             } else {
                 console.error(`[Auth JWT Callback] Failed to find user ${user.id} in DB.`);
                 // Handle error appropriately - perhaps throw or assign default/error role
                 // For now, we might end up with a token missing the role if DB lookup fails
             }
        }
        console.log("[Auth JWT Callback] Initial sign in, adding id and role to token:", { id: token.id, role: token.role });
      }

       // Handle session updates if needed (e.g., updating user role in token if it changes)
       // if (trigger === "update" && session?.user) {
       //    token.role = session.user.role; // Example: update role from session data if manually triggered
       // }

      return token; // Return the token with added claims
    },

    // --- Session Callback ---
    // This is called whenever a session is checked (e.g., via useSession, auth()).
    // We transfer claims from the JWT token to the session object.
    async session({ session, token }) {
      // 'token' contains the data we added in the jwt callback.
      // Ensure token and session.user exist before assigning properties.
      if (token?.id && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as UserRole; // Assign role from token
        // Assign other properties from token if needed: session.user.email = token.email;
        // console.log("[Auth Session Callback] Populating session user from token:", { id: session.user.id, role: session.user.role });
      } else {
        console.warn("[Auth Session Callback] Token or session.user missing required fields. Cannot populate session fully.", { tokenIdExists: !!token?.id, sessionUserExists: !!session.user });
      }
      return session; // Return the session object for the client/server component
    },
  },

  // Debug and Secret remain the same
  // Enable debug logs in development for more insight into callbacks and flow
  debug: process.env.NODE_ENV === 'development',
  // Ensure NEXTAUTH_SECRET is set in your .env.local for JWT signing
  secret: process.env.NEXTAUTH_SECRET,
});
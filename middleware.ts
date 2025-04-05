// middleware.ts
import NextAuth from 'next-auth';
import { authConfig } from './auth.config'; // Import the Edge-compatible config

// Use the imported config to initialize NextAuth for middleware.
export default NextAuth(authConfig).auth;

// The config.matcher defines which routes are processed by the middleware.
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api
     * - _next/static
     * - _next/image
     * - favicon.ico
     * - images
     * - svgs
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images|svgs).*)',

    /*
     * Explicitly match protected route groups and auth pages
     */
     '/patient/:path*',
     '/student/:path*',
     '/admin/:path*', // <<< Ensure admin protection is included
     '/login',
     '/registrieren',
  ],
};
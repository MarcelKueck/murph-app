// middleware.ts
import NextAuth from 'next-auth';
import { authConfig } from './auth.config'; // Import the Edge-compatible config

// Use the imported config to initialize NextAuth for middleware.
// The logic for protection and redirection is now primarily handled
// by the `authorized` callback within `authConfig`.
export default NextAuth(authConfig).auth;

// The config.matcher defines which routes are processed by the middleware.
// This remains unchanged.
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - /login (login page)
     * - /registrieren (registration page)
     * - /images (public images)
     * - /svgs (public svgs)
     * - / (root - although it will be matched by the next pattern if not excluded)
     * The negative lookahead `(?!...)` handles exclusions.
     * The `$` at the end prevents matching just `/`.
     */
    '/((?!api|_next/static|_next/image|favicon.ico|login|registrieren|images|svgs).*)',

    /*
     * Explicitly match protected route groups after the general pattern.
     * This ensures they are definitely covered even if the regex above is slightly imperfect
     * or if you want to be very clear about protected areas.
     */
     '/patient/:path*',
     '/student/:path*',
  ],
};
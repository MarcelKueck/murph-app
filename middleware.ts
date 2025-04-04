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
     * - api (API routes - usually handled separately or require different auth checks)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images (public images folder)
     * - svgs (public svgs folder)
     *
     * IMPORTANT: We REMOVE /login and /registrieren from the negative lookahead
     * so the middleware runs on these pages. The `authorized` callback
     * contains the logic to allow/redirect based on auth status.
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images|svgs).*)',

    /*
     * Explicitly including protected routes and auth pages might be redundant
     * with the pattern above now, but serves as clear documentation and ensures
     * these paths are covered if the regex has unintended gaps.
     * It's generally safe to keep them.
     */
     '/patient/:path*',
     '/student/:path*',
     '/login',
     '/registrieren',
  ],
};
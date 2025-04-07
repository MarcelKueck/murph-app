# Murph - Project Planning Overview

## 1. Project Goal

To develop "Murph," a modern Next.js web application connecting German patients with verified medical students for medical explanations (explicitly *not* diagnosis or medical advice). The project aims for a foundational, fully functional application with a visually stunning and trustworthy German-language interface, deployed on Vercel, and incorporating useful admin and AI-assisted features.

## 2. Core Features Scope (As of Last Session)

*   **Authentication:** Email/Password registration, login, logout. Password reset flow (simulated emails). *(Implemented)*
*   **Profiles:** Basic profile viewing. Profile editing (text fields + image upload). *(Implemented)*
*   **Consultation Request:** Patients submit requests with topic, question, and optional document upload (Vercel Blob). *(Implemented)*
*   **Consultation Workflow:**
    *   Students view requests, preview details, accept. *(Implemented)*
    *   Real-time Text Chat via Pusher for ongoing consultations. *(Implemented)*
    *   Students add a summary and mark consultation as complete. *(Implemented)*
*   **Document Handling:** Upload via Vercel Blob, viewing link within chat/details. *(Implemented)*
*   **Feedback:** Patients can submit rating/feedback for completed consultations via email link (simulated). *(Implemented)*
*   **Admin Console (V1):** Secure area with Dashboard (stats), User List (w/ student verification toggle), Consultation List (read-only). *(Implemented - Detail view broken)*
*   **AI Student Assist (V1 - Gemini):** Jargon Explainer, Chat Summary Draft, Clarity & Safety Check features integrated into student workflow. *(Implemented)*
*   **Email Notifications (Simulated):** Emails for Welcome, Password Reset, Request Confirmation, Consultation Accepted, Consultation Completed (+ Feedback Link), New Message, Student Verified. *(Implemented - Simulation Only)*
*   **UI/UX:** Polished, modern German interface using Shadcn/ui, Tailwind CSS. Initial animations implemented (page transitions, list entrances, button interactions, logo draw, form feedback). *(Partially Implemented - Base exists, refinement needed)*

## 3. Technology Stack (Confirmed Usage)

*   **Framework:** Next.js 14+ (App Router)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS
*   **UI Components:** Shadcn/ui
*   **State Management:** Primarily React Hooks (`useState`, `useTransition`). Zustand available if needed.
*   **Database:** Vercel Postgres
*   **ORM:** Prisma
*   **Authentication:** NextAuth.js (v5 / Auth.js) - Credentials Provider, JWT Strategy, Prisma Adapter.
*   **File Storage:** Vercel Blob
*   **Real-time:** Pusher
*   **AI:** Google Gemini API (via `@google/generative-ai` SDK or direct `fetch`).
*   **Animation:** Framer Motion
*   **Deployment:** Vercel (Target)

## 4. Current Status Summary (End of Last Session)

*   **Core Structure & DB:** Project setup complete, Prisma schema defined, migrated, seeded.
*   **Core User Flows:** Registration, Login, Logout, Password Reset (Simulated), Consultation Request/Accept/Chat/Complete, Profile Edit (Text+Image), Feedback Submission flows are functional.
*   **Admin Console:** Basic pages (Dashboard, Users, Consultations) exist and are protected. Student verification works. **Consultation detail view link is broken.**
*   **AI Features:** Jargon Explainer, Summary Draft, Clarity Check implemented using Gemini API (requires `.env.local` key read workaround).
*   **Email:** Simulation via console logs implemented for key events.
*   **UI/UX:** Base UI built. Initial animations added. German language used. Profile pictures functional in chat/profile.
*   **Known Issues/Workarounds:**
    *   AI features rely on reading `GEMINI_API_KEY` directly from `.env.local` instead of `process.env`.
    *   Header avatar update after profile save might have slight delay.
    *   Admin Consultation Detail View navigation broken.

## 5. Next Development Phase Goals (Based on User Request)

1.  **Fixes & Core Features:**
    *   Fix Admin Consultation Detail View.
    *   Implement Self-Service Deregistration/Profile Deletion.
    *   Add Password Visibility Toggle.
    *   Final verification of Post-Login Redirects.
2.  **Real Email Implementation:**
    *   Setup domain (`murph-med.de`) and email provider (e.g., Resend).
    *   Update `lib/email.ts` to send actual emails.
3.  **Student Verification:**
    *   Implement professional/automated verification process.
    *   Allow Admins to view user profiles.
4.  **Chat & Feedback Enhancements:**
    *   Implement Message Edit/Delete (timed).
    *   Implement Categorized Feedback system.
    *   Clarify Summary sharing in Student UI.
5.  **UI/UX Polish & WOW Factor:**
    *   Increase Logo size.
    *   Implement Landing Page 3D Background animation.
    *   Improve color/background usage across app.
    *   Ensure consistent Card Click interaction.
    *   Refine Landing Page Disclaimer placement.
6.  **Admin Console V2:**
    *   Add more Statistic UI Tools.
    *   Display feedback for Admins.
7.  **Platform Features:**
    *   Plan & Implement SEO.
    *   Implement Search functionality.
8.  **General:**
    *   Enhance Trust & Security Communication.
    *   Address remaining TODOs.
    *   Prepare for Vercel Deployment.
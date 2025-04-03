# Murph - Version 1.0: Planning Overview

## 1. Project Goal

To develop the foundational, fully functional Version 1.0 of "Murph," a modern Next.js web application connecting German patients with verified medical students for medical explanations (explicitly *not* diagnosis or medical advice). This version focuses on establishing the core user journeys, a visually stunning and trustworthy German-language interface, and readiness for Vercel deployment.

## 2. Core V1.0 Features

*   **Authentication:** Email/Password registration and login (Patients & Students) via NextAuth.js.
*   **Profiles:** Basic profile viewing (non-editable except potentially patient DOB).
*   **Consultation Request:** Patients can submit a request with topic, question, and optional document upload (Vercel Blob).
*   **Consultation Management (Student):** Students view a queue of requested consultations and can accept one.
*   **Real-time Text Chat:** Core consultation interaction via Pusher for assigned consultations.
*   **Document Handling:** Upload via Vercel Blob, viewing link within chat.
*   **Consultation Completion:** Students can add a summary and mark the consultation as complete.
*   **UI/UX:** Highly polished, modern, dynamic, responsive German interface using Shadcn/ui, Tailwind CSS, Framer Motion. Strong emphasis on visual trust signals regarding data security and confidentiality ("ärztliche Schweigepflicht").

## 3. Technology Stack

*   **Framework:** Next.js 14+ (App Router)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS
*   **UI Components:** Shadcn/ui
*   **State Management:** Zustand (Primary), React Context/Hooks (Secondary)
*   **Database:** Vercel Postgres
*   **ORM:** Prisma
*   **Authentication:** NextAuth.js (v5 / Auth.js) - Credentials Provider
*   **File Storage:** Vercel Blob
*   **Real-time:** Pusher
*   **Animation:** Framer Motion
*   **Deployment:** Vercel

## 4. Key Success Metrics for V1.0

*   Successful implementation of all core user flows.
*   Visually appealing and highly polished UI/UX adhering to design guidelines.
*   Flawless real-time chat functionality.
*   Robust authentication and basic authorization.
*   Effective communication of trust, security, and the platform's purpose (explanation, not diagnosis).
*   Stable deployment setup on Vercel.
*   Codebase quality suitable as a strong foundation for future development.
*   

## 5. Review 03.04.25:

# Murph - Version 1.0: Planning Overview & Current Status

## 1. Project Goal

Develop the foundational, fully functional Version 1.0 of "Murph," a modern Next.js web application connecting German patients with verified medical students for medical explanations (explicitly *not* diagnosis or medical advice). This version focuses on establishing the core user journeys, a visually stunning and trustworthy German-language interface, and readiness for Vercel deployment.

## 2. Core V1.0 Features (Target)

*   **Authentication:** Email/Password registration and login (Patients & Students) via NextAuth.js. *(Implemented)*
*   **Profiles:** Basic profile viewing. *(Implemented)*
*   **Consultation Request:** Patients submit requests with topic, question, and optional document upload (Vercel Blob). *(Implemented)*
*   **Consultation Management (Student):** Students view requested consultations and can accept them. *(Implemented)*
*   **Real-time Text Chat:** Core consultation interaction via Pusher for assigned consultations. *(Implemented - Core Functionality)*
*   **Document Handling:** Upload via Vercel Blob, viewing link within chat. *(Implemented)*
*   **Consultation Completion:** Students add a summary and mark consultation as complete. *(Implemented)*
*   **UI/UX:** Highly polished, modern, dynamic, responsive German interface using Shadcn/ui, Tailwind CSS, Framer Motion. Strong emphasis on visual trust signals. *(Partially Implemented - Core structure exists, needs significant polish)*

## 3. Technology Stack (Confirmed Usage)

*   **Framework:** Next.js 14+ (App Router)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS
*   **UI Components:** Shadcn/ui
*   **State Management:** Primarily React Hooks (`useState`, `useTransition`). Zustand planned but not heavily used yet.
*   **Database:** Vercel Postgres (via Prisma)
*   **ORM:** Prisma
*   **Authentication:** NextAuth.js (v5 / Auth.js) - Credentials Provider, JWT Strategy, Prisma Adapter.
*   **File Storage:** Vercel Blob
*   **Real-time:** Pusher
*   **Animation:** Framer Motion (Basic usage observed, planned for more)
*   **Deployment:** Vercel (Setup prepared)

## 4. Current Status (as of Code Review)

*   **Core Structure:** Next.js project initialized with App Router, TS, Tailwind, Shadcn. Folder structure established.
*   **Database:** Prisma schema defined and migrated. Seeding script implemented and functional.
*   **Authentication:** Registration and Login via Email/Password (NextAuth.js Credentials) are functional. Middleware protects routes. Session management via JWT + Prisma Adapter is set up.
*   **Patient Flow:** Dashboard list, Request form (including file upload), and Chat interface are implemented. Basic profile view exists.
*   **Student Flow:** Dashboard with tabs for requests/ongoing, Accept functionality, Chat interface, Summary form, and Profile view are implemented.
*   **API/Actions:** Endpoints for auth, consultations (CRUD actions), messages, file upload, and Pusher auth are implemented.
*   **Real-time:** Pusher client/server setup is functional, basic real-time messaging in chat works.
*   **File Upload:** Vercel Blob integration is working for uploads during consultation requests.
*   **UI/UX:** Base UI built with Shadcn. Basic layout (Header, Footer) exists. German text is used. Basic trust signals (badges) implemented on the landing page. Responsiveness needs checking.
*   **Animations:** Minimal animations implemented (e.g., ConsultationCard variants).

## 5. Remaining V1.0 Goals / Next Steps

1.  **UI/UX Polish:** Refine styling across all components for a "visually stunning" and premium feel. Ensure perfect responsiveness. Enhance visual hierarchy and clarity.
2.  **Animations:** Implement the full set of planned animations (button pulses, page transitions, list staggering, SVG animations, hover effects) using Framer Motion and Tailwind.
3.  **Trust & Security Communication:** Review and enhance the visual and textual communication of security and confidentiality across the application, especially landing page, registration, and footers. Ensure consistency.
4.  **Error Handling:** Systematically review and implement robust error handling (client-side toasts, server-side checks/logging) for all user flows and API interactions, using clear German messages.
5.  **Chat Refinement:** Polish the chat interface (connection status indicators, error handling for message sending, potentially read receipts if desired later).
6.  **Code Review & Refinement:** Clean up code, ensure consistency, add comments where necessary.
7.  **Testing:** Thorough manual testing of all user flows. (Automated testing setup guidance requested but not implemented yet).
8.  **Vercel Deployment Check:** Final configuration checks for Vercel deployment (environment variables, build command).
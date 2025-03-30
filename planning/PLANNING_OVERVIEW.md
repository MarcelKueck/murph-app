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
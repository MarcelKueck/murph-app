# Murph - Database Seeding Plan (`prisma/seed.ts`) Status

## 1. Objective

Populate the Vercel Postgres database with realistic German demo data to facilitate development, testing, and demonstrations.

## 2. Script Status (`prisma/seed.ts`)

*   **Implemented:** Yes, the `prisma/seed.ts` file exists and functions.
*   **Execution:** Run via `npx prisma db seed`.
*   **Data Clearing:** Includes logic to delete existing data (Users, Profiles, Consultations, Messages, Documents, Auth data, Tokens) before seeding. *(Confirmed)*
*   **Password Hashing:** Uses `bcrypt.hashSync`. *(Confirmed)*
*   **Data Content:**
    *   **Admin User:** Seeds one ADMIN user with credentials from env vars or defaults. *(Implemented)*
    *   **Patients:** Seeds multiple patients with German names, emails, hashed passwords, optional DOBs. *(Confirmed)*
    *   **Students:** Seeds multiple students with German names, emails, hashed passwords, university, clinical year. *(Confirmed)*
    *   **Student Verification:** Seeds a mix of verified (`true`) and unverified (`false`) students. *(Implemented)*
    *   **Consultations:** Creates consultations in different states (REQUESTED, IN_PROGRESS, COMPLETED), including links to seeded patients/students, sample questions, summaries, messages, and documents (with placeholder URLs). *(Confirmed)*
    *   **Feedback:** Currently does *not* seed feedback data (`patientRating`, `patientFeedback`). *(Enhancement Needed)*
    *   **Password Reset Tokens:** Does *not* seed reset tokens (these are transient). *(Confirmed)*

## 3. Refinement Needs

*   **Seed Feedback:** Add logic to seed `patientRating` and `patientFeedback` for some of the `COMPLETED` consultations to allow testing the feedback display features.
*   **Seed Profile Pictures:** Optionally add placeholder `image` URLs to some seeded `User` records for visual testing.
*   **Environment Variables:** Ensure seed script correctly uses `ADMIN_SEED_EMAIL` and `ADMIN_SEED_PASSWORD` from environment variables if set.
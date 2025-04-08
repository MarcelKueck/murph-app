# Murph - Database Seeding Plan (`prisma/seed.ts`) Status

## 1. Objective

Populate the Vercel Postgres database with realistic German demo data to facilitate development, testing, and demonstrations.

## 2. Script Status (`prisma/seed.ts`)

*   **Implemented:** Yes.
*   **Execution:** Run via `npx prisma db seed`.
*   **Data Clearing:** Includes logic to delete existing data before seeding. *(Confirmed)*
*   **Password Hashing:** Uses `bcrypt.hashSync`. *(Confirmed)*
*   **Data Content:**
    *   **Admin User:** Seeds one ADMIN user. *(Implemented)*
    *   **Patients & Students:** Seeds multiple users with profiles. *(Confirmed)*
    *   **Student Verification:** Seeds a mix of verified and unverified students. *(Implemented)*
    *   **Consultations:** Creates consultations in different states (REQUESTED, IN_PROGRESS, COMPLETED) with related data. *(Confirmed)*
    *   **Profile Pictures:** Does *not* currently seed `image` URLs for users. *(Enhancement Needed)*
    *   **Consultation Categories:** Does *not* currently seed AI category labels (`categories` field to be added). *(Enhancement Needed)*
    *   **Feedback:** Does *not* currently seed `patientRating` or `patientFeedback`. *(Enhancement Needed)*
    *   **Password Reset Tokens:** Does *not* seed reset tokens. *(Confirmed)*

## 3. Refinement Needs

*   **Seed Categories:** Once the `categories` field is added to the `Consultation` model, update the seed script to assign plausible category labels (e.g., `["Befundbesprechung"]`, `["Medikamente", "Nebenwirkungen"]`) to some seeded consultations for testing display and filtering.
*   **Seed Feedback:** Add logic to seed `patientRating` and `patientFeedback` for some `COMPLETED` consultations.
*   **Seed Profile Pictures:** Optionally add placeholder `image` URLs to some seeded `User` records.
*   **Environment Variables:** Ensure seed script uses admin credentials from env vars correctly.
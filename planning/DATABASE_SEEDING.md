# Murph - Version 1.0: Database Seeding Plan (`prisma/seed.ts`)

## 1. Objective

Populate the Vercel Postgres database with realistic German demo data to facilitate development, testing, and initial demonstrations of Murph V1.0. The data should reflect the core entities and their relationships as defined in `prisma/schema.prisma`.

## 2. Seeding Script (`prisma/seed.ts`)

The script will use `@prisma/client` and should be executed via `npx prisma db seed`. It needs to handle potential existing data (e.g., clear relevant tables or use `upsert` carefully). Use `bcrypt` or a similar library to hash passwords.

## 3. Data Structure & Content

### Users & Profiles

*   **Patients (3-5 examples):**
    *   **User:**
        *   `email`: Realistic German email patterns (e.g., `anna.mueller@email.de`, `max.schmidt@web.de`).
        *   `passwordHash`: Hashed version of a simple password (e.g., "password123").
        *   `role`: `PATIENT`.
    *   **PatientProfile:**
        *   `firstName`: Common German first names (Anna, Max, Sophie, Leon, Emilia).
        *   `lastName`: Common German last names (Müller, Schmidt, Schneider, Fischer, Weber).
        *   `dob`: Sample Dates of Birth (e.g., `new Date('1985-06-15')`). Some can be `null`.
*   **Students (3-5 examples):**
    *   **User:**
        *   `email`: Realistic German student email patterns (e.g., `lukas.huber@med.uni-muenchen.de`, `julia.bauer@charite.de`).
        *   `passwordHash`: Hashed password.
        *   `role`: `STUDENT`.
    *   **StudentProfile:**
        *   `firstName`: Common German first names (Lukas, Julia, Felix, Laura, Jonas).
        *   `lastName`: Common German last names (Huber, Bauer, Wagner, Becker, Hoffmann).
        *   `university`: Realistic German university names (e.g., "LMU München", "Charité - Universitätsmedizin Berlin", "Universität Heidelberg", "TU München").
        *   `clinicalYear`: Realistic clinical years (e.g., 3, 4, 5).
        *   `isVerified`: **`true`** (Crucial for V1.0 testing).

### Consultations (5-10 examples)

Create consultations covering different states:

*   **REQUESTED (Status: `REQUESTED`):**
    *   `patientId`: Link to one of the seeded Patients.
    *   `studentId`: `null`.
    *   `topic`: Realistic medical topics (in German, e.g., "Frage zu Blutwerten", "Nebenwirkungen Medikament X", "Erklärung MRT-Befund Knie", "Unsicherheit nach Arztbesuch").
    *   `patientQuestion`: Plausible patient questions (in German, e.g., "Meine Leberwerte sind leicht erhöht, was könnte das bedeuten?", "Ich habe seit der Einnahme von Medikament X oft Kopfschmerzen, ist das normal?", "Können Sie mir diesen Befund bitte in einfachen Worten erklären? Was bedeutet 'Chondropathia patellae Grad II'?", "Der Arzt hat etwas von einer 'Differentialdiagnose' erwähnt, was heißt das genau?").
    *   `documents`: Optionally create 1-2 `Document` records linked to some requested consultations.
        *   `uploaderId`: Patient's ID.
        *   `fileName`: e.g., "Blutbild_Scan.pdf", "MRT_Befund.jpg".
        *   `storageUrl`: Use placeholder URLs for seeding (e.g., `https://example.blob.vercel-storage.com/placeholder.pdf`) or skip if Vercel Blob setup is complex for seeding. *Decision: Use placeholders for simplicity in seed.*
        *   `mimeType`: e.g., "application/pdf", "image/jpeg".
*   **IN_PROGRESS (Status: `IN_PROGRESS`):**
    *   `patientId`: Link to a seeded Patient.
    *   `studentId`: Link to one of the seeded *verified* Students.
    *   `topic`/`patientQuestion`: As above.
    *   `messages`: Create 2-4 sample `Message` records for each `IN_PROGRESS` consultation.
        *   `senderId`: Alternate between the linked `patientId` and `studentId`.
        *   `content`: Realistic chat messages (German, e.g., Patient: "Vielen Dank für die schnelle Annahme!", Student: "Gern geschehen. Können Sie mir bitte den genauen Wortlaut des Befundes mitteilen?", Patient: "Ja, hier ist der Teil: ...").
        *   `createdAt`: Ensure messages have slightly different timestamps to maintain order.
*   **COMPLETED (Status: `COMPLETED`):**
    *   `patientId`: Link to a seeded Patient.
    *   `studentId`: Link to one of the seeded *verified* Students.
    *   `topic`/`patientQuestion`: As above.
    *   `summary`: Plausible summary written by the student (German, e.g., "Patientin fragte nach Erklärung eines MRT-Befunds. Chondropathie Grad II erläutert als Knorpelschaden hinter der Kniescheibe. Auf reinen Erklärungscharakter hingewiesen, keine Diagnose oder Therapieempfehlung.").
    *   `messages`: Create several `Message` records showing the conversation history.

## 4. Implementation Notes

*   Use `async/await` for Prisma operations.
*   Wrap the seeding logic in a `main` function and handle potential errors.
*   Ensure `disconnect` is called on the Prisma client at the end.
*   Consider using a library like `faker-js` for more varied German names/data if needed, but manual realistic data is sufficient for V1.0.
*   
## 5. Review 03.04.25:

# Murph - Version 1.0: Database Seeding Status (`prisma/seed.ts`)

## 1. Objective

Populate the Vercel Postgres database with realistic German demo data to facilitate development, testing, and initial demonstrations of Murph V1.0.

## 2. Script Status (`prisma/seed.ts`)

*   **Implemented:** Yes, the `prisma/seed.ts` file exists and contains logic to seed the database.
*   **Execution:** Designed to be run via `npx prisma db seed`.
*   **Data Clearing:** Includes logic to delete existing data (Messages, Documents, Consultations, Profiles, Auth Data, Users) before seeding, ensuring a clean state.
*   **Password Hashing:** Uses `bcrypt.hashSync` (Note: `hash` async is generally preferred but sync is used here) to hash demo passwords.
*   **Data Content:**
    *   **Users & Profiles:** Seeds multiple Patients and Students with German names, emails, and relevant profile data (DOB for patients, University/Year for students).
    *   **Student Verification:** Correctly seeds students with `isVerified: true` as required for V1.0 testing.
    *   **Consultations:** Creates consultations in different states:
        *   `REQUESTED`: Includes examples with and without documents (using placeholder URLs).
        *   `IN_PROGRESS`: Includes assigned student and sample messages.
        *   `COMPLETED`: Includes assigned student, sample messages, and a summary.
    *   **Relationships:** Correctly links profiles, consultations, messages, and documents to users.
    *   **Timestamps:** Uses `Date.now()` offsets to simulate realistic message timing.

## 3. Confirmation

The implemented seeding script appears to correctly fulfill the requirements outlined in the initial V1.0 plan, providing a solid dataset for development and testing. It reflects the Prisma schema accurately.
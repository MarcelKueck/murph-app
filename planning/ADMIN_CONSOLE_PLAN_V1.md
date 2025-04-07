# Murph - Admin Console Plan (V1 Implementation Status)

## 1. V1 Goals

*   Provide administrators with basic oversight and management.
*   Focus on user overview (student verification) and consultation monitoring.
*   Establish a secure admin area.

## 2. V1 Features & Status

*   **Secure Admin Area:** `/admin/*` routes protected by middleware and Admin Layout enforcing `ADMIN` role. *(Implemented)*
*   **Admin Dashboard (`/admin/dashboard`):**
    *   Displays key statistics (Total Users, Patients, Students, Unverified Students, Consultations by status). *(Implemented)*
    *   Includes quick links to filtered user/consultation views. *(Implemented)*
*   **User Management (`/admin/users`):**
    *   Lists all users (or filtered) in `AdminUserTable`. *(Implemented)*
    *   Displays basic user info (Name, Email, Role, Status, Registered Date). *(Implemented)*
    *   **Action:** Toggle `isVerified` status for students via `VerifyStudentButton` calling `toggleStudentVerification` action. *(Implemented)*
*   **Consultation Management (`/admin/consultations`):**
    *   Lists all consultations (or filtered) in `AdminConsultationTable`. *(Implemented)*
    *   Displays key info (Topic, Patient, Student, Status, Rating, Date). *(Implemented)*
    *   **Action:** Link to view consultation details. *(Implemented but link destination broken/needs correction)*
*   **Consultation Detail View (`/admin/consultations/[id]`):**
    *   Page exists but navigation link from table is incorrect. *(Needs Fix)*
    *   Displays full consultation details, messages, documents, summary, and patient feedback. *(Implemented)*
    *   Chat interface is read-only. *(Implemented)*

## 3. Next Steps for Admin

*   **Fix Consultation Detail Link:** Correct the navigation from the admin consultation table.
*   **Implement Admin Profile View:** Allow admins to view full patient/student profile details (potentially via a link from the user table).
*   **Add Statistic UI Tools:** Enhance dashboard with charts or more detailed stats.
*   **Improve Filtering/Sorting:** Add more robust filtering/sorting to tables.
*   **Consider V2 Features:** User deletion/editing, consultation modification (use with extreme caution).
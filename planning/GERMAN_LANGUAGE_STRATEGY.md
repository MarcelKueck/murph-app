# Murph - Version 1.0: German Language Strategy

## 1. Scope

Version 1.0 of Murph will be exclusively in German. There is no requirement for multi-language support (i18n) in this initial version.

## 2. Implementation Approach

*   **Hardcoded Text:** All user-facing strings (UI labels, button text, messages, placeholders, error messages, titles, static content) will be directly hardcoded in German within the respective components and files.
*   **Consistency:** Maintain consistent terminology throughout the application.
*   **Clarity & Professionalism:** Use clear, professional, and patient-friendly German language appropriate for the healthcare context. Avoid overly technical jargon where possible, especially in patient-facing text.

## 3. Key German Terms & Concepts

This list ensures consistency (English equivalent for reference):

*   **Murph:** Murph (Platform Name)
*   **Beratung:** Consultation / Session
*   **Anfrage / Beratung anfordern:** Request / Request Consultation
*   **Erklärung:** Explanation
*   **Diagnose:** Diagnosis (**To be explicitly excluded**)
*   **Ärztliche Schweigepflicht:** Medical Confidentiality / Doctor-Patient Confidentiality (Applied to students)
*   **Datenschutz:** Data Protection / Privacy
*   **Datensicherheit:** Data Security
*   **Patient / Patientin:** Patient (male/female)
*   **Medizinstudent / Medizinstudentin:** Medical Student (male/female)
*   **Registrieren / Registrierung:** Register / Registration
*   **Anmelden / Anmeldung:** Login / Sign in
*   **Abmelden / Abmeldung:** Logout / Sign out
*   **Profil:** Profile
*   **Dashboard / Übersicht:** Dashboard / Overview
*   **Thema:** Topic / Subject
*   **Frage:** Question
*   **Dokument hochladen:** Upload Document
*   **Nachricht senden:** Send Message
*   **Zusammenfassung:** Summary
*   **Abschließen / Beenden:** Complete / Finish
*   **Annehmen:** Accept
*   **Angefragt:** Requested (Status)
*   **Laufend / In Bearbeitung:** In Progress (Status)
*   **Abgeschlossen:** Completed (Status)
*   **Abgebrochen:** Cancelled (Status)
*   **Universität:** University
*   **Klinisches Semester / Studienjahr:** Clinical Semester / Year of Study
*   **Verifiziert:** Verified
*   **Passwort:** Password
*   **Passwort vergessen?:** Forgot Password?
*   **E-Mail:** Email
*   **Vorname:** First Name
*   **Nachname:** Last Name
*   **Geburtsdatum:** Date of Birth (DOB)
*   **AGB (Allgemeine Geschäftsbedingungen):** Terms and Conditions (T&C)
*   **Laden...:** Loading...
*   **Fehler:** Error
*   **Erfolgreich:** Successful

## 4. File Encoding

Ensure all files containing German text (especially special characters like ä, ö, ü, ß) are saved with UTF-8 encoding.

## 5. Future Considerations (Beyond V1.0)

If multi-language support is needed later, the hardcoded strings will need to be extracted into locale files (e.g., JSON) and an i18n library (like `next-intl` or `react-i18next`) will need to be integrated. The current approach prioritizes speed and simplicity for the German-only V1.0.

## 6. Review 03.04.25:

# Murph - Version 1.0: German Language Strategy Status

## 1. Scope & Strategy

Version 1.0 is exclusively in German, implemented via hardcoded strings directly in components and files. No i18n library is used. *(Confirmed)*

## 2. Implementation Status

*   **Hardcoded German:** User-facing text reviewed in key components (`AuthForm`, `Header`, `Footer`, `ConsultationCard`, `ConsultationRequestForm`, `ChatInterface`, page titles, etc.) appears to be predominantly hardcoded in German. *(Confirmed)*
*   **Key Terms:** Common terms like "Beratung", "Anmelden", "Registrieren", "Profil", "Dashboard", "Nachricht", "Dokument", "Abgeschlossen", "Angefragt", etc., are used. *(Confirmed)*
*   **File Encoding:** Assumed to be UTF-8 (standard for Next.js/VS Code).

## 3. Areas for Review / Refinement

*   **Completeness:** A thorough pass is needed across the *entire* application UI (including less common states, error messages, tooltips, aria-labels) to ensure *all* user-visible text is in German and makes sense in context.
*   **Consistency:** Verify that terms like "Beratung", "Anfrage", "Status labels" are used consistently across different sections (Patient dashboard, Student dashboard, Chat view).
*   **Clarity & Tone:** Ensure the language is professional, clear, patient-friendly, and accurately reflects the platform's purpose (explanation, not diagnosis), especially in instructional text and disclaimers. Check `CONSULTATION_STATUS_LABELS` in `lib/constants.ts`.
*   **Error Messages:** Ensure all error messages (from API/Actions and client-side validation) displayed via toasts or inline are in clear, helpful German.

## 4. Conclusion

The strategy of hardcoded German text is implemented. The main UI elements use German. A final, comprehensive review is required to guarantee completeness, consistency, and clarity across all user-facing text for V1.0.
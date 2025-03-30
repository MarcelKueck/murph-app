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
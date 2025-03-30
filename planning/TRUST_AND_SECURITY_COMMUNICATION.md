# Murph - Version 1.0: Trust & Security Communication Plan

## 1. Goal

To proactively build user trust by clearly, consistently, and visually communicating Murph's commitment to data security, user privacy, and the principle of "ärztliche Schweigepflicht" (medical confidentiality) as it applies to participating medical students. This is crucial for user adoption, especially given the sensitive nature of health-related information.

## 2. Core Messages (German)

*   **Purpose Clarity:** "Medizinische Erklärungen, keine Diagnose oder Therapieempfehlung." (Medical explanations, not diagnosis or therapy recommendations.) - This must be prominent and repeated.
*   **Confidentiality:** "Ihre Anfragen werden vertraulich behandelt. Unsere Medizinstudenten unterliegen sinngemäß der ärztlichen Schweigepflicht." (Your requests are treated confidentially. Our medical students adhere to the principles of medical confidentiality.) - Emphasize that this professional standard is applied.
*   **Data Security:** "Ihre Daten sind bei uns sicher. Wir verwenden moderne Verschlüsselung und sichere Speicherung (Vercel)." (Your data is safe with us. We use modern encryption and secure storage (Vercel).) - Mention specific measures concisely.
*   **Verification:** "Alle unsere Medizinstudenten sind sorgfältig ausgewählt und verifiziert." (All our medical students are carefully selected and verified.) - Build trust in the students. (Verification process itself is out of scope for V1.0, but the statement applies to seeded/future verified students).

## 3. Implementation Strategy & Locations

### Landing Page (`/app/(landing)/page.tsx`)

*   **Hero Section:** Immediately state the core purpose ("Medizinische Erklärungen von Medizinstudenten"). Include a concise trust statement below the main headline (e.g., "Vertraulich & Sicher").
*   **"How it Works" Section:** Briefly reiterate confidentiality at the "Request" or "Chat" step.
*   **Dedicated Trust/Security Section:**
    *   Use clear headings: "Ihre Daten sind sicher", "Vertraulichkeit an erster Stelle".
    *   Visually appealing icons/badges (`TrustBadge` component): Shield icon for security, Lock icon for confidentiality.
    *   Explain key measures in simple terms (encryption during transit/rest, secure Vercel infrastructure, application of confidentiality principles to students).
    *   Clearly state the "Erklärung, keine Diagnose" principle again.
*   **Student Verification Mention:** Briefly mention the verification of students.

### Footer (`/components/core/Footer.tsx`)

*   **Persistent Links:** "Datenschutz" (Privacy Policy), "AGB" (Terms).
*   **Recurring Trust Snippets:** Include short versions of key messages like "Medizinische Erklärung, keine Diagnose" and "Vertraulich & Sicher".

### Registration Page (`/app/(auth)/registrieren/page.tsx`)

*   **Form Introduction:** Add a brief sentence reassuring users about data handling (e.g., "Ihre Registrierungsdaten werden sicher und gemäß unserer Datenschutzrichtlinie behandelt.").
*   **Near Sensitive Fields:** Potentially small tooltips or text near password/email fields reinforcing security.
*   **Explicit Consent (Optional but Recommended):** Checkbox for agreeing to AGB and acknowledging the Datenschutzrichtlinie.

### Login Page (`/app/(auth)/login/page.tsx`)

*   Less emphasis needed than registration, but maintain the overall trustworthy design. A small lock icon near the password field can be a subtle reminder.

### Consultation Request Form (`/app/patient/anfrage/page.tsx`)

*   **Form Introduction:** Remind users about the purpose ("Bitte beschreiben Sie Ihre Frage für eine medizinische *Erklärung*.")
*   **Document Upload Section:** Add a specific note: "Hochgeladene Dokumente werden sicher gespeichert und nur für diese Beratung verwendet. Behandeln Sie sensible Daten sorgfältig." (Uploaded documents are stored securely and used only for this consultation. Handle sensitive data with care.) Use a `TrustBadge` component here.

### Chat Interface (`ChatInterface.tsx`, `ChatMessage.tsx`)

*   **Subtle Reinforcement:** The professional and clean design itself builds trust. Avoid unnecessary clutter. Ensure sender identification is clear. Document links should feel secure.

### Visual Design Language

*   **Color Palette:** Use calming blues/greens associated with health and trust.
*   **Typography:** Clean, readable sans-serif fonts.
*   **Iconography:** Use clear, professional icons (e.g., from Lucide Icons via Shadcn/ui) for security (shield, lock), confidentiality, verification (checkmark).
*   **Layout:** Clean, organized, and uncluttered layouts inspire confidence.

### Component: `TrustBadge.tsx`

*   A reusable component displaying an icon (shield, lock, checkmark) and a short German text snippet related to trust aspects. Can be used across different pages/sections.
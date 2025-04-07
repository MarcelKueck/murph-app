# Murph - German Language Strategy Status

## 1. Scope & Strategy

Version 1.0+ is exclusively in German, implemented via hardcoded strings directly in components and files. No i18n library is used. *(Confirmed)*

## 2. Implementation Status

*   **Hardcoded German:** User-facing text reviewed in key components, pages, actions, emails appears to be predominantly hardcoded in German. *(Confirmed)*
*   **Key Terms:** Common terms used generally consistently. *(Confirmed)*
*   **File Encoding:** Assumed UTF-8. *(Confirmed)*

## 3. Areas for Review / Refinement

*   **Completeness:** A thorough pass across the *entire* application UI (including newer features like Admin, Feedback, AI results, error messages, tooltips, aria-labels) is needed to ensure *all* user-visible text is in German and makes sense contextually.
*   **Consistency:** Verify terms (e.g., "Beratung", "Anfrage", statuses, AI feature names/descriptions) are used consistently across all user roles and sections.
*   **Clarity & Tone:** Ensure language remains professional, clear, patient-friendly, and accurate, especially in instructions, disclaimers, and AI-related text.
*   **Error Messages:** Ensure all error messages (API/Actions, client-side) are clear and helpful German.
*   **Email Templates:** Review simulated email content (`lib/email.ts`) for clarity and tone.
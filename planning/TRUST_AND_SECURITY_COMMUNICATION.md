# Murph - Trust & Security Communication Status

## 1. Goal

Proactively build user trust by clearly, consistently, and visually communicating Murph's commitment to data security, user privacy, and confidentiality principles.

## 2. Implementation Status

*   **Core Messages:** Key messages ("Erklärung, keine Diagnose", "Vertraulichkeit", "Datensicherheit") are present. *(Confirmed)*
*   **Landing Page:** Dedicated Trust section with `TrustBadge` components exists. Purpose clarity stated. *(Confirmed)*
*   **Footer:** Includes links (Datenschutz/AGB), trust snippets, and disclaimer text. *(Confirmed)*
*   **Registration Page:** Includes link to AGB/Datenschutz. *(Confirmed)*
*   **Consultation Request Form:** Includes trust icons/text in header and data handling note. *(Confirmed)*
*   **Component:** `TrustBadge.tsx` implemented and used. *(Confirmed)*
*   **AI Features:** Basic disclaimers added near AI feature UI elements. *(Implemented)*

## 3. Refinement Needs / Next Steps

*   **Disclaimer Placement:** Relocate/re-implement the main "explanation, not diagnosis" disclaimer from landing page to appear contextually during consultation request (as requested).
*   **Enhance Consistency:** Ensure trust messages/icons appear consistently where relevant (e.g., Registration page header, FileUpload section).
*   **Strengthen Wording:** Review wording for maximum clarity, especially regarding "Schweigepflicht" application and AI limitations/responsibilities.
*   **Visual Integration:** Integrate trust signals more deeply into the visual design beyond badges/text.
*   **Review Static Pages:** Ensure `/agb` and `/datenschutz` content aligns with promises.
*   **Verification Process:** Clearly communicate the (to-be-implemented) student verification process once defined.
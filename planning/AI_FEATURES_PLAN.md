# Murph - AI Student Assistance Plan (Gemini) Status

## 1. Goal

*   Provide AI-powered tools (Gemini API) to assist students with efficiency and clarity, while maintaining student responsibility and patient safety.

## 2. Guiding Principles

*   Efficiency, Clarity, Control, Contextual, Transparency, Safety/Accuracy, No Medical Advice. *(Established)*

## 3. Implemented Features (using direct fetch + env file read workaround)

*   **(D) Jargon Explainer / Simplifier:**
    *   **Status:** Implemented.
    *   **UI:** Input + Button near chat input (`JargonExplainer` component). Results in Popover.
    *   **Action:** `getAIJargonExplanation` in `actions/ai.ts`.
*   **(B) Chat Summary Draft:**
    *   **Status:** Implemented.
    *   **UI:** Button in `ConsultationSummaryForm`. Populates textarea.
    *   **Action:** `getAIChatSummaryDraft` in `actions/ai.ts`. Requires `chatHistory` prop.
*   **(E) Clarity & Safety Check:**
    *   **Status:** Implemented.
    *   **UI:** Buttons in `MessageInput` and `ConsultationSummaryForm`. Displays structured feedback via `AICheckResultDisplay`.
    *   **Action:** `getAIClaritySafetyCheck` in `actions/ai.ts`. Returns structured JSON.

## 4. Planned / Not Yet Implemented Features

*   **(C) Explanation Draft:**
    *   **Status:** Not Implemented (Removed based on user feedback).
*   **(A) Document Summarizer:**
    *   **Status:** Not Implemented.
    *   **Requires:** PDF text extraction (`pdf-parse`), server action (`getAIDocumentSummary`), UI button/display.

## 5. Known Issues / Technical Debt

*   **API Key Access:** Currently relies on reading `GEMINI_API_KEY` directly from `.env.local` within actions due to issues resolving `process.env.GEMINI_API_KEY` reliably at runtime. Needs further investigation.
*   **SDK vs Fetch:** Currently using direct `fetch` instead of `@google/generative-ai` SDK due to the API key issue. Re-evaluate SDK usage if env var issue is resolved.
*   **Error Handling:** AI action error handling can be made more granular.
*   **Prompt Engineering:** Prompts may require refinement based on real-world testing for optimal results and safety.

## 6. Next Steps for AI

1.  Investigate and fix the root cause of the `process.env` issue.
2.  Revert to using the official `@google/generative-ai` SDK if feasible after fixing env var access.
3.  Implement **(A) Document Summarizer**, including PDF parsing.
4.  Refine prompts and error handling for all implemented features.
5.  Thoroughly test AI feature outputs for accuracy, safety, and usefulness.
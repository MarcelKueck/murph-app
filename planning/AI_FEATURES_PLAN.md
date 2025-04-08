# Murph - AI Student Assistance Plan (Gemini) Status

## 1. Goal

*   Provide AI-powered tools (Gemini API) to assist students with efficiency and clarity, while maintaining student responsibility and patient safety. Also includes AI for request categorization.

## 2. Guiding Principles

*   Efficiency, Clarity, Control, Contextual, Transparency, Safety/Accuracy, No Medical Advice. *(Established)*

## 3. Planned & Implemented AI Features

*   **(D) Jargon Explainer / Simplifier:**
    *   **Status:** Implemented.
    *   **UI:** Input + Button near chat input (`JargonExplainer` component). Results in Popover.
    *   **Action:** `getAIJargonExplanation` in `actions/ai.ts`.
*   **(B) Chat Summary Draft:**
    *   **Status:** Implemented (Base).
    *   **UI:** Button in `ConsultationSummaryForm`. Populates textarea.
    *   **Action:** `getAIChatSummaryDraft` in `actions/ai.ts`. Requires `chatHistory` prop.
    *   **Enhancement Planned:** Modify action to fetch/parse attached document text and include as context in the summary prompt. *(Planned)*
*   **(E) Clarity & Safety Check:**
    *   **Status:** Implemented.
    *   **UI:** Buttons in `MessageInput` and `ConsultationSummaryForm`. Displays structured feedback via `AICheckResultDisplay`.
    *   **Action:** `getAIClaritySafetyCheck` in `actions/ai.ts`. Returns structured JSON.
*   **(NEW) AI Request Categorization:**
    *   **Status:** Planned.
    *   **Function:** Analyze new request (`topic`, `question`, document text) to assign category labels (e.g., "Befundbesprechung", "Medikamente"). Store labels on `Consultation`.
    *   **Benefit:** Helps students/admins quickly understand request type, enables filtering.
    *   **UI:** Display labels as badges on `ConsultationCard` (Student/Admin). Implement filtering UI on Student Dashboard.
    *   **Action:** New action `getAIConsultationCategories` in `actions/ai.ts`. Called within `createConsultation` action.
*   **(A) Document Summarizer:**
    *   **Status:** Planned (Postponed).
    *   **Requires:** PDF text extraction (`pdf-parse`), server action (`getAIDocumentSummary`), UI button/display. *(Dependency: Text extraction needed for Categorization and Summary Enhancement first)*

## 4. Technical Considerations

*   **API Key Access:** Currently uses direct `.env.local` read workaround. Investigate `process.env` issue later. *(Confirmed)*
*   **SDK vs Fetch:** Currently using `fetch`. Re-evaluate SDK if env var issue fixed. *(Confirmed)*
*   **Text Extraction:** PDF text extraction (`pdf-parse` or similar) is now a required dependency for AI Categorization (A) and enhanced Chat Summary (B). Needs implementation in relevant actions. *(Dependency)*
*   **Prompt Engineering:** Requires careful prompts for Categorization, Summary Enhancement, and Clarity Check to ensure desired output format and safety. *(Ongoing)*
*   **Cost & Rate Limiting:** Monitor Gemini API usage. *(Ongoing)*
*   **Data Privacy:** Review data handling for third-party API calls. *(Ongoing)*
*   **Category Definition:** Define a clear, useful, and manageable set of consultation categories.

## 5. Next Implementation Steps (Revised Order)

1.  Implement **AI Request Categorization**: Define categories, update Prisma schema, implement AI action (`getAIConsultationCategories` including basic text extraction), integrate into `createConsultation`, update UI to display labels.
2.  Implement **Student Request Filtering**: Add UI filter controls to Student Dashboard based on AI categories.
3.  Implement **AI Chat Summary Enhancement**: Update `getAIChatSummaryDraft` action to include text extraction from documents as context for the prompt.
4.  Implement **(A) Document Summarizer** (if still desired after other features).
5.  Investigate and fix the root cause of the `process.env` issue.
6.  Revert to using the official `@google/generative-ai` SDK if feasible after fixing env var access.
7.  Refine prompts and error handling for all implemented features.
8.  Thoroughly test AI feature outputs for accuracy, safety, and usefulness.
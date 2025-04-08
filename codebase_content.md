# Codebase Content Dump

Generated on: Tue Apr  8 11:38:33 AM AWST 2025

Exclusion patterns: package-lock.json test_gemini_key.sh public/*
Explicitly included files: .env.local
Binary content extensions skipped: png jpg jpeg gif bmp ico woff woff2 eot otf mp3 mp4 avi mov pdf doc docx xls xlsx ppt pptx zip gz tar rar o a so dll exe

## File Index

*   `.env`
*   `.gitignore`
*   `README.md`
*   `actions/admin.ts`
*   `actions/ai.ts`
*   `actions/auth.ts`
*   `actions/consultations.ts`
*   `actions/feedback.ts`
*   `actions/password-reset.ts`
*   `actions/profile.ts`
*   `app/(auth)/forgot-password/page.tsx`
*   `app/(auth)/login/page.tsx`
*   `app/(auth)/registrieren/page.tsx`
*   `app/(auth)/reset-password/page.tsx`
*   `app/(landing)/page.tsx`
*   `app/admin/AdminConsultationTable.tsx`
*   `app/admin/consultations/[consultationId]/page.tsx`
*   `app/admin/consultations/page.tsx`
*   `app/admin/dashboard/page.tsx`
*   `app/admin/layout.tsx`
*   `app/admin/users/page.tsx`
*   `app/agb/page.tsx`
*   `app/api/auth/[...nextauth]/route.ts`
*   `app/api/nachrichten/route.ts`
*   `app/api/pusher/auth/route.ts`
*   `app/api/upload/profile-picture/route.ts`
*   `app/api/upload/route.ts`
*   `app/datenschutz/page.tsx`
*   `app/favicon.ico`
*   `app/feedback/page.tsx`
*   `app/globals.css`
*   `app/layout.tsx`
*   `app/patient/anfrage/page.tsx`
*   `app/patient/beratungen/[consultationId]/page.tsx`
*   `app/patient/dashboard/page.tsx`
*   `app/patient/layout.tsx`
*   `app/patient/profil/page.tsx`
*   `app/student/beratungen/[consultationId]/page.tsx`
*   `app/student/dashboard/page.tsx`
*   `app/student/layout.tsx`
*   `app/student/profil/page.tsx`
*   `auth.config.ts`
*   `components.json`
*   `components/admin/AdminConsultationTable.tsx`
*   `components/admin/AdminUserTable.tsx`
*   `components/admin/VerifyStudentButton.tsx`
*   `components/core/Footer.tsx`
*   `components/core/Header.tsx`
*   `components/core/LoadingSpinner.tsx`
*   `components/core/Logo.tsx`
*   `components/core/NextAuthProvider.tsx`
*   `components/core/PageTransitionWrapper.tsx`
*   `components/core/TrustBadge.tsx`
*   `components/core/UserMenuButton.tsx`
*   `components/features/AICheckResultDisplay.tsx`
*   `components/features/AuthForm.tsx`
*   `components/features/ChatInterface.tsx`
*   `components/features/ChatMessage.tsx`
*   `components/features/ConsultationCard.tsx`
*   `components/features/ConsultationList.tsx`
*   `components/features/ConsultationPreviewDialog.tsx`
*   `components/features/ConsultationRequestForm.tsx`
*   `components/features/ConsultationSummaryForm.tsx`
*   `components/features/ConsultationsSection.tsx`
*   `components/features/DocumentLink.tsx`
*   `components/features/FileUpload.tsx`
*   `components/features/JargonExplainer.tsx`
*   `components/features/MessageInput.tsx`
*   `components/features/MessageList.tsx`
*   `components/features/PatientProfileForm.tsx`
*   `components/features/ProfilePictureUpload.tsx`
*   `components/features/StudentProfileForm.tsx`
*   `components/ui/AnimatedCheckmark.tsx`
*   `components/ui/alert.tsx`
*   `components/ui/avatar.tsx`
*   `components/ui/badge.tsx`
*   `components/ui/button.tsx`
*   `components/ui/calendar.tsx`
*   `components/ui/card.tsx`
*   `components/ui/dialog.tsx`
*   `components/ui/dropdown-menu.tsx`
*   `components/ui/form.tsx`
*   `components/ui/input.tsx`
*   `components/ui/label.tsx`
*   `components/ui/popover.tsx`
*   `components/ui/progress.tsx`
*   `components/ui/radio-group.tsx`
*   `components/ui/scroll-area.tsx`
*   `components/ui/select.tsx`
*   `components/ui/skeleton.tsx`
*   `components/ui/sonner.tsx`
*   `components/ui/table.tsx`
*   `components/ui/tabs.tsx`
*   `components/ui/textarea.tsx`
*   `dump_code.sh`
*   `eslint.config.mjs`
*   `hooks/useCurrentUser.ts`
*   `hooks/usePusherSubscription.ts`
*   `lib/auth.ts`
*   `lib/constants.ts`
*   `lib/email.ts`
*   `lib/prisma.ts`
*   `lib/pusher/client.ts`
*   `lib/pusher/server.ts`
*   `lib/utils.ts`
*   `lib/validation.ts`
*   `middleware.ts`
*   `next.config.ts`
*   `package.json`
*   `planning/ADMIN_CONSOLE_PLAN_V1.md`
*   `planning/AI_FEATURES_PLAN.md`
*   `planning/API_SPECIFICATION.md`
*   `planning/AUTHENTICATION_FLOW.md`
*   `planning/COMPONENT_ARCHITECTURE.md`
*   `planning/DATABASE_SEEDING.md`
*   `planning/ERROR_HANDLING_STRATEGY.md`
*   `planning/FILE_UPLOAD_BLOB.md`
*   `planning/GERMAN_LANGUAGE_STRATEGY.md`
*   `planning/PLANNING_OVERVIEW.md`
*   `planning/REALTIME_CHAT_IMPLEMENTATION.md`
*   `planning/TRUST_AND_SECURITY_COMMUNICATION.md`
*   `planning/UI_UX_ANIMATIONS.md`
*   `postcss.config.mjs`
*   `prisma/migrations/20250330134959_init/migration.sql`
*   `prisma/migrations/20250405032035_add_user_image/migration.sql`
*   `prisma/migrations/20250405043246_add_admin_role/migration.sql`
*   `prisma/migrations/20250405065444_add_password_reset_feedback/migration.sql`
*   `prisma/migrations/migration_lock.toml`
*   `prisma/schema.prisma`
*   `prisma/seed.ts`
*   `tailwind.config.ts`
*   `tsconfig.json`
*   `types/index.ts`
*   `.env.local` (Explicitly included)

---

## File: `.env`

```
# .env (Example of how it should look - NO SECRETS HERE)

# Vercel Postgres - Set in .env.local or Vercel Env Vars
# DATABASE_URL=
# DIRECT_URL=

# NextAuth Configuration
# Set NEXTAUTH_URL for deployment in Vercel Env Vars
# NEXTAUTH_URL=http://localhost:3000 # Default for local dev
# Set NEXTAUTH_SECRET in .env.local or Vercel Env Vars
# NEXTAUTH_SECRET=

# Pusher Configuration
# Set PUSHER_APP_ID in .env.local or Vercel Env Vars
# PUSHER_APP_ID=
NEXT_PUBLIC_PUSHER_KEY="f5ba42a6feec0f9cd3fa" # Public keys can sometimes stay if needed
# Set PUSHER_SECRET in .env.local or Vercel Env Vars
# PUSHER_SECRET=
NEXT_PUBLIC_PUSHER_CLUSTER="eu"

# Vercel Blob Store Token
# Set BLOB_READ_WRITE_TOKEN in .env.local or Vercel Env Vars
# BLOB_READ_WRITE_TOKEN=

# App Base URL
NEXT_PUBLIC_APP_BASE_URL=http://localhost:3000

# Admin Seeding (Optional - remove if setting directly in seed script or via secure means)
# Set ADMIN_SEED_EMAIL in .env.local if needed locally
# ADMIN_SEED_EMAIL=
# Set ADMIN_SEED_PASSWORD in .env.local if needed locally
# ADMIN_SEED_PASSWORD=

# Gemini API Key
# Set GEMINI_API_KEY in .env.local or Vercel Env Vars
# GEMINI_API_KEY=

# Email Provider Keys (Add later)
# Set RESEND_API_KEY in .env.local or Vercel Env Vars
# RESEND_API_KEY=

# NODE_ENV=development # Usually set automatically
```

## File: `.gitignore`

```
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.*
.yarn/*
!.yarn/patches
!.yarn/plugins
!.yarn/releases
!.yarn/versions

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# --- Environment Files ---
# Ignore local environment variables which may contain secrets
.env*.local

# Ignore production environment file (if used separately) - usually set on hosting provider
# .env.production

# Optionally, ignore the base .env file if you don't want to commit defaults/placeholders
# If you commit .env (recommended), keep this line commented out or remove it.
# .env
# --- End Environment Files ---


# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

# prompt planning
codebase_content.txt

# IDE specific
.vscode/
.idea/

# OS specific
Thumbs.db
```

## File: `README.md`

```markdown
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

```

## File: `actions/admin.ts`

```typescript
// actions/admin.ts
'use server';

import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { UserRole } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { sendEmail, templates } from '@/lib/email'; // Correct import

type ActionResult = {
    success: boolean;
    message: string;
};

export async function toggleStudentVerification(
    targetUserId: string,
    currentStatus: boolean
): Promise<ActionResult> {
    const session = await auth();

    if (!session?.user || session.user.role !== UserRole.ADMIN) {
        return { success: false, message: "Zugriff verweigert: Nur Administratoren dürfen diese Aktion ausführen." };
    }
    if (!targetUserId) {
        return { success: false, message: "Ungültige Benutzer-ID." };
    }
    if (session.user.id === targetUserId) {
        return { success: false, message: "Administratoren können ihren eigenen Verifizierungsstatus nicht ändern." };
    }

    try {
        const student = await prisma.user.findUnique({
            where: { id: targetUserId },
            include: {
                 studentProfile: { select: { id: true, isVerified: true, firstName: true } }
             }
        });

        if (!student || !student.studentProfile) {
            return { success: false, message: "Studentenprofil nicht gefunden." };
        }
        if (student.studentProfile.isVerified !== currentStatus) {
             console.warn(`Verification status mismatch for user ${targetUserId}. Client says ${currentStatus}, DB says ${student.studentProfile.isVerified}. Proceeding with toggle.`);
        }

        const newStatus = !student.studentProfile.isVerified;
        await prisma.studentProfile.update({
            where: { userId: targetUserId },
            data: { isVerified: newStatus },
        });

        console.log(`Admin ${session.user.id} ${newStatus ? 'verified' : 'unverified'} student ${targetUserId}`);

        // Send Verification Email (only if newly verified)
        if (newStatus === true) {
             const templateData = templates.studentVerified({ email: student.email, firstName: student.studentProfile.firstName });
             // <<< Add 'to' field when calling sendEmail >>>
             await sendEmail({
                to: student.email,
                subject: templateData.subject,
                text: templateData.text,
                html: templateData.html,
             }).catch(err => {
                  console.error(`Failed to send verification email for student ${targetUserId}:`, err);
             });
         }

        revalidatePath('/admin/users');

        return {
            success: true,
            message: `Student erfolgreich ${newStatus ? 'verifiziert' : 'Verifizierung entzogen'}.`
        };

    } catch (error) {
        console.error("Error toggling student verification:", error);
        return { success: false, message: "Ein Fehler ist aufgetreten. Die Aktion konnte nicht abgeschlossen werden." };
    }
}
```

## File: `actions/ai.ts`

```typescript
// actions/ai.ts
'use server';

import { auth } from "@/lib/auth";
import { UserRole } from "@prisma/client";
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// --- AI Action Result Types ---
interface AIActionResult {
    success: boolean;
    message: string; // Explanation, summary, feedback, or error message
    data?: { // Structured data specific to the action
        // For Clarity/Safety Check
        hasSafetyConcern?: boolean;
        clarityFeedback?: string;
        safetyFeedback?: string;
        suggestions?: string[];
    } | null;
}

// --- Helper to read .env.local manually (Workaround) ---
function getApiKeyFromEnvLocal(): string | undefined {
    try {
        const envPath = path.resolve(process.cwd(), '.env.local');
        if (fs.existsSync(envPath)) {
            const envFileContent = fs.readFileSync(envPath, { encoding: 'utf8' });
            const parsedEnv = dotenv.parse(envFileContent);
            const key = parsedEnv.GEMINI_API_KEY;
             if (!key) console.error("[actions/ai.ts] GEMINI_API_KEY not found within .env.local file content.");
             return key;
        } else {
            console.warn("[actions/ai.ts] .env.local file not found at:", envPath);
            return undefined;
        }
    } catch (error) {
        console.error("[actions/ai.ts] Error reading or parsing .env.local:", error);
        return undefined;
    }
}
// --- End Helper ---

// --- Initialize Gemini Client ---
// We try initializing here, but re-check inside actions if needed
let genAIInstance: any = null; // Use 'any' or specific SDK types
let geminiModel: any = null;
function initializeGemini() {
    if (genAIInstance) return; // Already initialized

    const apiKey = getApiKeyFromEnvLocal(); // Use helper
    if (!apiKey) {
        console.error("GEMINI_API_KEY could not be read from .env.local. AI features disabled.");
        return;
    }
    try {
         // Using require here inside function scope if import at top causes issues
         const { GoogleGenerativeAI } = require("@google/generative-ai");
         genAIInstance = new GoogleGenerativeAI(apiKey);
         geminiModel = genAIInstance.getGenerativeModel({ model: "gemini-1.5-flash" });
         console.log("[actions/ai.ts] Gemini Client Initialized.");
    } catch (error) {
         console.error("[actions/ai.ts] Failed to initialize Gemini Client:", error);
         genAIInstance = null;
         geminiModel = null;
    }
}
initializeGemini(); // Attempt initialization on load


// --- Jargon Explainer Action ---
export async function getAIJargonExplanation(term: string): Promise<AIActionResult> {
    const session = await auth();
    if (!session?.user?.id || (session.user.role !== UserRole.STUDENT && session.user.role !== UserRole.ADMIN)) {
        return { success: false, message: "Nur autorisierte Benutzer können diese Funktion nutzen." };
    }

    // Ensure model is initialized
    if (!geminiModel) {
         initializeGemini(); // Try again
         if(!geminiModel) return { success: false, message: "AI-Modell ist nicht verfügbar." };
    }

    if (!term || term.trim().length === 0) { return { success: false, message: "Bitte geben Sie einen Begriff ein." }; }

    const sanitizedTerm = term.trim().substring(0, 100);
    const prompt = `Erkläre den medizinischen Begriff "${sanitizedTerm}" in einfacher deutscher Sprache (max. 2-3 Sätze) für einen Patienten (Laien). Gib KEINE medizinische Diagnose, Therapieempfehlung oder Handlungsaufforderung ab. Konzentriere dich rein auf die Worterklärung.`;
    const apiKey = getApiKeyFromEnvLocal(); // Get key again for fetch
    if (!apiKey) return { success: false, message: "AI-Konfigurationsfehler." };
    const modelName = "gemini-1.5-flash";
    const apiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent`;
    const requestBody = { contents: [{ parts: [{ text: prompt }] }] };
    const headers = { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey, 'User-Agent': 'MurphApp/1.0 (Node.js fetch)' };

    try {
        // console.log(`[AI Action - fetch] Requesting explanation for term: "${sanitizedTerm}"`);
        const response = await fetch(apiEndpoint, { method: 'POST', headers: headers, body: JSON.stringify(requestBody) });

        // Better error handling from fetch response
        if (!response.ok) {
             let errorData: any = null;
             let errorText = '';
             try { errorText = await response.text(); errorData = JSON.parse(errorText); }
             catch (e) { console.warn("[AI Action - fetch] Could not parse error response as JSON:", errorText); errorData = { error: { message: errorText || `HTTP error ${response.status}` } }; }
             console.error(`[AI Action - fetch] API Error: ${response.status} ${response.statusText}`, errorData);
             let userMessage = `Unerwarteter Fehler vom AI-Service (${response.status}).`;
             const errorMessageFromApi = errorData?.error?.message || '';
              if (response.status === 400) { if (errorMessageFromApi.includes('API key') || errorMessageFromApi.includes('API_KEY')) { userMessage = "AI-Konfigurationsfehler (API Key)."; } else { userMessage = `Fehlerhafte Anfrage (${response.status}).`; } }
             else if (response.status === 403) { userMessage = "Zugriff verweigert (403)."; }
             else if (response.status === 429) { userMessage = "AI-Limit erreicht."; }
             else if (response.status >= 500) { userMessage = "Problem beim AI-Anbieter."; }
             return { success: false, message: userMessage };
         }

        const data = await response.json();
        const explanation = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!explanation?.trim()) {
             const finishReason = data?.candidates?.[0]?.finishReason;
             console.warn(`[AI Action - fetch] Received empty explanation. Finish Reason: ${finishReason}`);
             let userMessage = "Keine Erklärung generiert.";
             if (finishReason === 'SAFETY') { userMessage = "Erklärung wegen Sicherheitsrichtlinien blockiert."; }
             return { success: false, message: userMessage };
        }
        // console.log(`[AI Action - fetch] Received explanation: "${explanation}"`);
        return { success: true, message: explanation }; // Return explanation in message field
    } catch (error: any) {
        console.error("[AI Action - fetch] Network Error (Jargon):", error);
        return { success: false, message: "Netzwerkfehler bei AI-Anfrage." };
    }
}

// --- Chat Summary Draft Action ---
interface ChatEntry { sender: { role: UserRole }; content: string; }
export async function getAIChatSummaryDraft(chatHistory: ChatEntry[]): Promise<AIActionResult> {
    const session = await auth();
    if (!session?.user?.id || session.user.role !== UserRole.STUDENT) { return { success: false, message: "Nur Studenten können Zusammenfassungen entwerfen." }; }
    if (!geminiModel) { initializeGemini(); if(!geminiModel) return { success: false, message: "AI-Modell ist nicht verfügbar." }; }
    if (!chatHistory || chatHistory.length === 0) { return { success: false, message: "Chatverlauf ist leer." }; }

    let formattedHistory = "";
    try { chatHistory.forEach(entry => { if (!entry?.sender?.role || typeof entry.content !== 'string') { throw new Error(`Invalid chat entry: ${JSON.stringify(entry)}`); } const prefix = entry.sender.role === UserRole.PATIENT ? "P:" : "S:"; formattedHistory += `${prefix} ${entry.content.trim()}\n`; }); }
    catch (formatError: any) { console.error("Error formatting chat history:", formatError); return { success: false, message: "Fehler beim Verarbeiten des Chatverlaufs." }; }

    const modelName = "gemini-1.5-flash";
    const apiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent`;
    const prompt = `Du bist ein KI-Assistent für Medizinstudenten. Erstelle eine neutrale, sachliche Zusammenfassung (max. 150 Wörter, Deutsch) der folgenden Chat-Konversation zwischen Patient (P) und Student (S) für die interne Dokumentation des Studenten. Gib keine eigene medizinische Bewertung oder Empfehlung ab. Konversation:\n\n${formattedHistory}`;
    const requestBody = { contents: [{ parts: [{ text: prompt }] }] };
    const apiKey = getApiKeyFromEnvLocal(); if (!apiKey) return { success: false, message: "AI-Konfigurationsfehler." };
    const headers = { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey, 'User-Agent': 'MurphApp/1.0 (Node.js fetch)' };

    try {
        // console.log(`[AI Action - fetch] Requesting chat summary draft...`);
        const response = await fetch(apiEndpoint, { method: 'POST', headers: headers, body: JSON.stringify(requestBody) });
        if (!response.ok) { /* ... Basic error handling ... */ let e = await response.text(); console.error(`API Error ${response.status}`,e); return {success:false, message:`Fehler ${response.status}`} }
        const data = await response.json();
        const summaryDraft = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!summaryDraft?.trim()) { const r = data?.candidates?.[0]?.finishReason; console.warn(`Empty summary. Reason: ${r}`); return {success:false, message:"Zusammenfassung konnte nicht generiert werden."}}
        return { success: true, message: summaryDraft.trim() };
    } catch (error: any) { console.error("[AI Action - fetch] Error fetching summary draft:", error); return {success:false, message:"Netzwerkfehler bei AI-Anfrage."}}
}

// --- Clarity & Safety Check Action ---
export async function getAIClaritySafetyCheck(textToCheck: string): Promise<AIActionResult> {
    const session = await auth();
    if (!session?.user?.id || session.user.role !== UserRole.STUDENT) { return { success: false, message: "Nur Studenten können diese Funktion nutzen." }; }
    if (!geminiModel) { initializeGemini(); if(!geminiModel) return { success: false, message: "AI-Modell ist nicht verfügbar." }; }
    if (!textToCheck || textToCheck.trim().length < 10) { return { success: false, message: "Bitte geben Sie ausreichend Text zur Prüfung ein (min. 10 Zeichen)." }; }

    const sanitizedText = textToCheck.trim().substring(0, 4000);
    const modelName = "gemini-1.5-flash";
    const apiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent`;
    const apiKey = getApiKeyFromEnvLocal(); if (!apiKey) return { success: false, message: "AI-Konfigurationsfehler." };

    const prompt = `Du bist ein KI-Assistent für Medizinstudenten und prüfst Texte auf Klarheit und Sicherheit für Patientenkommunikation in deutscher Sprache. Analysiere den folgenden Text: 1. **Klarheit:** Ist der Text klar, prägnant und in einfacher Sprache für einen medizinischen Laien (Patienten) verständlich? Gib kurzes Feedback (1 Satz). 2. **Sicherheit:** Enthält der Text Formulierungen, die als spezifische medizinische Diagnose, Therapieempfehlung, Behandlungsanweisung oder dringende Handlungsaufforderung missverstanden werden könnten (was absolut vermieden werden muss)? Antworte mit 'JA' oder 'NEIN'. Gib zusätzlich eine kurze Begründung (1 Satz), falls 'JA'. 3. **Vorschläge (Optional):** Gib maximal 2 kurze Vorschläge zur Verbesserung der Klarheit oder zur Vermeidung von Missverständnissen, falls angebracht. Formatiere deine Antwort AUSSCHLIESSLICH als valides JSON-Objekt mit den folgenden Schlüsseln: "clarityFeedback": string, "safetyConcern": boolean, "safetyJustification": string (nur relevant wenn safetyConcern true), "suggestions": string[]. Text zur Prüfung:\n"${sanitizedText}"`;
    const requestBody = { contents: [{ parts: [{ text: prompt }] }], generationConfig: { responseMimeType: "application/json" } };
    const headers = { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey, 'User-Agent': 'MurphApp/1.0 (Node.js fetch)' };

    try {
        // console.log(`[AI Action - fetch] Requesting clarity/safety check...`);
        const response = await fetch(apiEndpoint, { method: 'POST', headers: headers, body: JSON.stringify(requestBody) });
        if (!response.ok) { /* ... Basic error handling ... */ let e = await response.text(); console.error(`API Error ${response.status}`,e); return {success:false, message:`Fehler ${response.status}`} }
        const data = await response.json();
        const aiResponseJsonString = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!aiResponseJsonString?.trim()) { return {success:false, message:"Prüfung fehlgeschlagen (leere Antwort)."}}

        try {
            const parsedData = JSON.parse(aiResponseJsonString);
            if (typeof parsedData.clarityFeedback !== 'string' || typeof parsedData.safetyConcern !== 'boolean') { throw new Error("Unerwartetes JSON-Format."); }
            const safetyJustification = typeof parsedData.safetyJustification === 'string' ? parsedData.safetyJustification : '';
            const suggestions = Array.isArray(parsedData.suggestions) ? parsedData.suggestions.filter((s: any) => typeof s === 'string').slice(0, 2) : [];
            const resultData = { clarityFeedback: parsedData.clarityFeedback, hasSafetyConcern: parsedData.safetyConcern, safetyFeedback: parsedData.safetyConcern ? safetyJustification || "Mögliche problematische Formulierung gefunden." : "Keine direkten Sicherheitsbedenken erkannt.", suggestions: suggestions, };
            return { success: true, message: "Prüfung abgeschlossen.", data: resultData };
        } catch (parseError: any) { console.error("[AI Action SDK] Error parsing JSON:", parseError); return { success: false, message: "Antwort der AI konnte nicht verarbeitet werden." }; }

    } catch (error: any) { console.error("[AI Action - fetch] Error fetching clarity check:", error); return {success:false, message:"Netzwerkfehler bei AI-Anfrage."}}
}

// --- Document Summarizer Placeholder ---
export async function getAIDocumentSummary(documentText: string): Promise<AIActionResult> {
    console.warn("getAIDocumentSummary not implemented");
    return { success: false, message: "Funktion noch nicht implementiert." };
}

// --- REMOVED Explanation Draft Action ---
// export async function getAIExplanationDraft(patientQuestion: string, documentContext?: string): Promise<AIActionResult> { ... }
```

## File: `actions/auth.ts`

```typescript
// actions/auth.ts
'use server';

import { z } from 'zod';
import { RegisterSchema } from '@/lib/validation';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { UserRole } from '@prisma/client';
import { sendEmail, templates } from '@/lib/email'; // Correct import

const SALT_ROUNDS = 10;

export type RegistrationResult = {
    success: boolean;
    message: string;
    fieldErrors?: { [key: string]: string[] | undefined };
};

export async function registerUser(
    values: z.infer<typeof RegisterSchema>
): Promise<RegistrationResult> {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        console.log("Registration Validation Failed:", validatedFields.error.flatten().fieldErrors);
        return {
            success: false,
            message: "Ungültige Eingabe. Bitte überprüfen Sie die markierten Felder.",
            fieldErrors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const { email, password, firstName, lastName, role, dob, university, clinicalYear } = validatedFields.data;

    try {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return { success: false, message: "Diese E-Mail-Adresse ist bereits registriert." };
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        let newUser;

        await prisma.$transaction(async (tx) => {
             newUser = await tx.user.create({
                data: {
                    email,
                    passwordHash: hashedPassword,
                    role,
                },
            });

            if (role === UserRole.PATIENT) {
                await tx.patientProfile.create({
                    data: { userId: newUser.id, firstName, lastName, dob: dob || null },
                });
            } else if (role === UserRole.STUDENT) {
                 if (!university || !clinicalYear) {
                     throw new Error("Universitäts- oder Jahresinformationen fehlen für Studenten.")
                 }
                await tx.studentProfile.create({
                    data: { userId: newUser.id, firstName, lastName, university, clinicalYear, isVerified: false },
                });
            }
        });

        // Send Welcome Email
        if (newUser) {
             const templateData = templates.welcome({ email: newUser.email, firstName: firstName });
             // <<< Construct the full EmailOptions object >>>
             await sendEmail({
                 to: newUser.email, // <<< Add the 'to' field here
                 subject: templateData.subject,
                 text: templateData.text,
                 html: templateData.html,
             });
        }

        console.log(`Successfully registered user: ${email}, Role: ${role}`);
        return { success: true, message: "Registrierung erfolgreich! Sie können sich nun anmelden." };

    } catch (error) {
        console.error("Registration Error:", error);
        return { success: false, message: "Registrierung fehlgeschlagen. Bitte versuchen Sie es später erneut." };
    }
}
```

## File: `actions/consultations.ts`

```typescript
// actions/consultations.ts
'use server';

import { z } from 'zod';
import { ConsultationRequestSchema, UploadedDocument } from '@/lib/validation';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { ConsultationStatus, UserRole } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { sendEmail, templates } from '@/lib/email'; // Correct import

export type ConsultationActionResult = {
    success: boolean;
    message: string;
    consultationId?: string;
    fieldErrors?: { [key: string]: string[] | undefined };
};

// --- Action 1: Create a New Consultation Request (by Patient) ---
export async function createConsultation(
    values: z.infer<typeof ConsultationRequestSchema>,
    documents: UploadedDocument[]
): Promise<ConsultationActionResult> {

    const session = await auth();
    if (!session?.user?.id || session.user.role !== 'PATIENT') {
        return { success: false, message: "Nicht autorisiert. Nur Patienten können Anfragen erstellen." };
    }
    const patientId = session.user.id;

    // Fetch patient details for email personalization
    const patientUser = await prisma.user.findUnique({
        where: { id: patientId },
        select: { email: true, patientProfile: { select: { firstName: true } } }
    });
    if (!patientUser) {
        return { success: false, message: "Patient nicht gefunden." }; // Should not happen if session is valid
    }


    const validatedFields = ConsultationRequestSchema.safeParse(values);
    if (!validatedFields.success) {
        return { success: false, message: "Ungültige Eingabe.", fieldErrors: validatedFields.error.flatten().fieldErrors };
    }
    const { topic, patientQuestion } = validatedFields.data;

    try {
        const newConsultation = await prisma.consultation.create({
            data: {
                patientId: patientId,
                topic: topic,
                patientQuestion: patientQuestion,
                status: ConsultationStatus.REQUESTED,
                ...(documents.length > 0 && {
                    documents: {
                        create: documents.map(doc => ({
                            uploaderId: patientId,
                            fileName: doc.fileName,
                            storageUrl: doc.storageUrl,
                            mimeType: doc.mimeType,
                            fileSize: doc.fileSize,
                        })),
                    },
                }),
            },
        });

        console.log(`Consultation created successfully: ID ${newConsultation.id} for user ${patientId}`);

        // <<< Send Request Confirmation Email >>>
        const templateData = templates.requestConfirmation(
            { email: patientUser.email, firstName: patientUser.patientProfile?.firstName },
            { id: newConsultation.id, topic: newConsultation.topic }
        );
        await sendEmail({
            to: patientUser.email,
            subject: templateData.subject,
            text: templateData.text,
            html: templateData.html,
        }).catch(err => {
            console.error(`Failed to send confirmation email for consultation ${newConsultation.id}:`, err);
        });
        // <<< End Email Sending >>>

        revalidatePath('/patient/dashboard');

        return {
            success: true,
            message: "Ihre Beratungsanfrage wurde erfolgreich übermittelt.",
            consultationId: newConsultation.id,
        };

    } catch (error) {
        console.error("Error creating consultation:", error);
        return { success: false, message: "Fehler beim Erstellen der Beratung. Bitte versuchen Sie es später erneut." };
    }
}


// --- Action 2: Accept a Consultation Request (by Student) ---
export async function acceptConsultation(
    consultationId: string
): Promise<{ success: boolean; message: string; error?: any }> {

    const session = await auth();
    if (!session?.user?.id || session.user.role !== UserRole.STUDENT) {
        return { success: false, message: "Nicht autorisiert. Nur Studenten können Beratungen annehmen." };
    }
    const studentId = session.user.id;

    if (!consultationId || typeof consultationId !== 'string') {
        return { success: false, message: "Ungültige Beratungs-ID." };
    }

    console.log(`Student ${studentId} attempting to accept consultation ${consultationId}`);

    try {
        let acceptedConsultation; // To hold result for email
        await prisma.$transaction(async (tx) => {
            const consultation = await tx.consultation.findUnique({
                where: { id: consultationId },
                select: { status: true }
            });

            if (!consultation) throw new Error("Beratung nicht gefunden.");
            if (consultation.status !== ConsultationStatus.REQUESTED) throw new Error("Diese Beratung ist nicht mehr verfügbar oder wurde bereits angenommen.");

            const studentProfile = await tx.studentProfile.findUnique({ where: { userId: studentId }, select: { isVerified: true } });
            if (!studentProfile?.isVerified) throw new Error("Nur verifizierte Studenten können Anfragen annehmen.");

            // Update and fetch related data needed for email
            acceptedConsultation = await tx.consultation.update({
                where: { id: consultationId },
                data: { studentId: studentId, status: ConsultationStatus.IN_PROGRESS },
                include: {
                    patient: { select: { email: true, patientProfile: { select: { firstName: true } } } },
                    student: { select: { studentProfile: { select: { firstName: true, lastName: true } } } } // Get accepting student's name
                }
            });
        });

        if (!acceptedConsultation) {
            throw new Error("Failed to retrieve accepted consultation details after update.");
        }

        console.log(`Consultation ${acceptedConsultation.id} accepted by student ${studentId}`);

        // <<< Send Consultation Accepted Email to Patient >>>
        if (acceptedConsultation.patient && acceptedConsultation.patient.email && acceptedConsultation.student?.studentProfile) {
            const studentName = `${acceptedConsultation.student.studentProfile.firstName} ${acceptedConsultation.student.studentProfile.lastName}`.trim();
            const templateData = templates.consultationAccepted(
                { email: acceptedConsultation.patient.email, firstName: acceptedConsultation.patient.patientProfile?.firstName },
                { name: studentName },
                { id: acceptedConsultation.id, topic: acceptedConsultation.topic }
            );
            await sendEmail({
                to: acceptedConsultation.patient.email,
                subject: templateData.subject,
                text: templateData.text,
                html: templateData.html,
            }).catch(err => {
                console.error(`Failed to send accepted email for consultation ${acceptedConsultation.id}:`, err);
            });
        } else {
            console.warn(`Could not send accepted email for consultation ${acceptedConsultation.id}: Missing patient/student details.`);
        }
        // <<< End Email Sending >>>

        revalidatePath('/student/dashboard');
        revalidatePath(`/patient/beratungen/${consultationId}`); // Revalidate patient detail page too
        revalidatePath('/patient/dashboard'); // Revalidate patient dashboard

        return { success: true, message: "Beratung erfolgreich angenommen." };

    } catch (error: any) {
        console.error(`Error accepting consultation ${consultationId} by student ${studentId}:`, error);
        return { success: false, message: error.message || "Ein Fehler ist beim Annehmen der Beratung aufgetreten.", error: error };
    }
}


// --- Action 3: Complete a Consultation (by Student) ---
// (Already sends email)
export async function completeConsultation(
    consultationId: string,
    summary: string
): Promise<ConsultationActionResult> {
     const session = await auth();
     if (!session?.user?.id || session.user.role !== UserRole.STUDENT) {
         return { success: false, message: "Nicht autorisiert." };
     }
     const studentId = session.user.id;
     if (!consultationId) return { success: false, message: "Ungültige Beratungs-ID." };
     const trimmedSummary = summary.trim();
     if (trimmedSummary.length < 10 || trimmedSummary.length > 2000) {
          return { success: false, message: "Zusammenfassung ist ungültig (10-2000 Zeichen erforderlich).", fieldErrors: { summary: ["Zusammenfassung muss zwischen 10 und 2000 Zeichen lang sein."] } };
     }
    console.log(`Student ${studentId} attempting to complete consultation ${consultationId}`);
    try {
        let completedConsultation;
        await prisma.$transaction(async (tx) => {
             const consultation = await tx.consultation.findFirst({ where: { id: consultationId, studentId: studentId }, select: { status: true, patientId: true } });
             if (!consultation) throw new Error("Beratung nicht gefunden oder nicht zugewiesen.");
             if (consultation.status !== ConsultationStatus.IN_PROGRESS) throw new Error("Diese Beratung ist nicht aktiv.");
             completedConsultation = await tx.consultation.update({
                where: { id: consultationId },
                data: { summary: trimmedSummary, status: ConsultationStatus.COMPLETED },
                 include: { patient: { select: { email: true, patientProfile: { select: { firstName: true } } } } }
            });
        });
        if (!completedConsultation) { throw new Error("Failed to retrieve completed consultation details after update."); }
        console.log(`Consultation ${completedConsultation.id} completed by student ${studentId}`);

        // Send Completion Email to Patient
        if (completedConsultation.patient && completedConsultation.patient.email) {
            const feedbackLink = `${process.env.NEXT_PUBLIC_APP_BASE_URL}/feedback?consultationId=${completedConsultation.id}`;
            const templateData = templates.consultationCompleted(
                 { email: completedConsultation.patient.email, firstName: completedConsultation.patient.patientProfile?.firstName },
                 { id: completedConsultation.id, topic: completedConsultation.topic },
                 feedbackLink
            );
             await sendEmail({
                to: completedConsultation.patient.email,
                subject: templateData.subject,
                text: templateData.text,
                html: templateData.html
             }).catch(err => { console.error(`Failed to send completion email for consultation ${completedConsultation.id}:`, err); });
        } else {
             console.warn(`Could not send completion email for consultation ${completedConsultation.id}: Patient email missing.`);
        }

        // Revalidate paths
        revalidatePath('/student/dashboard');
        revalidatePath(`/student/beratungen/${consultationId}`);
        revalidatePath(`/patient/beratungen/${consultationId}`);
        revalidatePath('/patient/dashboard');

        return { success: true, message: "Beratung erfolgreich abgeschlossen." };

    } catch (error: any) {
         console.error(`Error completing consultation ${consultationId} by student ${studentId}:`, error);
        return { success: false, message: error.message || "Ein Fehler ist beim Abschließen der Beratung aufgetreten." };
    }
}
```

## File: `actions/feedback.ts`

```typescript
// actions/feedback.ts
'use server';

import { z } from 'zod';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { ConsultationStatus, UserRole } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { SubmitFeedbackSchema } from '@/lib/validation';
import { sendEmail, templates } from '@/lib/email'; // <<< Import email helpers

export async function submitFeedback(
    values: z.infer<typeof SubmitFeedbackSchema>
): Promise<{ success: boolean; message: string; fieldErrors?: any }> {
    const session = await auth();

    // 1. Authentication & Role Check
    if (!session?.user?.id || session.user.role !== UserRole.PATIENT) {
        return { success: false, message: "Nur Patienten können Feedback geben." };
    }
    const patientId = session.user.id;

    // 2. Validation
    const validatedFields = SubmitFeedbackSchema.safeParse(values);
    if (!validatedFields.success) {
        return { success: false, message: "Ungültige Eingabe.", fieldErrors: validatedFields.error.flatten().fieldErrors };
    }
    const { consultationId, rating, feedback } = validatedFields.data;

    try {
        // 3. Verify consultation ownership, status, and if feedback already exists
        // <<< Include student data for email notification >>>
        const consultation = await prisma.consultation.findUnique({
            where: { id: consultationId },
            select: {
                patientId: true,
                status: true,
                patientRating: true,
                topic: true, // Needed for email
                student: { // Needed for email recipient
                    select: {
                        email: true,
                        studentProfile: { select: { firstName: true } }
                    }
                },
                patient: { // Needed for email sender name
                     select: {
                        patientProfile: { select: { firstName: true, lastName: true } }
                    }
                }
            }
        });

        if (!consultation) { return { success: false, message: "Beratung nicht gefunden." }; }
        if (consultation.patientId !== patientId) { return { success: false, message: "Sie können nur für Ihre eigenen Beratungen Feedback geben." }; }
        if (consultation.status !== ConsultationStatus.COMPLETED) { return { success: false, message: "Feedback kann nur für abgeschlossene Beratungen gegeben werden." }; }
        if (consultation.patientRating !== null) { return { success: false, message: "Für diese Beratung wurde bereits Feedback abgegeben." }; }

        // 4. Save feedback
        await prisma.consultation.update({
            where: { id: consultationId },
            data: {
                patientRating: rating,
                patientFeedback: feedback || null,
            }
        });

        console.log(`Feedback submitted for consultation ${consultationId} by user ${patientId}`);

        // <<< Send Feedback Received Email to Student >>>
        if (consultation.student && consultation.student.email) {
             const patientName = `${consultation.patient?.patientProfile?.firstName || 'Ein Patient'} ${consultation.patient?.patientProfile?.lastName || ''}`.trim();
             const templateData = templates.feedbackReceived(
                 { email: consultation.student.email, firstName: consultation.student.studentProfile?.firstName },
                 { name: patientName },
                 { id: consultationId, topic: consultation.topic },
                 { rating: rating, comment: feedback }
             );
             await sendEmail({
                 to: consultation.student.email,
                 subject: templateData.subject,
                 text: templateData.text,
                 html: templateData.html,
             }).catch(err => {
                  console.error(`Failed to send feedback received email for consultation ${consultationId} to student ${consultation.student?.email}:`, err);
             });
        } else {
             console.warn(`Could not send feedback received email for consultation ${consultationId}: Student email missing.`);
        }
        // <<< End Email Sending >>>

        // Optional: Revalidate relevant pages
        // revalidatePath(`/student/beratungen/${consultationId}`); // Student detail page
        // revalidatePath('/admin/consultations'); // Admin table

        return { success: true, message: "Vielen Dank für Ihr Feedback!" };

    } catch (error) {
         console.error("Error submitting feedback:", error);
         return { success: false, message: "Ein Fehler ist beim Senden des Feedbacks aufgetreten." };
    }
}
```

## File: `actions/password-reset.ts`

```typescript
// actions/password-reset.ts
'use server';

import { z } from 'zod';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import crypto from 'crypto'; // Use built-in crypto for token generation
import { sendEmail, templates } from '@/lib/email';
// <<< Import schemas from validation lib >>>
import { ResetPasswordSchema, RequestPasswordResetSchema } from '@/lib/validation';

const SALT_ROUNDS = 10;
const RESET_TOKEN_EXPIRY_HOURS = 1; // Token valid for 1 hour

/**
 * Action to initiate the password reset process.
 * Generates a token, stores its hash, and sends a reset link email.
 */
export async function requestPasswordReset(
    values: z.infer<typeof RequestPasswordResetSchema>
): Promise<{ success: boolean; message: string }> {

    const validatedFields = RequestPasswordResetSchema.safeParse(values);
    if (!validatedFields.success) {
        // Although schema might catch this on client, double-check server-side
        return { success: false, message: "Ungültige E-Mail-Adresse." };
    }
    const { email } = validatedFields.data;

    try {
        // 1. Find user by email
        const user = await prisma.user.findUnique({
            where: { email },
            // Include profile data needed for email template personalization
            include: { patientProfile: {select: {firstName: true}}, studentProfile: {select: {firstName: true}} }
        });

        // 2. Security: Always return a generic success message regardless of whether the user exists
        // This prevents attackers from figuring out which emails are registered (email enumeration).
        if (!user) {
            console.log(`Password reset requested for non-existent email: ${email}`);
            // Log for admin/debugging purposes, but return generic message to user
            return { success: true, message: "Wenn ein Konto mit dieser E-Mail existiert, wurde ein Link zum Zurücksetzen gesendet." };
        }

        // 3. Generate a secure, unguessable token
        const resetToken = crypto.randomBytes(32).toString('hex');
        // 4. Hash the token before storing it in the database
        const hashedToken = await bcrypt.hash(resetToken, SALT_ROUNDS);

        // 5. Calculate the expiry date for the token
        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + RESET_TOKEN_EXPIRY_HOURS);

        // 6. Store the hashed token in the database
        // Use a transaction to delete any old tokens for the user and create the new one atomically.
        await prisma.$transaction([
            prisma.passwordResetToken.deleteMany({ where: { userId: user.id } }),
            prisma.passwordResetToken.create({
                data: {
                    userId: user.id,
                    tokenHash: hashedToken,
                    expiresAt: expiresAt,
                },
            })
        ]);

        // 7. Construct the password reset link (using the *unhashed* token)
        const resetLink = `${process.env.NEXT_PUBLIC_APP_BASE_URL}/reset-password?token=${resetToken}`;

        // 8. Send the password reset email (Simulated for now)
        const userName = user.patientProfile?.firstName || user.studentProfile?.firstName || null;
        const templateData = templates.passwordReset({ email: user.email, firstName: userName }, resetLink);
        await sendEmail({
            to: user.email,
            subject: templateData.subject,
            text: templateData.text,
            html: templateData.html,
        }).catch(err => {
            // Log email sending errors but don't necessarily fail the whole request
            console.error(`Failed to send password reset email to ${user.email}:`, err);
        });

        console.log(`Password reset link generated for ${email}: ${resetLink}`); // Log the raw token/link for development/testing

        // 9. Return the same generic success message to the user
        return { success: true, message: "Wenn ein Konto mit dieser E-Mail existiert, wurde ein Link zum Zurücksetzen gesendet." };

    } catch (error) {
        console.error("Error requesting password reset:", error);
        // Return a generic server error message
        return { success: false, message: "Ein interner Fehler ist aufgetreten. Bitte versuchen Sie es später erneut." };
    }
}

/**
 * Action to reset the user's password using a valid token.
 */
export async function resetPassword(
     values: z.infer<typeof ResetPasswordSchema>
): Promise<{ success: boolean; message: string; fieldErrors?: any }> {

    const validatedFields = ResetPasswordSchema.safeParse(values);
    if (!validatedFields.success) {
        return {
            success: false,
            message: "Ungültige Eingabe.",
            fieldErrors: validatedFields.error.flatten().fieldErrors,
        };
    }
    const { token, password } = validatedFields.data;

    try {
        // 1. Find potential tokens: Since we only store the hash, we need to fetch potentially valid ones
        // and compare the provided token against their hashes.
        // Fetch tokens that haven't expired yet.
        // In a high-traffic system, this could be optimized (e.g., smaller token expiry, indexing).
        const potentialDbTokens = await prisma.passwordResetToken.findMany({
             where: {
                 expiresAt: { gt: new Date() } // Check for expiry server-side
             }
         });

         let dbTokenRecord = null;
         // Compare the provided token against the hash of each potential DB token
         for (const record of potentialDbTokens) {
             const isValidToken = await bcrypt.compare(token, record.tokenHash);
             if (isValidToken) {
                 dbTokenRecord = record; // Found the matching token record
                 break;
             }
         }

        // 2. Validate Token Existence and Expiry
        if (!dbTokenRecord) {
            // If no matching, non-expired token hash was found
            return { success: false, message: "Ungültiger oder abgelaufener Token." };
        }

        // 3. Hash the new password
        const newPasswordHash = await bcrypt.hash(password, SALT_ROUNDS);

        // 4. Update the user's password and delete the used token in a transaction
        await prisma.$transaction([
            prisma.user.update({
                where: { id: dbTokenRecord.userId },
                data: { passwordHash: newPasswordHash },
            }),
            prisma.passwordResetToken.delete({
                where: { id: dbTokenRecord.id }, // Delete the specific token used
            })
        ]);

        console.log(`Password successfully reset for user ${dbTokenRecord.userId}`);
        // Maybe send a confirmation email here? (Optional)

        return { success: true, message: "Passwort erfolgreich zurückgesetzt. Sie können sich jetzt anmelden." };

    } catch (error) {
         console.error("Error resetting password:", error);
        // Return a generic server error message
        return { success: false, message: "Ein interner Fehler ist aufgetreten. Das Passwort konnte nicht zurückgesetzt werden." };
    }
}
```

## File: `actions/profile.ts`

```typescript
// actions/profile.ts
'use server';

import { z } from 'zod';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { UserRole } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { UpdatePatientProfileSchema, UpdateStudentProfileSchema } from '@/lib/validation';

export type ProfileUpdateResult = {
    success: boolean;
    message: string;
    fieldErrors?: { [key: string]: string[] | undefined };
};

// Combined action to update profile based on role
export async function updateProfile(
    formData: z.infer<typeof UpdatePatientProfileSchema> | z.infer<typeof UpdateStudentProfileSchema>,
    newImageUrl?: string | null // Pass the new image URL separately
): Promise<ProfileUpdateResult> {
    const session = await auth();

    if (!session?.user?.id) {
        return { success: false, message: "Nicht autorisiert." };
    }
    const userId = session.user.id;
    const userRole = session.user.role;

    try {
        // Update User's image URL if provided
        if (newImageUrl !== undefined) { // Check if explicitly passed (even if null)
            await prisma.user.update({
                where: { id: userId },
                data: { image: newImageUrl }, // Set to null if newImageUrl is null
            });
            console.log(`Updated profile image for user ${userId} to ${newImageUrl}`);
        }

        // Update role-specific profile
        if (userRole === UserRole.PATIENT) {
            const validatedFields = UpdatePatientProfileSchema.safeParse(formData);
            if (!validatedFields.success) {
                return {
                    success: false,
                    message: "Ungültige Eingabe.",
                    fieldErrors: validatedFields.error.flatten().fieldErrors,
                };
            }
            const { firstName, lastName, dob } = validatedFields.data;
            await prisma.patientProfile.update({
                where: { userId: userId },
                data: { firstName, lastName, dob: dob ?? null },
            });
             console.log(`Updated patient profile for user ${userId}`);

        } else if (userRole === UserRole.STUDENT) {
            const validatedFields = UpdateStudentProfileSchema.safeParse(formData);
            if (!validatedFields.success) {
                return {
                    success: false,
                    message: "Ungültige Eingabe.",
                    fieldErrors: validatedFields.error.flatten().fieldErrors,
                };
            }
             const { firstName, lastName, university, clinicalYear } = validatedFields.data;
             // IMPORTANT: Prevent students from editing verification status via this form
             await prisma.studentProfile.update({
                where: { userId: userId },
                data: { firstName, lastName, university, clinicalYear },
            });
             console.log(`Updated student profile for user ${userId}`);
        } else {
             return { success: false, message: "Unbekannte Benutzerrolle." };
        }

        // Revalidate the relevant profile page path
        const profilePath = userRole === UserRole.PATIENT ? '/patient/profil' : '/student/profil';
        revalidatePath(profilePath);
        // Also revalidate layout if header needs immediate image update (though session update might handle this)
        // revalidatePath('/');

        return { success: true, message: "Profil erfolgreich aktualisiert." };

    } catch (error) {
        console.error("Profile Update Error:", error);
        // Handle potential errors (e.g., profile not found, DB errors)
        return { success: false, message: "Profil konnte nicht aktualisiert werden. Bitte versuchen Sie es später erneut." };
    }
}
```

## File: `app/(auth)/forgot-password/page.tsx`

```tsx
// app/(auth)/forgot-password/page.tsx
'use client';

import React, { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RequestPasswordResetSchema } from '@/lib/validation'; // Import specific schema
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';
import { requestPasswordReset } from '@/actions/password-reset'; // Import the action
import * as z from 'zod';

type FormData = z.infer<typeof RequestPasswordResetSchema>;

export default function ForgotPasswordPage() {
    const [isPending, startTransition] = useTransition();
    const [message, setMessage] = useState<string | null>(null); // To display success/info message

    const form = useForm<FormData>({
        resolver: zodResolver(RequestPasswordResetSchema),
        defaultValues: { email: '' },
    });

    const onSubmit = (values: FormData) => {
        setMessage(null); // Clear previous message
        startTransition(async () => {
            const result = await requestPasswordReset(values);
            if (result.success) {
                 setMessage(result.message); // Display the success message
                 form.reset(); // Clear the form
                 toast.success("Anfrage gesendet", { description: result.message });
             } else {
                 toast.error("Fehler", { description: result.message || "Anfrage fehlgeschlagen." });
            }
        });
    };

    return (
        <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center">
            <Card className="w-full max-w-md mx-auto">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Passwort vergessen?</CardTitle>
                    <CardDescription>Geben Sie Ihre E-Mail-Adresse ein. Wir senden Ihnen einen Link zum Zurücksetzen Ihres Passworts.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                             <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>E-Mail</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="name@beispiel.de" {...field} disabled={isPending} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                             {message && (
                                <div className="text-sm text-green-600 bg-green-50 p-3 rounded-md border border-green-200">{message}</div>
                             )}

                             <Button type="submit" className="w-full" disabled={isPending}>
                                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Link anfordern
                            </Button>

                             <div className="text-center text-sm">
                                <Link href="/login" className="font-medium text-primary hover:underline">
                                    Zurück zum Login
                                </Link>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
```

## File: `app/(auth)/login/page.tsx`

```tsx
// app/(auth)/login/page.tsx
import AuthForm from '@/components/features/AuthForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function LoginPage() {
    return (
        <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center"> {/* Adjust min-height as needed */}
            <Card className="w-full max-w-md mx-auto">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Willkommen zurück!</CardTitle>
                    <CardDescription>Melden Sie sich bei Ihrem Murph-Konto an.</CardDescription>
                </CardHeader>
                <CardContent>
                    <AuthForm mode="login" />
                </CardContent>
            </Card>
        </div>
    );
}
```

## File: `app/(auth)/registrieren/page.tsx`

```tsx
// app/(auth)/registrieren/page.tsx
import AuthForm from '@/components/features/AuthForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function RegisterPage() {
    return (
         <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center py-8"> {/* Added padding */}
            <Card className="w-full max-w-lg mx-auto"> {/* Allow slightly wider card */}
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Konto erstellen</CardTitle>
                    <CardDescription>Registrieren Sie sich als Patient*in oder Medizinstudent*in.</CardDescription>
                </CardHeader>
                <CardContent>
                    <AuthForm mode="register" />
                </CardContent>
            </Card>
        </div>
    );
}
```

## File: `app/(auth)/reset-password/page.tsx`

```tsx
// app/(auth)/reset-password/page.tsx
'use client';

import React, { useState, useTransition, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ResetPasswordSchema } from '@/lib/validation'; // Import specific schema
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation'; // Import search params hook
import { resetPassword } from '@/actions/password-reset'; // Import the action
import * as z from 'zod';
import AnimatedCheckmark from '@/components/ui/AnimatedCheckmark';

type FormData = z.infer<typeof ResetPasswordSchema>;

export default function ResetPasswordPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token'); // Get token from URL query param

    const [isPending, startTransition] = useTransition();
    const [showSuccess, setShowSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null); // State for token validation errors

    const form = useForm<FormData>({
        resolver: zodResolver(ResetPasswordSchema),
        defaultValues: {
            token: token || '', // Pre-fill token from URL
            password: '',
            confirmPassword: '',
        },
    });

    // Effect to handle invalid/missing token on load
    useEffect(() => {
        if (!token) {
            setError("Ungültiger oder fehlender Link zum Zurücksetzen des Passworts.");
            toast.error("Fehler", { description: "Der Link zum Zurücksetzen ist ungültig oder fehlt." });
        }
    }, [token]);

    const onSubmit = (values: FormData) => {
        setError(null); // Clear previous errors
        setShowSuccess(false);
        startTransition(async () => {
            const result = await resetPassword(values);
            if (result.success) {
                setShowSuccess(true);
                toast.success("Passwort zurückgesetzt!", { description: result.message });
                setTimeout(() => {
                    router.push('/login'); // Redirect to login after success
                }, 1500);
             } else {
                 toast.error("Fehler", { description: result.message || "Passwort konnte nicht zurückgesetzt werden." });
                 // Optionally set specific field errors if returned
                 if (result.fieldErrors?.token) {
                     setError(result.fieldErrors.token.join(', ')); // Show token error separately
                 }
                 if (result.fieldErrors?.password) {
                     form.setError('password', { type: 'server', message: result.fieldErrors.password.join(', ') });
                 }
                 if (result.fieldErrors?.confirmPassword) {
                     form.setError('confirmPassword', { type: 'server', message: result.fieldErrors.confirmPassword.join(', ') });
                 }
            }
        });
    };

    // Disable form if token is invalid/missing
    const isFormDisabled = isPending || showSuccess || !token || !!error;

    return (
        <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center">
            <Card className="w-full max-w-md mx-auto">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Neues Passwort festlegen</CardTitle>
                    <CardDescription>Geben Sie Ihr neues Passwort ein.</CardDescription>
                </CardHeader>
                <CardContent>
                    {error && ( // Display token error prominently
                        <div className="mb-4 text-sm text-destructive bg-destructive/10 p-3 rounded-md border border-destructive/20">{error}</div>
                    )}
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            {/* Hidden field for token (already pre-filled) */}
                            <input type="hidden" {...form.register('token')} />

                             <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Neues Passwort</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="********" {...field} disabled={isFormDisabled} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Neues Passwort bestätigen</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="********" {...field} disabled={isFormDisabled} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                             <Button type="submit" className="w-full" disabled={isFormDisabled} animateInteraction={!isFormDisabled}>
                                {showSuccess ? (
                                    <AnimatedCheckmark />
                                ) : isPending ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : null}
                                {!showSuccess && 'Passwort speichern'}
                            </Button>

                            {showSuccess && (
                                 <div className="text-center text-sm text-green-600">
                                     Passwort erfolgreich geändert. Sie werden weitergeleitet...
                                 </div>
                             )}

                             {!showSuccess && (
                                <div className="text-center text-sm">
                                    <Link href="/login" className="font-medium text-primary hover:underline">
                                        Zurück zum Login
                                    </Link>
                                </div>
                             )}
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
```

## File: `app/(landing)/page.tsx`

```tsx
// app/(landing)/page.tsx
'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import TrustBadge from "@/components/core/TrustBadge";
import {
  ShieldCheck,
  LockKeyhole,
  GraduationCap,
  FileQuestion,
  MessagesSquare,
  HeartHandshake,
  Sparkles,
  Clock,
  Briefcase,
  CheckCircle,
  User,
  ArrowRight,
  DollarSign,
  Search,
  FileText
} from 'lucide-react';
import { motion } from "framer-motion";
import Image from "next/image";

// --- Animation Variants ---
const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    }
  }
};
// --- ---

export default function LandingPage() {
  console.log("Rendering LandingPage (Enhanced Backgrounds)");

  return (
    <div className="w-full bg-white"> {/* Base background */}

      {/* Hero Section */}
      <section className="w-full py-24 md:py-32 lg:py-40 text-center relative overflow-hidden bg-gradient-to-br from-cyan-50 via-blue-50 to-teal-50">
        {/* Blurred background shapes */}
        <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-brand-primary/10 rounded-full filter blur-3xl opacity-50 animate-pulse"></div>
          <div className="absolute -bottom-40 -right-20 w-80 h-80 bg-blue-400/10 rounded-full filter blur-3xl opacity-60 animate-pulse animation-delay-2000"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainerVariants}
          >
            <motion.h1
              variants={fadeInUpVariants}
              className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl mb-4 text-gray-900"
            >
              Medizinische Erklärungen von <span className="text-brand-primary">Medizinstudenten</span>
            </motion.h1>

            <motion.p
              variants={fadeInUpVariants}
              className="max-w-[750px] mx-auto text-lg text-gray-600 md:text-xl mb-8"
            >
              Erhalten Sie schnelle, verständliche Erklärungen zu Ihren medizinischen Fragen und Befunden – vertraulich, sicher und direkt von verifizierten Medizinstudenten.
            </motion.p>

            <motion.div
              variants={fadeInUpVariants}
              className="mb-8 inline-block bg-orange-100 text-orange-800 px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm"
            >
              Wichtig: Nur Erklärungen – Keine Diagnose oder Behandlungsempfehlung!
            </motion.div>

            <motion.div
              variants={fadeInUpVariants}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              {/* Apply animateInteraction to Hero buttons */}
              <Link href="/registrieren?role=PATIENT">
                <Button size="lg" animateInteraction>
                  Für Patienten
                </Button>
              </Link>
              <Link href="/registrieren?role=STUDENT">
                <Button size="lg" variant="outline" className="bg-white/50 backdrop-blur-sm" animateInteraction>
                  Für Medizinstudenten
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <motion.section
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={fadeInUpVariants}
        className="w-full py-16 md:py-24 bg-white" // Keep white for contrast
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
            <motion.div variants={fadeInUpVariants}>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-gray-800">Gesundheit verstehen, Sorgen nehmen.</h2>
              <p className="text-lg text-gray-600 mb-6">
                Zwischen langen Wartezeiten, kurzen Arztterminen und komplexem Fachjargon bleiben oft Fragen offen. Murph überbrückt diese Lücke und bietet Ihnen leicht zugängliche, verständliche Erklärungen von Medizinstudenten, die sich Zeit für Sie nehmen.
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center gap-3">
                  <Search className="h-5 w-5 text-brand-primary flex-shrink-0" />
                  <span>Unklare Befunde endlich nachvollziehen.</span>
                </li>
                <li className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-brand-primary flex-shrink-0" />
                  <span>Medizinische Dokumente besser verstehen.</span>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-brand-primary flex-shrink-0" />
                  <span>Schnelle Klärung ohne Terminhatz.</span>
                </li>
              </ul>
            </motion.div>
            <motion.div variants={fadeInUpVariants} className="relative aspect-video rounded-xl overflow-hidden shadow-xl group border"> {/* Enhanced styling */}
              <Image
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNjU5N3wwfDF8c2VhcmNofDF8fGRvY3RvciUyMGxhcHRvcCUyMGRhdGF8ZW58MHx8fHwxNzEyMjQ4ODUwfDA&ixlib=rb-4.0.3&q=80&w=1080"
                alt="Person schaut auf medizinische Daten auf einem Laptop"
                fill
                sizes="(max-width: 768px) 100vw, 50vw" // Simplified sizes
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* How it Works Section */}
      <motion.section
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={fadeInUpVariants}
        // Using a light tint of brand primary (adjust HSL values in tailwind.config or use direct color like bg-teal-50)
        className="w-full py-16 md:py-24 bg-gradient-to-b from-teal-50/50 via-white to-teal-50/50"
      >
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tight text-center sm:text-4xl mb-16 text-gray-900">So einfach funktioniert's</h2>
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            {/* Step 1 */}
            <motion.div variants={fadeInUpVariants} className="flex flex-col items-center text-center p-8 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-white border border-gray-100">
              <div className="mb-5 rounded-full bg-brand-primary/10 p-4 text-brand-primary">
                <FileQuestion className="h-9 w-9" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">1. Anfrage stellen</h3>
              <p className="text-gray-600">Beschreiben Sie Ihre Frage oder laden Sie relevante Dokumente (z.B. Befunde) sicher hoch.</p>
            </motion.div>
            {/* Step 2 */}
            <motion.div variants={fadeInUpVariants} className="flex flex-col items-center text-center p-8 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-white border border-gray-100">
              <div className="mb-5 rounded-full bg-brand-primary/10 p-4 text-brand-primary">
                <MessagesSquare className="h-9 w-9" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">2. Erklärung erhalten</h3>
              <p className="text-gray-600">Ein verifizierter Medizinstudent nimmt Ihre Anfrage an und erklärt Ihnen alles verständlich im sicheren Chat.</p>
            </motion.div>
            {/* Step 3 */}
            <motion.div variants={fadeInUpVariants} className="flex flex-col items-center text-center p-8 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-2 bg-white border border-gray-100">
              <div className="mb-5 rounded-full bg-brand-primary/10 p-4 text-brand-primary">
                <HeartHandshake className="h-9 w-9" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">3. Sicher fühlen</h3>
              <p className="text-gray-600">Gewinnen Sie Klarheit und Sicherheit im Umgang mit medizinischen Informationen – vertraulich und kompetent.</p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Benefits Section */}
      <motion.section
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={fadeInUpVariants}
        className="w-full py-16 md:py-24 bg-white" // Back to white
      >
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tight text-center sm:text-4xl mb-16 text-gray-900">Ihre Vorteile mit Murph</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto">

            {/* Patient Benefits */}
            <motion.div variants={fadeInUpVariants} className="p-8 rounded-lg bg-teal-50/40 border border-teal-100 shadow-sm"> {/* Added padding/shadow */}
              <h3 className="flex items-center text-2xl font-semibold mb-6 text-gray-800">
                <User className="mr-3 h-7 w-7 text-brand-primary" />
                Für Patienten
              </h3>
              <motion.ul
                variants={staggerContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="space-y-4"
              >
                {/* Benefit List Items - styling adjusted slightly */}
                <motion.li variants={fadeInUpVariants} className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 mt-0.5 text-green-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-800">Schnelle Antworten</h4>
                    <p className="text-sm text-gray-600">Erhalten Sie zeitnah verständliche Erklärungen, ohne lange Wartezeiten.</p>
                  </div>
                </motion.li>
                <motion.li variants={fadeInUpVariants} className="flex items-start gap-4">
                  <Sparkles className="h-6 w-6 mt-0.5 text-yellow-500 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-800">Klare Sprache</h4>
                    <p className="text-sm text-gray-600">Medizinstudenten erklären komplexe Sachverhalte ohne Fachjargon.</p>
                  </div>
                </motion.li>
                <motion.li variants={fadeInUpVariants} className="flex items-start gap-4">
                  <FileQuestion className="h-6 w-6 mt-0.5 text-blue-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-800">Befunde verstehen</h4>
                    <p className="text-sm text-gray-600">Laden Sie Dokumente hoch und lassen Sie sich den Inhalt erklären.</p>
                  </div>
                </motion.li>
                <motion.li variants={fadeInUpVariants} className="flex items-start gap-4">
                  <LockKeyhole className="h-6 w-6 mt-0.5 text-gray-700 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-800">Vertraulich & Sicher</h4>
                    <p className="text-sm text-gray-600">Ihre Daten und Anfragen werden streng vertraulich behandelt.</p>
                  </div>
                </motion.li>
              </motion.ul>
            </motion.div>

            {/* Student Benefits */}
            <motion.div variants={fadeInUpVariants} className="p-8 rounded-lg bg-indigo-50/40 border border-indigo-100 shadow-sm"> {/* Added padding/shadow */}
              <h3 className="flex items-center text-2xl font-semibold mb-6 text-gray-800">
                <GraduationCap className="mr-3 h-7 w-7 text-brand-secondary" />
                Für Medizinstudenten
              </h3>
              <motion.ul
                variants={staggerContainerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="space-y-4"
              >
                {/* Benefit List Items - styling adjusted slightly */}
                <motion.li variants={fadeInUpVariants} className="flex items-start gap-4">
                  <Briefcase className="h-6 w-6 mt-0.5 text-indigo-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-800">Praktische Erfahrung</h4>
                    <p className="text-sm text-gray-600">Wenden Sie Ihr Wissen an und verbessern Sie Ihre Kommunikationsfähigkeiten.</p>
                  </div>
                </motion.li>
                <motion.li variants={fadeInUpVariants} className="flex items-start gap-4">
                  <Clock className="h-6 w-6 mt-0.5 text-teal-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-800">Flexible Zeiteinteilung</h4>
                    <p className="text-sm text-gray-600">Arbeiten Sie, wann und wo es in Ihren Studienplan passt.</p>
                  </div>
                </motion.li>
                <motion.li variants={fadeInUpVariants} className="flex items-start gap-4">
                  <HeartHandshake className="h-6 w-6 mt-0.5 text-rose-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-800">Sinnvoller Beitrag</h4>
                    <p className="text-sm text-gray-600">Helfen Sie Patienten, ihre Gesundheit besser zu verstehen und entlasten Sie das System.</p>
                  </div>
                </motion.li>
                <motion.li variants={fadeInUpVariants} className="flex items-start gap-4">
                  <DollarSign className="h-6 w-6 mt-0.5 text-lime-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-gray-800">Faire Vergütung</h4>
                    <p className="text-sm text-gray-600">Erhalten Sie eine angemessene Bezahlung für Ihre wertvolle Zeit und Expertise.</p>
                  </div>
                </motion.li>
              </motion.ul>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Trust & Security Section */}
      <motion.section
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={fadeInUpVariants}
        // Using a subtle grey gradient
        className="w-full py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white"
      >
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6 text-gray-900">Vertrauen und Sicherheit an erster Stelle</h2>
          <p className="max-w-3xl mx-auto text-gray-600 md:text-lg mb-16">
            Wir wissen, wie sensibel medizinische Informationen sind. Deshalb legen wir höchsten Wert auf den Schutz Ihrer Daten und die Vertraulichkeit Ihrer Anfragen.
          </p>
          <motion.div
            variants={staggerContainerVariants}
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto mb-12"
          >
            <motion.div variants={fadeInUpVariants}>
              <TrustBadge icon={LockKeyhole} iconColor="text-blue-600" title="Streng Vertraulich" description="Alle Anfragen werden absolut vertraulich behandelt. Unsere Studenten unterliegen sinngemäß der ärztlichen Schweigepflicht." />
            </motion.div>
            <motion.div variants={fadeInUpVariants}>
              <TrustBadge icon={ShieldCheck} iconColor="text-green-600" title="Höchste Datensicherheit" description="Moderne Verschlüsselung und sichere Infrastruktur (gehostet auf Vercel in der EU) schützen Ihre Daten." />
            </motion.div>
            <motion.div variants={fadeInUpVariants}>
              <TrustBadge icon={GraduationCap} iconColor="text-indigo-600" title="Verifizierte Studenten" description="Wir prüfen die Immatrikulation und den Fortschritt unserer Medizinstudenten sorgfältig." />
            </motion.div>
          </motion.div>
          <motion.p
            variants={fadeInUpVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
            className="text-base font-semibold text-orange-800 bg-orange-100 px-5 py-2 rounded-full inline-block shadow-sm"
          >
            Wichtiger Hinweis: Murph bietet ausschließlich Erklärungen und keine Diagnosen oder Behandlungsempfehlungen!
          </motion.p>
        </div>
      </motion.section>

      {/* Final CTA Section */}
      <motion.section
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={fadeInUpVariants}
        className="w-full py-20 md:py-32 text-center bg-white" // Keep final CTA clean
      >
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6 text-gray-900">Bereit für mehr Klarheit?</h2>
          <p className="max-w-xl mx-auto text-gray-600 md:text-lg mb-8">
            Registrieren Sie sich jetzt kostenlos als Patient oder werden Sie Teil unseres Teams als Medizinstudent.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {/* animateInteraction already present */}
            <Link href="/registrieren?role=PATIENT">
              <Button size="lg" animateInteraction>
                Jetzt als Patient starten <ArrowRight className="ml-2 h-5 w-5"/>
              </Button>
            </Link>
            <Link href="/registrieren?role=STUDENT">
              <Button size="lg" variant="secondary" animateInteraction>
                Als Student bewerben <GraduationCap className="ml-2 h-5 w-5"/>
              </Button>
            </Link>
          </div>
        </div>
      </motion.section>

    </div>
  );
}
```

## File: `app/admin/AdminConsultationTable.tsx`

```tsx
// components/admin/AdminConsultationTable.tsx
'use client';

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import type { AdminConsultationView } from '@/app/admin/consultations/page'; // Import type
import { CONSULTATION_STATUS_LABELS, CONSULTATION_STATUS_COLORS } from '@/lib/constants';
import { cn } from '@/lib/utils';


interface AdminConsultationTableProps {
  consultations: AdminConsultationView[];
}

export default function AdminConsultationTable({ consultations }: AdminConsultationTableProps) {

  const getPatientName = (consultation: AdminConsultationView): string => {
    return consultation.patient?.patientProfile
        ? `${consultation.patient.patientProfile.firstName} ${consultation.patient.patientProfile.lastName}`
        : consultation.patient.email;
  }
  const getStudentName = (consultation: AdminConsultationView): string => {
    return consultation.student?.studentProfile
        ? `${consultation.student.studentProfile.firstName} ${consultation.student.studentProfile.lastName}`
        : (consultation.student?.email ?? '-'); // Show '-' if no student assigned
  }

  return (
     <div className="border rounded-lg overflow-hidden"> {/* Added border & overflow */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden sm:table-cell w-[130px]">ID</TableHead>
              <TableHead>Thema</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead className="hidden md:table-cell">Student</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden lg:table-cell">Erstellt am</TableHead>
              <TableHead className="text-right">Aktion</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {consultations.length === 0 && (
                <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                        Keine Beratungen gefunden für die aktuelle Filterauswahl.
                    </TableCell>
                </TableRow>
            )}
            {consultations.map((consultation) => (
              <TableRow key={consultation.id}>
                <TableCell className="font-mono text-xs hidden sm:table-cell">{consultation.id}</TableCell>
                <TableCell className="font-medium">{consultation.topic}</TableCell>
                <TableCell>{getPatientName(consultation)}</TableCell>
                <TableCell className="hidden md:table-cell">{getStudentName(consultation)}</TableCell>
                <TableCell>
                    <Badge variant="outline" className={cn("border text-xs", CONSULTATION_STATUS_COLORS[consultation.status] || 'bg-gray-100 text-gray-800 border-gray-300')}>
                        {CONSULTATION_STATUS_LABELS[consultation.status] || consultation.status}
                    </Badge>
                </TableCell>
                <TableCell className="hidden lg:table-cell">{format(new Date(consultation.createdAt), 'dd.MM.yyyy', { locale: de })}</TableCell>
                <TableCell className="text-right">
                    {/* Link to respective detail page - Admin view might need specific permissions later */}
                    <Button variant="ghost" size="sm" asChild>
                        <Link href={
                            // Link to student view if assigned, otherwise patient view
                             consultation.studentId
                             ? `/student/beratungen/${consultation.id}`
                             : `/patient/beratungen/${consultation.id}`
                         } target="_blank" rel="noopener noreferrer"> {/* Open in new tab */}
                             Details <ArrowRight className="ml-1 h-3 w-3" />
                         </Link>
                     </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
    </div>
  );
}
```

## File: `app/admin/consultations/[consultationId]/page.tsx`

```tsx
// app/admin/consultations/[consultationId]/page.tsx
import React from 'react';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { notFound, redirect } from 'next/navigation';
import ChatInterface from '@/components/features/ChatInterface';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, User, Users, FileText, Info, Star, MessageSquareQuote } from 'lucide-react'; // <<< Added Icons
import { ConsultationStatus, UserRole } from '@prisma/client';
import { cn } from '@/lib/utils';
import { CONSULTATION_STATUS_LABELS, CONSULTATION_STATUS_COLORS } from '@/lib/constants';
import DocumentLink from '@/components/features/DocumentLink';

// Helper to display stars
const RatingDisplay = ({ rating }: { rating: number | null | undefined }) => {
    if (rating === null || rating === undefined) return <span className="text-sm text-muted-foreground italic">Keine Bewertung</span>;
    return (
        <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
                <Star
                    key={i}
                    className={cn(
                        "w-4 h-4", // Slightly larger stars
                        i < rating ? "fill-yellow-400 text-yellow-500" : "fill-muted stroke-muted-foreground/50"
                    )}
                />
            ))}
            <span className="text-sm font-medium ml-1">({rating}/5)</span>
        </div>
    );
};

// Server-side function to fetch data (Admin perspective)
async function getConsultationDataForAdmin(consultationId: string) {
  try {
      const consultation = await prisma.consultation.findUnique({
        where: { id: consultationId },
        include: {
          messages: { orderBy: { createdAt: 'asc' }, include: { sender: { select: { id: true, role: true, image: true, patientProfile: { select: { firstName: true, lastName: true } }, studentProfile: { select: { firstName: true, lastName: true } }, } } } },
          documents: { orderBy: { createdAt: 'asc' } },
          patient: { include: { patientProfile: { select: { firstName: true, lastName: true } }, select: { email: true, role: true } } },
          student: { include: { studentProfile: { select: { firstName: true, lastName: true, university: true } }, select: { email: true, role: true } } }
        }
      });
      return consultation;
  } catch (error) {
      console.error(`Error fetching admin consultation data for ID ${consultationId}:`, error);
      return null;
  }
}


// The main Server Component for the admin detail page
export default async function AdminConsultationDetailPage({ params }: { params: { consultationId: string } }) {
  const { consultationId } = params;
  const session = await auth(); // Required for layout check, might be useful here later

  const consultation = await getConsultationDataForAdmin(consultationId);

  if (!consultation) {
    notFound();
  }

  // Data Preparation for ChatInterface
  const initialMessages = consultation.messages.map(msg => {
     const senderProfile = msg.sender.role === UserRole.PATIENT ? msg.sender.patientProfile : msg.sender.studentProfile;
     return { id: msg.id, content: msg.content, createdAt: msg.createdAt.toISOString(), sender: { id: msg.sender.id, role: msg.sender.role, firstName: senderProfile?.firstName ?? 'Nutzer', lastName: senderProfile?.lastName ?? '', image: msg.sender.image, } };
  });

  const initialDocuments = consultation.documents.map(doc => ({ id: doc.id, fileName: doc.fileName, storageUrl: doc.storageUrl, mimeType: doc.mimeType, fileSize: doc.fileSize, }));

  const patientName = consultation.patient?.patientProfile ? `${consultation.patient.patientProfile.firstName} ${consultation.patient.patientProfile.lastName}` : consultation.patient.email;
  const studentName = consultation.student?.studentProfile ? `${consultation.student.studentProfile.firstName} ${consultation.student.studentProfile.lastName}` : 'Nicht zugewiesen';

  return (
    <div className="space-y-6">
        {/* Back Button & Header */}
       <div className="flex items-center justify-between mb-4">
            <Button variant="outline" size="sm" asChild>
                <Link href="/admin/consultations">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Zurück zur Übersicht
                </Link>
            </Button>
            <span className={cn("px-2 py-0.5 rounded text-xs font-medium border", CONSULTATION_STATUS_COLORS[consultation.status] || 'bg-gray-100 text-gray-800 border-gray-300' )}>
                {CONSULTATION_STATUS_LABELS[consultation.status] || consultation.status}
            </span>
        </div>

        {/* Consultation Info Card */}
        <Card>
            <CardHeader>
            <CardTitle className="text-xl">Beratung: {consultation.topic}</CardTitle>
            <CardDescription className="flex flex-col sm:flex-row sm:flex-wrap gap-x-4 gap-y-1 text-xs pt-1">
                 <span className="flex items-center"><User className="w-3 h-3 mr-1.5"/>Patient: {patientName} <code className="ml-1 text-muted-foreground/80">({consultation.patient.email})</code></span>
                 <span className="flex items-center"><Users className="w-3 h-3 mr-1.5"/>Student: {studentName} {consultation.student ? <code className="ml-1 text-muted-foreground/80">({consultation.student.email})</code> : ''}</span>
                 <span className="flex items-center"><Info className="w-3 h-3 mr-1.5"/>ID: <code className="text-xs">{consultation.id}</code></span>
            </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <h4 className="font-medium mb-1 text-sm">Ursprüngliche Frage</h4>
                    <p className="text-sm text-muted-foreground p-3 border rounded bg-muted/50 whitespace-pre-wrap">{consultation.patientQuestion}</p>
                </div>
                 {initialDocuments.length > 0 && (
                    <div>
                        <h4 className="font-medium mb-1 text-sm">Dokumente</h4>
                        <div className="space-y-2">
                            {initialDocuments.map(doc => <DocumentLink key={doc.id} document={doc} />)}
                        </div>
                    </div>
                 )}
                 {consultation.summary && (
                    <div>
                         <h4 className="font-medium mb-1 text-sm">Zusammenfassung (Student)</h4>
                         <p className="text-sm text-muted-foreground p-3 border rounded bg-muted/50 whitespace-pre-wrap">{consultation.summary}</p>
                    </div>
                 )}
                 {/* <<< Display Patient Feedback >>> */}
                  {consultation.status === ConsultationStatus.COMPLETED && (
                    <div className="pt-4 border-t">
                        <h4 className="font-medium mb-2 text-sm">Patientenfeedback</h4>
                        <div className="flex items-center mb-2">
                            <span className="text-sm mr-2">Bewertung:</span>
                            <RatingDisplay rating={consultation.patientRating} />
                        </div>
                        {consultation.patientFeedback ? (
                             <div>
                                 <span className="text-sm mr-2">Kommentar:</span>
                                 <p className="text-sm text-muted-foreground p-3 border rounded bg-muted/50 whitespace-pre-wrap mt-1">{consultation.patientFeedback}</p>
                             </div>
                        ) : (
                            <p className="text-sm text-muted-foreground italic">Kein schriftliches Feedback abgegeben.</p>
                        )}
                    </div>
                 )}
                 {/* <<< End Patient Feedback >>> */}
            </CardContent>
        </Card>

        {/* Chat History Card */}
        <Card className="flex flex-col overflow-hidden">
            <CardHeader>
                <CardTitle>Chatverlauf</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow p-0 md:p-6 md:pt-0">
                    <ChatInterface
                        consultationId={consultation.id}
                        // Pass a non-participant ID to ensure read-only if ChatInterface uses it
                        currentUserId={"ADMIN_VIEWER"}
                        initialMessages={initialMessages}
                        initialDocuments={[]} // Documents shown above
                        consultationStatus={consultation.status} // Status still important for UI state
                    />
            </CardContent>
        </Card>
    </div>
  );
}
```

## File: `app/admin/consultations/page.tsx`

```tsx
// app/admin/consultations/page.tsx
import React, { Suspense } from 'react';
import prisma from '@/lib/prisma';
import { ConsultationStatus, Consultation, PatientProfile, StudentProfile, User } from '@prisma/client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import AdminConsultationTable from '@/components/admin/AdminConsultationTable'; // Create this next
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// Type for consultation view in admin
export type AdminConsultationView = Consultation & {
    patient: User & { patientProfile: PatientProfile | null };
    student: (User & { studentProfile: StudentProfile | null }) | null; // Student can be null
};

async function getConsultationsForAdmin(filter?: string): Promise<AdminConsultationView[]> {
     let whereCondition: any = {};
      // Example filter
     if (filter === 'active') {
         whereCondition = {
             status: {
                 in: [ConsultationStatus.REQUESTED, ConsultationStatus.IN_PROGRESS]
             }
         };
     } else if (Object.values(ConsultationStatus).includes(filter as ConsultationStatus)) {
         whereCondition = { status: filter as ConsultationStatus };
     }


    const consultations = await prisma.consultation.findMany({
         where: whereCondition,
        include: {
            patient: { include: { patientProfile: true } },
            student: { include: { studentProfile: true } },
        },
        orderBy: {
            createdAt: 'desc',
        }
    });
    return consultations as AdminConsultationView[];
}

// Loading Skeleton
const TableSkeleton = () => (
    <div className="space-y-2 mt-4">
        <Skeleton className="h-10 w-full rounded-md" />
        <Skeleton className="h-10 w-full rounded-md" />
        <Skeleton className="h-10 w-full rounded-md" />
        <Skeleton className="h-10 w-full rounded-md" />
        <Skeleton className="h-10 w-full rounded-md" />
    </div>
);

export default async function AdminConsultationsPage({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
    const filter = searchParams?.filter as string | undefined;
    const consultations = await getConsultationsForAdmin(filter);

    const getFilterDescription = () => {
        switch(filter) {
            case 'active': return 'Filter: Aktive (Angefragt & Laufend).';
            case ConsultationStatus.REQUESTED: return 'Filter: Nur Angefragt.';
            case ConsultationStatus.IN_PROGRESS: return 'Filter: Nur Laufend.';
            case ConsultationStatus.COMPLETED: return 'Filter: Nur Abgeschlossen.';
            default: return 'Alle Beratungen im System.';
        }
    }

    return (
        <Card>
            <CardHeader>
                 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                     <div>
                        <CardTitle>Beratungsübersicht</CardTitle>
                        <CardDescription>
                            {getFilterDescription()}
                        </CardDescription>
                    </div>
                    {/* Simple Filter Links */}
                    <div className="flex gap-2 flex-wrap">
                        <Button size="sm" variant={!filter ? "secondary" : "outline"} asChild>
                            <Link href="/admin/consultations">Alle</Link>
                        </Button>
                         <Button size="sm" variant={filter === 'active' ? "secondary" : "outline"} asChild>
                            <Link href="/admin/consultations?filter=active">Aktive</Link>
                        </Button>
                         <Button size="sm" variant={filter === ConsultationStatus.REQUESTED ? "secondary" : "outline"} asChild>
                            <Link href={`/admin/consultations?filter=${ConsultationStatus.REQUESTED}`}>Angefragt</Link>
                        </Button>
                        <Button size="sm" variant={filter === ConsultationStatus.IN_PROGRESS ? "secondary" : "outline"} asChild>
                            <Link href={`/admin/consultations?filter=${ConsultationStatus.IN_PROGRESS}`}>Laufend</Link>
                        </Button>
                        <Button size="sm" variant={filter === ConsultationStatus.COMPLETED ? "secondary" : "outline"} asChild>
                            <Link href={`/admin/consultations?filter=${ConsultationStatus.COMPLETED}`}>Abgeschlossen</Link>
                        </Button>
                    </div>
                 </div>
            </CardHeader>
            <CardContent>
                <Suspense fallback={<TableSkeleton />}>
                    <AdminConsultationTable consultations={consultations} />
                </Suspense>
            </CardContent>
        </Card>
    );
}
```

## File: `app/admin/dashboard/page.tsx`

```tsx
// app/admin/dashboard/page.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import prisma from '@/lib/prisma';
import { UserRole, ConsultationStatus } from '@prisma/client';
import { Users, FileText, UserCheck, Clock } from 'lucide-react';
import Link from 'next/link';

// Simple Stats Card Component (can be moved to components/admin later)
const AdminStatsCard = ({ title, value, icon: Icon, description, link }: { title: string, value: number | string, icon: React.ElementType, description?: string, link?: string }) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{value}</div>
            {description && <p className="text-xs text-muted-foreground">{description}</p>}
            {link && (
                <Link href={link} className="text-xs text-primary hover:underline mt-1 block">
                    Details anzeigen
                </Link>
            )}
        </CardContent>
    </Card>
);

async function getAdminStats() {
    const totalUsers = await prisma.user.count();
    const patientCount = await prisma.user.count({ where: { role: UserRole.PATIENT } });
    const studentCount = await prisma.user.count({ where: { role: UserRole.STUDENT } });
    const unverifiedStudents = await prisma.studentProfile.count({ where: { isVerified: false } });

    const requestedConsultations = await prisma.consultation.count({ where: { status: ConsultationStatus.REQUESTED } });
    const inProgressConsultations = await prisma.consultation.count({ where: { status: ConsultationStatus.IN_PROGRESS } });
    const completedConsultations = await prisma.consultation.count({ where: { status: ConsultationStatus.COMPLETED } });
    const totalConsultations = requestedConsultations + inProgressConsultations + completedConsultations; // Add other statuses if needed

    return {
        totalUsers,
        patientCount,
        studentCount,
        unverifiedStudents,
        requestedConsultations,
        inProgressConsultations,
        completedConsultations,
        totalConsultations,
    };
}

export default async function AdminDashboardPage() {
    const stats = await getAdminStats();

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight">Übersicht</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <AdminStatsCard title="Benutzer Gesamt" value={stats.totalUsers} icon={Users} description={`${stats.patientCount} Patienten, ${stats.studentCount} Studenten`} link="/admin/users"/>
                <AdminStatsCard title="Verifizierung Ausstehend" value={stats.unverifiedStudents} icon={UserCheck} description="Studenten zur Prüfung" link="/admin/users?filter=unverified"/>
                <AdminStatsCard title="Beratungen Gesamt" value={stats.totalConsultations} icon={FileText} description="Angefragt, Laufend, Abgeschlossen" link="/admin/consultations"/>
                 <AdminStatsCard title="Aktive Anfragen" value={stats.requestedConsultations + stats.inProgressConsultations} icon={Clock} description={`${stats.requestedConsultations} Angefragt, ${stats.inProgressConsultations} Laufend`} link="/admin/consultations?filter=active"/>
            </div>

             {/* Optionally add more sections, e.g., recent activity */}
             {/* Example: Placeholder for recent unverified students */}
              {/* <Card>
                 <CardHeader>
                     <CardTitle>Kürzlich registrierte, unbestätigte Studenten</CardTitle>
                 </CardHeader>
                 <CardContent>
                     <p className="text-sm text-muted-foreground">Liste hier anzeigen...</p>
                 </CardContent>
             </Card> */}
        </div>
    );
}
```

## File: `app/admin/layout.tsx`

```tsx
// app/admin/layout.tsx
import React from 'react';
import { auth } from '@/lib/auth'; // <<< Make sure it's this import
import { redirect } from 'next/navigation';
import { UserRole } from '@prisma/client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Users, FileText } from 'lucide-react';
import UserMenuButton from '@/components/core/UserMenuButton';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth(); // Get session data with role

  // 1. Check if logged in
  if (!session?.user) {
      redirect('/login?callbackUrl=/admin/dashboard');
      return null;
  }

  // 2. Check if user is ADMIN - This logic was correct
  if (session.user.role !== UserRole.ADMIN) {
     console.warn(`AdminLayout: User ${session.user.id} is not an admin. Redirecting.`);
     const redirectUrl = session.user.role === UserRole.PATIENT ? '/patient/dashboard' : session.user.role === UserRole.STUDENT ? '/student/dashboard' : '/';
     redirect(redirectUrl);
     return null;
  }

  const user = session.user;

  // Render admin layout
  return (
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
          {/* --- Sidebar --- */}
          <aside className="hidden border-r bg-muted/40 md:block">
              <div className="flex h-full max-h-screen flex-col gap-2 sticky top-0">
                  <div className="flex h-16 items-center border-b px-4 lg:px-6">
                      <Link href="/admin/dashboard" className="flex items-center gap-2 font-semibold">
                          <LayoutDashboard className="h-6 w-6" />
                          <span className="">Admin Konsole</span>
                      </Link>
                  </div>
                  <div className="flex-1 overflow-auto py-2">
                      <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                          {/* Add logic here later to highlight active link */}
                          <Link href="/admin/dashboard" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                              <LayoutDashboard className="h-4 w-4" />
                              Dashboard
                          </Link>
                          <Link href="/admin/users" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                              <Users className="h-4 w-4" />
                              Benutzer
                          </Link>
                          <Link href="/admin/consultations" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                              <FileText className="h-4 w-4" />
                              Beratungen
                          </Link>
                      </nav>
                  </div>
              </div>
          </aside>

          {/* --- Main Content Area --- */}
          <div className="flex flex-col">
              {/* --- Header --- */}
               <header className="flex h-16 items-center gap-4 border-b bg-background px-4 lg:px-6 sticky top-0 z-30">
                   <div className="flex-1">
                        {/* Mobile Nav Trigger Placeholder */}
                   </div>
                   <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                        <UserMenuButton user={user} />
                   </div>
               </header>
               {/* --- Page Content --- */}
               <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-muted/40">
                  {children}
              </main>
           </div>
      </div>
  );
}
```

## File: `app/admin/users/page.tsx`

```tsx
// app/admin/users/page.tsx
import React, { Suspense } from 'react';
import prisma from '@/lib/prisma';
import { UserRole, User, PatientProfile, StudentProfile } from '@prisma/client';
import AdminUserTable from '@/components/admin/AdminUserTable';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { Button } from '@/components/ui/button'; // Import Button for filter links

// Define type for user data including profiles
export type AdminUserView = User & {
    patientProfile: PatientProfile | null;
    studentProfile: StudentProfile | null;
}

async function getUsersForAdmin(filter?: string): Promise<AdminUserView[]> {
     let whereCondition: any = {};
     // Handle unverified student filter
     if (filter === 'unverified') {
         whereCondition = {
             role: UserRole.STUDENT,
             studentProfile: {
                 isVerified: false
             }
         };
     } else if (filter === 'students') {
          whereCondition = { role: UserRole.STUDENT };
     } else if (filter === 'patients') {
          whereCondition = { role: UserRole.PATIENT };
     }

    const users = await prisma.user.findMany({
        where: whereCondition,
        include: {
            patientProfile: true,
            studentProfile: true,
        },
        orderBy: {
            createdAt: 'desc',
        }
    });
    return users as AdminUserView[];
}

// Loading Skeleton for the table
const TableSkeleton = () => (
    <div className="space-y-2 mt-4">
        <Skeleton className="h-10 w-full rounded-md" />
        <Skeleton className="h-10 w-full rounded-md" />
        <Skeleton className="h-10 w-full rounded-md" />
        <Skeleton className="h-10 w-full rounded-md" />
        <Skeleton className="h-10 w-full rounded-md" />
    </div>
);

export default async function AdminUsersPage({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
    const filter = searchParams?.filter as string | undefined;
    const users = await getUsersForAdmin(filter);

    const getFilterDescription = () => {
        switch(filter) {
            case 'unverified': return 'Filter: Nur unbestätigte Studenten.';
            case 'students': return 'Filter: Nur Studenten.';
            case 'patients': return 'Filter: Nur Patienten.';
            default: return 'Alle registrierten Benutzer.';
        }
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <CardTitle>Benutzerverwaltung</CardTitle>
                        <CardDescription>
                            {getFilterDescription()}
                        </CardDescription>
                    </div>
                    {/* Simple Filter Links */}
                    <div className="flex gap-2 flex-wrap">
                        <Button size="sm" variant={!filter ? "secondary" : "outline"} asChild>
                            <Link href="/admin/users">Alle</Link>
                        </Button>
                         <Button size="sm" variant={filter === 'unverified' ? "secondary" : "outline"} asChild>
                            <Link href="/admin/users?filter=unverified">Unbestätigt</Link>
                        </Button>
                        <Button size="sm" variant={filter === 'students' ? "secondary" : "outline"} asChild>
                            <Link href="/admin/users?filter=students">Studenten</Link>
                        </Button>
                        <Button size="sm" variant={filter === 'patients' ? "secondary" : "outline"} asChild>
                            <Link href="/admin/users?filter=patients">Patienten</Link>
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <Suspense fallback={<TableSkeleton />}>
                    <AdminUserTable users={users} />
                </Suspense>
            </CardContent>
        </Card>
    );
}
```

## File: `app/agb/page.tsx`

```tsx
// app/agb/page.tsx
export default function AgbPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Allgemeine Geschäftsbedingungen</h1>
      <p>Hier stehen die AGB...</p>
      {/* Add actual content later */}
    </div>
  );
}
```

## File: `app/api/auth/[...nextauth]/route.ts`

```typescript
// app/api/auth/[...nextauth]/route.ts
import { handlers } from "@/lib/auth"; // Adjust path if needed
export const { GET, POST } = handlers;

// If you need edge compatibility, export runtime = 'edge'
// export const runtime = 'edge' // Optional
```

## File: `app/api/nachrichten/route.ts`

```typescript
// app/api/nachrichten/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { triggerPusherEvent } from '@/lib/pusher/server';
import { z } from 'zod';
import { ConsultationStatus, UserRole } from '@prisma/client';
import { sendEmail, templates } from '@/lib/email'; // Correct import

const messageSchema = z.object({
  consultationId: z.string().cuid({ message: "Ungültige Beratungs-ID." }),
  content: z.string().trim().min(1, "Nachricht darf nicht leer sein.").max(5000),
});

export async function POST(request: Request) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: 'Nicht autorisiert.' }, { status: 401 });
        }
        const userId = session.user.id; // This is the sender

        const body = await request.json();
        const validation = messageSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json({ error: 'Ungültige Eingabe.', details: validation.error.flatten() }, { status: 400 });
        }
        const { consultationId, content } = validation.data;

        // Fetch consultation details including participants' emails/names/roles
        const consultation = await prisma.consultation.findUnique({
            where: { id: consultationId },
            select: {
                id: true, topic: true, patientId: true, studentId: true, status: true,
                patient: { select: { email: true, role: true, patientProfile: { select: { firstName: true } } } },
                student: { select: { email: true, role: true, studentProfile: { select: { firstName: true } } } },
            }
        });

        if (!consultation) { return NextResponse.json({ error: 'Beratung nicht gefunden.' }, { status: 404 }); }

        const isPatient = consultation.patientId === userId;
        const isAssignedStudent = consultation.studentId === userId;

        if (!isPatient && !isAssignedStudent) { return NextResponse.json({ error: 'Sie sind nicht Teil dieser Beratung.' }, { status: 403 }); }
        if (consultation.status !== ConsultationStatus.IN_PROGRESS) { return NextResponse.json({ error: 'Nachrichten können nur in laufenden Beratungen gesendet werden.' }, { status: 400 }); }

        // Create message
        const newMessage = await prisma.message.create({
            data: { consultationId, senderId: userId, content },
            include: { sender: { select: { id: true, role: true, image: true, patientProfile: { select: { firstName: true, lastName: true } }, studentProfile: { select: { firstName: true, lastName: true } } } } }
        });

         const senderProfile = newMessage.sender.role === UserRole.PATIENT ? newMessage.sender.patientProfile : newMessage.sender.studentProfile;
         const senderName = `${senderProfile?.firstName || 'Nutzer'} ${senderProfile?.lastName || ''}`.trim();

         const responsePayload = { /* ... payload data ... */ id: newMessage.id, consultationId: newMessage.consultationId, senderId: newMessage.senderId, content: newMessage.content, createdAt: newMessage.createdAt.toISOString(), sender: { id: newMessage.sender.id, role: newMessage.sender.role, firstName: senderProfile?.firstName ?? 'Nutzer', lastName: senderProfile?.lastName ?? '', image: newMessage.sender.image } };

        // Trigger Pusher
        await triggerPusherEvent(`private-consultation-${consultationId}`, 'new-message', responsePayload);

        // Send Email Notification to Recipient
        let recipient = null;
        if (isPatient && consultation.student) { recipient = consultation.student; }
        else if (isAssignedStudent) { recipient = consultation.patient; }

        if (recipient && recipient.email) {
            const recipientProfile = recipient.role === UserRole.PATIENT ? recipient.patientProfile : recipient.studentProfile;
             const templateData = templates.newMessage(
                 { email: recipient.email, firstName: recipientProfile?.firstName, role: recipient.role },
                 { name: senderName },
                 { id: consultation.id, topic: consultation.topic }
             );
             // <<< Add 'to' field when calling sendEmail >>>
             sendEmail({
                to: recipient.email,
                subject: templateData.subject,
                text: templateData.text,
                html: templateData.html,
             }).catch(err => {
                 console.error(`Failed to send new message email for consultation ${consultation.id} to ${recipient.email}:`, err);
             });
         }

        return NextResponse.json(responsePayload, { status: 201 });

    } catch (error) {
        console.error("Error in POST /api/nachrichten:", error);
        return NextResponse.json({ error: 'Nachricht konnte nicht gesendet werden aufgrund eines Serverfehlers.' }, { status: 500 });
    }
}
```

## File: `app/api/pusher/auth/route.ts`

```typescript
// app/api/pusher/auth/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth'; // Server-side auth
import { pusherServer } from '@/lib/pusher/server'; // Pusher server instance
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return new NextResponse('Nicht autorisiert.', { status: 401 });
        }
        const userId = session.user.id;

        const data = await request.formData(); // Pusher client sends form data
        const socketId = data.get('socket_id') as string;
        const channel = data.get('channel_name') as string;

        // Basic validation
        if (!socketId || !channel) {
             return new NextResponse('Ungültige Anfrage.', { status: 400 });
        }

        // --- Authorize Channel Access ---
        // Check if channel name follows expected format: private-consultation-${consultationId}
        const match = channel.match(/^private-consultation-(.+)$/);
        if (!match || !match[1]) {
            console.warn(`Pusher Auth: Invalid channel name format: ${channel}`);
            return new NextResponse('Ungültiger Kanalname.', { status: 400 });
        }
        const consultationId = match[1];

        // Verify the user is actually part of this consultation
        const consultation = await prisma.consultation.findFirst({
            where: {
                id: consultationId,
                OR: [
                    { patientId: userId },
                    { studentId: userId },
                ],
            },
            select: { id: true } // Just need to know if they are part of it
        });

        if (!consultation) {
             console.warn(`Pusher Auth: User ${userId} denied access to channel ${channel}`);
            return new NextResponse('Zugriff auf Kanal verweigert.', { status: 403 });
        }
        // --- End Authorization ---


        // If authorized, prepare Pusher auth response data
        const userData = {
          user_id: userId,
          // user_info: { // Optional: Send additional user info if needed by presence channels
          //   name: session.user.name, // Example, if name is in session
          // }
        };

        if (!pusherServer) {
             return new NextResponse('Pusher Server nicht initialisiert.', { status: 500 });
        }

        const authResponse = pusherServer.authorizeChannel(socketId, channel, userData);
        console.log(`Pusher Auth: User ${userId} authorized for channel ${channel}`);

        // Return the authorization response required by Pusher client
        return NextResponse.json(authResponse);

    } catch (error) {
        console.error("Pusher Auth Error:", error);
        return new NextResponse('Authentifizierungsfehler.', { status: 500 });
    }
}
```

## File: `app/api/upload/profile-picture/route.ts`

```typescript
// app/api/upload/profile-picture/route.ts
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth'; // Use server-side auth helper

// Allowed image types
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const MAX_FILE_SIZE_MB = 5; // Example: 5MB limit for profile pictures

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const session = await auth(); // Verify user session

    // --- Authorization Check ---
    // Ensure user is logged in
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Nicht autorisiert. Bitte anmelden.' },
        { status: 401 }
      );
    }
    const userId = session.user.id;
     // --- ---

    // Handle the upload using Vercel Blob's server helper
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname /*, clientPayload */) => {
        // Generate a unique pathname for the profile picture
        const uniquePrefix = Date.now();
        const blobPathname = `profile-pictures/${userId}/${uniquePrefix}-${pathname}`;

        console.log(`[Blob Profile Pic Upload] Authorizing path: ${blobPathname} for user: ${userId}`);

        return {
          allowedContentTypes: ALLOWED_IMAGE_TYPES,
          maximumSizeInBytes: MAX_FILE_SIZE_MB * 1024 * 1024,
          tokenPayload: JSON.stringify({ userId: userId }),
          pathname: blobPathname, // Use the server-generated path
          // Add cache control headers for profile pictures if desired
          // addRandomSuffix: false, // Set pathname directly
          // cacheControlMaxAge: 31536000, // e.g., 1 year
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        // Optional: Server-side actions after successful upload (e.g., logging)
        // The actual User.image update happens via a separate server action triggered by the profile form save
        console.log('[Blob Profile Pic Upload] Blob upload completed:', blob.pathname, blob.url);
        try {
            const payload = JSON.parse(tokenPayload || '{}');
             // console.log('[Blob Profile Pic Upload] Payload:', payload);
        } catch (e) {
            console.error("[Blob Profile Pic Upload] Error processing token payload:", e);
        }
      },
    });

    // Return the successful response from handleUpload
    return NextResponse.json(jsonResponse);

  } catch (error) {
    console.error('[Blob Profile Pic Upload] Error handling upload:', error);
    const message = (error instanceof Error) ? error.message : 'Interner Serverfehler beim Upload.';
    return NextResponse.json(
      { error: `Upload fehlgeschlagen: ${message}` },
      { status: 500 } // Use 500 for server errors
    );
  }
}
```

## File: `app/api/upload/route.ts`

```typescript
// app/api/upload/route.ts
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth'; // Use server-side auth helper

// IMPORTANT: Edge runtime is often recommended for Blob uploads for performance,
// BUT our current auth setup (using PrismaAdapter with JWT strategy) might have
// issues accessing the full session reliably on the Edge.
// Let's START with the Node.js runtime for stability with our auth setup.
// If performance becomes an issue, we might need to explore alternatives
// like passing JWT tokens manually or using a different auth strategy for this route.
// export const runtime = 'edge'; // DO NOT use Edge for now with current auth setup

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const session = await auth(); // Verify user session

    // --- Authorization Check ---
    // Ensure user is logged in (basic check)
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Nicht autorisiert. Bitte anmelden.' },
        { status: 401 }
      );
    }
     // Ensure user is a Patient (only patients should upload during request)
     if (session.user.role !== 'PATIENT') {
          return NextResponse.json(
            { error: 'Nur Patienten dürfen Dateien für Anfragen hochladen.' },
            { status: 403 } // Forbidden
          );
     }
     const userId = session.user.id;
     // --- ---

    // Handle the upload using Vercel Blob's server helper
    const jsonResponse = await handleUpload({
      body,
      request,
      // Important: Restrict where files can be uploaded using onBeforeGenerateToken
      onBeforeGenerateToken: async (pathname /*, clientPayload */) => {
        // Generate a unique pathname for the blob file based on user ID and filename
        // Example: 'user_xyz/requests/timestamp-filename.pdf'
        // This helps ensure users can't overwrite each other's files easily.
        // Using a timestamp or random prefix also prevents overwriting own files.
        const uniquePrefix = Date.now();
        const blobPathname = `user_${userId}/requests/${uniquePrefix}-${pathname}`;

        console.log(`[Blob Upload] Authorizing path: ${blobPathname} for user: ${userId}`);

        // Add additional checks here if needed based on clientPayload or pathname structure

        return {
          allowedContentTypes: ['application/pdf', 'image/jpeg', 'image/png', 'image/gif'],
          tokenPayload: JSON.stringify({
            // Optional: Embed metadata in the token if needed later in onUploadCompleted
            userId: userId,
            originalPathname: pathname,
          }),
          // Generate the final pathname server-side for security
          pathname: blobPathname,
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        // Optional: Server-side actions after successful upload
        // e.g., logging, potentially creating a temporary DB record (though we link it later)
        console.log('[Blob Upload] Blob upload completed:', blob.pathname, blob.url);
        try {
            const payload = JSON.parse(tokenPayload || '{}');
            // console.log('[Blob Upload] Payload:', payload);
             // Example: Log successful upload linked to user
             // await prisma.activityLog.create({ data: { userId: payload.userId, action: 'FILE_UPLOADED', details: blob.url } });
        } catch (e) {
            console.error("[Blob Upload] Error processing token payload on completion:", e);
        }
      },
    });

    // Return the successful response from handleUpload
    return NextResponse.json(jsonResponse);

  } catch (error) {
    console.error('[Blob Upload] Error handling upload:', error);
    // Return a generic server error response
     const message = (error instanceof Error) ? error.message : 'Interner Serverfehler beim Upload.';
    return NextResponse.json(
      { error: `Upload fehlgeschlagen: ${message}` },
      { status: 500 }
    );
  }
}
```

## File: `app/datenschutz/page.tsx`

```tsx
// app/datenschutz/page.tsx
export default function DatenschutzPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Datenschutzerklärung</h1>
      <p>Hier steht die Datenschutzerklärung...</p>
      {/* Add actual content later */}
    </div>
  );
}
```

## File: `app/favicon.ico`

[Skipping content for binary file type .ico]

## File: `app/feedback/page.tsx`

```tsx
// app/feedback/page.tsx
'use client';

import React, { useState, useTransition, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitFeedbackSchema } from '@/lib/validation';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Star, Check } from 'lucide-react'; // <<< Import Check icon
import { toast } from 'sonner';
import { useRouter, useSearchParams } from 'next/navigation';
import { submitFeedback } from '@/actions/feedback';
import * as z from 'zod';
import AnimatedCheckmark from '@/components/ui/AnimatedCheckmark';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion'; // <<< Import motion

type FormData = z.infer<typeof SubmitFeedbackSchema>;

export default function FeedbackPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const consultationId = searchParams.get('consultationId');

    const [isPending, startTransition] = useTransition();
    const [showSuccess, setShowSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedRating, setSelectedRating] = useState<number | null>(null);

    const form = useForm<FormData>({
        resolver: zodResolver(SubmitFeedbackSchema),
        defaultValues: {
            consultationId: consultationId || '',
            rating: undefined,
            feedback: '',
        },
    });

    useEffect(() => {
        if (!consultationId) {
            setError("Ungültiger oder fehlender Link zur Feedback-Seite.");
            toast.error("Fehler", { description: "Der Link zum Feedback ist ungültig oder fehlt." });
        } else {
            form.setValue('consultationId', consultationId);
        }
    }, [consultationId, form]);

     const onSubmit = (values: FormData) => {
         setError(null);
         setShowSuccess(false);
         startTransition(async () => {
            const result = await submitFeedback(values);
            if (result.success) {
                setShowSuccess(true);
                toast.success("Feedback gesendet!", { description: result.message });
                setTimeout(() => {
                    router.push('/patient/dashboard'); // Redirect to dashboard after success
                }, 1500);
            } else {
                setError(result.message || "Feedback konnte nicht gesendet werden.");
                toast.error("Fehler", { description: result.message || "Feedback konnte nicht gesendet werden." });
                 if (result.fieldErrors) {
                     Object.entries(result.fieldErrors).forEach(([field, errors]) => {
                         if (errors) {
                             form.setError(field as keyof FormData, { type: 'server', message: errors.join(', ') });
                         }
                     });
                 }
            }
        });
    };

     const isFormDisabled = isPending || showSuccess || !consultationId || !!error;

    return (
        <div className="container mx-auto max-w-xl py-12">
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Feedback zur Beratung</CardTitle>
                    <CardDescription>Wie zufrieden waren Sie mit der Erklärung?</CardDescription>
                </CardHeader>
                <CardContent>
                     {error && (
                        <div className="mb-6 text-sm text-destructive bg-destructive/10 p-3 rounded-md border border-destructive/20">{error}</div>
                     )}
                      {showSuccess ? (
                            <div className="text-center p-8">
                                {/* <<< motion.div is now defined >>> */}
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                                    <Check className="w-10 h-10 text-green-600" />
                                </motion.div>
                                <h3 className="text-xl font-semibold mb-2">Vielen Dank!</h3>
                                <p className="text-muted-foreground">Ihr Feedback hilft uns, Murph zu verbessern.</p>
                                <p className="text-muted-foreground text-sm mt-1">Sie werden weitergeleitet...</p>
                            </div>
                        ) : (
                         <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <input type="hidden" {...form.register('consultationId')} />
                                <FormField
                                    control={form.control}
                                    name="rating"
                                    render={({ field }) => (
                                        <FormItem className="space-y-3">
                                            <FormLabel className='text-base'>Bewertung (1 = Sehr unzufrieden, 5 = Sehr zufrieden)</FormLabel>
                                             <FormControl>
                                                <RadioGroup
                                                    onValueChange={(value) => { field.onChange(parseInt(value)); setSelectedRating(parseInt(value)); }}
                                                    value={field.value?.toString()} // <<< Use value instead of defaultValue with Controller
                                                    className="flex justify-center gap-2 sm:gap-4 pt-2"
                                                    disabled={isFormDisabled}
                                                >
                                                    {[1, 2, 3, 4, 5].map((ratingValue) => (
                                                         <FormItem key={ratingValue} className="flex flex-col items-center space-y-1 cursor-pointer">
                                                            <FormControl>
                                                                 <RadioGroupItem value={ratingValue.toString()} id={`rating-${ratingValue}`} className="sr-only" />
                                                            </FormControl>
                                                             <FormLabel
                                                                 htmlFor={`rating-${ratingValue}`}
                                                                 className={cn( "cursor-pointer rounded-full border-2 p-2 transition-colors hover:bg-accent hover:text-accent-foreground", selectedRating === ratingValue ? "border-primary bg-primary/10 text-primary" : "border-muted text-muted-foreground" )}
                                                             >
                                                                <Star className={cn("w-6 h-6", selectedRating !== null && ratingValue <= selectedRating ? 'fill-yellow-400 text-yellow-500' : 'fill-muted stroke-muted-foreground/50')}/>
                                                            </FormLabel>
                                                         </FormItem>
                                                    ))}
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage className="text-center pt-2" />
                                        </FormItem>
                                    )}
                                />
                                 <FormField
                                    control={form.control}
                                    name="feedback"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Zusätzliches Feedback (Optional)</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Haben Sie weitere Anmerkungen oder Verbesserungsvorschläge?" className="min-h-[100px] resize-y" {...field} disabled={isFormDisabled} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                 <Button type="submit" className="w-full" disabled={isFormDisabled} animateInteraction={!isFormDisabled}>
                                    {isPending ? ( <Loader2 className="mr-2 h-4 w-4 animate-spin" /> ) : null}
                                    Feedback senden
                                </Button>
                            </form>
                        </Form>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
```

## File: `app/globals.css`

```css
/* app/globals.css */

/* Use Tailwind v4 import */
@import "tailwindcss";
/* Keep this if you are using tw-animate-css */
@import "tw-animate-css";

/* Keep custom variants if needed by your setup */
@custom-variant dark (&:is(.dark *));

/* Theme block seems specific to your setup, keep it if necessary */
@theme inline {
  /* Keep all existing variables defined here */
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  /* Keep Geist Sans */
  --font-mono: var(--font-geist-mono);
  /* Keep Geist Mono */
  --color-sidebar-ring: var(--sidebar-ring);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar: var(--sidebar);
  --color-chart-5: var(--chart-5);
  --color-chart-4: var(--chart-4);
  --color-chart-3: var(--chart-3);
  --color-chart-2: var(--chart-2);
  --color-chart-1: var(--chart-1);
  --color-ring: var(--ring);
  --color-input: var(--input);
  --color-border: var(--border);
  --color-destructive: var(--destructive);
  --color-accent-foreground: var(--accent-foreground);
  --color-accent: var(--accent);
  --color-muted-foreground: var(--muted-foreground);
  --color-muted: var(--muted);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-secondary: var(--secondary);
  --color-primary-foreground: var(--primary-foreground);
  --color-primary: var(--primary);
  --color-popover-foreground: var(--popover-foreground);
  --color-popover: var(--popover);
  --color-card-foreground: var(--card-foreground);
  --color-card: var(--card);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  /* Removed --radius-xl unless specifically needed */

  /* Add aliases for our brand colors if using @theme */
  --color-brand-primary: var(--brand-primary);
  --color-brand-secondary: var(--brand-secondary);
}

:root {
  /* Keep existing :root variables */
  --radius: 0.625rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.129 0.042 264.695);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.129 0.042 264.695);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.129 0.042 264.695);
  --primary: oklch(0.208 0.042 265.755);
  --primary-foreground: oklch(0.984 0.003 247.858);
  --secondary: oklch(0.968 0.007 247.896);
  --secondary-foreground: oklch(0.208 0.042 265.755);
  --muted: oklch(0.968 0.007 247.896);
  --muted-foreground: oklch(0.554 0.046 257.417);
  --accent: oklch(0.968 0.007 247.896);
  --accent-foreground: oklch(0.208 0.042 265.755);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.929 0.013 255.508);
  --input: oklch(0.929 0.013 255.508);
  --ring: oklch(0.704 0.04 256.788);
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --sidebar: oklch(0.984 0.003 247.858);
  --sidebar-foreground: oklch(0.129 0.042 264.695);
  --sidebar-primary: oklch(0.208 0.042 265.755);
  --sidebar-primary-foreground: oklch(0.984 0.003 247.858);
  --sidebar-accent: oklch(0.968 0.007 247.896);
  --sidebar-accent-foreground: oklch(0.208 0.042 265.755);
  --sidebar-border: oklch(0.929 0.013 255.508);
  --sidebar-ring: oklch(0.704 0.04 256.788);

  /* --- Add Our Custom Brand Colors (using HSL for simplicity) --- */
  /* You can try converting these to oklch if you prefer */
  --brand-primary: hsl(160 80% 40%);
  --brand-secondary: hsl(45 90% 55%);
  /* Muted Orange/Yellow */
  /* --- --- --- */
}

.dark {
  /* Keep existing dark mode variables */
  --background: oklch(0.129 0.042 264.695);
  --foreground: oklch(0.984 0.003 247.858);
  --card: oklch(0.208 0.042 265.755);
  --card-foreground: oklch(0.984 0.003 247.858);
  --popover: oklch(0.208 0.042 265.755);
  --popover-foreground: oklch(0.984 0.003 247.858);
  --primary: oklch(0.929 0.013 255.508);
  --primary-foreground: oklch(0.208 0.042 265.755);
  --secondary: oklch(0.279 0.041 260.031);
  --secondary-foreground: oklch(0.984 0.003 247.858);
  --muted: oklch(0.279 0.041 260.031);
  --muted-foreground: oklch(0.704 0.04 256.788);
  --accent: oklch(0.279 0.041 260.031);
  --accent-foreground: oklch(0.984 0.003 247.858);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.551 0.027 264.364);
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  --sidebar: oklch(0.208 0.042 265.755);
  --sidebar-foreground: oklch(0.984 0.003 247.858);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.984 0.003 247.858);
  --sidebar-accent: oklch(0.279 0.041 260.031);
  --sidebar-accent-foreground: oklch(0.984 0.003 247.858);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.551 0.027 264.364);

  /* Add dark mode versions of brand colors if needed, or adjust existing ones */
  /* Example: Lighter teal for dark mode */
  --brand-primary: hsl(160 70% 70%);
  /* Example: Lighter orange for dark mode */
  /* --brand-secondary: 45 80% 65%; */
}


/* Keep existing @layer base */
@layer base {
  * {
    @apply border-border outline-ring/50;
  }

  body {
    /* Apply background/foreground and ensure min-height and flex for footer */
    @apply bg-background text-foreground min-h-screen flex flex-col;
    /* Apply font using the variable from @theme */
    font-family: var(--font-sans);
    /* Add font feature settings if desired */
    font-feature-settings: "rlig" 1, "calt" 1;
    /* Ensure smooth scrolling */
    @apply antialiased;
  }
}

/* Add any other global base styles here */
```

## File: `app/layout.tsx`

```tsx
// app/layout.tsx
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/core/Header";
import Footer from "@/components/core/Footer";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import NextAuthProvider from '@/components/core/NextAuthProvider';
// Import the new wrapper
import PageTransitionWrapper from "@/components/core/PageTransitionWrapper";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Murph – Medizinische Erklärungen",
  description: "Erhalten Sie verständliche medizinische Erklärungen von verifizierten Medizinstudenten. Sicher und vertraulich.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased flex flex-col",
          fontSans.variable
        )}
      >
        <NextAuthProvider>
          <Header />
          {/* Use the PageTransitionWrapper around the children */}
          {/* Pass the flex-grow class to the wrapper */}
          <PageTransitionWrapper className="flex-grow">
            {children}
          </PageTransitionWrapper>
          <Footer />
          <SonnerToaster richColors position="top-right" />
        </NextAuthProvider>
      </body>
    </html>
  );
}
```

## File: `app/patient/anfrage/page.tsx`

```tsx
// app/patient/anfrage/page.tsx
import ConsultationRequestForm from '@/components/features/ConsultationRequestForm';

// Auth is handled by layout/middleware
export default function RequestConsultationPage() {
    return (
        <div className="container mx-auto py-8">
            <ConsultationRequestForm />
        </div>
    );
}
```

## File: `app/patient/beratungen/[consultationId]/page.tsx`

```tsx
// app/patient/beratungen/[consultationId]/page.tsx
import React from 'react';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { notFound, redirect } from 'next/navigation';
import ChatInterface from '@/components/features/ChatInterface';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { ConsultationStatus, UserRole } from '@prisma/client';
import { cn } from '@/lib/utils';
import { CONSULTATION_STATUS_LABELS, CONSULTATION_STATUS_COLORS } from '@/lib/constants';

// Server-side function to fetch data for the specific consultation
async function getConsultationData(consultationId: string, userId: string) {
  try {
      const consultation = await prisma.consultation.findUnique({
        where: {
          id: consultationId,
          patientId: userId,
        },
        include: {
          messages: {
            orderBy: { createdAt: 'asc' },
            include: {
              sender: {
                select: {
                  id: true,
                  role: true,
                  image: true, // <<< Include sender image
                  patientProfile: { select: { firstName: true, lastName: true } },
                  studentProfile: { select: { firstName: true, lastName: true } },
                }
              }
            }
          },
          documents: {
            orderBy: { createdAt: 'asc' },
          },
          student: {
              include: {
                  studentProfile: {
                      select: { firstName: true, lastName: true, university: true }
                  }
              }
          },
        }
      });
      return consultation;
  } catch (error) {
      console.error(`Error fetching consultation data for ID ${consultationId}:`, error);
      return null;
  }
}


// The main Server Component for the page
export default async function PatientConsultationDetailPage({ params }: { params: { consultationId: string } }) {
  const session = await auth();
  const { consultationId } = await params;

  if (!session?.user?.id || session.user.role !== UserRole.PATIENT) {
    redirect(`/login?callbackUrl=/patient/consultations/${consultationId}`);
  }
  const userId = session.user.id;

  const consultation = await getConsultationData(consultationId, userId);

  if (!consultation) {
    notFound();
  }

  const initialMessages = consultation.messages.map(msg => {
     const senderProfile = msg.sender.role === UserRole.PATIENT
        ? msg.sender.patientProfile
        : msg.sender.studentProfile;
    return {
        id: msg.id,
        content: msg.content,
        createdAt: msg.createdAt.toISOString(),
        sender: {
            id: msg.sender.id,
            role: msg.sender.role,
            firstName: senderProfile?.firstName ?? 'Nutzer',
            lastName: senderProfile?.lastName ?? '',
            image: msg.sender.image, // <<< Pass sender image
        }
    };
  });

  const initialDocuments = consultation.documents.map(doc => ({
      id: doc.id,
      fileName: doc.fileName,
      storageUrl: doc.storageUrl,
      mimeType: doc.mimeType,
      fileSize: doc.fileSize,
  }));

  const studentName = consultation.student?.studentProfile
    ? `${consultation.student.studentProfile.firstName} ${consultation.student.studentProfile.lastName}`
    : 'Wird zugewiesen...';
  const studentUniversity = consultation.student?.studentProfile?.university ?? '';

  return (
    <div className="container mx-auto py-8 space-y-6">
       <div className="flex items-center justify-between mb-4">
            <Button variant="outline" size="sm" asChild>
                <Link href="/patient/dashboard">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Zurück zum Dashboard
                </Link>
            </Button>
        </div>

      <Card className="flex flex-col overflow-hidden">
        <CardHeader>
          <CardTitle className="text-2xl">Beratung: {consultation.topic}</CardTitle>
           <CardDescription>
                {consultation.studentId
                    ? `Ihre Erklärung von: ${studentName} (${studentUniversity})`
                    : 'Ihre Anfrage wartet auf die Zuweisung eines Studenten.'
                }
                 <span className={cn("ml-2 px-2 py-0.5 rounded text-xs font-medium border",
                     CONSULTATION_STATUS_COLORS[consultation.status] || 'bg-gray-100 text-gray-800 border-gray-300'
                 )}>
                     {CONSULTATION_STATUS_LABELS[consultation.status] || consultation.status}
                 </span>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow p-0 md:p-6 md:pt-0">
          <ChatInterface
            consultationId={consultation.id}
            currentUserId={userId}
            initialMessages={initialMessages} // <<< Pass updated initialMessages
            initialDocuments={initialDocuments}
            consultationStatus={consultation.status}
          />
        </CardContent>
      </Card>

       {consultation.status === ConsultationStatus.COMPLETED && consultation.summary && (
           <Card>
               <CardHeader>
                   <CardTitle>Zusammenfassung der Erklärung</CardTitle>
                   <CardDescription>Dies ist die Zusammenfassung, die der Medizinstudent für Sie erstellt hat.</CardDescription>
               </CardHeader>
               <CardContent>
                   <p className="text-sm text-muted-foreground bg-muted/50 p-4 border rounded whitespace-pre-wrap">
                       {consultation.summary}
                   </p>
               </CardContent>
           </Card>
       )}
    </div>
  );
}
```

## File: `app/patient/dashboard/page.tsx`

```tsx
// app/patient/dashboard/page.tsx
import React, { Suspense } from 'react';
import ConsultationList from '@/components/features/ConsultationList';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FilePlus2 } from 'lucide-react';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { UserRole } from '@prisma/client';
import { type Consultation } from '@prisma/client'; // Import base type if needed
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

// --- Define Consultation type consistent with ConsultationList ---
// <<< Add summary field here >>>
type ConsultationWithDetails = Consultation & {
     summary?: string | null; // Add summary field
     student?: {
         studentProfile?: {
            firstName: string;
            lastName: string;
        } | null;
    } | null;
    patient?: {
        patientProfile?: {
            firstName: string;
            lastName: string;
        } | null;
    } | null;
};
// --- ---

// --- Data Fetching Function ---
// Prisma includes scalar fields like 'summary' by default, so no change needed here usually
async function getPatientConsultations(userId: string): Promise<{ consultations: ConsultationWithDetails[], error: string | null }> {
    try {
        const consultations = await prisma.consultation.findMany({
            where: {
                patientId: userId,
            },
            include: {
                patient: {
                    include: { patientProfile: { select: { firstName: true, lastName: true } } }
                },
                student: {
                    include: { studentProfile: { select: { firstName: true, lastName: true } } }
                }
                // 'summary' is fetched by default as it's a scalar field
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        // Cast to the updated type
        return { consultations: consultations as ConsultationWithDetails[], error: null };
    } catch (e) {
        console.error("Error fetching patient consultations:", e);
        return { consultations: [], error: "Beratungen konnten nicht geladen werden." };
    }
}
// --- ---

// --- Loading component remains the same ---
const ConsultationListLoading = () => (
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {[...Array(3)].map((_, index) => (
             <Card key={index} className="flex flex-col">
                <CardHeader>
                    <Skeleton className="h-5 w-3/4 mb-2" />
                    <Skeleton className="h-3 w-1/2" />
                </CardHeader>
                <CardContent className="flex-grow">
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                </CardContent>
                 <CardFooter>
                    <Skeleton className="h-9 w-full" />
                </CardFooter>
            </Card>
        ))}
    </div>
);
// --- ---

// --- Page Component (no structural changes needed) ---
export default async function PatientDashboardPage() {
    const session = await auth();

    if (!session?.user || session.user.role !== UserRole.PATIENT) {
        redirect('/login');
    }
    const userId = session.user.id;

    const { consultations, error } = await getPatientConsultations(userId);

    return (
        <div className="container mx-auto py-8 space-y-8"> {/* Added container */}
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Meine Beratungen</h1>
                    <p className="text-muted-foreground">Übersicht Ihrer angefragten und laufenden medizinischen Erklärungen.</p>
                </div>
                <Button asChild size="lg" animateInteraction>
                    <Link href="/patient/anfrage">
                        <FilePlus2 className="mr-2 h-5 w-5" />
                        Neue Beratung anfordern
                    </Link>
                </Button>
            </div>

            {/* Consultation List Section */}
            <Suspense fallback={<ConsultationListLoading />}>
                 <ConsultationList
                     consultations={consultations}
                     userRole={UserRole.PATIENT}
                     isLoading={false}
                     error={error}
                 />
            </Suspense>
        </div>
    );
}
```

## File: `app/patient/layout.tsx`

```tsx
// app/patient/layout.tsx
import React from 'react';
import { auth } from '@/lib/auth'; // Use the auth helper with full session access
import { redirect } from 'next/navigation';
import { UserRole } from '@prisma/client';

export default async function PatientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth(); // Get session data with role

  // Redirect immediately if no session (middleware should prevent this, but double-check)
  if (!session?.user) {
      console.log("PatientLayout: No session found, redirecting to login.");
      redirect('/login?callbackUrl=/patient/dashboard'); // Or use current path
      return null;
  }

  // Enforce PATIENT role
  if (session.user.role !== UserRole.PATIENT) {
     console.log(`PatientLayout: User ${session.user.id} (Role: ${session.user.role}) is not a patient. Redirecting.`);
     // Redirect non-patients away
     const redirectUrl = session.user.role === UserRole.STUDENT ? '/student/dashboard' : session.user.role === UserRole.ADMIN ? '/admin/dashboard' : '/';
     redirect(redirectUrl);
     return null; // Stop rendering
  }

  // If logged in and IS a patient, render children
  return <>{children}</>;
}
```

## File: `app/patient/profil/page.tsx`

```tsx
// app/patient/profil/page.tsx
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import PatientProfileForm from '@/components/features/PatientProfileForm'; // Import the form component
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// Helper function for initials (can be moved to utils if reused)
const getInitials = (firstName?: string, lastName?: string) => {
    const first = firstName?.[0] ?? '';
    const last = lastName?.[0] ?? '';
    return `${first}${last}`.toUpperCase() || '?';
};

export default async function PatientProfilePage() {
    const session = await auth();

    if (!session?.user || session.user.role !== 'PATIENT') {
        redirect('/login');
    }
    const userId = session.user.id;

    // Fetch user with profile data
    const userWithProfile = await prisma.user.findUnique({
        where: { id: userId },
        include: {
            patientProfile: true,
        },
    });

    if (!userWithProfile || !userWithProfile.patientProfile) {
         // Provide better feedback if profile is missing
        return (
             <div className="container mx-auto max-w-2xl py-8">
                 <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Fehler</AlertTitle>
                    <AlertDescription>Patientenprofil nicht gefunden. Bitte kontaktieren Sie den Support.</AlertDescription>
                 </Alert>
             </div>
        );
    }

    // const initials = getInitials(userWithProfile.patientProfile.firstName, userWithProfile.patientProfile.lastName); // Initials handled in form

    return (
        <div className="container mx-auto max-w-2xl py-8">
            <Card>
                <CardHeader>
                     <CardTitle className="text-2xl">Mein Profil</CardTitle>
                    <CardDescription>Bearbeiten Sie hier Ihre Profildaten.</CardDescription>
                </CardHeader>
                <CardContent>
                    {/* Render the Client Component Form */}
                    <PatientProfileForm user={userWithProfile} />
                </CardContent>
            </Card>
        </div>
    );
}
```

## File: `app/student/beratungen/[consultationId]/page.tsx`

```tsx
// app/student/beratungen/[consultationId]/page.tsx
import React from 'react';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { notFound, redirect } from 'next/navigation';
import ChatInterface from '@/components/features/ChatInterface';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Star, MessageSquareQuote, User, Users } from 'lucide-react';
import { ConsultationStatus, UserRole } from '@prisma/client';
import ConsultationSummaryForm from '@/components/features/ConsultationSummaryForm';
import { cn } from '@/lib/utils';
import { CONSULTATION_STATUS_LABELS, CONSULTATION_STATUS_COLORS } from '@/lib/constants';
import JargonExplainer from '@/components/features/JargonExplainer';
import { MessageData } from '@/components/features/ChatMessage';

// Helper to display stars
const RatingDisplay = ({ rating }: { rating: number | null | undefined }) => {
    if (rating === null || rating === undefined) return null;
    return (
        <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => ( <Star key={i} className={cn( "w-4 h-4", i < rating ? "fill-yellow-400 text-yellow-500" : "fill-muted stroke-muted-foreground/50" )} /> ))}
            <span className="text-sm font-medium ml-1">({rating}/5)</span>
        </div>
    );
};


// Server-side function
async function getConsultationData(consultationId: string, studentId: string) {
    try {
        const consultation = await prisma.consultation.findUnique({
            where: { id: consultationId, studentId: studentId, },
            include: {
                messages: { orderBy: { createdAt: 'asc' }, include: { sender: { select: { id: true, role: true, image: true, patientProfile: { select: { firstName: true, lastName: true } }, studentProfile: { select: { firstName: true, lastName: true } }, } } } },
                documents: { orderBy: { createdAt: 'asc' } },
                patient: { select: { email: true, patientProfile: { select: { firstName: true, lastName: true } } } },
                student: { include: { studentProfile: { select: { firstName: true, lastName: true, university: true } } } }
            }
        });
        return consultation;
    } catch (error) {
        console.error(`Error fetching student consultation data for ID ${consultationId}:`, error);
        return null;
    }
}

interface ConsultationDetailPageProps {
  params: { consultationId: string };
}
export default async function StudentConsultationDetailPage({ params }: ConsultationDetailPageProps) {
    const awaitedParams = await params;
    const { consultationId } = awaitedParams;
    const session = await auth();

    if (!session?.user?.id || session.user.role !== UserRole.STUDENT) {
        redirect(`/login?callbackUrl=/student/beratungen/${consultationId}`);
    }
    const studentId = session.user.id;

    const consultation = await getConsultationData(consultationId, studentId);

    if (!consultation) { notFound(); }

    const initialMessages: MessageData[] = consultation.messages.map(msg => {
        const senderProfile = msg.sender.role === UserRole.PATIENT ? msg.sender.patientProfile : msg.sender.studentProfile;
        return { id: msg.id, content: msg.content, createdAt: msg.createdAt.toISOString(), sender: { id: msg.sender.id, role: msg.sender.role, firstName: senderProfile?.firstName ?? 'Nutzer', lastName: senderProfile?.lastName ?? '', image: msg.sender.image, } };
    });
    const initialDocuments = consultation.documents.map(doc => ({ id: doc.id, fileName: doc.fileName, storageUrl: doc.storageUrl, mimeType: doc.mimeType, fileSize: doc.fileSize, }));
    const patientName = consultation.patient?.patientProfile ? `${consultation.patient.patientProfile.firstName} ${consultation.patient.patientProfile.lastName}` : consultation.patient.email;

    return (
        <div className="container mx-auto py-8 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                 {/* --- CORRECTED Back Button Structure --- */}
                <Button variant="outline" size="sm" asChild>
                    <Link href="/student/dashboard">
                         {/* Content goes INSIDE the Link */}
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Zurück zum Dashboard
                    </Link>
                </Button>
                 {/* --- End Correction --- */}

                 <span className={cn("px-2 py-0.5 rounded text-xs font-medium border", CONSULTATION_STATUS_COLORS[consultation.status] || 'bg-gray-100 text-gray-800 border-gray-300' )}>
                    {CONSULTATION_STATUS_LABELS[consultation.status] || consultation.status}
                </span>
            </div>

            {/* Consultation Info Card */}
            <Card>
                <CardHeader> <CardTitle className="text-2xl">Beratung: {consultation.topic}</CardTitle> <CardDescription> Anfrage von Patient: {patientName} </CardDescription> </CardHeader>
                <CardContent> <p className="text-sm font-medium mb-1">Ursprüngliche Frage des Patienten:</p> <p className="text-sm text-muted-foreground p-3 border rounded bg-muted/50 whitespace-pre-wrap">{consultation.patientQuestion}</p> </CardContent>
            </Card>

            {/* Chat Interface Card */}
            <Card className="flex flex-col overflow-hidden">
                <CardHeader> <CardTitle>Chatverlauf</CardTitle> </CardHeader>
                <CardContent className="flex-grow p-0 md:p-6 md:pt-0">
                        <ChatInterface
                            consultationId={consultation.id}
                            currentUserId={studentId}
                            initialMessages={initialMessages}
                            initialDocuments={initialDocuments}
                            consultationStatus={consultation.status}
                            // patientQuestion prop removed
                        />
                        {consultation.status === ConsultationStatus.IN_PROGRESS && ( <div className="px-4 pb-4 md:px-0 md:pb-0"> <JargonExplainer /> </div> )}
                </CardContent>
            </Card>

            {/* Summary & Completion Card */}
            {consultation.status === ConsultationStatus.IN_PROGRESS && (
                <Card>
                    <CardHeader> <CardTitle>Zusammenfassung & Abschluss</CardTitle> <CardDescription> Fassen Sie hier die Erklärung kurz zusammen... </CardDescription> </CardHeader>
                    <CardContent> <ConsultationSummaryForm consultationId={consultation.id} initialSummary={consultation.summary} chatHistory={initialMessages} /> </CardContent>
                </Card>
            )}

            {/* Completed Info */}
            {consultation.status === ConsultationStatus.COMPLETED && (
                <div className="space-y-6">
                    {consultation.summary && ( <Card> <CardHeader> <CardTitle>Ihre gespeicherte Zusammenfassung</CardTitle> </CardHeader> <CardContent> <p className="text-sm text-muted-foreground p-3 border rounded bg-muted/50 whitespace-pre-wrap">{consultation.summary}</p> </CardContent> </Card> )}
                     <Card>
                        <CardHeader> <CardTitle>Patientenfeedback</CardTitle> </CardHeader>
                        <CardContent className="space-y-3">
                             <div className="flex items-center"> <span className="text-sm font-medium mr-2">Bewertung:</span> <RatingDisplay rating={consultation.patientRating} /> {(consultation.patientRating === null || consultation.patientRating === undefined) && ( <span className="text-sm text-muted-foreground italic">Keine Bewertung abgegeben.</span> )} </div>
                            {consultation.patientFeedback ? ( <div> <span className="text-sm font-medium block mb-1">Kommentar:</span> <p className="text-sm text-muted-foreground p-3 border rounded bg-muted/50 whitespace-pre-wrap">{consultation.patientFeedback}</p> </div> ) : ( <p className="text-sm text-muted-foreground italic">Kein schriftliches Feedback vom Patienten abgegeben.</p> )}
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
```

## File: `app/student/dashboard/page.tsx`

```tsx
// app/student/dashboard/page.tsx
import React, { Suspense } from 'react';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { Consultation, ConsultationStatus, UserRole, Document } from '@prisma/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { acceptConsultation } from '@/actions/consultations';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, MessageSquare, CheckCheck } from 'lucide-react'; // Added CheckCheck icon
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import ConsultationsSection from '@/components/features/ConsultationsSection';

// Update type to include summary
type ConsultationForDashboard = Consultation & {
    summary?: string | null; // <<< Add summary
    patientQuestion: string;
    documents: Document[];
    patient: {
        patientProfile?: {
            firstName: string;
            lastName: string;
        } | null;
    } | null;
    student?: {
        studentProfile?: {
            firstName: string;
            lastName: string;
        } | null;
    } | null;
};

// Function to fetch consultations server-side (UPDATED QUERY for completed)
async function fetchConsultations(studentId: string) {
    try {
         const requestedConsultations = await prisma.consultation.findMany({
            where: { status: ConsultationStatus.REQUESTED },
            include: {
                patient: { include: { patientProfile: { select: { firstName: true, lastName: true } } } },
                documents: true
            },
            orderBy: { createdAt: 'asc' },
        });
        const inProgressConsultations = await prisma.consultation.findMany({
            where: { studentId: studentId, status: ConsultationStatus.IN_PROGRESS },
             include: {
                patient: { include: { patientProfile: { select: { firstName: true, lastName: true } } } },
                documents: true
             },
            orderBy: { updatedAt: 'desc' },
        });
        // <<< Fetch Completed Consultations >>>
        const completedConsultations = await prisma.consultation.findMany({
             where: { studentId: studentId, status: ConsultationStatus.COMPLETED },
             include: {
                 patient: { include: { patientProfile: { select: { firstName: true, lastName: true } } } },
                 // Documents usually not needed here, summary is key
             },
             orderBy: { updatedAt: 'desc' }, // Order by completion date
         });

        return {
            requested: requestedConsultations as ConsultationForDashboard[],
            inProgress: inProgressConsultations as ConsultationForDashboard[],
            completed: completedConsultations as ConsultationForDashboard[], // <<< Add completed
            error: null
        };
    } catch (error) {
        console.error("Error fetching student consultations:", error);
        return { requested: [], inProgress: [], completed: [], error: "Beratungen konnten nicht geladen werden." }; // <<< Add completed init
    }
}

// Loading Skeleton remains the same
const ConsultationListSkeleton = ({ count = 3 }: { count?: number }) => (
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {[...Array(count)].map((_, index) => (
             <Card key={index} className="flex flex-col">
                <CardHeader>
                    <Skeleton className="h-5 w-3/4 mb-2" />
                    <Skeleton className="h-3 w-1/2" />
                    <Skeleton className="h-3 w-1/3" />
                </CardHeader>
                <CardContent className="flex-grow">
                    <Skeleton className="h-4 w-full mb-1" />
                    <Skeleton className="h-4 w-2/3" />
                </CardContent>
                 <CardFooter>
                    <Skeleton className="h-9 w-full" />
                </CardFooter>
            </Card>
        ))}
    </div>
);

// Main Page Component (Server Component)
export default async function StudentDashboardPage() {
    const session = await auth();
    if (!session?.user || session.user.role !== UserRole.STUDENT) {
       redirect('/login');
    }
    const studentId = session.user.id;

    // Fetch data using the updated function
    const { requested, inProgress, completed, error } = await fetchConsultations(studentId); // <<< Get completed

    if (error) {
         return (
             <div className="container mx-auto py-8 space-y-8">
                 <h1 className="text-3xl font-bold tracking-tight">Studenten Dashboard</h1>
                 <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Fehler</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
             </div>
        );
    }

    return (
        <div className="container mx-auto py-8 space-y-8">
            <h1 className="text-3xl font-bold tracking-tight">Studenten Dashboard</h1>
            <p className="text-muted-foreground">Verwalten Sie Ihre Beratungsanfragen und laufenden Erklärungen.</p>

             <Tabs defaultValue="anfragen" className="w-full">
                 {/* <<< Update TabsList for 3 columns >>> */}
                <TabsList className="grid w-full grid-cols-3 md:w-[600px]">
                    <TabsTrigger value="anfragen">Offene Anfragen ({requested.length})</TabsTrigger>
                    <TabsTrigger value="laufend">Meine Beratungen ({inProgress.length})</TabsTrigger>
                    <TabsTrigger value="abgeschlossen">Abgeschlossen ({completed.length})</TabsTrigger> {/* <<< Add Completed Trigger >>> */}
                </TabsList>

                <TabsContent value="anfragen">
                     <Card>
                         <CardHeader>
                             <CardTitle>Verfügbare Anfragen</CardTitle>
                             <CardDescription>Wählen Sie eine Anfrage aus, um die Details zu sehen und sie anzunehmen.</CardDescription>
                         </CardHeader>
                         <CardContent>
                             <Suspense fallback={<ConsultationListSkeleton count={requested.length || 3} />}>
                                <ConsultationsSection
                                    consultations={requested}
                                    userRole={UserRole.STUDENT}
                                    onAccept={acceptConsultation}
                                    emptyMessage="Derzeit gibt es keine offenen Anfragen."
                                    allowPreview={true}
                                />
                             </Suspense>
                        </CardContent>
                     </Card>
                </TabsContent>

                <TabsContent value="laufend">
                     <Card>
                         <CardHeader>
                             <CardTitle>Ihre aktiven Beratungen</CardTitle>
                             <CardDescription>Dies sind die Beratungen, die Sie derzeit bearbeiten.</CardDescription>
                         </CardHeader>
                        <CardContent>
                             <Suspense fallback={<ConsultationListSkeleton count={inProgress.length || 3} />}>
                                <ConsultationsSection
                                    consultations={inProgress}
                                    userRole={UserRole.STUDENT}
                                    emptyMessage="Sie haben derzeit keine laufenden Beratungen."
                                    allowPreview={false}
                                />
                            </Suspense>
                         </CardContent>
                    </Card>
                </TabsContent>

                {/* <<< Add TabsContent for Completed >>> */}
                <TabsContent value="abgeschlossen">
                     <Card>
                         <CardHeader>
                             <CardTitle>Abgeschlossene Beratungen</CardTitle>
                             <CardDescription>Eine Übersicht Ihrer abgeschlossenen Erklärungen und Zusammenfassungen.</CardDescription>
                         </CardHeader>
                        <CardContent>
                             <Suspense fallback={<ConsultationListSkeleton count={completed.length || 3} />}>
                                <ConsultationsSection
                                    consultations={completed}
                                    userRole={UserRole.STUDENT}
                                    emptyMessage="Sie haben noch keine Beratungen abgeschlossen."
                                    allowPreview={false} // No preview needed here
                                />
                            </Suspense>
                         </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
```

## File: `app/student/layout.tsx`

```tsx
// app/student/layout.tsx
import React from 'react';
import { auth } from '@/lib/auth'; // Use the auth helper with full session access
import { redirect } from 'next/navigation';
import { UserRole } from '@prisma/client';

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const session = await auth(); // Get session data with role

    // Redirect immediately if no session
    if (!session?.user) {
        console.log("StudentLayout: No session found, redirecting to login.");
        redirect('/login?callbackUrl=/student/dashboard'); // Or use current path
        return null;
    }

    // Enforce STUDENT role
    if (session.user.role !== UserRole.STUDENT) {
        console.log(`StudentLayout: User ${session.user.id} (Role: ${session.user.role}) is not a student. Redirecting.`);
        // Redirect non-students away
        const redirectUrl = session.user.role === UserRole.PATIENT ? '/patient/dashboard' : session.user.role === UserRole.ADMIN ? '/admin/dashboard' : '/';
        redirect(redirectUrl);
        return null; // Stop rendering
    }

    // If logged in and IS a student, render children
    return <>{children}</>;
}
```

## File: `app/student/profil/page.tsx`

```tsx
// app/student/profil/page.tsx
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle } from 'lucide-react';
import StudentProfileForm from '@/components/features/StudentProfileForm'; // Import the form component
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// Helper function (can be moved)
const getInitials = (firstName?: string, lastName?: string) => {
    const first = firstName?.[0] ?? '';
    const last = lastName?.[0] ?? '';
    return `${first}${last}`.toUpperCase() || '?';
};

export default async function StudentProfilePage() {
    const session = await auth();

    if (!session?.user || session.user.role !== 'STUDENT') {
        redirect('/login');
    }
    const userId = session.user.id;

    const userWithProfile = await prisma.user.findUnique({
        where: { id: userId },
        include: {
            studentProfile: true,
        },
    });

    if (!userWithProfile || !userWithProfile.studentProfile) {
         return (
             <div className="container mx-auto max-w-2xl py-8">
                 <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Fehler</AlertTitle>
                    <AlertDescription>Studentenprofil nicht gefunden. Bitte kontaktieren Sie den Support.</AlertDescription>
                 </Alert>
             </div>
        );
    }

    const profile = userWithProfile.studentProfile;
    // const initials = getInitials(profile.firstName, profile.lastName); // Initials handled in form

    return (
         <div className="container mx-auto max-w-2xl py-8">
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                         <div>
                            <CardTitle className="text-2xl">Mein Profil</CardTitle>
                            <CardDescription>Bearbeiten Sie hier Ihre Profildaten.</CardDescription>
                        </div>
                        {/* Display Verification Status */}
                        <Badge variant={profile.isVerified ? "default" : "destructive"} className={profile.isVerified ? 'bg-green-100 text-green-800' : ''}>
                            {profile.isVerified ? (
                                <CheckCircle className="mr-1 h-3.5 w-3.5" />
                            ) : (
                                <AlertCircle className="mr-1 h-3.5 w-3.5" />
                            )}
                            {profile.isVerified ? 'Verifiziert' : 'Nicht verifiziert'}
                        </Badge>
                    </div>
                 </CardHeader>
                 <CardContent>
                    {/* Render the Client Component Form */}
                     <StudentProfileForm user={userWithProfile} />

                     {/* Add Note about non-editable fields */}
                      <p className="text-xs text-muted-foreground mt-6 pt-4 border-t">
                          Hinweis: E-Mail und Verifizierungsstatus können nicht geändert werden.
                      </p>
                 </CardContent>
            </Card>
        </div>
    );
}
```

## File: `auth.config.ts`

```typescript
// auth.config.ts
import type { NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from './lib/prisma';
import bcrypt from 'bcryptjs';
import { UserRole } from '@prisma/client';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const userRole = auth?.user?.role as UserRole | undefined; // Role might be available from basic token info
      const pathname = nextUrl.pathname;

      // console.log(`[Auth Check - Simplified] Path: ${pathname}, LoggedIn: ${isLoggedIn}, Role: ${userRole}`);

      const isOnAuthPage = pathname.startsWith('/login') || pathname.startsWith('/registrieren');
      const isOnPatientArea = pathname.startsWith('/patient');
      const isOnStudentArea = pathname.startsWith('/student');
      const isOnAdminArea = pathname.startsWith('/admin');
      const isOnProtectedArea = isOnPatientArea || isOnStudentArea || isOnAdminArea;

      // --- 1. Handle Auth Pages ---
      if (isOnAuthPage) {
        if (isLoggedIn) {
          // Logged-in user on auth page -> redirect to their dashboard
          let dashboardUrl = '/'; // Fallback
          // We *can* determine dashboard here based on basic role info in token
          if (userRole === UserRole.PATIENT) dashboardUrl = '/patient/dashboard';
          else if (userRole === UserRole.STUDENT) dashboardUrl = '/student/dashboard';
          else if (userRole === UserRole.ADMIN) dashboardUrl = '/admin/dashboard';
          // console.log(`[Auth Check - Simplified] Logged-in user on auth page. Redirecting to: ${dashboardUrl}`);
          return Response.redirect(new URL(dashboardUrl, nextUrl.origin));
        }
        // Not logged in on auth page -> Allow access
        // console.log(`[Auth Check - Simplified] Not logged-in user on auth page. Allowing access.`);
        return true;
      }

      // --- 2. Handle Protected Areas ---
      if (isOnProtectedArea) {
        if (!isLoggedIn) {
          // Not logged in on protected page -> redirect to login
          const loginUrl = new URL('/login', nextUrl.origin);
          loginUrl.searchParams.set('callbackUrl', pathname);
          // console.log(`[Auth Check - Simplified] Not logged-in user on protected page. Redirecting to login: ${loginUrl.toString()}`);
          return Response.redirect(loginUrl);
        }
        // Logged in on protected page -> Allow access (Layout will handle role check)
        // console.log(`[Auth Check - Simplified] Logged-in user on protected page (${pathname}). Allowing access for layout check.`);
        return true;
      }

      // --- 3. Handle other public pages ---
      // console.log(`[Auth Check - Simplified] Public page (${pathname}). Allowing access.`);
      return true; // Allow access to all other pages (like landing page)
    },
    // Note: 'jwt' and 'session' callbacks are defined in `lib/auth.ts`.
  },

  providers: [ // Ensure providers is an array
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "E-Mail", type: "email" },
        password: { label: "Passwort", type: "password" }
      },
      async authorize(credentials) {
        // ... authorize logic remains the same ...
         if (!credentials?.email || !credentials.password) return null;
         const email = credentials.email as string;
         const password = credentials.password as string;
         try {
            const user = await prisma.user.findUnique({ where: { email } });
            if (!user || !user.passwordHash) return null;
            const isValid = await bcrypt.compare(password, user.passwordHash);
            if (!isValid) return null;
            return { id: user.id, email: user.email, role: user.role, image: user.image };
         } catch (e) { console.error(e); return null; }
      }
    })
  ],
} satisfies NextAuthConfig;
```

## File: `components.json`

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "app/globals.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
```

## File: `components/admin/AdminConsultationTable.tsx`

```tsx
// components/admin/AdminConsultationTable.tsx
'use client';

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Eye, Star } from 'lucide-react'; // <<< Added Star icon
import type { AdminConsultationView } from '@/app/admin/consultations/page';
import { CONSULTATION_STATUS_LABELS, CONSULTATION_STATUS_COLORS } from '@/lib/constants';
import { cn } from '@/lib/utils';


interface AdminConsultationTableProps {
  consultations: AdminConsultationView[];
}

// Helper to display stars
const RatingStars = ({ rating }: { rating: number | null | undefined }) => {
    if (rating === null || rating === undefined) return <span className="text-xs text-muted-foreground">-</span>;
    return (
        <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
                <Star
                    key={i}
                    className={cn(
                        "w-3 h-3",
                        i < rating ? "fill-yellow-400 text-yellow-500" : "fill-muted stroke-muted-foreground/50"
                    )}
                />
            ))}
        </div>
    );
};

export default function AdminConsultationTable({ consultations }: AdminConsultationTableProps) {

  const getPatientName = (consultation: AdminConsultationView): string => {
    return consultation.patient?.patientProfile
        ? `${consultation.patient.patientProfile.firstName} ${consultation.patient.patientProfile.lastName}`
        : consultation.patient.email;
  }
  const getStudentName = (consultation: AdminConsultationView): string => {
    return consultation.student?.studentProfile
        ? `${consultation.student.studentProfile.firstName} ${consultation.student.studentProfile.lastName}`
        : (consultation.student?.email ?? '-');
  }

  return (
     <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              {/* <TableHead className="hidden sm:table-cell w-[130px]">ID</TableHead> */}
              <TableHead>Thema</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead className="hidden md:table-cell">Student</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Bewertung</TableHead> {/* <<< Added Rating Column */}
              <TableHead className="hidden lg:table-cell">Erstellt am</TableHead>
              <TableHead className="text-right">Aktion</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {consultations.length === 0 && (
                <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                        Keine Beratungen gefunden für die aktuelle Filterauswahl.
                    </TableCell>
                </TableRow>
            )}
            {consultations.map((consultation) => (
              <TableRow key={consultation.id}>
                {/* <TableCell className="font-mono text-xs hidden sm:table-cell">{consultation.id}</TableCell> */}
                <TableCell className="font-medium">{consultation.topic}</TableCell>
                <TableCell>{getPatientName(consultation)}</TableCell>
                <TableCell className="hidden md:table-cell">{getStudentName(consultation)}</TableCell>
                <TableCell>
                    <Badge variant="outline" className={cn("border text-xs", CONSULTATION_STATUS_COLORS[consultation.status] || 'bg-gray-100 text-gray-800 border-gray-300')}>
                        {CONSULTATION_STATUS_LABELS[consultation.status] || consultation.status}
                    </Badge>
                </TableCell>
                {/* <<< Rating Cell >>> */}
                <TableCell>
                    <RatingStars rating={consultation.patientRating} />
                </TableCell>
                <TableCell className="hidden lg:table-cell">{format(new Date(consultation.createdAt), 'dd.MM.yyyy', { locale: de })}</TableCell>
                <TableCell className="text-right">
                     <Button variant="ghost" size="sm" asChild>
                         <Link href={`/admin/consultations/${consultation.id}`} target="_blank" rel="noopener noreferrer">
                             Anzeigen <Eye className="ml-1 h-3 w-3" />
                         </Link>
                     </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
    </div>
  );
}
```

## File: `components/admin/AdminUserTable.tsx`

```tsx
// components/admin/AdminUserTable.tsx
'use client';

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { UserRole } from '@prisma/client';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { getInitials } from '@/lib/utils';
import VerifyStudentButton from './VerifyStudentButton';
import type { AdminUserView } from '@/app/admin/users/page'; // Import type from page

interface AdminUserTableProps {
  users: AdminUserView[];
}

export default function AdminUserTable({ users }: AdminUserTableProps) {

  const getDisplayName = (user: AdminUserView): string => {
    if (user.role === UserRole.PATIENT && user.patientProfile) {
      return `${user.patientProfile.firstName} ${user.patientProfile.lastName}`;
    }
    if (user.role === UserRole.STUDENT && user.studentProfile) {
      return `${user.studentProfile.firstName} ${user.studentProfile.lastName}`;
    }
    // Admins might not have profiles
    if (user.role === UserRole.ADMIN) {
        return user.email;
    }
    return user.email; // Fallback
  };

  const getProfileInitials = (user: AdminUserView): string => {
       if (user.role === UserRole.PATIENT && user.patientProfile) {
            return getInitials(user.patientProfile.firstName, user.patientProfile.lastName);
        }
        if (user.role === UserRole.STUDENT && user.studentProfile) {
            return getInitials(user.studentProfile.firstName, user.studentProfile.lastName);
        }
        return getInitials(undefined, undefined, user.email);
  }

  return (
    <div className="border rounded-lg overflow-hidden"> {/* Added border & overflow */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[60px] hidden sm:table-cell">Bild</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="hidden md:table-cell">Email</TableHead>
            <TableHead>Rolle</TableHead>
            <TableHead>Status</TableHead> {/* For Verification */}
            <TableHead className="hidden lg:table-cell">Registriert</TableHead>
            <TableHead className="text-right">Aktionen</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length === 0 && (
              <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                      Keine Benutzer gefunden für die aktuelle Filterauswahl.
                  </TableCell>
              </TableRow>
          )}
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="hidden sm:table-cell">
                <Avatar className="h-9 w-9 border">
                  <AvatarImage src={user.image ?? undefined} alt={getDisplayName(user)} />
                  <AvatarFallback>{getProfileInitials(user)}</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className="font-medium">{getDisplayName(user)}</TableCell>
              <TableCell className="hidden md:table-cell">{user.email}</TableCell>
              <TableCell>
                  <Badge variant={user.role === UserRole.ADMIN ? "destructive" : user.role === UserRole.STUDENT ? "secondary" : "outline"}>
                      {user.role}
                  </Badge>
              </TableCell>
              <TableCell>
                {user.role === UserRole.STUDENT && (
                  <Badge variant={user.studentProfile?.isVerified ? "default" : "outline"} className={user.studentProfile?.isVerified ? 'bg-green-100 text-green-800' : ''}>
                    {user.studentProfile?.isVerified ? 'Verifiziert' : 'Nicht Verifiziert'}
                  </Badge>
                )}
                {user.role !== UserRole.STUDENT && '-'}
              </TableCell>
              <TableCell className="hidden lg:table-cell">{format(new Date(user.createdAt), 'dd.MM.yyyy', { locale: de })}</TableCell>
              <TableCell className="text-right">
                {user.role === UserRole.STUDENT && user.studentProfile && user.role !== UserRole.ADMIN && ( // Prevent self-verify/unverify if admin is also student?
                    <VerifyStudentButton
                      userId={user.id}
                      isVerified={user.studentProfile.isVerified}
                    />
                )}
                {/* Render '-' or other placeholder if no actions applicable */}
                {user.role !== UserRole.STUDENT && <span className="text-xs text-muted-foreground">-</span>}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
```

## File: `components/admin/VerifyStudentButton.tsx`

```tsx
// components/admin/VerifyStudentButton.tsx
'use client';

import React, { useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Check, X, Loader2 } from 'lucide-react';
import { toggleStudentVerification } from '@/actions/admin'; // Action to be created
import { toast } from 'sonner';

interface VerifyStudentButtonProps {
  userId: string;
  isVerified: boolean;
}

export default function VerifyStudentButton({ userId, isVerified }: VerifyStudentButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    // Optional: Add confirmation dialog here for critical actions
    // if (!confirm(`Sind Sie sicher, dass Sie den Status ändern möchten?`)) {
    //    return;
    // }

    startTransition(async () => {
      try {
        const result = await toggleStudentVerification(userId, isVerified);
        if (result.success) {
          toast.success(result.message);
          // Revalidation happens via the server action
        } else {
          toast.error('Fehler', { description: result.message });
        }
      } catch (error) {
        toast.error('Fehler', { description: 'Aktion fehlgeschlagen.' });
        console.error("Verification toggle error:", error);
      }
    });
  };

  return (
    <Button
      variant={isVerified ? "outline" : "default"} // Use outline for "Entziehen"
      size="sm"
      onClick={handleClick}
      disabled={isPending}
      className="w-28" // Fixed width for consistency
    >
      {isPending ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : isVerified ? (
        <>
          <X className="mr-1 h-4 w-4" /> Entziehen
        </>
      ) : (
        <>
          <Check className="mr-1 h-4 w-4" /> Verifizieren
        </>
      )}
    </Button>
  );
}
```

## File: `components/core/Footer.tsx`

```tsx
// components/core/Footer.tsx
import Link from 'next/link';
import React from 'react';
import { ShieldCheck, LockKeyhole } from 'lucide-react'; // Import icons

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/40">
      <div className="container mx-auto px-4 py-8 text-sm text-muted-foreground">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <div>
            © {currentYear} Murph. Alle Rechte vorbehalten.
          </div>

          {/* Trust Statements & Links */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
             <div className="flex items-center gap-1.5" title="Sichere Datenübertragung und -speicherung">
                <ShieldCheck className="h-4 w-4 text-green-600" />
                <span>Datensicherheit</span>
             </div>
             <div className="flex items-center gap-1.5" title="Vertrauliche Behandlung Ihrer Anfragen gemäß ärztlicher Schweigepflicht durch Studierende">
                 <LockKeyhole className="h-4 w-4 text-blue-600" />
                 <span>Vertraulichkeit</span>
             </div>
            {/* Static Links */}
            <Link href="/datenschutz" className="hover:text-foreground transition-colors">
              Datenschutz
            </Link>
            <Link href="/agb" className="hover:text-foreground transition-colors">
              AGB
            </Link>
          </div>
        </div>
         {/* Disclaimer */}
         <div className="text-center text-xs mt-6 pt-6 border-t border-muted">
            <p className="font-semibold">Wichtiger Hinweis:</p>
            <p>Murph bietet medizinische Erklärungen durch Medizinstudenten an und ersetzt keine ärztliche Diagnose, Beratung oder Behandlung. Bei gesundheitlichen Beschwerden wenden Sie sich bitte an einen Arzt oder eine Ärztin.</p>
            <p className="mt-2">Unsere Medizinstudenten handeln nach bestem Wissen und Gewissen und unterliegen sinngemäß der ärztlichen Schweigepflicht.</p>
         </div>
      </div>
    </footer>
  );
};

export default Footer;
```

## File: `components/core/Header.tsx`

```tsx
// components/core/Header.tsx
'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LayoutGrid, LogOut, User as UserIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Logo from './Logo'; // Import the updated Logo component
import { UserRole } from '@prisma/client';
import { getInitials } from '@/lib/utils'; // Import getInitials
import UserMenuButton from './UserMenuButton'; // Import UserMenuButton

export default function Header() {
  const { data: session, status } = useSession();
  const isLoading = status === 'loading';

  const user = session?.user;
  const userRole = user?.role;

  // Determine dashboard link based on role
  let dashboardHref = '/'; // Default fallback
  if (userRole === UserRole.PATIENT) {
    dashboardHref = '/patient/dashboard';
  } else if (userRole === UserRole.STUDENT) {
    dashboardHref = '/student/dashboard';
  } else if (userRole === UserRole.ADMIN) {
    dashboardHref = '/admin/dashboard';
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2" aria-label="Murph Startseite">
          {/* Use the Logo component */}
          <Logo />
          {/* Text removed as it's in the SVG now */}
        </Link>

        <div className="flex items-center space-x-2 md:space-x-4">
          {isLoading ? (
             // Loading Skeleton
             <div className="flex items-center space-x-2 md:space-x-4">
                 <Skeleton className="h-8 w-24 rounded-md" />
                 <Skeleton className="h-9 w-9 rounded-full" />
             </div>
          ) : user ? (
            // Logged-in user view
            <>
              {/* Dashboard Link */}
              <Button variant="ghost" size="sm" asChild>
                <Link href={dashboardHref}>
                  <LayoutGrid className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </Button>

              {/* User Menu Button Component */}
              <UserMenuButton user={user} />
            </>
          ) : (
            // Logged-out view
            <>
              <Button variant="outline" size="sm" asChild>
                <Link href="/login">Anmelden</Link>
              </Button>
              <Button size="sm" asChild animateInteraction>
                <Link href="/registrieren">Registrieren</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
```

## File: `components/core/LoadingSpinner.tsx`

```tsx
// components/core/LoadingSpinner.tsx
import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: number; // Size in pixels (e.g., 24 for 24x24)
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 24,
  className,
}) => {
  const strokeWidth = Math.max(1.5, size / 10); // Adjust stroke width based on size

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24" // Use a consistent viewBox
      fill="none"
      stroke="currentColor" // Use current text color
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('animate-spin', className)} // Apply Tailwind spin animation
      aria-label="Wird geladen..." // Accessibility
    >
      {/* Spinner path: A circle arc */}
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      {/* Optional: Add a stationary background circle for context */}
      {/* <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.2" strokeWidth={strokeWidth} fill="none" /> */}
    </svg>
  );
};

export default LoadingSpinner;
```

## File: `components/core/Logo.tsx`

```tsx
// components/core/Logo.tsx
'use client';

import React from 'react';

const Logo = () => {
  // Use a wrapper div to easily control size if needed via className prop
  // Adjust width/height here or via Tailwind className on the parent usage
  return ( // <<< Make sure parentheses wrap the multi-line JSX >>>
    <div className="h-8 w-auto md:h-9"> {/* Adjusted Height, keep width auto */}
        <svg
            xmlns="http://www.w3.org/2000/svg"
            // width/height removed - controlled by CSS
            zoomAndPan="magnify"
            viewBox="0 0 375 374.999991" // Use the viewBox from your SVG
            preserveAspectRatio="xMidYMid meet"
            version="1.0"
            className="h-full w-full" // Fill the container div
            // No fill="currentColor" set, using internal fills
            >
            <defs>
                <g/>
                {/* Corrected attribute casing: clip-path -> clipPath, clip-rule -> clipRule */}
                <clipPath id="2f93842feb"><path d="M 83.585938 159 L 92 159 L 92 168 L 83.585938 168 Z M 83.585938 159 " clipRule="nonzero"/></clipPath>
                <clipPath id="9efc5a5269"><path d="M 91 163 L 119 163 L 119 197.203125 L 91 197.203125 Z M 91 163 " clipRule="nonzero"/></clipPath>
                <clipPath id="0703ea8ba1"><path d="M 121 131.953125 L 133.730469 131.953125 L 133.730469 163 L 121 163 Z M 121 131.953125 " clipRule="nonzero"/></clipPath>
                <clipPath id="3b1390245c"><path d="M 101 131.953125 L 114 131.953125 L 114 163 L 101 163 Z M 101 131.953125 " clipRule="nonzero"/></clipPath>
            </defs>
            {/* Corrected attribute casing: fill-opacity -> fillOpacity */}
            <g fill="#ea980c" fillOpacity="0.4"><g transform="translate(100.320764, 155.215267)"><g><path d="M 32.375 0.515625 C 29.757812 0.515625 27.710938 0.0859375 26.234375 -0.765625 C 24.628906 -1.660156 23.757812 -2.929688 23.625 -4.578125 L 23.375 -7.265625 C 25.125 -7.679688 26.597656 -8.769531 27.796875 -10.53125 C 28.117188 -11.019531 28.28125 -11.445312 28.28125 -11.8125 C 28.28125 -12.3125 28.035156 -12.5625 27.546875 -12.5625 L 27.453125 -12.5625 C 27.441406 -12.539062 27.40625 -12.53125 27.34375 -12.53125 C 26.007812 -9.726562 23.84375 -8.328125 20.84375 -8.328125 C 19.320312 -8.328125 18.019531 -8.660156 16.9375 -9.328125 C 15.863281 -9.992188 14.878906 -11.144531 13.984375 -12.78125 L 13.8125 -12.78125 C 13.300781 -12.78125 13.046875 -12.5625 13.046875 -12.125 C 13.046875 -11.820312 13.160156 -11.476562 13.390625 -11.09375 C 14.148438 -9.820312 15.101562 -8.820312 16.25 -8.09375 C 17.144531 -7.476562 18.085938 -7.113281 19.078125 -7 L 18.84375 -1.609375 C 17.707031 -0.859375 16.503906 -0.316406 15.234375 0.015625 C 13.960938 0.347656 12.160156 0.515625 9.828125 0.515625 C 7.492188 0.515625 5.410156 0.0546875 3.578125 -0.859375 C 1.328125 -1.984375 0.203125 -3.546875 0.203125 -5.546875 C 0.203125 -8.046875 0.695312 -14.21875 1.6875 -24.0625 C 2.21875 -29.1875 2.644531 -32.769531 2.96875 -34.8125 C 4.9375 -36.5625 7.835938 -37.4375 11.671875 -37.4375 C 14.453125 -37.4375 16.757812 -36.921875 18.59375 -35.890625 L 20.171875 -30.640625 L 19.15625 -26.421875 C 19.082031 -26.140625 19.046875 -25.863281 19.046875 -25.59375 C 19.046875 -24.925781 19.425781 -24.582031 20.1875 -24.5625 L 22.90625 -35.875 C 23.6875 -36.289062 24.707031 -36.65625 25.96875 -36.96875 C 27.226562 -37.28125 28.601562 -37.4375 30.09375 -37.4375 C 32.875 -37.4375 34.9375 -36.960938 36.28125 -36.015625 C 37.625 -35.078125 38.421875 -33.492188 38.671875 -31.265625 C 38.722656 -30.847656 38.804688 -30.148438 38.921875 -29.171875 C 40.660156 -14.265625 41.53125 -5.484375 41.53125 -2.828125 C 39.414062 -0.597656 36.363281 0.515625 32.375 0.515625 Z M 32.375 0.515625 "/></g></g></g>
            <g fill="#ea980c" fillOpacity="0.4"><g transform="translate(141.768698, 155.215267)"><g><path d="M 25.75 -37.40625 C 28.03125 -37.40625 30.007812 -36.785156 31.6875 -35.546875 C 33.363281 -34.304688 34.203125 -32.546875 34.203125 -30.265625 L 34.203125 -14.359375 C 34.203125 -9.515625 32.722656 -5.78125 29.765625 -3.15625 C 26.816406 -0.539062 22.734375 0.765625 17.515625 0.765625 C 12.304688 0.765625 8.25 -0.519531 5.34375 -3.09375 C 2.394531 -5.664062 0.921875 -9.421875 0.921875 -14.359375 L 0.921875 -34.75 C 3.171875 -36.539062 5.769531 -37.4375 8.71875 -37.4375 C 11.195312 -37.4375 13.160156 -36.78125 14.609375 -35.46875 C 16.066406 -34.164062 16.796875 -32.191406 16.796875 -29.546875 L 16.796875 -12.875 C 17.003906 -12.71875 17.242188 -12.640625 17.515625 -12.640625 C 17.796875 -12.640625 18 -12.710938 18.125 -12.859375 C 18.25 -13.003906 18.3125 -13.273438 18.3125 -13.671875 L 18.3125 -29.578125 C 18.3125 -30.773438 18.253906 -31.726562 18.140625 -32.4375 C 18.023438 -33.144531 17.796875 -33.847656 17.453125 -34.546875 C 19.734375 -36.453125 22.5 -37.40625 25.75 -37.40625 Z M 25.75 -37.40625 "/></g></g></g>
            <g fill="#ea980c" fillOpacity="0.4"><g transform="translate(177.181076, 155.215267)"><g><path d="M 16.90625 -20.34375 C 16.976562 -20.28125 17.195312 -20.25 17.5625 -20.25 C 17.925781 -20.25 18.203125 -20.390625 18.390625 -20.671875 C 18.578125 -20.960938 18.671875 -21.429688 18.671875 -22.078125 L 18.671875 -23.109375 C 18.671875 -23.796875 18.585938 -24.285156 18.421875 -24.578125 C 18.265625 -24.878906 18 -25.03125 17.625 -25.03125 C 17.257812 -25.03125 17.007812 -24.988281 16.875 -24.90625 C 16.894531 -24.8125 16.90625 -24.648438 16.90625 -24.421875 Z M 31.65625 -13.8125 L 36.609375 -8.75 C 36.265625 -5.78125 35.320312 -3.492188 33.78125 -1.890625 C 32.25 -0.285156 30.132812 0.515625 27.4375 0.515625 C 25.394531 0.515625 23.617188 0.03125 22.109375 -0.9375 C 20.179688 -2.164062 18.742188 -4.113281 17.796875 -6.78125 L 16.765625 -9.578125 C 15.960938 -9.597656 14.953125 -9.703125 13.734375 -9.890625 C 13.578125 -9.742188 13.5 -9.535156 13.5 -9.265625 C 13.5 -8.753906 14.269531 -8.453125 15.8125 -8.359375 L 17.453125 -4.234375 L 17.453125 -1.796875 C 15.253906 -0.253906 12.441406 0.515625 9.015625 0.515625 C 6.546875 0.515625 4.578125 0.0078125 3.109375 -1 C 1.648438 -2.007812 0.921875 -3.476562 0.921875 -5.40625 L 0.921875 -32.578125 C 0.921875 -33.421875 1.691406 -34.234375 3.234375 -35.015625 C 4.773438 -35.804688 6.796875 -36.445312 9.296875 -36.9375 C 11.796875 -37.425781 14.296875 -37.671875 16.796875 -37.671875 C 22.515625 -37.671875 26.984375 -36.5 30.203125 -34.15625 C 33.597656 -31.695312 35.296875 -28.234375 35.296875 -23.765625 C 35.296875 -21.210938 34.578125 -19.023438 33.140625 -17.203125 C 31.703125 -15.378906 29.882812 -14.117188 27.6875 -13.421875 C 27.6875 -12.804688 28.050781 -12.5 28.78125 -12.5 C 29.519531 -12.5 30.476562 -12.9375 31.65625 -13.8125 Z M 31.65625 -13.8125 "/></g></g></g>
            <g fill="#ea980c" fillOpacity="0.4"><g transform="translate(213.937872, 155.215267)"><g><path d="M 16.90625 -19.1875 C 16.976562 -19.132812 17.195312 -19.109375 17.5625 -19.109375 C 17.925781 -19.109375 18.203125 -19.25 18.390625 -19.53125 C 18.578125 -19.820312 18.671875 -20.289062 18.671875 -20.9375 L 18.671875 -23.109375 C 18.671875 -23.796875 18.585938 -24.285156 18.421875 -24.578125 C 18.265625 -24.878906 18 -25.03125 17.625 -25.03125 C 17.257812 -25.03125 17.007812 -24.988281 16.875 -24.90625 C 16.894531 -24.8125 16.90625 -24.648438 16.90625 -24.421875 Z M 17.625 -6.265625 L 17.625 -1.890625 C 16.78125 -1.179688 15.59375 -0.601562 14.0625 -0.15625 C 12.539062 0.289062 10.953125 0.515625 9.296875 0.515625 C 6.929688 0.515625 4.992188 0.0546875 3.484375 -0.859375 C 1.773438 -1.910156 0.921875 -3.425781 0.921875 -5.40625 L 0.921875 -32.578125 C 0.921875 -33.191406 1.332031 -33.800781 2.15625 -34.40625 C 2.988281 -35.019531 4.140625 -35.570312 5.609375 -36.0625 C 8.753906 -37.132812 12.347656 -37.671875 16.390625 -37.671875 C 21.972656 -37.671875 26.421875 -36.273438 29.734375 -33.484375 C 33.054688 -30.703125 34.71875 -26.960938 34.71875 -22.265625 C 34.71875 -17.566406 33.222656 -13.910156 30.234375 -11.296875 C 27.347656 -8.816406 23.351562 -7.578125 18.25 -7.578125 C 17.082031 -7.578125 15.835938 -7.710938 14.515625 -7.984375 C 13.191406 -8.265625 12.300781 -8.507812 11.84375 -8.71875 C 11.6875 -8.570312 11.609375 -8.363281 11.609375 -8.09375 C 11.609375 -7.125 13.613281 -6.515625 17.625 -6.265625 Z M 17.625 -6.265625 "/></g></g></g>
            <g fill="#ea980c" fillOpacity="0.4"><g transform="translate(248.949798, 155.215267)"><g><path d="M 35.84375 -30.3125 L 35.84375 -1.890625 C 33.707031 -0.285156 30.96875 0.515625 27.625 0.515625 C 25.050781 0.515625 23.015625 -0.0078125 21.515625 -1.0625 C 19.929688 -2.125 19.140625 -3.664062 19.140625 -5.6875 L 19.140625 -11.359375 L 21.171875 -11.359375 C 21.953125 -11.359375 22.441406 -11.457031 22.640625 -11.65625 C 22.835938 -11.851562 22.9375 -12.179688 22.9375 -12.640625 L 13.953125 -12.640625 C 13.953125 -12.179688 14.035156 -11.851562 14.203125 -11.65625 C 14.378906 -11.457031 14.796875 -11.359375 15.453125 -11.359375 L 17.625 -11.359375 L 17.625 -1.890625 C 16.15625 -0.929688 14.757812 -0.289062 13.4375 0.03125 C 12.125 0.351562 10.78125 0.515625 9.40625 0.515625 C 6.832031 0.515625 4.796875 -0.0078125 3.296875 -1.0625 C 1.710938 -2.125 0.921875 -3.664062 0.921875 -5.6875 L 0.921875 -34.15625 C 1.910156 -35.195312 3.132812 -36 4.59375 -36.5625 C 6.050781 -37.125 7.570312 -37.40625 9.15625 -37.40625 C 11.457031 -37.40625 13.410156 -36.835938 15.015625 -35.703125 C 16.753906 -34.398438 17.625 -32.601562 17.625 -30.3125 L 17.625 -25.234375 L 21.25 -25.234375 C 21.25 -25.722656 21.15625 -26.054688 20.96875 -26.234375 C 20.789062 -26.421875 20.503906 -26.515625 20.109375 -26.515625 L 19.140625 -26.515625 L 19.140625 -34.15625 C 20.128906 -35.195312 21.351562 -36 22.8125 -36.5625 C 24.269531 -37.125 25.789062 -37.40625 27.375 -37.40625 C 29.675781 -37.40625 31.628906 -36.835938 33.234375 -35.703125 C 34.972656 -34.398438 35.84375 -32.601562 35.84375 -30.3125 Z M 35.84375 -30.3125 "/></g></g></g>
            <g fill="#ea980c" fillOpacity="0.4"><g transform="translate(285.711381, 155.215267)"><g/></g></g>
            {/* --- Black Text Paths --- */}
            <g fill="#000000" fillOpacity="1"><g clipPath="url(#2f93842feb)"><path d="M 87.402344 167.121094 C 86.359375 167.121094 85.414062 166.695312 84.730469 166.011719 C 84.046875 165.328125 83.621094 164.382812 83.621094 163.339844 C 83.621094 162.296875 84.046875 161.351562 84.730469 160.667969 C 85.414062 159.984375 86.359375 159.558594 87.402344 159.558594 C 88.445312 159.558594 89.390625 159.984375 90.078125 160.667969 C 90.761719 161.351562 91.183594 162.296875 91.183594 163.339844 C 91.183594 164.382812 90.761719 165.328125 90.078125 166.011719 C 89.390625 166.695312 88.445312 167.121094 87.402344 167.121094 Z M 85.800781 164.941406 C 86.210938 165.351562 86.777344 165.605469 87.402344 165.605469 C 88.027344 165.605469 88.59375 165.351562 89.003906 164.941406 C 89.414062 164.53125 89.667969 163.964844 89.667969 163.339844 C 89.667969 162.714844 89.414062 162.148438 89.003906 161.738281 C 88.59375 161.328125 88.027344 161.074219 87.402344 161.074219 C 86.777344 161.074219 86.210938 161.328125 85.800781 161.738281 C 85.390625 162.148438 85.136719 162.714844 85.136719 163.339844 C 85.136719 163.964844 85.390625 164.53125 85.800781 164.941406 Z M 85.800781 164.941406 " fillRule="nonzero"/></g></g>
            <path fill="#000000" d="M 87.402344 165.105469 C 86.914062 165.105469 86.472656 164.90625 86.15625 164.589844 C 85.835938 164.269531 85.636719 163.828125 85.636719 163.339844 C 85.636719 162.855469 85.835938 162.410156 86.15625 162.09375 C 86.472656 161.773438 86.914062 161.578125 87.402344 161.578125 C 87.890625 161.578125 88.332031 161.773438 88.652344 162.09375 C 88.96875 162.410156 89.167969 162.855469 89.167969 163.339844 C 89.167969 163.828125 88.96875 164.269531 88.652344 164.589844 C 88.332031 164.90625 87.890625 165.105469 87.402344 165.105469 Z M 87.402344 165.105469 " fillOpacity="1" fillRule="nonzero"/>
            <g clipPath="url(#9efc5a5269)"><path fill="#000000" d="M 116.925781 173.292969 C 117.171875 173.335938 117.421875 173.359375 117.679688 173.359375 C 117.933594 173.359375 118.183594 173.335938 118.429688 173.292969 L 118.429688 186.558594 C 118.429688 188.019531 118.136719 189.417969 117.605469 190.691406 C 117.054688 192.015625 116.246094 193.210938 115.242188 194.214844 C 114.242188 195.214844 113.046875 196.023438 111.71875 196.574219 C 110.445312 197.105469 109.046875 197.398438 107.585938 197.398438 C 106.121094 197.398438 104.726562 197.105469 103.449219 196.574219 C 102.125 196.023438 100.929688 195.214844 99.929688 194.214844 C 98.925781 193.210938 98.117188 192.015625 97.566406 190.691406 C 97.035156 189.417969 96.742188 188.019531 96.742188 186.558594 L 96.742188 173.429688 C 96.742188 172.175781 96.492188 170.96875 96.03125 169.871094 C 95.558594 168.726562 94.859375 167.699219 94 166.835938 C 93.238281 166.074219 92.34375 165.441406 91.359375 164.976562 C 91.550781 164.511719 91.664062 164.003906 91.683594 163.472656 C 92.949219 164.023438 94.09375 164.808594 95.0625 165.773438 C 96.0625 166.777344 96.871094 167.972656 97.421875 169.296875 C 97.953125 170.570312 98.246094 171.96875 98.246094 173.429688 L 98.246094 186.558594 C 98.246094 187.8125 98.496094 189.019531 98.957031 190.117188 C 99.429688 191.261719 100.128906 192.289062 100.988281 193.152344 C 101.851562 194.015625 102.882812 194.710938 104.023438 195.1875 C 105.125 195.644531 106.328125 195.898438 107.585938 195.898438 C 108.84375 195.898438 110.046875 195.644531 111.148438 195.1875 C 112.289062 194.710938 113.320312 194.015625 114.179688 193.152344 C 115.042969 192.289062 115.742188 191.261719 116.214844 190.117188 C 116.671875 189.019531 116.925781 187.8125 116.925781 186.558594 Z M 116.925781 173.292969 " fillOpacity="1" fillRule="nonzero"/></g>
            <path fill="#000000" d="M 117.679688 168.015625 C 118.976562 168.015625 120.277344 167.875 121.550781 167.585938 L 121.550781 168.984375 C 121.550781 170.050781 121.113281 171.015625 120.414062 171.71875 C 119.710938 172.421875 118.742188 172.859375 117.679688 172.859375 C 116.613281 172.859375 115.644531 172.421875 114.941406 171.71875 C 114.242188 171.015625 113.804688 170.050781 113.804688 168.984375 L 113.804688 167.585938 C 115.078125 167.875 116.378906 168.015625 117.679688 168.015625 Z M 117.679688 168.015625 " fillOpacity="1" fillRule="nonzero"/>
            <path fill="#000000" d="M 127.71875 164.261719 C 124.738281 166.433594 121.207031 167.515625 117.679688 167.515625 C 114.144531 167.515625 110.617188 166.433594 107.636719 164.261719 C 107.144531 163.863281 107.089844 163.296875 107.285156 162.753906 C 107.375 162.5 107.519531 162.253906 107.691406 162.03125 C 107.867188 161.804688 108.078125 161.601562 108.300781 161.441406 C 108.8125 161.078125 109.394531 160.933594 109.808594 161.234375 C 112.144531 162.941406 114.914062 163.796875 117.679688 163.796875 C 120.441406 163.796875 123.207031 162.941406 125.546875 161.234375 C 125.960938 160.933594 126.542969 161.078125 127.054688 161.441406 C 127.277344 161.601562 127.488281 161.804688 127.664062 162.03125 C 127.835938 162.253906 127.980469 162.5 128.070312 162.753906 C 128.261719 163.296875 128.210938 163.863281 127.71875 164.261719 Z M 127.71875 164.261719 " fillOpacity="1" fillRule="nonzero"/>
            <g clipPath="url(#0703ea8ba1)"><path fill="#000000" d="M 127.445312 161.113281 C 127.605469 160.964844 127.765625 160.816406 127.917969 160.660156 C 130.546875 158.035156 132.179688 154.40625 132.179688 150.417969 L 132.179688 134.980469 L 127.46875 134.980469 L 127.394531 135.105469 C 127.160156 135.515625 126.769531 135.867188 126.273438 136.113281 C 125.78125 136.359375 125.195312 136.5 124.5625 136.5 C 123.699219 136.5 122.921875 136.238281 122.359375 135.816406 C 121.820312 135.402344 121.488281 134.84375 121.488281 134.230469 C 121.488281 133.613281 121.820312 133.054688 122.359375 132.644531 C 122.921875 132.21875 123.699219 131.957031 124.5625 131.957031 C 125.195312 131.957031 125.78125 132.097656 126.273438 132.34375 C 126.769531 132.589844 127.160156 132.941406 127.394531 133.351562 L 127.46875 133.476562 L 132.929688 133.476562 C 133.136719 133.476562 133.328125 133.5625 133.460938 133.695312 L 133.460938 133.699219 C 133.597656 133.832031 133.679688 134.019531 133.679688 134.230469 L 133.679688 150.417969 C 133.679688 154.820312 131.878906 158.824219 128.980469 161.722656 C 128.792969 161.910156 128.601562 162.09375 128.40625 162.269531 C 128.308594 162.082031 128.191406 161.898438 128.058594 161.722656 C 127.878906 161.496094 127.671875 161.285156 127.445312 161.113281 Z M 127.445312 161.113281 " fillOpacity="1" fillRule="nonzero"/></g>
            <g clipPath="url(#3b1390245c)"><path fill="#000000" d="M 107.742188 134.980469 L 103.175781 134.980469 L 103.175781 150.417969 C 103.175781 154.40625 104.808594 158.035156 107.4375 160.660156 C 107.589844 160.816406 107.746094 160.964844 107.910156 161.113281 C 107.683594 161.285156 107.476562 161.496094 107.296875 161.722656 C 107.164062 161.898438 107.042969 162.082031 106.949219 162.269531 C 106.753906 162.09375 106.5625 161.910156 106.375 161.722656 C 103.472656 158.824219 101.671875 154.820312 101.671875 150.417969 L 101.671875 134.230469 C 101.671875 134.023438 101.757812 133.832031 101.894531 133.699219 C 102.027344 133.5625 102.21875 133.476562 102.425781 133.476562 L 107.886719 133.476562 L 107.960938 133.351562 C 108.191406 132.941406 108.585938 132.589844 109.082031 132.34375 C 109.574219 132.097656 110.160156 131.957031 110.792969 131.957031 C 111.65625 131.957031 112.433594 132.21875 112.996094 132.644531 C 113.535156 133.054688 113.867188 133.613281 113.867188 134.230469 C 113.867188 134.84375 113.535156 135.402344 112.996094 135.816406 C 112.433594 136.238281 111.65625 136.5 110.792969 136.5 C 110.160156 136.5 109.574219 136.359375 109.082031 136.113281 C 108.585938 135.867188 108.191406 135.515625 107.960938 135.105469 L 107.886719 134.980469 Z M 107.742188 134.980469 " fillOpacity="1" fillRule="nonzero"/></g>
            {/* Text Paths */}
            <g fill="#000000" fillOpacity="1"><g transform="translate(136.048693, 169.017205)"><g><path d="M 4.21875 -7.59375 L 4.21875 -0.515625 C 4.007812 -0.335938 3.726562 -0.1875 3.375 -0.0625 C 3.019531 0.0625 2.59375 0.125 2.09375 0.125 C 1.59375 0.125 1.164062 0.0078125 0.8125 -0.21875 C 0.414062 -0.457031 0.21875 -0.796875 0.21875 -1.234375 L 0.21875 -8.3125 C 0.425781 -8.5 0.707031 -8.65625 1.0625 -8.78125 C 1.414062 -8.90625 1.835938 -8.96875 2.328125 -8.96875 C 2.828125 -8.96875 3.257812 -8.851562 3.625 -8.625 C 4.019531 -8.375 4.21875 -8.03125 4.21875 -7.59375 Z M 4.21875 -7.59375 "/></g></g></g>
            <g fill="#000000" fillOpacity="1"><g transform="translate(140.487031, 169.017205)"><g><path d="M 11.3125 -3.390625 C 11.3125 -3.054688 11.347656 -2.785156 11.421875 -2.578125 C 11.492188 -2.367188 11.617188 -2.207031 11.796875 -2.09375 C 11.804688 -2.070312 11.8125 -2.03125 11.8125 -1.96875 L 11.8125 -1.875 C 11.8125 -1.25 11.628906 -0.757812 11.265625 -0.40625 C 10.898438 -0.0507812 10.425781 0.125 9.84375 0.125 C 9.269531 0.125 8.804688 -0.03125 8.453125 -0.34375 C 8.035156 -0.707031 7.828125 -1.269531 7.828125 -2.03125 L 7.828125 -4.1875 C 7.828125 -4.5 7.726562 -4.65625 7.53125 -4.65625 C 7.445312 -4.65625 7.382812 -4.632812 7.34375 -4.59375 L 7.46875 -3.578125 L 7.46875 -2.03125 C 7.46875 -1.40625 7.570312 -0.929688 7.78125 -0.609375 C 7.5625 -0.378906 7.285156 -0.195312 6.953125 -0.0625 C 6.628906 0.0625 6.296875 0.125 5.953125 0.125 C 5.410156 0.125 4.988281 -0.0078125 4.6875 -0.28125 C 4.320312 -0.59375 4.140625 -1.09375 4.140625 -1.78125 L 4.140625 -4.1875 C 4.140625 -4.5 4.039062 -4.65625 3.84375 -4.65625 C 3.757812 -4.65625 3.695312 -4.632812 3.65625 -4.59375 L 3.78125 -3.578125 L 3.78125 -1.765625 C 3.78125 -1.253906 3.847656 -0.859375 3.984375 -0.578125 C 3.535156 -0.117188 2.90625 0.109375 2.09375 0.109375 C 1.613281 0.109375 1.210938 -0.0078125 0.890625 -0.25 C 0.503906 -0.53125 0.3125 -0.90625 0.3125 -1.375 L 0.3125 -4.640625 C 0.0390625 -5.023438 -0.09375 -5.492188 -0.09375 -6.046875 C -0.09375 -6.597656 0.0390625 -7.078125 0.3125 -7.484375 L 1.96875 -7.484375 C 2.289062 -7.484375 2.566406 -7.363281 2.796875 -7.125 C 2.597656 -6.9375 2.5 -6.78125 2.5 -6.65625 C 2.5 -6.519531 2.578125 -6.453125 2.734375 -6.453125 C 2.929688 -6.796875 3.207031 -7.070312 3.5625 -7.28125 C 3.96875 -7.507812 4.453125 -7.625 5.015625 -7.625 C 5.429688 -7.625 5.796875 -7.535156 6.109375 -7.359375 C 6.429688 -7.179688 6.671875 -6.972656 6.828125 -6.734375 C 7.035156 -7.035156 7.3125 -7.257812 7.65625 -7.40625 C 8.007812 -7.550781 8.367188 -7.625 8.734375 -7.625 C 9.566406 -7.625 10.210938 -7.367188 10.671875 -6.859375 C 11.117188 -6.347656 11.34375 -5.644531 11.34375 -4.75 Z M 11.3125 -3.390625 "/></g></g></g>
            <g fill="#000000" fillOpacity="1"><g transform="translate(152.24041, 169.017205)"><g><path d="M 11.3125 -3.390625 C 11.3125 -3.054688 11.347656 -2.785156 11.421875 -2.578125 C 11.492188 -2.367188 11.617188 -2.207031 11.796875 -2.09375 C 11.804688 -2.070312 11.8125 -2.03125 11.8125 -1.96875 L 11.8125 -1.875 C 11.8125 -1.25 11.628906 -0.757812 11.265625 -0.40625 C 10.898438 -0.0507812 10.425781 0.125 9.84375 0.125 C 9.269531 0.125 8.804688 -0.03125 8.453125 -0.34375 C 8.035156 -0.707031 7.828125 -1.269531 7.828125 -2.03125 L 7.828125 -4.1875 C 7.828125 -4.5 7.726562 -4.65625 7.53125 -4.65625 C 7.445312 -4.65625 7.382812 -4.632812 7.34375 -4.59375 L 7.46875 -3.578125 L 7.46875 -2.03125 C 7.46875 -1.40625 7.570312 -0.929688 7.78125 -0.609375 C 7.5625 -0.378906 7.285156 -0.195312 6.953125 -0.0625 C 6.628906 0.0625 6.296875 0.125 5.953125 0.125 C 5.410156 0.125 4.988281 -0.0078125 4.6875 -0.28125 C 4.320312 -0.59375 4.140625 -1.09375 4.140625 -1.78125 L 4.140625 -4.1875 C 4.140625 -4.5 4.039062 -4.65625 3.84375 -4.65625 C 3.757812 -4.65625 3.695312 -4.632812 3.65625 -4.59375 L 3.78125 -3.578125 L 3.78125 -1.765625 C 3.78125 -1.253906 3.847656 -0.859375 3.984375 -0.578125 C 3.535156 -0.117188 2.90625 0.109375 2.09375 0.109375 C 1.613281 0.109375 1.210938 -0.0078125 0.890625 -0.25 C 0.503906 -0.53125 0.3125 -0.90625 0.3125 -1.375 L 0.3125 -4.640625 C 0.0390625 -5.023438 -0.09375 -5.492188 -0.09375 -6.046875 C -0.09375 -6.597656 0.0390625 -7.078125 0.3125 -7.484375 L 1.96875 -7.484375 C 2.289062 -7.484375 2.566406 -7.363281 2.796875 -7.125 C 2.597656 -6.9375 2.5 -6.78125 2.5 -6.65625 C 2.5 -6.519531 2.578125 -6.453125 2.734375 -6.453125 C 2.929688 -6.796875 3.207031 -7.070312 3.5625 -7.28125 C 3.96875 -7.507812 4.453125 -7.625 5.015625 -7.625 C 5.429688 -7.625 5.796875 -7.535156 6.109375 -7.359375 C 6.429688 -7.179688 6.671875 -6.972656 6.828125 -6.734375 C 7.035156 -7.035156 7.3125 -7.257812 7.65625 -7.40625 C 8.007812 -7.550781 8.367188 -7.625 8.734375 -7.625 C 9.566406 -7.625 10.210938 -7.367188 10.671875 -6.859375 C 11.117188 -6.347656 11.34375 -5.644531 11.34375 -4.75 Z M 11.3125 -3.390625 "/></g></g></g>
            <g fill="#000000" fillOpacity="1"><g transform="translate(163.99379, 169.017205)"><g><path d="M 4.25 0.21875 C 2.988281 0.21875 1.992188 -0.132812 1.265625 -0.84375 C 0.515625 -1.550781 0.140625 -2.519531 0.140625 -3.75 C 0.140625 -4.976562 0.523438 -5.957031 1.296875 -6.6875 C 2.003906 -7.351562 2.90625 -7.6875 4 -7.6875 C 5.09375 -7.6875 5.96875 -7.382812 6.625 -6.78125 C 7.289062 -6.1875 7.625 -5.445312 7.625 -4.5625 C 7.625 -3.78125 7.347656 -3.191406 6.796875 -2.796875 C 6.296875 -2.421875 5.613281 -2.234375 4.75 -2.234375 C 4.101562 -2.234375 3.554688 -2.367188 3.109375 -2.640625 C 3.066406 -2.617188 3.046875 -2.570312 3.046875 -2.5 C 3.046875 -2.351562 3.226562 -2.222656 3.59375 -2.109375 C 3.945312 -1.992188 4.351562 -1.9375 4.8125 -1.9375 C 5.28125 -1.9375 5.703125 -1.992188 6.078125 -2.109375 C 6.453125 -2.222656 6.753906 -2.359375 6.984375 -2.515625 C 7.085938 -2.421875 7.171875 -2.242188 7.234375 -1.984375 C 7.304688 -1.734375 7.34375 -1.5 7.34375 -1.28125 C 7.34375 -1.070312 7.320312 -0.882812 7.28125 -0.71875 C 6.925781 -0.414062 6.5625 -0.203125 6.1875 -0.078125 C 5.65625 0.117188 5.007812 0.21875 4.25 0.21875 Z M 4.171875 -4.421875 C 4.398438 -4.421875 4.515625 -4.507812 4.515625 -4.6875 C 4.515625 -4.851562 4.390625 -4.9375 4.140625 -4.9375 C 3.898438 -4.9375 3.765625 -4.804688 3.734375 -4.546875 C 3.859375 -4.460938 4.003906 -4.421875 4.171875 -4.421875 Z M 4.171875 -4.421875 "/></g></g></g>
            <g fill="#000000" fillOpacity="1"><g transform="translate(171.747184, 169.017205)"><g><path d="M 2.15625 0.09375 C 1.613281 0.09375 1.179688 -0.00390625 0.859375 -0.203125 C 0.492188 -0.410156 0.3125 -0.710938 0.3125 -1.109375 L 0.3125 -4.640625 C 0.0390625 -5.023438 -0.09375 -5.492188 -0.09375 -6.046875 C -0.09375 -6.597656 0.0390625 -7.078125 0.3125 -7.484375 L 1.359375 -7.484375 C 1.898438 -7.484375 2.285156 -7.3125 2.515625 -6.96875 C 2.398438 -6.84375 2.300781 -6.679688 2.21875 -6.484375 C 2.132812 -6.285156 2.09375 -6.144531 2.09375 -6.0625 C 2.09375 -5.976562 2.113281 -5.914062 2.15625 -5.875 C 2.195312 -5.832031 2.257812 -5.8125 2.34375 -5.8125 C 2.5 -6.445312 2.800781 -6.910156 3.25 -7.203125 C 3.625 -7.453125 4.082031 -7.578125 4.625 -7.578125 C 5.300781 -7.578125 5.832031 -7.4375 6.21875 -7.15625 C 6.351562 -6.789062 6.421875 -6.34375 6.421875 -5.8125 C 6.421875 -5.28125 6.316406 -4.800781 6.109375 -4.375 C 5.953125 -4.289062 5.734375 -4.21875 5.453125 -4.15625 C 5.179688 -4.101562 4.90625 -4.078125 4.625 -4.078125 C 4.351562 -4.078125 4.101562 -4.097656 3.875 -4.140625 C 3.65625 -4.179688 3.492188 -4.21875 3.390625 -4.25 C 3.359375 -4.207031 3.34375 -4.148438 3.34375 -4.078125 C 3.34375 -4.015625 3.382812 -3.96875 3.46875 -3.9375 C 3.5625 -3.90625 3.710938 -3.867188 3.921875 -3.828125 L 3.921875 -0.390625 C 3.421875 -0.0664062 2.832031 0.09375 2.15625 0.09375 Z M 2.15625 0.09375 "/></g></g></g>
            <g fill="#000000" fillOpacity="1"><g transform="translate(178.247165, 169.017205)"><g/></g></g>
            <g fill="#000000" fillOpacity="1"><g transform="translate(181.534823, 169.017205)"><g><path d="M 4.25 0.21875 C 2.988281 0.21875 1.992188 -0.132812 1.265625 -0.84375 C 0.515625 -1.550781 0.140625 -2.519531 0.140625 -3.75 C 0.140625 -4.976562 0.523438 -5.957031 1.296875 -6.6875 C 2.003906 -7.351562 2.90625 -7.6875 4 -7.6875 C 5.09375 -7.6875 5.96875 -7.382812 6.625 -6.78125 C 7.289062 -6.1875 7.625 -5.445312 7.625 -4.5625 C 7.625 -3.78125 7.347656 -3.191406 6.796875 -2.796875 C 6.296875 -2.421875 5.613281 -2.234375 4.75 -2.234375 C 4.101562 -2.234375 3.554688 -2.367188 3.109375 -2.640625 C 3.066406 -2.617188 3.046875 -2.570312 3.046875 -2.5 C 3.046875 -2.351562 3.226562 -2.222656 3.59375 -2.109375 C 3.945312 -1.992188 4.351562 -1.9375 4.8125 -1.9375 C 5.28125 -1.9375 5.703125 -1.992188 6.078125 -2.109375 C 6.453125 -2.222656 6.753906 -2.359375 6.984375 -2.515625 C 7.085938 -2.421875 7.171875 -2.242188 7.234375 -1.984375 C 7.304688 -1.734375 7.34375 -1.5 7.34375 -1.28125 C 7.34375 -1.070312 7.320312 -0.882812 7.28125 -0.71875 C 6.925781 -0.414062 6.5625 -0.203125 6.1875 -0.078125 C 5.65625 0.117188 5.007812 0.21875 4.25 0.21875 Z M 4.171875 -4.421875 C 4.398438 -4.421875 4.515625 -4.507812 4.515625 -4.6875 C 4.515625 -4.851562 4.390625 -4.9375 4.140625 -4.9375 C 3.898438 -4.9375 3.765625 -4.804688 3.734375 -4.546875 C 3.859375 -4.460938 4.003906 -4.421875 4.171875 -4.421875 Z M 4.171875 -4.421875 "/></g></g></g>
            <g fill="#000000" fillOpacity="1"><g transform="translate(189.288218, 169.017205)"><g><path d="M 3.734375 -6.171875 L 3.734375 -3.453125 C 3.734375 -2.773438 3.898438 -2.332031 4.234375 -2.125 C 4.234375 -2.101562 4.234375 -2.0625 4.234375 -2 L 4.234375 -1.875 C 4.234375 -1.195312 4.050781 -0.691406 3.6875 -0.359375 C 3.351562 -0.0351562 2.90625 0.125 2.34375 0.125 C 1.78125 0.125 1.316406 -0.0351562 0.953125 -0.359375 C 0.484375 -0.765625 0.25 -1.359375 0.25 -2.140625 L 0.25 -6.59375 C 0.332031 -6.65625 0.421875 -6.703125 0.515625 -6.734375 C 0.617188 -6.773438 0.722656 -6.820312 0.828125 -6.875 C 0.628906 -6.96875 0.445312 -7.140625 0.28125 -7.390625 C 0.125 -7.640625 0.046875 -7.929688 0.046875 -8.265625 C 0.046875 -8.835938 0.234375 -9.304688 0.609375 -9.671875 C 0.992188 -10.046875 1.460938 -10.234375 2.015625 -10.234375 C 2.566406 -10.234375 3.023438 -10.046875 3.390625 -9.671875 C 3.765625 -9.296875 3.953125 -8.828125 3.953125 -8.265625 C 3.953125 -7.816406 3.8125 -7.421875 3.53125 -7.078125 C 3.25 -6.734375 2.90625 -6.519531 2.5 -6.4375 C 2.5 -6.269531 2.5625 -6.1875 2.6875 -6.1875 C 2.925781 -6.1875 3.164062 -6.273438 3.40625 -6.453125 C 3.582031 -6.304688 3.691406 -6.210938 3.734375 -6.171875 Z M 3.734375 -6.171875 "/></g></g></g>
            <g fill="#000000" fillOpacity="1"><g transform="translate(193.473139, 169.017205)"><g><path d="M 7.46875 -3.390625 C 7.46875 -3.054688 7.503906 -2.789062 7.578125 -2.59375 C 7.648438 -2.394531 7.78125 -2.238281 7.96875 -2.125 C 7.96875 -2.101562 7.96875 -2.0625 7.96875 -2 L 7.96875 -1.875 C 7.96875 -1.238281 7.785156 -0.742188 7.421875 -0.390625 C 7.054688 -0.046875 6.585938 0.125 6.015625 0.125 C 5.441406 0.125 4.976562 -0.0351562 4.625 -0.359375 C 4.207031 -0.734375 4 -1.296875 4 -2.046875 C 4 -2.367188 4.015625 -2.648438 4.046875 -2.890625 C 4.078125 -3.140625 4.097656 -3.316406 4.109375 -3.421875 C 4.117188 -3.523438 4.128906 -3.617188 4.140625 -3.703125 C 4.160156 -3.796875 4.171875 -3.929688 4.171875 -4.109375 C 4.171875 -4.296875 4.144531 -4.425781 4.09375 -4.5 C 4.039062 -4.582031 3.972656 -4.625 3.890625 -4.625 C 3.804688 -4.625 3.734375 -4.601562 3.671875 -4.5625 L 3.765625 -3.453125 C 3.679688 -2.984375 3.640625 -2.488281 3.640625 -1.96875 C 3.640625 -1.457031 3.753906 -0.988281 3.984375 -0.5625 C 3.535156 -0.101562 2.910156 0.125 2.109375 0.125 C 1.640625 0.125 1.238281 0.00390625 0.90625 -0.234375 C 0.507812 -0.515625 0.3125 -0.878906 0.3125 -1.328125 L 0.3125 -4.640625 C 0.0390625 -5.023438 -0.09375 -5.492188 -0.09375 -6.046875 C -0.09375 -6.597656 0.0390625 -7.078125 0.3125 -7.484375 L 1.53125 -7.484375 C 1.851562 -7.484375 2.128906 -7.363281 2.359375 -7.125 C 2.160156 -6.9375 2.0625 -6.78125 2.0625 -6.65625 C 2.0625 -6.519531 2.140625 -6.453125 2.296875 -6.453125 C 2.503906 -6.796875 2.8125 -7.082031 3.21875 -7.3125 C 3.632812 -7.539062 4.101562 -7.65625 4.625 -7.65625 C 5.414062 -7.65625 6.0625 -7.460938 6.5625 -7.078125 C 7.175781 -6.585938 7.484375 -5.828125 7.484375 -4.796875 Z M 7.46875 -3.390625 "/></g></g></g>
            <g fill="#000000" fillOpacity="1"><g transform="translate(201.384073, 169.017205)"><g/></g></g>
            <g fill="#000000" fillOpacity="1"><g transform="translate(204.671731, 169.017205)"><g><path d="M 3.828125 -3.8125 L 3.828125 -2.609375 C 3.859375 -2.578125 3.910156 -2.5625 3.984375 -2.5625 C 4.054688 -2.5625 4.109375 -2.585938 4.140625 -2.640625 C 4.171875 -2.691406 4.1875 -2.78125 4.1875 -2.90625 L 4.1875 -3.890625 C 4.1875 -4.328125 4.164062 -4.613281 4.125 -4.75 C 4.09375 -4.894531 4.023438 -4.96875 3.921875 -4.96875 C 3.859375 -4.96875 3.804688 -4.945312 3.765625 -4.90625 C 3.804688 -4.457031 3.828125 -4.09375 3.828125 -3.8125 Z M 1.265625 -0.78125 C 0.515625 -1.5 0.140625 -2.472656 0.140625 -3.703125 C 0.140625 -4.941406 0.488281 -5.921875 1.1875 -6.640625 C 1.894531 -7.359375 2.820312 -7.71875 3.96875 -7.71875 C 5.113281 -7.71875 6.039062 -7.34375 6.75 -6.59375 C 7.457031 -5.851562 7.8125 -4.882812 7.8125 -3.6875 C 7.8125 -2.488281 7.472656 -1.535156 6.796875 -0.828125 C 6.117188 -0.128906 5.195312 0.21875 4.03125 0.21875 C 2.863281 0.21875 1.941406 -0.113281 1.265625 -0.78125 Z M 1.265625 -0.78125 "/></g></g></g>
            <g fill="#000000" fillOpacity="1"><g transform="translate(212.616906, 169.017205)"><g><path d="M 2.921875 0.09375 C 2.378906 0.09375 1.941406 -0.00390625 1.609375 -0.203125 C 1.253906 -0.410156 1.078125 -0.710938 1.078125 -1.109375 L 1.078125 -4.328125 L 1.28125 -4.328125 C 1.507812 -4.328125 1.625 -4.40625 1.625 -4.5625 C 1.625 -4.570312 1.617188 -4.597656 1.609375 -4.640625 L 0.484375 -4.640625 C 0.210938 -5.015625 0.078125 -5.476562 0.078125 -6.03125 C 0.078125 -6.59375 0.210938 -7.078125 0.484375 -7.484375 L 1.078125 -7.484375 C 1.179688 -8.242188 1.472656 -8.820312 1.953125 -9.21875 C 2.441406 -9.625 3.085938 -9.828125 3.890625 -9.828125 C 4.472656 -9.828125 4.972656 -9.742188 5.390625 -9.578125 C 5.816406 -9.421875 6.128906 -9.234375 6.328125 -9.015625 C 6.378906 -8.867188 6.40625 -8.6875 6.40625 -8.46875 L 6.40625 -8.34375 C 6.40625 -7.875 6.332031 -7.460938 6.1875 -7.109375 C 5.875 -6.984375 5.4375 -6.921875 4.875 -6.921875 C 4.632812 -6.921875 4.375 -6.9375 4.09375 -6.96875 C 3.820312 -7 3.625 -7.03125 3.5 -7.0625 C 3.46875 -7.03125 3.453125 -6.984375 3.453125 -6.921875 C 3.453125 -6.847656 3.5625 -6.773438 3.78125 -6.703125 C 4 -6.640625 4.351562 -6.609375 4.84375 -6.609375 C 5.332031 -6.609375 5.734375 -6.632812 6.046875 -6.6875 C 6.078125 -6.613281 6.109375 -6.472656 6.140625 -6.265625 C 6.171875 -6.066406 6.1875 -5.867188 6.1875 -5.671875 C 6.1875 -5.253906 6.109375 -4.910156 5.953125 -4.640625 L 4.6875 -4.640625 L 4.6875 -0.390625 C 4.1875 -0.0664062 3.597656 0.09375 2.921875 0.09375 Z M 2.921875 0.09375 "/></g></g></g>
            <g fill="#000000" fillOpacity="1"><g transform="translate(219.02784, 169.017205)"><g><path d="M 2.921875 0.09375 C 2.378906 0.09375 1.941406 -0.00390625 1.609375 -0.203125 C 1.253906 -0.410156 1.078125 -0.710938 1.078125 -1.109375 L 1.078125 -4.328125 L 1.28125 -4.328125 C 1.507812 -4.328125 1.625 -4.40625 1.625 -4.5625 C 1.625 -4.570312 1.617188 -4.597656 1.609375 -4.640625 L 0.484375 -4.640625 C 0.210938 -5.015625 0.078125 -5.476562 0.078125 -6.03125 C 0.078125 -6.59375 0.210938 -7.078125 0.484375 -7.484375 L 1.078125 -7.484375 C 1.179688 -8.242188 1.472656 -8.820312 1.953125 -9.21875 C 2.441406 -9.625 3.085938 -9.828125 3.890625 -9.828125 C 4.472656 -9.828125 4.972656 -9.742188 5.390625 -9.578125 C 5.816406 -9.421875 6.128906 -9.234375 6.328125 -9.015625 C 6.378906 -8.867188 6.40625 -8.6875 6.40625 -8.46875 L 6.40625 -8.34375 C 6.40625 -7.875 6.332031 -7.460938 6.1875 -7.109375 C 5.875 -6.984375 5.4375 -6.921875 4.875 -6.921875 C 4.632812 -6.921875 4.375 -6.9375 4.09375 -6.96875 C 3.820312 -7 3.625 -7.03125 3.5 -7.0625 C 3.46875 -7.03125 3.453125 -6.984375 3.453125 -6.921875 C 3.453125 -6.847656 3.5625 -6.773438 3.78125 -6.703125 C 4 -6.640625 4.351562 -6.609375 4.84375 -6.609375 C 5.332031 -6.609375 5.734375 -6.632812 6.046875 -6.6875 C 6.078125 -6.613281 6.109375 -6.472656 6.140625 -6.265625 C 6.171875 -6.066406 6.1875 -5.867188 6.1875 -5.671875 C 6.1875 -5.253906 6.109375 -4.910156 5.953125 -4.640625 L 4.6875 -4.640625 L 4.6875 -0.390625 C 4.1875 -0.0664062 3.597656 0.09375 2.921875 0.09375 Z M 2.921875 0.09375 "/></g></g></g>
            <g fill="#000000" fillOpacity="1"><g transform="translate(225.438774, 169.017205)"><g><path d="M 4.25 0.21875 C 2.988281 0.21875 1.992188 -0.132812 1.265625 -0.84375 C 0.515625 -1.550781 0.140625 -2.519531 0.140625 -3.75 C 0.140625 -4.976562 0.523438 -5.957031 1.296875 -6.6875 C 2.003906 -7.351562 2.90625 -7.6875 4 -7.6875 C 5.09375 -7.6875 5.96875 -7.382812 6.625 -6.78125 C 7.289062 -6.1875 7.625 -5.445312 7.625 -4.5625 C 7.625 -3.78125 7.347656 -3.191406 6.796875 -2.796875 C 6.296875 -2.421875 5.613281 -2.234375 4.75 -2.234375 C 4.101562 -2.234375 3.554688 -2.367188 3.109375 -2.640625 C 3.066406 -2.617188 3.046875 -2.570312 3.046875 -2.5 C 3.046875 -2.351562 3.226562 -2.222656 3.59375 -2.109375 C 3.945312 -1.992188 4.351562 -1.9375 4.8125 -1.9375 C 5.28125 -1.9375 5.703125 -1.992188 6.078125 -2.109375 C 6.453125 -2.222656 6.753906 -2.359375 6.984375 -2.515625 C 7.085938 -2.421875 7.171875 -2.242188 7.234375 -1.984375 C 7.304688 -1.734375 7.34375 -1.5 7.34375 -1.28125 C 7.34375 -1.070312 7.320312 -0.882812 7.28125 -0.71875 C 6.925781 -0.414062 6.5625 -0.203125 6.1875 -0.078125 C 5.65625 0.117188 5.007812 0.21875 4.25 0.21875 Z M 4.171875 -4.421875 C 4.398438 -4.421875 4.515625 -4.507812 4.515625 -4.6875 C 4.515625 -4.851562 4.390625 -4.9375 4.140625 -4.9375 C 3.898438 -4.9375 3.765625 -4.804688 3.734375 -4.546875 C 3.859375 -4.460938 4.003906 -4.421875 4.171875 -4.421875 Z M 4.171875 -4.421875 "/></g></g></g>
            <g fill="#000000" fillOpacity="1"><g transform="translate(233.192168, 169.017205)"><g><path d="M 7.46875 -3.390625 C 7.46875 -3.054688 7.503906 -2.789062 7.578125 -2.59375 C 7.648438 -2.394531 7.78125 -2.238281 7.96875 -2.125 C 7.96875 -2.101562 7.96875 -2.0625 7.96875 -2 L 7.96875 -1.875 C 7.96875 -1.238281 7.785156 -0.742188 7.421875 -0.390625 C 7.054688 -0.046875 6.585938 0.125 6.015625 0.125 C 5.441406 0.125 4.976562 -0.0351562 4.625 -0.359375 C 4.207031 -0.734375 4 -1.296875 4 -2.046875 C 4 -2.367188 4.015625 -2.648438 4.046875 -2.890625 C 4.078125 -3.140625 4.097656 -3.316406 4.109375 -3.421875 C 4.117188 -3.523438 4.128906 -3.617188 4.140625 -3.703125 C 4.160156 -3.796875 4.171875 -3.929688 4.171875 -4.109375 C 4.171875 -4.296875 4.144531 -4.425781 4.09375 -4.5 C 4.039062 -4.582031 3.972656 -4.625 3.890625 -4.625 C 3.804688 -4.625 3.734375 -4.601562 3.671875 -4.5625 L 3.765625 -3.453125 C 3.679688 -2.984375 3.640625 -2.488281 3.640625 -1.96875 C 3.640625 -1.457031 3.753906 -0.988281 3.984375 -0.5625 C 3.535156 -0.101562 2.910156 0.125 2.109375 0.125 C 1.640625 0.125 1.238281 0.00390625 0.90625 -0.234375 C 0.507812 -0.515625 0.3125 -0.878906 0.3125 -1.328125 L 0.3125 -4.640625 C 0.0390625 -5.023438 -0.09375 -5.492188 -0.09375 -6.046875 C -0.09375 -6.597656 0.0390625 -7.078125 0.3125 -7.484375 L 1.53125 -7.484375 C 1.851562 -7.484375 2.128906 -7.363281 2.359375 -7.125 C 2.160156 -6.9375 2.0625 -6.78125 2.0625 -6.65625 C 2.0625 -6.519531 2.140625 -6.453125 2.296875 -6.453125 C 2.503906 -6.796875 2.8125 -7.082031 3.21875 -7.3125 C 3.632812 -7.539062 4.101562 -7.65625 4.625 -7.65625 C 5.414062 -7.65625 6.0625 -7.460938 6.5625 -7.078125 C 7.175781 -6.585938 7.484375 -5.828125 7.484375 -4.796875 Z M 7.46875 -3.390625 "/></g></g></g>
            <g fill="#000000" fillOpacity="1"><g transform="translate(241.103102, 169.017205)"><g><path d="M 4.25 0.21875 C 2.988281 0.21875 1.992188 -0.132812 1.265625 -0.84375 C 0.515625 -1.550781 0.140625 -2.519531 0.140625 -3.75 C 0.140625 -4.976562 0.523438 -5.957031 1.296875 -6.6875 C 2.003906 -7.351562 2.90625 -7.6875 4 -7.6875 C 5.09375 -7.6875 5.96875 -7.382812 6.625 -6.78125 C 7.289062 -6.1875 7.625 -5.445312 7.625 -4.5625 C 7.625 -3.78125 7.347656 -3.191406 6.796875 -2.796875 C 6.296875 -2.421875 5.613281 -2.234375 4.75 -2.234375 C 4.101562 -2.234375 3.554688 -2.367188 3.109375 -2.640625 C 3.066406 -2.617188 3.046875 -2.570312 3.046875 -2.5 C 3.046875 -2.351562 3.226562 -2.222656 3.59375 -2.109375 C 3.945312 -1.992188 4.351562 -1.9375 4.8125 -1.9375 C 5.28125 -1.9375 5.703125 -1.992188 6.078125 -2.109375 C 6.453125 -2.222656 6.753906 -2.359375 6.984375 -2.515625 C 7.085938 -2.421875 7.171875 -2.242188 7.234375 -1.984375 C 7.304688 -1.734375 7.34375 -1.5 7.34375 -1.28125 C 7.34375 -1.070312 7.320312 -0.882812 7.28125 -0.71875 C 6.925781 -0.414062 6.5625 -0.203125 6.1875 -0.078125 C 5.65625 0.117188 5.007812 0.21875 4.25 0.21875 Z M 4.171875 -4.421875 C 4.398438 -4.421875 4.515625 -4.507812 4.515625 -4.6875 C 4.515625 -4.851562 4.390625 -4.9375 4.140625 -4.9375 C 3.898438 -4.9375 3.765625 -4.804688 3.734375 -4.546875 C 3.859375 -4.460938 4.003906 -4.421875 4.171875 -4.421875 Z M 4.171875 -4.421875 "/></g></g></g>
            <g fill="#000000" fillOpacity="1"><g transform="translate(248.856497, 169.017205)"><g><path d="M 3.890625 -5.375 C 3.765625 -5.332031 3.703125 -5.257812 3.703125 -5.15625 L 3.703125 -5.125 C 3.703125 -5.101562 3.707031 -5.085938 3.71875 -5.078125 C 3.757812 -5.085938 3.820312 -5.09375 3.90625 -5.09375 L 4.078125 -5.09375 C 4.597656 -5.09375 5.082031 -5.015625 5.53125 -4.859375 C 5.988281 -4.703125 6.363281 -4.445312 6.65625 -4.09375 C 6.96875 -3.707031 7.125 -3.210938 7.125 -2.609375 C 7.125 -1.679688 6.800781 -0.976562 6.15625 -0.5 C 5.519531 -0.0195312 4.660156 0.21875 3.578125 0.21875 C 2.503906 0.21875 1.660156 0.0390625 1.046875 -0.3125 C 0.441406 -0.675781 0.140625 -1.203125 0.140625 -1.890625 C 0.140625 -2.148438 0.191406 -2.382812 0.296875 -2.59375 C 0.410156 -2.800781 0.535156 -2.953125 0.671875 -3.046875 C 0.921875 -2.835938 1.285156 -2.65625 1.765625 -2.5 C 2.242188 -2.34375 2.75 -2.265625 3.28125 -2.265625 C 3.5 -2.265625 3.609375 -2.328125 3.609375 -2.453125 C 3.609375 -2.503906 3.597656 -2.546875 3.578125 -2.578125 C 3.546875 -2.578125 3.507812 -2.578125 3.46875 -2.578125 L 3.390625 -2.578125 C 2.421875 -2.578125 1.644531 -2.769531 1.0625 -3.15625 C 0.40625 -3.582031 0.078125 -4.191406 0.078125 -4.984375 C 0.078125 -5.773438 0.375 -6.414062 0.96875 -6.90625 C 1.625 -7.445312 2.519531 -7.71875 3.65625 -7.71875 C 4.21875 -7.71875 4.738281 -7.65625 5.21875 -7.53125 C 5.707031 -7.414062 6.128906 -7.257812 6.484375 -7.0625 C 6.566406 -6.875 6.609375 -6.597656 6.609375 -6.234375 C 6.609375 -5.679688 6.457031 -5.253906 6.15625 -4.953125 C 5.914062 -5.078125 5.628906 -5.179688 5.296875 -5.265625 C 4.960938 -5.359375 4.660156 -5.40625 4.390625 -5.40625 C 4.117188 -5.40625 3.953125 -5.394531 3.890625 -5.375 Z M 3.890625 -5.375 "/></g></g></g>
            <g fill="#000000" fillOpacity="1"><g transform="translate(259.287969, 169.017205)"><g><path d="M 4.921875 -4.734375 C 4.921875 -5.179688 4.898438 -5.488281 4.859375 -5.65625 C 4.816406 -5.832031 4.742188 -5.921875 4.640625 -5.921875 C 4.566406 -5.921875 4.503906 -5.898438 4.453125 -5.859375 C 4.460938 -5.773438 4.472656 -5.664062 4.484375 -5.53125 C 4.503906 -5.394531 4.515625 -5.101562 4.515625 -4.65625 L 4.515625 -4.203125 C 4.515625 -3.890625 4.507812 -3.660156 4.5 -3.515625 C 4.488281 -3.378906 4.476562 -3.265625 4.46875 -3.171875 C 4.457031 -3.109375 4.453125 -3.050781 4.453125 -3 C 4.503906 -2.957031 4.566406 -2.9375 4.640625 -2.9375 C 4.742188 -2.9375 4.816406 -3.019531 4.859375 -3.1875 C 4.898438 -3.363281 4.921875 -3.675781 4.921875 -4.125 Z M 4.65625 0.21875 C 3.84375 0.21875 3.09375 0.0507812 2.40625 -0.28125 C 1.726562 -0.613281 1.179688 -1.125 0.765625 -1.8125 C 0.359375 -2.507812 0.15625 -3.378906 0.15625 -4.421875 C 0.15625 -5.921875 0.601562 -7.09375 1.5 -7.9375 C 2.3125 -8.6875 3.347656 -9.0625 4.609375 -9.0625 C 5.984375 -9.0625 7.070312 -8.632812 7.875 -7.78125 C 8.675781 -6.925781 9.078125 -5.804688 9.078125 -4.421875 C 9.078125 -2.878906 8.648438 -1.703125 7.796875 -0.890625 C 7.015625 -0.148438 5.96875 0.21875 4.65625 0.21875 Z M 4.65625 0.21875 "/></g></g></g>
            <g fill="#000000" fillOpacity="1"><g transform="translate(268.513966, 169.017205)"><g><path d="M 7.40625 -3.390625 C 7.40625 -3.054688 7.441406 -2.789062 7.515625 -2.59375 C 7.585938 -2.394531 7.71875 -2.238281 7.90625 -2.125 C 7.90625 -2.101562 7.90625 -2.0625 7.90625 -2 L 7.90625 -1.875 C 7.90625 -1.238281 7.722656 -0.742188 7.359375 -0.390625 C 6.992188 -0.046875 6.523438 0.125 5.953125 0.125 C 5.378906 0.125 4.914062 -0.0351562 4.5625 -0.359375 C 4.144531 -0.734375 3.9375 -1.296875 3.9375 -2.046875 C 3.9375 -2.367188 3.953125 -2.648438 3.984375 -2.890625 C 4.015625 -3.140625 4.035156 -3.316406 4.046875 -3.421875 C 4.054688 -3.523438 4.066406 -3.617188 4.078125 -3.703125 C 4.097656 -3.796875 4.109375 -3.929688 4.109375 -4.109375 C 4.109375 -4.296875 4.082031 -4.425781 4.03125 -4.5 C 3.976562 -4.582031 3.910156 -4.625 3.828125 -4.625 C 3.742188 -4.625 3.671875 -4.601562 3.609375 -4.5625 L 3.703125 -3.453125 C 3.617188 -2.984375 3.578125 -2.488281 3.578125 -1.96875 C 3.578125 -1.457031 3.691406 -0.988281 3.921875 -0.5625 C 3.472656 -0.101562 2.847656 0.125 2.046875 0.125 C 1.578125 0.125 1.175781 0.00390625 0.84375 -0.234375 C 0.445312 -0.515625 0.25 -0.878906 0.25 -1.328125 L 0.25 -9.328125 C 0.46875 -9.453125 0.726562 -9.554688 1.03125 -9.640625 C 1.34375 -9.722656 1.660156 -9.765625 1.984375 -9.765625 C 2.503906 -9.765625 2.9375 -9.660156 3.28125 -9.453125 C 3.664062 -9.210938 3.859375 -8.863281 3.859375 -8.40625 L 3.859375 -7.765625 C 3.460938 -7.742188 3.082031 -7.628906 2.71875 -7.421875 C 2.40625 -7.234375 2.25 -7.066406 2.25 -6.921875 C 2.25 -6.867188 2.265625 -6.820312 2.296875 -6.78125 C 2.335938 -6.75 2.382812 -6.726562 2.4375 -6.71875 C 2.625 -6.9375 2.890625 -7.117188 3.234375 -7.265625 C 3.585938 -7.421875 4.003906 -7.5 4.484375 -7.5 C 4.960938 -7.5 5.394531 -7.425781 5.78125 -7.28125 C 6.269531 -7.101562 6.648438 -6.828125 6.921875 -6.453125 C 7.253906 -5.992188 7.421875 -5.421875 7.421875 -4.734375 Z M 7.40625 -3.390625 "/></g></g></g>
            <g fill="#000000" fillOpacity="1"><g transform="translate(276.363251, 169.017205)"><g><path d="M 2.15625 0.09375 C 1.613281 0.09375 1.179688 -0.00390625 0.859375 -0.203125 C 0.492188 -0.410156 0.3125 -0.710938 0.3125 -1.109375 L 0.3125 -4.640625 C 0.0390625 -5.023438 -0.09375 -5.492188 -0.09375 -6.046875 C -0.09375 -6.597656 0.0390625 -7.078125 0.3125 -7.484375 L 1.359375 -7.484375 C 1.898438 -7.484375 2.285156 -7.3125 2.515625 -6.96875 C 2.398438 -6.84375 2.300781 -6.679688 2.21875 -6.484375 C 2.132812 -6.285156 2.09375 -6.144531 2.09375 -6.0625 C 2.09375 -5.976562 2.113281 -5.914062 2.15625 -5.875 C 2.195312 -5.832031 2.257812 -5.8125 2.34375 -5.8125 C 2.5 -6.445312 2.800781 -6.910156 3.25 -7.203125 C 3.625 -7.453125 4.082031 -7.578125 4.625 -7.578125 C 5.300781 -7.578125 5.832031 -7.4375 6.21875 -7.15625 C 6.351562 -6.789062 6.421875 -6.34375 6.421875 -5.8125 C 6.421875 -5.28125 6.316406 -4.800781 6.109375 -4.375 C 5.953125 -4.289062 5.734375 -4.21875 5.453125 -4.15625 C 5.179688 -4.101562 4.90625 -4.078125 4.625 -4.078125 C 4.351562 -4.078125 4.101562 -4.097656 3.875 -4.140625 C 3.65625 -4.179688 3.492188 -4.21875 3.390625 -4.25 C 3.359375 -4.207031 3.34375 -4.148438 3.34375 -4.078125 C 3.34375 -4.015625 3.382812 -3.96875 3.46875 -3.9375 C 3.5625 -3.90625 3.710938 -3.867188 3.921875 -3.828125 L 3.921875 -0.390625 C 3.421875 -0.0664062 2.832031 0.09375 2.15625 0.09375 Z M 2.15625 0.09375 "/></g></g></g>
            {/* Add title for accessibility */}
            <title>Murph Logo</title>
        </svg>
    </div>
  );
};

export default Logo;
```

## File: `components/core/NextAuthProvider.tsx`

```tsx
// components/core/NextAuthProvider.tsx
'use client'; // This needs to be a client component

import { SessionProvider } from 'next-auth/react';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

export default function NextAuthProvider({ children }: Props) {
  // We don't pass the session prop here as SessionProvider will fetch it
  return <SessionProvider>{children}</SessionProvider>;
}
```

## File: `components/core/PageTransitionWrapper.tsx`

```tsx
// components/core/PageTransitionWrapper.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface PageTransitionWrapperProps {
  children: React.ReactNode;
  className?: string; // Allow passing className
}

const PageTransitionWrapper: React.FC<PageTransitionWrapperProps> = ({ children, className }) => {
  return (
    <motion.main
      className={className} // Apply className here
      initial={{ opacity: 0, y: 5 }} // Start slightly down and invisible
      animate={{ opacity: 1, y: 0 }} // Fade in and move up to original position
      transition={{ duration: 0.4, ease: 'easeInOut' }} // Adjust duration/easing as needed
    >
      {children}
    </motion.main>
  );
};

export default PageTransitionWrapper;
```

## File: `components/core/TrustBadge.tsx`

```tsx
// components/core/TrustBadge.tsx
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Use Card for structure
import { cn } from '@/lib/utils'; // Import cn

interface TrustBadgeProps {
  icon: LucideIcon;
  title: string;
  description: string;
  iconColor?: string; // Optional color override e.g., 'text-green-600'
}

const TrustBadge: React.FC<TrustBadgeProps> = ({
  icon: Icon,
  title,
  description,
  iconColor = 'text-brand-primary', // Default to primary brand color
}) => {
  return (
    // Added height-full for consistent height in grid/flex layouts
    <Card className="w-full text-center shadow-sm hover:shadow-md transition-shadow duration-200 h-full border bg-card/80 backdrop-blur-sm">
      <CardHeader className="items-center pb-2">
        {/* --- Removed bg-primary/10 from this div --- */}
        <div className={cn("mb-3 rounded-full p-3", iconColor)}>
           <Icon className={`h-8 w-8`} />
        </div>
         {/* --- --- */}
        <CardTitle className="text-lg font-semibold">{title}</CardTitle> {/* Added font-semibold */}
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

export default TrustBadge;
```

## File: `components/core/UserMenuButton.tsx`

```tsx
// components/core/UserMenuButton.tsx
'use client';

import React from 'react';
import { signOut, Session } from 'next-auth/react'; // Import Session type
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User as UserIcon } from "lucide-react";
import { getInitials } from '@/lib/utils'; // Import getInitials
import Link from 'next/link';
import { UserRole } from '@prisma/client';

// Define the expected user prop structure based on session data
interface UserMenuButtonProps {
  user: Session['user']; // Use the Session user type from next-auth
}

export default function UserMenuButton({ user }: UserMenuButtonProps) {
  if (!user) return null; // Should not happen if used correctly in layout

  const userRole = user.role;
  const fallbackInitials = getInitials(undefined, undefined, user.email); // Use helper

  const profileLink = userRole === UserRole.PATIENT ? '/patient/profil'
                    : userRole === UserRole.STUDENT ? '/student/profil'
                    : '/admin/dashboard'; // Admin might not have a dedicated profile page for V1

  return (
     <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <Avatar className="h-8 w-8 border">
              <AvatarImage src={user.image ?? undefined} alt={user.email || 'User Avatar'} />
              <AvatarFallback>{fallbackInitials}</AvatarFallback>
            </Avatar>
            <span className="sr-only">Benutzermenü öffnen</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                    {user.email}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                        {userRole === UserRole.PATIENT ? 'Patient*in'
                         : userRole === UserRole.STUDENT ? 'Student*in'
                         : 'Administrator*in'}
                    </p>
                </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {userRole !== UserRole.ADMIN && ( // Admins might not have an editable profile page
               <DropdownMenuItem asChild>
                 <Link href={profileLink}>
                  <UserIcon className="mr-2 h-4 w-4" />
                  <span>Profil</span>
                 </Link>
              </DropdownMenuItem>
          )}
          {/* Optional: Link to main site if needed */}
           {userRole === UserRole.ADMIN && (
              <DropdownMenuItem asChild>
                  <Link href="/">
                      {/* <Home className="mr-2 h-4 w-4" /> */}
                      <span>Zur Hauptseite</span>
                  </Link>
              </DropdownMenuItem>
           )}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/' })}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Abmelden</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
  );
}
```

## File: `components/features/AICheckResultDisplay.tsx`

```tsx
// components/features/AICheckResultDisplay.tsx
import React from 'react';
import { AlertTriangle, CheckCircle, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AICheckResultDisplayProps {
  result: {
    hasSafetyConcern?: boolean;
    clarityFeedback?: string;
    safetyFeedback?: string;
    suggestions?: string[];
  } | null;
  isLoading: boolean;
  error: string | null;
}

export default function AICheckResultDisplay({ result, isLoading, error }: AICheckResultDisplayProps) {
  if (isLoading) {
    return <p className="text-xs text-muted-foreground animate-pulse mt-2">Prüfung läuft...</p>;
  }
  if (error) {
    return <p className="text-xs text-destructive mt-2">{error}</p>;
  }
  if (!result) {
    return null; // Don't show anything if no result yet (or after closing)
  }

  const hasSuggestions = result.suggestions && result.suggestions.length > 0;

  return (
    <div className="mt-3 p-3 border rounded-md bg-muted/30 text-xs space-y-2">
        {/* Safety Feedback */}
        <div className={cn(
                "flex items-start gap-2",
                result.hasSafetyConcern ? "text-destructive" : "text-green-700"
            )}>
             {result.hasSafetyConcern ? (
                <AlertTriangle className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
             ) : (
                 <CheckCircle className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
             )}
             <p><strong>Sicherheit:</strong> {result.safetyFeedback}</p>
        </div>

        {/* Clarity Feedback */}
        {result.clarityFeedback && (
            <p><strong>Klarheit:</strong> {result.clarityFeedback}</p>
        )}

        {/* Suggestions */}
        {hasSuggestions && (
            <div className="pt-2 border-t border-muted/50">
                <p className="font-medium mb-1 flex items-center gap-1"><Lightbulb className='h-3.5 w-3.5'/> Vorschläge:</p>
                <ul className="list-disc list-inside pl-2 space-y-0.5 text-muted-foreground">
                    {result.suggestions?.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
            </div>
        )}
         {/* Disclaimer */}
         <p className="text-muted-foreground/80 pt-2 border-t border-muted/50">
             KI-Assistent: Vorschläge stets prüfen. Sie tragen die Verantwortung.
         </p>
    </div>
  );
}
```

## File: `components/features/AuthForm.tsx`

```tsx
// components/features/AuthForm.tsx
'use client';

import React, { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { LoginSchema, RegisterSchema } from '@/lib/validation';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { de } from 'date-fns/locale';
import Link from 'next/link';
import { toast } from "sonner";
import { registerUser, RegistrationResult } from '@/actions/auth';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { UserRole } from '@prisma/client';
import AnimatedCheckmark from '@/components/ui/AnimatedCheckmark';

interface AuthFormProps {
    mode: 'login' | 'register';
}

type FormData = z.infer<typeof LoginSchema> | z.infer<typeof RegisterSchema>;

export default function AuthForm({ mode }: AuthFormProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/';

    const [isPending, startTransition] = useTransition();
    const [showSuccess, setShowSuccess] = useState(false);
    const [showStudentFields, setShowStudentFields] = useState(false);

    const currentSchema = mode === 'login' ? LoginSchema : RegisterSchema;

    const form = useForm<FormData>({
        resolver: zodResolver(currentSchema),
        defaultValues: mode === 'login'
            ? { email: '', password: '' }
            : {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: '',
                role: undefined,
                dob: undefined,
                university: '',
                clinicalYear: undefined,
            },
    });

    const selectedRole = form.watch('role');

    React.useEffect(() => {
        if (mode === 'register') {
            setShowStudentFields(selectedRole === UserRole.STUDENT);
        }
    }, [selectedRole, mode, form]);

    const onSubmit = (values: FormData) => {
        setShowSuccess(false);
        startTransition(async () => {
            if (mode === 'login') {
                try {
                    const result = await signIn('credentials', {
                        redirect: false,
                        email: (values as z.infer<typeof LoginSchema>).email,
                        password: (values as z.infer<typeof LoginSchema>).password,
                    });

                    if (result?.error) {
                        toast.error("Anmeldung fehlgeschlagen", { description: "Ungültige E-Mail oder Passwort." });
                    } else if (result?.ok) {
                        setShowSuccess(true);
                        toast.success("Anmeldung erfolgreich!");
                        router.refresh(); // Let middleware handle redirect
                    } else {
                         toast.error("Anmeldung fehlgeschlagen", { description: "Ein unbekannter Fehler ist aufgetreten." });
                    }
                } catch (error) {
                    console.error("Login Signin Error:", error);
                    toast.error("Anmeldung fehlgeschlagen", { description: "Ein Netzwerk- oder Serverfehler ist aufgetreten." });
                }

            } else { // Registration logic
                const result: RegistrationResult = await registerUser(values as z.infer<typeof RegisterSchema>);

                if (result.success) {
                    setShowSuccess(true);
                     setTimeout(() => {
                        toast.success("Registrierung erfolgreich!", { description: result.message });
                        router.push('/login');
                     }, 1200);
                } else {
                     toast.error("Registrierung fehlgeschlagen", { description: result.message || "Bitte überprüfen Sie Ihre Eingaben." });
                     if (result.fieldErrors) { Object.entries(result.fieldErrors).forEach(([field, errors]) => { if (errors) { form.setError(field as keyof FormData, { type: 'server', message: errors.join(', '), }); } }); }
                }
            }
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {mode === 'register' && (
                    <>
                        {/* First Name */}
                        <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Vorname</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Max" {...field} disabled={isPending || showSuccess} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* Last Name */}
                        <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nachname</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Mustermann" {...field} disabled={isPending || showSuccess} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Role Selection */}
                        <FormField
                             control={form.control}
                             name="role"
                             render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel>Ich bin...</FormLabel>
                                    {/* RadioGroup should not be inside FormControl */}
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4"
                                        disabled={isPending || showSuccess}
                                        // Accessibility attributes applied by FormControl to RadioGroupItem
                                    >
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value={UserRole.PATIENT} id="role-patient"/>
                                            </FormControl>
                                            <FormLabel htmlFor="role-patient" className="font-normal cursor-pointer">Patient*in</FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value={UserRole.STUDENT} id="role-student"/>
                                            </FormControl>
                                            <FormLabel htmlFor="role-student" className="font-normal cursor-pointer">Medizinstudent*in</FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Date of Birth (Patient) */}
                        {selectedRole === UserRole.PATIENT && (
                             <FormField
                                control={form.control}
                                name="dob"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Geburtsdatum (Optional)</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                {/* FormControl wraps the trigger Button */}
                                                <FormControl>
                                                    <Button
                                                        type="button"
                                                        variant={"outline"}
                                                        className={cn(
                                                            "w-[240px] pl-3 text-left font-normal",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                        disabled={isPending || showSuccess}
                                                        >
                                                        {field.value ? ( format(field.value, "PPP", { locale: de }) ) : ( <span>Wähle ein Datum</span> )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value ?? undefined}
                                                    onSelect={field.onChange}
                                                    disabled={(date) => date > new Date() || date < new Date("1900-01-01") || isPending || showSuccess }
                                                    initialFocus captionLayout="dropdown-buttons" fromYear={1920} toYear={new Date().getFullYear()} locale={de}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}

                        {/* University (Student) */}
                        {showStudentFields && (
                            <FormField
                                control={form.control}
                                name="university"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Universität</FormLabel>
                                        <FormControl>
                                            <Input placeholder="z.B. LMU München" {...field} disabled={isPending || showSuccess} />
                                        </FormControl>
                                        <FormDescription>Bitte geben Sie den offiziellen Namen Ihrer Universität an.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}
                        {/* Clinical Year (Student) */}
                        {showStudentFields && (
                            <FormField
                                control={form.control}
                                name="clinicalYear"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Klinisches Semester / Studienjahr</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="z.B. 3" {...field} onChange={event => field.onChange(+event.target.value)} disabled={isPending || showSuccess} />
                                        </FormControl>
                                        <FormDescription>In welchem klinischen Jahr/Semester sind Sie?</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}
                    </> // End Register-specific fields
                )}

                {/* Email */}
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>E-Mail</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="name@beispiel.de" {...field} disabled={isPending || showSuccess} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* Password */}
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Passwort</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="********" {...field} disabled={isPending || showSuccess} />
                            </FormControl>
                            {mode === 'register' && <FormDescription>Mindestens 8 Zeichen.</FormDescription>}
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* Confirm Password (Register) */}
                {mode === 'register' && (
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Passwort bestätigen</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="********" {...field} disabled={isPending || showSuccess} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}

                {/* Forgot Password Link (Login) */}
                {mode === 'login' && (
                    <div className="text-right">
                        <Button type="button" variant="link" size="sm" asChild className="font-normal px-0 h-auto py-0 text-xs">
                           <Link href="/forgot-password">Passwort vergessen?</Link>
                        </Button>
                    </div>
                )}

                {/* Submit Button */}
                <Button type="submit" className="w-full" disabled={isPending || showSuccess} animateInteraction={!isPending && !showSuccess}>
                    {showSuccess ? ( <AnimatedCheckmark /> ) : isPending ? ( <Loader2 className="mr-2 h-4 w-4 animate-spin" /> ) : null}
                    {!showSuccess && (mode === 'login' ? 'Anmelden' : 'Registrieren')}
                </Button>

                {/* Switch Mode Links */}
                <div className="text-center text-sm text-muted-foreground">
                    {mode === 'login' ? (
                        <> Noch kein Konto?{' '} <Link href="/registrieren" className="font-medium text-primary hover:underline"> Jetzt registrieren </Link> </>
                    ) : (
                        <> Bereits registriert?{' '} <Link href="/login" className="font-medium text-primary hover:underline"> Hier anmelden </Link> </>
                    )}
                </div>
                {/* Legal Text (Register) */}
                {mode === 'register' && (
                    <p className="text-xs text-center text-muted-foreground pt-4">
                        Mit der Registrierung stimmen Sie unseren{' '}
                        <Link href="/agb" className="underline hover:text-primary">AGB</Link> und{' '}
                        <Link href="/datenschutz" className="underline hover:text-primary">Datenschutzbestimmungen</Link> zu.
                    </p>
                )}
            </form>
        </Form>
    );
}
```

## File: `components/features/ChatInterface.tsx`

```tsx
// components/features/ChatInterface.tsx
'use client';

import React, { useState, useCallback, useEffect } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import DocumentLink from './DocumentLink';
import { usePusherSubscription } from '@/hooks/usePusherSubscription';
import { MessageData } from './ChatMessage';
import { ConsultationStatus } from '@prisma/client';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { pusherClient } from '@/lib/pusher/client';

type InitialDocument = {
  id: string;
  fileName: string;
  storageUrl: string;
  mimeType: string;
  fileSize?: number | null;
};

type InitialMessage = MessageData;

interface ChatInterfaceProps {
  consultationId: string;
  currentUserId: string;
  initialMessages: InitialMessage[];
  initialDocuments: InitialDocument[];
  consultationStatus: ConsultationStatus;
  // REMOVED: patientQuestion?: string; // Removed as Explanation Draft feature is removed
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  consultationId,
  currentUserId,
  initialMessages,
  initialDocuments,
  consultationStatus,
  // REMOVED: patientQuestion
}) => {
  const [messages, setMessages] = useState<MessageData[]>(initialMessages);
  const [documents, setDocuments] = useState<InitialDocument[]>(initialDocuments);
  const [isConnected, setIsConnected] = useState(true);

  // Callback for incoming Pusher messages
  const handleIncomingMessage = useCallback((newMessage: MessageData) => {
    if (newMessage.sender.id === currentUserId) {
        return; // Ignore self-messages from Pusher
    }
    setMessages((currentMessages) => {
      if (!currentMessages.some(msg => msg.id === newMessage.id)) {
        return [...currentMessages, newMessage];
      }
      return currentMessages;
    });
  }, [currentUserId]);

  // Setup Pusher subscription hook
  const channelName = `private-consultation-${consultationId}`;
  usePusherSubscription(channelName, 'new-message', handleIncomingMessage);

  // Monitor Pusher connection state effect
  useEffect(() => {
    if (!pusherClient) return;
    const handleConnectionChange = () => {
      setIsConnected(pusherClient?.connection.state === 'connected');
    } ;
    pusherClient.connection.bind('state_change', handleConnectionChange);
    handleConnectionChange(); // Set initial state
    return () => {
      pusherClient?.connection.unbind('state_change', handleConnectionChange);
    }
  }, []);

  // Callback for optimistic UI update when message is sent
  const handleMessageSent = (newMessage: MessageData) => {
    setMessages((currentMessages) => {
       if (!currentMessages.some(msg => msg.id === newMessage.id)) {
           return [...currentMessages, newMessage];
       }
       return currentMessages;
    });
  };

  const isChatDisabled = consultationStatus !== ConsultationStatus.IN_PROGRESS;

  return (
    <div className="flex flex-col h-[calc(100vh-22rem)] md:h-[calc(100vh-18rem)] border rounded-lg overflow-hidden bg-card">
       {/* Connection Status */}
       {!isConnected && (
           <div className="p-2 bg-yellow-100 text-yellow-800 text-xs text-center border-b border-yellow-200">
                Verbindung zum Echtzeit-Chat wird hergestellt...
           </div>
       )}

        {/* Documents Display */}
        {documents.length > 0 && (
            <div className="p-4 border-b max-h-40 md:max-h-48 overflow-y-auto bg-muted/30">
                 <h3 className="text-sm font-medium mb-2 text-foreground/80">Dokumente</h3>
                 {documents.map(doc => <DocumentLink key={doc.id} document={doc} />)}
            </div>
        )}

        {/* Message List */}
        <MessageList messages={messages} currentUserId={currentUserId} />

        {/* Input Area or Disabled Message */}
         {isChatDisabled ? (
             <div className="p-4 text-center text-sm text-muted-foreground border-t bg-muted/50">
                { consultationStatus === ConsultationStatus.COMPLETED ? "Diese Beratung wurde abgeschlossen."
                  : consultationStatus === ConsultationStatus.REQUESTED ? "Diese Beratung wurde noch nicht von einem Studenten angenommen."
                  : consultationStatus === ConsultationStatus.CANCELLED ? "Diese Beratung wurde abgebrochen."
                  : "Der Chat ist derzeit nicht verfügbar."}
            </div>
         ) : (
            // Render MessageInput only when chat is active
            <MessageInput
                consultationId={consultationId}
                onMessageSent={handleMessageSent}
                disabled={isChatDisabled || !isConnected}
                // REMOVED: patientQuestion prop removed
            />
         )}
    </div>
  );
};

export default ChatInterface;
```

## File: `components/features/ChatMessage.tsx`

```tsx
// components/features/ChatMessage.tsx
'use client';

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Import AvatarImage
import { cn } from "@/lib/utils";
import { format } from 'date-fns';
import { UserRole } from '@prisma/client';
import { motion } from 'framer-motion';

// Update MessageData type
export type MessageData = {
  id: string;
  content: string;
  createdAt: string | Date;
  sender: {
    id: string;
    role: UserRole;
    firstName: string;
    lastName: string;
    image?: string | null; // <<< Add image field
  };
};

interface ChatMessageProps {
  message: MessageData;
  currentUserId: string;
}

const messageVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: { opacity: 0, transition: { duration: 0.1 } }
};

const ChatMessage = React.forwardRef<HTMLDivElement, ChatMessageProps>(
  ({ message, currentUserId }, ref) => {
    const { content, createdAt, sender } = message;
    const isOwnMessage = sender.id === currentUserId;

    const initials = `${sender.firstName?.[0] ?? ''}${sender.lastName?.[0] ?? ''}`.toUpperCase() || '?';
    const displayName = `${sender.firstName} ${sender.lastName}`;
    const displayTime = format(new Date(createdAt), 'HH:mm');

    return (
       <motion.div
        ref={ref}
        variants={messageVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        layout
        className={cn(
          "flex items-start space-x-3 py-3",
          isOwnMessage ? "justify-end" : "justify-start"
        )}
      >
        {/* Avatar (Show for other user's messages) */}
        {!isOwnMessage && (
          <Avatar className="h-8 w-8 flex-shrink-0 border"> {/* Added border */}
            <AvatarImage src={sender.image ?? undefined} alt={displayName} /> {/* <<< Use sender.image */}
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        )}

        {/* Message Bubble */}
        <div className={cn(
          "max-w-[70%] rounded-lg px-3 py-2",
          isOwnMessage
            ? "bg-brand-primary text-primary-foreground"
            : "bg-muted"
        )}>
          {!isOwnMessage && (
            <p className="text-xs font-medium mb-1 text-muted-foreground">{displayName}</p>
          )}
          <p className={cn(
            "text-sm whitespace-pre-wrap break-words",
            !isOwnMessage && "text-card-foreground"
          )}>
            {content}
          </p>
          <p className={cn(
            "text-xs mt-1",
            isOwnMessage ? "text-primary-foreground/70 text-right" : "text-muted-foreground text-left"
          )}>
            {displayTime}
          </p>
        </div>

        {/* Optional: Show own avatar on the right */}
        {isOwnMessage && (
           <Avatar className="h-8 w-8 flex-shrink-0 border ml-3"> {/* Added border & margin */}
             <AvatarImage src={sender.image ?? undefined} alt={displayName} /> {/* <<< Use sender.image */}
             <AvatarFallback>{initials}</AvatarFallback>
           </Avatar>
        )}
      </motion.div>
    );
  }
);

ChatMessage.displayName = "ChatMessage";

export default ChatMessage;
```

## File: `components/features/ConsultationCard.tsx`

```tsx
// components/features/ConsultationCard.tsx
'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Loader2, User, Users, Handshake, Eye } from "lucide-react";
import { ConsultationStatus, UserRole, Document } from '@prisma/client';
import { formatDistanceToNow } from 'date-fns';
import { de } from 'date-fns/locale';
import { motion } from 'framer-motion';
import { CONSULTATION_STATUS_LABELS, CONSULTATION_STATUS_COLORS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import AnimatedCheckmark from '@/components/ui/AnimatedCheckmark';

type AcceptAction = (consultationId: string) => Promise<{ success: boolean; message: string; error?: any }>;

// Type including potential fields needed across different views
type ConsultationForCard = {
    id: string;
    topic: string;
    status: ConsultationStatus;
    createdAt: Date;
    patientQuestion?: string;
    documents?: Document[];
    summary?: string | null; // Ensure summary is in the type
    patient: {
        patientProfile?: {
            firstName: string;
            lastName: string;
        } | null;
    } | null;
    student?: {
        studentProfile?: {
            firstName: string;
            lastName: string;
        } | null;
    } | null;
};

interface ConsultationCardProps {
  consultation: ConsultationForCard;
  userRole: UserRole;
  onAccept?: AcceptAction;
  showAcceptButton?: boolean;
  onPreviewClick?: () => void;
}

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

export default function ConsultationCard({
    consultation,
    userRole,
    onAccept,
    showAcceptButton = true,
    onPreviewClick
}: ConsultationCardProps) {

    const { id, topic, status, createdAt, student, patient, summary } = consultation;
    const statusLabel = CONSULTATION_STATUS_LABELS[status] || status;
    const statusColor = CONSULTATION_STATUS_COLORS[status] || 'bg-gray-100 text-gray-800 border-gray-300';

    const timeAgo = formatDistanceToNow(new Date(createdAt), { addSuffix: true, locale: de });

    const detailLink = userRole === UserRole.PATIENT
        ? `/patient/beratungen/${id}`
        : `/student/beratungen/${id}`;

    const studentName = student?.studentProfile
        ? `${student.studentProfile.firstName} ${student.studentProfile.lastName}`
        : 'Noch nicht zugewiesen';

     const patientName = patient?.patientProfile
        ? `${patient.patientProfile.firstName} ${patient.patientProfile.lastName}`
        : 'Unbekannt';

    const isRequestForStudent = userRole === UserRole.STUDENT && status === ConsultationStatus.REQUESTED;
    const canPreview = isRequestForStudent && onPreviewClick;

  return (
     <motion.div variants={cardVariants} initial="hidden" animate="visible">
        <Card
            className={cn(
                "group hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col h-full",
                 canPreview ? "cursor-pointer" : ""
                 )}
            onClick={canPreview ? onPreviewClick : undefined}
        >
            <CardHeader>
                <div className="flex justify-between items-start gap-2">
                    <CardTitle className="text-lg font-semibold leading-tight">{topic}</CardTitle>
                     <Badge variant="outline" className={cn("whitespace-nowrap border", statusColor)}>
                        {statusLabel}
                    </Badge>
                </div>
                 {(userRole === UserRole.STUDENT) && ( // Show patient name for student regardless of status
                    <CardDescription className="flex items-center text-xs text-muted-foreground pt-1">
                        <User className="h-3 w-3 mr-1" /> Patient: {patientName}
                    </CardDescription>
                 )}
                <CardDescription className="flex items-center text-xs text-muted-foreground pt-1">
                    <Clock className="h-3 w-3 mr-1" /> {timeAgo}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow text-sm">
                {userRole === UserRole.PATIENT && status !== ConsultationStatus.REQUESTED && (
                    <p className="text-muted-foreground mb-2">
                        <Users className="inline-block h-4 w-4 mr-1 align-text-bottom" />
                        Student: {studentName}
                    </p>
                )}
                {canPreview && (
                    <p className="text-muted-foreground italic text-xs mt-2">Klicken, um Details zu sehen und anzunehmen.</p>
                )}
                 {status === ConsultationStatus.COMPLETED && summary && userRole === UserRole.STUDENT && (
                    <div className="mt-3 pt-3 border-t border-muted/50">
                        <p className="text-xs font-semibold text-muted-foreground mb-1">Ihre Zusammenfassung:</p>
                        <p className="text-xs text-card-foreground line-clamp-3">
                            {summary}
                        </p>
                    </div>
                 )}
            </CardContent>
            <CardFooter className="flex gap-2">
                {/* --- Button Logic --- */}
                {/* Student: Show Preview Indicator for Requested */}
                {canPreview && status === ConsultationStatus.REQUESTED && (
                     <div className='flex items-center justify-end w-full text-xs text-muted-foreground'>
                         <Eye className='w-4 h-4 mr-1 opacity-70'/> Vorschau anzeigen
                     </div>
                )}

                {/* Everyone: Show Details Button for InProgress or Completed */}
                 {(status === ConsultationStatus.IN_PROGRESS || status === ConsultationStatus.COMPLETED) && (
                     <Button variant="outline" size="sm" asChild className="flex-grow">
                        <Link href={detailLink} onClick={(e) => e.stopPropagation()}>
                            {/* <<< Adjust text based on role and status >>> */}
                            {userRole === UserRole.PATIENT && status === ConsultationStatus.COMPLETED ? "Details & Zusammenfassung" : "Details anzeigen"}
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                 )}

                {/* Patient: Show Details Button also for Requested/Assigned */}
                 {userRole === UserRole.PATIENT && (status === ConsultationStatus.REQUESTED || status === ConsultationStatus.ASSIGNED) && (
                     <Button variant="outline" size="sm" asChild className="flex-grow">
                        <Link href={detailLink} onClick={(e) => e.stopPropagation()}>
                            Details anzeigen
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                 )}

                 {/* Student: Show Direct Accept Button (Disabled) only if showAcceptButton and Requested */}
                 {/* This state should ideally not be reachable if preview is always used */}
                  {showAcceptButton && isRequestForStudent && onAccept && !canPreview && (
                    <Button
                        variant="default"
                        size="sm"
                        className="flex-grow"
                        disabled={true}
                        title="Details in Vorschau ansehen zum Annehmen"
                        >
                        <Handshake className="mr-2 h-4 w-4 opacity-50" />
                        <span className='opacity-50'>Annehmen</span>
                    </Button>
                )}
            </CardFooter>
        </Card>
     </motion.div>
  );
}
```

## File: `components/features/ConsultationList.tsx`

```tsx
// components/features/ConsultationList.tsx
'use client'; // <--- Add this directive

import React from 'react';
// Removed prisma and auth imports as data is passed via props
import ConsultationCard from './ConsultationCard';
import { Consultation, ConsultationStatus, UserRole } from '@prisma/client';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, MessageSquare } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

// Define type for consultation data passed as props
// Ensure it includes necessary nested profile data for the Card
type ConsultationWithDetails = Consultation & {
     student?: {
         studentProfile?: {
            firstName: string;
            lastName: string;
        } | null;
    } | null;
    patient?: { // Include patient for student view if needed later
        patientProfile?: {
            firstName: string;
            lastName: string;
        } | null;
    } | null;
};

// Updated props interface
interface ConsultationListProps {
    consultations: ConsultationWithDetails[];
    userRole: UserRole;
    isLoading: boolean;
    error: string | null;
    // Remove statusFilter/limit if fetching is done by parent
}

// Animation variants remain the same
const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// This is now a Client Component
export default function ConsultationList({
    consultations,
    userRole,
    isLoading,
    error
}: ConsultationListProps) {

    // --- Loading State ---
    if (isLoading) {
         return (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_, index) => ( // Show 3 skeletons during load
                     <Card key={index} className="flex flex-col">
                        <CardHeader>
                            <Skeleton className="h-5 w-3/4 mb-2" />
                            <Skeleton className="h-3 w-1/2" />
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <Skeleton className="h-4 w-full mb-2" />
                            <Skeleton className="h-4 w-2/3" />
                        </CardContent>
                         <CardFooter>
                            <Skeleton className="h-9 w-full" />
                        </CardFooter>
                    </Card>
                ))}
            </div>
         );
    }

    // --- Error State ---
     if (error) {
        return (
            <Alert variant="destructive" className="mt-6"> {/* Added margin */}
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Fehler</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        );
    }

    // --- Empty State ---
    if (consultations.length === 0) {
         return (
             <div className="text-center py-16 text-muted-foreground border border-dashed rounded-lg mt-6">
                <MessageSquare className="mx-auto h-12 w-12 mb-4 text-gray-400" />
                <p className="text-lg">Keine Beratungen gefunden.</p>
                 {userRole === UserRole.PATIENT && (
                     <p className="text-sm mt-2">Sie haben noch keine Beratung angefordert.</p>
                )}
                 {userRole === UserRole.STUDENT && ( // Keep this check if component is reused
                     <p className="text-sm mt-2">Ihnen sind derzeit keine Beratungen zugewiesen.</p>
                )}
            </div>
         );
    }

    // --- Success State ---
    return (
        <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={listVariants}
            initial="hidden"
            animate="visible"
        >
            {consultations.map((consultation) => (
                 <ConsultationCard
                    key={consultation.id}
                    consultation={consultation}
                    userRole={userRole}
                    // onAccept prop would be passed down if needed (not for patient list)
                />
            ))}
        </motion.div>
    );
}
```

## File: `components/features/ConsultationPreviewDialog.tsx`

```tsx
// components/features/ConsultationPreviewDialog.tsx
'use client';

import React, { useTransition, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose, // Import DialogClose
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area'; // Use ScrollArea for long content
import DocumentLink from './DocumentLink'; // Reuse DocumentLink
import { Consultation, Document, UserRole } from '@prisma/client';
import { Loader2, Handshake } from 'lucide-react';
import { toast } from 'sonner';
import AnimatedCheckmark from '../ui/AnimatedCheckmark';

type AcceptAction = (consultationId: string) => Promise<{ success: boolean; message: string; error?: any }>;

// Type matching the data passed from the dashboard page
type ConsultationForPreview = Consultation & {
    patientQuestion: string;
    documents: Document[];
    patient: {
        patientProfile?: {
            firstName: string;
            lastName: string;
        } | null;
    } | null;
};

interface ConsultationPreviewDialogProps {
  consultation: ConsultationForPreview | null; // Can be null when closed
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAccept?: AcceptAction;
}

export default function ConsultationPreviewDialog({
  consultation,
  isOpen,
  onOpenChange,
  onAccept,
}: ConsultationPreviewDialogProps) {
  const [isAccepting, startAcceptTransition] = useTransition();
  const [showSuccess, setShowSuccess] = useState(false);

  if (!consultation) {
    return null; // Don't render if no consultation is selected
  }

  const handleAccept = () => {
    if (!onAccept || !consultation) return;
    setShowSuccess(false);

    startAcceptTransition(async () => {
      try {
        const result = await onAccept(consultation.id);
        if (result.success) {
          setShowSuccess(true);
          setTimeout(() => {
            toast.success("Beratung angenommen!", { description: result.message });
            onOpenChange(false); // Close dialog on success after delay
            // Revalidation should happen via action, refreshing the list
          }, 1200);
        } else {
          toast.error("Fehler beim Annehmen", {
            description: result.message || "Die Beratung konnte nicht angenommen werden.",
          });
        }
      } catch (error) {
        console.error("Error accepting consultation:", error);
        toast.error("Fehler beim Annehmen", {
          description: "Ein unerwarteter Fehler ist aufgetreten.",
        });
      }
    });
  };

  // Reset success state when dialog closes
  const handleOpenChange = (open: boolean) => {
      if (!open) {
          setShowSuccess(false);
      }
      onOpenChange(open);
  }

  const patientName = consultation.patient?.patientProfile
    ? `${consultation.patient.patientProfile.firstName} ${consultation.patient.patientProfile.lastName}`
    : 'Unbekannt';

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[625px]"> {/* Adjust width as needed */}
        <DialogHeader>
          <DialogTitle>Anfragedetails: {consultation.topic}</DialogTitle>
          <DialogDescription>
            Anfrage von Patient: {patientName} vom {new Date(consultation.createdAt).toLocaleDateString('de-DE')}
          </DialogDescription>
        </DialogHeader>

        {/* Use ScrollArea for potentially long question and document list */}
        <ScrollArea className="max-h-[60vh] pr-6"> {/* Add padding-right for scrollbar */}
            <div className="py-4 space-y-4">
                <div>
                    <h4 className="font-medium mb-2 text-sm">Frage des Patienten</h4>
                    <p className="text-sm text-muted-foreground bg-muted/50 p-3 border rounded whitespace-pre-wrap">
                        {consultation.patientQuestion}
                    </p>
                </div>

                {consultation.documents && consultation.documents.length > 0 && (
                    <div>
                        <h4 className="font-medium mb-2 text-sm">Angehängte Dokumente</h4>
                        <div className="space-y-2">
                            {consultation.documents.map((doc) => (
                                <DocumentLink key={doc.id} document={doc} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </ScrollArea>

        <DialogFooter className="sm:justify-between gap-2">
          {/* Close Button using DialogClose */}
          <DialogClose asChild>
             <Button type="button" variant="outline" disabled={isAccepting || showSuccess}>
                Schließen
             </Button>
          </DialogClose>
          {/* Accept Button */}
          {onAccept && (
             <Button
                type="button"
                onClick={handleAccept}
                disabled={isAccepting || showSuccess}
                animateInteraction={!isAccepting && !showSuccess}
             >
                {showSuccess ? (
                    <AnimatedCheckmark />
                ) : isAccepting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <Handshake className="mr-2 h-4 w-4" />
                )}
                {!showSuccess && 'Anfrage Annehmen'}
             </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

## File: `components/features/ConsultationRequestForm.tsx`

```tsx
// components/features/ConsultationRequestForm.tsx
'use client';

import React, { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ConsultationRequestSchema, UploadedDocument } from '@/lib/validation';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, File as FileIcon, X } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from 'next/navigation';
import FileUpload from './FileUpload'; // Import the file upload component
import { createConsultation, ConsultationActionResult } from '@/actions/consultations'; // Import server action
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import TrustBadge from '@/components/core/TrustBadge'; // Re-use TrustBadge
import { LockKeyhole, ShieldCheck } from 'lucide-react';
import AnimatedCheckmark from '@/components/ui/AnimatedCheckmark'; // Import the checkmark

type FormData = z.infer<typeof ConsultationRequestSchema>;

export default function ConsultationRequestForm() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [showSuccess, setShowSuccess] = useState(false); // State for success animation
    const [uploadedFiles, setUploadedFiles] = useState<UploadedDocument[]>([]); // State to hold completed uploads

    const form = useForm<FormData>({
        resolver: zodResolver(ConsultationRequestSchema),
        defaultValues: {
            topic: '',
            patientQuestion: '',
        },
    });

    const handleUploadComplete = (uploadedFile: UploadedDocument) => {
        setUploadedFiles((prevFiles) => [...prevFiles, uploadedFile]);
        toast.success(`Datei "${uploadedFile.fileName}" erfolgreich hochgeladen.`);
    };

    const handleUploadError = (fileName: string, message: string) => {
        toast.error(`Fehler bei "${fileName}"`, { description: message });
    };

     const handleFileRemove = (uploadId: string) => {
        setUploadedFiles((prevFiles) => prevFiles.filter(file => file.uploadId !== uploadId));
     };

    const onSubmit = (values: FormData) => {
        setShowSuccess(false); // Reset success state
        startTransition(async () => {
            const result: ConsultationActionResult = await createConsultation(values, uploadedFiles);

            if (result.success) {
                 setShowSuccess(true); // Show checkmark
                 setTimeout(() => {
                    toast.success("Anfrage gesendet!", { description: result.message });
                    // Redirect to dashboard after successful submission
                    router.push('/patient/dashboard');
                    // No need for router.refresh() here due to revalidatePath in action
                 }, 1200); // Delay redirect
            } else {
                toast.error("Fehler beim Senden", {
                    description: result.message || "Bitte überprüfen Sie Ihre Eingaben.",
                });
                 // Handle field errors if returned
                 if (result.fieldErrors) {
                     Object.entries(result.fieldErrors).forEach(([field, errors]) => {
                         if (errors) {
                             form.setError(field as keyof FormData, {
                                 type: 'server',
                                 message: errors.join(', '),
                             });
                         }
                     });
                 }
            }
        });
    };

    return (
        <Card className="w-full max-w-2xl mx-auto">
             <CardHeader>
                 <CardTitle className="text-2xl">Neue Beratung anfordern</CardTitle>
                 <CardDescription>
                     Beschreiben Sie Ihr Anliegen oder Ihre Frage für eine medizinische Erklärung.
                     Fügen Sie bei Bedarf relevante Dokumente hinzu (z.B. Befunde, Arztbriefe).
                 </CardDescription>
                 <div className="flex flex-wrap gap-4 pt-3 text-sm">
                     <div className="flex items-center gap-1.5 text-muted-foreground">
                        <LockKeyhole className="h-4 w-4 text-blue-600" />
                        <span>Vertrauliche Behandlung</span>
                     </div>
                     <div className="flex items-center gap-1.5 text-muted-foreground">
                        <ShieldCheck className="h-4 w-4 text-green-600" />
                        <span>Sichere Datenübertragung</span>
                     </div>
                 </div>
             </CardHeader>
             <CardContent>
                 <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="topic"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Thema / Betreff</FormLabel>
                                    <FormControl>
                                        <Input placeholder="z.B. Erklärung Blutwerte, Frage zu MRT-Befund" {...field} disabled={isPending || showSuccess} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                         <FormField
                            control={form.control}
                            name="patientQuestion"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Ihre Frage</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Beschreiben Sie hier detailliert Ihre Frage oder das Thema, zu dem Sie eine Erklärung wünschen..."
                                            className="min-h-[150px] resize-y" // Allow vertical resize
                                            {...field}
                                             disabled={isPending || showSuccess}
                                        />
                                    </FormControl>
                                     <FormDescription>
                                         Bitte formulieren Sie Ihre Frage klar und geben Sie relevante Details an.
                                         <span className="font-semibold block">Wichtig:</span> Keine Angabe von vollständigen Namen oder extrem sensiblen persönlichen Daten Dritter.
                                     </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* File Upload Component */}
                         <FileUpload
                             onUploadComplete={handleUploadComplete}
                             onUploadError={handleUploadError}
                             onFileRemove={handleFileRemove}
                             currentFileCount={uploadedFiles.length}
                             disabled={isPending || showSuccess}
                         />

                          {/* Display Successfully Uploaded Files */}
                         {uploadedFiles.length > 0 && (
                             <div className="space-y-2 pt-4 border-t">
                                <FormLabel>Hochgeladene Dokumente:</FormLabel>
                                <ul className="list-none space-y-1">
                                    {uploadedFiles.map((file) => (
                                    <li key={file.uploadId} className="flex items-center justify-between text-sm bg-muted/50 p-2 rounded">
                                         <div className="flex items-center gap-2 truncate">
                                             <FileIcon className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                                             <span className="truncate">{file.fileName}</span>
                                             {file.fileSize && <span className="text-xs text-muted-foreground ml-1">({(file.fileSize / 1024).toFixed(1)} KB)</span>}
                                         </div>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="h-6 w-6 p-0 text-destructive hover:bg-destructive/10"
                                            onClick={() => handleFileRemove(file.uploadId)}
                                            disabled={isPending || showSuccess}
                                            aria-label="Datei entfernen"
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </li>
                                    ))}
                                </ul>
                            </div>
                         )}

                        {/* --- Modify Submit Button --- */}
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isPending || showSuccess}
                            animateInteraction={!isPending && !showSuccess}
                        >
                             {showSuccess ? (
                                <AnimatedCheckmark />
                            ) : isPending ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : null}
                            {!showSuccess && 'Beratung anfordern'}
                        </Button>
                         {/* --- --- */}
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
```

## File: `components/features/ConsultationSummaryForm.tsx`

```tsx
// components/features/ConsultationSummaryForm.tsx
'use client';

import React, { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, CheckCircle, Sparkles, CheckCheck } from "lucide-react"; // <<< Added CheckCheck
import { toast } from "sonner";
import { useRouter } from 'next/navigation';
import { completeConsultation, ConsultationActionResult } from '@/actions/consultations';
import AnimatedCheckmark from '../ui/AnimatedCheckmark';
import { getAIChatSummaryDraft, getAIClaritySafetyCheck } from '@/actions/ai'; // <<< Import AI Actions
import { MessageData } from './ChatMessage';
import { UserRole } from '@prisma/client';
import AICheckResultDisplay from './AICheckResultDisplay'; // <<< Import Display Component

const SummarySchema = z.object({
  summary: z.string()
    .trim()
    .min(10, { message: "Zusammenfassung muss mindestens 10 Zeichen lang sein." })
    .max(2000, { message: "Zusammenfassung darf maximal 2000 Zeichen lang sein." }),
});
type SummaryFormData = z.infer<typeof SummarySchema>;

interface ChatEntry { sender: { role: UserRole }; content: string; }

interface ConsultationSummaryFormProps {
  consultationId: string;
  initialSummary?: string | null;
  chatHistory?: MessageData[];
}

export default function ConsultationSummaryForm({
    consultationId,
    initialSummary,
    chatHistory = []
}: ConsultationSummaryFormProps) {
    const router = useRouter();
    const [isCompleting, startCompleteTransition] = useTransition();
    const [isDrafting, startDraftTransition] = useTransition();
    const [isChecking, startCheckTransition] = useTransition(); // <<< State for AI check
    const [showSuccess, setShowSuccess] = useState(false);
    const [checkResult, setCheckResult] = useState<any | null>(null); // <<< State for check result
    const [checkError, setCheckError] = useState<string | null>(null); // <<< State for check error


    const form = useForm<SummaryFormData>({
        resolver: zodResolver(SummarySchema),
        defaultValues: {
            summary: initialSummary || '',
        },
    });

    // --- Handler for Drafting Summary ---
    const handleDraftSummary = () => { /* ... same as before ... */ startDraftTransition(async () => { if (!chatHistory || chatHistory.length === 0) { toast.info("Kein Chatverlauf zum Zusammenfassen verfügbar."); return; } const formattedHistory: ChatEntry[] = chatHistory.map(msg => ({ sender: { role: msg.sender.role }, content: msg.content })); try { const result = await getAIChatSummaryDraft(formattedHistory); if (result.success) { form.setValue('summary', result.message, { shouldValidate: true }); toast.success("Zusammenfassungsentwurf erstellt!", { description: "Bitte prüfen und bearbeiten Sie den Entwurf."}); } else { toast.error("Fehler beim Entwurf", { description: result.message }); } } catch (error) { console.error("Error drafting summary:", error); toast.error("Fehler beim Entwurf", { description: "Ein unerwarteter Fehler ist aufgetreten."}); } }); };

     // --- <<< Handler for AI Check >>> ---
     const handleCheckContent = () => {
        const textToVerify = form.getValues('summary').trim(); // Get current summary text
        if (!textToVerify || isCompleting || isDrafting || isChecking) return;

        setCheckResult(null); // Clear previous results
        setCheckError(null);

        startCheckTransition(async () => {
            const result = await getAIClaritySafetyCheck(textToVerify);
            if (result.success) {
                setCheckResult(result.data);
                toast.info("Prüfung abgeschlossen", { description: "Ergebnis wird unten angezeigt." });
            } else {
                setCheckError(result.message);
                toast.error("Fehler bei der Prüfung", { description: result.message });
            }
        });
     };

    // --- Handler for Completing Consultation ---
    const onSubmit = (values: SummaryFormData) => { /* ... same as before ... */ setShowSuccess(false); startCompleteTransition(async () => { const result: ConsultationActionResult = await completeConsultation(consultationId, values.summary); if (result.success) { setShowSuccess(true); setTimeout(() => { toast.success("Beratung abgeschlossen!", { description: result.message }); router.push('/student/dashboard'); }, 1200); } else { toast.error("Fehler beim Abschließen", { description: result.message || "Die Beratung konnte nicht abgeschlossen werden." }); if (result.fieldErrors?.summary) { form.setError("summary", { type: 'server', message: result.fieldErrors.summary.join(', ') }); } } }); };

    const isBusy = isCompleting || isDrafting || showSuccess || isChecking; // <<< Include isChecking

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                 <FormField
                    control={form.control}
                    name="summary"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Zusammenfassung der Erklärung</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Fassen Sie hier die wesentlichen Punkte zusammen... oder nutzen Sie die KI-Assistenten."
                                    className="min-h-[120px] resize-y" // Slightly taller
                                    {...field}
                                    onChange={(e) => {
                                        field.onChange(e); // Call original onChange
                                        // Clear check results when user types
                                        if (checkResult || checkError) {
                                            setCheckResult(null);
                                            setCheckError(null);
                                        }
                                    }}
                                    disabled={isBusy}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                 {/* <<< Display Check Results >>> */}
                 <AICheckResultDisplay result={checkResult} isLoading={isChecking} error={checkError} />

                {/* Buttons Row */}
                <div className="flex flex-col sm:flex-row gap-2 justify-between items-center pt-2">
                    {/* AI Helper Buttons (Left Aligned) */}
                     <div className="flex gap-2 w-full sm:w-auto">
                         <Button type="button" variant="outline" size="sm" onClick={handleDraftSummary} disabled={isBusy || chatHistory.length === 0} title={chatHistory.length === 0 ? "Kein Chatverlauf vorhanden" : "KI-Entwurf erstellen"}>
                             {isDrafting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                            Entwurf (KI)
                        </Button>
                        <Button type="button" variant="outline" size="sm" onClick={handleCheckContent} disabled={isBusy || !form.watch('summary')} title="Text prüfen">
                            {isChecking ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CheckCheck className="mr-2 h-4 w-4" />}
                            Prüfen (KI)
                        </Button>
                    </div>

                     {/* Complete Button (Right Aligned) */}
                     <Button type="submit" className="w-full sm:w-auto" disabled={isBusy} animateInteraction={!isBusy}>
                        {showSuccess ? <AnimatedCheckmark /> : isCompleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircle className="mr-2 h-4 w-4" /> }
                        {!showSuccess && 'Beratung abschließen'}
                    </Button>
                </div>
                 <p className="text-xs text-muted-foreground text-center sm:text-right">
                    KI-Assistent: Vorschläge stets prüfen. Sie tragen die Verantwortung.
                 </p>
            </form>
        </Form>
    );
}
```

## File: `components/features/ConsultationsSection.tsx`

```tsx
// components/features/ConsultationsSection.tsx
'use client';

import React, { useState } from 'react'; // Import useState
import { motion } from 'framer-motion';
import ConsultationCard from './ConsultationCard';
import { MessageSquare } from 'lucide-react';
import { Consultation, UserRole, Document } from '@prisma/client'; // Added Document
import { acceptConsultation } from '@/actions/consultations';
import ConsultationPreviewDialog from './ConsultationPreviewDialog'; // Import the dialog

// Updated type to include documents and question
type ConsultationForDashboard = Consultation & {
    patientQuestion: string;
    documents: Document[];
    patient: {
        patientProfile?: {
            firstName: string;
            lastName: string;
        } | null;
    } | null;
    student?: {
        studentProfile?: {
            firstName: string;
            lastName: string;
        } | null;
    } | null;
};

interface ConsultationsSectionProps {
    consultations: ConsultationForDashboard[];
    userRole: UserRole;
    onAccept?: typeof acceptConsultation;
    emptyMessage?: string;
    allowPreview?: boolean; // New prop to control preview behavior
}

const listContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const ConsultationsSection: React.FC<ConsultationsSectionProps> = ({
    consultations,
    userRole,
    onAccept,
    emptyMessage = "Keine Beratungen in dieser Kategorie.",
    allowPreview = false, // Default to false
}) => {
    // State for managing the preview dialog
    const [selectedConsultation, setSelectedConsultation] = useState<ConsultationForDashboard | null>(null);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    const handlePreview = (consultation: ConsultationForDashboard) => {
        setSelectedConsultation(consultation);
        setIsPreviewOpen(true);
    };

    const handleClosePreview = () => {
         setIsPreviewOpen(false);
         // Optionally delay setting selectedConsultation to null for transition animations
         setTimeout(() => setSelectedConsultation(null), 300);
    }

    if (consultations.length === 0) {
        return (
             <div className="text-center py-16 text-muted-foreground border border-dashed rounded-lg mt-6">
                <MessageSquare className="mx-auto h-12 w-12 mb-4 text-gray-400" />
                <p className="text-lg">{emptyMessage}</p>
            </div>
        );
    }

    return (
        <>
            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
                variants={listContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
            >
                {consultations.map((consultation) => (
                    <ConsultationCard
                        key={consultation.id}
                        consultation={consultation as any} // Cast needed due to type mismatch possibility
                        userRole={userRole}
                        onAccept={onAccept} // Pass down accept action (might not be used directly by card now)
                        showAcceptButton={!allowPreview} // Only show accept button directly if preview is not allowed
                        onPreviewClick={allowPreview ? () => handlePreview(consultation) : undefined} // Pass preview handler only if allowed
                    />
                ))}
            </motion.div>

            {/* Render the Dialog conditionally */}
            {allowPreview && (
                 <ConsultationPreviewDialog
                    consultation={selectedConsultation}
                    isOpen={isPreviewOpen}
                    onOpenChange={handleClosePreview} // Use custom handler to reset selected on close
                    onAccept={onAccept}
                 />
            )}
        </>
    );
};

export default ConsultationsSection;
```

## File: `components/features/DocumentLink.tsx`

```tsx
// components/features/DocumentLink.tsx
import React from 'react';
import Link from 'next/link';
import { FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DocumentLinkProps {
  document: {
    id: string;
    fileName: string;
    storageUrl: string;
    mimeType: string;
    fileSize?: number | null;
  };
}

const DocumentLink: React.FC<DocumentLinkProps> = ({ document }) => {
  const { fileName, storageUrl, fileSize } = document;

  const displaySize = fileSize ? `${(fileSize / 1024).toFixed(1)} KB` : '';

  return (
    <div className="flex items-center justify-between p-3 border rounded-md bg-muted/50 my-2">
       <div className="flex items-center gap-3 truncate">
            <FileText className="h-5 w-5 text-muted-foreground flex-shrink-0" />
            <div className="flex flex-col truncate">
                <span className="text-sm font-medium truncate" title={fileName}>{fileName}</span>
                {displaySize && <span className="text-xs text-muted-foreground">{displaySize}</span>}
            </div>
       </div>
       <Button variant="ghost" size="sm" asChild>
           {/* Use target="_blank" to open in new tab, rel for security */}
           <Link href={storageUrl} target="_blank" rel="noopener noreferrer" title={`Öffne ${fileName}`}>
             Anzeigen <Download className="ml-2 h-4 w-4" />
           </Link>
       </Button>
    </div>
  );
};

export default DocumentLink;
```

## File: `components/features/FileUpload.tsx`

```tsx
// components/features/FileUpload.tsx
'use client';

import React, { useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { UploadCloud, X, File as FileIcon, Loader2 } from 'lucide-react';
import { type PutBlobResult } from '@vercel/blob';
import { upload } from '@vercel/blob/client'; // Client-side upload function
import { toast } from 'sonner';
import { UploadedDocument } from '@/lib/validation'; // Import type
import { FormLabel } from '@/components/ui/form'; // Ensure FormLabel is imported

interface FileUploadProps {
  onUploadComplete: (uploadedFile: UploadedDocument) => void;
  onUploadError: (fileName: string, message: string) => void;
  onFileRemove: (uploadId: string) => void;
  maxFiles?: number;
  currentFileCount: number;
  disabled?: boolean;
}

// Define acceptable file types (adjust as needed)
const ACCEPTED_FILE_TYPES = "application/pdf,image/jpeg,image/png,image/gif";
const MAX_FILE_SIZE_MB = 10; // Example: 10MB limit

export default function FileUpload({
  onUploadComplete,
  onUploadError,
  onFileRemove,
  maxFiles = 3, // Default max 3 files
  currentFileCount,
  disabled = false,
}: FileUploadProps) {
  const inputFileRef = useRef<HTMLInputElement>(null);
  // Track progress by temp ID. Value can be number or potentially object from blob client
  const [uploadingFiles, setUploadingFiles] = useState<Record<string, { name: string; progress: number | object }>>({});

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }

    const filesToUpload = Array.from(event.target.files);

    // Filter out files if max count reached
     if (currentFileCount + filesToUpload.length > maxFiles) {
      toast.error(`Maximal ${maxFiles} Dateien erlaubt.`);
      // Reset file input to allow re-selection
       if (inputFileRef.current) {
         inputFileRef.current.value = "";
       }
      return;
    }

    for (const file of filesToUpload) {
       // Client-side validation
        if (!file.type || !ACCEPTED_FILE_TYPES.includes(file.type)) {
             onUploadError(file.name, `Dateityp ${file.type || 'unbekannt'} nicht erlaubt. Erlaubt: PDF, JPG, PNG, GIF.`);
             continue; // Skip this file
         }
         if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
             onUploadError(file.name, `Datei ist zu groß (max. ${MAX_FILE_SIZE_MB}MB).`);
             continue; // Skip this file
         }

      const tempId = `${file.name}-${Date.now()}`; // Simple temporary ID
      // Initialize progress as 0 (number)
      setUploadingFiles(prev => ({ ...prev, [tempId]: { name: file.name, progress: 0 } }));

      try {
        const newBlob = await upload(file.name, file, {
          access: 'public',
          handleUploadUrl: '/api/upload',
          // --- Pass progress updates directly to the state setter ---
          onUploadProgress: (progressUpdate) => {
             // 'progressUpdate' might be just the number or an object
             // Store the raw value received. We'll parse it during render.
            setUploadingFiles(prev => ({
              ...prev,
              // Only update if the entry still exists (wasn't cancelled/errored)
              ...(prev[tempId] && {
                  [tempId]: { ...prev[tempId], progress: progressUpdate }
              })
            }));
          },
        });

        // Upload successful
        setUploadingFiles(prev => {
          const newState = { ...prev };
          delete newState[tempId]; // Remove from progress tracking
          return newState;
        });

        // Pass necessary data back to the parent form
        onUploadComplete({
            fileName: file.name,
            storageUrl: newBlob.url,
            mimeType: file.type,
            fileSize: file.size,
            uploadId: tempId,
        });

      } catch (error) {
        console.error('Upload Error:', error);
        const message = error instanceof Error ? error.message : 'Unbekannter Upload-Fehler.';
         setUploadingFiles(prev => {
          const newState = { ...prev };
          delete newState[tempId]; // Remove from progress on error
          return newState;
        });
        onUploadError(file.name, `Upload fehlgeschlagen: ${message}`);
      }
    }

     // Reset file input after processing all selected files
     if (inputFileRef.current) {
       inputFileRef.current.value = "";
     }
  };

  return (
    <div className="space-y-2">
      <FormLabel>Dokumente hinzufügen (Optional)</FormLabel>
      <div className="relative border-2 border-dashed border-muted rounded-lg p-6 text-center hover:border-primary transition-colors">
        <UploadCloud className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
        <p className="text-sm text-muted-foreground mb-2">
          Datei hierher ziehen oder klicken zum Hochladen
        </p>
        <p className="text-xs text-muted-foreground mb-4">
          Max. {maxFiles} Dateien, bis zu {MAX_FILE_SIZE_MB}MB pro Datei. Erlaubte Typen: PDF, JPG, PNG, GIF.
        </p>
        <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => inputFileRef.current?.click()}
            disabled={disabled || currentFileCount >= maxFiles}
        >
            Datei auswählen
        </Button>
        <Input
            ref={inputFileRef}
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" // Hidden input
            onChange={handleFileChange}
            accept={ACCEPTED_FILE_TYPES}
            multiple
            disabled={disabled || currentFileCount >= maxFiles}
        />
      </div>

       {/* Display Upload Progress */}
      {Object.entries(uploadingFiles).map(([id, { name, progress }]) => {
           // --- FIX: Handle progress being number or object ---
           let numericProgress = 0;
            if (typeof progress === 'number') {
                numericProgress = progress;
            } else if (typeof progress === 'object' && progress !== null && typeof (progress as any).percentage === 'number') {
                // If progress is an object like { percentage: number, ... }
                numericProgress = (progress as any).percentage;
            }
            // Ensure value is within 0-100 range for Progress component
            numericProgress = Math.max(0, Math.min(100, numericProgress));
           // --- END FIX ---

         return (
            <div key={id} className="flex items-center space-x-2 p-2 border rounded-md bg-muted/50">
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground flex-shrink-0" />
                <span className="text-sm truncate flex-grow" title={name}>{name}</span>
                <Progress value={numericProgress} className="w-20 h-2 flex-shrink-0" />
                <span className="text-xs text-muted-foreground w-10 text-right flex-shrink-0">{numericProgress.toFixed(0)}%</span>
                {/* Optional: Add a cancel button during upload */}
                {/* <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-destructive hover:bg-destructive/10"> <X className="h-4 w-4" /> </Button> */}
            </div>
        );
      })}

    </div>
  );
}
```

## File: `components/features/JargonExplainer.tsx`

```tsx
// components/features/JargonExplainer.tsx
'use client';

import React, { useState, useTransition } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Sparkles, Loader2, AlertTriangle } from 'lucide-react';
import { getAIJargonExplanation } from '@/actions/ai'; // Import the server action
import { toast } from 'sonner';

export default function JargonExplainer() {
  const [term, setTerm] = useState('');
  const [explanation, setExplanation] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleExplain = () => {
    if (!term.trim() || isPending) return;

    setError(null);
    setExplanation(null);
    setIsOpen(true); // Open popover to show loading/result

    startTransition(async () => {
      const result = await getAIJargonExplanation(term);
      if (result.success) {
        setExplanation(result.message);
      } else {
        setError(result.message);
        // Optional: Show toast for critical errors
        // toast.error("Fehler bei der Erklärung", { description: result.message });
      }
    });
  };

  // Handle Enter key press in input
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleExplain();
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex items-center gap-2 mt-4 border-t pt-4">
        <Input
          type="text"
          placeholder="Med. Begriff erklären..."
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-grow h-9 text-sm"
          disabled={isPending}
        />
        <PopoverTrigger asChild>
            <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={handleExplain}
                disabled={isPending || !term.trim()}
                className="h-9"
            >
                {isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                    <Sparkles className="h-4 w-4 mr-1" />
                )}
                Erklären
            </Button>
        </PopoverTrigger>
      </div>
      <PopoverContent className="w-80" align="end">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Erklärung für: "{term}"</h4>
             {isPending && (
                <div className="flex items-center justify-center p-4">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground"/>
                </div>
             )}
             {error && !isPending && (
                 <div className="text-sm text-destructive flex items-start gap-2">
                     <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0"/>
                     <span>{error}</span>
                 </div>
             )}
             {explanation && !isPending && (
                 <p className="text-sm text-muted-foreground">
                    {explanation}
                 </p>
             )}
          </div>
           {/* AI Disclaimer */}
           <p className="text-xs text-muted-foreground/80 border-t pt-2">
             KI-Assistent: Vorschläge stets prüfen. Sie tragen die Verantwortung.
           </p>
        </div>
      </PopoverContent>
    </Popover>
  );
}
```

## File: `components/features/MessageInput.tsx`

```tsx
// components/features/MessageInput.tsx
'use client';

import React, { useState, useTransition } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { SendHorizontal, Loader2, CheckCheck } from 'lucide-react'; // Removed Sparkles, MessageSquarePlus
import { toast } from 'sonner';
import { getAIClaritySafetyCheck } from '@/actions/ai'; // Removed getAIExplanationDraft import
import AICheckResultDisplay from './AICheckResultDisplay';

interface MessageInputProps {
  consultationId: string;
  onMessageSent: (newMessage: any) => void; // Callback for optimistic UI
  disabled?: boolean;
  // REMOVED: patientQuestion prop
}

export default function MessageInput({
    consultationId,
    onMessageSent,
    disabled = false,
    // REMOVED: patientQuestion
}: MessageInputProps) {
  const [content, setContent] = useState('');
  const [isSending, startSendTransition] = useTransition();
  const [isChecking, startCheckTransition] = useTransition();
  // REMOVED: const [isDrafting, startDraftTransition] = useTransition();
  const [checkResult, setCheckResult] = useState<any | null>(null);
  const [checkError, setCheckError] = useState<string | null>(null);

  // Adjusted busy state
  const isBusy = isSending || isChecking;

  // --- Send Message Handler ---
  const handleSend = async () => {
    const trimmedContent = content.trim();
    if (!trimmedContent || isBusy) return;

    setCheckResult(null);
    setCheckError(null);
    setContent('');

    startSendTransition(async () => {
       try {
            const response = await fetch('/api/nachrichten', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ consultationId, content: trimmedContent }), });
            if (!response.ok) { const errorData = await response.json(); throw new Error(errorData.error || `HTTP error! status: ${response.status}`); }
            const newMessage = await response.json();
            onMessageSent(newMessage);
        } catch (error) {
            console.error("Failed to send message:", error);
            toast.error("Fehler beim Senden", { description: error instanceof Error ? error.message : "Nachricht konnte nicht gesendet werden.", });
            setContent(trimmedContent); // Restore content on error
        }
    });
  };

  // --- AI Clarity/Safety Check Handler ---
  const handleCheckContent = () => {
     const textToVerify = content.trim();
     if (!textToVerify || isBusy) return;

     setCheckResult(null);
     setCheckError(null);

     startCheckTransition(async () => {
         const result = await getAIClaritySafetyCheck(textToVerify);
         if (result.success) {
             setCheckResult(result.data);
             toast.info("Prüfung abgeschlossen", { description: "Ergebnis wird unten angezeigt." });
         } else {
             setCheckError(result.message);
             toast.error("Fehler bei der Prüfung", { description: result.message });
         }
     });
  };

  // --- REMOVED: handleDraftExplanation Handler ---

  // Handle Enter key press for sending
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
     if (event.key === 'Enter' && !event.shiftKey) {
       event.preventDefault();
       handleSend();
     }
   };

   // Clear AI check results when user types
   const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
        if (checkResult || checkError) {
            setCheckResult(null);
            setCheckError(null);
        }
   }

  return (
    <div className="p-4 border-t bg-background">
        <div className="flex items-start gap-2">
          <Textarea
            value={content}
            onChange={handleContentChange}
            onKeyDown={handleKeyDown}
            placeholder="Schreiben Sie Ihre Nachricht..." // Updated placeholder
            className="flex-1 resize-none"
            rows={3} // Default rows
            disabled={disabled || isBusy}
          />
          {/* Vertical stack of buttons */}
          <div className="flex flex-col gap-1">
                 {/* Check Button */}
                 <Button
                     onClick={handleCheckContent}
                     variant="outline"
                     size="icon"
                     disabled={!content.trim() || disabled || isBusy}
                     title="Klarheit & Sicherheit prüfen (KI)"
                 >
                    {isChecking ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCheck className="h-4 w-4" />}
                     <span className="sr-only">Prüfen</span>
                 </Button>
                 {/* Send Button */}
                 <Button onClick={handleSend} disabled={!content.trim() || disabled || isBusy} size="icon" title="Nachricht senden">
                    {isSending ? <Loader2 className="h-4 w-4 animate-spin" /> : <SendHorizontal className="h-4 w-4" />}
                     <span className="sr-only">Senden</span>
                </Button>
          </div>
        </div>
        {/* Display Check Results */}
        <AICheckResultDisplay result={checkResult} isLoading={isChecking} error={checkError} />
    </div>
  );
}
```

## File: `components/features/MessageList.tsx`

```tsx
// components/features/MessageList.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import ChatMessage, { MessageData } from './ChatMessage';
import { AnimatePresence, motion } from 'framer-motion'; // Import AnimatePresence and motion

interface MessageListProps {
  messages: MessageData[];
  currentUserId: string;
}

const MessageList: React.FC<MessageListProps> = ({ messages, currentUserId }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null); // Ref for the scrolling container

  // Scroll to bottom effect
  useEffect(() => {
    // Scroll immediately when messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "auto" }); // Use 'auto' for immediate scroll with AnimatePresence
    }

    // Optional: Smooth scroll only if user is already near the bottom
    // const listElement = listRef.current;
    // if (listElement) {
    //   const isScrolledToBottom = listElement.scrollHeight - listElement.clientHeight <= listElement.scrollTop + 100; // 100px threshold
    //   if (isScrolledToBottom) {
    //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    //   }
    // }

  }, [messages]);


  return (
    // Add ref to the scrolling container
    <div ref={listRef} className="flex-1 overflow-y-auto p-4 space-y-0"> {/* Remove space-y-4, handled by message margin */}
      {/* Wrap the list mapping with AnimatePresence */}
      <AnimatePresence initial={false}> {/* initial=false prevents initial animation on load */}
        {messages.map((msg) => (
          <ChatMessage
             key={msg.id} // Key must be on the direct child of AnimatePresence
             message={msg}
             currentUserId={currentUserId}
           />
        ))}
      </AnimatePresence>
      {/* Dummy div for scrolling */}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
```

## File: `components/features/PatientProfileForm.tsx`

```tsx
// components/features/PatientProfileForm.tsx
'use client';

import React, { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UpdatePatientProfileSchema, UpdatePatientProfileFormData } from '@/lib/validation';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Calendar as CalendarIcon, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { toast } from 'sonner';
import { updateProfile } from '@/actions/profile'; // Import the action
import ProfilePictureUpload from './ProfilePictureUpload';
import AnimatedCheckmark from '../ui/AnimatedCheckmark';
import { PatientProfile, User } from '@prisma/client'; // Import types
import { useSession } from 'next-auth/react'; // Import useSession

interface PatientProfileFormProps {
  user: User & { patientProfile: PatientProfile | null }; // Pass combined user/profile data
}

export default function PatientProfileForm({ user }: PatientProfileFormProps) {
  const { update: updateSession } = useSession(); // Get update function
  const [isPending, startTransition] = useTransition();
  const [showSuccess, setShowSuccess] = useState(false);
  // State to hold the URL of a newly uploaded image *before* saving the profile
  const [newImageUrl, setNewImageUrl] = useState<string | null | undefined>(undefined); // undefined = no change, null = remove, string = new URL

  const form = useForm<UpdatePatientProfileFormData>({
    resolver: zodResolver(UpdatePatientProfileSchema),
    defaultValues: {
      firstName: user.patientProfile?.firstName || '',
      lastName: user.patientProfile?.lastName || '',
      dob: user.patientProfile?.dob ? new Date(user.patientProfile.dob) : undefined,
    },
  });

   const getInitials = (firstName?: string, lastName?: string) => {
        const first = firstName?.[0] ?? '';
        const last = lastName?.[0] ?? '';
        return `${first}${last}`.toUpperCase() || '?';
   };
   const initials = getInitials(form.watch('firstName'), form.watch('lastName'));

  const handlePictureUpload = (url: string) => {
    setNewImageUrl(url); // Store the blob URL temporarily
  };

   const handlePictureRemove = () => {
    setNewImageUrl(null); // Signal removal
  };

  const onSubmit = (values: UpdatePatientProfileFormData) => {
    setShowSuccess(false);
    startTransition(async () => {
      // Pass form data and new image URL (or null/undefined) to the action
      const result = await updateProfile(values, newImageUrl);

      if (result.success) {
        setShowSuccess(true);
        // Determine the final URL that was actually saved
        const finalImageUrl = newImageUrl === null ? null : newImageUrl === undefined ? user.image : newImageUrl;
        setNewImageUrl(undefined); // Reset image change state after successful save
        toast.success('Profil aktualisiert!', { description: result.message });

        // Trigger session update to refresh header image
        await updateSession({ user: { image: finalImageUrl } }); // Pass only the updated field

         setTimeout(() => setShowSuccess(false), 1500); // Hide checkmark after a delay
      } else {
        toast.error('Fehler beim Speichern', {
          description: result.message || 'Profil konnte nicht gespeichert werden.',
        });
        if (result.fieldErrors) {
          Object.entries(result.fieldErrors).forEach(([field, errors]) => {
            if (errors) {
              form.setError(field as keyof UpdatePatientProfileFormData, {
                type: 'server',
                message: errors.join(', '),
              });
            }
          });
        }
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <ProfilePictureUpload
            initialImageUrl={newImageUrl === undefined ? user.image : newImageUrl} // Show user image or the staged new one
            initials={initials}
            onUploadComplete={handlePictureUpload}
            onRemovePicture={handlePictureRemove}
            disabled={isPending || showSuccess}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Vorname</FormLabel>
                        <FormControl>
                            <Input placeholder="Max" {...field} disabled={isPending || showSuccess} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
             <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Nachname</FormLabel>
                        <FormControl>
                            <Input placeholder="Mustermann" {...field} disabled={isPending || showSuccess} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>

         <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
                <FormItem className="flex flex-col">
                    <FormLabel>Geburtsdatum (Optional)</FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                    type="button"
                                    variant={"outline"}
                                    className={cn(
                                        "w-[240px] pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                    )}
                                    disabled={isPending || showSuccess}
                                >
                                    {field.value ? (
                                        format(field.value, "PPP", { locale: de })
                                    ) : (
                                        <span>Wähle ein Datum</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={field.value ?? undefined}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                    date > new Date() || date < new Date("1900-01-01") || isPending || showSuccess
                                }
                                initialFocus
                                captionLayout="dropdown-buttons"
                                fromYear={1920}
                                toYear={new Date().getFullYear()}
                                locale={de}
                            />
                        </PopoverContent>
                    </Popover>
                    <FormMessage />
                </FormItem>
            )}
        />

        <Button type="submit" disabled={isPending || showSuccess} animateInteraction={!isPending && !showSuccess}>
             {showSuccess ? (
                <AnimatedCheckmark />
            ) : isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            {!showSuccess && 'Profil speichern'}
        </Button>
      </form>
    </Form>
  );
}
```

## File: `components/features/ProfilePictureUpload.tsx`

```tsx
// components/features/ProfilePictureUpload.tsx
'use client';

import React, { useState, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UploadCloud, X, Loader2 } from 'lucide-react';
import { upload } from '@vercel/blob/client';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface ProfilePictureUploadProps {
  initialImageUrl?: string | null;
  initials: string;
  onUploadComplete: (url: string) => void; // Callback with the new blob URL
  onRemovePicture: () => void; // Callback to signal removal
  disabled?: boolean;
}

const ProfilePictureUpload: React.FC<ProfilePictureUploadProps> = ({
  initialImageUrl,
  initials,
  onUploadComplete,
  onRemovePicture,
  disabled = false,
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialImageUrl ?? null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Simple client-side validation
    if (!['image/jpeg', 'image/png', 'image/gif', 'image/webp'].includes(file.type)) {
      toast.error('Ungültiger Dateityp.', { description: 'Bitte wählen Sie eine JPG, PNG, GIF oder WEBP Datei.' });
      return;
    }
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast.error('Datei zu groß.', { description: 'Maximale Dateigröße ist 5MB.' });
      return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Start upload
    setIsUploading(true);
    try {
      const newBlob = await upload(file.name, file, {
        access: 'public',
        handleUploadUrl: '/api/upload/profile-picture', // Use the dedicated endpoint
        onUploadProgress: (progress) => {
          // Optional: display progress if needed, maybe as overlay on avatar
           console.log('Upload progress:', progress);
        },
      });

      // Success
      onUploadComplete(newBlob.url); // Pass the final URL back
      // Keep preview URL until saved
      toast.success('Bild erfolgreich hochgeladen. Speichern Sie das Profil, um die Änderung zu übernehmen.');

    } catch (error) {
      console.error('Profile picture upload error:', error);
      const message = error instanceof Error ? error.message : 'Upload fehlgeschlagen.';
      toast.error('Fehler beim Upload', { description: message });
      setPreviewUrl(initialImageUrl ?? null); // Revert preview on error
    } finally {
      setIsUploading(false);
      // Reset file input
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleRemoveClick = (e: React.MouseEvent) => {
     e.stopPropagation(); // Prevent triggering file input if overlayed
     setPreviewUrl(null);
     onRemovePicture(); // Notify parent form to set image URL to null on save
     if (fileInputRef.current) fileInputRef.current.value = "";
     toast.info('Profilbild wird beim Speichern entfernt.');
  }

  return (
    <div className="relative group w-24 h-24 mx-auto"> {/* Center the avatar */}
      <Avatar className="w-full h-full text-3xl border">
        <AvatarImage src={previewUrl ?? undefined} alt="Profilbild" />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <div className={cn(
          "absolute inset-0 bg-black/50 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer",
          disabled || isUploading ? "hidden" : "" // Hide overlay when disabled/uploading
          )}
          onClick={() => !disabled && !isUploading && fileInputRef.current?.click()}
      >
           <UploadCloud className="h-6 w-6 text-white mb-1" />
           <span className="text-xs text-white text-center">Ändern</span>
           {/* Hidden file input */}
           <Input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/jpeg,image/png,image/gif,image/webp"
                onChange={handleFileChange}
                disabled={disabled || isUploading}
           />
      </div>
      {/* Loading Indicator */}
       {isUploading && (
          <div className="absolute inset-0 bg-black/70 rounded-full flex items-center justify-center">
              <Loader2 className="h-8 w-8 text-white animate-spin" />
          </div>
       )}
      {/* Remove Button (show if there's a picture and not uploading) */}
      {previewUrl && !isUploading && !disabled && (
          <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute -top-1 -right-1 h-6 w-6 rounded-full z-10 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={handleRemoveClick}
              aria-label="Profilbild entfernen"
          >
             <X className="h-4 w-4" />
          </Button>
      )}
    </div>
  );
};

export default ProfilePictureUpload;
```

## File: `components/features/StudentProfileForm.tsx`

```tsx
// components/features/StudentProfileForm.tsx
'use client';

import React, { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UpdateStudentProfileSchema, UpdateStudentProfileFormData } from '@/lib/validation';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { updateProfile } from '@/actions/profile'; // Import the action
import ProfilePictureUpload from './ProfilePictureUpload';
import AnimatedCheckmark from '../ui/AnimatedCheckmark';
import { StudentProfile, User } from '@prisma/client'; // Import types
import { useSession } from 'next-auth/react'; // Import useSession

interface StudentProfileFormProps {
  user: User & { studentProfile: StudentProfile | null }; // Pass combined user/profile data
}

export default function StudentProfileForm({ user }: StudentProfileFormProps) {
  const { update: updateSession } = useSession(); // Get update function
  const [isPending, startTransition] = useTransition();
  const [showSuccess, setShowSuccess] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState<string | null | undefined>(undefined);

  const form = useForm<UpdateStudentProfileFormData>({
    resolver: zodResolver(UpdateStudentProfileSchema),
    defaultValues: {
      firstName: user.studentProfile?.firstName || '',
      lastName: user.studentProfile?.lastName || '',
      university: user.studentProfile?.university || '',
      clinicalYear: user.studentProfile?.clinicalYear || undefined,
    },
  });

  const getInitials = (firstName?: string, lastName?: string) => {
        const first = firstName?.[0] ?? '';
        const last = lastName?.[0] ?? '';
        return `${first}${last}`.toUpperCase() || '?';
   };
   const initials = getInitials(form.watch('firstName'), form.watch('lastName'));

  const handlePictureUpload = (url: string) => {
    setNewImageUrl(url);
  };

  const handlePictureRemove = () => {
    setNewImageUrl(null);
  };

  const onSubmit = (values: UpdateStudentProfileFormData) => {
    setShowSuccess(false);
    startTransition(async () => {
      const result = await updateProfile(values, newImageUrl);

      if (result.success) {
        setShowSuccess(true);
        const finalImageUrl = newImageUrl === null ? null : newImageUrl === undefined ? user.image : newImageUrl;
        setNewImageUrl(undefined);
        toast.success('Profil aktualisiert!', { description: result.message });

        // Trigger session update
        await updateSession({ user: { image: finalImageUrl } }); // Pass only the updated field

        setTimeout(() => setShowSuccess(false), 1500);
      } else {
        toast.error('Fehler beim Speichern', {
          description: result.message || 'Profil konnte nicht gespeichert werden.',
        });
        if (result.fieldErrors) {
          Object.entries(result.fieldErrors).forEach(([field, errors]) => {
            if (errors) {
              form.setError(field as keyof UpdateStudentProfileFormData, {
                type: 'server',
                message: errors.join(', '),
              });
            }
          });
        }
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <ProfilePictureUpload
            initialImageUrl={newImageUrl === undefined ? user.image : newImageUrl}
            initials={initials}
            onUploadComplete={handlePictureUpload}
            onRemovePicture={handlePictureRemove}
            disabled={isPending || showSuccess}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Vorname</FormLabel>
                        <FormControl>
                            <Input placeholder="Lukas" {...field} disabled={isPending || showSuccess} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
             <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Nachname</FormLabel>
                        <FormControl>
                            <Input placeholder="Huber" {...field} disabled={isPending || showSuccess} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>

         <FormField
            control={form.control}
            name="university"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Universität</FormLabel>
                    <FormControl>
                        <Input placeholder="z.B. LMU München" {...field} disabled={isPending || showSuccess} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
         <FormField
            control={form.control}
            name="clinicalYear"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Klinisches Semester / Studienjahr</FormLabel>
                    <FormControl>
                        <Input type="number" placeholder="z.B. 3" {...field} onChange={event => field.onChange(+event.target.value)} disabled={isPending || showSuccess} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />

        <Button type="submit" disabled={isPending || showSuccess} animateInteraction={!isPending && !showSuccess}>
             {showSuccess ? (
                <AnimatedCheckmark />
            ) : isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            {!showSuccess && 'Profil speichern'}
        </Button>
      </form>
    </Form>
  );
}
```

## File: `components/ui/AnimatedCheckmark.tsx`

```tsx
// components/ui/AnimatedCheckmark.tsx
'use client';

import { motion } from 'framer-motion';

const AnimatedCheckmark = () => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="18" // Adjust size as needed
      height="18"
      strokeWidth="2.5"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-primary-foreground" // Color matches button text
    >
      <motion.path
        d="M5 13l4 4L19 7"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut', delay: 0.1 }}
      />
    </motion.svg>
  );
};

export default AnimatedCheckmark;
```

## File: `components/ui/alert.tsx`

```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        destructive:
          "text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
        className
      )}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
        className
      )}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription }

```

## File: `components/ui/avatar.tsx`

```tsx
"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

function Avatar({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    />
  )
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full", className)}
      {...props}
    />
  )
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className
      )}
      {...props}
    />
  )
}

export { Avatar, AvatarImage, AvatarFallback }

```

## File: `components/ui/badge.tsx`

```tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }

```

## File: `components/ui/button.tsx`

```tsx
// components/ui/button.tsx
'use client';

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion"; // Restore motion import
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  animateInteraction?: boolean; // Restore the prop definition
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      animateInteraction = false, // Restore prop usage
      ...props
    },
    ref
  ) => {
    // Determine the component type
    const Comp = asChild ? Slot : "button";

    if (animateInteraction && !asChild) {
      // If animation is requested AND it's NOT asChild, render motion.button
      const MotionButton = motion.button;
      return (
        <MotionButton
          ref={ref}
          data-slot="button"
          className={cn(buttonVariants({ variant, size, className }))}
          // Apply animation props directly to motion.button
          whileHover={{ scale: 1.03, transition: { type: "spring", stiffness: 300, damping: 15 } }}
          whileTap={{ scale: 0.98 }}
          {...props} // Spread remaining props
        />
      );
    }

    // --- Default Case (including asChild=true OR animateInteraction=false) ---
    // Render the determined component (Slot or 'button') without motion wrapper here.
    // The interaction animation won't apply automatically when asChild is true.
    return (
      <Comp
        ref={ref}
        data-slot="button"
        className={cn(buttonVariants({ variant, size, className }))}
        {...props} // Spread remaining props
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
```

## File: `components/ui/calendar.tsx`

```tsx
"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-2",
        month: "flex flex-col gap-4",
        caption: "flex justify-center pt-1 relative items-center w-full",
        caption_label: "text-sm font-medium",
        nav: "flex items-center gap-1",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "size-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-x-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "size-8 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_start:
          "day-range-start aria-selected:bg-primary aria-selected:text-primary-foreground",
        day_range_end:
          "day-range-end aria-selected:bg-primary aria-selected:text-primary-foreground",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground aria-selected:text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn("size-4", className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn("size-4", className)} {...props} />
        ),
      }}
      {...props}
    />
  )
}

export { Calendar }

```

## File: `components/ui/card.tsx`

```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}

```

## File: `components/ui/dialog.tsx`

```tsx
"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { XIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Dialog({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      )}
      {...props}
    />
  )
}

function DialogContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content>) {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        )}
        {...props}
      >
        {children}
        <DialogPrimitive.Close className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
          <XIcon />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  )
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  )
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-lg leading-none font-semibold", className)}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}

```

## File: `components/ui/dropdown-menu.tsx`

```tsx
"use client"

import * as React from "react"
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function DropdownMenu({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Root>) {
  return <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />
}

function DropdownMenuPortal({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>) {
  return (
    <DropdownMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
  )
}

function DropdownMenuTrigger({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Trigger>) {
  return (
    <DropdownMenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      {...props}
    />
  )
}

function DropdownMenuContent({
  className,
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Content>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        data-slot="dropdown-menu-content"
        sideOffset={sideOffset}
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md",
          className
        )}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  )
}

function DropdownMenuGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Group>) {
  return (
    <DropdownMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
  )
}

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean
  variant?: "default" | "destructive"
}) {
  return (
    <DropdownMenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.CheckboxItem>) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      checked={checked}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  )
}

function DropdownMenuRadioGroup({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioGroup>) {
  return (
    <DropdownMenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  )
}

function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.RadioItem>) {
  return (
    <DropdownMenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <CircleIcon className="size-2 fill-current" />
        </DropdownMenuPrimitive.ItemIndicator>
      </span>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  )
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.Label
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(
        "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Separator>) {
  return (
    <DropdownMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("bg-border -mx-1 my-1 h-px", className)}
      {...props}
    />
  )
}

function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        className
      )}
      {...props}
    />
  )
}

function DropdownMenuSub({
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Sub>) {
  return <DropdownMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuPrimitive.SubTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[inset]:pl-8",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto size-4" />
    </DropdownMenuPrimitive.SubTrigger>
  )
}

function DropdownMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.SubContent>) {
  return (
    <DropdownMenuPrimitive.SubContent
      data-slot="dropdown-menu-sub-content"
      className={cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-hidden rounded-md border p-1 shadow-lg",
        className
      )}
      {...props}
    />
  )
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
}

```

## File: `components/ui/form.tsx`

```tsx
"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { Slot } from "@radix-ui/react-slot"
import {
  Controller,
  FormProvider,
  useFormContext,
  useFormState,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form"

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

const Form = FormProvider

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
)

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState } = useFormContext()
  const formState = useFormState({ name: fieldContext.name })
  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

type FormItemContextValue = {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
)

function FormItem({ className, ...props }: React.ComponentProps<"div">) {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div
        data-slot="form-item"
        className={cn("grid gap-2", className)}
        {...props}
      />
    </FormItemContext.Provider>
  )
}

function FormLabel({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  const { error, formItemId } = useFormField()

  return (
    <Label
      data-slot="form-label"
      data-error={!!error}
      className={cn("data-[error=true]:text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  )
}

function FormControl({ ...props }: React.ComponentProps<typeof Slot>) {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      data-slot="form-control"
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  )
}

function FormDescription({ className, ...props }: React.ComponentProps<"p">) {
  const { formDescriptionId } = useFormField()

  return (
    <p
      data-slot="form-description"
      id={formDescriptionId}
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  )
}

function FormMessage({ className, ...props }: React.ComponentProps<"p">) {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message ?? "") : props.children

  if (!body) {
    return null
  }

  return (
    <p
      data-slot="form-message"
      id={formMessageId}
      className={cn("text-destructive text-sm", className)}
      {...props}
    >
      {body}
    </p>
  )
}

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
}

```

## File: `components/ui/input.tsx`

```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }

```

## File: `components/ui/label.tsx`

```tsx
"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"

import { cn } from "@/lib/utils"

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }

```

## File: `components/ui/popover.tsx`

```tsx
"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"

function Popover({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />
}

function PopoverTrigger({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
}

function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden",
          className
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
}

function PopoverAnchor({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />
}

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor }

```

## File: `components/ui/progress.tsx`

```tsx
"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="bg-primary h-full w-full flex-1 transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }

```

## File: `components/ui/radio-group.tsx`

```tsx
"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { CircleIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("grid gap-3", className)}
      {...props}
    />
  )
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        "border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="relative flex items-center justify-center"
      >
        <CircleIcon className="fill-primary absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}

export { RadioGroup, RadioGroupItem }

```

## File: `components/ui/scroll-area.tsx`

```tsx
"use client"

import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

import { cn } from "@/lib/utils"

function ScrollArea({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Root>) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={cn("relative", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        className="focus-visible:ring-ring/50 size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline-1"
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
}

function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      className={cn(
        "flex touch-none p-px transition-colors select-none",
        orientation === "vertical" &&
          "h-full w-2.5 border-l border-l-transparent",
        orientation === "horizontal" &&
          "h-2.5 flex-col border-t border-t-transparent",
        className
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        data-slot="scroll-area-thumb"
        className="bg-border relative flex-1 rounded-full"
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  )
}

export { ScrollArea, ScrollBar }

```

## File: `components/ui/select.tsx`

```tsx
"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Select({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />
}

function SelectGroup({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />
}

function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: "sm" | "default"
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="size-4 opacity-50" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className
        )}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            "p-1",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("text-muted-foreground px-2 py-1.5 text-xs", className)}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className
      )}
      {...props}
    >
      <span className="absolute right-2 flex size-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="size-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("bg-border pointer-events-none -mx-1 my-1 h-px", className)}
      {...props}
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}

```

## File: `components/ui/skeleton.tsx`

```tsx
// components/ui/skeleton.tsx
import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      // Add animate-pulse here
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props}
    />
  )
}

export { Skeleton }
```

## File: `components/ui/sonner.tsx`

```tsx
"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }

```

## File: `components/ui/table.tsx`

```tsx
"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b", className)}
      {...props}
    />
  )
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  )
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className
      )}
      {...props}
    />
  )
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("text-muted-foreground mt-4 text-sm", className)}
      {...props}
    />
  )
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}

```

## File: `components/ui/tabs.tsx`

```tsx
"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        className
      )}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }

```

## File: `components/ui/textarea.tsx`

```tsx
import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }

```

## File: `dump_code.sh`

```bash
#!/bin/bash

# --- Configuration ---
OUTPUT_FILE="codebase_content.md"
# Files/patterns to exclude explicitly (add more patterns if needed)
EXCLUDE_PATTERNS=(
    "package-lock.json"
    "test_gemini_key.sh"
    "public/*" # Exclude everything inside the public directory
    # Add other patterns like "node_modules/*", "*.log", etc. if desired
)
# Files to include explicitly even if not tracked by Git (e.g., local configs)
INCLUDE_EXPLICITLY=(
    ".env.local"
)
# Common binary file extensions to skip content for
SKIP_BINARY_EXTENSIONS=("png" "jpg" "jpeg" "gif" "bmp" "ico" "woff" "woff2" "eot" "otf" "mp3" "mp4" "avi" "mov" "pdf" "doc" "docx" "xls" "xlsx" "ppt" "pptx" "zip" "gz" "tar" "rar" "o" "a" "so" "dll" "exe")

# --- Helper Function: Check if path matches any exclude pattern ---
should_exclude() {
    local file_path="$1"
    for pattern in "${EXCLUDE_PATTERNS[@]}"; do
        # Use bash pattern matching. Enable extglob for ** if needed.
        # shopt -s extglob # Uncomment if using patterns like **/*.log
        if [[ "$file_path" == $pattern ]]; then
            # shopt -u extglob # Uncomment if enabling extglob
            return 0 # 0 means true (should exclude)
        fi
        # shopt -u extglob # Uncomment if enabling extglob
    done
    return 1 # 1 means false (should not exclude)
}


# --- Helper Function: Guess Markdown language tag from extension ---
get_lang_tag() {
  local filename="$1"
  local extension="${filename##*.}"
  local lower_filename # For case-insensitive extension check

  # Handle no extension or dotfiles like .gitignore
  if [[ "$extension" == "$filename" ]] || [[ "$filename" == .* && "$extension" == "" ]]; then
      # Try common dotfiles first
      case "$(basename "$filename")" in
          .gitignore|.gitattributes|.dockerignore) echo "gitignore" ;;
          Dockerfile) echo "dockerfile" ;;
          .env*) echo "bash" ;; # Treat .env files like shell variables
          *) echo "text" ;; # Default for no extension or unknown dotfiles
      esac
      return
  fi

  # Convert extension to lowercase for case-insensitive matching
  lower_extension=$(echo "$extension" | tr '[:upper:]' '[:lower:]')

  # Map common extensions to Markdown language tags
  case "$lower_extension" in
    sh|bash)       echo "bash" ;;
    py)            echo "python" ;;
    js|mjs)        echo "javascript" ;;
    jsx)           echo "jsx" ;;
    ts)            echo "typescript" ;;
    tsx)           echo "tsx" ;;
    html|htm)      echo "html" ;;
    css)           echo "css" ;;
    scss|sass)     echo "scss" ;;
    json)          echo "json" ;;
    yaml|yml)      echo "yaml" ;;
    md|markdown)   echo "markdown" ;;
    java)          echo "java" ;;
    kt|kts)        echo "kotlin" ;;
    c)             echo "c" ;;
    cpp|cxx|hpp|h) echo "cpp" ;;
    cs)            echo "csharp" ;;
    go)            echo "go" ;;
    php)           echo "php" ;;
    rb)            echo "ruby" ;;
    rs)            echo "rust" ;;
    sql)           echo "sql" ;;
    swift)         echo "swift" ;;
    xml|svg)       echo "xml" ;;
    toml)          echo "toml" ;;
    prisma)        echo "prisma" ;;
    *)             echo "" ;; # Use empty (generic) if unknown
  esac
}

# --- Helper Function: Check if extension is in the binary skip list ---
is_binary_extension() {
    local filename="$1"
    local extension="${filename##*.}"
    local lower_extension
    # No extension? Not binary by this check.
    if [[ "$extension" == "$filename" ]]; then
        return 1 # False (not binary)
    fi

    lower_extension=$(echo "$extension" | tr '[:upper:]' '[:lower:]')

    for ext in "${SKIP_BINARY_EXTENSIONS[@]}"; do
        if [[ "$lower_extension" == "$ext" ]]; then
            return 0 # True (is binary)
        fi
    done
    return 1 # False (not binary)
}


# --- Script Logic ---

# Check if this is a git repository
if ! git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
    echo "Error: This script should ideally be run inside a Git repository" >&2
    echo "       to correctly use the .gitignore file (unless explicitly including files)." >&2
    is_git_repo=false
else
    is_git_repo=true
fi

echo "Starting codebase dump to Markdown..."
if $is_git_repo; then
    echo " (Respecting .gitignore for tracked files)"
else
    echo " (Not a Git repo, will attempt to list all files - might be slow/include unwanted files)"
    echo " Consider running this inside a Git repository for better filtering."
fi


# Create or clear the output file
echo "# Codebase Content Dump" > "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"
echo "Generated on: $(date)" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"
# Convert arrays to strings for echoing
exclude_str="${EXCLUDE_PATTERNS[*]}"
include_str="${INCLUDE_EXPLICITLY[*]}"
binary_str="${SKIP_BINARY_EXTENSIONS[*]}"
echo "Exclusion patterns: ${exclude_str:-None}" >> "$OUTPUT_FILE"
echo "Explicitly included files: ${include_str:-None}" >> "$OUTPUT_FILE"
echo "Binary content extensions skipped: ${binary_str:-None}" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"
echo "## File Index" >> "$OUTPUT_FILE"
echo "" >> "$OUTPUT_FILE"

# Use an associative array to keep track of files added to prevent duplicates
declare -A included_files_map

file_list=() # Use a regular array to maintain order for processing

# --- File Collection Phase ---

# Pass 1: Collect files from Git (if available) using Process Substitution
if $is_git_repo; then
    echo "Collecting files tracked by Git..."
    # *** THE FIX IS HERE: Using < <(...) instead of | while ... ***
    while IFS= read -r -d $'\0' file_path; do
      # Skip empty paths just in case
      if [[ -z "$file_path" ]]; then
          continue
      fi

      # Skip if it matches an exclude pattern
      if should_exclude "$file_path"; then
          echo "Skipping excluded (Git): $file_path" >&2
          continue
      fi

      # Check if file exists (might be deleted but still in index)
      # And skip the output file itself
      if [[ ! -f "$file_path" || "$file_path" == "$OUTPUT_FILE" ]]; then
          continue
      fi

      # Add to list and map if not already present
      if [[ -z "${included_files_map[$file_path]}" ]]; then
          # Add to index in the output file during collection
          echo "*   \`$file_path\`" >> "$OUTPUT_FILE"
          file_list+=("$file_path")
          included_files_map["$file_path"]=1
      fi
    done < <(git ls-files -z) # *** End of the Process Substitution loop ***
fi

# Pass 2: Add explicitly included files (if they exist and aren't already listed)
echo "Checking for explicitly included files..."
for file_path in "${INCLUDE_EXPLICITLY[@]}"; do
    # Skip if it matches an exclude pattern (explicit include overrides gitignore, but not our excludes)
    if should_exclude "$file_path"; then
        echo "Skipping excluded (Explicit): $file_path" >&2
        continue
    fi

    if [[ -f "$file_path" && -z "${included_files_map[$file_path]}" ]]; then
        echo "Including explicit file: $file_path" >&2
        # Add to index in the output file
        echo "*   \`$file_path\` (Explicitly included)" >> "$OUTPUT_FILE"
        file_list+=("$file_path")
        included_files_map["$file_path"]=1
    elif [[ -f "$file_path" && ! -z "${included_files_map[$file_path]}" ]]; then
         echo "Skipping already included (Explicit): $file_path" >&2
    elif [[ ! -f "$file_path" ]]; then
         echo "Skipping non-existent (Explicit): $file_path" >&2
    fi
done

echo "" >> "$OUTPUT_FILE"
echo "---" >> "$OUTPUT_FILE" # Add a separator
echo "" >> "$OUTPUT_FILE"


# --- Content Processing Phase ---
echo "Processing files and appending content..."
processed_count=0
total_files=${#file_list[@]}

if [[ $total_files -eq 0 ]]; then
    echo "Warning: No files found to process. Check exclude patterns or Git tracking." >&2
    echo "[No files were processed]" >> "$OUTPUT_FILE"
else
    # Iterate over the collected list of files
    for file_path in "${file_list[@]}"; do
      ((processed_count++))
      # Check again for empty path just to be absolutely sure
      if [[ -z "$file_path" ]]; then
          echo "Warning: Encountered empty file path in processing loop, skipping." >&2
          continue
      fi

      echo "Processing (${processed_count}/${total_files}): $file_path"

      # Determine the language tag for the Markdown code block
      lang_tag=$(get_lang_tag "$file_path")
      # Extract extension for binary check message
      extension="${file_path##*.}"

      # Append Markdown formatted content to the output file
      {
        # Use a Markdown heading for the file path
        echo "## File: \`$file_path\`"
        echo ""

        # Check if the file has a binary extension
        if is_binary_extension "$file_path"; then
            echo "[Skipping content for binary file type .$extension]"
            echo ""
        # Check if the file is readable before attempting cat
        elif [[ ! -r "$file_path" ]]; then
            echo "[Error: Cannot read file (permission issue?): $file_path]"
            echo ""
        else
            # Start the Markdown fenced code block with the guessed language
            echo "\`\`\`$lang_tag"

            # Print the file content
            # Use LANG=C LC_ALL=C to avoid locale issues
            if LANG=C LC_ALL=C cat "$file_path" 2>/dev/null; then
                 # Ensure a newline exists *before* the closing fence
                 # Check if last char was newline. If not, add one.
                 # Getting the last char efficiently after cat is tricky,
                 # simpler to just ensure one is printed by the echo below.
                 echo "" # Add newline before closing fence
            else
                # Handle read errors during cat
                echo "[Error reading file contents: $file_path]"
                 # Still add newline before closing fence even on error
                 echo ""
            fi

            # End the Markdown fenced code block
            echo "\`\`\`"
            echo "" # Add an extra blank line for readability between files
        fi

      } >> "$OUTPUT_FILE"

    done
fi


echo "" >> "$OUTPUT_FILE" # Add final newline to the output file for cleanliness
echo "Codebase content saved to $OUTPUT_FILE"
echo "Done."
```

## File: `eslint.config.mjs`

```javascript
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;

```

## File: `hooks/useCurrentUser.ts`

```typescript

```

## File: `hooks/usePusherSubscription.ts`

```typescript
// hooks/usePusherSubscription.ts
import { useEffect, useRef } from 'react';
import { pusherClient } from '@/lib/pusher/client'; // Import the configured client
import { Channel, Members } from 'pusher-js'; // Import types

export function usePusherSubscription(
    channelName: string | null, // Allow null to disable hook easily
    eventName: string,
    callback: (data: any) => void
) {
    const callbackRef = useRef(callback);
    const channelRef = useRef<Channel | null>(null);

    // Update ref when callback changes
    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        if (!pusherClient || !channelName) {
            // If Pusher isn't configured or no channel name provided, do nothing
             if (channelRef.current) {
                 // Unsubscribe if channelName becomes null
                 pusherClient?.unsubscribe(channelRef.current.name);
                 channelRef.current = null;
                 console.log(`Pusher: Unsubscribed from ${channelName}`);
             }
            return;
        }

        // Prevent double subscription if channelRef already exists for this channelName
        if (channelRef.current && channelRef.current.name === channelName) {
            console.log(`Pusher: Already subscribed to ${channelName}`);
            return;
        }

        // Unsubscribe from previous channel if name changed
         if (channelRef.current) {
             pusherClient.unsubscribe(channelRef.current.name);
             console.log(`Pusher: Unsubscribed from previous channel ${channelRef.current.name}`);
         }

        // Subscribe to the new channel
        try {
            channelRef.current = pusherClient.subscribe(channelName);
            console.log(`Pusher: Subscribing to ${channelName}`);

            // Bind to subscription success/failure for logging
            channelRef.current.bind('pusher:subscription_succeeded', () => {
                console.log(`Pusher: Successfully subscribed to ${channelName}`);
                 // Bind to the specific event *after* successful subscription
                 if (channelRef.current) { // Check again inside closure
                     channelRef.current.bind(eventName, (data: any) => {
                         // console.log(`Pusher: Received event '${eventName}' on channel '${channelName}'`, data);
                         if (callbackRef.current) {
                             callbackRef.current(data);
                         }
                     });
                     console.log(`Pusher: Bound to event '${eventName}' on channel '${channelName}'`);
                 }
            });

             channelRef.current.bind('pusher:subscription_error', (status: any) => {
                console.error(`Pusher: Subscription failed for ${channelName}`, status);
                // Handle specific errors, e.g., 403 Forbidden if auth failed
            });

        } catch (error) {
            console.error(`Pusher: Error subscribing to channel ${channelName}`, error);
             channelRef.current = null; // Reset ref on error
        }

        // Cleanup on unmount or when channelName changes
        return () => {
            if (channelRef.current) {
                 const currentChannelName = channelRef.current.name;
                 // Unbind specific event first - important!
                 channelRef.current.unbind(eventName);
                 console.log(`Pusher: Unbound from event '${eventName}' on channel '${currentChannelName}'`);
                 // Then unsubscribe
                pusherClient?.unsubscribe(currentChannelName);
                console.log(`Pusher: Unsubscribed from ${currentChannelName}`);
                channelRef.current = null;
            }
        };
        // Re-run effect if channelName or eventName changes (callback is handled by ref)
    }, [channelName, eventName]);

     // Return the channel instance if needed, though hook manages lifecycle
     // return channelRef.current;
}
```

## File: `lib/auth.ts`

```typescript
// lib/auth.ts
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient, UserRole } from '@prisma/client';
import prisma from './prisma';
import { authConfig } from '@/auth.config';
import { JWT } from "next-auth/jwt";
import bcrypt from 'bcryptjs';

// Extend Session type
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: UserRole;
      image?: string | null; // Ensure image is here
    } & Omit<User, 'id' | 'role' | 'emailVerified' | 'passwordHash' | 'image'>;
  }

  // Extend User type recognized by callbacks
  interface User {
    role?: UserRole;
    image?: string | null; // Ensure image is here
  }
}

// Extend JWT type
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: UserRole;
    picture?: string | null; // Use 'picture' standard claim
    // Add other properties if needed
  }
}

export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma as PrismaClient),
  session: { strategy: 'jwt' },

  callbacks: {
    ...authConfig.callbacks,

    async jwt({ token, user, trigger, session }) {
      // console.log(`[Auth JWT Callback] Trigger: ${trigger}`, { token, user, session });

      // Initial sign-in: Assign core data + image
      if (user) {
        token.id = user.id;
        token.role = user.role as UserRole;
        token.picture = user.image; // Assign image from initial user object
      }

      // Handle session update trigger specifically for profile changes
      if (trigger === "update" && session?.user) {
           // console.log("[Auth JWT Callback] Update Trigger - Received session data:", session.user);
           // Only update the picture if it's explicitly passed in the update call
           if (session.user.image !== undefined) {
               // console.log("[Auth JWT Callback] Updating token picture from session update trigger to:", session.user.image);
               token.picture = session.user.image; // Update token picture
           }
           // NOTE: Could potentially update other fields here too if needed during session updates
           // For example: token.name = session.user.name (if name is part of the update)
      }

      // Optional: Add a periodic refresh or check against DB if needed, but often not required
      // if (someConditionToRefresh) {
      //   const dbUser = await prisma.user.findUnique({ where: { id: token.id }, select: { image: true } });
      //   if (dbUser) token.picture = dbUser.image;
      // }

      return token;
    },

    async session({ session, token }) {
       // console.log("[Auth Session Callback] Received token:", token);
       // console.log("[Auth Session Callback] Received session (before update):", session);
      // Always repopulate session from the latest token data
      if (token?.id && session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.image = token.picture; // Ensure session image = token picture
      } else {
        console.warn("[Auth Session Callback] Token or session.user missing required fields.");
      }
       // console.log("[Auth Session Callback] Returning session:", session);
      return session;
    },
  },

  debug: process.env.NODE_ENV === 'development',
  secret: process.env.NEXTAUTH_SECRET,
});
```

## File: `lib/constants.ts`

```typescript
// lib/constants.ts
import { ConsultationStatus } from '@prisma/client';

export const CONSULTATION_STATUS_LABELS: Record<ConsultationStatus, string> = {
  [ConsultationStatus.REQUESTED]: 'Angefragt',
  [ConsultationStatus.ASSIGNED]: 'Zugewiesen', // Although maybe not shown directly to patient
  [ConsultationStatus.IN_PROGRESS]: 'Laufend',
  [ConsultationStatus.COMPLETED]: 'Abgeschlossen',
  [ConsultationStatus.CANCELLED]: 'Abgebrochen', // Add if needed later
};

export const CONSULTATION_STATUS_COLORS: Record<ConsultationStatus, string> = {
    // Using Tailwind semantic colors or CSS variables (adjust as needed)
    // Example using descriptive CSS class names for badge variants
    [ConsultationStatus.REQUESTED]: 'bg-yellow-100 text-yellow-800 border-yellow-300', // Example style
    [ConsultationStatus.ASSIGNED]: 'bg-blue-100 text-blue-800 border-blue-300',
    [ConsultationStatus.IN_PROGRESS]: 'bg-sky-100 text-sky-800 border-sky-300',
    [ConsultationStatus.COMPLETED]: 'bg-green-100 text-green-800 border-green-300',
    [ConsultationStatus.CANCELLED]: 'bg-red-100 text-red-800 border-red-300',
};

// Add other constants as needed
```

## File: `lib/email.ts`

```typescript
// lib/email.ts
import { User, UserRole, Consultation } from '@prisma/client'; // Import relevant types

// Define email content structure
interface EmailOptions {
  to: string;
  subject: string;
  text: string; // Plain text version
  html: string; // HTML version
}

// Interface for user data passed to templates
interface UserInfo {
    email: string;
    firstName?: string | null;
    role?: UserRole;
}
// Interface for sender data in templates
interface SenderInfo {
    name: string;
}
// Interface for consultation data in templates
interface ConsultationInfo {
    id: string;
    topic: string;
}
// Interface for feedback data
interface FeedbackInfo {
    rating: number;
    comment?: string | null;
}


// --- Email Templates ---
export const templates = {
  welcome: (user: UserInfo) => ({
    subject: `Willkommen bei Murph, ${user.firstName || 'Nutzer'}!`,
    text: `Hallo ${user.firstName || 'Nutzer'},\n\nWillkommen bei Murph! Wir freuen uns, Sie an Bord zu haben.\n\nSie können sich jederzeit hier einloggen: ${process.env.NEXT_PUBLIC_APP_BASE_URL}/login\n\nMit freundlichen Grüßen,\nIhr Murph Team`,
    html: `<p>Hallo ${user.firstName || 'Nutzer'},</p><p>Willkommen bei Murph! Wir freuen uns, Sie an Bord zu haben.</p><p>Sie können sich jederzeit <a href="${process.env.NEXT_PUBLIC_APP_BASE_URL}/login">hier einloggen</a>.</p><p>Mit freundlichen Grüßen,<br/>Ihr Murph Team</p>`,
  }),
  passwordReset: (user: UserInfo, resetLink: string) => ({
    subject: 'Ihr Passwort-Reset für Murph',
    text: `Hallo ${user.firstName || 'Nutzer'},\n\nSie haben angefordert, Ihr Passwort zurückzusetzen... Link (gültig für 1 Stunde):\n${resetLink}\n\n...`,
    html: `<p>Hallo ${user.firstName || 'Nutzer'},</p><p>... Link (gültig für 1 Stunde):</p><p><a href="${resetLink}">${resetLink}</a></p><p>...`,
  }),
  consultationCompleted: (patient: UserInfo, consultation: ConsultationInfo, feedbackLink: string) => ({
    subject: `Ihre Murph-Beratung "${consultation.topic}" wurde abgeschlossen`,
    text: `Hallo ${patient.firstName || 'Nutzer'},\n\nIhre Beratung zum Thema "${consultation.topic}" wurde abgeschlossen...\nDashboard: ${process.env.NEXT_PUBLIC_APP_BASE_URL}/patient/beratungen/${consultation.id}\n\nFeedback:\n${feedbackLink}\n\n...`,
    html: `<p>Hallo ${patient.firstName || 'Nutzer'},</p><p>... <a href="${process.env.NEXT_PUBLIC_APP_BASE_URL}/patient/beratungen/${consultation.id}">hier einsehen</a>.</p><p>... <a href="${feedbackLink}">Feedback geben</a> ...</p><p>...`,
  }),
  newMessage: (recipient: UserInfo, sender: SenderInfo, consultation: ConsultationInfo) => {
      const dashboardPath = recipient.role === UserRole.PATIENT ? 'patient' : recipient.role === UserRole.STUDENT ? 'student' : '';
      const messageLink = `${process.env.NEXT_PUBLIC_APP_BASE_URL}/${dashboardPath}/beratungen/${consultation.id}`;
      return {
          subject: `Neue Nachricht in Ihrer Murph-Beratung "${consultation.topic}"`,
          text: `Hallo ${recipient.firstName || 'Nutzer'},\n\nSie haben eine neue Nachricht von ${sender.name} in Ihrer Beratung "${consultation.topic}" erhalten.\n\nLink: ${messageLink}\n\n...`,
          html: `<p>Hallo ${recipient.firstName || 'Nutzer'},</p><p>Neue Nachricht von ${sender.name} in Beratung "${consultation.topic}".</p><p><a href="${messageLink}">Nachricht ansehen</a>.</p><p>...`,
      };
  },
  studentVerified: (student: UserInfo) => ({
    subject: 'Ihr Murph Studentenprofil wurde verifiziert!',
    text: `Hallo ${student.firstName || 'Nutzer'},\n\nGute Nachrichten! Ihr Profil wurde verifiziert.\n\nLink zum Dashboard: ${process.env.NEXT_PUBLIC_APP_BASE_URL}/student/dashboard\n\n...`,
    html: `<p>Hallo ${student.firstName || 'Nutzer'},</p><p>Gute Nachrichten! Profil verifiziert.</p><p><a href="${process.env.NEXT_PUBLIC_APP_BASE_URL}/student/dashboard">Anfragen annehmen</a>.</p><p>...`,
  }),

  // <<< NEW TEMPLATES >>>
  requestConfirmation: (patient: UserInfo, consultation: ConsultationInfo) => ({
    subject: `Ihre Murph-Anfrage "${consultation.topic}" wurde empfangen`,
    text: `Hallo ${patient.firstName || 'Nutzer'},\n\nVielen Dank für Ihre Anfrage zum Thema "${consultation.topic}".\n\nWir haben sie erhalten und suchen nun einen passenden Medizinstudenten für Sie. Sie werden benachrichtigt, sobald Ihre Anfrage angenommen wurde.\n\nSie können den Status Ihrer Anfragen hier einsehen: ${process.env.NEXT_PUBLIC_APP_BASE_URL}/patient/dashboard\n\nMit freundlichen Grüßen,\nIhr Murph Team`,
    html: `<p>Hallo ${patient.firstName || 'Nutzer'},</p><p>Vielen Dank für Ihre Anfrage zum Thema "${consultation.topic}".</p><p>Wir haben sie erhalten und suchen nun einen passenden Medizinstudenten für Sie. Sie werden benachrichtigt, sobald Ihre Anfrage angenommen wurde.</p><p>Sie können den Status Ihrer Anfragen <a href="${process.env.NEXT_PUBLIC_APP_BASE_URL}/patient/dashboard">hier einsehen</a>.</p><p>Mit freundlichen Grüßen,<br/>Ihr Murph Team</p>`,
  }),
  consultationAccepted: (patient: UserInfo, student: SenderInfo, consultation: ConsultationInfo) => ({
    subject: `Ihre Murph-Anfrage "${consultation.topic}" wurde angenommen`,
    text: `Hallo ${patient.firstName || 'Nutzer'},\n\nGute Nachrichten! Ihre Anfrage zum Thema "${consultation.topic}" wurde von Medizinstudent ${student.name} angenommen.\n\nSie können die Beratung jetzt hier starten:\n${process.env.NEXT_PUBLIC_APP_BASE_URL}/patient/beratungen/${consultation.id}\n\nMit freundlichen Grüßen,\nIhr Murph Team`,
    html: `<p>Hallo ${patient.firstName || 'Nutzer'},</p><p>Gute Nachrichten! Ihre Anfrage zum Thema "${consultation.topic}" wurde von Medizinstudent ${student.name} angenommen.</p><p>Sie können die Beratung jetzt <a href="${process.env.NEXT_PUBLIC_APP_BASE_URL}/patient/beratungen/${consultation.id}">hier starten</a>.</p><p>Mit freundlichen Grüßen,<br/>Ihr Murph Team</p>`,
  }),
  feedbackReceived: (student: UserInfo, patient: SenderInfo, consultation: ConsultationInfo, feedback: FeedbackInfo) => ({
    subject: `Neues Feedback für Ihre Murph-Beratung "${consultation.topic}"`,
    text: `Hallo ${student.firstName || 'Nutzer'},\n\nSie haben neues Feedback von ${patient.name} für Ihre abgeschlossene Beratung "${consultation.topic}" erhalten.\n\nBewertung: ${feedback.rating}/5\n${feedback.comment ? `Kommentar: ${feedback.comment}\n` : ''}\nSie können das Feedback und die Beratung hier einsehen:\n${process.env.NEXT_PUBLIC_APP_BASE_URL}/student/beratungen/${consultation.id}\n\nMit freundlichen Grüßen,\nIhr Murph Team`,
    html: `<p>Hallo ${student.firstName || 'Nutzer'},</p><p>Sie haben neues Feedback von ${patient.name} für Ihre abgeschlossene Beratung "${consultation.topic}" erhalten.</p><p><b>Bewertung: ${feedback.rating}/5</b></p>${feedback.comment ? `<p><b>Kommentar:</b> ${feedback.comment}</p>` : ''}<p>Sie können das Feedback und die Beratung <a href="${process.env.NEXT_PUBLIC_APP_BASE_URL}/student/beratungen/${consultation.id}">hier einsehen</a>.</p><p>Mit freundlichen Grüßen,<br/>Ihr Murph Team</p>`,
  }),
  // <<< END NEW TEMPLATES >>>
};


// Simulated Email Sending Function (Logs to console)
export async function sendEmail({ to, subject, text, html }: EmailOptions): Promise<{ success: boolean; error?: string }> {
    const emailFrom = process.env.EMAIL_FROM || 'noreply@murph.local';

    if (!to || !subject || (!text && !html)) {
        console.error('Email Error: Missing required fields (to, subject, text/html).');
        return { success: false, error: 'Missing required email fields.' };
    }

    console.log('\n--- SENDING EMAIL (SIMULATION) ---');
    console.log(`From: ${emailFrom}`);
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log('--- Text ---');
    console.log(text);
    console.log('--- HTML ---');
    console.log(html);
    console.log('---------------------------------\n');

    await new Promise(resolve => setTimeout(resolve, 50));

    return { success: true };
}
```

## File: `lib/prisma.ts`

```typescript
// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
// Learn more: https://pris.ly/d/help/next-js-best-practices

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    // Optional: Log Prisma queries in development
    // log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : [],
  });

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma;
```

## File: `lib/pusher/client.ts`

```typescript
// lib/pusher/client.ts
import PusherClient from 'pusher-js';

// Ensure environment variables are defined client-side
const pusherKey = process.env.NEXT_PUBLIC_PUSHER_KEY;
const pusherCluster = process.env.NEXT_PUBLIC_PUSHER_CLUSTER;

if (!pusherKey || !pusherCluster) {
    console.warn("Pusher client environment variables missing. Real-time features may be disabled.");
    // Optionally throw an error if Pusher is absolutely critical
    // throw new Error("Pusher client environment variables missing.");
}

// Export a configured Pusher client instance
// Handle case where keys might be missing in development if desired
export const pusherClient = (pusherKey && pusherCluster) ? new PusherClient(pusherKey, {
    cluster: pusherCluster,
    authEndpoint: '/api/pusher/auth', // Our backend authentication endpoint
    // forceTLS: true // useTLS is default in newer versions
}) : null; // Or a mock/dummy object if you want to avoid null checks everywhere


// Optional: Log connection state changes for debugging
if (pusherClient) {
    pusherClient.connection.bind('state_change', (states: any) => {
        console.log("Pusher connection state changed:", states.current);
    });
     pusherClient.connection.bind('error', (err: any) => {
        console.error("Pusher connection error:", err);
        // Potentially show user feedback here
         if (err.error?.data?.code === 4004) {
            console.error("Pusher configuration error - check app key/cluster.");
        }
    });
}
```

## File: `lib/pusher/server.ts`

```typescript
// lib/pusher/server.ts
import PusherServer from 'pusher';

// Ensure environment variables are loaded (should be handled by Next.js)
const pusherAppId = process.env.PUSHER_APP_ID;
const pusherKey = process.env.NEXT_PUBLIC_PUSHER_KEY; // Public key used here too for server instance? Check Pusher docs - usually Key+Secret
const pusherSecret = process.env.PUSHER_SECRET;
const pusherCluster = process.env.NEXT_PUBLIC_PUSHER_CLUSTER;

if (!pusherAppId || !pusherKey || !pusherSecret || !pusherCluster) {
    // In development, maybe allow skipping if keys aren't set for local testing without Pusher?
    // For production, this should definitely throw an error.
    console.warn("Pusher environment variables are not fully set. Pusher functionality will be disabled.");
    // throw new Error("Pusher environment variables are not fully set.");
}

// Create a single instance of the Pusher server client
// Note: Check Pusher Node SDK docs if using public key here is correct, usually it's appId, key, secret
export const pusherServer = (pusherAppId && pusherKey && pusherSecret && pusherCluster) ? new PusherServer({
  appId: pusherAppId,
  key: pusherKey, // Yes, the key is often used here too
  secret: pusherSecret,
  cluster: pusherCluster,
  useTLS: true, // Always use TLS
}) : null; // Return null if keys are missing, allowing graceful degradation? Or throw error.


// Helper function to trigger events safely
export async function triggerPusherEvent(channel: string, event: string, data: any) {
    if (!pusherServer) {
        console.log("Pusher server not initialized, skipping event trigger.");
        return;
    }
    try {
        await pusherServer.trigger(channel, event, data);
        console.log(`Pusher event triggered: Channel='${channel}', Event='${event}'`);
    } catch (error) {
        console.error("Error triggering Pusher event:", error);
        // Handle error appropriately (e.g., logging, monitoring)
    }
}
```

## File: `lib/utils.ts`

```typescript
// lib/utils.ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// <<< Add getInitials helper function >>>
export function getInitials(firstName?: string | null, lastName?: string | null, email?: string | null): string {
    const first = firstName?.[0] ?? '';
    const last = lastName?.[0] ?? '';
    if (first || last) {
        return `${first}${last}`.toUpperCase();
    }
    // Fallback to email initial if names are missing
    return email?.[0]?.toUpperCase() ?? '?';
}
```

## File: `lib/validation.ts`

```typescript
// lib/validation.ts
import * as z from 'zod';
import { UserRole } from '@prisma/client';

// --- Shared Validation Logic ---
const passwordValidation = z.string()
  .min(8, { message: "Passwort muss mindestens 8 Zeichen lang sein." });

// --- Login Schema ---
export const LoginSchema = z.object({
  email: z.string().email({ message: "Ungültige E-Mail-Adresse." }),
  password: z.string().min(1, { message: "Passwort ist erforderlich." }),
});
export type LoginFormData = z.infer<typeof LoginSchema>;


// --- Registration Schema ---
export const RegisterSchema = z.object({
  firstName: z.string().trim().min(1, { message: "Vorname ist erforderlich." }),
  lastName: z.string().trim().min(1, { message: "Nachname ist erforderlich." }),
  email: z.string().email({ message: "Ungültige E-Mail-Adresse." }),
  password: passwordValidation,
  confirmPassword: z.string(),
  role: z.nativeEnum(UserRole, { errorMap: () => ({ message: "Bitte wählen Sie eine Rolle." }) }),
  dob: z.date({ invalid_type_error: "Ungültiges Datum." }).optional().nullable(),
  university: z.string().trim().optional(),
  clinicalYear: z.coerce
    .number({ invalid_type_error: "Bitte geben Sie eine Zahl für das Studienjahr ein." })
    .int()
    .positive()
    .min(1)
    .max(10)
    .optional(),
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Die Passwörter stimmen nicht überein.",
  path: ["confirmPassword"],
})
.refine((data) => {
  if (data.role === UserRole.STUDENT) {
    return !!data.university && data.university.trim().length > 0 && data.clinicalYear !== undefined && data.clinicalYear !== null;
  }
  return true;
}, {
  message: "Universität und klinisches Studienjahr sind für Medizinstudenten erforderlich.",
  path: ["university"],
});
export type RegisterFormData = z.infer<typeof RegisterSchema>;


// --- Consultation Request Schema ---
export const ConsultationRequestSchema = z.object({
  topic: z.string()
    .trim()
    .min(3, { message: "Thema muss mindestens 3 Zeichen lang sein." })
    .max(100, { message: "Thema darf maximal 100 Zeichen lang sein." }),
  patientQuestion: z.string()
    .trim()
    .min(10, { message: "Ihre Frage muss mindestens 10 Zeichen lang sein." })
    .max(5000, { message: "Ihre Frage darf maximal 5000 Zeichen lang sein." }),
});
export type ConsultationRequestFormData = z.infer<typeof ConsultationRequestSchema>;


// --- Type Definition for Uploaded Document Data ---
export type UploadedDocument = {
    fileName: string;
    storageUrl: string;
    mimeType: string;
    fileSize?: number;
    uploadId: string;
};

// --- Profile Update Schemas ---
const BaseProfileSchema = z.object({
    firstName: z.string().trim().min(1, { message: "Vorname ist erforderlich." }),
    lastName: z.string().trim().min(1, { message: "Nachname ist erforderlich." }),
});
export const UpdatePatientProfileSchema = BaseProfileSchema.extend({
    dob: z.date({ invalid_type_error: "Ungültiges Datum." }).optional().nullable(),
});
export type UpdatePatientProfileFormData = z.infer<typeof UpdatePatientProfileSchema>;
export const UpdateStudentProfileSchema = BaseProfileSchema.extend({
    university: z.string().trim().min(1, { message: "Universität ist erforderlich."}),
    clinicalYear: z.coerce.number().int().positive().min(1).max(10),
});
export type UpdateStudentProfileFormData = z.infer<typeof UpdateStudentProfileSchema>;

// --- Password Reset Schemas ---
export const RequestPasswordResetSchema = z.object({
    email: z.string().email({ message: "Bitte geben Sie eine gültige E-Mail-Adresse ein." }),
});
export const ResetPasswordSchema = z.object({
    token: z.string().min(1, { message: "Token fehlt." }),
    password: z.string().min(8, { message: "Neues Passwort muss mindestens 8 Zeichen lang sein." }),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Die Passwörter stimmen nicht überein.",
    path: ["confirmPassword"],
});

// --- Feedback Schema ---
export const SubmitFeedbackSchema = z.object({
    consultationId: z.string().cuid("Ungültige Beratungs-ID."),
    rating: z.coerce.number().int().min(1, "Bewertung ist erforderlich.").max(5, "Bewertung muss zwischen 1 und 5 liegen."),
    feedback: z.string().trim().max(1000, "Feedback darf maximal 1000 Zeichen lang sein.").optional(),
});
```

## File: `middleware.ts`

```typescript
// middleware.ts
import NextAuth from 'next-auth';
import { authConfig } from './auth.config'; // Import the Edge-compatible config

// Use the imported config to initialize NextAuth for middleware.
export default NextAuth(authConfig).auth;

// The config.matcher defines which routes are processed by the middleware.
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api
     * - _next/static
     * - _next/image
     * - favicon.ico
     * - images
     * - svgs
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images|svgs).*)',

    /*
     * Explicitly match protected route groups and auth pages
     */
     '/patient/:path*',
     '/student/:path*',
     '/admin/:path*', // <<< Ensure admin protection is included
     '/login',
     '/registrieren',
  ],
};
```

## File: `next.config.ts`

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '', // Keep empty unless a specific port is needed
        pathname: '/**', // Allow any path on this hostname
      },
      // Add other hostnames here if needed in the future
      // e.g., { protocol: 'https', hostname: 'your-cdn.com', ... }
    ],
  },
};

export default nextConfig;

```

## File: `package.json`

```json
{
  "name": "murph-app",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "prisma generate && next build",
    "start": "next start",
    "lint": "next lint",
    "postinstall": "prisma generate"
  },
  "prisma": {
    "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
  },
  "dependencies": {
    "@auth/prisma-adapter": "^2.8.0",
    "@google/generative-ai": "^0.24.0",
    "@hookform/resolvers": "^4.1.3",
    "@prisma/client": "^6.5.0",
    "@radix-ui/react-avatar": "^1.1.3",
    "@radix-ui/react-dialog": "^1.1.6",
    "@radix-ui/react-dropdown-menu": "^2.1.6",
    "@radix-ui/react-label": "^2.1.2",
    "@radix-ui/react-popover": "^1.1.6",
    "@radix-ui/react-progress": "^1.1.2",
    "@radix-ui/react-radio-group": "^1.2.3",
    "@radix-ui/react-scroll-area": "^1.2.3",
    "@radix-ui/react-select": "^2.1.6",
    "@radix-ui/react-slot": "^1.1.2",
    "@radix-ui/react-tabs": "^1.1.3",
    "@vercel/blob": "^0.27.3",
    "bcryptjs": "^3.0.2",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "date-fns": "^3.6.0",
    "dotenv": "^16.4.7",
    "framer-motion": "^12.6.2",
    "lucide-react": "^0.485.0",
    "next": "15.2.4",
    "next-auth": "^5.0.0-beta.19",
    "next-themes": "^0.4.6",
    "pusher": "^5.2.0",
    "pusher-js": "^8.4.0",
    "react": "^18",
    "react-day-picker": "^8.10.1",
    "react-dom": "^18",
    "react-hook-form": "^7.55.0",
    "sonner": "^2.0.2",
    "tailwind-merge": "^3.0.2",
    "tw-animate-css": "^1.2.5",
    "zod": "^3.24.2",
    "zustand": "^5.0.3"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3",
    "@tailwindcss/postcss": "^4",
    "@types/bcryptjs": "^2.4.6",
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "eslint": "^9",
    "eslint-config-next": "15.2.4",
    "prisma": "^6.5.0",
    "tailwindcss": "^4",
    "ts-node": "^10.9.2",
    "typescript": "^5"
  }
}

```

## File: `planning/ADMIN_CONSOLE_PLAN_V1.md`

```markdown
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
```

## File: `planning/AI_FEATURES_PLAN.md`

```markdown
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
```

## File: `planning/API_SPECIFICATION.md`

```markdown
# Murph - API Specification Status

This document reflects the implemented API endpoints and Server Actions based on code review and recent feature additions.

## Implemented Endpoints & Actions

**Authentication (NextAuth.js)**
*   Route: `/api/auth/[...nextauth]/route.ts`
*   Logic: Handles login, logout, session management (JWT strategy). Credentials provider implemented.

**Registration (Server Action)**
*   Action: `registerUser` in `actions/auth.ts`
*   Logic: Handles validation, hashing, DB creation, sends welcome email (simulated).

**Consultations (Server Actions)**
*   Action: `createConsultation` in `actions/consultations.ts`
    *   Logic: Creates Consultation, links Documents, sends request confirmation email (simulated). **(To be updated to call AI categorization)**
*   Action: `acceptConsultation` in `actions/consultations.ts`
    *   Logic: Assigns student, updates status, checks verification, sends consultation accepted email (simulated).
*   Action: `completeConsultation` in `actions/consultations.ts`
    *   Logic: Adds summary, updates status, sends consultation completed email (+ feedback link) (simulated).

**Messages (API Route Handler)**
*   Route: `/api/nachrichten/route.ts` (POST)
*   Logic: Creates Message, triggers Pusher, sends new message email (simulated) to recipient.

**File Upload (API Route Handlers)**
*   Route: `/api/upload/route.ts` (POST) - For consultation documents.
*   Route: `/api/upload/profile-picture/route.ts` (POST) - For profile pictures.
*   Logic: Handles uploads via Vercel Blob (`handleUpload`), authorizes, restricts types.

**Pusher Authentication (API Route Handler)**
*   Route: `/api/pusher/auth/route.ts` (POST)
*   Logic: Authorizes private channel subscriptions.

**Profile (Server Action)**
*   Action: `updateProfile` in `actions/profile.ts`
*   Logic: Updates User image URL and profile data. Triggers session update client-side.

**Password Reset (Server Actions)**
*   Action: `requestPasswordReset` in `actions/password-reset.ts`
*   Action: `resetPassword` in `actions/password-reset.ts`
*   Logic: Handles token generation/validation, email (simulated), password update.

**Feedback (Server Action)**
*   Action: `submitFeedback` in `actions/feedback.ts`
*   Logic: Validates, saves feedback to Consultation, sends feedback received email (simulated).

**Admin (Server Action)**
*   Action: `toggleStudentVerification` in `actions/admin.ts`
*   Logic: Toggles `isVerified` status, sends verification email (simulated).

**AI Assistance (Server Actions in `actions/ai.ts`)**
*   Action: `getAIJargonExplanation` (Implemented)
*   Action: `getAIChatSummaryDraft` (Implemented - Base version) **(To be updated for document context)**
*   Action: `getAIClaritySafetyCheck` (Implemented)
*   **Action:** `getAIConsultationCategories` (NEW - To be implemented)
    *   **Logic:** Receives text (topic, question, doc content). Calls AI to get category labels. Returns labels.
*   Action: `getAIDocumentSummary` (Placeholder)

## API Needs for Next Phase

*   **AI Categorization Integration:** Update `createConsultation` to call `getAIConsultationCategories`.
*   **AI Summary Enhancement:** Update `getAIChatSummaryDraft` to handle document text input.
*   **AI Document Summarizer:** Implement `getAIDocumentSummary` action (including text extraction).
*   **Deregistration/Deletion Action:** Server action for user deletion.
*   **Admin Profile View Action:** Action/Endpoint for admins to fetch full user profiles.
*   **Search Action/API:** Endpoint/action for searching consultations/messages.
*   **Email Service Integration:** Replace email simulation calls.
*   **Student Verification Action(s):** Actions for automated verification workflow.
*   **Message Edit/Delete Actions:** Actions for timed message updates/deletions.
*   **Categorized Feedback:** Update `submitFeedback` or create new actions if needed for category storage.
```

## File: `planning/AUTHENTICATION_FLOW.md`

```markdown
# Murph - Authentication Flow Status (NextAuth.js v5 / Auth.js)

## 1. Goal

Implement secure Email/Password authentication (Registration, Login, Password Reset) for Patients, Students, and Admins using NextAuth.js.

## 2. Implementation Status

*   **Configuration (`lib/auth.ts`, `auth.config.ts`):**
    *   `CredentialsProvider`: Implemented with `authorize` function using `prisma` and `bcrypt.compare`. Returns user `id`, `email`, `role`, `image`. *(Confirmed)*
    *   `PrismaAdapter`: Configured and used. *(Confirmed)*
    *   **Session Strategy:** `jwt` strategy configured. *(Confirmed)*
    *   `Callbacks`: `jwt` and `session` implemented to inject `id`, `role`, `image` into token/session. `authorized` callback handles route protection logic (basic login check + redirect for logged-in on auth pages). *(Confirmed)*
    *   `Secret`: Relies on `NEXTAUTH_SECRET`. *(Confirmed)*
    *   `Pages`: `signIn: '/login'` configured. *(Confirmed)*
*   **Registration (`AuthForm` + `actions/auth.ts`):**
    *   UI (`AuthForm`): Implemented with conditional fields for Patient/Student. *(Confirmed)*
    *   Server Action (`registerUser`): Implemented. Handles validation, hashing, DB creation, welcome email (simulated). *(Confirmed)*
    *   Redirects to `/login` on success. *(Confirmed)*
*   **Login (`AuthForm` + NextAuth):**
    *   UI (`AuthForm`): Implemented with Email/Password fields. Includes "Passwort vergessen?" link. *(Confirmed)*
    *   Logic: Uses `signIn('credentials', { redirect: false })`. Handles success/error feedback using toasts. Triggers `router.refresh()` on success, relying on middleware for dashboard redirect. *(Confirmed)*
*   **Password Reset:**
    *   UI: `/forgot-password` and `/reset-password` pages implemented. *(Implemented)*
    *   Backend: `PasswordResetToken` model added. `requestPasswordReset` and `resetPassword` actions implemented with token handling and email simulation. *(Implemented)*
*   **Session Management:**
    *   Handled by NextAuth.js (JWT strategy). *(Confirmed)*
    *   `useSession` hook used in client components (Header, Profile Forms). *(Confirmed)*
    *   `auth()` helper used in Server Components/Actions/Route Handlers. *(Confirmed)*
*   **Route Protection (`middleware.ts` + Layouts):**
    *   Middleware (`authorized` callback) checks **login status** for protected routes (`/patient/*`, `/student/*`, `/admin/*`) and redirects unauthenticated users to login. It also redirects **logged-in** users away from auth pages (`/login`, `/registrieren`) to their dashboards. *(Confirmed)*
    *   Specific **role enforcement** is handled within the respective layout files (`patient/layout.tsx`, `student/layout.tsx`, `admin/layout.tsx`) using `auth()`. *(Implemented)*
*   **Logout:**
    *   Implemented in `Header.tsx` / `UserMenuButton.tsx` using `signOut({ callbackUrl: '/' })`. *(Confirmed)*

## 3. Next Steps / Refinements

*   **Password Visibility Toggle:** Implement eye icon in password fields.
*   **Deregistration:** Implement self-service account deletion.
*   **Real Email:** Replace email simulation for password reset.
*   **Error Handling:** Further refine error messages for auth flows.
```

## File: `planning/COMPONENT_ARCHITECTURE.md`

```markdown
# Murph - Component Architecture Plan

## 1. Philosophy

*   Leverage Shadcn/ui primitives. *(Confirmed)*
*   Apply custom styles via Tailwind CSS. *(Confirmed)*
*   Organize components logically: `ui`, `core`, `features`, `admin`. *(Confirmed)*
*   Utilize Framer Motion for interactions/animations. *(Partially Implemented)*
*   Prioritize reusability and maintainability. *(Ongoing)*

## 2. Component Breakdown & Status

### `/components/ui` (Shadcn Primitives - Implemented as needed)
*   (List of Shadcn components used)

### `/components/core` (App-wide Components - Implemented)
*   `Footer.tsx`, `Header.tsx`, `Logo.tsx`, `NextAuthProvider.tsx`, `TrustBadge.tsx`, `LoadingSpinner.tsx`, `UserMenuButton.tsx`, `PageTransitionWrapper.tsx`

### `/components/features` (Feature-Specific Components - Implemented)
*   **Authentication:**
    *   `AuthForm.tsx`: Implemented.
    *   (New Components Needed: `ForgotPasswordForm`, `ResetPasswordForm` - currently implemented as pages)
*   **Consultation:**
    *   `ConsultationCard.tsx`: Implemented (displays basic info, status, triggers preview/link, **needs UI for category labels**).
    *   `ConsultationsSection.tsx`: Implemented (handles list display, preview dialog state).
    *   `ConsultationRequestForm.tsx`: Implemented.
    *   `FileUpload.tsx`: Implemented.
    *   `ConsultationPreviewDialog.tsx`: Implemented.
*   **Chat:**
    *   `ChatInterface.tsx`: Implemented.
    *   `MessageList.tsx`: Implemented.
    *   `ChatMessage.tsx`: Implemented.
    *   `MessageInput.tsx`: Implemented (integrates AI Check button).
    *   `DocumentLink.tsx`: Implemented.
*   **Profile:**
    *   `PatientProfileForm.tsx`, `StudentProfileForm.tsx`, `ProfilePictureUpload.tsx`: Implemented.
*   **Feedback:**
    *   (Feedback form inline in `app/feedback/page.tsx`. **Needs Categorized Feedback UI components**).
*   **AI:**
    *   `JargonExplainer.tsx`: Implemented.
    *   `AICheckResultDisplay.tsx`: Implemented.

### `/components/admin` (Admin-Specific Components - Implemented)
*   `AdminUserTable.tsx`, `AdminConsultationTable.tsx` (needs category/feedback columns), `VerifyStudentButton.tsx`.

## 3. State Management
*   Client-Side: Primarily React Hooks, React Hook Form, `useSession`. *(Confirmed)*
*   Global State: Zustand available if needed. *(Status Unchanged)*
*   Server State: Server Components, Server Actions, API Routes. *(Confirmed)*

## 4. Components Still Needed / To Refine

*   **AI:** Component to display AI category labels (e.g., small Badges on cards/details). UI for Document Summarizer (button/display).
*   **Student Dashboard:** Filtering controls (dropdown/checkboxes) for AI categories.
*   **Authentication:** Password visibility toggle component/logic. Components for Forgot/Reset Password forms (if extracting from pages).
*   **Feedback:** UI components for submitting/displaying categorized feedback.
*   **Deregistration:** Confirmation dialog/component.
*   **Admin:** Statistic display components (charts?), Profile View component.
*   **Search:** Search input and results components.
*   **General UI/UX:** Landing page animation, Logo size adjustment, Color/Background enhancements, Card interaction consistency implementation, Disclaimer placement adjustment.
*   **Animation Refinement:** Review/polish existing animations.
*   **Error Display:** Standardize further.
```

## File: `planning/DATABASE_SEEDING.md`

```markdown
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
```

## File: `planning/ERROR_HANDLING_STRATEGY.md`

```markdown
# Murph - Error Handling Strategy Status

## 1. Goal

Implement robust and user-friendly error handling using server-side checks and client-side feedback (Toasts, inline messages) with clear German messages.

## 2. Implementation Status

*   **Server-Side (API Routes / Server Actions):**
    *   `try...catch` blocks used in actions and route handlers. *(Confirmed)*
    *   **Validation Errors:** Zod validation used; errors returned with `success: false` / `fieldErrors` or 400 status. *(Confirmed)*
    *   **Authorization Errors:** Role/ownership checks implemented using `auth()` and DB lookups. Return `success: false` or 401/403 status codes. *(Confirmed)*
    *   **Not Found Errors:** Handled in specific cases. *(Confirmed)*
    *   **Prisma Errors:** Basic handling via general `catch` blocks. *(Partially Implemented - Needs specific Prisma error code handling)*
    *   **AI API Errors:** Basic handling for common errors (API Key, Safety) implemented in AI actions. *(Implemented)*
    *   **Generic Errors:** General `catch` blocks return 500 or `success: false`. Server-side `console.error` used. *(Confirmed)*
    *   **Response Format:** Actions return `{ success: boolean; message: string; ... }`. API routes return `NextResponse.json({ error: string }, { status: number })`. *(Confirmed)*
*   **Client-Side:**
    *   **UI Feedback:** `sonner` (Toasts) implemented and used for feedback on actions/API calls. *(Confirmed)*
    *   **Toast Usage:** `destructive` variant used for errors; messages generally sourced from server response. *(Confirmed)*
    *   **Specific Scenarios:** Login/Registration, Form Submissions, File Uploads, AI Actions trigger toasts on error. *(Confirmed)*
    *   **Data Fetching Errors:** `Alert` component used in list views (e.g., Dashboards). *(Confirmed)*
    *   **Loading States:** `useTransition` manages pending states. *(Confirmed)*

## 3. Next Steps / Refinements

*   **Prisma Error Specificity:** Implement catching of specific `PrismaClientKnownRequestError` codes (e.g., `P2002` for unique constraints) to provide more targeted feedback than generic DB errors.
*   **AI Error Granularity:** Refine error handling for AI API calls to potentially distinguish rate limits, content filtering, etc., more clearly to the user or admin.
*   **Client-Side Form Errors:** Ensure `fieldErrors` returned from server actions are properly displayed next to the corresponding form fields.
*   **Consistency:** Standardize error message phrasing (German) and potentially the response structure between Actions and API Routes.
*   **User Experience:** Review if certain errors warrant inline messages or specific UI states instead of just toasts (e.g., persistent API connection issues).
*   **Logging:** Enhance server-side error logging with more context.
```

## File: `planning/FILE_UPLOAD_BLOB.md`

```markdown
# Murph - File Upload Status (Vercel Blob)

## 1. Goal

Implement file uploading (consultation documents, profile pictures) using Vercel Blob.

## 2. Vercel Blob Setup

*   **Integration & Store:** Assumed set up in Vercel project.
*   **Environment Variable:** `BLOB_READ_WRITE_TOKEN` configured. *(Confirmed Setup)*

## 3. Implementation Status

*   **Technology:**
    *   Client-side: `@vercel/blob/client` (`upload`) used in `FileUpload.tsx` and `ProfilePictureUpload.tsx`. *(Confirmed)*
    *   Server-side: `@vercel/blob/client`'s `handleUpload` helper used in API routes. *(Confirmed)*
*   **Consultation Document Upload:**
    *   Frontend (`FileUpload.tsx`, `ConsultationRequestForm.tsx`): UI for selection, progress, removal implemented. Calls client `upload` pointing to `/api/upload`. Upload results stored in form state. *(Implemented)*
    *   Backend (`/api/upload/route.ts`): Handles upload via `handleUpload`, authorizes based on logged-in Patient role and designated path (`requests/[userId]/...`), restricts content types. *(Implemented)*
    *   Data Association (`actions/consultations.ts`): `createConsultation` action receives file details array and creates `Document` records in DB linked to the consultation. *(Implemented)*
*   **Profile Picture Upload:**
    *   Frontend (`ProfilePictureUpload.tsx`, Profile Forms): UI for selection, preview, removal implemented. Calls client `upload` pointing to `/api/upload/profile-picture`. Passes blob URL back to form on success. *(Implemented)*
    *   Backend (`/api/upload/profile-picture/route.ts`): Handles upload via `handleUpload`, authorizes based on logged-in user, designates path (`profile-pictures/[userId]/...`), restricts to image types/size. *(Implemented)*
    *   Data Association (`actions/profile.ts`): `updateProfile` action receives the new image URL (or null for removal) and updates the `image` field on the `User` record. *(Implemented)*
*   **Document/Image Viewing:**
    *   Consultation Documents: `DocumentLink.tsx` displays links using `storageUrl` (opens in new tab). *(Implemented)*
    *   Profile Pictures: `AvatarImage` component uses `user.image` field (sourced from session/DB) as `src`. *(Implemented)*
    *   Assumes public read access for blobs. *(Confirmed)*

## 4. Next Steps / Refinements

*   **Error Handling:** Enhance user feedback for failed uploads (client/server).
*   **Security:** Review blob access control if stricter permissions than public read are ever needed (e.g., signed URLs - likely V2+).
*   **Image Optimization:** Consider using Next/Image or Vercel Image Optimization for profile pictures if performance becomes an issue (requires blobs to be served from a domain Next.js can optimize).
```

## File: `planning/GERMAN_LANGUAGE_STRATEGY.md`

```markdown
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
```

## File: `planning/PLANNING_OVERVIEW.md`

```markdown
# Murph - Project Planning Overview

## 1. Project Goal

To develop "Murph," a modern Next.js web application connecting German patients with verified medical students for medical explanations (explicitly *not* diagnosis or medical advice). The project aims for a foundational, fully functional application with a visually stunning and trustworthy German-language interface, deployed on Vercel, and incorporating useful admin and AI-assisted features.

## 2. Core Features Scope (As of Last Session)

*   **Authentication:** Email/Password registration, login, logout. Password reset flow (simulated emails). *(Implemented)*
*   **Profiles:** Basic profile viewing. Profile editing (text fields + image upload). *(Implemented)*
*   **Consultation Request:** Patients submit requests with topic, question, and optional document upload (Vercel Blob). *(Implemented)*
*   **Consultation Workflow:**
    *   Students view requests, preview details, accept. *(Implemented)*
    *   Real-time Text Chat via Pusher for ongoing consultations. *(Implemented)*
    *   Students add a summary and mark consultation as complete. *(Implemented)*
*   **Document Handling:** Upload via Vercel Blob, viewing link within chat/details. *(Implemented)*
*   **Feedback:** Patients can submit rating/feedback for completed consultations via email link (simulated). *(Implemented)*
*   **Admin Console (V1):** Secure area with Dashboard (stats), User List (w/ student verification toggle), Consultation List (read-only). *(Implemented - Detail view broken)*
*   **AI Student Assist (V1 - Gemini):** Jargon Explainer, Chat Summary Draft, Clarity & Safety Check features integrated into student workflow. *(Implemented)*
*   **Email Notifications (Simulated):** Emails for Welcome, Password Reset, Request Confirmation, Consultation Accepted, Consultation Completed (+ Feedback Link), New Message, Student Verified. *(Implemented - Simulation Only)*
*   **UI/UX:** Polished, modern German interface using Shadcn/ui, Tailwind CSS. Initial animations implemented (page transitions, list entrances, button interactions, logo draw, form feedback). *(Partially Implemented - Base exists, refinement needed)*

## 3. Technology Stack (Confirmed Usage)

*   **Framework:** Next.js 14+ (App Router)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS
*   **UI Components:** Shadcn/ui
*   **State Management:** Primarily React Hooks (`useState`, `useTransition`). Zustand available if needed.
*   **Database:** Vercel Postgres
*   **ORM:** Prisma
*   **Authentication:** NextAuth.js (v5 / Auth.js) - Credentials Provider, JWT Strategy, Prisma Adapter.
*   **File Storage:** Vercel Blob
*   **Real-time:** Pusher
*   **AI:** Google Gemini API (via `@google/generative-ai` SDK or direct `fetch`).
*   **Animation:** Framer Motion
*   **Deployment:** Vercel (Target)

## 4. Current Status Summary (End of Last Session)

*   **Core Structure & DB:** Project setup complete, Prisma schema defined, migrated, seeded.
*   **Core User Flows:** Registration, Login, Logout, Password Reset (Simulated), Consultation Request/Accept/Chat/Complete, Profile Edit (Text+Image), Feedback Submission flows are functional.
*   **Admin Console:** Basic pages (Dashboard, Users, Consultations) exist and are protected. Student verification works. **Consultation detail view link is broken.**
*   **AI Features:** Jargon Explainer, Summary Draft, Clarity Check implemented using Gemini API (requires `.env.local` key read workaround).
*   **Email:** Simulation via console logs implemented for key events.
*   **UI/UX:** Base UI built. Initial animations added. German language used. Profile pictures functional in chat/profile.
*   **Known Issues/Workarounds:**
    *   AI features rely on reading `GEMINI_API_KEY` directly from `.env.local` instead of `process.env`.
    *   Header avatar update after profile save might have slight delay.
    *   Admin Consultation Detail View navigation broken.

## 5. Next Development Phase Goals (Based on User Request)

1.  **Fixes & Core Features:**
    *   Fix Admin Consultation Detail View.
    *   Implement Self-Service Deregistration/Profile Deletion.
    *   Add Password Visibility Toggle.
    *   Final verification of Post-Login Redirects.
2.  **Real Email Implementation:**
    *   Setup domain (`murph-med.de`) and email provider (e.g., Resend).
    *   Update `lib/email.ts` to send actual emails.
3.  **Student Verification:**
    *   Implement professional/automated verification process.
    *   Allow Admins to view user profiles.
4.  **Chat & Feedback Enhancements:**
    *   Implement Message Edit/Delete (timed).
    *   Implement Categorized Feedback system.
    *   Clarify Summary sharing in Student UI.
5.  **UI/UX Polish & WOW Factor:**
    *   Increase Logo size.
    *   Implement Landing Page 3D Background animation.
    *   Improve color/background usage across app.
    *   Ensure consistent Card Click interaction.
    *   Refine Landing Page Disclaimer placement.
6.  **Admin Console V2:**
    *   Add more Statistic UI Tools.
    *   Display feedback for Admins.
7.  **Platform Features:**
    *   Plan & Implement SEO.
    *   Implement Search functionality.
8.  **General:**
    *   Enhance Trust & Security Communication.
    *   Address remaining TODOs.
    *   Prepare for Vercel Deployment.
```

## File: `planning/REALTIME_CHAT_IMPLEMENTATION.md`

```markdown
# Murph - Real-time Chat Implementation Status (Pusher)

## 1. Goal

Implement a real-time text chat interface for ongoing consultations (`IN_PROGRESS` status) using Pusher Channels.

## 2. Implementation Status

*   **Pusher Configuration:**
    *   Environment Variables: Setup relies on standard Pusher env vars. *(Confirmed)*
    *   Server-side Instance (`lib/pusher/server.ts`): Initialized. Exports `pusherServer` and `triggerPusherEvent`. *(Confirmed)*
    *   Client-side Instance (`lib/pusher/client.ts`): Initialized. Exports `pusherClient`. Configures `authEndpoint`. *(Confirmed)*
*   **Channels and Events:**
    *   Channel Naming: Uses `private-consultation-${consultationId}`. *(Confirmed)*
    *   Events: `new-message` event used. *(Confirmed)*
    *   Payload: Includes message content and sender details (id, role, name, image). *(Confirmed)*
*   **Backend Logic (Message Sending - `/api/nachrichten/route.ts`):**
    *   Authenticates/authorizes user based on participation and `IN_PROGRESS` status. *(Confirmed)*
    *   Validates content. *(Confirmed)*
    *   Saves `Message` to DB (including sender details). *(Confirmed)*
    *   Triggers `new-message` event via Pusher helper. *(Confirmed)*
    *   Sends email notification (simulated) to recipient. *(Implemented)*
    *   Returns created message data. *(Confirmed)*
*   **Backend Logic (Pusher Authentication - `/api/pusher/auth/route.ts`):**
    *   Authenticates user session. *(Confirmed)*
    *   Verifies user participation in the requested channel's consultation via DB check. *(Confirmed)*
    *   Uses `pusherServer.authorizeChannel` to return signature. *(Confirmed)*
    *   Handles errors (401/403/500). *(Confirmed)*
*   **Frontend Logic (`ChatInterface.tsx`, `usePusherSubscription.ts`, `MessageList.tsx`, `ChatMessage.tsx`):**
    *   `usePusherSubscription` hook implemented for lifecycle management. *(Confirmed)*
    *   `ChatInterface` fetches initial messages, uses hook, manages message state. *(Confirmed)*
    *   `MessageList` uses `AnimatePresence` for message entrance. *(Implemented)*
    *   `ChatMessage` displays message content, time, sender info (name, avatar/image). *(Implemented)*
    *   `MessageInput` handles sending messages via API, uses optimistic update callback. *(Confirmed)*

## 3. Next Steps / Refinements

*   **Message Edit/Delete:** Implement timed editing/deletion functionality (requires UI, actions, Pusher events potentially).
*   **Read Receipts:** (Optional V2+) Consider adding read status indicators.
*   **Typing Indicators:** (Optional V2+) Consider adding typing indicators.
*   **Error Handling:** Improve UI feedback for Pusher connection issues or message sending failures.
*   **Performance:** Monitor performance with many messages. Consider pagination/infinite scrolling if needed later.
```

## File: `planning/TRUST_AND_SECURITY_COMMUNICATION.md`

```markdown
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
```

## File: `planning/UI_UX_ANIMATIONS.md`

```markdown
# Murph - UI/UX Enhancement & Animation Status

## 1. Goal

Create a visually stunning, modern, dynamic, and trustworthy user experience using subtle but impactful animations and micro-interactions with Framer Motion and Tailwind CSS.

## 2. Core Principles

*   Subtlety, Performance, Meaningful, Consistency. *(Guiding Principles)*

## 3. Implementation Status

*   **Framer Motion Integration:** Installed and used for page transitions, list item entrances, checkmark feedback, logo animation. *(Implemented)*
*   **Tailwind CSS Transitions:** Used for basic hover effects. *(Implemented)*
*   **Implemented Animations:**
    *   **Page Transitions:** Basic fade-in/slide-up via `PageTransitionWrapper`. *(Implemented)*
    *   **List Item Entrance:** Staggered fade-in/slide-up for `ConsultationCard` (via `ConsultationsSection`) and `ChatMessage` (via `AnimatePresence` in `MessageList`). *(Implemented)*
    *   **Button Micro-interactions:** Scale effect via `animateInteraction` prop applied to key CTAs. Color transitions handled by Tailwind/Shadcn defaults. *(Implemented)*
    *   **Form Submission Feedback:** Animated checkmark (`AnimatedCheckmark`) used on relevant forms/buttons after success. *(Implemented)*
    *   **Loading States:** Shadcn `Skeleton` components used with `animate-pulse`. Custom `LoadingSpinner` component created. `Loader2` used inline in buttons. *(Implemented)*
    *   **SVG Animations:** Logo draw animation implemented in `Logo.tsx`. *(Implemented)*
    *   **Hover Effects:** Card lift/shadow effect implemented on `ConsultationCard`. Nav link hovers use Shadcn defaults. *(Implemented)*
*   **Planned / Not Yet Implemented / Needs Refinement:**
    *   **Layout Animations (Dashboard Tabs):** Attempted implementation caused errors and was reverted. Needs alternative approach (e.g., CSS transitions, client-side tab content component). *(Reverted)*
    *   **Landing Page WOW Effect:** 3D animated background on scroll. *(Not Started)*
    *   **Logo Size:** Increase size in Header. *(Requested)*
    *   **Color/Backgrounds:** Introduce more creative color/background schemes beyond default white/muted. *(Requested)*
    *   **Card Interaction Consistency:** Ensure all cards use click-on-card interaction model. *(Requested)*
    *   **Refinement:** Thorough review of all existing animations for smoothness, timing, performance, and overall aesthetic feel.

## 4. Next Steps for Polish

1.  Address requested UI fixes (Logo size, Card interaction).
2.  Explore options for Landing Page WOW effect.
3.  Review overall color scheme and background usage.
4.  Refine timings and easing of existing animations.
5.  Investigate alternative for smooth dashboard tab transitions if desired.
```

## File: `postcss.config.mjs`

```javascript
const config = {
  plugins: ["@tailwindcss/postcss"],
};

export default config;

```

## File: `prisma/migrations/20250330134959_init/migration.sql`

```sql
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('PATIENT', 'STUDENT');

-- CreateEnum
CREATE TYPE "ConsultationStatus" AS ENUM ('REQUESTED', 'ASSIGNED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'PATIENT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PatientProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "dob" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PatientProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "university" TEXT NOT NULL,
    "clinicalYear" INTEGER NOT NULL,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "averageRating" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudentProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Consultation" (
    "id" TEXT NOT NULL,
    "patientId" TEXT NOT NULL,
    "studentId" TEXT,
    "status" "ConsultationStatus" NOT NULL DEFAULT 'REQUESTED',
    "topic" TEXT NOT NULL,
    "patientQuestion" TEXT NOT NULL,
    "summary" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Consultation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "consultationId" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "consultationId" TEXT NOT NULL,
    "uploaderId" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "storageUrl" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "fileSize" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Account_userId_idx" ON "Account"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE INDEX "Session_userId_idx" ON "Session"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PatientProfile_userId_key" ON "PatientProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "StudentProfile_userId_key" ON "StudentProfile"("userId");

-- CreateIndex
CREATE INDEX "Consultation_patientId_idx" ON "Consultation"("patientId");

-- CreateIndex
CREATE INDEX "Consultation_studentId_idx" ON "Consultation"("studentId");

-- CreateIndex
CREATE INDEX "Consultation_status_idx" ON "Consultation"("status");

-- CreateIndex
CREATE INDEX "Consultation_createdAt_idx" ON "Consultation"("createdAt");

-- CreateIndex
CREATE INDEX "Message_consultationId_createdAt_idx" ON "Message"("consultationId", "createdAt");

-- CreateIndex
CREATE INDEX "Message_senderId_idx" ON "Message"("senderId");

-- CreateIndex
CREATE INDEX "Document_consultationId_idx" ON "Document"("consultationId");

-- CreateIndex
CREATE INDEX "Document_uploaderId_idx" ON "Document"("uploaderId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientProfile" ADD CONSTRAINT "PatientProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentProfile" ADD CONSTRAINT "StudentProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consultation" ADD CONSTRAINT "Consultation_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consultation" ADD CONSTRAINT "Consultation_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_consultationId_fkey" FOREIGN KEY ("consultationId") REFERENCES "Consultation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_consultationId_fkey" FOREIGN KEY ("consultationId") REFERENCES "Consultation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_uploaderId_fkey" FOREIGN KEY ("uploaderId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

```

## File: `prisma/migrations/20250405032035_add_user_image/migration.sql`

```sql
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "image" TEXT;

```

## File: `prisma/migrations/20250405043246_add_admin_role/migration.sql`

```sql
-- AlterEnum
ALTER TYPE "UserRole" ADD VALUE 'ADMIN';

```

## File: `prisma/migrations/20250405065444_add_password_reset_feedback/migration.sql`

```sql
-- AlterTable
ALTER TABLE "Consultation" ADD COLUMN     "patientFeedback" TEXT,
ADD COLUMN     "patientRating" INTEGER;

-- CreateTable
CREATE TABLE "PasswordResetToken" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PasswordResetToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetToken_tokenHash_key" ON "PasswordResetToken"("tokenHash");

-- CreateIndex
CREATE INDEX "PasswordResetToken_userId_idx" ON "PasswordResetToken"("userId");

-- AddForeignKey
ALTER TABLE "PasswordResetToken" ADD CONSTRAINT "PasswordResetToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

```

## File: `prisma/migrations/migration_lock.toml`

```toml
# Please do not edit this file manually
# It should be added in your version-control system (e.g., Git)
provider = "postgresql"
```

## File: `prisma/schema.prisma`

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

enum UserRole {
  PATIENT
  STUDENT
  ADMIN
}

enum ConsultationStatus {
  REQUESTED
  ASSIGNED
  IN_PROGRESS
  COMPLETED
  CANCELLED
}

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  passwordHash  String?
  image         String?
  role          UserRole  @default(PATIENT)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  patientProfile PatientProfile?
  studentProfile StudentProfile?
  sentMessages  Message[] @relation("SenderMessages")
  consultationsAsPatient Consultation[] @relation("PatientConsultations")
  consultationsAsStudent Consultation[] @relation("StudentConsultations")
  uploadedDocuments Document[] @relation("UploaderDocuments")
  passwordResetTokens PasswordResetToken[] // <<< ADD THIS RELATION

  accounts Account[]
  sessions Session[]
}

model Account {
  id                 String  @id @default(cuid())
  userId             String
  type               String
  provider           String
  providerAccountId  String
  refresh_token      String? @db.Text
  access_token       String? @db.Text
  expires_at         Int?
  token_type         String?
  scope              String?
  id_token           String? @db.Text
  session_state      String?
  user               User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  @@unique([provider, providerAccountId])
  @@index([userId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  @@index([userId])
}

model PatientProfile {
  id        String   @id @default(cuid())
  userId    String   @unique
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  firstName String
  lastName  String
  dob       DateTime?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model StudentProfile {
  id            String   @id @default(cuid())
  userId        String   @unique
  user          User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  firstName     String
  lastName      String
  university    String
  clinicalYear  Int
  isVerified    Boolean  @default(false)
  averageRating Float?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

model Consultation {
  id              String   @id @default(cuid())
  patientId       String
  patient         User     @relation("PatientConsultations", fields: [patientId], references: [id], onDelete: Cascade)
  studentId       String?
  student         User?    @relation("StudentConsultations", fields: [studentId], references: [id], onDelete: SetNull)
  status          ConsultationStatus @default(REQUESTED)
  topic           String
  patientQuestion String   @db.Text
  summary         String?  @db.Text
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  messages        Message[]
  documents       Document[]

  // <<< ADD Feedback Fields >>>
  patientRating   Int?     // e.g., 1-5
  patientFeedback String?  @db.Text
  // feedbackToken String? @unique // Simplified V1 - Token removed for now
  // feedbackTokenExpires DateTime? // Simplified V1 - Token removed for now

  @@index([patientId])
  @@index([studentId])
  @@index([status])
  @@index([createdAt])
}

model Message {
  id             String   @id @default(cuid())
  consultationId String
  consultation   Consultation @relation(fields: [consultationId], references: [id], onDelete: Cascade)
  senderId       String
  sender         User     @relation("SenderMessages", fields: [senderId], references: [id], onDelete: Cascade)
  content        String   @db.Text
  createdAt      DateTime @default(now())
  @@index([consultationId, createdAt])
  @@index([senderId])
}

model Document {
  id             String   @id @default(cuid())
  consultationId String
  consultation   Consultation @relation(fields: [consultationId], references: [id], onDelete: Cascade)
  uploaderId     String
  uploader       User     @relation("UploaderDocuments", fields: [uploaderId], references: [id], onDelete: Cascade)
  fileName       String
  storageUrl     String   @db.Text
  mimeType       String
  fileSize       Int?
  createdAt      DateTime @default(now())
  @@index([consultationId])
  @@index([uploaderId])
}

// <<< ADD PasswordResetToken Model >>>
model PasswordResetToken {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  tokenHash String   @unique // Store a hash of the token
  expiresAt DateTime

  createdAt DateTime @default(now())

  @@index([userId])
}
```

## File: `prisma/seed.ts`

```typescript
// prisma/seed.ts
import { PrismaClient, UserRole, ConsultationStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();
const SALT_ROUNDS = 10;

async function main() {
  console.log(`Start seeding ...`);

  // --- Clear existing data ---
  console.log('Deleting existing data (Messages, Documents, Consultations)...');
  await prisma.message.deleteMany();
  await prisma.document.deleteMany();
  await prisma.consultation.deleteMany();
  console.log('Deleting existing profiles (Patient, Student)...');
  await prisma.patientProfile.deleteMany();
  await prisma.studentProfile.deleteMany();
  console.log('Deleting existing users and related auth data (Accounts, Sessions)...');
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.user.deleteMany();
  console.log('Existing data deleted.');


  // --- Seed Admin User ---
  console.log('Seeding Admin User...');
  const adminPassword = await bcrypt.hash(process.env.ADMIN_SEED_PASSWORD || 'adminPass123!', SALT_ROUNDS); // Use env var or fallback
  const adminUser = await prisma.user.create({
    data: {
      email: process.env.ADMIN_SEED_EMAIL || 'admin@murph.app', // Use env var or fallback
      passwordHash: adminPassword,
      role: UserRole.ADMIN,
      // Admin might not need a specific profile, or you could add a simple one if needed later
    }
  });
  console.log(`Seeded Admin User: ${adminUser.email}`);


  // --- Seed Patients ---
  console.log('Seeding Patients...');
  const patientPassword = await bcrypt.hash('passwort123', SALT_ROUNDS);
  const patient1 = await prisma.user.create({ data: { email: 'anna.mueller@email.de', passwordHash: patientPassword, role: UserRole.PATIENT, patientProfile: { create: { firstName: 'Anna', lastName: 'Müller', dob: new Date('1988-05-12'), }, }, }, include: { patientProfile: true } });
  const patient2 = await prisma.user.create({ data: { email: 'max.schmidt@web.de', passwordHash: patientPassword, role: UserRole.PATIENT, patientProfile: { create: { firstName: 'Max', lastName: 'Schmidt', dob: new Date('1995-11-23'), }, }, }, include: { patientProfile: true } });
  const patient3 = await prisma.user.create({ data: { email: 'sophie.fischer@mail.com', passwordHash: patientPassword, role: UserRole.PATIENT, patientProfile: { create: { firstName: 'Sophie', lastName: 'Fischer', }, }, }, include: { patientProfile: true } });
  console.log(`Seeded ${await prisma.user.count({ where: { role: UserRole.PATIENT }})} patients.`);


  // --- Seed Students ---
  console.log('Seeding Students...');
  const studentPassword = await bcrypt.hash('studpass456', SALT_ROUNDS);
  const student1 = await prisma.user.create({ data: { email: 'lukas.huber@med.uni-muenchen.de', passwordHash: studentPassword, role: UserRole.STUDENT, studentProfile: { create: { firstName: 'Lukas', lastName: 'Huber', university: 'LMU München', clinicalYear: 4, isVerified: true, }, }, }, include: { studentProfile: true } });
  const student2 = await prisma.user.create({ data: { email: 'julia.bauer@charite.de', passwordHash: studentPassword, role: UserRole.STUDENT, studentProfile: { create: { firstName: 'Julia', lastName: 'Bauer', university: 'Charité - Universitätsmedizin Berlin', clinicalYear: 5, isVerified: true, }, }, }, include: { studentProfile: true } });
  const student3 = await prisma.user.create({ data: { email: 'felix.wagner@med.uni-heidelberg.de', passwordHash: studentPassword, role: UserRole.STUDENT, studentProfile: { create: { firstName: 'Felix', lastName: 'Wagner', university: 'Universität Heidelberg', clinicalYear: 3, isVerified: false, }, }, }, include: { studentProfile: true } }); // <<< Made one student unverified
  console.log(`Seeded ${await prisma.user.count({ where: { role: UserRole.STUDENT }})} students.`);


  // --- Seed Consultations ---
  console.log('Seeding Consultations...');
  // 1. REQUESTED (with doc)
  await prisma.consultation.create({ data: { patientId: patient1.id, status: ConsultationStatus.REQUESTED, topic: 'Frage zu Blutwerten', patientQuestion: 'Meine Leberwerte (GOT, GPT) sind laut letztem Blutbild leicht erhöht. Was könnte das allgemein bedeuten? Ich habe keine Beschwerden.', documents: { create: [ { uploaderId: patient1.id, fileName: 'Blutbild_Scan.pdf', storageUrl: 'placeholder/seed/Blutbild_Scan.pdf', mimeType: 'application/pdf', fileSize: 123456, }, { uploaderId: patient1.id, fileName: 'Notizen_Arzt.jpg', storageUrl: 'placeholder/seed/Notizen_Arzt.jpg', mimeType: 'image/jpeg', fileSize: 78910, }, ] } } });
  // 2. REQUESTED (no doc)
  await prisma.consultation.create({ data: { patientId: patient2.id, status: ConsultationStatus.REQUESTED, topic: 'Erklärung MRT-Befund Knie', patientQuestion: 'Ich habe einen MRT-Befund für mein Knie erhalten und verstehe den Fachbegriff "Chondropathia patellae Grad II" nicht. Können Sie mir das bitte einfach erklären?', } });
  // 3. IN_PROGRESS
  await prisma.consultation.create({ data: { patientId: patient3.id, studentId: student1.id, status: ConsultationStatus.IN_PROGRESS, topic: 'Nebenwirkungen Medikament X', patientQuestion: 'Ich nehme seit einer Woche Medikament X und habe seitdem häufig Kopfschmerzen. Ist das eine bekannte Nebenwirkung?', messages: { create: [ { senderId: patient3.id, content: 'Ich nehme seit einer Woche Medikament X und habe seitdem häufig Kopfschmerzen. Ist das eine bekannte Nebenwirkung?', createdAt: new Date(Date.now() - 1000 * 60 * 10), }, { senderId: student1.id, content: 'Guten Tag! Vielen Dank für Ihre Anfrage. Kopfschmerzen können tatsächlich eine mögliche Nebenwirkung von Medikament X sein. Wie stark sind die Kopfschmerzen denn?', createdAt: new Date(Date.now() - 1000 * 60 * 8), }, { senderId: patient3.id, content: 'Hallo Lukas, danke für die schnelle Antwort. Sie sind eher dumpf und nicht extrem stark, aber störend.', createdAt: new Date(Date.now() - 1000 * 60 * 5), } ] } } });
  // 4. COMPLETED
  await prisma.consultation.create({ data: { patientId: patient2.id, studentId: student2.id, status: ConsultationStatus.COMPLETED, topic: 'Unsicherheit nach Arztbesuch', patientQuestion: 'Der Arzt hat etwas von einer "Differentialdiagnose" erwähnt in Bezug auf meine Symptome. Was genau bedeutet das?', summary: 'Patient fragte nach der Bedeutung des Begriffs "Differentialdiagnose". Erklärt als Prozess des systematischen Ausschlusses von Krankheiten mit ähnlichen Symptomen, um zur wahrscheinlichsten Diagnose zu gelangen. Auf reinen Erklärungscharakter hingewiesen.', messages: { create: [ { senderId: patient2.id, content: 'Hallo, können Sie mir erklären, was "Differentialdiagnose" bedeutet?', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), }, { senderId: student2.id, content: 'Hallo Max, gerne. Eine Differentialdiagnose ist eine Liste von möglichen Erkrankungen, die ähnliche Symptome wie Ihre verursachen könnten. Der Arzt prüft diese dann Schritt für Schritt, um die wahrscheinlichste Ursache zu finden.', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 5), }, { senderId: patient2.id, content: 'Ah, verstehe. Das hilft mir sehr weiter, danke!', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 10), }, { senderId: student2.id, content: 'Freut mich, wenn ich helfen konnte! Wenn keine weiteren Fragen bestehen, würde ich die Beratung nun abschließen.', createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 15), } ] } } });

  console.log(`Seeded ${await prisma.consultation.count()} consultations.`);
  console.log(`Seeded ${await prisma.message.count()} messages.`);
  console.log(`Seeded ${await prisma.document.count()} documents.`);

  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

## File: `tailwind.config.ts`

```typescript
// tailwind.config.ts
import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"], // Keep this as set by shadcn
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}', // Include src if you ever use it
	],
  prefix: "", // Keep this as set by shadcn
  theme: {
    container: { // Keep this as set by shadcn
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: { // Keep extends block as set by shadcn
      colors: {
        // Integrate shadcn colors (it adds these automatically)
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // --- Add Your Custom Brand Colors ---
        // Example using Teal and Muted Orange
        brand: {
          primary: 'hsl(var(--brand-primary))', // ~Teal
          secondary: 'hsl(var(--brand-secondary))', // ~Muted Orange/Yellow
          // Add shades if needed: e.g., primary-dark: 'hsl(...)'
        },
      },
      borderRadius: { // Keep this as set by shadcn
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: { // Keep this as set by shadcn
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        // --- Add Custom Keyframes if needed ---
        "subtle-pulse": {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '.95', transform: 'scale(1.02)' },
        }
      },
      animation: { // Keep this as set by shadcn
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        // --- Add Custom Animations ---
        "subtle-pulse": "subtle-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")], // Keep this as set by shadcn
} satisfies Config

export default config
```

## File: `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}

```

## File: `types/index.ts`

```typescript

```

## File: `.env.local`

```
# .env.local

# Vercel Postgres Connection String
DATABASE_URL="postgres://neondb_owner:npg_ilFczdKG9y4A@ep-broad-darkness-a2rkuo3u-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require"

# Vercel Postgres Direct Connection String (for migrations/seeding)
DIRECT_URL="postgresql://neondb_owner:npg_ilFczdKG9y4A@ep-broad-darkness-a2rkuo3u.eu-central-1.aws.neon.tech/neondb?sslmode=require"

# NextAuth Configuration
# IMPORTANT: Update NEXTAUTH_URL for production deployment on Vercel (e.g., https://your-murph-app.vercel.app)
NEXTAUTH_URL="http://localhost:3000"
# Generate a strong secret: openssl rand -base64 32
NEXTAUTH_SECRET="99cd701e44fdb40f33282990abbce5880f338e3da7c91b614d33726420729cb0" # Use your generated secret

# Pusher Configuration
PUSHER_APP_ID="1966161"
NEXT_PUBLIC_PUSHER_KEY="f5ba42a6feec0f9cd3fa" # Prefix needed for client-side access
PUSHER_SECRET="53850e344d0d9d66bd55"
NEXT_PUBLIC_PUSHER_CLUSTER="eu"           # Prefix needed for client-side access

# Vercel Blob Store Token
# !!! IMPORTANT: Replace placeholder with your actual Read/Write token from Vercel Project Settings !!!
BLOB_READ_WRITE_TOKEN="vercel_blob_rw_3bl5PiBoFXLVkESA_8IPtrmqoaE5dtVz266n4YFwrBNVj9Q" # e.g., "vercel_blob_rw_xxxxxxxxxxxxxxxxxxxx"

NEXT_PUBLIC_APP_BASE_URL=http://localhost:3000
EMAIL_FROM="Murph DEV <noreply@murph.local>"

# Optional, for seeding admin user securely
ADMIN_SEED_EMAIL=admin@yourdomain.com
ADMIN_SEED_PASSWORD=pupelineistneschnupeline

# Gemini API Key
GEMINI_API_KEY=AIzaSyAMTsyujGVKBwlBAVUGWx8mD83-FWW0Xfc

# Add variables for your chosen email provider later (e.g., RESEND_API_KEY)

# Optional: Set NODE_ENV if needed (Vercel sets this automatically in deployment)
# NODE_ENV=development
```



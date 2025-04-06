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
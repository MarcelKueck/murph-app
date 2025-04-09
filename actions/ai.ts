// actions/ai.ts
'use server';

import { auth } from "@/lib/auth";
import { ConsultationStatus, UserRole } from "@prisma/client";
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { Document } from '@prisma/client';
import { PREDEFINED_CONSULTATION_CATEGORIES } from '@/lib/constants';
import prisma from "@/lib/prisma";

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
        // For Categorization
        categories?: string[];
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


// --- Helper: Extract Text from PDF Blob ---
async function extractTextFromPdfUrl(url: string): Promise<string | null> {
    if (!url) {
        console.log("extractTextFromPdfUrl: No URL provided.");
        return null;
    }
    console.log(`extractTextFromPdfUrl: Attempting to fetch PDF from ${url}`);
    try {
        // <<< Dynamically import the FORKED pdf-parse HERE >>>
        const pdf = (await import('@cyber2024/pdf-parse-fixed')).default;
        console.log("extractTextFromPdfUrl: Dynamically imported @cyber2024/pdf-parse-fixed.");

        const response = await fetch(url);
        console.log(`extractTextFromPdfUrl: Fetch response status for ${url}: ${response.status}`);

        if (!response.ok) {
            console.error(`extractTextFromPdfUrl: Failed to fetch PDF from ${url}: ${response.statusText}`);
            try {
                 const errorBody = await response.text();
                 console.error(`extractTextFromPdfUrl: Error response body: ${errorBody.substring(0, 500)}`);
            } catch (_) {}
            return null;
        }
        const contentType = response.headers.get('content-type');
        console.log(`extractTextFromPdfUrl: Content-Type for ${url}: ${contentType}`);

        const arrayBuffer = await response.arrayBuffer();
        console.log(`extractTextFromPdfUrl: Received arrayBuffer with length ${arrayBuffer.byteLength} for ${url}`);

        if (arrayBuffer.byteLength === 0) {
             console.warn(`extractTextFromPdfUrl: Received empty buffer for ${url}. Cannot parse.`);
             return null;
        }

        console.log(`extractTextFromPdfUrl: Calling pdf-parse for ${url}...`);
        const data = await pdf(Buffer.from(arrayBuffer)); // Use the dynamically imported pdf
        console.log(`extractTextFromPdfUrl: pdf-parse successful for ${url}, extracted text length: ${data.text.length}`);

        const MAX_TEXT_LENGTH = 5000; // Limit extracted text length
        return data.text.substring(0, MAX_TEXT_LENGTH);

    } catch (error) {
        console.error(`extractTextFromPdfUrl: Error processing PDF from ${url}:`, error);
        if (error instanceof Error && error.message.includes('ENOENT')) {
             console.error("extractTextFromPdfUrl: Caught ENOENT error during pdf-parse. This likely indicates an issue processing the fetched buffer or an internal library problem triggered by invalid input.");
        }
        return null;
    }
}
// --- End PDF Helper ---


// --- Jargon Explainer Action ---
export async function getAIJargonExplanation(term: string): Promise<AIActionResult> {
    const session = await auth();
    if (!session?.user?.id || (session.user.role !== UserRole.STUDENT && session.user.role !== UserRole.ADMIN)) {
        return { success: false, message: "Nur autorisierte Benutzer können diese Funktion nutzen.", data: null };
    }
    if (!geminiModel) {
         initializeGemini();
         if(!geminiModel) return { success: false, message: "AI-Modell ist nicht verfügbar.", data: null };
    }
    if (!term || term.trim().length === 0) { return { success: false, message: "Bitte geben Sie einen Begriff ein.", data: null }; }

    const sanitizedTerm = term.trim().substring(0, 100);
    const prompt = `Erkläre den medizinischen Begriff "${sanitizedTerm}" in einfacher deutscher Sprache (max. 2-3 Sätze) für einen Patienten (Laien). Gib KEINE medizinische Diagnose, Therapieempfehlung oder Handlungsaufforderung ab. Konzentriere dich rein auf die Worterklärung.`;
    const apiKey = getApiKeyFromEnvLocal();
    if (!apiKey) return { success: false, message: "AI-Konfigurationsfehler.", data: null };
    const modelName = "gemini-1.5-flash";
    const apiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent`;
    const requestBody = { contents: [{ parts: [{ text: prompt }] }] };
    const headers = { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey, 'User-Agent': 'MurphApp/1.0 (Node.js fetch)' };

    try {
        const response = await fetch(apiEndpoint, { method: 'POST', headers: headers, body: JSON.stringify(requestBody) });
        if (!response.ok) {
             let errorData: any = null; let errorText = '';
             try { errorText = await response.text(); errorData = JSON.parse(errorText); }
             catch (e) { console.warn("[AI Action - fetch] Could not parse error response as JSON:", errorText); errorData = { error: { message: errorText || `HTTP error ${response.status}` } }; }
             console.error(`[AI Action - fetch] API Error: ${response.status} ${response.statusText}`, errorData);
             let userMessage = `Unerwarteter Fehler vom AI-Service (${response.status}).`;
             const errorMessageFromApi = errorData?.error?.message || '';
              if (response.status === 400) { if (errorMessageFromApi.includes('API key') || errorMessageFromApi.includes('API_KEY')) { userMessage = "AI-Konfigurationsfehler (API Key)."; } else { userMessage = `Fehlerhafte Anfrage (${response.status}).`; } }
             else if (response.status === 403) { userMessage = "Zugriff verweigert (403)."; }
             else if (response.status === 429) { userMessage = "AI-Limit erreicht."; }
             else if (response.status >= 500) { userMessage = "Problem beim AI-Anbieter."; }
             return { success: false, message: userMessage, data: null };
         }
        const data = await response.json();
        const explanation = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!explanation?.trim()) {
             const finishReason = data?.candidates?.[0]?.finishReason;
             console.warn(`[AI Action - fetch] Received empty explanation. Finish Reason: ${finishReason}`);
             let userMessage = "Keine Erklärung generiert.";
             if (finishReason === 'SAFETY') { userMessage = "Erklärung wegen Sicherheitsrichtlinien blockiert."; }
             return { success: false, message: userMessage, data: null };
        }
        return { success: true, message: explanation, data: null };
    } catch (error: any) {
        console.error("[AI Action - fetch] Network Error (Jargon):", error);
        return { success: false, message: "Netzwerkfehler bei AI-Anfrage.", data: null };
    }
}


// --- Chat Summary Draft Action ---
interface ChatEntry { sender: { role: UserRole }; content: string; }
export async function getAIChatSummaryDraft(consultationId: string): Promise<AIActionResult> {
    const session = await auth();
    if (!session?.user?.id || session.user.role !== UserRole.STUDENT) {
        return { success: false, message: "Nur Studenten können Zusammenfassungen entwerfen.", data: null };
    }
    if (!geminiModel) {
        initializeGemini();
        if(!geminiModel) return { success: false, message: "AI-Modell ist nicht verfügbar.", data: null };
    }
    if (!consultationId) {
        return { success: false, message: "Beratungs-ID fehlt.", data: null };
    }
    let consultationData;
    try {
        consultationData = await prisma.consultation.findUnique({
            where: { id: consultationId },
            select: {
                messages: {
                    orderBy: { createdAt: 'asc' },
                    include: { sender: { select: { role: true } } }
                },
                documents: {
                    select: { fileName: true, storageUrl: true, mimeType: true }
                }
            }
        });
    } catch (dbError) {
        console.error(`[AI Summary Draft] Error fetching consultation data for ${consultationId}:`, dbError);
        return { success: false, message: "Fehler beim Abrufen der Beratungsdaten.", data: null };
    }
    if (!consultationData) {
        return { success: false, message: "Beratung nicht gefunden.", data: null };
    }
    const { messages, documents } = consultationData;
    if (!messages || messages.length === 0) {
        return { success: false, message: "Chatverlauf ist leer.", data: null };
    }
    let formattedHistory = "";
    try {
        messages.forEach(msg => {
            if (!msg?.sender?.role || typeof msg.content !== 'string') { throw new Error(`Invalid message entry: ${JSON.stringify(msg)}`); }
            const prefix = msg.sender.role === UserRole.PATIENT ? "P:" : "S:";
            formattedHistory += `${prefix} ${msg.content.trim()}\n`;
        });
    }
    catch (formatError: any) { console.error("Error formatting chat history:", formatError); return { success: false, message: "Fehler beim Verarbeiten des Chatverlaufs.", data: null }; }
    let documentContext = "";
    const pdfDocuments = documents.filter(doc => doc.mimeType === 'application/pdf' && doc.storageUrl);
    if (pdfDocuments.length > 0) {
        console.log(`[AI Summary Draft] Processing ${pdfDocuments.length} PDF(s) for context.`);
        for (const doc of pdfDocuments) {
            const text = await extractTextFromPdfUrl(doc.storageUrl);
            if (text) {
                documentContext += `\n\nKontext aus Dokument (${doc.fileName}):\n${text.substring(0, 1000)}...`;
            }
        }
        documentContext = documentContext.substring(0, 5000);
    }
    const modelName = "gemini-1.5-flash";
    const apiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent`;
    const prompt = `Du bist ein KI-Assistent für Medizinstudenten. Erstelle eine neutrale, sachliche Zusammenfassung (max. 150 Wörter, Deutsch) für die interne Dokumentation des Studenten. Berücksichtige dabei SOWOHL die folgende Chat-Konversation (P: Patient, S: Student) ALS AUCH den Kontext aus eventuell angehängten Dokumenten. Gib keine eigene medizinische Bewertung oder Empfehlung ab.\n\nChat-Konversation:\n${formattedHistory}\n${documentContext ? `\nKontext aus Dokumenten:${documentContext}` : ''}\n\nZusammenfassung:`;
    const requestBody = { contents: [{ parts: [{ text: prompt }] }] };
    const apiKey = getApiKeyFromEnvLocal(); if (!apiKey) return { success: false, message: "AI-Konfigurationsfehler.", data: null };
    const headers = { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey, 'User-Agent': 'MurphApp/1.0 (Node.js fetch)' };
    try {
        const response = await fetch(apiEndpoint, { method: 'POST', headers: headers, body: JSON.stringify(requestBody) });
        if (!response.ok) {
            let e = await response.text(); console.error(`[AI Summary Draft] API Error ${response.status}:`,e);
            return {success:false, message:`Fehler von AI-Service (${response.status})`, data: null}
        }
        const data = await response.json();
        const summaryDraft = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!summaryDraft?.trim()) {
            const r = data?.candidates?.[0]?.finishReason;
            console.warn(`[AI Summary Draft] Empty summary. Reason: ${r}`);
            return {success:false, message:"Zusammenfassung konnte nicht generiert werden.", data: null}
        }
        console.log(`[AI Summary Draft] Successfully generated draft for consultation ${consultationId}.`);
        return { success: true, message: summaryDraft.trim(), data: null };
    } catch (error: any) {
        console.error(`[AI Summary Draft] Network or processing error for ${consultationId}:`, error);
        return {success:false, message:"Netzwerkfehler bei AI-Anfrage.", data: null}
    }
}


// --- Clarity & Safety Check Action ---
export async function getAIClaritySafetyCheck(textToCheck: string): Promise<AIActionResult> {
    const session = await auth();
    if (!session?.user?.id || session.user.role !== UserRole.STUDENT) { return { success: false, message: "Nur Studenten können diese Funktion nutzen.", data: null }; }
    if (!geminiModel) { initializeGemini(); if(!geminiModel) return { success: false, message: "AI-Modell ist nicht verfügbar.", data: null }; }
    if (!textToCheck || textToCheck.trim().length < 10) { return { success: false, message: "Bitte geben Sie ausreichend Text zur Prüfung ein (min. 10 Zeichen).", data: null }; }

    const sanitizedText = textToCheck.trim().substring(0, 4000);
    const modelName = "gemini-1.5-flash";
    const apiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent`;
    const apiKey = getApiKeyFromEnvLocal(); if (!apiKey) return { success: false, message: "AI-Konfigurationsfehler.", data: null };

    const prompt = `Du bist ein KI-Assistent für Medizinstudenten und prüfst Texte auf Klarheit und Sicherheit für Patientenkommunikation in deutscher Sprache. Analysiere den folgenden Text: 1. **Klarheit:** Ist der Text klar, prägnant und in einfacher Sprache für einen medizinischen Laien (Patienten) verständlich? Gib kurzes Feedback (1 Satz). 2. **Sicherheit:** Enthält der Text Formulierungen, die als spezifische medizinische Diagnose, Therapieempfehlung, Behandlungsanweisung oder dringende Handlungsaufforderung missverstanden werden könnten (was absolut vermieden werden muss)? Antworte mit 'JA' oder 'NEIN'. Gib zusätzlich eine kurze Begründung (1 Satz), falls 'JA'. 3. **Vorschläge (Optional):** Gib maximal 2 kurze Vorschläge zur Verbesserung der Klarheit oder zur Vermeidung von Missverständnissen, falls angebracht. Formatiere deine Antwort AUSSCHLIESSLICH als valides JSON-Objekt mit den folgenden Schlüsseln: "clarityFeedback": string, "safetyConcern": boolean, "safetyJustification": string (nur relevant wenn safetyConcern true), "suggestions": string[]. Text zur Prüfung:\n"${sanitizedText}"`;
    const requestBody = { contents: [{ parts: [{ text: prompt }] }], generationConfig: { responseMimeType: "application/json" } };
    const headers = { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey, 'User-Agent': 'MurphApp/1.0 (Node.js fetch)' };

    try {
        const response = await fetch(apiEndpoint, { method: 'POST', headers: headers, body: JSON.stringify(requestBody) });
        if (!response.ok) { let e = await response.text(); console.error(`API Error ${response.status}`,e); return {success:false, message:`Fehler ${response.status}`, data: null} }
        const data = await response.json();
        const aiResponseJsonString = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!aiResponseJsonString?.trim()) { return {success:false, message:"Prüfung fehlgeschlagen (leere Antwort).", data: null}}

        try {
            const parsedData = JSON.parse(aiResponseJsonString);
            if (typeof parsedData.clarityFeedback !== 'string' || typeof parsedData.safetyConcern !== 'boolean') { throw new Error("Unerwartetes JSON-Format."); }
            const safetyJustification = typeof parsedData.safetyJustification === 'string' ? parsedData.safetyJustification : '';
            const suggestions = Array.isArray(parsedData.suggestions) ? parsedData.suggestions.filter((s: any) => typeof s === 'string').slice(0, 2) : [];
            const resultData = { clarityFeedback: parsedData.clarityFeedback, hasSafetyConcern: parsedData.safetyConcern, safetyFeedback: parsedData.safetyConcern ? safetyJustification || "Mögliche problematische Formulierung gefunden." : "Keine direkten Sicherheitsbedenken erkannt.", suggestions: suggestions, };
            return { success: true, message: "Prüfung abgeschlossen.", data: resultData };
        } catch (parseError: any) { console.error("[AI Action SDK] Error parsing JSON:", parseError); return { success: false, message: "Antwort der AI konnte nicht verarbeitet werden.", data: null }; }

    } catch (error: any) { console.error("[AI Action - fetch] Error fetching clarity check:", error); return {success:false, message:"Netzwerkfehler bei AI-Anfrage.", data: null}}
}


// --- AI Consultation Categorization Action ---
export async function getAIConsultationCategories(
    topic: string,
    patientQuestion: string,
    documents: Document[]
): Promise<AIActionResult> {
    if (!geminiModel) {
         initializeGemini();
         if(!geminiModel) return { success: false, message: "AI-Modell ist nicht verfügbar.", data: null };
    }
    let documentContext = "";
    const pdfDocuments = documents.filter(doc => doc.mimeType === 'application/pdf' && doc.storageUrl);
    if (pdfDocuments.length > 0) {
        console.log(`[AI Categorization] Found ${pdfDocuments.length} PDF(s) to process for text extraction.`);
        for (const doc of pdfDocuments) {
            const text = await extractTextFromPdfUrl(doc.storageUrl);
            if (text) {
                documentContext += `\n\nDokument (${doc.fileName}):\n${text.substring(0, 1000)}...`;
            } else {
                 console.warn(`[AI Categorization] Failed to extract text from PDF: ${doc.fileName} (${doc.storageUrl})`);
            }
        }
        documentContext = documentContext.substring(0, 5000);
        console.log(`[AI Categorization] Combined document context length: ${documentContext.length}`);
    } else {
         console.log("[AI Categorization] No PDF documents provided for text extraction.");
    }
    const modelName = "gemini-1.5-flash";
    const apiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent`;
    const apiKey = getApiKeyFromEnvLocal(); if (!apiKey) return { success: false, message: "AI-Konfigurationsfehler.", data: null };
    const systemPrompt = `Du bist ein KI-Assistent, der medizinische Anfragen kategorisiert. Nutze AUSSCHLIESSLICH die folgenden Kategorien: ${PREDEFINED_CONSULTATION_CATEGORIES.join(", ")}. Analysiere das Thema, die Patientenfrage und ggf. den Dokumentenkontext. Gib eine Liste (JSON-Array von Strings) mit 1 bis 3 passenden Kategorien zurück. Wenn keine Kategorie passt, gib ein leeres Array zurück ([]). Sei präzise und halte dich strikt an die vorgegebenen Kategorien.`;
    const userMessage = `Thema: ${topic}\nFrage: ${patientQuestion}${documentContext ? `\nKontext aus Dokumenten:${documentContext}` : ''}\n\nBitte kategorisiere diese Anfrage.`;
    const requestBody = {
        contents: [
            { role: "user", parts: [{ text: systemPrompt }] },
            { role: "model", parts: [{ text: "Okay, ich analysiere die Anfrage und gebe passende Kategorien aus der Liste als JSON-Array zurück." }] },
            { role: "user", parts: [{ text: userMessage }] }
        ],
        generationConfig: { responseMimeType: "application/json" }
    };
    const headers = { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey, 'User-Agent': 'MurphApp/1.0 (Node.js fetch)' };
    try {
        const response = await fetch(apiEndpoint, { method: 'POST', headers: headers, body: JSON.stringify(requestBody) });
        if (!response.ok) {
            let errorText = '';
            try { errorText = await response.text(); } catch (_) {}
            console.error(`[AI Action - fetch Categorization] API Error: ${response.status}`, errorText);
            return { success: false, message: `Fehler bei der AI-Kategorisierung (${response.status}).`, data: null };
        }
        const data = await response.json();
        const aiResponseJsonString = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!aiResponseJsonString?.trim()) {
            console.warn("[AI Action - fetch Categorization] Received empty response string.");
            return { success: false, message: "Kategorisierung fehlgeschlagen (leere Antwort).", data: null };
        }
        try {
            const parsedCategories = JSON.parse(aiResponseJsonString);
            if (!Array.isArray(parsedCategories)) { throw new Error("Antwort ist kein valides JSON-Array."); }
            const validCategories = parsedCategories
                .filter((cat): cat is string => typeof cat === 'string' && (PREDEFINED_CONSULTATION_CATEGORIES as readonly string[]).includes(cat))
                .slice(0, 3);
            console.log(`[AI Action - fetch Categorization] Assigned categories: ${validCategories.join(', ')}`);
            return { success: true, message: "Kategorisierung erfolgreich.", data: { categories: validCategories } };
        } catch (parseError: any) {
            console.error("[AI Action - fetch Categorization] Error parsing JSON:", aiResponseJsonString, parseError);
            return { success: false, message: "Antwort der AI konnte nicht verarbeitet werden.", data: null };
        }
    } catch (error: any) {
        console.error("[AI Action - fetch Categorization] Network or processing error:", error);
        return { success: false, message: "Netzwerkfehler bei AI-Anfrage zur Kategorisierung.", data: null };
    }
}


// --- <<< Document Summarizer Action (IMPLEMENTED with DEBUG LOG) >>> ---
export async function getAIDocumentSummary(documentId: string): Promise<AIActionResult> {
   const session = await auth();
   // 1. Authorization: Allow Students and Admins
   if (!session?.user?.id || ![UserRole.STUDENT, UserRole.ADMIN].includes(session.user.role)) {
       return { success: false, message: "Nur autorisierte Benutzer können Dokumente zusammenfassen.", data: null };
   }
   const userId = session.user.id;
   const userRole = session.user.role;

   // Ensure AI Model is ready
   if (!geminiModel) {
       initializeGemini();
       if (!geminiModel) return { success: false, message: "AI-Modell ist nicht verfügbar.", data: null };
   }

   if (!documentId) {
       return { success: false, message: "Dokumenten-ID fehlt.", data: null };
   }

   // 2. Fetch Document and Verify Access
   let document;
   try {
       document = await prisma.document.findUnique({
           where: { id: documentId },
           select: {
               id: true,
               fileName: true,
               mimeType: true,
               storageUrl: true,
               consultationId: true,
               consultation: { // Fetch consultation details to verify access
                   select: {
                       patientId: true,
                       studentId: true,
                   }
               }
           }
       });
   } catch (dbError) {
       console.error(`[AI Doc Summary] Error fetching document ${documentId}:`, dbError);
       return { success: false, message: "Fehler beim Abrufen der Dokumentdaten.", data: null };
   }

   if (!document) {
       return { success: false, message: "Dokument nicht gefunden.", data: null };
   }

   // Verify user has access (must be assigned student or admin)
   const isStudent = document.consultation.studentId === userId;
   if (!isStudent && userRole !== UserRole.ADMIN) {
       return { success: false, message: "Zugriff auf die Zusammenfassung dieses Dokuments verweigert.", data: null };
   }

   // 3. Check Mime Type & Extract Text (currently only PDF)
   if (document.mimeType !== 'application/pdf') {
        return { success: false, message: `Zusammenfassung für Dateityp "${document.mimeType}" wird nicht unterstützt (nur PDF).`, data: null };
   }
   if (!document.storageUrl) {
        return { success: false, message: "Dokumenten-URL fehlt.", data: null };
   }

   const extractedText = await extractTextFromPdfUrl(document.storageUrl);

   // <<< TEMPORARY DEBUG LOGGING >>>
   console.log(`[AI Doc Summary - DEBUG] Document ${documentId}: Extracted text length: ${extractedText?.length ?? 'null'}`);
   if (extractedText) {
       console.log(`[AI Doc Summary - DEBUG] Document ${documentId}: Trimmed text length: ${extractedText.trim().length}`);
       // Log a small snippet to see if it's just whitespace
       console.log(`[AI Doc Summary - DEBUG] Document ${documentId}: Text snippet: "${extractedText.substring(0, 100).replace(/\s+/g, ' ')}"`);
   }
   // <<< END TEMPORARY DEBUG LOGGING >>>

   if (!extractedText || extractedText.trim().length < 50) { // Require minimum length for meaningful summary
       return { success: false, message: "Konnte nicht genügend Text aus dem Dokument extrahieren für eine Zusammenfassung.", data: null };
   }

   // 4. Call Gemini API for Summarization
   const modelName = "gemini-1.5-flash";
   const apiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent`;
   const apiKey = getApiKeyFromEnvLocal(); if (!apiKey) return { success: false, message: "AI-Konfigurationsfehler.", data: null };

   // Limit text sent to AI (adjust as needed based on token limits/cost)
   const MAX_INPUT_TEXT = 15000; // Example limit
   const textForAI = extractedText.substring(0, MAX_INPUT_TEXT);

   const prompt = `Du bist ein KI-Assistent für medizinisches Personal. Fasse den folgenden Text aus einem medizinischen Dokument (z.B. Befund, Arztbrief) prägnant und sachlich auf Deutsch zusammen (ca. 100-200 Wörter). Konzentriere dich auf die Kernaussagen, Diagnosen, wichtige Messwerte oder Empfehlungen. Gib keine eigene Bewertung ab.\n\nDokumententext:\n---\n${textForAI}\n---\n\nZusammenfassung:`;

   const requestBody = { contents: [{ parts: [{ text: prompt }] }] };
   const headers = { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey, 'User-Agent': 'MurphApp/1.0 (Node.js fetch)' };

   try {
       console.log(`[AI Doc Summary] Requesting summary for document ${document.id} (${document.fileName})...`);
       const response = await fetch(apiEndpoint, { method: 'POST', headers: headers, body: JSON.stringify(requestBody) });

       if (!response.ok) {
           let e = await response.text(); console.error(`[AI Doc Summary] API Error ${response.status}:`,e);
           return {success:false, message:`Fehler von AI-Service (${response.status})`, data: null}
       }
       const data = await response.json();
       const summary = data?.candidates?.[0]?.content?.parts?.[0]?.text;

       if (!summary?.trim()) {
           const r = data?.candidates?.[0]?.finishReason;
           console.warn(`[AI Doc Summary] Empty summary. Reason: ${r}`);
           const message = r === 'SAFETY' ? "Zusammenfassung wegen Sicherheitsrichtlinien blockiert." : "Zusammenfassung konnte nicht generiert werden.";
           return {success:false, message: message, data: null}
       }

       console.log(`[AI Doc Summary] Successfully generated summary for document ${document.id}.`);
       return { success: true, message: summary.trim(), data: null }; // Return summary in message field

   } catch (error: any) {
       console.error(`[AI Doc Summary] Network or processing error for document ${document.id}:`, error);
       return {success:false, message:"Netzwerkfehler bei AI-Anfrage.", data: null}
   }
}
// --- <<< End Document Summarizer Action >>> ---
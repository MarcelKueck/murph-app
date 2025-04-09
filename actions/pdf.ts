// actions/pdf.ts
'use server';

import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { PDFDocument, StandardFonts, rgb, PageSizes } from 'pdf-lib'; // Import pdf-lib components
import { ConsultationStatus } from '@prisma/client';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';

// Define the result type for the action
type GeneratePdfResult = {
    success: boolean;
    message: string; // Error or success message
    pdfData?: string; // Base64 encoded PDF data
    fileName?: string; // Suggested file name
};

export async function generateSummaryPdf(consultationId: string): Promise<GeneratePdfResult> {
    const session = await auth();

    // 1. Authentication & Authorization
    if (!session?.user?.id) {
        return { success: false, message: "Nicht autorisiert." };
    }
    const userId = session.user.id;

    // 2. Fetch Consultation Data (including summary and ensuring ownership/status)
    let consultation;
    try {
        consultation = await prisma.consultation.findUnique({
            where: {
                id: consultationId,
                patientId: userId, // Ensure the requesting user is the patient
            },
            select: {
                topic: true,
                summary: true,
                patientRating: true, // Needed to check if feedback was given
                status: true,
                updatedAt: true, // Use as completion date
                patient: { select: { patientProfile: { select: { firstName: true, lastName: true } } } },
                student: { select: { studentProfile: { select: { firstName: true, lastName: true } } } },
            }
        });
    } catch (dbError) {
        console.error(`Error fetching consultation for PDF generation (ID: ${consultationId}):`, dbError);
        return { success: false, message: "Fehler beim Abrufen der Beratungsdaten." };
    }

    if (!consultation) {
        return { success: false, message: "Beratung nicht gefunden oder Zugriff verweigert." };
    }

    // 3. Check Status and Feedback
    if (consultation.status !== ConsultationStatus.COMPLETED) {
         return { success: false, message: "Zusammenfassung nur für abgeschlossene Beratungen verfügbar." };
    }
    if (consultation.patientRating === null) {
        // This check ensures the feedback gate is enforced server-side
        return { success: false, message: "Bitte geben Sie zuerst Feedback, um die Zusammenfassung herunterzuladen." };
    }
    if (!consultation.summary) {
        return { success: false, message: "Für diese Beratung wurde keine Zusammenfassung vom Studenten hinterlegt." };
    }

    // 4. Generate PDF using pdf-lib
    try {
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage(PageSizes.A4); // Use A4 size
        const { width, height } = page.getSize();
        const margin = 50;
        const usableWidth = width - 2 * margin;

        // Register standard fonts
        const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const helveticaBoldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

        let y = height - margin; // Start drawing from the top margin

        // --- Title ---
        page.drawText(`Zusammenfassung: ${consultation.topic}`, {
            x: margin,
            y: y,
            font: helveticaBoldFont,
            size: 18,
            color: rgb(0.1, 0.1, 0.1), // Dark gray
        });
        y -= 30; // Move down

        // --- Metadata ---
        const patientName = consultation.patient?.patientProfile ? `${consultation.patient.patientProfile.firstName} ${consultation.patient.patientProfile.lastName}` : 'Unbekannt';
        const studentName = consultation.student?.studentProfile ? `${consultation.student.studentProfile.firstName} ${consultation.student.studentProfile.lastName}` : 'Unbekannt';
        const completionDate = format(new Date(consultation.updatedAt), 'dd. MMMM yyyy', { locale: de });

        page.drawText(`Für Patient/in: ${patientName}`, { x: margin, y: y, font: helveticaFont, size: 10, color: rgb(0.3, 0.3, 0.3) });
        y -= 15;
        page.drawText(`Erstellt am: ${completionDate} (durch Student/in: ${studentName})`, { x: margin, y: y, font: helveticaFont, size: 10, color: rgb(0.3, 0.3, 0.3) });
        y -= 25; // More space before summary

        // --- Summary Content (with basic wrapping) ---
        const summaryLines = wrapText(consultation.summary, usableWidth, helveticaFont, 12); // Wrap text
        summaryLines.forEach(line => {
            if (y < margin + 20) { // Check if new page is needed
                 page = pdfDoc.addPage(PageSizes.A4);
                 y = height - margin;
            }
            page.drawText(line, {
                x: margin,
                y: y,
                font: helveticaFont,
                size: 12,
                lineHeight: 15, // Adjust line height
                color: rgb(0, 0, 0), // Black
            });
             y -= 15; // Move down for next line
        });

        // --- Footer Disclaimer ---
         if (y < margin + 40) { page = pdfDoc.addPage(PageSizes.A4); y = height - margin; } // Check space for footer
         y = margin + 20; // Position footer near bottom
         const disclaimer = "Hinweis: Diese Zusammenfassung dient nur zur Information und ersetzt keine ärztliche Diagnose oder Behandlung. Quelle: murph-med.de";
         page.drawText(disclaimer, {
            x: margin,
            y: y,
            font: helveticaFont,
            size: 8,
            color: rgb(0.5, 0.5, 0.5), // Gray
            maxWidth: usableWidth
         });


        // 5. Serialize PDF to Base64
        const pdfBytes = await pdfDoc.save();
        const pdfBase64 = Buffer.from(pdfBytes).toString('base64'); // Use Buffer for conversion

        // 6. Prepare filename
        const safeTopic = consultation.topic.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        const fileName = `murph_zusammenfassung_${safeTopic}.pdf`;

        console.log(`Successfully generated PDF for consultation ${consultationId}`);
        return {
            success: true,
            message: "PDF erfolgreich generiert.",
            pdfData: pdfBase64,
            fileName: fileName,
        };

    } catch (pdfError) {
        console.error(`Error generating PDF for consultation ${consultationId}:`, pdfError);
        return { success: false, message: "Fehler beim Erstellen der PDF-Datei." };
    }
}


// --- Helper function for basic text wrapping (adjust as needed) ---
// This is a simple implementation; more complex logic might be needed for perfect wrapping
function wrapText(text: string, maxWidth: number, font: any, fontSize: number): string[] {
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = '';

    words.forEach(word => {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        const testWidth = font.widthOfTextAtSize(testLine, fontSize);
        if (testWidth <= maxWidth) {
            currentLine = testLine;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    });
    lines.push(currentLine); // Add the last line

    // Handle potential line breaks within the original text
    const finalLines: string[] = [];
    lines.forEach(line => {
        finalLines.push(...line.split('\n'));
    });

    return finalLines;
}
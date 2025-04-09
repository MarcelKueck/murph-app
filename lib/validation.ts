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
  path: ["university"], // Apply error message to university field for simplicity
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
    uploadId: string; // Temporary ID used during upload/form handling
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
    clinicalYear: z.coerce.number({required_error: "Klinisches Jahr ist erforderlich."}).int().positive().min(1).max(10), // Use coerce
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

// --- Feedback Schema (UPDATED) ---
export const SubmitFeedbackSchema = z.object({
    consultationId: z.string().cuid("Ungültige Beratungs-ID."),
    // Overall Rating (still required to trigger unlock)
    rating: z.coerce.number({required_error: "Gesamtbewertung ist erforderlich."}).int().min(1, "Bewertung muss zwischen 1 und 5 liegen.").max(5, "Bewertung muss zwischen 1 und 5 liegen."),
    // New Specific Ratings (also required)
    clarityRating: z.coerce.number({required_error: "Bewertung der Klarheit ist erforderlich."}).int().min(1, "Bewertung muss zwischen 1 und 5 liegen.").max(5, "Bewertung muss zwischen 1 und 5 liegen."),
    helpfulnessRating: z.coerce.number({required_error: "Bewertung der Hilfreichkeit ist erforderlich."}).int().min(1, "Bewertung muss zwischen 1 und 5 liegen.").max(5, "Bewertung muss zwischen 1 und 5 liegen."),
    communicationRating: z.coerce.number({required_error: "Bewertung der Kommunikation ist erforderlich."}).int().min(1, "Bewertung muss zwischen 1 und 5 liegen.").max(5, "Bewertung muss zwischen 1 und 5 liegen."),
    // Optional Text Feedback
    feedback: z.string().trim().max(1000, "Feedback darf maximal 1000 Zeichen lang sein.").optional(),
});

export type SubmitFeedbackFormData = z.infer<typeof SubmitFeedbackSchema>; // Export the type
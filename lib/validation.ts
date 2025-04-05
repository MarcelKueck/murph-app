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

// Base schema for common fields
const BaseProfileSchema = z.object({
    firstName: z.string().trim().min(1, { message: "Vorname ist erforderlich." }),
    lastName: z.string().trim().min(1, { message: "Nachname ist erforderlich." }),
    // imageUrl is handled separately or passed directly, not part of form data validation here usually
});

// Patient specific update schema
export const UpdatePatientProfileSchema = BaseProfileSchema.extend({
    dob: z.date({ invalid_type_error: "Ungültiges Datum." })
      .optional()
      .nullable(),
});
export type UpdatePatientProfileFormData = z.infer<typeof UpdatePatientProfileSchema>;

// Student specific update schema
export const UpdateStudentProfileSchema = BaseProfileSchema.extend({
    university: z.string().trim().min(1, { message: "Universität ist erforderlich."}),
    clinicalYear: z.coerce
        .number({ invalid_type_error: "Bitte geben Sie eine Zahl ein." })
        .int({ message: "Muss eine ganze Zahl sein." })
        .positive({ message: "Muss positiv sein." })
        .min(1, { message: "Muss mindestens 1 sein." })
        .max(10, { message: "Unrealistisches Studienjahr." }),
});
export type UpdateStudentProfileFormData = z.infer<typeof UpdateStudentProfileSchema>;
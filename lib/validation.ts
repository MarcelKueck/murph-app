// lib/validation.ts
import * as z from 'zod';
import { UserRole } from '@prisma/client';

// --- Shared Validation Logic ---

// Example: Basic password requirements (adjust complexity as needed)
const passwordValidation = z.string()
  .min(8, { message: "Passwort muss mindestens 8 Zeichen lang sein." })
  // Uncomment and adjust regex for stricter requirements if desired:
  // .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/, {
  //   message: "Muss Groß-/Kleinbuchstaben, Zahlen & Sonderzeichen enthalten."
  // });

// --- Login Schema ---
export const LoginSchema = z.object({
  email: z.string().email({ message: "Ungültige E-Mail-Adresse." }),
  // Basic presence check for login, complexity checked on registration
  password: z.string().min(1, { message: "Passwort ist erforderlich." }),
});

export type LoginFormData = z.infer<typeof LoginSchema>;


// --- Registration Schema ---
export const RegisterSchema = z.object({
  // Personal Info
  firstName: z.string().trim().min(1, { message: "Vorname ist erforderlich." }),
  lastName: z.string().trim().min(1, { message: "Nachname ist erforderlich." }),
  email: z.string().email({ message: "Ungültige E-Mail-Adresse." }),

  // Password
  password: passwordValidation,
  confirmPassword: z.string(), // Comparison handled by refine below

  // Role
  role: z.nativeEnum(UserRole, {
    errorMap: () => ({ message: "Bitte wählen Sie eine Rolle (Patient*in oder Student*in)." })
  }),

  // --- Role-specific fields ---
  // Patient
  dob: z.date({ invalid_type_error: "Ungültiges Datum." }) // Make date required or adjust validation if optional
    .optional() // Make DOB optional for registration V1
    .nullable(),

  // Student (Optional at object level, but required conditionally by refine)
  university: z.string().trim().optional(),
  clinicalYear: z.coerce // Use coerce for number conversion from string input
    .number({ invalid_type_error: "Bitte geben Sie eine Zahl für das Studienjahr ein." })
    .int({ message: "Studienjahr muss eine ganze Zahl sein." })
    .positive({ message: "Studienjahr muss eine positive Zahl sein." })
    .min(1, { message: "Studienjahr muss mindestens 1 sein." }) // Sensible min value
    .max(10, { message: "Unrealistisches Studienjahr." }) // Sensible max value
    .optional(),

})
// Refinement 1: Check if passwords match
.refine((data) => data.password === data.confirmPassword, {
  message: "Die Passwörter stimmen nicht überein.",
  path: ["confirmPassword"], // Show error on the confirmation field
})
// Refinement 2: Check if student fields are provided when role is STUDENT
.refine((data) => {
  if (data.role === UserRole.STUDENT) {
    // Both university and clinicalYear must be provided and valid
    return !!data.university && data.university.trim().length > 0 && data.clinicalYear !== undefined && data.clinicalYear !== null;
  }
  return true; // Pass if not a student
}, {
  message: "Universität und klinisches Studienjahr sind für Medizinstudenten erforderlich.",
  // Targeting a specific field might be less accurate here as both are required
  // If needed, could split into two refines or return a general error
  path: ["university"], // Or maybe role or a general path
})
// Refinement 3: Optional - Check if student fields are NOT provided if role is PATIENT
// This prevents submitting student data if the role is accidentally set wrong after filling fields
// .refine((data) => {
//   if (data.role === UserRole.PATIENT) {
//     return !data.university && !data.clinicalYear;
//   }
//   return true;
// }, {
//    message: "Patienten sollten keine Universitätsdaten angeben.",
//    path: ["role"], // Or university/clinicalYear if they should be cleared
// })
;

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
  // Note: Documents array is handled separately in the form state and server action,
  // not directly validated within this specific form schema submission.
});

export type ConsultationRequestFormData = z.infer<typeof ConsultationRequestSchema>;


// --- Type Definition for Uploaded Document Data ---
// Used client-side to track uploads before submitting the main form
export type UploadedDocument = {
    fileName: string;
    storageUrl: string; // The URL from Vercel Blob result
    mimeType: string;
    fileSize?: number;
    uploadId: string; // Temporary client-side ID for displaying and removing files in the UI
};
// lib/validation.ts
import * as z from 'zod';
import { UserRole } from '@prisma/client';

// Basic password requirements (example)
const passwordValidation = z.string()
  .min(8, { message: "Passwort muss mindestens 8 Zeichen lang sein." })
  // Add more rules if needed (e.g., uppercase, number, special character)
  // .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
  //   message: "Passwort muss Großbuchstaben, Zahlen und Sonderzeichen enthalten."
  // });

export const LoginSchema = z.object({
  email: z.string().email({ message: "Ungültige E-Mail-Adresse." }),
  password: z.string().min(1, { message: "Passwort ist erforderlich." }), // Basic check for login
});

export const RegisterSchema = z.object({
  firstName: z.string().min(1, { message: "Vorname ist erforderlich." }),
  lastName: z.string().min(1, { message: "Nachname ist erforderlich." }),
  email: z.string().email({ message: "Ungültige E-Mail-Adresse." }),
  password: passwordValidation,
  confirmPassword: z.string(), // We'll compare this with password later
  role: z.nativeEnum(UserRole, { errorMap: () => ({ message: "Bitte wählen Sie eine Rolle." }) }),
  // --- Role-specific fields ---
  // Patient
  dob: z.date().optional().nullable(), // Date of Birth (Optional for V1?)
  // Student
  university: z.string().optional(),
  clinicalYear: z.coerce // Use coerce for number conversion from string input
    .number({ invalid_type_error: "Bitte geben Sie eine Zahl ein." })
    .int({ message: "Muss eine ganze Zahl sein." })
    .positive({ message: "Muss positiv sein." })
    .optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwörter stimmen nicht überein.",
  path: ["confirmPassword"], // Error shown on confirm password field
})
.refine((data) => { // Ensure student fields are provided if role is STUDENT
  if (data.role === UserRole.STUDENT) {
    return !!data.university && !!data.clinicalYear;
  }
  return true;
}, {
  message: "Universität und Studienjahr sind für Studenten erforderlich.",
  // Apply the error generally or target specific fields if needed
  // path: ["university"], // Example path targeting
})
.refine((data) => { // Ensure university and year are *not* provided if role is PATIENT
  if (data.role === UserRole.PATIENT) {
    return !data.university && !data.clinicalYear;
  }
  return true;
}, {
   // This might be overly strict if fields are just hidden, adjust as needed
   message: "Patienten sollten keine Universitätsdaten angeben.",
   // path: ["university"], // Or just let hidden fields handle this
});

export type LoginFormData = z.infer<typeof LoginSchema>;
export type RegisterFormData = z.infer<typeof RegisterSchema>;
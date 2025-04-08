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
    [ConsultationStatus.REQUESTED]: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    [ConsultationStatus.ASSIGNED]: 'bg-blue-100 text-blue-800 border-blue-300',
    [ConsultationStatus.IN_PROGRESS]: 'bg-sky-100 text-sky-800 border-sky-300',
    [ConsultationStatus.COMPLETED]: 'bg-green-100 text-green-800 border-green-300',
    [ConsultationStatus.CANCELLED]: 'bg-red-100 text-red-800 border-red-300',
};

// <<< Centralized Consultation Categories >>>
export const PREDEFINED_CONSULTATION_CATEGORIES = [
    "Befundbesprechung",
    "Medikamente",
    "Symptomklärung",
    "Verfahren",
    "Prävention",
    "Verwaltung",
    "Allgemein",
] as const; // Use 'as const' for type safety if needed elsewhere

export type ConsultationCategory = typeof PREDEFINED_CONSULTATION_CATEGORIES[number];

// Add other constants as needed
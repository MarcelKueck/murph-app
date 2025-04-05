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
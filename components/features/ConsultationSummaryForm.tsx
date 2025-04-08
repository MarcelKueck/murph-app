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
import { getAIChatSummaryDraft, getAIClaritySafetyCheck } from '@/actions/ai'; // Import AI Actions
import { MessageData } from './ChatMessage'; // Keep this if chatHistory prop is kept
import { UserRole } from '@prisma/client';
import AICheckResultDisplay from './AICheckResultDisplay'; // Import Display Component

const SummarySchema = z.object({
  summary: z.string()
    .trim()
    .min(10, { message: "Zusammenfassung muss mindestens 10 Zeichen lang sein." })
    .max(2000, { message: "Zusammenfassung darf maximal 2000 Zeichen lang sein." }),
});
type SummaryFormData = z.infer<typeof SummarySchema>;

interface ConsultationSummaryFormProps {
  consultationId: string;
  initialSummary?: string | null;
  // Keep chatHistory prop for potential future use, but AI draft action doesn't rely on it being passed anymore
  chatHistory?: MessageData[];
}

export default function ConsultationSummaryForm({
    consultationId,
    initialSummary,
    chatHistory = [] // Default to empty array if not provided
}: ConsultationSummaryFormProps) {
    const router = useRouter();
    const [isCompleting, startCompleteTransition] = useTransition();
    const [isDrafting, startDraftTransition] = useTransition();
    const [isChecking, startCheckTransition] = useTransition();
    const [showSuccess, setShowSuccess] = useState(false);
    const [checkResult, setCheckResult] = useState<any | null>(null);
    const [checkError, setCheckError] = useState<string | null>(null);


    const form = useForm<SummaryFormData>({
        resolver: zodResolver(SummarySchema),
        defaultValues: {
            summary: initialSummary || '',
        },
    });

    // --- Handler for Drafting Summary ---
    const handleDraftSummary = () => {
       // AI action now fetches history/docs itself using consultationId
        startDraftTransition(async () => {
            try {
               const result = await getAIChatSummaryDraft(consultationId); // <<< Pass ID instead of history
                if (result.success) {
                    form.setValue('summary', result.message, { shouldValidate: true });
                    toast.success("Zusammenfassungsentwurf erstellt!", { description: "Bitte prüfen und bearbeiten Sie den Entwurf."});
                   // Clear previous check results when getting a new draft
                   setCheckResult(null);
                   setCheckError(null);
                } else {
                    toast.error("Fehler beim Entwurf", { description: result.message });
                }
            } catch (error) {
                console.error("Error drafting summary:", error);
                toast.error("Fehler beim Entwurf", { description: "Ein unerwarteter Fehler ist aufgetreten."});
            }
        });
    };

     // --- Handler for AI Check ---
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
    const onSubmit = (values: SummaryFormData) => {
        setShowSuccess(false);
        startCompleteTransition(async () => {
            const result: ConsultationActionResult = await completeConsultation(consultationId, values.summary);
            if (result.success) {
                setShowSuccess(true);
                setTimeout(() => {
                    toast.success("Beratung abgeschlossen!", { description: result.message });
                    router.push('/student/dashboard');
                }, 1200);
            } else {
                toast.error("Fehler beim Abschließen", { description: result.message || "Die Beratung konnte nicht abgeschlossen werden." });
                if (result.fieldErrors?.summary) {
                    form.setError("summary", { type: 'server', message: result.fieldErrors.summary.join(', ') });
                }
            }
        });
    };

    const isBusy = isCompleting || isDrafting || showSuccess || isChecking;

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
                 {/* Display Check Results */}
                 <AICheckResultDisplay result={checkResult} isLoading={isChecking} error={checkError} />

                {/* Buttons Row */}
                <div className="flex flex-col sm:flex-row gap-2 justify-between items-center pt-2">
                    {/* AI Helper Buttons (Left Aligned) */}
                     <div className="flex gap-2 w-full sm:w-auto">
                         <Button type="button" variant="outline" size="sm" onClick={handleDraftSummary} disabled={isBusy} title={"KI-Entwurf erstellen"}> {/* No longer needs chatHistory length check */}
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
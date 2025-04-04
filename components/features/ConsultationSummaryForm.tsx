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
    FormDescription,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from 'next/navigation';
import { completeConsultation, ConsultationActionResult } from '@/actions/consultations';
import AnimatedCheckmark from '@/components/ui/AnimatedCheckmark'; // Import the checkmark

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
}

export default function ConsultationSummaryForm({ consultationId, initialSummary }: ConsultationSummaryFormProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [showSuccess, setShowSuccess] = useState(false); // State for success animation

    const form = useForm<SummaryFormData>({
        resolver: zodResolver(SummarySchema),
        defaultValues: {
            summary: initialSummary || '',
        },
    });

    const onSubmit = (values: SummaryFormData) => {
        setShowSuccess(false); // Reset success state
        startTransition(async () => {
            const result: ConsultationActionResult = await completeConsultation(consultationId, values.summary);

             if (result.success) {
                 setShowSuccess(true); // Show checkmark
                 setTimeout(() => {
                    toast.success("Beratung abgeschlossen!", { description: result.message });
                    router.push('/student/dashboard');
                 }, 1200); // Delay redirect
            } else {
                toast.error("Fehler beim Abschließen", {
                    description: result.message || "Die Beratung konnte nicht abgeschlossen werden.",
                });
                 if (result.fieldErrors?.summary) {
                     form.setError("summary", { type: 'server', message: result.fieldErrors.summary.join(', ') });
                 }
            }
        });
    };

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
                                    placeholder="Fassen Sie hier die wesentlichen Punkte Ihrer Erklärung zusammen..."
                                    className="min-h-[100px] resize-y"
                                    {...field}
                                    disabled={isPending || showSuccess}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                 {/* --- Modify Submit Button --- */}
                <Button
                    type="submit"
                    className="w-full sm:w-auto"
                    disabled={isPending || showSuccess}
                    animateInteraction={!isPending && !showSuccess}
                >
                    {showSuccess ? (
                        <AnimatedCheckmark />
                    ) : isPending ? (
                         <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <CheckCircle className="mr-2 h-4 w-4" /> // Original Icon for idle state
                    )}
                    {!showSuccess && 'Zusammenfassung speichern & Beratung abschließen'}
                </Button>
                 {/* --- --- */}
            </form>
        </Form>
    );
}
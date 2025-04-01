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
import { completeConsultation, ConsultationActionResult } from '@/actions/consultations'; // Need to create this action

// Validation Schema for the summary
const SummarySchema = z.object({
  summary: z.string()
    .trim()
    .min(10, { message: "Zusammenfassung muss mindestens 10 Zeichen lang sein." })
    .max(2000, { message: "Zusammenfassung darf maximal 2000 Zeichen lang sein." }),
});
type SummaryFormData = z.infer<typeof SummarySchema>;

interface ConsultationSummaryFormProps {
  consultationId: string;
  initialSummary?: string | null; // Pre-fill if summary exists but wasn't completed
}

export default function ConsultationSummaryForm({ consultationId, initialSummary }: ConsultationSummaryFormProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const form = useForm<SummaryFormData>({
        resolver: zodResolver(SummarySchema),
        defaultValues: {
            summary: initialSummary || '',
        },
    });

    const onSubmit = (values: SummaryFormData) => {
        startTransition(async () => {
            // Call server action to save summary and complete consultation
            const result: ConsultationActionResult = await completeConsultation(consultationId, values.summary);

             if (result.success) {
                toast.success("Beratung abgeschlossen!", { description: result.message });
                // Redirect to dashboard after successful completion
                router.push('/student/dashboard');
                // Revalidation should happen in the server action
            } else {
                toast.error("Fehler beim Abschließen", {
                    description: result.message || "Die Beratung konnte nicht abgeschlossen werden.",
                });
                 // Handle field errors if returned (though unlikely for just a textarea)
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
                                    disabled={isPending}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full sm:w-auto" disabled={isPending}>
                    {isPending ? (
                         <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <CheckCircle className="mr-2 h-4 w-4" />
                    )}
                    Zusammenfassung speichern & Beratung abschließen
                </Button>
            </form>
        </Form>
    );
}
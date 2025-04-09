// app/feedback/page.tsx
'use client';

import React, { useState, useTransition, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
// Use new FormData type
import { SubmitFeedbackSchema, SubmitFeedbackFormData } from '@/lib/validation';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Star, Check, Smile, Brain, Handshake } from 'lucide-react'; // Import Check icon & others
import { toast } from 'sonner';
import { useRouter, useSearchParams } from 'next/navigation';
import { submitFeedback } from '@/actions/feedback';
import * as z from 'zod';
import AnimatedCheckmark from '@/components/ui/AnimatedCheckmark';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

// --- Star Rating Component (Extracted for Reusability) ---
interface StarRatingInputProps {
    field: any; // Field object from react-hook-form Controller
    label: string;
    icon?: React.ElementType;
    disabled?: boolean;
}

const StarRatingInput: React.FC<StarRatingInputProps> = ({ field, label, icon: Icon, disabled }) => {
    const [localRating, setLocalRating] = useState<number | null>(field.value ? parseInt(field.value) : null);

    // Sync local state if field value changes externally (e.g., form reset)
    useEffect(() => {
        setLocalRating(field.value ? parseInt(field.value) : null);
    }, [field.value]);

    const handleValueChange = (value: string) => {
        const numericValue = parseInt(value);
        field.onChange(numericValue); // Update form state
        setLocalRating(numericValue); // Update local state for immediate visual feedback
    };

    return (
        <FormItem className="space-y-3 border-t pt-6 first:border-t-0 first:pt-0">
            <FormLabel className='text-base flex items-center gap-2'>
                 {Icon && <Icon className="h-5 w-5 text-muted-foreground" />} {label}
             </FormLabel>
            <FormControl>
                <RadioGroup
                    onValueChange={handleValueChange}
                    value={localRating?.toString()} // Control the RadioGroup value via state synced with form
                    className="flex justify-center gap-2 sm:gap-4 pt-2"
                    disabled={disabled}
                >
                    {[1, 2, 3, 4, 5].map((ratingValue) => (
                         <FormItem key={ratingValue} className="flex flex-col items-center space-y-1 cursor-pointer">
                            <FormControl>
                                 <RadioGroupItem value={ratingValue.toString()} id={`${field.name}-${ratingValue}`} className="sr-only" />
                            </FormControl>
                             <FormLabel
                                 htmlFor={`${field.name}-${ratingValue}`}
                                 className={cn(
                                     "cursor-pointer rounded-full border-2 p-2 transition-colors hover:bg-accent hover:text-accent-foreground",
                                     localRating === ratingValue ? "border-primary bg-primary/10 text-primary" : "border-muted text-muted-foreground"
                                 )}
                             >
                                <Star className={cn("w-6 h-6", localRating !== null && ratingValue <= localRating ? 'fill-yellow-400 text-yellow-500' : 'fill-muted stroke-muted-foreground/50')}/>
                            </FormLabel>
                             {/* Optional: Add text labels below stars */}
                             <span className='text-xs text-muted-foreground'>{ratingValue}</span>
                         </FormItem>
                    ))}
                </RadioGroup>
            </FormControl>
             <FormDescription className='text-center text-xs pt-1'>
                (1 = Sehr unzufrieden, 5 = Sehr zufrieden)
            </FormDescription>
            <FormMessage className="text-center pt-2" /> {/* Ensure FormMessage is here */}
        </FormItem>
    );
};
// --- End Star Rating Component ---

export default function FeedbackPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const consultationId = searchParams.get('consultationId');

    const [isPending, startTransition] = useTransition();
    const [showSuccess, setShowSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const form = useForm<SubmitFeedbackFormData>({ // Use new FormData type
        resolver: zodResolver(SubmitFeedbackSchema),
        defaultValues: {
            consultationId: consultationId || '',
            rating: undefined, // Overall
            clarityRating: undefined, // Add default
            helpfulnessRating: undefined, // Add default
            communicationRating: undefined, // Add default
            feedback: '', // Optional text
        },
    });

    useEffect(() => {
        if (!consultationId) {
            setError("Ungültiger oder fehlender Link zur Feedback-Seite.");
            toast.error("Fehler", { description: "Der Link zum Feedback ist ungültig oder fehlt." });
        } else {
            form.setValue('consultationId', consultationId);
        }
    }, [consultationId, form]);

     const onSubmit = (values: SubmitFeedbackFormData) => { // Use new FormData type
         setError(null);
         setShowSuccess(false);
         startTransition(async () => {
            const result = await submitFeedback(values); // Action needs update
            if (result.success) {
                setShowSuccess(true);
                toast.success("Feedback gesendet!", { description: "Vielen Dank! Ihre Zusammenfassung ist nun freigeschaltet." });
                setTimeout(() => {
                    // Redirect back to the consultation detail page
                    router.push(`/patient/beratungen/${values.consultationId}`);
                    // Revalidation should happen via the action
                }, 1500);
            } else {
                setError(result.message || "Feedback konnte nicht gesendet werden.");
                toast.error("Fehler", { description: result.message || "Feedback konnte nicht gesendet werden." });
                 if (result.fieldErrors) {
                     Object.entries(result.fieldErrors).forEach(([field, errors]) => {
                         if (errors) {
                             form.setError(field as keyof SubmitFeedbackFormData, { type: 'server', message: errors.join(', ') });
                         }
                     });
                 }
            }
        });
    };

     const isFormDisabled = isPending || showSuccess || !consultationId || !!error;

    return (
        <div className="container mx-auto max-w-xl py-12">
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Feedback zur Beratung</CardTitle>
                    <CardDescription>
                        Vielen Dank, dass Sie sich die Zeit nehmen! Ihr Feedback hilft uns und den Studenten sehr.
                        <br />Nach dem Absenden wird Ihre Zusammenfassung freigeschaltet.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                     {error && (
                        <div className="mb-6 text-sm text-destructive bg-destructive/10 p-3 rounded-md border border-destructive/20">{error}</div>
                     )}
                      {showSuccess ? (
                            <div className="text-center p-8">
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                                    <Check className="w-10 h-10 text-green-600" />
                                </motion.div>
                                <h3 className="text-xl font-semibold mb-2">Vielen Dank!</h3>
                                <p className="text-muted-foreground">Ihr Feedback wurde übermittelt.</p>
                                <p className="text-muted-foreground text-sm mt-1">Sie werden weitergeleitet...</p>
                            </div>
                        ) : (
                         <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8"> {/* Increased spacing */}
                                <input type="hidden" {...form.register('consultationId')} />

                                {/* --- Use StarRatingInput for all ratings --- */}
                                <FormField
                                    control={form.control}
                                    name="rating"
                                    render={({ field }) => (
                                        <StarRatingInput
                                            field={field}
                                            label="Gesamtzufriedenheit mit der Erklärung"
                                            icon={Star} // Overall rating icon
                                            disabled={isFormDisabled}
                                        />
                                    )}
                                />
                                 <FormField
                                    control={form.control}
                                    name="clarityRating"
                                    render={({ field }) => (
                                        <StarRatingInput
                                            field={field}
                                            label="Verständlichkeit / Klarheit der Erklärung"
                                            icon={Brain} // Clarity icon
                                            disabled={isFormDisabled}
                                        />
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="helpfulnessRating"
                                    render={({ field }) => (
                                        <StarRatingInput
                                            field={field}
                                            label="Hilfreichkeit bei der Beantwortung Ihrer Frage"
                                            icon={Handshake} // Helpfulness icon
                                            disabled={isFormDisabled}
                                        />
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="communicationRating"
                                    render={({ field }) => (
                                        <StarRatingInput
                                            field={field}
                                            label="Kommunikation des Medizinstudenten"
                                            icon={Smile} // Communication icon
                                            disabled={isFormDisabled}
                                        />
                                    )}
                                />
                                {/* --- End StarRatingInput usage --- */}

                                 <FormField
                                    control={form.control}
                                    name="feedback" // Optional text feedback
                                    render={({ field }) => (
                                        <FormItem className="border-t pt-6">
                                            <FormLabel>Zusätzliche Anmerkungen (Optional)</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                     placeholder="Haben Sie weiteres Lob, Kritik oder Verbesserungsvorschläge?"
                                                     className="min-h-[100px] resize-y"
                                                     {...field}
                                                     disabled={isFormDisabled}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                 <Button type="submit" className="w-full" disabled={isFormDisabled} animateInteraction={!isFormDisabled}>
                                    {isPending ? ( <Loader2 className="mr-2 h-4 w-4 animate-spin" /> ) : null}
                                    Feedback senden & Zusammenfassung freischalten
                                </Button>
                            </form>
                        </Form>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
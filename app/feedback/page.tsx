// app/feedback/page.tsx
'use client';

import React, { useState, useTransition, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitFeedbackSchema } from '@/lib/validation';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Star, Check } from 'lucide-react'; // <<< Import Check icon
import { toast } from 'sonner';
import { useRouter, useSearchParams } from 'next/navigation';
import { submitFeedback } from '@/actions/feedback';
import * as z from 'zod';
import AnimatedCheckmark from '@/components/ui/AnimatedCheckmark';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion'; // <<< Import motion

type FormData = z.infer<typeof SubmitFeedbackSchema>;

export default function FeedbackPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const consultationId = searchParams.get('consultationId');

    const [isPending, startTransition] = useTransition();
    const [showSuccess, setShowSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedRating, setSelectedRating] = useState<number | null>(null);

    const form = useForm<FormData>({
        resolver: zodResolver(SubmitFeedbackSchema),
        defaultValues: {
            consultationId: consultationId || '',
            rating: undefined,
            feedback: '',
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

     const onSubmit = (values: FormData) => {
         setError(null);
         setShowSuccess(false);
         startTransition(async () => {
            const result = await submitFeedback(values);
            if (result.success) {
                setShowSuccess(true);
                toast.success("Feedback gesendet!", { description: result.message });
                setTimeout(() => {
                    router.push('/patient/dashboard'); // Redirect to dashboard after success
                }, 1500);
            } else {
                setError(result.message || "Feedback konnte nicht gesendet werden.");
                toast.error("Fehler", { description: result.message || "Feedback konnte nicht gesendet werden." });
                 if (result.fieldErrors) {
                     Object.entries(result.fieldErrors).forEach(([field, errors]) => {
                         if (errors) {
                             form.setError(field as keyof FormData, { type: 'server', message: errors.join(', ') });
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
                    <CardDescription>Wie zufrieden waren Sie mit der Erklärung?</CardDescription>
                </CardHeader>
                <CardContent>
                     {error && (
                        <div className="mb-6 text-sm text-destructive bg-destructive/10 p-3 rounded-md border border-destructive/20">{error}</div>
                     )}
                      {showSuccess ? (
                            <div className="text-center p-8">
                                {/* <<< motion.div is now defined >>> */}
                                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                                    <Check className="w-10 h-10 text-green-600" />
                                </motion.div>
                                <h3 className="text-xl font-semibold mb-2">Vielen Dank!</h3>
                                <p className="text-muted-foreground">Ihr Feedback hilft uns, Murph zu verbessern.</p>
                                <p className="text-muted-foreground text-sm mt-1">Sie werden weitergeleitet...</p>
                            </div>
                        ) : (
                         <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <input type="hidden" {...form.register('consultationId')} />
                                <FormField
                                    control={form.control}
                                    name="rating"
                                    render={({ field }) => (
                                        <FormItem className="space-y-3">
                                            <FormLabel className='text-base'>Bewertung (1 = Sehr unzufrieden, 5 = Sehr zufrieden)</FormLabel>
                                             <FormControl>
                                                <RadioGroup
                                                    onValueChange={(value) => { field.onChange(parseInt(value)); setSelectedRating(parseInt(value)); }}
                                                    value={field.value?.toString()} // <<< Use value instead of defaultValue with Controller
                                                    className="flex justify-center gap-2 sm:gap-4 pt-2"
                                                    disabled={isFormDisabled}
                                                >
                                                    {[1, 2, 3, 4, 5].map((ratingValue) => (
                                                         <FormItem key={ratingValue} className="flex flex-col items-center space-y-1 cursor-pointer">
                                                            <FormControl>
                                                                 <RadioGroupItem value={ratingValue.toString()} id={`rating-${ratingValue}`} className="sr-only" />
                                                            </FormControl>
                                                             <FormLabel
                                                                 htmlFor={`rating-${ratingValue}`}
                                                                 className={cn( "cursor-pointer rounded-full border-2 p-2 transition-colors hover:bg-accent hover:text-accent-foreground", selectedRating === ratingValue ? "border-primary bg-primary/10 text-primary" : "border-muted text-muted-foreground" )}
                                                             >
                                                                <Star className={cn("w-6 h-6", selectedRating !== null && ratingValue <= selectedRating ? 'fill-yellow-400 text-yellow-500' : 'fill-muted stroke-muted-foreground/50')}/>
                                                            </FormLabel>
                                                         </FormItem>
                                                    ))}
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage className="text-center pt-2" />
                                        </FormItem>
                                    )}
                                />
                                 <FormField
                                    control={form.control}
                                    name="feedback"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Zusätzliches Feedback (Optional)</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Haben Sie weitere Anmerkungen oder Verbesserungsvorschläge?" className="min-h-[100px] resize-y" {...field} disabled={isFormDisabled} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                 <Button type="submit" className="w-full" disabled={isFormDisabled} animateInteraction={!isFormDisabled}>
                                    {isPending ? ( <Loader2 className="mr-2 h-4 w-4 animate-spin" /> ) : null}
                                    Feedback senden
                                </Button>
                            </form>
                        </Form>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
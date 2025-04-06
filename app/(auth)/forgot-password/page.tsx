// app/(auth)/forgot-password/page.tsx
'use client';

import React, { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RequestPasswordResetSchema } from '@/lib/validation'; // Import specific schema
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';
import { requestPasswordReset } from '@/actions/password-reset'; // Import the action
import * as z from 'zod';

type FormData = z.infer<typeof RequestPasswordResetSchema>;

export default function ForgotPasswordPage() {
    const [isPending, startTransition] = useTransition();
    const [message, setMessage] = useState<string | null>(null); // To display success/info message

    const form = useForm<FormData>({
        resolver: zodResolver(RequestPasswordResetSchema),
        defaultValues: { email: '' },
    });

    const onSubmit = (values: FormData) => {
        setMessage(null); // Clear previous message
        startTransition(async () => {
            const result = await requestPasswordReset(values);
            if (result.success) {
                 setMessage(result.message); // Display the success message
                 form.reset(); // Clear the form
                 toast.success("Anfrage gesendet", { description: result.message });
             } else {
                 toast.error("Fehler", { description: result.message || "Anfrage fehlgeschlagen." });
            }
        });
    };

    return (
        <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center">
            <Card className="w-full max-w-md mx-auto">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Passwort vergessen?</CardTitle>
                    <CardDescription>Geben Sie Ihre E-Mail-Adresse ein. Wir senden Ihnen einen Link zum Zurücksetzen Ihres Passworts.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                             <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>E-Mail</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="name@beispiel.de" {...field} disabled={isPending} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                             {message && (
                                <div className="text-sm text-green-600 bg-green-50 p-3 rounded-md border border-green-200">{message}</div>
                             )}

                             <Button type="submit" className="w-full" disabled={isPending}>
                                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Link anfordern
                            </Button>

                             <div className="text-center text-sm">
                                <Link href="/login" className="font-medium text-primary hover:underline">
                                    Zurück zum Login
                                </Link>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
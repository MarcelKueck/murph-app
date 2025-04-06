// app/(auth)/reset-password/page.tsx
'use client';

import React, { useState, useTransition, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ResetPasswordSchema } from '@/lib/validation'; // Import specific schema
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation'; // Import search params hook
import { resetPassword } from '@/actions/password-reset'; // Import the action
import * as z from 'zod';
import AnimatedCheckmark from '@/components/ui/AnimatedCheckmark';

type FormData = z.infer<typeof ResetPasswordSchema>;

export default function ResetPasswordPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token'); // Get token from URL query param

    const [isPending, startTransition] = useTransition();
    const [showSuccess, setShowSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null); // State for token validation errors

    const form = useForm<FormData>({
        resolver: zodResolver(ResetPasswordSchema),
        defaultValues: {
            token: token || '', // Pre-fill token from URL
            password: '',
            confirmPassword: '',
        },
    });

    // Effect to handle invalid/missing token on load
    useEffect(() => {
        if (!token) {
            setError("Ungültiger oder fehlender Link zum Zurücksetzen des Passworts.");
            toast.error("Fehler", { description: "Der Link zum Zurücksetzen ist ungültig oder fehlt." });
        }
    }, [token]);

    const onSubmit = (values: FormData) => {
        setError(null); // Clear previous errors
        setShowSuccess(false);
        startTransition(async () => {
            const result = await resetPassword(values);
            if (result.success) {
                setShowSuccess(true);
                toast.success("Passwort zurückgesetzt!", { description: result.message });
                setTimeout(() => {
                    router.push('/login'); // Redirect to login after success
                }, 1500);
             } else {
                 toast.error("Fehler", { description: result.message || "Passwort konnte nicht zurückgesetzt werden." });
                 // Optionally set specific field errors if returned
                 if (result.fieldErrors?.token) {
                     setError(result.fieldErrors.token.join(', ')); // Show token error separately
                 }
                 if (result.fieldErrors?.password) {
                     form.setError('password', { type: 'server', message: result.fieldErrors.password.join(', ') });
                 }
                 if (result.fieldErrors?.confirmPassword) {
                     form.setError('confirmPassword', { type: 'server', message: result.fieldErrors.confirmPassword.join(', ') });
                 }
            }
        });
    };

    // Disable form if token is invalid/missing
    const isFormDisabled = isPending || showSuccess || !token || !!error;

    return (
        <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center">
            <Card className="w-full max-w-md mx-auto">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Neues Passwort festlegen</CardTitle>
                    <CardDescription>Geben Sie Ihr neues Passwort ein.</CardDescription>
                </CardHeader>
                <CardContent>
                    {error && ( // Display token error prominently
                        <div className="mb-4 text-sm text-destructive bg-destructive/10 p-3 rounded-md border border-destructive/20">{error}</div>
                    )}
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            {/* Hidden field for token (already pre-filled) */}
                            <input type="hidden" {...form.register('token')} />

                             <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Neues Passwort</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="********" {...field} disabled={isFormDisabled} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Neues Passwort bestätigen</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="********" {...field} disabled={isFormDisabled} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                             <Button type="submit" className="w-full" disabled={isFormDisabled} animateInteraction={!isFormDisabled}>
                                {showSuccess ? (
                                    <AnimatedCheckmark />
                                ) : isPending ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : null}
                                {!showSuccess && 'Passwort speichern'}
                            </Button>

                            {showSuccess && (
                                 <div className="text-center text-sm text-green-600">
                                     Passwort erfolgreich geändert. Sie werden weitergeleitet...
                                 </div>
                             )}

                             {!showSuccess && (
                                <div className="text-center text-sm">
                                    <Link href="/login" className="font-medium text-primary hover:underline">
                                        Zurück zum Login
                                    </Link>
                                </div>
                             )}
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
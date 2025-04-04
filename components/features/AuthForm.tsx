// components/features/AuthForm.tsx
'use client';

import React, { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { LoginSchema, RegisterSchema } from '@/lib/validation';
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
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { de } from 'date-fns/locale';
import Link from 'next/link';
import { toast } from "sonner";
import { registerUser, RegistrationResult } from '@/actions/auth';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { UserRole } from '@prisma/client';
import AnimatedCheckmark from '@/components/ui/AnimatedCheckmark';

interface AuthFormProps {
    mode: 'login' | 'register';
}

type FormData = z.infer<typeof LoginSchema> | z.infer<typeof RegisterSchema>;

export default function AuthForm({ mode }: AuthFormProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    // We still read callbackUrl, as it's needed if user was redirected *to* login
    const callbackUrl = searchParams.get('callbackUrl') || '/';

    const [isPending, startTransition] = useTransition();
    const [showSuccess, setShowSuccess] = useState(false);
    const [showStudentFields, setShowStudentFields] = useState(false);

    const currentSchema = mode === 'login' ? LoginSchema : RegisterSchema;

    const form = useForm<FormData>({
        resolver: zodResolver(currentSchema),
        defaultValues: mode === 'login'
            ? { email: '', password: '' }
            : {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: '',
                role: undefined,
                dob: undefined,
                university: '',
                clinicalYear: undefined,
            },
    });

    const selectedRole = form.watch('role');

    React.useEffect(() => {
        if (mode === 'register') {
            setShowStudentFields(selectedRole === UserRole.STUDENT);
        }
    }, [selectedRole, mode, form]);

    const onSubmit = (values: FormData) => {
        setShowSuccess(false);
        startTransition(async () => {
            if (mode === 'login') {
                try {
                    const result = await signIn('credentials', {
                        redirect: false, // Keep this false
                        email: (values as z.infer<typeof LoginSchema>).email,
                        password: (values as z.infer<typeof LoginSchema>).password,
                        // No explicit callbackUrl needed here for signIn itself
                    });

                    if (result?.error) {
                        toast.error("Anmeldung fehlgeschlagen", {
                            description: "Ungültige E-Mail oder Passwort.",
                        });
                    } else if (result?.ok) {
                        setShowSuccess(true); // Show checkmark
                        toast.success("Anmeldung erfolgreich!"); // Show toast immediately

                        // --- CHANGE HERE: Refresh instead of push ---
                        // Let middleware handle redirect on refresh based on new session
                        router.refresh();
                        // No need for setTimeout delay anymore, refresh will trigger navigation

                    } else {
                         toast.error("Anmeldung fehlgeschlagen", {
                            description: "Ein unbekannter Fehler ist aufgetreten.",
                        });
                    }
                } catch (error) {
                    console.error("Login Signin Error:", error);
                    toast.error("Anmeldung fehlgeschlagen", {
                         description: "Ein Netzwerk- oder Serverfehler ist aufgetreten.",
                    });
                }

            } else { // Registration logic remains the same
                const result: RegistrationResult = await registerUser(values as z.infer<typeof RegisterSchema>);

                if (result.success) {
                    setShowSuccess(true);
                     setTimeout(() => {
                        toast.success("Registrierung erfolgreich!", {
                            description: result.message,
                        });
                        router.push('/login');
                     }, 1200);
                } else {
                    toast.error("Registrierung fehlgeschlagen", {
                        description: result.message || "Bitte überprüfen Sie Ihre Eingaben.",
                    });
                    if (result.fieldErrors) {
                        Object.entries(result.fieldErrors).forEach(([field, errors]) => {
                             if (errors) {
                                form.setError(field as keyof FormData, {
                                    type: 'server',
                                    message: errors.join(', '),
                                });
                            }
                        });
                    }
                }
            }
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* ... rest of the form fields ... */}
                 {mode === 'register' && (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Vorname</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Max" {...field} disabled={isPending || showSuccess} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nachname</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Mustermann" {...field} disabled={isPending || showSuccess} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                             control={form.control}
                             name="role"
                             render={({ field }) => (
                                <FormItem className="space-y-3">
                                <FormLabel>Ich bin...</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4"
                                    disabled={isPending || showSuccess}
                                    >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value={UserRole.PATIENT} />
                                        </FormControl>
                                        <FormLabel className="font-normal">Patient*in</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value={UserRole.STUDENT} />
                                        </FormControl>
                                        <FormLabel className="font-normal">Medizinstudent*in</FormLabel>
                                    </FormItem>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />

                        {/* Conditional Patient Field: Date of Birth */}
                        {selectedRole === UserRole.PATIENT && (
                             <FormField
                                control={form.control}
                                name="dob"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                    <FormLabel>Geburtsdatum (Optional)</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                type="button"
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[240px] pl-3 text-left font-normal",
                                                    !field.value && "text-muted-foreground"
                                                )}
                                                disabled={isPending || showSuccess}
                                                >
                                                {field.value ? (
                                                    format(field.value, "PPP", { locale: de })
                                                ) : (
                                                    <span>Wähle ein Datum</span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value ?? undefined}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date > new Date() || date < new Date("1900-01-01") || isPending || showSuccess
                                            }
                                            initialFocus
                                            captionLayout="dropdown-buttons"
                                            fromYear={1920}
                                            toYear={new Date().getFullYear()}
                                            locale={de}
                                        />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}

                         {/* Conditional Student Fields */}
                        {showStudentFields && (
                            <>
                                <FormField
                                    control={form.control}
                                    name="university"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Universität</FormLabel>
                                            <FormControl>
                                                <Input placeholder="z.B. LMU München" {...field} disabled={isPending || showSuccess} />
                                            </FormControl>
                                             <FormDescription>Bitte geben Sie den offiziellen Namen Ihrer Universität an.</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="clinicalYear"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Klinisches Semester / Studienjahr</FormLabel>
                                            <FormControl>
                                                <Input type="number" placeholder="z.B. 3" {...field} onChange={event => field.onChange(+event.target.value)} disabled={isPending || showSuccess} />
                                            </FormControl>
                                             <FormDescription>In welchem klinischen Jahr/Semester sind Sie?</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}
                    </>
                )}

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>E-Mail</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="name@beispiel.de" {...field} disabled={isPending || showSuccess} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Passwort</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="********" {...field} disabled={isPending || showSuccess} />
                            </FormControl>
                             {mode === 'register' && <FormDescription>Mindestens 8 Zeichen.</FormDescription>}
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {mode === 'register' && (
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Passwort bestätigen</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="********" {...field} disabled={isPending || showSuccess} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}

                 {mode === 'login' && (
                    <div className="text-right">
                        <Button type="button" variant="link" size="sm" asChild className="font-normal px-0">
                           <Link href="#">Passwort vergessen?</Link>
                        </Button>
                    </div>
                )}

                <Button
                    type="submit"
                    className="w-full"
                    disabled={isPending || showSuccess}
                    animateInteraction={!isPending && !showSuccess}
                >
                    {showSuccess ? (
                        <AnimatedCheckmark />
                    ) : isPending ? (
                         <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : null}
                    {!showSuccess && (mode === 'login' ? 'Anmelden' : 'Registrieren')}
                </Button>

                 <div className="text-center text-sm text-muted-foreground">
                    {mode === 'login' ? (
                        <>
                            Noch kein Konto?{' '}
                            <Link href="/registrieren" className="font-medium text-primary hover:underline">
                                Jetzt registrieren
                            </Link>
                        </>
                    ) : (
                         <>
                           Bereits registriert?{' '}
                            <Link href="/login" className="font-medium text-primary hover:underline">
                                Hier anmelden
                            </Link>
                        </>
                    )}
                </div>
                 {mode === 'register' && (
                     <p className="text-xs text-center text-muted-foreground pt-4">
                        Mit der Registrierung stimmen Sie unseren{' '}
                        <Link href="/agb" className="underline hover:text-primary">AGB</Link> und{' '}
                        <Link href="/datenschutz" className="underline hover:text-primary">Datenschutzbestimmungen</Link> zu.
                    </p>
                 )}
            </form>
        </Form>
    );
}
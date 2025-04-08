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
import { Calendar as CalendarIcon, Loader2, Eye, EyeOff } from "lucide-react"; // <<< Import Eye icons
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
    const callbackUrl = searchParams.get('callbackUrl') || '/';

    const [isPending, startTransition] = useTransition();
    const [showSuccess, setShowSuccess] = useState(false);
    const [showStudentFields, setShowStudentFields] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // <<< State for password visibility
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // <<< State for confirm password visibility

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
                        redirect: false,
                        email: (values as z.infer<typeof LoginSchema>).email,
                        password: (values as z.infer<typeof LoginSchema>).password,
                    });

                    if (result?.error) {
                        toast.error("Anmeldung fehlgeschlagen", { description: "Ungültige E-Mail oder Passwort." });
                    } else if (result?.ok) {
                        setShowSuccess(true);
                        toast.success("Anmeldung erfolgreich!");
                        router.refresh(); // Let middleware handle redirect
                    } else {
                         toast.error("Anmeldung fehlgeschlagen", { description: "Ein unbekannter Fehler ist aufgetreten." });
                    }
                } catch (error) {
                    console.error("Login Signin Error:", error);
                    toast.error("Anmeldung fehlgeschlagen", { description: "Ein Netzwerk- oder Serverfehler ist aufgetreten." });
                }

            } else { // Registration logic
                const result: RegistrationResult = await registerUser(values as z.infer<typeof RegisterSchema>);

                if (result.success) {
                    setShowSuccess(true);
                     setTimeout(() => {
                        toast.success("Registrierung erfolgreich!", { description: result.message });
                        router.push('/login');
                     }, 1200);
                } else {
                     toast.error("Registrierung fehlgeschlagen", { description: result.message || "Bitte überprüfen Sie Ihre Eingaben." });
                     if (result.fieldErrors) { Object.entries(result.fieldErrors).forEach(([field, errors]) => { if (errors) { form.setError(field as keyof FormData, { type: 'server', message: errors.join(', '), }); } }); }
                }
            }
        });
    };

    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {mode === 'register' && (
                    <>
                        {/* First Name */}
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
                        {/* Last Name */}
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

                        {/* Role Selection */}
                        <FormField
                             control={form.control}
                             name="role"
                             render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel>Ich bin...</FormLabel>
                                    {/* RadioGroup should not be inside FormControl */}
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4"
                                        disabled={isPending || showSuccess}
                                        // Accessibility attributes applied by FormControl to RadioGroupItem
                                    >
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value={UserRole.PATIENT} id="role-patient"/>
                                            </FormControl>
                                            <FormLabel htmlFor="role-patient" className="font-normal cursor-pointer">Patient*in</FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value={UserRole.STUDENT} id="role-student"/>
                                            </FormControl>
                                            <FormLabel htmlFor="role-student" className="font-normal cursor-pointer">Medizinstudent*in</FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Date of Birth (Patient) */}
                        {selectedRole === UserRole.PATIENT && (
                             <FormField
                                control={form.control}
                                name="dob"
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Geburtsdatum (Optional)</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                {/* FormControl wraps the trigger Button */}
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
                                                        {field.value ? ( format(field.value, "PPP", { locale: de }) ) : ( <span>Wähle ein Datum</span> )}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={field.value ?? undefined}
                                                    onSelect={field.onChange}
                                                    disabled={(date) => date > new Date() || date < new Date("1900-01-01") || isPending || showSuccess }
                                                    initialFocus captionLayout="dropdown-buttons" fromYear={1920} toYear={new Date().getFullYear()} locale={de}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}

                        {/* University (Student) */}
                        {showStudentFields && (
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
                        )}
                        {/* Clinical Year (Student) */}
                        {showStudentFields && (
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
                        )}
                    </> // End Register-specific fields
                )}

                {/* Email */}
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
                {/* Password */}
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Passwort</FormLabel>
                            <div className="relative">
                                <FormControl>
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="********"
                                        {...field}
                                        disabled={isPending || showSuccess}
                                        className="pr-10" // Add padding for the icon button
                                    />
                                </FormControl>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                    onClick={togglePasswordVisibility}
                                    disabled={isPending || showSuccess}
                                    tabIndex={-1} // Prevent tabbing to the button
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    <span className="sr-only">{showPassword ? 'Passwort verbergen' : 'Passwort anzeigen'}</span>
                                </Button>
                            </div>
                            {mode === 'register' && <FormDescription>Mindestens 8 Zeichen.</FormDescription>}
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {/* Confirm Password (Register) */}
                {mode === 'register' && (
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Passwort bestätigen</FormLabel>
                                <div className="relative">
                                    <FormControl>
                                        <Input
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder="********"
                                            {...field}
                                            disabled={isPending || showSuccess}
                                            className="pr-10"
                                        />
                                    </FormControl>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                        onClick={toggleConfirmPasswordVisibility}
                                        disabled={isPending || showSuccess}
                                        tabIndex={-1}
                                    >
                                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        <span className="sr-only">{showConfirmPassword ? 'Passwort verbergen' : 'Passwort anzeigen'}</span>
                                    </Button>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}

                {/* Forgot Password Link (Login) */}
                {mode === 'login' && (
                    <div className="text-right">
                        <Button type="button" variant="link" size="sm" asChild className="font-normal px-0 h-auto py-0 text-xs">
                           <Link href="/forgot-password">Passwort vergessen?</Link>
                        </Button>
                    </div>
                )}

                {/* Submit Button */}
                <Button type="submit" className="w-full" disabled={isPending || showSuccess} animateInteraction={!isPending && !showSuccess}>
                    {showSuccess ? ( <AnimatedCheckmark /> ) : isPending ? ( <Loader2 className="mr-2 h-4 w-4 animate-spin" /> ) : null}
                    {!showSuccess && (mode === 'login' ? 'Anmelden' : 'Registrieren')}
                </Button>

                {/* Switch Mode Links */}
                <div className="text-center text-sm text-muted-foreground">
                    {mode === 'login' ? (
                        <> Noch kein Konto?{' '} <Link href="/registrieren" className="font-medium text-primary hover:underline"> Jetzt registrieren </Link> </>
                    ) : (
                        <> Bereits registriert?{' '} <Link href="/login" className="font-medium text-primary hover:underline"> Hier anmelden </Link> </>
                    )}
                </div>
                {/* Legal Text (Register) */}
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
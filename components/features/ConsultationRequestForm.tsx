// components/features/ConsultationRequestForm.tsx
'use client';

import React, { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ConsultationRequestSchema, UploadedDocument } from '@/lib/validation';
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
import { Textarea } from '@/components/ui/textarea';
import { Loader2, File as FileIcon, X } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from 'next/navigation';
import FileUpload from './FileUpload'; // Import the file upload component
import { createConsultation, ConsultationActionResult } from '@/actions/consultations'; // Import server action
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import TrustBadge from '@/components/core/TrustBadge'; // Re-use TrustBadge
import { LockKeyhole, ShieldCheck } from 'lucide-react';
import AnimatedCheckmark from '@/components/ui/AnimatedCheckmark'; // Import the checkmark

type FormData = z.infer<typeof ConsultationRequestSchema>;

export default function ConsultationRequestForm() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [showSuccess, setShowSuccess] = useState(false); // State for success animation
    const [uploadedFiles, setUploadedFiles] = useState<UploadedDocument[]>([]); // State to hold completed uploads

    const form = useForm<FormData>({
        resolver: zodResolver(ConsultationRequestSchema),
        defaultValues: {
            topic: '',
            patientQuestion: '',
        },
    });

    const handleUploadComplete = (uploadedFile: UploadedDocument) => {
        setUploadedFiles((prevFiles) => [...prevFiles, uploadedFile]);
        toast.success(`Datei "${uploadedFile.fileName}" erfolgreich hochgeladen.`);
    };

    const handleUploadError = (fileName: string, message: string) => {
        toast.error(`Fehler bei "${fileName}"`, { description: message });
    };

     const handleFileRemove = (uploadId: string) => {
        setUploadedFiles((prevFiles) => prevFiles.filter(file => file.uploadId !== uploadId));
     };

    const onSubmit = (values: FormData) => {
        setShowSuccess(false); // Reset success state
        startTransition(async () => {
            const result: ConsultationActionResult = await createConsultation(values, uploadedFiles);

            if (result.success) {
                 setShowSuccess(true); // Show checkmark
                 setTimeout(() => {
                    toast.success("Anfrage gesendet!", { description: result.message });
                    // Redirect to dashboard after successful submission
                    router.push('/patient/dashboard');
                    // No need for router.refresh() here due to revalidatePath in action
                 }, 1200); // Delay redirect
            } else {
                toast.error("Fehler beim Senden", {
                    description: result.message || "Bitte überprüfen Sie Ihre Eingaben.",
                });
                 // Handle field errors if returned
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
        });
    };

    return (
        <Card className="w-full max-w-2xl mx-auto">
             <CardHeader>
                 <CardTitle className="text-2xl">Neue Beratung anfordern</CardTitle>
                 <CardDescription>
                     Beschreiben Sie Ihr Anliegen oder Ihre Frage für eine medizinische Erklärung.
                     Fügen Sie bei Bedarf relevante Dokumente hinzu (z.B. Befunde, Arztbriefe).
                 </CardDescription>
                 <div className="flex flex-wrap gap-4 pt-3 text-sm">
                     <div className="flex items-center gap-1.5 text-muted-foreground">
                        <LockKeyhole className="h-4 w-4 text-blue-600" />
                        <span>Vertrauliche Behandlung</span>
                     </div>
                     <div className="flex items-center gap-1.5 text-muted-foreground">
                        <ShieldCheck className="h-4 w-4 text-green-600" />
                        <span>Sichere Datenübertragung</span>
                     </div>
                 </div>
             </CardHeader>
             <CardContent>
                 <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="topic"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Thema / Betreff</FormLabel>
                                    <FormControl>
                                        <Input placeholder="z.B. Erklärung Blutwerte, Frage zu MRT-Befund" {...field} disabled={isPending || showSuccess} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                         <FormField
                            control={form.control}
                            name="patientQuestion"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Ihre Frage</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Beschreiben Sie hier detailliert Ihre Frage oder das Thema, zu dem Sie eine Erklärung wünschen..."
                                            className="min-h-[150px] resize-y" // Allow vertical resize
                                            {...field}
                                             disabled={isPending || showSuccess}
                                        />
                                    </FormControl>
                                     <FormDescription>
                                         Bitte formulieren Sie Ihre Frage klar und geben Sie relevante Details an.
                                         <span className="font-semibold block">Wichtig:</span> Keine Angabe von vollständigen Namen oder extrem sensiblen persönlichen Daten Dritter.
                                     </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* File Upload Component */}
                         <FileUpload
                             onUploadComplete={handleUploadComplete}
                             onUploadError={handleUploadError}
                             onFileRemove={handleFileRemove}
                             currentFileCount={uploadedFiles.length}
                             disabled={isPending || showSuccess}
                         />

                          {/* Display Successfully Uploaded Files */}
                         {uploadedFiles.length > 0 && (
                             <div className="space-y-2 pt-4 border-t">
                                <FormLabel>Hochgeladene Dokumente:</FormLabel>
                                <ul className="list-none space-y-1">
                                    {uploadedFiles.map((file) => (
                                    <li key={file.uploadId} className="flex items-center justify-between text-sm bg-muted/50 p-2 rounded">
                                         <div className="flex items-center gap-2 truncate">
                                             <FileIcon className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                                             <span className="truncate">{file.fileName}</span>
                                             {file.fileSize && <span className="text-xs text-muted-foreground ml-1">({(file.fileSize / 1024).toFixed(1)} KB)</span>}
                                         </div>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="h-6 w-6 p-0 text-destructive hover:bg-destructive/10"
                                            onClick={() => handleFileRemove(file.uploadId)}
                                            disabled={isPending || showSuccess}
                                            aria-label="Datei entfernen"
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </li>
                                    ))}
                                </ul>
                            </div>
                         )}

                        {/* --- Modify Submit Button --- */}
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
                            {!showSuccess && 'Beratung anfordern'}
                        </Button>
                         {/* --- --- */}
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
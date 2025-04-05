// components/features/PatientProfileForm.tsx
'use client';

import React, { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UpdatePatientProfileSchema, UpdatePatientProfileFormData } from '@/lib/validation';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Calendar as CalendarIcon, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { toast } from 'sonner';
import { updateProfile } from '@/actions/profile'; // Import the action
import ProfilePictureUpload from './ProfilePictureUpload';
import AnimatedCheckmark from '../ui/AnimatedCheckmark';
import { PatientProfile, User } from '@prisma/client'; // Import types
import { useSession } from 'next-auth/react'; // Import useSession

interface PatientProfileFormProps {
  user: User & { patientProfile: PatientProfile | null }; // Pass combined user/profile data
}

export default function PatientProfileForm({ user }: PatientProfileFormProps) {
  const { update: updateSession } = useSession(); // Get update function
  const [isPending, startTransition] = useTransition();
  const [showSuccess, setShowSuccess] = useState(false);
  // State to hold the URL of a newly uploaded image *before* saving the profile
  const [newImageUrl, setNewImageUrl] = useState<string | null | undefined>(undefined); // undefined = no change, null = remove, string = new URL

  const form = useForm<UpdatePatientProfileFormData>({
    resolver: zodResolver(UpdatePatientProfileSchema),
    defaultValues: {
      firstName: user.patientProfile?.firstName || '',
      lastName: user.patientProfile?.lastName || '',
      dob: user.patientProfile?.dob ? new Date(user.patientProfile.dob) : undefined,
    },
  });

   const getInitials = (firstName?: string, lastName?: string) => {
        const first = firstName?.[0] ?? '';
        const last = lastName?.[0] ?? '';
        return `${first}${last}`.toUpperCase() || '?';
   };
   const initials = getInitials(form.watch('firstName'), form.watch('lastName'));

  const handlePictureUpload = (url: string) => {
    setNewImageUrl(url); // Store the blob URL temporarily
  };

   const handlePictureRemove = () => {
    setNewImageUrl(null); // Signal removal
  };

  const onSubmit = (values: UpdatePatientProfileFormData) => {
    setShowSuccess(false);
    startTransition(async () => {
      // Pass form data and new image URL (or null/undefined) to the action
      const result = await updateProfile(values, newImageUrl);

      if (result.success) {
        setShowSuccess(true);
        // Determine the final URL that was actually saved
        const finalImageUrl = newImageUrl === null ? null : newImageUrl === undefined ? user.image : newImageUrl;
        setNewImageUrl(undefined); // Reset image change state after successful save
        toast.success('Profil aktualisiert!', { description: result.message });

        // Trigger session update to refresh header image
        await updateSession({ user: { image: finalImageUrl } }); // Pass only the updated field

         setTimeout(() => setShowSuccess(false), 1500); // Hide checkmark after a delay
      } else {
        toast.error('Fehler beim Speichern', {
          description: result.message || 'Profil konnte nicht gespeichert werden.',
        });
        if (result.fieldErrors) {
          Object.entries(result.fieldErrors).forEach(([field, errors]) => {
            if (errors) {
              form.setError(field as keyof UpdatePatientProfileFormData, {
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <ProfilePictureUpload
            initialImageUrl={newImageUrl === undefined ? user.image : newImageUrl} // Show user image or the staged new one
            initials={initials}
            onUploadComplete={handlePictureUpload}
            onRemovePicture={handlePictureRemove}
            disabled={isPending || showSuccess}
        />

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

        <Button type="submit" disabled={isPending || showSuccess} animateInteraction={!isPending && !showSuccess}>
             {showSuccess ? (
                <AnimatedCheckmark />
            ) : isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            {!showSuccess && 'Profil speichern'}
        </Button>
      </form>
    </Form>
  );
}
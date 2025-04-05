// components/features/StudentProfileForm.tsx
'use client';

import React, { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UpdateStudentProfileSchema, UpdateStudentProfileFormData } from '@/lib/validation';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { updateProfile } from '@/actions/profile'; // Import the action
import ProfilePictureUpload from './ProfilePictureUpload';
import AnimatedCheckmark from '../ui/AnimatedCheckmark';
import { StudentProfile, User } from '@prisma/client'; // Import types
import { useSession } from 'next-auth/react'; // Import useSession

interface StudentProfileFormProps {
  user: User & { studentProfile: StudentProfile | null }; // Pass combined user/profile data
}

export default function StudentProfileForm({ user }: StudentProfileFormProps) {
  const { update: updateSession } = useSession(); // Get update function
  const [isPending, startTransition] = useTransition();
  const [showSuccess, setShowSuccess] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState<string | null | undefined>(undefined);

  const form = useForm<UpdateStudentProfileFormData>({
    resolver: zodResolver(UpdateStudentProfileSchema),
    defaultValues: {
      firstName: user.studentProfile?.firstName || '',
      lastName: user.studentProfile?.lastName || '',
      university: user.studentProfile?.university || '',
      clinicalYear: user.studentProfile?.clinicalYear || undefined,
    },
  });

  const getInitials = (firstName?: string, lastName?: string) => {
        const first = firstName?.[0] ?? '';
        const last = lastName?.[0] ?? '';
        return `${first}${last}`.toUpperCase() || '?';
   };
   const initials = getInitials(form.watch('firstName'), form.watch('lastName'));

  const handlePictureUpload = (url: string) => {
    setNewImageUrl(url);
  };

  const handlePictureRemove = () => {
    setNewImageUrl(null);
  };

  const onSubmit = (values: UpdateStudentProfileFormData) => {
    setShowSuccess(false);
    startTransition(async () => {
      const result = await updateProfile(values, newImageUrl);

      if (result.success) {
        setShowSuccess(true);
        const finalImageUrl = newImageUrl === null ? null : newImageUrl === undefined ? user.image : newImageUrl;
        setNewImageUrl(undefined);
        toast.success('Profil aktualisiert!', { description: result.message });

        // Trigger session update
        await updateSession({ user: { image: finalImageUrl } }); // Pass only the updated field

        setTimeout(() => setShowSuccess(false), 1500);
      } else {
        toast.error('Fehler beim Speichern', {
          description: result.message || 'Profil konnte nicht gespeichert werden.',
        });
        if (result.fieldErrors) {
          Object.entries(result.fieldErrors).forEach(([field, errors]) => {
            if (errors) {
              form.setError(field as keyof UpdateStudentProfileFormData, {
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
            initialImageUrl={newImageUrl === undefined ? user.image : newImageUrl}
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
                            <Input placeholder="Lukas" {...field} disabled={isPending || showSuccess} />
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
                            <Input placeholder="Huber" {...field} disabled={isPending || showSuccess} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>

         <FormField
            control={form.control}
            name="university"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Universität</FormLabel>
                    <FormControl>
                        <Input placeholder="z.B. LMU München" {...field} disabled={isPending || showSuccess} />
                    </FormControl>
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
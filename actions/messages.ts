// actions/messages.ts
'use server';

import { z } from 'zod';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { isWithinInterval, subMilliseconds } from 'date-fns';
import { MESSAGE_EDIT_DELETE_LIMIT_MS } from '@/lib/constants';
import { triggerPusherEvent } from '@/lib/pusher/server';
import { revalidatePath } from 'next/cache'; // May not be strictly needed if Pusher handles UI updates

// Define result type
type MessageActionResult = {
    success: boolean;
    message: string; // For success or error feedback
    updatedMessage?: { id: string; content: string }; // Optional data on success for edit
    deletedMessageId?: string; // Optional data on success for delete
};

// --- Validation Schemas ---
const EditMessageSchema = z.object({
    messageId: z.string().cuid("Ungültige Nachrichten-ID."),
    newContent: z.string().trim().min(1, "Nachricht darf nicht leer sein.").max(5000, "Nachricht zu lang."), // Same limits as sending
});

const DeleteMessageSchema = z.object({
    messageId: z.string().cuid("Ungültige Nachrichten-ID."),
});

// --- Edit Message Action ---
export async function editMessage(
    messageId: string,
    newContent: string
): Promise<MessageActionResult> {
    const session = await auth();
    if (!session?.user?.id) {
        return { success: false, message: "Nicht autorisiert." };
    }
    const userId = session.user.id;

    // Validate input
    const validation = EditMessageSchema.safeParse({ messageId, newContent });
    if (!validation.success) {
        return { success: false, message: validation.error.errors[0]?.message || "Ungültige Eingabe." };
    }

    try {
        // Fetch the message to verify ownership and timestamp
        const message = await prisma.message.findUnique({
            where: { id: messageId },
            select: { senderId: true, createdAt: true, consultationId: true }
        });

        if (!message) {
            return { success: false, message: "Nachricht nicht gefunden." };
        }

        // Verify ownership
        if (message.senderId !== userId) {
            return { success: false, message: "Sie können nur Ihre eigenen Nachrichten bearbeiten." };
        }

        // Verify time limit
        const now = new Date();
        if (!isWithinInterval(message.createdAt, { start: subMilliseconds(now, MESSAGE_EDIT_DELETE_LIMIT_MS), end: now })) {
            return { success: false, message: "Das Zeitlimit für die Bearbeitung dieser Nachricht ist abgelaufen." };
        }

        // Update the message
        const updatedMessage = await prisma.message.update({
            where: { id: messageId },
            data: { content: newContent },
            select: { id: true, content: true } // Select fields needed for Pusher event
        });

        // Trigger Pusher event
        const channelName = `private-consultation-${message.consultationId}`;
        // Send only necessary update info
        const pusherPayload = { id: updatedMessage.id, content: updatedMessage.content };
        await triggerPusherEvent(channelName, 'message-updated', pusherPayload);

        console.log(`Message ${messageId} updated by user ${userId}`);
        // Optional revalidation if needed as fallback
        // revalidatePath(`/patient/beratungen/${message.consultationId}`);
        // revalidatePath(`/student/beratungen/${message.consultationId}`);

        return { success: true, message: "Nachricht erfolgreich bearbeitet.", updatedMessage: pusherPayload };

    } catch (error) {
        console.error(`Error editing message ${messageId}:`, error);
        return { success: false, message: "Fehler beim Bearbeiten der Nachricht." };
    }
}


// --- Delete Message Action ---
export async function deleteMessage(messageId: string): Promise<MessageActionResult> {
    const session = await auth();
    if (!session?.user?.id) {
        return { success: false, message: "Nicht autorisiert." };
    }
    const userId = session.user.id;

    // Validate input
    const validation = DeleteMessageSchema.safeParse({ messageId });
    if (!validation.success) {
        return { success: false, message: validation.error.errors[0]?.message || "Ungültige Eingabe." };
    }

    try {
        // Fetch the message to verify ownership and timestamp
        const message = await prisma.message.findUnique({
            where: { id: messageId },
            select: { senderId: true, createdAt: true, consultationId: true }
        });

        if (!message) {
            // Message might already be deleted, treat as success? Or specific message?
            // Let's return a specific message here.
            return { success: false, message: "Nachricht nicht gefunden (oder bereits gelöscht)." };
        }

        // Verify ownership
        if (message.senderId !== userId) {
            return { success: false, message: "Sie können nur Ihre eigenen Nachrichten löschen." };
        }

        // Verify time limit
        const now = new Date();
        if (!isWithinInterval(message.createdAt, { start: subMilliseconds(now, MESSAGE_EDIT_DELETE_LIMIT_MS), end: now })) {
            return { success: false, message: "Das Zeitlimit für das Löschen dieser Nachricht ist abgelaufen." };
        }

        // Delete the message
        await prisma.message.delete({
            where: { id: messageId },
        });

        // Trigger Pusher event
        const channelName = `private-consultation-${message.consultationId}`;
        // Send only the ID of the deleted message
        const pusherPayload = { id: messageId };
        await triggerPusherEvent(channelName, 'message-deleted', pusherPayload);

        console.log(`Message ${messageId} deleted by user ${userId}`);
         // Optional revalidation if needed as fallback
        // revalidatePath(`/patient/beratungen/${message.consultationId}`);
        // revalidatePath(`/student/beratungen/${message.consultationId}`);

        return { success: true, message: "Nachricht erfolgreich gelöscht.", deletedMessageId: messageId };

    } catch (error) {
        console.error(`Error deleting message ${messageId}:`, error);
        return { success: false, message: "Fehler beim Löschen der Nachricht." };
    }
}
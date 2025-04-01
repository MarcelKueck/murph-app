// hooks/usePusherSubscription.ts
import { useEffect, useRef } from 'react';
import { pusherClient } from '@/lib/pusher/client'; // Import the configured client
import { Channel, Members } from 'pusher-js'; // Import types

export function usePusherSubscription(
    channelName: string | null, // Allow null to disable hook easily
    eventName: string,
    callback: (data: any) => void
) {
    const callbackRef = useRef(callback);
    const channelRef = useRef<Channel | null>(null);

    // Update ref when callback changes
    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        if (!pusherClient || !channelName) {
            // If Pusher isn't configured or no channel name provided, do nothing
             if (channelRef.current) {
                 // Unsubscribe if channelName becomes null
                 pusherClient?.unsubscribe(channelRef.current.name);
                 channelRef.current = null;
                 console.log(`Pusher: Unsubscribed from ${channelName}`);
             }
            return;
        }

        // Prevent double subscription if channelRef already exists for this channelName
        if (channelRef.current && channelRef.current.name === channelName) {
            console.log(`Pusher: Already subscribed to ${channelName}`);
            return;
        }

        // Unsubscribe from previous channel if name changed
         if (channelRef.current) {
             pusherClient.unsubscribe(channelRef.current.name);
             console.log(`Pusher: Unsubscribed from previous channel ${channelRef.current.name}`);
         }

        // Subscribe to the new channel
        try {
            channelRef.current = pusherClient.subscribe(channelName);
            console.log(`Pusher: Subscribing to ${channelName}`);

            // Bind to subscription success/failure for logging
            channelRef.current.bind('pusher:subscription_succeeded', () => {
                console.log(`Pusher: Successfully subscribed to ${channelName}`);
                 // Bind to the specific event *after* successful subscription
                 if (channelRef.current) { // Check again inside closure
                     channelRef.current.bind(eventName, (data: any) => {
                         // console.log(`Pusher: Received event '${eventName}' on channel '${channelName}'`, data);
                         if (callbackRef.current) {
                             callbackRef.current(data);
                         }
                     });
                     console.log(`Pusher: Bound to event '${eventName}' on channel '${channelName}'`);
                 }
            });

             channelRef.current.bind('pusher:subscription_error', (status: any) => {
                console.error(`Pusher: Subscription failed for ${channelName}`, status);
                // Handle specific errors, e.g., 403 Forbidden if auth failed
            });

        } catch (error) {
            console.error(`Pusher: Error subscribing to channel ${channelName}`, error);
             channelRef.current = null; // Reset ref on error
        }

        // Cleanup on unmount or when channelName changes
        return () => {
            if (channelRef.current) {
                 const currentChannelName = channelRef.current.name;
                 // Unbind specific event first - important!
                 channelRef.current.unbind(eventName);
                 console.log(`Pusher: Unbound from event '${eventName}' on channel '${currentChannelName}'`);
                 // Then unsubscribe
                pusherClient?.unsubscribe(currentChannelName);
                console.log(`Pusher: Unsubscribed from ${currentChannelName}`);
                channelRef.current = null;
            }
        };
        // Re-run effect if channelName or eventName changes (callback is handled by ref)
    }, [channelName, eventName]);

     // Return the channel instance if needed, though hook manages lifecycle
     // return channelRef.current;
}
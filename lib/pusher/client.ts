// lib/pusher/client.ts
import PusherClient from 'pusher-js';

// Ensure environment variables are defined client-side
const pusherKey = process.env.NEXT_PUBLIC_PUSHER_KEY;
const pusherCluster = process.env.NEXT_PUBLIC_PUSHER_CLUSTER;

if (!pusherKey || !pusherCluster) {
    console.warn("Pusher client environment variables missing. Real-time features may be disabled.");
    // Optionally throw an error if Pusher is absolutely critical
    // throw new Error("Pusher client environment variables missing.");
}

// Export a configured Pusher client instance
// Handle case where keys might be missing in development if desired
export const pusherClient = (pusherKey && pusherCluster) ? new PusherClient(pusherKey, {
    cluster: pusherCluster,
    authEndpoint: '/api/pusher/auth', // Our backend authentication endpoint
    // forceTLS: true // useTLS is default in newer versions
}) : null; // Or a mock/dummy object if you want to avoid null checks everywhere


// Optional: Log connection state changes for debugging
if (pusherClient) {
    pusherClient.connection.bind('state_change', (states: any) => {
        console.log("Pusher connection state changed:", states.current);
    });
     pusherClient.connection.bind('error', (err: any) => {
        console.error("Pusher connection error:", err);
        // Potentially show user feedback here
         if (err.error?.data?.code === 4004) {
            console.error("Pusher configuration error - check app key/cluster.");
        }
    });
}
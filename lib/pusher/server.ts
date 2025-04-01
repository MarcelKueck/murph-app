// lib/pusher/server.ts
import PusherServer from 'pusher';

// Ensure environment variables are loaded (should be handled by Next.js)
const pusherAppId = process.env.PUSHER_APP_ID;
const pusherKey = process.env.NEXT_PUBLIC_PUSHER_KEY; // Public key used here too for server instance? Check Pusher docs - usually Key+Secret
const pusherSecret = process.env.PUSHER_SECRET;
const pusherCluster = process.env.NEXT_PUBLIC_PUSHER_CLUSTER;

if (!pusherAppId || !pusherKey || !pusherSecret || !pusherCluster) {
    // In development, maybe allow skipping if keys aren't set for local testing without Pusher?
    // For production, this should definitely throw an error.
    console.warn("Pusher environment variables are not fully set. Pusher functionality will be disabled.");
    // throw new Error("Pusher environment variables are not fully set.");
}

// Create a single instance of the Pusher server client
// Note: Check Pusher Node SDK docs if using public key here is correct, usually it's appId, key, secret
export const pusherServer = (pusherAppId && pusherKey && pusherSecret && pusherCluster) ? new PusherServer({
  appId: pusherAppId,
  key: pusherKey, // Yes, the key is often used here too
  secret: pusherSecret,
  cluster: pusherCluster,
  useTLS: true, // Always use TLS
}) : null; // Return null if keys are missing, allowing graceful degradation? Or throw error.


// Helper function to trigger events safely
export async function triggerPusherEvent(channel: string, event: string, data: any) {
    if (!pusherServer) {
        console.log("Pusher server not initialized, skipping event trigger.");
        return;
    }
    try {
        await pusherServer.trigger(channel, event, data);
        console.log(`Pusher event triggered: Channel='${channel}', Event='${event}'`);
    } catch (error) {
        console.error("Error triggering Pusher event:", error);
        // Handle error appropriately (e.g., logging, monitoring)
    }
}
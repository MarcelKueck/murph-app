# Murph - Version 1.0: Real-time Chat Implementation Plan (Pusher)

## 1. Goal

Implement a real-time text chat interface for ongoing consultations (`IN_PROGRESS` status) using Pusher Channels. Messages sent by either the patient or the assigned student should appear instantly for the other participant.

## 2. Pusher Configuration

*   **Environment Variables:**
    *   `PUSHER_APP_ID`
    *   `NEXT_PUBLIC_PUSHER_KEY` (Client-side access)
    *   `PUSHER_SECRET`
    *   `NEXT_PUBLIC_PUSHER_CLUSTER` (Client-side access)
*   **Server-side Instance (`/lib/pusher/server.ts`):** Initialize Pusher server SDK using App ID, Key, Secret, Cluster. Export the instance.
*   **Client-side Instance (`/lib/pusher/client.ts`):** Initialize `pusher-js` using Key and Cluster. Export the instance. Configure authentication endpoint (`/api/pusher/auth`).

## 3. Channels and Events

*   **Channel Type:** Private Channels (require authentication).
*   **Channel Naming Convention:** `private-consultation-${consultationId}`. This ensures each chat is isolated.
*   **Events:**
    *   `new-message`: Triggered when a new message is successfully saved to the database.
        *   Payload: The newly created `Message` object (including sender details), matching the structure expected by the frontend chat components.
        *   ```typescript
          // Example Payload for new-message event
          {
            id: string;
            consultationId: string;
            senderId: string;
            content: string;
            createdAt: string; // ISO Date string
            sender: { id: string; role: UserRole; firstName: string; lastName: string; };
          }
          ```
    *   (Optional V1.0+): `status-update`: Could be used if status changes (e.g., COMPLETED) need real-time UI updates beyond message sending.

## 4. Backend Logic (Message Sending API)

*   **Route:** `/api/nachrichten` (POST)
*   **Process:**
    1.  Authenticate the user and verify they are part of the specified `consultationId`.
    2.  Validate the incoming message content.
    3.  Save the new `Message` to the database using Prisma. Ensure sender details are linked correctly. Fetch the created message with sender details included.
    4.  **Crucially:** After successful database save, use the Pusher server instance (`lib/pusher/server.ts`) to trigger the `new-message` event on the corresponding `private-consultation-${consultationId}` channel.
    5.  Pass the newly created message data (matching the payload structure above) as the event payload.
    6.  Use `trigger` method, potentially excluding the sender's socket ID (`socket_id`, if passed from the client) to prevent the sender from receiving their own message via Pusher echo (though client-side handling is usually sufficient).
    7.  Return the created message data in the API response.

## 5. Backend Logic (Pusher Authentication)

*   **Route:** `/api/pusher/auth` (POST)
*   **Process:**
    1.  Receive `socket_id` and `channel_name` from the Pusher client library.
    2.  Verify the user is authenticated (using `auth()` helper).
    3.  Extract `consultationId` from the `channel_name`.
    4.  Query the database to confirm the authenticated user is either the `patientId` or the `studentId` associated with that `consultationId`.
    5.  If authorized: Use the Pusher server instance (`pusher.authorizeChannel`) to generate the authentication signature.
    6.  Return the signature as JSON.
    7.  If unauthorized or error: Return appropriate HTTP status code (403 Forbidden).

## 6. Frontend Logic (Chat Interface)

*   **Component:** `/components/features/ChatInterface.tsx`
*   **Hook:** `/hooks/usePusherSubscription.ts`
    *   Accepts `channelName` and `eventName` as arguments.
    *   Handles subscribing to the Pusher channel using the client instance (`lib/pusher/client.ts`).
    *   Handles binding to the specified event (`new-message`).
    *   Provides a callback mechanism or state update when a new event is received.
    *   Handles unsubscription on component unmount to prevent memory leaks.
*   **ChatInterface Logic:**
    1.  Fetch initial chat history (`messages`) via the `/api/beratungen/[consultationId]` GET endpoint.
    2.  Use the `usePusherSubscription` hook to subscribe to `private-consultation-${consultationId}` and listen for `new-message` events.
    3.  Maintain the list of messages in component state (e.g., `useState`).
    4.  When the `MessageInput` component submits a new message:
        *   Call the `/api/nachrichten` POST endpoint.
        *   On successful API response, *optimistically* add the sent message to the local state (optional, improves UX) OR wait for the Pusher event if echo is handled perfectly. *Decision: Implement optimistic update for better perceived performance.*
    5.  When a `new-message` event is received via the Pusher hook:
        *   Check if the message ID already exists in the local state (to avoid duplicates if optimistic update was used).
        *   If it's a new message from the *other* user, add it to the message list state.
        *   Trigger UI updates (e.g., scroll to bottom).

## 7. Error Handling

*   Client-side: Handle Pusher connection errors if possible (library might provide events). Display Toast notifications for failures in sending messages.
*   Server-side: Log errors during Pusher triggering or authentication.
*   

## 8. Review 03.04.25:

# Murph - Version 1.0: Real-time Chat Implementation Status (Pusher)

## 1. Goal

Implement real-time text chat for `IN_PROGRESS` consultations using Pusher Channels.

## 2. Implementation Status

*   **Pusher Configuration:**
    *   **Environment Variables:** Setup relies on standard Pusher env vars (`PUSHER_APP_ID`, `NEXT_PUBLIC_PUSHER_KEY`, `PUSHER_SECRET`, `NEXT_PUBLIC_PUSHER_CLUSTER`). *(Confirmed)*
    *   **Server-side Instance (`lib/pusher/server.ts`):** Initialized using env vars. Exports `pusherServer` instance and `triggerPusherEvent` helper function. Includes basic checks for missing env vars. *(Confirmed)*
    *   **Client-side Instance (`lib/pusher/client.ts`):** Initialized using public env vars. Exports `pusherClient`. Configures `authEndpoint`. Includes basic checks and connection state logging. *(Confirmed)*
*   **Channels and Events:**
    *   **Channel Naming:** Uses `private-consultation-${consultationId}` convention. *(Confirmed)*
    *   **Events:** `new-message` event is used. *(Confirmed)*
    *   **Payload:** Matches the required structure for frontend components (id, content, sender details, etc.). *(Confirmed)*
*   **Backend Logic (Message Sending - `/api/nachrichten/route.ts`):**
    *   Authenticates user and authorizes based on consultation participation and `IN_PROGRESS` status. *(Confirmed)*
    *   Validates message content. *(Confirmed)*
    *   Saves `Message` to DB. *(Confirmed)*
    *   Triggers `new-message` event using `triggerPusherEvent` helper after successful DB save. *(Confirmed)*
    *   Returns the created message data in the response. *(Confirmed)*
*   **Backend Logic (Pusher Authentication - `/api/pusher/auth/route.ts`):**
    *   Receives `socket_id` and `channel_name`. *(Confirmed)*
    *   Authenticates user session. *(Confirmed)*
    *   Extracts `consultationId` and verifies user participation via DB check. *(Confirmed)*
    *   Uses `pusherServer.authorizeChannel` to return signature if authorized. *(Confirmed)*
    *   Returns 401/403/500 on errors. *(Confirmed)*
*   **Frontend Logic (`ChatInterface.tsx`, `usePusherSubscription.ts`):**
    *   `usePusherSubscription` hook implemented to handle subscription, event binding, and unsubscription lifecycle. *(Confirmed)*
    *   `ChatInterface` fetches initial messages and uses the hook to listen for `new-message` events. *(Confirmed)*
    *   Message list state (`messages`) updated on receiving new messages (handles potential duplicates). *(Confirmed)*
    *   `MessageInput` calls the `/api/nachrichten` endpoint. *(Confirmed)*
    *   Optimistic UI update implemented via `onMessageSent` callback. *(Confirmed)*
    *   Basic connection status awareness implemented in `ChatInterface`. *(Confirmed)*

## 3. Conclusion

The core real-time chat functionality using Pusher is implemented. Messages are sent, received via Pusher, and displayed in the UI. Authentication for private channels is working. Remaining work involves UI polish for the chat interface, robust handling of connection states/errors for the user, and thorough testing.
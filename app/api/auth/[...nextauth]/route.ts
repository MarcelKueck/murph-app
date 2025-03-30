// app/api/auth/[...nextauth]/route.ts
import { handlers } from "@/lib/auth"; // Adjust path if needed
export const { GET, POST } = handlers;

// If you need edge compatibility, export runtime = 'edge'
// export const runtime = 'edge' // Optional
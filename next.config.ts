import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '', // Keep empty unless a specific port is needed
        pathname: '/**', // Allow any path on this hostname
      },
      // Add other hostnames here if needed in the future
      // e.g., { protocol: 'https', hostname: 'your-cdn.com', ... }
    ],
  },
};

export default nextConfig;

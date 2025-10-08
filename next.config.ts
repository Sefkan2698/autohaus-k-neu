import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standalone output für Docker optimiert
  output: 'standalone',
  
  // Optional: Wenn du externe Images verwendest
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
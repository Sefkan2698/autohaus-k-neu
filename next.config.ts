import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standalone output für Docker optimiert
  output: 'standalone',
  
  // Für Demo: Build-Checks ausschalten
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  
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
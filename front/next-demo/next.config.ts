import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'covers.openlibrary.org',
        pathname: '/b/**', // Allow /b/id and /b/isbn
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        pathname: '/**', 
      }
    ],
  },
};

export default nextConfig;

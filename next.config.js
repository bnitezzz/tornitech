/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
    ],
  },
  experimental: {
    serverActions: true,
  },
  webpack: (config) => {
    // Silences a known false-positive "Critical dependency: the request of a
    // dependency is an expression" warning from @supabase/realtime-js's use
    // of a dynamic require, which is otherwise harmless.
    config.module.exprContextCritical = false;
    return config;
  },
};

module.exports = nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000', // Ensure this matches your Django port
        pathname: '/media/**',
      },
    ]
  },
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        // {
        //   key: "Content-Security-Policy",
        //   value: `
        //       default-src 'self';
        //       script-src 'self' 'unsafe-inline' 'unsafe-eval' *.vercel.app;
        //       style-src 'self' 'unsafe-inline';
        //       img-src 'self' data: blob: https:;
        //       font-src 'self' data:;
        //       connect-src 'self' http://127.0.0.1:8000 https://api.yosrentals.com;
        //     `.replace(/\n/g, ""),
        // },
        {
          key: "X-Frame-Options",
          value: "DENY",
        },
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },
      ],
    },
  ],
  turbopack: {
    resolveAlias: {
      three$: "three/build/three.min.js",
      "three/.*$": "three",
    },
  },
};

export default nextConfig;

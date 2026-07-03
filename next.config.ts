import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static generation where possible
  output: undefined, // Let Next.js decide per route
  // Disable x-powered-by header
  poweredByHeader: false,
  // Configure for Vercel deployment
  reactStrictMode: true,
  // Allow sql.js (native module) to be bundled on the server
  serverExternalPackages: ["sql.js"],
  // Security headers applied to all routes
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

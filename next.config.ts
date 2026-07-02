import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static generation where possible
  output: undefined, // Let Next.js decide per route
  // Disable x-powered-by header
  poweredByHeader: false,
  // Configure for Vercel deployment
  reactStrictMode: true,
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Strict mode for better development experience
  reactStrictMode: true,
  
  // Remove X-Powered-By header for security
  poweredByHeader: false,
};

export default nextConfig;

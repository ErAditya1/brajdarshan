import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // image optimazation
  images: {
    domains: ['images.unsplash.com'],
  },
};

export default nextConfig;

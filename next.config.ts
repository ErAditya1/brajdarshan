import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // image optimazation
  images: {
   
    remotePatterns: [
    {
      protocol: "https",
      hostname: "ik.imagekit.io",
    },
    {
      protocol: "https",
      hostname: "images.unsplash.com",
    },
    {
      protocol: "https",
      hostname: "media.istockphoto.com",
    },
  ],
  },
};

export default nextConfig;

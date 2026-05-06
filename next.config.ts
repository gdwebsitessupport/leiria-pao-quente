import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  htmlLimitedBots: /.*/,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;

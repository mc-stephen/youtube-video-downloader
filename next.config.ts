import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        pathname: "/**",
        protocol: "https",
        hostname: "img.icons8.com",
      },
      {
        pathname: "/**",
        protocol: "https",
        hostname: "i.ytimg.com",
      },
    ],
  },
};

export default nextConfig;

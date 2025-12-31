import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rs-blackmarket-api.herokuapp.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

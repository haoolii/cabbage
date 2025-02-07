import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    CLIENT_API_BASE: process.env.CLIENT_API_BASE,
  },
  async rewrites() {
    return [
      {
        source: "/d/:path*",
        destination: `${process.env.SERVER_API_BASE}/api/:path*`,
      },
      {
        source: "/o/:path*",
        destination: `${process.env.SERVER_API_BASE}/o/:path*`,
      },
    ];
  },
};

export default nextConfig;

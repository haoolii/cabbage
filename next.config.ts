import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    CLIENT_API_BASE: process.env.CLIENT_API_BASE,
    ASSET_BASE: process.env.ASSET_BASE,
    APP_NAME: process.env.APP_NAME,
    SERVER_API_BASE: process.env.SERVER_API_BASE,
    SERVER_API_CONTAINER_BASE: process.env.SERVER_API_CONTAINER_BASE,
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
    VERSION: process.env.VERSION
  },
  async rewrites() {
    return [
      {
        source: "/d/:path*",
        destination: `${process.env.SERVER_API_BASE}/api/:path*`,
      },
      {
        source: "/o/:path*",
        destination: `${process.env.SERVER_API_BASE}/api/asset/files/:path*`,
      },
    ];
  },
};

export default withNextIntl(nextConfig);

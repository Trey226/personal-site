import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  trailingSlash: false,
  experimental: {
    optimizePackageImports: ['@mui/material', '@emotion/react', '@emotion/styled'],
  },
};

export default nextConfig;

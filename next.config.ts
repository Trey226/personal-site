import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    outputFileTracingIncludes: {
        '/api/*': [],
    }
};

export default nextConfig;


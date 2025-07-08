import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    outputFileTracingExcludes: {
        '/api/analyze': [
            './node_modules/**/*',
            './app/**/*',
            './components/**/*',
            './public/**/*',
            './_data/**/*',
        ],
    }
};

export default nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
    outputFileTracingExcludes: {
        '/api/analyze': [
            './node_modules/**/*',
            './app/**/*',
            './components/**/*',
            './public/**/*',
            './_data/**/*',
        ],
    }
}

module.exports = nextConfig;
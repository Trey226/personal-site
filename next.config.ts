/** @type {import('next').NextConfig} */
const nextConfig = {
    outputFileTracingExcludes: {
        '/api/**/*': [
            './node_modules/**/*',
            './app/**/*',
            './components/**/*',
            './public/**/*',
            './_data/**/*',
        ],
    }
}

module.exports = nextConfig;

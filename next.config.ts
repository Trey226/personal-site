/** @type {import('next').NextConfig} */
const nextConfig = {
    /* config options here */
}

module.exports = {
    outputFileTracingExcludes: {
        'api/analyze': ['./app/**/*'],
    }
}
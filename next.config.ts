/** @type {import('next').NextConfig} */
const nextConfig = {

  output: 'standalone',                 //this *should* fix my serverless function size issues
  outputFileTracingExcludes: {
    '/api/**/*': ['./node_modules/**/*'],
  },

  rewrites: async () => {
    return [
      {
        source: '/api/:path*',
        destination:
          process.env.NODE_ENV === 'development'
            ? 'http://127.0.0.1:5328/api/:path*'
            : '/api/',
      },
    ]
  },
}

export default nextConfig;

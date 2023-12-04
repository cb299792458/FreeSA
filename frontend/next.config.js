/** @type {import('next').NextConfig} */
// const nextConfig = {}

module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',  // Specify the API routes you want to proxy
        destination: 'http://localhost:3001/api/:path*',  // Specify the URL of your Express backend
      },
    ];
  },
};
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: "https://open-me.onrender.com/api/v1/:path*",
        basePath: false,
      },
    ];
  },
  // other configurations...
};

module.exports = nextConfig;

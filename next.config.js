/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "disk.yandex.ru",
        port: "",
        pathname: "/d/**",
      },
      {
        protocol: "https",
        hostname: "downloader.disk.yandex.ru",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "storage.yandexcloud.net",
        port: "",
        pathname: "/**",
      },
    ],
  },
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

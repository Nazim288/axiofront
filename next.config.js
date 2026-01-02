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
        destination: "https://www.axiogram.ru/api/v1/:path*",
      },
    ];
  },
  // other configurations...
};

module.exports = nextConfig;

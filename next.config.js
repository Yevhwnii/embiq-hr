/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "https://www.api-football.com",
      "www.api-football.com",
      "media.api-sports.io",
    ],
    formats: ["image/avif", "image/webp"],
  },
};

module.exports = nextConfig;

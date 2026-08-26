/** @type {import('next').NextConfig} */
const nextConfig = {
   allowedDevOrigins: ['192.168.56.1'],
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;

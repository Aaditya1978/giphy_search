/** @type {import('next').NextConfig} */
const nextConfig = {
  // allow from any origin
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

module.exports = nextConfig;

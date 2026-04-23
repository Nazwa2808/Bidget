/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gaurgupxooqjxpowjubf.supabase.co",
      },
    ],
  },
};

module.exports = nextConfig;
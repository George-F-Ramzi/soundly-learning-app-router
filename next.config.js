/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["cloudinary"],
  },
  images: { domains: ["res.cloudinary.com"] },
};

module.exports = nextConfig;

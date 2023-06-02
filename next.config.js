/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ["cloudinary"],
  },
  images: { domains: ["res.cloudinary.com"] },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["images.unsplash.com", "i.ytimg.com", "yt3.ggpht.com"],
  },
};

module.exports = nextConfig;

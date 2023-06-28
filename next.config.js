/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  // staticPageGenerationTimeout :200,

  swcMinify: true,
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: config => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    ENABLE_TESTNETS: process.env.ENABLE_TESTNETS === "true",
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_ALCHEMY_API_KEY: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  },
};

module.exports = nextConfig;

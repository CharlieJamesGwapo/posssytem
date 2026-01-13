/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  output: process.env.NETLIFY === 'true' ? 'export' : undefined,
  trailingSlash: true,
  distDir: process.env.NETLIFY === 'true' ? 'out' : '.next',
  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
    }
    return config
  },
  images: {
    unoptimized: process.env.NETLIFY === 'true',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    formats: process.env.NETLIFY !== 'true' ? ['image/avif', 'image/webp'] : undefined,
    deviceSizes: [320, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  compress: true,
  swcMinify: true,
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  generateEtags: true,
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  },
  experimental: {
    optimizePackageImports: ['@/store', '@/utils'],
  },
}

module.exports = nextConfig

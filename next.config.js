/** @type {import('next').NextConfig} */

const path = require('path')

const nextConfig = {
  reactStrictMode: false,
  pageExtensions: ['page.tsx', 'api.ts', 'api.tsx'],
  images: {
    domains: [
      'firebasestorage.googleapis.com',
      'https://googleusercontent.com',
      'm.media-amazon.com',
    ],
  },
  webpack: (config) => {
    config.resolve.alias['@components'] = path.join(__dirname, 'src/components')
    config.resolve.alias['@api'] = path.join(__dirname, 'src/api')
    config.resolve.alias['@context'] = path.join(__dirname, 'src/context')
    config.resolve.alias['@hooks'] = path.join(__dirname, 'src/hooks')
    config.resolve.alias['@layouts'] = path.join(__dirname, 'src/layouts')
    config.resolve.alias['@pages'] = path.join(__dirname, 'src/pages')
    config.resolve.alias['@services'] = path.join(__dirname, 'src/services')

    return config
  },
}

module.exports = nextConfig

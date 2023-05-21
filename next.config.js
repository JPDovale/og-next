/** @type {import('next').NextConfig} */

const path = require('path')

const nextConfig = {
  reactStrictMode: false,
  pageExtensions: ['page.tsx', 'api.ts', 'api.tsx'],
  images: {
    domains: [
      'firebasestorage.googleapis.com',
      'googleusercontent.com',
      'source.unsplash.com',
      'm.media-amazon.com',
      'images.prismic.io',
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
    config.resolve.alias['@styles'] = path.join(__dirname, 'src/styles')
    config.resolve.alias['@utils'] = path.join(__dirname, 'src/utils')
    config.resolve.alias['@@types'] = path.join(__dirname, 'src/@types')

    return config
  },
}

module.exports = nextConfig

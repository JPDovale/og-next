/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  pageExtensions: ['page.tsx', 'api.ts', 'api.tsx'],
  images: {
    domains: [
      'firebasestorage.googleapis.com',
      'https://googleusercontent.com',
    ],
  },
}

module.exports = nextConfig

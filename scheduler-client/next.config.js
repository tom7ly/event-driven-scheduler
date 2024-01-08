/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
    async redirects() {
      return [
        {
          source: '/',
          destination: '/dashboard',
          permanent: true,
        },
      ]
    },
  }
  
  module.exports = {
    async redirects() {
      return [
        {
          source: '/',
          destination: '/dashboard',
          permanent: true,
        },
      ]
    },
  }
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['randomuser.me'], // Add randomuser.me as an allowed domain
  },
}

module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
<<<<<<< HEAD
    domains: ['peertask.infura-ipfs.io'],
=======
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
>>>>>>> 617783c61ac6119cb26ab3924286b6c84ddb3372
  },
  reactStrictMode: true,
}

module.exports = nextConfig
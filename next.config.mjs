/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'images.moecm.com',
      },
    ],
  },
}

export default nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io', // صور مشاريعك
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // صور الخلفية من Unsplash
      },
    ],
  },

  
};

export default nextConfig;
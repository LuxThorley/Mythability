
/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/meteor',
        destination: 'https://malcolmai.live/api/meteor',
      },
      {
        source: '/api/aurora',
        destination: 'https://malcolmai.live/api/aurora',
      },
    ];
  },
};

module.exports = nextConfig;

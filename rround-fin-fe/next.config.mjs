/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/pub/terms/list',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;

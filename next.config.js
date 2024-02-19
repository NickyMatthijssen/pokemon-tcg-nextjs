/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pokemontcg.io",
      },
    ],
    formats: ["image/webp"],
    unoptimized: Boolean(process.env.IMAGES_UNOPTIMIZED ?? false),
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/1",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;

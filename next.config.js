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
  },
  redirects: async () => [
    {
      source: "/",
      destination: "/1",
      permanent: true,
    },
  ],
};

module.exports = nextConfig;

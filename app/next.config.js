/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "arweave.net",
      "ipfs.io",
      "nftstorage.link",
      "shdw-drive.genesysgo.net",
      "bafybe..." // Puedes añadir más si detectas otros dominios en tus NFTs
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

module.exports = nextConfig;

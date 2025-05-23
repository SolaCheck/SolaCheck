/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "arweave.net" },
      { protocol: "https", hostname: "ipfs.io" },
      { protocol: "https", hostname: "nftstorage.link" },
      { protocol: "https", hostname: "shdw-drive.genesysgo.net" },
      { protocol: "https", hostname: "i.ibb.co" },
      { protocol: "https", hostname: "img.hi-hi.vip" },
      { protocol: "https", hostname: "mara1837891738.com" },
      { protocol: "https", hostname: "solgift7.com" }
    ]
  }
};

module.exports = nextConfig;

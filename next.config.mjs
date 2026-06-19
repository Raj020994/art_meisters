/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "blue-onion-demo.s3.ap-south-1.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
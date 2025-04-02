/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "build",
  
  experimental: {
    // turbopack: false,
  },
  images: {
    domains: ["demo.alignmycareer.com", "localhost"],
  },

    async redirects() {
    return [
      {
        source: "/job-seeker",
        destination: "/next/home",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

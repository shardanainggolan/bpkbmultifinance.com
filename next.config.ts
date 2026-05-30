import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86400, // cache gambar cabang 24 jam
    remotePatterns: [
      {
        protocol: "https",
        hostname: "backend.adiracabang.id",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "article.adiracabang.id",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;

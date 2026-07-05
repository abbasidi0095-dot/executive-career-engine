import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/executive-career-engine",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

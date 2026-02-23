import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@orbis/shared"],
  reactStrictMode: true,
};

export default nextConfig;

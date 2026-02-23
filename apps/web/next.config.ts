import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  transpilePackages: ["@orbis/shared"],
  reactStrictMode: true,
  turbopack: {
    // Monorepo: Next.js is in apps/web, ensure Turbopack resolves from here
    root: path.join(__dirname),
  },
};

export default nextConfig;

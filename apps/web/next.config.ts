import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  transpilePackages: ["@orbis/shared"],
  reactStrictMode: true,
  turbopack: {
    // Monorepo: set root to repo root so Turbopack finds next in apps/web/node_modules
    root: path.resolve(__dirname, "..", ".."),
  },
};

export default nextConfig;

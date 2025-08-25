/** @type {import('next').NextConfig} */
import path from "path";

const nextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@/components": path.resolve(__dirname, "app/components"),
      "@/lib": path.resolve(__dirname, "app/lib"),
      "@/data": path.resolve(__dirname, "data"),
    };
    return config;
  },
};

export default nextConfig;

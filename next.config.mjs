import { fileURLToPath } from "node:url";
import createJiti from "jiti";
const jiti = createJiti(fileURLToPath(import.meta.url));

jiti("./app/env");

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['lucide-react']
};

export default nextConfig;

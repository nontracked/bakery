import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  sassOptions: {
    additionalData: `@use "@/styles/helpers" as *;`,
    silenceDeprecations: ["legacy-js-api"],
  },
};

export default nextConfig;

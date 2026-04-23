import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    root: "E:/stock_market",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s.yimg.com",
      },
      {
        protocol: "https",
        hostname: "static.seekingalpha.com",
      },
      {
        protocol: "https",
        hostname: "cdn.benzinga.com",
      },
      {
        protocol: "https",
        hostname: "www.chartmill.com",
      },
      {
        protocol: "https",
        hostname: "image.cnbcfm.com",
      },
      {
        protocol: "https",
        hostname: "static2.finnhub.io",
      },
      // static2.finnhub.io
    ],
  },
};

export default nextConfig;

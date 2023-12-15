const withFonts = require("next-fonts");
const isProductionBuild = process.env.NEXT_PUBLIC_APP_ENVIORMENT === "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [""],
    minimumCacheTTL: 300,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: isProductionBuild ? "preproduction2.metakhodro.ir" : "oto.ir",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "",
        pathname: "/**",
      },
    ],
  },
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.(docx)$/i,
      use: [
        {
          loader: "file-loader",
          options: {
            publicPath: "/_next",
            name: "static/media/[name].[hash].[ext]",
          },
        },
      ],
    });
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=300, s-maxage=120, stale-while-revalidate=120",
          },
        ],
      },
    ];
  },
};

module.exports = withFonts(nextConfig);
/** @type {import("next").NextConfig} */
const nextConfig = {
  output: "standalone",
  sassOptions: {
    silenceDeprecations: ["legacy-js-api"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: '',
        pathname: '/**',
        search: '',
      },
    ],
  },
  compress: false,
};

export default nextConfig;

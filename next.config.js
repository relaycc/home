const { withPlausibleProxy } = require("next-plausible");
const { startTransition } = require("react");
const { validateLocaleAndSetLanguage } = require("typescript");

/** @type {import('next').NextConfig} */
const nextConfig = withPlausibleProxy()({
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
  rewrites: async () => {
    return [
      { source: "/general", destination: "/search?category=general" },
      { source: "/music", destination: "/search?category=music" },
      { source: "/venture", destination: "/search?category=venture" },
      { source: "/lens", destination: "/search?category=lens" },
      { source: "/events", destination: "/search?category=events" },
      { source: "/new", destination: "/search?category=new" },
      { source: "/identity", destination: "/search?category=identity" },
      { source: "/dao", destination: "/search?category=dao" },
      { source: "/defi", destination: "/search?category=defi" },
      { source: "/zk", destination: "/search?category=zk" },
      { source: "/impactdao", destination: "/search?category=impactdao" },
      { source: "/daotool", destination: "/search?category=daotool" },
      {
        source: "/infrastructure",
        destination: "/search?category=infrastructure",
      },
    ];
  },
});

module.exports = nextConfig;

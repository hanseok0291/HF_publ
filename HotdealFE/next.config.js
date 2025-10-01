const local = process.env.NEXT_PUBLIC_APP_TEST === "local";

module.exports = {
  reactStrictMode: true,
  basePath: local ? "/nfe" : "/010pay/react/test",
  trailingSlash: true,
  images: {
    loader: 'custom',
    unoptimized: true,
  },
  webpack(config) {
    if (!local) {
      config.name === "client"
        ? (config.output.filename = "static/chunks/[name]-[hash].js")
        : "";
    }
    return config;
  },
  async rewrites() {
    if (local) {
      return [
        {
          source: "/hotdeal/api/:path*",
          destination: "https://tbezauthapi.settlebank.co.kr/:path*",
          basePath: false,
        },
      ];
    } else {
      return [];
    }
  },
};

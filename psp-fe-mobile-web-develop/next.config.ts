import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    
    const rewrites = [
      {
        source: "/addressApi/:path*",
        destination: "https://business.juso.go.kr/:path*"
      }
    ];

    // 백엔드 API 프록시 미들웨어(/v1/ 등으로 시작하는 요청들을 현재 Next.js 서버를 프록시로 사용하여 백엔드로 포워딩한다.)
    // 환경 변수가 설정된 경우에만 추가
    if (apiBaseUrl) {
      rewrites.push({
        source: "/v:version(\\d+)/:path*",
        destination: `${apiBaseUrl}/v:version/:path*`
      });
    }

    return rewrites;
  },
  async headers() {
    return [
      {
        source: "/addressApi/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*" // 개발 환경, 운영은 specific origin
          }
        ]
      },
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,DELETE,PATCH,POST,PUT"
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
          }
        ]
      }
    ];
  },
  eslint: {
    // 빌드 시점에 eslint를 비활성화 한다.
    ignoreDuringBuilds: true
  },
  sassOptions: {
    /**
     * @description for remove issue about Next’s webpack config loading the “legacy JS API” instead of the “modern JS API”
     * @link https://github.com/vercel/next.js/issues/71638
     */
    silenceDeprecations: ["legacy-js-api"]
  }
};

export default nextConfig;

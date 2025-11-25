import { NextRequest, NextResponse } from "next/server";
import {
  apiProxyToBackend,
  checkAuthAndRequestPath
} from "./utils/middlewareUtils";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log("pathname : ", pathname);
  // 이미 로그인 페이지인 경우 바로 진행
  const isLoginPage = pathname.includes("/login");
  if (isLoginPage) {
    return NextResponse.next();
  }

  // API 요청 처리 (백엔드로 프록시)
  if (pathname.match(/^\/v\d+\//)) {
    try {
      // NOTE: 기존 프록시 로직
      // const apiResponse = await apiProxyToBackend(request)();

      // NOTE: 로깅 추가된 신규 프록시 로직
      const requestBody = request.headers
        .get("content-type")
        ?.includes("application/json")
        ? await request
            .clone()
            .json()
            .catch(() => undefined)
        : undefined;

      console.log("[REQUEST]", {
        url: request.url,
        method: request.method,
        headers: request.headers,
        body: requestBody
      });

      const proxyResponse = apiProxyToBackend(request);
      const response = await proxyResponse();
      const responseClone = response.clone();

      const responseBody = response.headers
        .get("content-type")
        ?.includes("application/json")
        ? await responseClone.json().catch(() => undefined)
        : undefined;

      console.log("[RESPONSE]", {
        status: response.status,
        body: responseBody
      });

      // 403 응답 처리
      // if (response.status === 403) {
      //   // 1. 요청이 Ajax/API 요청인지 확인
      //   const isApiRequest =
      //     request.headers.get("accept")?.includes("application/json") ||
      //     request.headers.get("X-Requested-With") === "XMLHttpRequest";

      //   // Ajax 요청인 경우 403 그대로 반환하고 클라이언트에서 처리
      //   if (isApiRequest) {
      //     // 헤더에 인증 오류 정보 추가하여 클라이언트에서 구분할 수 있게 함
      //     const clonedResponse = new Response(response.body, response);
      //     clonedResponse.headers.set("X-Auth-Error", "true");
      //     return clonedResponse;
      //   }

      //   // 일반 페이지 요청인 경우 리다이렉트
      //   const splitedPathnames = request.nextUrl.pathname
      //     .split("/")
      //     .filter(Boolean);
      //   const authorPath = splitedPathnames[0] || "";

      //   // 유효한 authorPath인지 확인 (store 또는 collector)
      //   const validAuthorPath = ["store", "collector"].includes(authorPath)
      //     ? authorPath
      //     : "";

      //   const redirectUrl = validAuthorPath
      //     ? `/${validAuthorPath}/login?expired=true` // 쿼리 파라미터로 만료 정보 전달
      //     : "/?expired=true";

      //   const redirectResponse = NextResponse.redirect(
      //     new URL(redirectUrl, request.url)
      //   );

      //   // 쿠키 삭제 - 응답 객체에 적용
      //   deleteClientCookieInServer(
      //     redirectResponse,
      //     COOKIE_ENUM.enum["X-Access-Token"]
      //   );
      //   deleteClientCookieInServer(
      //     redirectResponse,
      //     COOKIE_ENUM.enum["X-Refresh-Token"]
      //   );
      //   deleteClientCookieInServer(redirectResponse, COOKIE_ENUM.enum.ROLE);

      //   return redirectResponse;
      // }

      return response;
    } catch (error) {
      console.error("API 프록시 오류:", error);
      return NextResponse.next();
    }
  }

  // 일반 페이지 요청 처리
  if (request.method !== "GET") {
    return NextResponse.next();
  }

  if (!pathname.startsWith("/api")) {
    try {
      const routeResponse = await checkAuthAndRequestPath(request);
      // 함수를 반환하는 경우와 직접 NextResponse를 반환하는 경우 모두 처리
      if (typeof routeResponse === "function") {
        return routeResponse();
      }
      return routeResponse;
    } catch (error) {
      console.error("라우트 검증 오류:", error);
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/store/:path*", "/collector/:path*", "/v1/:path*"]
};

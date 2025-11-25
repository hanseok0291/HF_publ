import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { AUTHOR_ENUM } from "@/enums/Common.enum";
import {
  ERROR_TYPE,
  ERROR_TYPE_ENUM,
  PARAM_ERROR,
  PARAM_MESSAGE
} from "@/enums/ErrorType.enum";
import { ROLE_ENUM } from "@/enums/Member.enum";
import { deleteClientCookieInServer } from "./cookieUtil.sever";
import { verifyJWT } from "./jwtUtils";

/** 인증/인가 관련 쿠키 삭제하기 */
function clearAuthCookies(response: NextResponse) {
  deleteClientCookieInServer(response, "X-Access-Token");
  deleteClientCookieInServer(response, "X-Refresh-Token");
  deleteClientCookieInServer(response, "ROLE");
}

/** ROLE_CODE enum을 프론트엔드에서 사용하는 author 값으로 변환하기 */
function convertRoleCodeToAuthor(roleCode?: z.infer<typeof ROLE_ENUM>) {
  try {
    const parsedRoleCode = ROLE_ENUM.parse(roleCode);
    switch (parsedRoleCode) {
      case "ROLE_ISTT":
        return "collector";
      case "ROLE_STORE":
        return "store";
    }
  } catch (error) {
    return undefined;
  }
}

/** 페이지 이동 시 권한 및 이동 대상 검증 */
export async function checkAuthAndRequestPath(request: NextRequest) {
  // 요청 URL에서 author path 추출 및 검증 & 2번째 path 추출
  const splitedPathnames = request.nextUrl.pathname.split("/").filter(Boolean);
  const [authorPath, secondPath] = splitedPathnames;
  const authorPathIsValid = AUTHOR_ENUM.safeParse(authorPath);

  // 클라이언트 쿠키 내 AccessToken의 authorPath 추출 및 검증
  const clientCookies = await cookies();
  const accessToken = clientCookies.get("X-Access-Token");

  // 세션 연장 과정인지 확인
  const isSessionExtending =
    clientCookies.get("isExtendingSession")?.value === "true";

  // 세션 연장 중이면 검증 통과
  if (isSessionExtending) {
    return NextResponse.next();
  }

  const accessTokenValue = !!accessToken?.value
    ? verifyJWT(accessToken?.value, process.env.BACKEND_JWT_SECRET!)
    : undefined;

  /** 이미 로그인한 사용자 권한에 맞는 올바른 authorPath */
  const validAuthorPath: z.infer<typeof AUTHOR_ENUM> | undefined = (() => {
    const currentDatetime = new Date().getTime();
    // 기 로그인 사용자의 엑세스 토큰이 유효하지 않거나 만료된 경우 undefined 반환
    if (
      !!accessTokenValue &&
      (!accessTokenValue.isValid ||
        accessTokenValue.payload.exp * 1000 <= currentDatetime)
    ) {
      return undefined;
    }
    // 로그인 했으면 올바른 author 값 반환. 로그인하지 않은 경우 undefined 반환
    return convertRoleCodeToAuthor(accessTokenValue?.payload?.sub);
  })();

  // #1. 미로그인 사용자 처리
  if (!validAuthorPath) {
    // 유효한 author 경로이면서 로그인 페이지로 접근하는 경우 허용
    if (authorPathIsValid.success && secondPath === "login") {
      return NextResponse.next;
    }
    // 유효한 author 경로이지만 로그인 페이지가 아닌 경우, 로그인 페이지로 리다이렉트
    else if (authorPathIsValid.success && secondPath !== "login") {
      return () => {
        const url = new URL(`/${authorPathIsValid.data}/login`, request.url);
        url.searchParams.set(PARAM_ERROR, ERROR_TYPE_ENUM.Enum.ACCESS_DENIED);
        url.searchParams.set(
          PARAM_MESSAGE,
          encodeURIComponent(ERROR_TYPE.ACCESS_DENIED)
        );
        const response = NextResponse.redirect(url);
        clearAuthCookies(response);
        return response;
      };
    }
    // 유효하지 않은 경로인 경우 메인 페이지로 리다이렉트
    else {
      return () => {
        const response = NextResponse.redirect("/");
        clearAuthCookies(response);
        return response;
      };
    }
  }

  // #2. 로그인한 사용자가 로그인 페이지로 접근하려는 경우, 해당 권한의 메인 페이지로 리다이렉트
  if (!!validAuthorPath && secondPath === "login") {
    return () =>
      NextResponse.redirect(new URL(`/${validAuthorPath}`, request.url));
  }

  // #3. 중요: 사용자의 권한과 접근하려는 경로가 일치하는지 확인
  // collector는 /collector 경로만, store는 /store 경로만 접근 가능하도록 설정
  if (validAuthorPath && authorPathIsValid.success) {
    const connectRoleAuthor = convertRoleCodeToAuthor(
      accessTokenValue?.payload?.connectRoleCode
    );
    if (connectRoleAuthor !== authorPathIsValid.data) {
      return () =>
        NextResponse.redirect(
          new URL(`/${validAuthorPath}/login`, request.url)
        );
    }

    // 일반적인 경우: 사용자 권한과 접근 경로가 일치하지 않으면 해당 사용자의 권한에 맞는 경로로 리다이렉트
    // else if (validAuthorPath !== authorPathIsValid.data) {
    //   return () =>
    //     NextResponse.redirect(new URL(`/${validAuthorPath}`, request.url));
    // }
  }

  // #4. 유효하지 않은 경로로 접근하려는 경우, 사용자 권한에 맞는 메인 페이지로 리다이렉트
  if (validAuthorPath && !authorPathIsValid.success) {
    return () =>
      NextResponse.redirect(new URL(`/${validAuthorPath}`, request.url));
  }

  // 모든 검증을 통과한 경우, 요청 진행
  return NextResponse.next;
}

/** API 프록시 미들웨어(/v1/ 등으로 시작하는 요청들을 현재 Next.js 서버를 프록시로 사용하여 백엔드로 포워딩한다.) */
export const apiProxyToBackend = (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  const apiUrl = new URL(pathname, process.env.NEXT_PUBLIC_API_BASE_URL);

  // 원본 요청의 쿼리 파라미터 복사
  request.nextUrl.searchParams.forEach((value, key) => {
    apiUrl.searchParams.append(key, value);
  });

  // 프록시 요청 생성
  const proxyReq = new Request(apiUrl, {
    method: request.method,
    headers: request.headers,
    body: request.body
  });

  // 백엔드로 요청 전달 및 응답 반환
  return () => fetch(proxyReq);
};

"use client";

import { VerificationLoginType } from "@/types/apiType/Common.type";
import { ApiError } from "@/types/HttpClient.type";
import { WebViewData } from "@/types/WebViewType";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { setCookie } from "cookies-next/client";
import { verificationLogin } from "@/apis/common/authApis";
import { getMyInfo } from "@/apis/common/commonApis";
import { ERROR_MESSAGE } from "@/app/constant/error-message.const";
import { setUserInfoToBrowser } from "@/components/common/SessionExtensionModal";
import { getWebCookieMaxAge } from "@/lib/utils";
import { PhoneVerifyValues } from "@/schema/common/Auth.schema";
import { handleLoginRoleCallApp, isWebView } from "@/utils/WebViewHandler";

const checkVerificationError = (
  code: number,
  onError: (...params: any) => void
) => {
  if (code === 401) {
    onError();
    return true;
  }
  if (code === 400) {
    onError();
    return true;
  }
  return false;
};

const getErrorMessage = (code: number) => {
  switch (code) {
    case 401:
      return ERROR_MESSAGE.RE_CHECK_NUMBER;
    case 400:
      return ERROR_MESSAGE.TIME_OVER_NUMBER;
    case 403:
      return "권한이 없습니다. 관리자에게 문의해주세요.";
    default:
      return "인증에 실패했습니다.";
  }
};

export const useVerifyUtil = () => {
  const [formError, setFormError] = useState<string>("");
  const router = useRouter();
  const pathname = usePathname();
  const service = pathname?.split("/")[1];

  const handleNavigation = (isPasswordChange: boolean | undefined) => {
    if (isPasswordChange) {
      router.push(`/${pathname.split("/")[1]}/login/change`);
    } else if (!isPasswordChange) {
      router.push(`/${pathname.split("/")[1]}`);
    } else {
      router.push(`/`);
    }
  };

  const setUserCookies = (loginResponse: VerificationLoginType) => {
    setCookie("X-Access-Token", loginResponse.accessToken, {
      maxAge: getWebCookieMaxAge()
    });
    setCookie("X-Refresh-Token", loginResponse.refreshToken);
    setCookie("userName", loginResponse.name);
    setCookie("adminId", loginResponse.adminId);
    setCookie("positionName", loginResponse.positionName);
    setCookie("institutionId", loginResponse.institutionId);
    localStorage.setItem("role", loginResponse.roleCode);

    // setCookie("tokenCreationTime", Date.now().toString(), {
    //   maxAge: 15 * 60, // 15분 (초 단위로 설정)
    //   path: "/",
    //   sameSite: "lax",
    //   // secure: process.env.NODE_ENV === "production"
    //   secure: false
    // });
  };

  // 모바일 앱으로 페이지를 로드한 경우 로그인 규칙 정보 전달
  const handleLoginRole = (loginResponse: VerificationLoginType) => {
    if (isWebView()) {
      const webViewData = {
        content: loginResponse.roleCode
      } as WebViewData;

      handleLoginRoleCallApp(webViewData);
    }
  };

  const handleVerification = async (
    adminId: string,
    verificationCode: string
  ) => {
    try {
      const osType = isWebView() ? "A" : "W";

      // 1. 먼저 로그인 검증
      const loginResponse = await verificationLogin({
        adminId,
        verificationCode,
        osType
      });

      if (loginResponse.code === 0) {
        // 2. 로그인 성공 시 쿠키 설정
        try {
          setUserInfoToBrowser(loginResponse.content, undefined);
          // NOTE : setUserCookies 삭제해서 통일화 하기
          setUserCookies(loginResponse.content);
          handleLoginRole(loginResponse.content);
          // 3. 쿠키 설정 후 약간의 지연을 주어 토큰이 제대로 설정되도록 함
          await new Promise((resolve) => setTimeout(resolve, 100));

          // 4. getMyInfo 호출
          try {
            const myInfo = await getMyInfo();
            if (myInfo.code === 0) {
              setCookie("localGovernmentId", myInfo.content.localGovernmentId);
              setCookie("address", myInfo.content.address);
              setCookie("logoImage", myInfo.content.logoImage);
            }
          } catch (myInfoError: any) {
            if (myInfoError.code === 403) {
              return {
                success: false,
                error: 403,
                message: "권한이 없습니다. 관리자에게 문의해주세요."
              };
            }
            console.error("Error fetching user info:", myInfoError);
          }

          return { success: true, data: loginResponse };
        } catch (cookieError) {
          console.error("Error while setting cookies:", cookieError);
          throw cookieError;
        }
      }

      return { success: false, error: loginResponse.code };
    } catch (error: any) {
      // 퍼블리싱 작업 중 서버 연결 없을 때 500 에러는 모킹 데이터로 처리
      if (error?.code === 500) {
        console.warn("서버 연결 없음 (퍼블리싱 작업 중):", error.message);
        
        // 모킹 데이터 생성
        const now = new Date();
        const expireDate = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24시간 후
        
        const mockLoginResponse = {
          code: 0,
          content: {
            adminId: adminId || "mock-admin-id",
            name: "테스트 사용자",
            roleCode: service === "store" ? "ROLE_STORE" : "ROLE_ISTT",
            roleTitle: service === "store" ? "판매소" : "수거업체",
            accessToken: "mock-access-token",
            accessDate: now.toISOString(),
            expireDate: expireDate.toISOString(),
            accessExpireIn: "86400",
            refreshToken: "mock-refresh-token",
            refreshExpireIn: "604800",
            passwordChangeRequireYn: false,
            localGovernmentId: null,
            positionName: "테스트",
            institutionId: "mock-institution-id",
            storeId: service === "store" ? "mock-store-id" : ""
          } as VerificationLoginType
        };

        try {
          // 모킹 쿠키 설정
          setUserInfoToBrowser(mockLoginResponse.content, undefined);
          setUserCookies(mockLoginResponse.content);
          handleLoginRole(mockLoginResponse.content);
          
          return { success: true, data: mockLoginResponse };
        } catch (cookieError) {
          console.error("Error while setting mock cookies:", cookieError);
          return { success: false, error: "쿠키 설정에 실패했습니다." };
        }
      }

      [400, 401, 403].includes(error?.code) &&
        setFormError((error as ApiError).message);
      return { success: false, error: (error as ApiError).message };
    }
  };

  const onSubmit = async (data: PhoneVerifyValues) => {
    if (!data.adminId || !data.verificationCode) {
      setFormError("AdminId가 존재하지 않습니다.");
      return;
    }

    try {
      const response = await handleVerification(
        data.adminId,
        data.verificationCode
      );
      const isPasswordChange = response.data?.content.passwordChangeRequireYn;
      if (!response.success) {
        if (typeof response.error === "number") {
          checkVerificationError(response.error, () =>
            setFormError(getErrorMessage(response.error))
          );
          if (response.error === 403) {
            setFormError(response.message || getErrorMessage(403));
            return;
          }
        } else {
          setFormError(response.error || "인증에 실패했습니다.");
        }
        return;
      }
      handleNavigation(isPasswordChange);
    } catch (error) {
      console.error("Verification failed:", error);
      setFormError("인증에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return {
    formError,
    setFormError,
    onSubmit,
    checkVerificationError,
    handleVerification,
    handleNavigation,
    service,
    // NOTE : 삭제 예정
    setUserCookies
  };
};

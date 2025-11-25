"use client";

import { ApiError } from "@/types/HttpClient.type";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { deleteCookie, getCookie } from "cookies-next/client";
import { AUTHOR_ENUM } from "@/enums/Common.enum";
import { COOKIE_ENUM } from "@/enums/Cookies.enum";
import {
  ERROR_TYPE,
  ERROR_TYPE_ENUM,
  PARAM_ERROR,
  PARAM_MESSAGE
} from "@/enums/ErrorType.enum";
import { toast } from "@/hooks/use-toast";
import Modal from "./Modal";

export default function ErrorHandler() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isProcessing = useRef(false);
  const isLoginPage = useRef(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // 현재 페이지가 로그인 페이지인지 확인
    const pathParts = pathname.split("/").filter(Boolean);
    isLoginPage.current = pathParts.length > 1 && pathParts[1] === "login";

    // 이전 처리 상태 초기화 (페이지 변경 시)
    isProcessing.current = false;
  }, [pathname]);

  const deleteCookies = () => {
    // 쿠키 존재 여부 확인 (이미 삭제된 경우 처리하지 않음)
    const hasAuthCookie =
      getCookie(COOKIE_ENUM.enum["X-Access-Token"]) !== undefined;

    if (hasAuthCookie) {
      // 클라이언트 쿠키 삭제
      deleteCookie(COOKIE_ENUM.enum["X-Access-Token"]);
      deleteCookie(COOKIE_ENUM.enum["X-Refresh-Token"]);
      deleteCookie(COOKIE_ENUM.enum.ROLE);
    }
  };

  const handleConfirm = () => {
    setErrorMessage("");
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.delete(PARAM_ERROR);
    newSearchParams.delete(PARAM_MESSAGE);
    router.replace(`?${newSearchParams.toString()}`);
  };

  useEffect(() => {
    const error = searchParams.get(PARAM_ERROR);
    const message = searchParams.get(PARAM_MESSAGE);

    if (ERROR_TYPE_ENUM.safeParse(error).success && message) {
      console.log(`error : ${error}, message : ${message}`);
      setErrorMessage(decodeURIComponent(message));
      setIsModalOpen(true);
    }
  }, [searchParams]);

  useEffect(() => {
    // 이미 로그인 페이지에 있다면 인터셉터를 설정하지 않음
    if (isLoginPage.current) {
      return;
    }

    // API 요청 인터셉터 설정
    const originalFetch = window.fetch;
    window.fetch = async function (input, init) {
      try {
        const response = await originalFetch(input, init);

        // 401, 403 에러 처리
        if (response.status === 401 || response.status === 403) {
          deleteCookies();

          // 현재 경로에서 authorPath 추출
          const pathParts = pathname.split("/").filter(Boolean);
          const authorPath = pathParts[0] || "";
          const validAuthorPath = AUTHOR_ENUM.safeParse(authorPath);

          if (validAuthorPath.success) {
            const message =
              (await response.json()).message ?? ERROR_TYPE.ACCESS_DENIED;
            const param = new URLSearchParams();
            param.set(PARAM_ERROR, ERROR_TYPE_ENUM.Enum.ACCESS_DENIED);
            param.set(PARAM_MESSAGE, encodeURIComponent(message));
            router.replace(
              `/${validAuthorPath.data}/login?${param.toString()}`
            );
          }
        }

        return response;
      } catch (error: any) {
        console.error("API 요청 중 오류 발생:", error);
        toast({
          title: "오류가 발생했습니다.",
          description: `${(error as ApiError).message}`
        });
        // 네트워크 오류일 경우에만 토스트 표시 (이미 처리 중이 아닐 때)
        if (!isProcessing.current) {
          toast({
            title: "오류가 발생했습니다.",
            description: "네트워크 연결을 확인해주세요.",
            variant: "destructive"
          });
        }

        throw error;
      }
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, [pathname, router]);

  return (
    <div className="flex items-center">
      {errorMessage !== "" && (
        <Modal
          open={isModalOpen}
          onOpenChange={() => {
            setIsModalOpen(false);
          }}
          description={errorMessage}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
}

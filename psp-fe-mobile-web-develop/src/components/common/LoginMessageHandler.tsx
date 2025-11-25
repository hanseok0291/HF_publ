"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "@/hooks/use-toast";

export default function LoginMessageHandler() {
  const searchParams = useSearchParams();
  const [expired, setExpired] = useState<string | null>(null);

  useEffect(() => {
    // URL 쿼리 파라미터에서 expired 플래그 확인
    const expiredParam = searchParams.get("expired");
    setExpired(expiredParam);
  }, [searchParams]);

  useEffect(() => {
    if (expired === "true") {
      // 1회만 토스트 메시지 표시
      toast({
        title: "인증이 만료되었습니다.",
        description: "다시 로그인해주세요.",
        variant: "destructive"
      });

      // 브라우저 히스토리에서 만료 쿼리 파라미터 제거 (새로고침 시 메시지 반복 방지)
      const newUrl = window.location.pathname;
      window.history.replaceState({}, "", newUrl);
    }
  }, [expired]);

  return null;
}

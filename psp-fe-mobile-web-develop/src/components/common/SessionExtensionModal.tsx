"use client";

import { VerificationLoginType } from "@/types/apiType/Common.type";
import { ApiError } from "@/types/HttpClient.type";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { TypeOf } from "zod";
import { tokenRefresh } from "@/apis/common/authApis";
import Modal from "@/components/common/Modal";
import { AUTHOR_ENUM } from "@/enums/Common.enum";
import { toast } from "@/hooks/use-toast";
import useAuthorPath from "@/hooks/useAuthorPath";
import {
  clearCookie,
  getCookie,
  setCookie,
  setUserInfoCookie
} from "@/utils/cookieUtils.client";

const SessionExtensionModal = () => {
  const router = useRouter();
  const author = useAuthorPath();
  const [loading, setLoading] = useState(false);

  // 만료 시간
  const [expireDate, setExpireDate] = useState("");

  // modal창 컨트롤 state
  const [openModal, setOpenModal] = useState<boolean>(false);

  const [notificationTriggered, setNotificationTriggered] =
    useState<boolean>(false);

  const [timeRemainingStr, setTimeRemainingStr] = useState<string>("00:00");

  const handleRefreshToken = async () => {
    // 실제 토큰 갱신 로직
    const refreshToken = getCookie("X-Refresh-Token");
    if (!refreshToken) {
      handleExpireTime(
        "로그인 세션 연장에 필요한 정보가 존재하지 않습니다. 다시 로그인 해 주세요."
      );
      return;
    }

    try {
      setLoading(true);

      const response = await tokenRefresh({ refreshToken });
      const existUserInfoCookie = JSON.parse(getCookie("INFO") ?? "{}");
      initExpireDate(response.content.expireDate);
      setUserInfoToBrowser(response.content, existUserInfoCookie.tempAuthor);
      setNotificationTriggered(false);
      setOpenModal(false);
    } catch (error: any) {
      handleExpireTime((error as ApiError).message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleExpireTime = (message?: string) => {
    setOpenModal(false);
    clearCookie();
    setExpireDate("");
    toast({
      description: message ?? "로그아웃 되었습니다."
    });
    router.push(`/${author}/login`);
  };

  const initExpireDate = (expiredDate?: string) => {
    const userInfoCookie = getCookie("INFO");
    if (!!userInfoCookie) {
      const userInfo = JSON.parse(userInfoCookie);
      if (userInfo.expireDate || expiredDate) {
        setExpireDate(expiredDate || userInfo.expireDate);
      } else {
        clearCookie();
        router.replace(`/${author}/login`);
      }
    }
  };

  useEffect(() => {
    initExpireDate();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      // expireDate가 유효한 값이 아니라면, 타이머를 실행하지 않음
      if (!expireDate) {
        initExpireDate();
        return;
      }

      const realExpireDate = new Date(expireDate); // expireDate를 Date 객체로 변환
      const currentTime = new Date(); // 현재 시간
      const timeRemaining = realExpireDate.getTime() - currentTime.getTime(); // expireDate와 현재 시간의 차이 계산

      // 1분 전이 되면 알림을 띄움
      if (
        !notificationTriggered &&
        timeRemaining <= 60000 &&
        timeRemaining >= 0
      ) {
        setOpenModal(true);
        setNotificationTriggered(true); // 알림은 한 번만 띄우기
      }

      const minutes = Math.floor(timeRemaining / 60000);
      const seconds = Math.floor((timeRemaining % 60000) / 1000);
      if (timeRemaining <= 0) {
        setTimeRemainingStr("00:00");
        handleExpireTime();
      } else {
        setTimeRemainingStr(
          `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
        );
      }
    }, 1000); // 1초마다 비교

    return () => clearInterval(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, [expireDate, notificationTriggered]);
  return (
    openModal && (
      <Modal
        open={openModal}
        onOpenChange={setOpenModal}
        description={`남은 로그인 시간 ${timeRemainingStr}\n로그인을 연장하시겠습니까?`}
        onConfirm={() => handleRefreshToken()}
        onCancel={() => handleExpireTime()}
        confirmButton={{ text: loading ? "처리 중..." : "연장" }}
        cancelButton={{ text: "취소" }}
      />
    )
  );
};

export default SessionExtensionModal;

export const setUserInfoToBrowser = (
  userInfo: VerificationLoginType,
  /** BO 관리자가 타 사이트 사용 시 세팅하는 권한 */
  tempAuthor?: Exclude<TypeOf<typeof AUTHOR_ENUM>, "bo">
) => {
  // Set Tokens for Request Backend API
  setCookie("X-Access-Token", userInfo.accessToken, {
    expires: new Date(userInfo.expireDate)
  });
  setCookie("X-Refresh-Token", userInfo.refreshToken, {
    expires: new Date(userInfo.expireDate)
  });

  // Set User's Access expire datetime
  setUserInfoCookie({
    expireDate: userInfo.expireDate,
    accessDate: userInfo.accessDate,
    tempAuthor,
    // NOTE: id를 조건, path parameter로 사용하는 부분이 있기에 설정
    localGovernmentId: userInfo.localGovernmentId,
    institutionId: userInfo.institutionId,
    storeId: userInfo.storeId,
    positionName: userInfo.positionName
  });
};

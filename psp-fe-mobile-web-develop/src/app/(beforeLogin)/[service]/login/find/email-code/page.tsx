"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter, useParams } from "next/navigation";
import { ChevronRightIcon } from "lucide-react";
import { useShallow } from "zustand/react/shallow";
import Image from "next/image";
import { sendCode } from "@/apis/common/authApis";
import ErrorText from "@/components/common/ErrorText";
import VerifyInput from "@/components/login/VerifyInput";
import { ArrowLeft } from "lucide-react";
import HeaderContainer from "@/components/header/HeaderContainer";
import { toast } from "@/hooks/use-toast";
import { PhoneVerifyValues } from "@/schema/common/Auth.schema";
import { useSaveUserInfo } from "@/stores/useSaveUserInfo";
import { cn } from "@/lib/utils";

const Page = () => {
  const [adminId, setAdminId] = useState<string>("");
  const router = useRouter();
  const params = useParams();
  const service = params.service as string;

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<PhoneVerifyValues>({
    mode: "onChange",
    defaultValues: {
      verificationCode: ""
    }
  });

  const { user, setUser } = useSaveUserInfo(
    useShallow((state) => ({
      user: state.user,
      setUser: state.setUser
    }))
  );

  const otpVerify = watch("verificationCode");

  // 이메일 코드 재발송
  const handleResendCode = async () => {
    if (adminId) {
      try {
        await sendCode({ adminId });
        toast({
          description: "인증 코드를 재발송 하였습니다."
        });
      } catch (error) {
        toast({
          title: "오류가 발생했습니다.",
          description: "코드 재발송에 실패했습니다."
        });
      }
    }
  };

  // 코드 입력 완료 시 처리
  useEffect(() => {
    if (otpVerify.length === 5) {
      // 5자리 코드 입력 완료 시 다음 단계로 이동
      // TODO: 코드 검증 API 호출 후 성공 페이지로 이동
      router.push(`/${service}/login/find/success`);
    }
  }, [otpVerify, router, service]);

  useEffect(() => {
    // user 정보에서 adminId 가져오기
    // 퍼블리싱 작업 중: adminId가 없어도 모킹 데이터로 진행
    if (user?.adminId) {
      setAdminId(user.adminId);
    } else if (user?.content?.adminId) {
      // response.content에 adminId가 있는 경우
      setAdminId(user.content.adminId);
    } else {
      // 퍼블리싱 작업 중: 모킹 데이터 사용
      console.warn("퍼블리싱 작업 중: adminId가 없어 모킹 데이터 사용");
      const mockAdminId = "mock-admin-id-for-publishing";
      setAdminId(mockAdminId);
      // 모킹 user 정보 설정
      if (!user || !user.secondAuthValue) {
        setUser({
          adminId: mockAdminId,
          secondAuthValue: "userid@hecto.co.kr",
          secondAuthType: "이메일"
        });
      }
    }
  }, [user, router, service, setUser]);

  return (
    <div className="container grid grid-rows-[auto,1fr] justify-items-center bg-main lg:bg-login-gradient lg:flex lg:min-h-screen lg:items-center lg:justify-center">
      {/* 모바일: 헤더 (뒤로가기 버튼만) */}
      <HeaderContainer className="lg:hidden">
        <ArrowLeft 
          onClick={() => router.back()}
          className="cursor-pointer"
        />
        <div></div>
        <div></div>
      </HeaderContainer>

      {/* PC: 왼쪽 폼 영역 */}
      <form
        className="flex flex-col bg-white w-full lg:shadow-[5px_5px_45px_0px_rgba(214,215,246,0.42)] lg:w-[540px] lg:h-[648px] lg:relative lg:justify-start lg:flex-shrink-0 lg:rounded-[4px] px-[16px] lg:px-[50px] pt-[20px] lg:pt-[60px] pb-[40px] lg:pb-[60px]"
        onSubmit={handleSubmit(() => {})}
      >

        {/* 제목 */}
        <h1 className="text-[20px] lg:text-[28px] text-black font-bold text-center block mb-[24px] lg:mb-[32px]">
          이메일로 코드가 발송됐어요
        </h1>

        {/* 설명 텍스트 */}
        <div className="flex flex-col gap-[8px] mb-[32px] lg:mb-[40px]">
          <p className="text-[14px] lg:text-[16px] text-black text-center font-normal leading-[22px]">
            <span className="font-semibold">
              {user?.secondAuthValue || "userid@hecto.co.kr"}
            </span>
            로 2차 인증 코드가 발송 됐어요.
          </p>
          <p className="text-[14px] lg:text-[16px] text-black text-center font-normal leading-[22px]">
            2차 인증 코드는 10분 후 만료 전 입력해 주세요.
          </p>
        </div>

        {/* 코드 입력 필드 */}
        <div className="mb-[16px] lg:mb-[24px]">
          <VerifyInput control={control} name="verificationCode" />
        </div>

        {/* 재발송 버튼 */}
        <div className="flex items-center justify-center mt-auto lg:mt-0 mb-[32px] lg:mb-0 w-full">
          <button
            type="button"
            onClick={handleResendCode}
            className="flex items-center justify-center gap-[4px] w-full border border-gray40 rounded-[4px] bg-white text-black text-[14px] font-medium px-[16px] py-[12px] hover:bg-gray-50 transition-colors"
          >
            <span>이메일 코드 재발송하기</span>
          </button>
        </div>

        {/* 에러 메시지 */}
        {errors.verificationCode && (
          <ErrorText className="whitespace-pre-wrap leading-error-text-heigth mt-[16px]">
            {errors.verificationCode.message}
          </ErrorText>
        )}
      </form>

      {/* PC: 오른쪽 일러스트레이션 영역 */}
      <div className="hidden lg:flex lg:bg-main lg:w-[560px] lg:h-[648px] lg:items-center lg:justify-center lg:px-[30px] lg:py-[52px] lg:flex-shrink-0">
        <div className="flex flex-col gap-[15px] items-center w-full justify-center">
          {/* 일러스트레이션 영역 */}
          <div className="h-full w-full relative overflow-hidden flex justify-center">
            <Image
              src={"/images/login/pc.png"}
              width={480}
              height={480}
              alt="Hecto Financial Illustration"
              className="object-contain"
            />
          </div>
          {/* 로고 */}
          <div className="h-[29px] w-[193px] flex items-center justify-center">
            <Image
              src={"/images/HF_horizontal_white.png"}
              width={193}
              height={29}
              alt="Hecto Financial Logo"
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;


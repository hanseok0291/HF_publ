"use client";

import { useParams, useRouter } from "next/navigation";
import { useShallow } from "zustand/react/shallow";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import Button from "@/components/common/Button";
import HeaderContainer from "@/components/header/HeaderContainer";
import { useSaveUserInfo } from "@/stores/useSaveUserInfo";

export default function Page() {
  const router = useRouter();
  const params = useParams();
  const service = params.service as string;
  const { resetUser, content } = useSaveUserInfo(
    useShallow((state) => ({
      resetUser: state.resetUser,
      content: state.user.content
    }))
  );

  const handleMoveLogin = () => {
    router.push(`/${service}/login?keep=true`);
    resetUser();
  };

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
      <div className="flex flex-col bg-white w-full lg:shadow-[5px_5px_45px_0px_rgba(214,215,246,0.42)] lg:w-[540px] lg:h-[648px] lg:relative lg:justify-start lg:flex-shrink-0 lg:rounded-[4px] px-[16px] lg:px-[90px] pt-[20px] lg:pt-[60px] pb-[40px] lg:pb-[60px]">
        {/* 성공 아이콘 */}
        <div className="flex justify-center mb-[24px] lg:mb-[32px]">
          <div className="w-[80px] h-[80px] lg:w-[100px] lg:h-[100px] rounded-full flex items-center justify-center">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="lg:w-[50px] lg:h-[50px]"
            >
              <path
                d="M20 0C8.954 0 0 8.954 0 20C0 31.046 8.954 40 20 40C31.046 40 40 31.046 40 20C40 8.954 31.046 0 20 0ZM16 28L8 20L10.172 17.828L16 23.656L29.828 9.828L32 12L16 28Z"
                fill="#0066FF"
              />
            </svg>
          </div>
        </div>

        {/* 제목 */}
        <h1 className="text-[28px] lg:text-[32px] text-[#0F0F10] font-bold text-center block mb-[24px] lg:mb-[32px]">
          계정 정보 찾기
        </h1>

        {/* 설명 텍스트 */}
        <div className="flex flex-col gap-[8px] mb-[32px] lg:mb-[40px]">
          <p className="text-[14px] lg:text-[16px] text-[#52525B] text-center font-normal leading-[22px]">
            등록하신 계정{" "}
            <span className="font-semibold">
              {content || "userid@hecto.co.kr"}
            </span>
            으로
            <br /> 임시 비밀번호가 발급됐어요.
          </p>
          <p className="text-[14px] lg:text-[16px] text-[#52525B] text-center font-normal leading-[22px]">
            임시 비밀번호로 로그인 후 비밀번호를 변경해 주세요.
          </p>
        </div>

        {/* 버튼 */}
        <div className="mt-auto lg:mt-0">
          <Button
            type="button"
            className="w-full lg:h-[56px] lg:text-lg font-semibold"
            onClick={() => handleMoveLogin()}
          >
            로그인 하기
          </Button>
        </div>
      </div>

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
}

"use client";

import { ApiError } from "@/types/HttpClient.type";
import { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useRouter, useParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useShallow } from "zustand/react/shallow";
import Image from "next/image";
import { findUserInfo } from "@/apis/common/authApis";
import Button from "@/components/common/Button";
import ErrorText from "@/components/common/ErrorText";
import Input from "@/components/common/Input";
import CloseHeader from "@/components/header/CloseHeader";
import LoginErrorAlert from "@/components/login/_components/LoginErrorAlert";
import { FindInfoSchema, FindInfoValues } from "@/schema/common/Auth.schema";
import { useSaveUserInfo } from "@/stores/useSaveUserInfo";
import { formatPhoneNumber } from "@/utils/formatUtils";
import { cn } from "@/lib/utils";

const Page = () => {
  const [formError, setFormError] = useState<string>("");
  const [nameValue, setNameValue] = useState<string>("");
  const [phoneValue, setPhoneValue] = useState<string>("");
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  
  const { register, handleSubmit, control, watch } = useForm<FindInfoValues>({
    resolver: zodResolver(FindInfoSchema),
    mode: "onSubmit"
  });
  const { setUser } = useSaveUserInfo(
    useShallow((state) => ({
      setUser: state.setUser
    }))
  );

  const router = useRouter();
  const params = useParams();
  const service = params.service as string;
  
  // 입력값 감시 및 폼 유효성 검사
  useEffect(() => {
    const phoneNumbersOnly = phoneValue.replace(/\D/g, "");
    const valid = nameValue.trim().length > 0 && phoneNumbersOnly.length >= 10;
    setIsFormValid(valid as boolean);
  }, [nameValue, phoneValue]);

  const handleVerification = async (name: string, cellPhoneNumber: string) => {
    try {
      const response = await findUserInfo({
        name,
        cellPhoneNumber
      });

      if (response.code === 0) {
        console.log(response);
        // response.content가 있으면 content를, 없으면 response 전체를 저장
        const userData = (response as any).content 
          ? { ...(response as any).content } 
          : { ...response };
        setUser(userData);
        // 이메일 코드 발송 페이지로 이동
        router.push(`find/email-code`);
        return { success: true, data: response };
      }

      return { success: false, error: response.code };
    } catch (error: any) {
      [400, 401, 403].includes(error?.code) &&
        setFormError((error as ApiError).message);
      return { success: false, error: "인증에 실패했습니다." };
    }
  };

  const onSubmit = (data: FindInfoValues) => {
    // 로그인 시도
    handleVerification(data.name, data.cellPhoneNumber);
  };

  return (
    <div className="container grid grid-rows-[auto,1fr] justify-items-center bg-main lg:bg-login-gradient lg:flex lg:min-h-screen lg:items-center lg:justify-center">
      {/* 모바일: 헤더 */}
      <CloseHeader
        onClose={() => router.back()}
        title="계정 정보 찾기"
        className="lg:hidden"
      />

      {/* 모바일/PC: 폼 영역 */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col bg-white w-full lg:shadow-[5px_5px_45px_0px_rgba(214,215,246,0.42)] lg:w-[540px] lg:h-[648px] lg:relative lg:justify-start lg:flex-shrink-0 lg:rounded-[4px] px-[16px] lg:px-[90px] pt-[20px] lg:pt-[60px] pb-[40px] lg:pb-[60px]"
      >
        {/* 제목 - PC 버전에만 표시 */}
        <h1 className="hidden lg:block text-[28px] text-black font-bold text-left mb-[60px]">
          계정 정보 찾기
        </h1>

        {/* 입력 필드 영역 */}
        <div className="flex flex-col gap-[24px] lg:gap-[32px] mt-0 lg:mt-0">
          {/* 이름 입력 */}
          <div className="flex flex-col gap-[8px]">
            <label
              htmlFor="name"
              className="text-[14px] lg:text-[16px] text-black font-['Pretendard:Medium',sans-serif] font-medium"
            >
              이름
            </label>
            <Input
              maxLength={20}
              type="text"
              size="large"
              placeholder="이름을 입력하세요."
              className="w-full lg:h-[48px]"
              {...register("name", {
                onChange: (e) => {
                  setNameValue(e.target.value);
                }
              })}
              onInvalid={(e) => {
                e.preventDefault();
              }}
            />
          </div>

          {/* 휴대폰 번호 입력 */}
          <div className="flex flex-col gap-[8px]">
            <label
              htmlFor="phone"
              className="text-[14px] lg:text-[16px] text-black font-['Pretendard:Medium',sans-serif] font-medium"
            >
              휴대폰 번호
            </label>
            <Controller
              control={control}
              name="cellPhoneNumber"
              render={({ field: { onChange, value } }) => (
                <Input
                  type="tel"
                  maxLength={13}
                  size="large"
                  value={value ?? ""}
                  placeholder="휴대폰 번호를 입력해 주세요"
                  className="w-full lg:h-[48px]"
                  onChange={(e) => {
                    const formattedNumber = formatPhoneNumber(e.target.value);
                    setPhoneValue(formattedNumber);
                    onChange(formattedNumber);
                  }}
                  />
              )}
            />
          </div>
        </div>

        {/* 에러 툴팁 */}
        {formError && (
          <div className="w-full mt-[24px] lg:mt-[32px]">
            <LoginErrorAlert>
              {formError}
            </LoginErrorAlert>
          </div>
        )}

        {/* 버튼 */}
        <Button
          className={cn(
            "w-full font-semibold mt-auto lg:mt-[40px] lg:h-[56px] lg:text-lg",
            !isFormValid && "bg-gray40 text-white cursor-not-allowed"
          )}
          type="submit"
          disabled={!isFormValid}
        >
          계정 정보 확인하기
        </Button>
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

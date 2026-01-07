import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import Button from "@/components/common/Button";
import Checkbox from "@/components/common/Checkbox";
import Input from "@/components/common/Input";
import ErrorText from "@/components/common/ErrorText";
import LoginErrorAlert from "./LoginErrorAlert";
import { LoginValues } from "@/schema/common/Auth.schema";

// PageClientInput 컴포넌트 수정
interface PageClientInputProps {
  isSaveAccount: boolean;
  onSaveAccountChange: (checked: boolean) => void;
  errorMessage?: string;
}

export default function PageClientInput({
  isSaveAccount,
  onSaveAccountChange,
  errorMessage
}: PageClientInputProps) {
  const { control, watch } = useFormContext<LoginValues>();
  const [isAutoLogin, setIsAutoLogin] = useState(false);
  
  // 입력값 감시
  const loginId = watch("loginId");
  const password = watch("password");
  
  // 로그인 버튼 활성화 조건: 아이디와 비밀번호가 모두 입력되어야 함
  const isButtonDisabled = !loginId || !password || loginId.trim() === "" || password.trim() === "";

  return (
    <div className="flex flex-col gap-[32px] items-start w-full lg:gap-[32px] h-full lg:h-auto">
      {/* 입력 필드 영역 */}
      <div className="flex flex-col gap-[16px] items-start w-full">
        <div className="flex flex-col gap-[8px] items-start w-full">
          <Controller
            name="loginId"
            control={control}
            render={({ field }) => (
              <Input
                maxLength={64}
                type="email"
                {...field}
                size="large"
                placeholder="아이디(이메일)"
                className="w-full lg:mt-0 lg:mb-0 lg:h-[48px] lg:text-sm lg:px-[16px] lg:py-[14px]"
                onInvalid={(e) => {
                  e.preventDefault();
                }}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input
                maxLength={20}
                {...field}
                type="password"
                size="large"
                placeholder="비밀번호"
                className="w-full lg:h-[48px] lg:text-sm lg:px-[16px] lg:py-[14px]"
                onInvalid={(e) => {
                  e.preventDefault();
                }}
              />
            )}
          />
        </div>

        {/* 체크박스 영역 */}
        <div className="flex items-center justify-start w-full gap-[24px] lg:justify-start">
          <Checkbox
            label="계정 정보 저장"
            checked={isSaveAccount}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onSaveAccountChange(e.target.checked)
            }
          />
          {/* 자동 로그인 체크박스 - 모바일/PC 공통 표시 */}
          <Checkbox
            label="자동 로그인"
            checked={isAutoLogin}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setIsAutoLogin(e.target.checked)
            }
          />
        </div>
      </div>

      {/* 버튼 영역 */}
      <div className="flex flex-col gap-[20px] items-center w-full lg:gap-[20px] mt-auto lg:mt-0">
        {/* 에러 툴팁 - 로그인 버튼 위에 표시 (모바일/PC 공통) */}
        {errorMessage && (
          <div className="w-full">
            <LoginErrorAlert className="">
              {errorMessage}
            </LoginErrorAlert>
          </div>
        )}

        <Button
          className={cn(
            "w-[calc(100%-8px)] mt-auto lg:w-full lg:h-[56px] lg:text-lg lg:font-semibold lg:mt-0",
            isButtonDisabled && "bg-gray40 text-white cursor-not-allowed"
          )}
          type="submit"
          disabled={isButtonDisabled}
        >
          로그인
        </Button>
      </div>
    </div>
  );
}

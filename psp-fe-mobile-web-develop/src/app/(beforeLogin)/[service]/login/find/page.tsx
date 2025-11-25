"use client";

import { ApiError } from "@/types/HttpClient.type";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useShallow } from "zustand/react/shallow";
import { findUserInfo } from "@/apis/common/authApis";
import Button from "@/components/common/Button";
import ErrorText from "@/components/common/ErrorText";
import Input from "@/components/common/Input";
import { FindInfoSchema, FindInfoValues } from "@/schema/common/Auth.schema";
import { useSaveUserInfo } from "@/stores/useSaveUserInfo";
import { formatPhoneNumber } from "@/utils/formatUtils";

const Page = () => {
  const [formError, setFormError] = useState<string>("");
  const { register, handleSubmit, control } = useForm<FindInfoValues>({
    resolver: zodResolver(FindInfoSchema),
    mode: "onSubmit"
  });
  const { setUser } = useSaveUserInfo(
    useShallow((state) => ({
      setUser: state.setUser
    }))
  );

  const router = useRouter();

  const handleVerification = async (name: string, cellPhoneNumber: string) => {
    try {
      const response = await findUserInfo({
        name,
        cellPhoneNumber
      });

      if (response.code === 0) {
        console.log(response);
        setUser({ ...response });
        router.push(`find/success`);
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
    <section className="animate-fade-in px-[6.4%] pt-[60px]">
      <h4 className="text-[20px] text-black font-bold text-left block">
        계정 정보 찾기
      </h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col bg-white w-full rounded-t-[32px] "
      >
        <div className="mt-[20px] mb-[12px]">
          <label htmlFor="name" className="inline-block mb-[8px]">
            이름
          </label>
          <Input
            maxLength={20}
            type="text"
            size="large"
            placeholder="이름을 입력해 주세요."
            className="w-full "
            {...register("name")}
          />
        </div>

        <div>
          <label htmlFor="phone" className="inline-block mb-[8px]">
            전화번호
          </label>
          <Controller
            control={control}
            name="cellPhoneNumber"
            render={({ field: { onChange, value } }) => (
              <Input
                type="tel"
                maxLength={13}
                value={value ?? ""}
                placeholder="담당자 휴대전화를 입력해 주세요."
                className="w-[100%] h-[48px] p-[16px_12px] placeholder:text-[14px]"
                onChange={(e) => {
                  const formattedNumber = formatPhoneNumber(e.target.value);
                  onChange(formattedNumber);
                }}
              />
            )}
          />
        </div>

        <Button
          className="w-[calc(100%)] font-semibold mt-[20px]"
          type="submit"
        >
          계정 정보 확인
        </Button>

        {/* login error code */}
        {formError && (
          <ErrorText className="whitespace-pre-wrap leading-error-text-heigth mt-[32px]">
            {formError}
          </ErrorText>
        )}
      </form>
    </section>
  );
};

export default Page;

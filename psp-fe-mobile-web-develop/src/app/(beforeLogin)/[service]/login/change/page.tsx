"use client";

import { ApiError } from "@/types/HttpClient.type";
import { ChangePsswordFormValues } from "@/types/store/employee/ChangePassword.type";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { putChangePassword } from "@/apis/common/commonApis";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import HeaderContainer from "@/components/header/HeaderContainer";
import { Label } from "@/components/ui/label";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/hooks/use-toast";
import { ChangePasswordSchema } from "@/schema/store/empolyee/ChangePassword.schema";
import { cn } from "@/lib/utils";

export default function Page() {
  const router = useRouter();
  const params = useParams();
  const service = params.service as string;
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch
  } = useForm<ChangePsswordFormValues>({
    mode: "onChange",
    resolver: zodResolver(ChangePasswordSchema)
  });

  // 입력값 감시
  const password = watch("password");
  const currentPassword = watch("currentPassword");
  const newPassword = watch("newPassword");

  // 버튼 활성화 조건: 모든 필드가 입력되고, 신규 비밀번호와 확인 비밀번호가 일치해야 함
  const isButtonDisabled = !password || !currentPassword || !newPassword || 
    password.trim() === "" || currentPassword.trim() === "" || newPassword.trim() === "" ||
    currentPassword !== newPassword;

  const RenderCheckError = () => {
    if (errors.password) {
      return (
        <p className="text-fail text-[12px] font-medium">
          {errors.password?.message}
        </p>
      );
    }
    if (errors.newPassword) {
      return (
        <p className="text-fail text-[12px] font-medium">
          {errors.newPassword?.message}
        </p>
      );
    }
    return (
      <p className="text-fail text-[12px] font-medium">
        {errors.currentPassword?.message}
      </p>
    );
  };

  const onSubmit = async (data: ChangePsswordFormValues) => {
    try {
      console.log(data);
      const putPassword = {
        currentPassword: data.password,
        newPassword: data.newPassword
      };
      const response = await putChangePassword(putPassword);
      console.log(response);
      toast({
        title: "비밀번호가 변경 되었습니다."
      });
      router.push(`/${params.service}`);
    } catch (errors: any) {
      [400, 401, 403].includes(errors?.code) &&
        toast({
          title: "비밀번호 변경이 실패했습니다.",
          description: `${(errors as ApiError).message}`,
          action: <ToastAction altText="닫기">닫기</ToastAction>
        });
    }
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col bg-white w-full lg:shadow-[5px_5px_45px_0px_rgba(214,215,246,0.42)] lg:w-[540px] lg:h-[648px] lg:relative lg:justify-start lg:flex-shrink-0 lg:rounded-[4px] px-[16px] lg:px-[90px] pt-[20px] lg:pt-[60px] pb-[40px] lg:pb-[60px]"
      >
        {/* 제목 */}
        <h1 className="text-[20px] lg:text-[28px] text-black font-bold text-left block mb-[24px] lg:mb-[32px]">
          비밀번호 수정
        </h1>

        {/* 입력 필드 영역 */}
        <div className="flex flex-col gap-[24px] lg:gap-[32px] mb-[32px] lg:mb-[40px]">
          {/* 현재 비밀번호 */}
          <div className="flex flex-col gap-[8px]">
            <Label className="text-[14px] lg:text-[16px] text-black font-['Pretendard:Medium',sans-serif] font-medium">
              현재 비밀번호
            </Label>
            <Input
              maxLength={20}
              type="password"
              minLength={8}
              size="large"
              placeholder="비밀번호를 입력해 주세요."
              className="w-full lg:h-[48px]"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-fail text-[12px] font-medium">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* 신규 비밀번호 */}
          <div className="flex flex-col gap-[8px]">
            <Label className="text-[14px] lg:text-[16px] text-black font-['Pretendard:Medium',sans-serif] font-medium">
              신규 비밀번호
            </Label>
            <Input
              maxLength={20}
              type="password"
              minLength={8}
              size="large"
              placeholder="신규 비밀번호를 입력해 주세요."
              className="w-full lg:h-[48px]"
              {...register("currentPassword")}
            />
            {errors.currentPassword && (
              <p className="text-fail text-[12px] font-medium">
                {errors.currentPassword.message}
              </p>
            )}
          </div>

          {/* 신규 비밀번호 확인 */}
          <div className="flex flex-col gap-[8px]">
            <Label className="text-[14px] lg:text-[16px] text-black font-['Pretendard:Medium',sans-serif] font-medium">
              신규 비밀번호 확인
            </Label>
            <Input
              maxLength={20}
              type="password"
              minLength={8}
              size="large"
              placeholder="신규 비밀번호를 한번 더 입력해 주세요."
              className="w-full lg:h-[48px]"
              {...register("newPassword")}
            />
            {errors.newPassword && (
              <p className="text-fail text-[12px] font-medium">
                {errors.newPassword.message}
              </p>
            )}
          </div>
        </div>

        {/* 버튼 */}
        <div className="mt-auto lg:mt-0">
          <Button 
            type="submit" 
            className={cn(
              "w-full lg:h-[56px] lg:text-lg font-semibold",
              isButtonDisabled && "bg-gray40 text-white cursor-not-allowed"
            )}
            disabled={isButtonDisabled}
          >
            비밀번호 수정하기
          </Button>
        </div>
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
}

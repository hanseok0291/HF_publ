"use client";

import { ApiError } from "@/types/HttpClient.type";
import { ChangePsswordFormValues } from "@/types/store/employee/ChangePassword.type";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { putChangePassword } from "@/apis/common/commonApis";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import MainContainer from "@/components/common/MainContainer";
import CloseHeader from "@/components/header/CloseHeader";
import { Label } from "@/components/ui/label";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/hooks/use-toast";
import { ChangePasswordSchema } from "@/schema/store/empolyee/ChangePassword.schema";

export default function Page() {
  const router = useRouter();
  const params = useParams();
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<ChangePsswordFormValues>({
    mode: "onChange",
    resolver: zodResolver(ChangePasswordSchema)
  });
  const handleBack = () => {
    router.back();
  };

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
    <MainContainer>
      <CloseHeader onClose={() => handleBack()} title="비밀번호 수정" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="px-[20px] flex flex-col justify-between h-svh"
      >
        <div className="flex flex-col gap-[24px] justify-between mb-[32px]">
          <div className="flex flex-col gap-[8px]">
            <Label className="text-[16px] font-bold">현재 비밀번호</Label>
            <div className="flex items-center gap-[8px]">
              <Input
                maxLength={20}
                type="password"
                minLength={8}
                placeholder="새로운 비밀번호를 입력해 주세요."
                className="w-[100%] h-[48px] p-[16px_12px] placeholder:text-[14px]"
                {...register("password")}
              />
            </div>
          </div>

          <div className="flex flex-col gap-[8px]">
            <Label className="text-[16px] font-bold">신규 비밀번호</Label>
            <div className="flex items-center gap-[8px]">
              <Input
                maxLength={20}
                type="password"
                minLength={8}
                placeholder="새로운 비밀번호를 입력해 주세요."
                className="w-[100%] h-[48px] p-[16px_12px] placeholder:text-[14px]"
                {...register("currentPassword")}
              />
            </div>
          </div>

          <div className="flex flex-col gap-[8px]">
            <Label className="text-[16px] font-bold">신규 비밀번호 확인</Label>
            <div className="flex items-center gap-[8px]">
              <Input
                maxLength={20}
                type="password"
                minLength={8}
                placeholder="다시 비밀번호를 입력해 주세요."
                className="w-[100%] h-[48px] p-[16px_12px] placeholder:text-[14px]"
                {...register("newPassword")}
              />
            </div>
          </div>
          {<RenderCheckError />}
        </div>

        <Button type="submit" className="w-full mb-[40px]">
          비밀번호 수정
        </Button>
      </form>
    </MainContainer>
  );
}

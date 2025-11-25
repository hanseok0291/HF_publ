"use client";

import { MyInfoResponseType } from "@/types/apiType/Common.type";
import { ApiError } from "@/types/HttpClient.type";
import { AddEmployeeFormValues } from "@/types/store/employee/AddEmployee.type";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { getMyInfo, putMyInfo } from "@/apis/common/commonApis";
import Loading from "@/app/loading";
import { toast } from "@/hooks/use-toast";
import { useDebounce } from "@/hooks/useDebounce";
import { AddEmployeeSchema } from "@/schema/store/empolyee/AddEmployee.schema";
import EmailInput from "./EmailInput";
import LoginVerifySection from "./LoginVerifySection";
import NameInput from "./NameInput";
import PasswordSection from "./PasswordSection";
import PhoneInput from "./PhoneInput";
import TelephoneInput from "./TelephoneInput";

export default function ProfileFormClient() {
  const router = useRouter();
  const [myInfo, setMyInfo] = useState<MyInfoResponseType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const form = useForm<AddEmployeeFormValues>({
    resolver: zodResolver(AddEmployeeSchema)
  });

  const { handleSubmit, setValue, watch } = form;

  // 데이터 불러오기
  useEffect(() => {
    const fetchMyInfo = async () => {
      console.log("내 정보 불러오기 시작");
      try {
        const response = await getMyInfo();
        console.log("내 정보 응답:", response);
        setMyInfo(response.content);

        // 불러온 데이터로 폼 필드 설정
        setValue("name", response.content.name || "");
        setValue("email", response.content.loginId || "");
        setValue("telePhoneNumber", response.content.telePhoneNumber || "");
        setValue("cellPhoneNumber", response.content.cellPhoneNumber || "");
        setValue(
          "secondAuthKindCode",
          response.content.secondAuthKindCode ?? "SCD_AUTH_001"
        );
      } catch (error) {
        console.error("내 정보 불러오기 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyInfo();
  }, [setValue]);

  // 값 변경 감지
  const telePhoneNumberValue = watch("telePhoneNumber");
  const cellPhoneNumberValue = watch("cellPhoneNumber");
  const secondAuthKindCodeValue = watch("secondAuthKindCode");

  // 디바운스 적용
  const debouncedTelephone = useDebounce(telePhoneNumberValue ?? "", 500);
  const debouncedCellPhone = useDebounce(cellPhoneNumberValue ?? "", 500);
  const debouncedAuthCode = useDebounce(secondAuthKindCodeValue ?? "", 500);

  // 값 변경 시 자동 업데이트
  useEffect(() => {
    const updateInfo = async () => {
      try {
        const updateData = {
          telePhoneNumber: debouncedTelephone,
          cellPhoneNumber: debouncedCellPhone,
          secondAuthKindCode: debouncedAuthCode
        };

        // 기존 값과 새 값을 비교
        const isChanged =
          debouncedTelephone !== myInfo?.telePhoneNumber ||
          debouncedCellPhone !== myInfo?.cellPhoneNumber ||
          debouncedAuthCode !== myInfo?.secondAuthKindCode;

        // 값이 변경된 경우에만 업데이트
        if (isChanged) {
          await putMyInfo(updateData);
          toast({ title: "정보 업데이트 성공 했습니다." });
        }
      } catch (error) {
        toast({
          title: "오류가 발생했습니다.",
          description: `${(error as ApiError).message}`
        });
      }
    };

    // 초기 로딩이 끝나고 값이 있는 경우에만 업데이트
    if (
      !isLoading &&
      myInfo &&
      (debouncedTelephone || debouncedCellPhone || debouncedAuthCode)
    ) {
      updateInfo();
    }
  }, [
    debouncedTelephone,
    debouncedCellPhone,
    debouncedAuthCode,
    isLoading,
    myInfo
  ]);

  const onSubmit = (data: AddEmployeeFormValues) => {
    try {
      console.log("폼 제출 데이터:", data);
    } catch (errors) {
      console.error("폼 제출 오류:", errors);
    }
  };

  return (
    <FormProvider {...form}>
      <form className="px-[20px] pb-[72px]" onSubmit={handleSubmit(onSubmit)}>
        <section className="flex flex-col gap-[32px]">
          {isLoading && myInfo && <Loading />}
          {!myInfo && !isLoading && (
            <p>데이터 불러오는 과정에 문제가 발생했습니다.</p>
          )}
          {!isLoading && myInfo && (
            <>
              <NameInput />
              <EmailInput />
              <TelephoneInput />
              <PhoneInput />
              <PasswordSection />
              <LoginVerifySection />
            </>
          )}
        </section>
      </form>
    </FormProvider>
  );
}

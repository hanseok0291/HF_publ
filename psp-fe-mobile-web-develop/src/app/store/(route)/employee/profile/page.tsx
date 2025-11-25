"use client";

import { MyInfoResponseType } from "@/types/apiType/Common.type";
import { AddEmployeeFormValues } from "@/types/store/employee/AddEmployee.type";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { getMyInfo, putMyInfo } from "@/apis/common/commonApis";
import { loginVerifyOptions } from "@/app/constant/employee/MockCustomRadioGroup.data";
import Button from "@/components/common/Button";
import CustomRadioGroup from "@/components/common/CustomRadioGroup";
import ErrorMessage from "@/components/common/ErrorMessage";
import LoadingMessage from "@/components/common/LoadingMessage";
import MainContainer from "@/components/common/MainContainer";
import ArrowHeader from "@/components/header/ArrowHeader";
import { Label } from "@/components/ui/label";
import ProfileFormField from "./_components/ProfileFormField";

export default function Page() {
  const router = useRouter();
  const [myInfo, setMyInfo] = useState<MyInfoResponseType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { control, handleSubmit, setValue, watch } =
    useForm<AddEmployeeFormValues>({
      mode: "onChange"
    });

  useEffect(() => {
    const fetchMyInfo = async () => {
      try {
        console.log("데이터 불러오는 중...");
        const response = await getMyInfo();
        setMyInfo(response.content);

        // 불러온 데이터로 폼 필드 초기화
        setValue("telePhoneNumber", response.content.telePhoneNumber || "");
        setValue("cellPhoneNumber", response.content.cellPhoneNumber || "");
        setValue(
          "secondAuthKindCode",
          response.content.secondAuthKindCode || ""
        );
      } catch (error) {
        console.error("데이터 불러오기 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMyInfo();
  }, [setValue]);

  useEffect(() => {
    if (myInfo) {
      if (myInfo.secondAuthKindCode === "SCD_AUTH_001") {
        console.log(myInfo.secondAuthKindCode);
        setValue("secondAuthKindCode", "SCD_AUTH_001");
      }
      if (myInfo.secondAuthKindCode === "SCD_AUTH_002") {
        setValue("secondAuthKindCode", "SCD_AUTH_002");
      }
    }
  }, [myInfo]);

  const telePhoneNumberValue = watch("telePhoneNumber");
  const cellPhoneNumberValue = watch("cellPhoneNumber");
  const secondAuthKindCodeValue = watch("secondAuthKindCode");

  useEffect(() => {
    const updateInfo = async () => {
      try {
        const updateData = {
          telePhoneNumber: telePhoneNumberValue || "-",
          cellPhoneNumber: cellPhoneNumberValue || "-",
          secondAuthKindCode: secondAuthKindCodeValue || "-"
        };
        await putMyInfo(updateData);
      } catch (error) {
        console.error(error);
      }
    };

    if (
      telePhoneNumberValue ||
      cellPhoneNumberValue ||
      secondAuthKindCodeValue
    ) {
      updateInfo();
    }
  }, [telePhoneNumberValue, cellPhoneNumberValue, secondAuthKindCodeValue]);

  if (isLoading) return <LoadingMessage title="내 정보 확인 및 수정" />;
  if (!myInfo) return <ErrorMessage title="내 정보 확인 및 수정" />;

  const handleClick = () => {
    router.push("/store/employee/profile/change");
  };
  return (
    <MainContainer>
      <ArrowHeader headerTitle="내 정보 확인 및 수정" />
      <form className="px-[20px] pb-[72px]">
        <section className="flex flex-col gap-[32px]">
          <ProfileFormField
            control={control}
            label="이름"
            name="name"
            placeholder="담당자 이름을 입력해 주세요."
            defaultValue={myInfo.name ?? "null"}
            disabled
          />
          <ProfileFormField
            control={control}
            label="아이디"
            name="email"
            placeholder="담당자 이메일을 입력해 주세요."
            defaultValue={myInfo.loginId ?? "null"}
            disabled
          />
          <ProfileFormField
            label="유선번호"
            control={control}
            name="telePhoneNumber"
            type="tel"
            maxLength={13}
            defaultValue={myInfo.telePhoneNumber}
            placeholder="담당자 유선번호를 입력해 주세요.(선택값)"
            // onValueChange={(value) =>
            //   handleFieldUpdate("telePhoneNumber", value)
            // }
          />

          <ProfileFormField
            label="휴대전화"
            control={control}
            name="cellPhoneNumber"
            type="tel"
            maxLength={13}
            defaultValue={myInfo.cellPhoneNumber}
            placeholder="담당자 휴대전화번호를 입력해 주세요."
            // onValueChange={(value) =>
            //   handleFieldUpdate("cellPhoneNumber", value)
            // }
          />
          <div className="flex flex-col gap-[12px]">
            <Label className="text-[16px] font-bold">비밀번호</Label>
            <div className="flex items-center gap-[8px]">
              <Button
                type="button"
                buttonType="outline"
                className="p-[12px_36px] w-[96px] h-[48px] whitespace-nowrap"
                onClick={() => handleClick()}
              >
                변경
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-[12px]">
            <Label className="text-[16px] font-bold">로그인 2차 인증</Label>
            <CustomRadioGroup
              control={control}
              name="secondAuthKindCode"
              options={loginVerifyOptions}
            />
          </div>
        </section>
      </form>
    </MainContainer>
  );
}

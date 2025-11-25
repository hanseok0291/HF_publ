"use client";

import { EmployeeDetailResponseType } from "@/types/apiType/employee/Employee.type";
import { ApiError } from "@/types/HttpClient.type";
import { EditEmployeeFormValues } from "@/types/store/employee/AddEmployee.type";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { getAuthorityGroupDropDown } from "@/apis/employee/authorityGroupApis";
import {
  getEmployeeDetail,
  putEmployeeDetail
} from "@/apis/employee/employeeApis";
import ErrorMessage from "@/components/common/ErrorMessage";
import LoadingMessage from "@/components/common/LoadingMessage";
import MainContainer from "@/components/common/MainContainer";
import CloseHeader from "@/components/header/CloseHeader";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/hooks/use-toast";
import { EditEmployeeSchema } from "@/schema/store/empolyee/AddEmployee.schema";
import EmailInput from "./EmailInput";
import LoginVerifyInput from "./LoginVerifyInput";
import NameInput from "./NameInput";
import PasswordInput from "./PasswordInput";
import PcLogInfo from "./PcLogInfo";
import PhoneInput from "./PhoneInput";
import RenderModal from "./RenderModal";
import SelectedPowerDrawer from "./SelectedPowerDrawer";
import TelephoneInput from "./TelephoneInput";
import UseAccountInput from "./UseAccountInput";

export type DropDownType = {
  authorityGroupId: string;
  authorityGroupName: string;
};
export default function DetailFormClient({ keyManId }: { keyManId?: string }) {
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState<EmployeeDetailResponseType | null>(null);
  const [submit, setSubmit] = useState(false);
  const router = useRouter();
  const [dropdown, setDropdown] = useState<DropDownType[]>([]);
  const form = useForm<EditEmployeeFormValues>({
    mode: "onSubmit",
    resolver: zodResolver(EditEmployeeSchema)
  });
  const {
    handleSubmit,
    reset,
    watch,
    getValues,
    formState: { errors }
  } = form;
  const value = watch("authorityGroupId");

  useEffect(() => {
    console.log(value);
    console.log(errors);
  }, []);
  // 관리자 ID 없을 경우 api 호출 하지 않음
  if (!keyManId) {
    toast({ title: "관리자 ID가 존재하지 않습니다." });
    return;
  }

  // 관리자 리스트 받아오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getEmployeeDetail({
          keyManId: keyManId
        });
        setResult(response.content);
      } catch (error) {
        console.error("직원 정보 조회 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [keyManId]);

  // 관리자 권한 드롭다운 메뉴 api
  useEffect(() => {
    const fetchData = async () => {
      const response = await getAuthorityGroupDropDown();
      console.log(response);
      setDropdown(response.content);
    };
    fetchData();
  }, []);

  // api data set
  useEffect(() => {
    if (result && !getValues("authorityGroupId")) {
      console.log(result);
      reset({
        keyManId: keyManId,
        authorityGroupId: result.authorityGroupId,
        secondAuthKindCode: result.secondAuthKindCode,
        useYn: result.useYn,
        telePhoneNumber: result.telePhoneNumber,
        cellPhoneNumber: result.cellPhoneNumber
      });
    }
  }, [result, reset, keyManId]);

  useEffect(() => {
    if (Object.keys(form.formState.errors).length > 0) {
      toast({
        title: "입력창 오류가 발생했습니다.",
        description: JSON.stringify(form.formState.errors, null, 2),
        action: (
          <ToastAction altText="닫기" className="sm:right-0 sm:bottom-0">
            닫기
          </ToastAction>
        )
      });
    }
  }, [form.formState.errors]);

  const onSubmit = async (data: EditEmployeeFormValues) => {
    console.log("Form submitted with data:", data);
    try {
      const response = await putEmployeeDetail(data);
      console.log(data);
      console.log(response);
      if (response) {
        toast({
          description: "직원 정보가 성공적으로 수정되었습니다.",
          action: (
            <ToastAction altText="닫기" className="sm:right-0 sm:bottom-0">
              닫기
            </ToastAction>
          )
        });
        router.push("/store/employee/list");
      }
    } catch (error: any) {
      toast({ description: `${(error as ApiError).message}` });
    }
  };

  const handleClose = () => {
    router.push("/store/employee/list");
  };

  if (isLoading) return <LoadingMessage title="구매 내역 상세" />;
  if (!result || !dropdown) return <ErrorMessage title="구매 내역 상세" />;

  return (
    <FormProvider {...form}>
      <MainContainer>
        <CloseHeader title="담당자 정보 상세" onClose={handleClose} />
        <form
          className="px-[20px] flex flex-col gap-[32px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <NameInput name={result.name} />
          <EmailInput email={result.email} />
          <PasswordInput adminId={result.keyManId} />
          <LoginVerifyInput secondAuthKindCode={result.secondAuthKindCode} />
          <UseAccountInput useYn={result.useYn} />
          <TelephoneInput />
          <PhoneInput />
          <SelectedPowerDrawer dropdown={dropdown} />
          <PcLogInfo />
          <RenderModal onSubmit={handleSubmit(onSubmit)} />
        </form>
      </MainContainer>
    </FormProvider>
  );
}

"use client";

import { ApiError } from "@/types/HttpClient.type";
import { AddEmployeeFormValues } from "@/types/store/employee/AddEmployee.type";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { getAuthorityGroupDropDown } from "@/apis/employee/authorityGroupApis";
import { postEmployeeInfo } from "@/apis/employee/employeeApis";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/hooks/use-toast";
import { AddEmployeeSchema } from "@/schema/store/empolyee/AddEmployee.schema";
import { DropDownType } from "../../detail/[id]/_components/DetailFormClient";
import AdminPowerInput from "./AdminPowerInput";
import EmailInput from "./EmailInput";
import LoginVerifyInput from "./LoginVerifyInput";
import NameInput from "./NameInput";
import PasswordInput from "./PasswordInput";
import PhoneInput from "./PhoneInput";
import RenderModal from "./RenderModal";
import TelephoneInput from "./TelephoneInput";
import UseAccountInput from "./UseAccountInput";

export default function SelectedPowerFormClient() {
  const [dropdown, setDropdown] = useState<DropDownType[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<AddEmployeeFormValues>({
    mode: "onSubmit",
    resolver: zodResolver(AddEmployeeSchema),
    defaultValues: {
      name: "",
      email: "",
      authorityGroupId: ""
    }
  });
  const { handleSubmit } = form;
  const router = useRouter();
  // 관리자 권한 드롭다운 메뉴 api
  useEffect(() => {
    const fetchData = async () => {
      const response = await getAuthorityGroupDropDown();
      console.log(response);
      setDropdown(response.content);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const errorMessage = Object.values(form.formState.errors)[0];
    if (errorMessage) {
      toast({
        title: errorMessage.message
      });
    }
  }, [form.formState.errors]);

  const onSubmit = async (data: AddEmployeeFormValues) => {
    try {
      setIsSubmitting(true);
      const convertedData = {
        ...data,
        useYn: data.useYn as boolean,
        telePhoneNumber: data.telePhoneNumber ?? null
      };
      const response = await postEmployeeInfo(convertedData);
      console.log(response);
      router.push(`/store/employee/list`);
      toast({
        title: "등록되었습니다.",
        action: <ToastAction altText="닫기">닫기</ToastAction>
      });
    } catch (error: any) {
      toast({ description: `${(error as ApiError).message}` });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <section className="px-[16px]">
          <section className="pt-[8px] pb-[16px] flex flex-col gap-[32px]">
            <NameInput />
            <EmailInput />
            <PasswordInput />
            <LoginVerifyInput />
            <UseAccountInput />
            <TelephoneInput />
            <PhoneInput />
            <AdminPowerInput dropdown={dropdown} />
            <RenderModal
              onSubmit={handleSubmit(onSubmit)}
              isSubmitting={isSubmitting}
            />
          </section>
        </section>
      </form>
    </FormProvider>
  );
}

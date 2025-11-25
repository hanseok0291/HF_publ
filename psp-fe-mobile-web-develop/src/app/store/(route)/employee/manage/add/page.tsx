"use client";

import { ApiError } from "@/types/HttpClient.type";
import {
  AddAdminPowerFormValues,
  MenuResponse
} from "@/types/store/employee/AddAdminPower.type";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { postAuthorityGroup } from "@/apis/employee/authorityGroupApis";
import getMenuAll from "@/app/constant/employee/AddAdminPowerData.data";
import { DataTable } from "@/components/common/DataTable";
import Input from "@/components/common/Input";
import Modal from "@/components/common/Modal";
import CloseHeader from "@/components/header/CloseHeader";
import { columns } from "@/components/table-columns/stores/employee/AddAdminPowerColumns";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

export default function Page() {
  const router = useRouter();
  const [submit, setSubmit] = useState(false);
  const [data, setData] = useState<MenuResponse[]>([]);
  const [filteredData, setFilteredData] = useState<MenuResponse[]>([]);
  const [showCloseModal, setShowCloseModal] = useState(false);
  const form = useForm<AddAdminPowerFormValues>({
    defaultValues: {
      authorityGroupName: "",
      menuList: []
    }
  });
  const { register, handleSubmit, watch, reset } = form;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMenuAll();
        console.log(response);
        if (response.code === 0) {
          setData(response.content);
          setFilteredData(response.content);
          reset({
            menuList: response.content.flatMap((menu) => [
              {
                menuId: menu.menuId,
                inquiryYn: menu.inquiryYn,
                editYn: menu.editYn,
                parentMenuId: ""
              },
              ...(menu.children?.map((child) => ({
                menuId: child.menuId,
                inquiryYn: child.inquiryYn,
                editYn: child.editYn,
                parentMenuId: menu.menuId
              })) || [])
            ])
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleClose = () => {
    router.back();
  };

  const onSubmit = async (data: AddAdminPowerFormValues) => {
    try {
      const response = await postAuthorityGroup(watch());
      if (response.code === 0) {
        router.push("/store/employee/manage");
      }
    } catch (error) {
      toast({ description: `${(error as ApiError).message}` });
    }
  };

  return (
    <FormProvider {...form}>
      <section className="animate-fade-in flex-grow h-svh overflow-y-auto">
        <CloseHeader
          title="직원 권한 정보 등록"
          onClose={() => setShowCloseModal(true)}
        />
        <form
          className="px-[20px] h-svh flex flex-col flex-grow justify-between"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex-grow">
            <div className="flex flex-col gap-[12px] mb-[32px]">
              <Label className="text-[16px] font-bold">
                권한명<span className="text-fail">*</span>
              </Label>
              <Input
                maxLength={64}
                type="text"
                placeholder="권한명을 입력해 주세요."
                className="w-[100%] h-[48px] p-[16px_12px] placeholder:text-[14px] disabled:bg-gray20 disabled:border-gray40"
                {...register("authorityGroupName")}
              />
            </div>
            <AccessPower data={filteredData} columns={columns} />
          </div>

          <Modal
            trigger="저장"
            description={`직원 권한 정보를 \n신규 등록하시겠습니까?`}
            open={submit}
            onOpenChange={() => {
              if (
                watch("authorityGroupName").replace(/\s+/g, "").length === 0 &&
                submit === false
              ) {
                toast({ description: "권한명은 필수 입력 항목입니다." });
                return;
              }

              setSubmit(!submit);
            }}
            onConfirm={handleSubmit(onSubmit)}
            cancelButton={{ text: "취소" }}
            confirmButton={{ text: "등록" }}
            triggerClassName="flex w-full flex-1 justify-center items-center max-h-[52px] border-none rounded bg-main text-white font-semibold mb-[40px]"
          />
          <Modal
            description={`작성 중인 내용이 있습니다\n나가시겠습니까?`}
            open={showCloseModal}
            onOpenChange={setShowCloseModal}
            onConfirm={() => handleClose()}
            cancelButton={{ text: "취소" }}
            confirmButton={{ text: "확인" }}
          />
        </form>
      </section>
    </FormProvider>
  );
}
interface AccessPowerProps {
  columns: ColumnDef<MenuResponse, any>[];
  data: MenuResponse[];
}

const AccessPower = ({ columns, data }: AccessPowerProps) => {
  return (
    <div className="p-[12px] rounded border-[1px] border-solid border-gray40">
      <p className="text-[14px] text-gray80 font-semibold mb-[12px]">
        [판매소 메뉴 관리]
      </p>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

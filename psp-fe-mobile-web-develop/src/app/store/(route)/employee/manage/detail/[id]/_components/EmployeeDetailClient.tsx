"use client";

import { ApiError } from "@/types/HttpClient.type";
import {
  AddAdminPowerFormValues,
  AuthorityGroupDetailType,
  MenuResponse
} from "@/types/store/employee/AddAdminPower.type";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import {
  deleteAuthorityGroup,
  getAuthorityGroupDetail,
  putAuthorityGroup
} from "@/apis/employee/authorityGroupApis";
import Button from "@/components/common/Button";
import { DataTable } from "@/components/common/DataTable";
import Input from "@/components/common/Input";
import MainContainer from "@/components/common/MainContainer";
import Modal from "@/components/common/Modal";
import CloseHeader from "@/components/header/CloseHeader";
import { columns } from "@/components/table-columns/stores/employee/AddAdminPowerColumns";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { formatDateWithTime } from "@/utils/formatUtils";

export default function EmployeeDetailClient({
  authorityGroupId
}: {
  authorityGroupId: string;
}) {
  const router = useRouter();
  const [data, setData] = useState<AuthorityGroupDetailType>();
  const [filteredData, setFilteredData] = useState<MenuResponse[]>([]);
  const [isDeleteModal, setDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const form = useForm<AddAdminPowerFormValues>({
    mode: "onSubmit",
    defaultValues: {
      authorityGroupName: "",
      authorityGroupId: authorityGroupId,
      menuList: []
    }
  });

  const { handleSubmit, reset, register } = form;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAuthorityGroupDetail({
          authorityGroupId: authorityGroupId
        });

        if (response.code === 0) {
          setData(response.content);
          setFilteredData(response.content.menuList);
          reset({
            authorityGroupId: authorityGroupId,
            authorityGroupName: response.content.authorityGroupName,
            menuList: response.content.menuList.flatMap((menu) => [
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
      } catch (error: any) {
        toast({ description: `${(error as ApiError).message}` });
      }
    };

    fetchData();
  }, [authorityGroupId]);

  const handleClose = () => {
    router.push("/store/employee/manage");
  };

  const onSubmit = async (data: AddAdminPowerFormValues) => {
    try {
      const response = await putAuthorityGroup({
        ...data,
        authorityGroupId
      });
      console.log(response);
      console.log("submit : ", data);
      router.push("/store/employee/manage");
    } catch (error: any) {
      toast({ description: `${(error as ApiError).message}` });
    }
  };

  const onDelete = async () => {
    try {
      const response = await deleteAuthorityGroup({
        authorityGroupId: authorityGroupId
      });
      console.log("delete :", response);
      router.push("/store/employee/manage");
    } catch (error: any) {
      toast({ description: `${(error as ApiError).message}` });
    }
  };

  return (
    <FormProvider {...form}>
      <MainContainer>
        <CloseHeader title="직원 권한 정보 상세" onClose={handleClose} />
        <form className="px-[20px] flex flex-col gap-[32px]">
          <div className="flex flex-col gap-[12px]">
            <Label className="text-[16px] font-bold">권한명</Label>
            <Input
              maxLength={64}
              type="text"
              placeholder="권한명을 입력해 주세요."
              className="w-[100%] h-[48px] p-[16px_12px] placeholder:text-[14px] disabled:bg-gray20 disabled:border-gray40"
              defaultValue={data?.authorityGroupName || ""}
              {...register("authorityGroupName")}
            />
          </div>
          <div className="flex flex-col gap-[12px]">
            <Label className="text-[16px] font-bold">최근 수정 담당자</Label>
            <p className="w-[100%] h-auto p-[16px_12px] whitespace-pre-wrap bg-gray20 placeholder:text-[14px] disabled:bg-gray20 disabled:border-gray40 border border-gray40 rounded outline-none focus:border-black">
              {data?.updateUserName ?? "-"}({data?.updateUserEmail ?? "-"})
              <br />
              {formatDateWithTime(data?.updatedDate ?? "", "detail")}
            </p>
          </div>
          <AccessPower data={filteredData} columns={columns} />

          <div className="flex gap-2 mb-[40px]">
            <Button
              buttonType="cancel"
              onClick={(e) => {
                e.preventDefault();
                setDeleteModal(true);
              }}
            >
              삭제
            </Button>
            <Button
              type="button"
              className="flex-1"
              onClick={() => {
                setShowEditModal(true);
              }}
            >
              수정
            </Button>
          </div>
          <Modal
            open={showEditModal}
            onOpenChange={setShowEditModal}
            onConfirm={handleSubmit(onSubmit)}
            description={`해당 판매소 담당자 메뉴 권한을\n수정 하시겠습니까?`}
            cancelButton={{ text: "취소" }}
            confirmButton={{ text: "확인" }}
          />
        </form>
        <Modal
          open={isDeleteModal}
          onOpenChange={setDeleteModal}
          onConfirm={() => onDelete()}
          description={`직원 권한을 삭제 \n 하시겠습니까?`}
          cancelButton={{ text: "취소" }}
          confirmButton={{ text: "확인" }}
        />
      </MainContainer>
    </FormProvider>
  );
}

type AccessPowerType = {
  columns: ColumnDef<MenuResponse, any>[];
  data: MenuResponse[];
};

const AccessPower = ({ columns, data }: AccessPowerType) => {
  return (
    <div className="p-[12px] rounded border-[1px] border-solid border-gray40">
      <p className="text-[14px] text-gray80 font-semibold mb-[12px]">
        [판매소 메뉴 관리]
      </p>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

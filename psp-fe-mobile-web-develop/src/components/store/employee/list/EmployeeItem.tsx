"use client";

import { useState } from "react";
import Link from "next/link";
import Modal from "@/components/common/Modal";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/hooks/use-toast";
import { useTempPassword } from "@/hooks/useTempPassword";
import EmployeeName from "./EmployeeName";

export type EmployeeItemType = {
  keyManId: string;
  name: string;
  email: string;
  telePhoneNumber: string;
  cellPhoneNumber: string;
  authorityGroupName: string | null;
  useYn: true;
};

export default function EmployeeItem({ item }: { item: EmployeeItemType }) {
  const [tempPassWord, setTempPassWord] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const adminId = item.keyManId;

  if (!adminId) {
    toast({
      title: "관리자 ID가 존재 하지 않습니다.",
      description: "다시 로그인 하시거나 관리자에게 문의해주세요.",
      action: <ToastAction altText="닫기">닫기</ToastAction>
    });
  }

  const { refreshTempPassword, isLoading } = useTempPassword(adminId);

  const handleClick = async () => {
    try {
      await refreshTempPassword();
      setTempPassWord(false);
      toast({
        title: "임시 비밀번호 발급에 성공했습니다.",
        action: <ToastAction altText="닫기">닫기</ToastAction>
      });
    } catch (error) {
      toast({
        title: "임시 비밀번호 발급에 실패했습니다.",
        action: <ToastAction altText="닫기">닫기</ToastAction>
      });
    }
  };

  const employeeList = [
    { id: 1, text: "이메일", data: item.email },
    { id: 2, text: "유선전화", data: item.telePhoneNumber },
    { id: 3, text: "휴대전화", data: item.cellPhoneNumber }
  ];

  return (
    <section className="shadow-menu_container bg-white p-[16px]">
      <Link
        href={`/store/employee/list/detail/${item.keyManId}`}
        className="mb-[12px] flex flex-col gap-[12px]"
      >
        <EmployeeName
          title={item.name}
          subTitle={item.authorityGroupName ?? "-"}
          listNum={item.keyManId}
        />
        <hr className="bg-[#ECECEC]" />
        {employeeList.map((item) => (
          <div className="flex justify-between items-center" key={item.id}>
            <p className="text-gray80 text-[12px] font-medium">{item.text}</p>
            <p className="text-black text-[12px] font-normal">{item.data}</p>
          </div>
        ))}
      </Link>

      {showButton && (
        <Modal
          trigger="임시 비밀번호 발급"
          description={`사용자 비밀번호 초기화 및\n임시 비밀번호를 발급하시겠습니까?`}
          open={tempPassWord}
          onOpenChange={() => setTempPassWord(!tempPassWord)}
          onConfirm={handleClick}
          cancelButton={{ text: "취소" }}
          confirmButton={{
            text: "확인",
            disabled: isLoading
          }}
          triggerClassName="flex w-full justify-center items-center p-[12px_48px] rounded bg-white text-[14px] border-[1px] border-solid border-black text-black font-semibold self-start"
        />
      )}
    </section>
  );
}

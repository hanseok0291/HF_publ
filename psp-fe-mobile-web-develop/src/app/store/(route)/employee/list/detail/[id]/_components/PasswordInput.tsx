import { AddEmployeeFormValues } from "@/types/store/employee/AddEmployee.type";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import Input from "@/components/common/Input";
import Modal from "@/components/common/Modal";
import { Label } from "@/components/ui/label";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/hooks/use-toast";
import { useTempPassword } from "@/hooks/useTempPassword";

export default function PasswordInput({ adminId }: { adminId: string }) {
  const { control, handleSubmit } = useFormContext<AddEmployeeFormValues>();
  const [tempPassWord, setTempPassWord] = useState(false);

  const { refreshTempPassword } = useTempPassword(adminId);

  const handleTempPasswordClick = async () => {
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

  const onSubmit = (data: AddEmployeeFormValues) => {
    try {
      console.log(data);
      handleTempPasswordClick();
    } catch (errors) {
      console.error(errors);
    }
  };
  return (
    <div className="flex flex-col gap-[12px]">
      <div className="flex items-center justify-between">
        <Label className="text-[16px] font-bold">비밀번호</Label>

        <Modal
          trigger="임시 비밀번호 발급"
          description={`사용자 비밀번호 초기화 및\n임시 비밀번호를 발급하시겠습니까?`}
          open={tempPassWord}
          onOpenChange={() => setTempPassWord(!tempPassWord)}
          onConfirm={handleSubmit(onSubmit)}
          cancelButton={{ text: "취소" }}
          triggerClassName="flex justify-center items-center p-[12px_16px] rounded bg-white text-[14px] border-[1px] border-solid border-black text-black font-semibold self-start"
        />
      </div>
      {/* <Controller
        name="password"
        control={control}
        render={({ field: { value } }) => (
          <Input
            disabled={true}
            type="password"
            placeholder="담당자 이름을 입력해 주세요."
            className="w-[100%] h-[48px] p-[16px_12px] placeholder:text-[14px] disabled:bg-gray20 disabled:border-gray40"
            value={value}
          />
        )}
      /> */}
      <Input
        maxLength={20}
        disabled={true}
        type="password"
        placeholder="비밀번호를 입력해 주세요."
        className="w-[100%] h-[48px] p-[16px_12px] placeholder:text-[14px] disabled:bg-gray20 disabled:border-gray40"
        readOnly
      />
    </div>
  );
}

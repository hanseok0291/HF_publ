import { AddEmployeeFormValues } from "@/types/store/employee/AddEmployee.type";
import { Controller, useFormContext } from "react-hook-form";
import Input from "@/components/common/Input";
import { Label } from "@/components/ui/label";

export default function EmailInput() {
  const { control } = useFormContext<AddEmployeeFormValues>();
  return (
    <div className="flex flex-col gap-[12px]">
      <Label className="text-[16px] font-bold">아이디</Label>
      <Controller
        name="email"
        control={control}
        render={({ field: { value } }) => (
          <Input
            maxLength={64}
            disabled={true}
            type="email"
            placeholder="담당자 이메일을 입력해 주세요."
            className="w-[100%] h-[48px] p-[16px_12px] placeholder:text-[14px] disabled:bg-gray20 disabled:border-gray40"
            value={value}
          />
        )}
      />
    </div>
  );
}

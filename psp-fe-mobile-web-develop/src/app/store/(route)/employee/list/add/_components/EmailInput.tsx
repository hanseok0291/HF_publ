import { AddEmployeeFormValues } from "@/types/store/employee/AddEmployee.type";
import { Controller, useFormContext } from "react-hook-form";
import Input from "@/components/common/Input";
import { Label } from "@/components/ui/label";

export default function EmailInput() {
  const { control } = useFormContext<AddEmployeeFormValues>();
  return (
    <div className="flex flex-col gap-[12px]">
      <Label className="text-[16px] font-bold">
        이메일<span className="text-fail">*</span>
      </Label>
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <Input
            maxLength={64}
            {...field}
            type="email"
            placeholder="담당자 이메일을 입력해 주세요."
            className="w-[100%] h-[48px] p-[16px_12px] placeholder:text-[14px]"
          />
        )}
      />
    </div>
  );
}

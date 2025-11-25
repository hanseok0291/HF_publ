import { AddEmployeeFormValues } from "@/types/store/employee/AddEmployee.type";
import { Controller, useFormContext } from "react-hook-form";
import Input from "@/components/common/Input";
import { Label } from "@/components/ui/label";

export default function NameInput({ name }: { name: string }) {
  const { control } = useFormContext<AddEmployeeFormValues>();
  return (
    <div className="flex flex-col gap-[12px]">
      <Label className="text-[16px] font-bold">이름</Label>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <Input
            maxLength={20}
            {...field}
            disabled={true}
            type="text"
            placeholder="담당자 이름을 입력해 주세요."
            className="w-[100%] h-[48px] p-[16px_12px] placeholder:text-[14px] disabled:bg-gray20 disabled:border-gray40"
            value={name}
          />
        )}
      />
    </div>
  );
}

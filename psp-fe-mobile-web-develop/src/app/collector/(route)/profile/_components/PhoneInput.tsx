import { AddEmployeeFormValues } from "@/types/store/employee/AddEmployee.type";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import Input from "@/components/common/Input";
import { Label } from "@/components/ui/label";
import { formatPhoneNumber } from "@/utils/formatUtils";

export default function PhoneInput() {
  const { control } = useFormContext<AddEmployeeFormValues>();
  const handlePhone = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (value: string) => void
  ) => {
    const phoneNumber = formatPhoneNumber(e.target.value);
    onChange(phoneNumber);
  };
  return (
    <div className="flex flex-col gap-[12px]">
      <Label className="text-[16px] font-bold">휴대전화</Label>
      <Controller
        name="cellPhoneNumber"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            type="tel"
            value={value}
            maxLength={13}
            placeholder="담당자 휴대전화를 입력해 주세요."
            className="w-[100%] h-[48px] p-[16px_12px] placeholder:text-[14px]"
            onChange={(e) => handlePhone(e, onChange)}
          />
        )}
      />
    </div>
  );
}

"use client";

import { AddEmployeeFormValues } from "@/types/store/employee/AddEmployee.type";
import { useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import Input from "@/components/common/Input";
import { Label } from "@/components/ui/label";
import { formatPhoneNumber } from "@/utils/formatUtils";

export default function TelephoneInput() {
  const { control } = useFormContext<AddEmployeeFormValues>();
  const telePhoneInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col gap-[12px]">
      <Label className="text-[16px] font-bold">유선번호</Label>

      <Controller
        control={control}
        name="telePhoneNumber"
        render={({ field: { onChange, value, ref } }) => (
          <Input
            type="tel"
            value={value || ""}
            maxLength={13}
            placeholder="담당자 유선번호를 입력해 주세요.(선택값)"
            className="w-[100%] h-[48px] p-[16px_12px] placeholder:text-[14px]"
            ref={(e) => {
              ref(e);
              telePhoneInputRef.current = e;
            }}
            onChange={(e) => {
              const formattedNumber = formatPhoneNumber(e.target.value);
              onChange(formattedNumber);
            }}
          />
        )}
      />
    </div>
  );
}

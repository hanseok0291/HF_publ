"use client";

import { AddEmployeeFormValues } from "@/types/store/employee/AddEmployee.type";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useAccountOptions } from "@/app/constant/employee/MockCustomRadioGroup.data";
import CustomRadioGroup from "@/components/common/CustomRadioGroup";
import { Label } from "@/components/ui/label";

export default function UseAccountInput({ useYn }: { useYn: boolean }) {
  const { control, setValue } = useFormContext<AddEmployeeFormValues>();

  useEffect(() => {
    if (useYn === true) {
      setValue("useYn", true);
    } else {
      setValue("useYn", false);
    }
  }, [useYn, setValue]);
  return (
    <div className="flex flex-col gap-[12px]">
      <Label className="text-[16px] font-bold">계정 사용 가능 여부</Label>
      <CustomRadioGroup
        control={control}
        name="useYn"
        options={useAccountOptions}
      />
    </div>
  );
}

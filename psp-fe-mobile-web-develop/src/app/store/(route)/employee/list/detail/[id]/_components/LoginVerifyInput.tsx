import { AddEmployeeFormValues } from "@/types/store/employee/AddEmployee.type";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { loginVerifyOptions } from "@/app/constant/employee/MockCustomRadioGroup.data";
import CustomRadioGroup from "@/components/common/CustomRadioGroup";
import { Label } from "@/components/ui/label";

export default function LoginVerifyInput({
  secondAuthKindCode
}: {
  secondAuthKindCode: string;
}) {
  const { control, setValue } = useFormContext<AddEmployeeFormValues>();

  useEffect(() => {
    if (secondAuthKindCode === "SCD_AUTH_001") {
      setValue("secondAuthKindCode", "SCD_AUTH_001");
    }
    if (secondAuthKindCode === "SCD_AUTH_002") {
      setValue("secondAuthKindCode", "SCD_AUTH_002");
    }
  }, [secondAuthKindCode, setValue]);

  return (
    <div className="flex flex-col gap-[12px]">
      <Label className="text-[16px] font-bold">
        로그인 2차 인증<span className="text-fail">*</span>
      </Label>
      <CustomRadioGroup
        control={control}
        name="secondAuthKindCode"
        options={loginVerifyOptions}
      />
    </div>
  );
}

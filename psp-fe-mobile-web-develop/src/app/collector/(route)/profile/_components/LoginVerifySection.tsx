import { AddEmployeeFormValues } from "@/types/store/employee/AddEmployee.type";
import { useFormContext } from "react-hook-form";
import CustomRadioGroup from "@/components/common/CustomRadioGroup";
import { Label } from "@/components/ui/label";
import { AUTH_METHOD_ENUM } from "@/enums/Employee.enum";

export default function LoginVerifySection() {
  const { control } = useFormContext<AddEmployeeFormValues>();
  const loginVerifyOptions = [
    { label: "이메일", value: AUTH_METHOD_ENUM.Values.SCD_AUTH_001 },
    { label: "휴대전화", value: AUTH_METHOD_ENUM.Values.SCD_AUTH_002 }
  ];

  return (
    <div className="flex flex-col gap-[12px]">
      <Label className="text-[16px] font-bold">로그인 2차 인증</Label>
      <CustomRadioGroup
        control={control}
        name="secondAuthKindCode"
        options={loginVerifyOptions}
      />
    </div>
  );
}

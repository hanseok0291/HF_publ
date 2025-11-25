import { AddEmployeeFormValues } from "@/types/store/employee/AddEmployee.type";
import { useFormContext } from "react-hook-form";
import CustomRadioGroup from "@/components/common/CustomRadioGroup";
import { Label } from "@/components/ui/label";

export default function UseAccountInput() {
  const { control } = useFormContext<AddEmployeeFormValues>();
  const useAccountOptions = [
    { label: "사용", value: JSON.parse("true") },
    { label: "미사용", value: JSON.parse("false") }
  ];
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

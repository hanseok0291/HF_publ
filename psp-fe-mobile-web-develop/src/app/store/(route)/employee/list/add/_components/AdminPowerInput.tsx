import { AddEmployeeFormValues } from "@/types/store/employee/AddEmployee.type";
import { Controller, useFormContext } from "react-hook-form";
import { useShallow } from "zustand/react/shallow";
import BasicDrawer from "@/components/common/BasicDrawer";
import CustomDrawerContent from "@/components/common/CustomDrawerContent";
import { Label } from "@/components/ui/label";
import useDrawerSelect from "@/stores/useDrawerSelect";
import { DropDownType } from "../../detail/[id]/_components/DetailFormClient";

export default function AdminPowerInput({
  dropdown
}: {
  dropdown: DropDownType[];
}) {
  const { control } = useFormContext<AddEmployeeFormValues>();
  const { selectedPower, setSelectedPower } = useDrawerSelect(
    useShallow((state) => ({
      selectedPower: state.selectedAdminPower,
      setSelectedPower: state.setSelectedAdminPower
    }))
  );
  console.log(dropdown);
  const dropdownData = dropdown.map((item) => ({
    id: Number(item.authorityGroupId),
    content: item.authorityGroupName,
    value: String(item.authorityGroupId)
  }));

  return (
    <div className="flex flex-col gap-[12px]">
      <Label className="text-[16px] font-bold">관리자 권한</Label>
      <Controller
        name="authorityGroupId"
        control={control}
        render={({ field: { onChange, value } }) => (
          <BasicDrawer
            value={value}
            onChange={onChange}
            title="권한명"
            drawerTitle="관리자 권한 선택"
            selectedValue={selectedPower}
            onSelect={setSelectedPower}
            Content={CustomDrawerContent}
            contentProps={{
              data: dropdownData
            }}
          />
        )}
      />
    </div>
  );
}

import { EditEmployeeFormValues } from "@/types/store/employee/AddEmployee.type";
import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useShallow } from "zustand/react/shallow";
import BasicDrawer from "@/components/common/BasicDrawer";
import CustomDrawerContent from "@/components/common/CustomDrawerContent";
import { Label } from "@/components/ui/label";
import useDrawerSelect from "@/stores/useDrawerSelect";
import { DropDownType } from "./DetailFormClient";

export default function SelectedPowerDrawer({
  dropdown
}: {
  dropdown: DropDownType[];
}) {
  const { control } = useFormContext<EditEmployeeFormValues>();
  const { selectedPower, setSelectedPower } = useDrawerSelect(
    useShallow((state) => ({
      selectedPower: state.selectedAdminPower,
      setSelectedPower: state.setSelectedAdminPower
    }))
  );

  const dropdownData = dropdown.map((item) => ({
    id: Number(item.authorityGroupId),
    content: item.authorityGroupName,
    value: String(item.authorityGroupId)
  }));

  useEffect(() => {
    console.log(dropdown);
    console.log(dropdownData);
  }, []);

  return (
    <div className="flex flex-col gap-[12px]">
      <Label className="text-[16px] font-bold">관리자 권한</Label>
      <Controller
        name="authorityGroupId"
        control={control}
        render={({ field: { onChange, value } }) => (
          <BasicDrawer
            value={value ? value : undefined}
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

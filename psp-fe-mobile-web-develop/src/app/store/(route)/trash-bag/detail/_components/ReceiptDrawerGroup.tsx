import { Controller, useFormContext } from "react-hook-form";
import { useShallow } from "zustand/react/shallow";
import {
  receiptStatus,
  receiptType
} from "@/app/constant/waste-sticker/DetailCustomDrawerContent.data";
import BasicDrawer from "@/components/common/BasicDrawer";
import CustomDrawerContent from "@/components/common/CustomDrawerContent";
import useDrawerSelect from "@/stores/useDrawerSelect";
import { TrashBagListParam } from "../page";

export default function ReceiptDrawerGroup() {
  const { control } = useFormContext<TrashBagListParam>();
  const {
    selectedReceiptStatus,
    setSelectedReceiptStatus,
    selectedReceiptType,
    setSelectedReceiptType
  } = useDrawerSelect(
    useShallow((state) => ({
      selectedReceiptStatus: state.selectedReceiptStatus,
      setSelectedReceiptStatus: state.setSelectedReceiptStatus,
      selectedReceiptType: state.selectedReceiptType,
      setSelectedReceiptType: state.setSelectedReceiptType
    }))
  );

  const handeChange = (
    value: string,
    onChange: (value: boolean | null) => void
  ) => {
    if (value === "null") {
      return onChange(null);
    }
    if (value !== "null") {
      return onChange(value === "true");
    }
  };
  return (
    <div className="flex gap-[8px]">
      <Controller
        name="receiptYn"
        control={control}
        render={({ field: { onChange, value } }) => (
          <BasicDrawer
            value={String(value)}
            onChange={(newValue) => handeChange(newValue, onChange)}
            drawerTitle="조회 수령여부 선택"
            title="수령여부"
            selectedValue={selectedReceiptStatus}
            onSelect={setSelectedReceiptStatus}
            Content={CustomDrawerContent}
            contentProps={{
              data: receiptStatus
            }}
          />
        )}
      />

      <Controller
        name="receiptTypeCode"
        control={control}
        render={({ field: { onChange, value } }) => (
          <BasicDrawer
            value={String(value)}
            onChange={onChange}
            drawerTitle="조회 수령방식 선택"
            title="수령방식"
            selectedValue={selectedReceiptType}
            onSelect={setSelectedReceiptType}
            Content={CustomDrawerContent}
            contentProps={{
              data: receiptType
            }}
          />
        )}
      />
    </div>
  );
}

import { Controller, useFormContext } from "react-hook-form";
import { useShallow } from "zustand/react/shallow";
import {
  receiptStatus,
  receiptType
} from "@/app/constant/waste-sticker/DetailCustomDrawerContent.data";
import BasicDrawer from "@/components/common/BasicDrawer";
import { WasteItem } from "@/components/common/CheckboxDrawerContent";
import CustomDrawerContent from "@/components/common/CustomDrawerContent";
import useDrawerSelect from "@/stores/useDrawerSelect";
import { WasteStickerListParam } from "../page";

export default function ReceiptDrawerGroup() {
  const { control } = useFormContext<WasteStickerListParam>();
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

  const handleChange = (
    value: string,
    onChange: (value: boolean | null) => void
  ) => {
    onChange(value === "null" ? null : value === "true");
  };

  const handleTypeChange = (
    value: string,
    onChange: (value: string | null) => void
  ) => {
    onChange(value === "null" ? null : value);
  };

  const receiptStatusData: WasteItem[] = Array.isArray(receiptStatus)
    ? receiptStatus.map((item) => ({
        wasteId: decodeURIComponent(item.value),
        standardName: item.content
      }))
    : [];
  return (
    <div className="flex gap-[8px]">
      <Controller
        name="receiptYn"
        control={control}
        render={({ field: { onChange, value } }) => (
          <BasicDrawer
            value={String(value)}
            // value={value === null ? "null" : value}
            onChange={(newValue) => handleChange(newValue, onChange)}
            drawerTitle="조회 수령여부 선택"
            title="수령여부"
            // value={selectedReceiptStatus}
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
            value={value === null ? "null" : value}
            onChange={(newValue) => handleTypeChange(newValue, onChange)}
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

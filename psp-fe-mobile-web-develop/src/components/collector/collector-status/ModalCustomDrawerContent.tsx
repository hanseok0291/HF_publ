"use client";

import { FC } from "react";
import EtcChip from "@/components/store/etc/EtcChip";
import { COLLECT_STATUS_MAPPING_ENUM } from "@/enums/WasteSticker.enum";
import { cn } from "@/lib/utils";

export type CustomDrawerContentProps = {
  data: Array<{
    id: number;
    content: string;
    value: string;
  }>;
  onSelect?: (value: string, isNavigation: boolean) => void;
  setIsOpen?: (value: boolean) => void;
  selectedValue?: string;
};

const ModalCustomDrawerContent: FC<CustomDrawerContentProps> = ({
  data,
  onSelect,
  setIsOpen,
  selectedValue
}) => {
  const handleItemClick = (value: string) => {
    setIsOpen?.(false);
    onSelect?.(value, false);
  };

  const mappingValue =
    COLLECT_STATUS_MAPPING_ENUM[selectedValue ? selectedValue : ""];
  return (
    <div className="flex flex-col gap-4">
      {data.map((item) => (
        <div
          key={item.id}
          onClick={() => handleItemClick(item.value)}
          className={`flex items-center space-x-2 ${mappingValue === item.value && "pointer-events-none"}`}
        >
          <span
            className={cn(
              "w-full cursor-pointer flex items-center gap-[6px] text-[14px] font-medium text-left p-2 rounded transition-colors",
              "hover:bg-gray-100",
              mappingValue === item.value ? "font-bold" : "text-gray-600"
            )}
          >
            {item.content}
            {mappingValue === item.value && <EtcChip text="현재 작업 상태" />}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ModalCustomDrawerContent;

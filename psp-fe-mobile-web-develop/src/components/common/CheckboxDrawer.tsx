"use client";

import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import CheckboxDrawerContent, { WasteItem } from "./CheckboxDrawerContent";

type WasteDrawerProps = {
  className?: string;
  title: string;
  drawerTitle: string;
  data: WasteItem[];
  showArrow?: boolean;
  onSelect?: (value: string) => void;
  onChange?: (value: string) => void;
  onFilterChange?: (filteredItems: WasteItem[]) => void;
  value?: string;
  defaultValue?: string;
  allSelectLabel?: string;
  allSelectAsEmpty?: boolean; // 전체 선택 시 빈 값을 보낼지 여부
  reset?: boolean;
  resetComplete?: () => void;
};

export default function CheckboxDrawer({
  className,
  title,
  drawerTitle,
  data,
  showArrow = true,
  onSelect,
  onChange,
  onFilterChange,
  value,
  defaultValue,
  allSelectLabel,
  allSelectAsEmpty = false, // 기본값은 false로 설정
  reset,
  resetComplete
}: WasteDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<WasteItem[]>([]);

  const DRAWER_BUTTON_STYLE = cn(
    "flex rounded items-center bg-white justify-between border-[1px] border-solid border-gray40 p-[12px] flex-1",
    "hover:border-gray-400 transition-colors",
    className
  );

  // 선택된 항목에 대한 텍스트 표시 계산
  const getDisplayContent = () => {
    if (selectedItems.length === 0) return title;
    if (selectedItems.length === data.length) return allSelectLabel;
    if (selectedItems.length <= 2) {
      return selectedItems.map((item) => item.standardName).join(", ");
    }
    return `${selectedItems.length}개 항목 선택됨`;
  };

  // 필터 변경 핸들러
  const handleFilterChange = (items: WasteItem[]) => {
    setSelectedItems(items);
    if (onFilterChange) {
      onFilterChange(items);
    }
  };

  // 선택 핸들러
  const handleSelect = (newValue: string, isNavigation?: boolean) => {
    if (onChange) {
      onChange(newValue);
    }

    if (onSelect) {
      onSelect(newValue);
    }

    if (isNavigation) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (reset === true) {
      setSelectedItems([]);
      getDisplayContent();
      if (resetComplete) {
        resetComplete();
      }
    }
  }, [reset]);

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger className={DRAWER_BUTTON_STYLE}>
        <p
          className={cn(
            "text-[12px] font-medium tablet_col:text-[0.875rem]",
            selectedItems.length > 0 ? "text-gray-900" : "text-gray-500"
          )}
        >
          {getDisplayContent()}
        </p>
        {showArrow && (
          <div className="relative flex items-center justify-center">
            <ChevronDown
              className={`absolute transition-all duration-300 ease-in-out ${
                isOpen
                  ? "rotate-180 scale-75 opacity-0"
                  : "rotate-0 scale-100 opacity-100"
              }`}
              size={16}
              color="#A5A5A5"
            />
            <ChevronUp
              className={`transition-all duration-300 ease-in-out ${
                isOpen
                  ? "rotate-0 scale-100 opacity-100"
                  : "-rotate-180 scale-75 opacity-0"
              }`}
              size={16}
              color="#A5A5A5"
            />
          </div>
        )}
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{drawerTitle}</DrawerTitle>
        </DrawerHeader>
        <DrawerFooter>
          <CheckboxDrawerContent
            data={data}
            setIsOpen={setIsOpen}
            onSelect={handleSelect}
            onFilterChange={handleFilterChange}
            selectedValue={defaultValue}
            value={value}
            allSelectAsEmpty={allSelectAsEmpty}
          />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

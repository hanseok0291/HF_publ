import { ComponentType, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "../ui/drawer";
import { CustomDrawerContentProps } from "./CustomDrawerContent";

type BasicDrawerType = {
  className?: string;
  title: string;
  drawerTitle: string;
  Content: ComponentType<CustomDrawerContentProps>;
  contentProps: Omit<CustomDrawerContentProps, "setIsOpen" | "selectedValue">;
  selectedValue?: string;
  showArrow?: boolean;
  onSelect?: (value: string) => void;
  updateTrigger?: boolean;
  value?: string;
  onChange?: (value: string) => void;
};

export default function BasicDrawer({
  className,
  title,
  drawerTitle,
  Content,
  contentProps,
  showArrow = true,
  onSelect,
  updateTrigger = true,
  value,
  onChange
}: BasicDrawerType) {
  const [isOpen, setIsOpen] = useState(false);

  const DRAWER_BUTTON_STYLE = cn(
    "flex rounded items-center bg-white justify-between border-[1px] border-solid border-gray40 p-[12px] flex-1",
    "hover:border-gray-400 transition-colors",
    className
  );

  // selectedValue에 해당하는 content를 찾는 함수
  const getDisplayContent = () => {
    if (!value || !contentProps.data) return title;

    // "null" 값이면 "전체" 항목을 선택한 것으로 처리
    if (value === "null") {
      const allItem = contentProps.data.find(
        (item) => item.id === 0 && item.value === "null"
      );
      return allItem ? allItem.content : title;
    }

    // 콤마로 구분된 여러 값이 있으면 확인
    if (value.includes(",")) {
      // 모든 항목이 선택되었는지 확인
      const allItems = contentProps.data.filter(
        (item) => item.value !== "null"
      );
      const selectedValues = value.split(",");

      // 전체 항목이 선택되었는지 확인 (값들의 개수가 전체 항목 수와 동일)
      if (
        selectedValues.length === allItems.length &&
        allItems.every((item) => selectedValues.includes(item.value))
      ) {
        const allItem = contentProps.data.find(
          (item) => item.id === 0 && item.value === "null"
        );
        return allItem ? allItem.content : title;
      }

      // 여러 항목이 선택된 경우 첫 번째 항목 + "외 N개" 형식으로 표시
      const firstItem = contentProps.data.find(
        (item) => item.value === selectedValues[0]
      );
      if (firstItem) {
        return `${firstItem.content} 외 ${selectedValues.length - 1}개`;
      }
    }

    // 단일 항목 선택 처리
    const selectedItem = contentProps.data.find((item) => item.value === value);
    return selectedItem ? selectedItem.content : title;
  };

  return (
    <Drawer
      open={isOpen}
      onOpenChange={(isOpen) => {
        setIsOpen(isOpen);
      }}
    >
      <BasicDrawerTrigger
        triggerClassName={DRAWER_BUTTON_STYLE}
        isOpen={isOpen}
        displayContent={getDisplayContent()}
        showArrow={showArrow}
        title={title}
        updateTrigger={updateTrigger}
      />
      <DrawerContent>
        <DrawerClose>
          <DrawerHeader>
            <DrawerTitle>{drawerTitle}</DrawerTitle>
          </DrawerHeader>
          <DrawerFooter>
            <Content
              {...contentProps}
              selectedValue={value}
              setIsOpen={setIsOpen}
              onSelect={(newValue, isNavigation = true) => {
                onChange?.(newValue);
                onSelect?.(newValue);
                if (isNavigation) {
                  setIsOpen(false);
                }
              }}
            />
          </DrawerFooter>
        </DrawerClose>
      </DrawerContent>
    </Drawer>
  );
}

type BasicDrawerTriggerType = {
  triggerClassName: string;
  displayContent: string;
  updateTrigger: boolean;
  title: string;
  showArrow: boolean;
  isOpen: boolean;
};

const BasicDrawerTrigger = ({
  isOpen,
  displayContent,
  showArrow,
  title,
  triggerClassName,
  updateTrigger
}: BasicDrawerTriggerType) => {
  return (
    <DrawerTrigger className={triggerClassName}>
      <p
        className={cn(
          "text-[12px] font-medium tablet_col:text-[0.875rem]",
          displayContent !== title ? "text-gray-900" : "text-gray-500"
        )}
      >
        {updateTrigger ? displayContent : title}
      </p>
      {showArrow && (
        <div className="relative flex items-center justify-center">
          <ChevronDown
            className={`absolute transition-all duration-300 ease-in-out ${isOpen ? "rotate-180 scale-75 opacity-0" : "rotate-0 scale-100 opacity-100"}`}
            size={16}
            color="#A5A5A5"
          />
          <ChevronUp
            className={`transition-all duration-300 ease-in-out ${isOpen ? "rotate-0 scale-100 opacity-100" : "-rotate-180 scale-75 opacity-0"}`}
            size={16}
            color="#A5A5A5"
          />
        </div>
      )}
    </DrawerTrigger>
  );
};

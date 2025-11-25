import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Checkbox } from "../ui/checkbox";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "../ui/drawer";

type FilteringDropDownMenu<TData> = {
  className?: string;
  data: TData[];
  onFilterChange: (id: string, title: string) => void; // 선택된 ID를 부모 컴포넌트에 보내는 함수
  title: string;
  drawerTitle: string;
};

export default function FilterDrawer<
  TData extends { id: string; standardName: string }
>({
  className,
  data,
  onFilterChange,
  title,
  drawerTitle
}: FilteringDropDownMenu<TData>) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string>(""); // '전체'가 기본적으로 선택되어 있음

  useEffect(() => {}, [selectedId, onFilterChange]);

  const handleItemToggle = (id: string, title: string) => {
    if (id === "") {
      setSelectedId(""); // '전체' 선택 해제 방지, 항상 '전체' 선택 유지
    }
    setSelectedId(id); // 전체 선택을 해제할 수 없도록, 항상 특정 아이템 선택
    console.log("###################", id);
    onFilterChange(id, title);
  };

  const isAllSelected = selectedId === ""; // '전체' 선택 상태 확인

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger
        className={cn(
          "flex rounded items-center justify-between border-[1px] border-solid border-gray40 p-[14px_12px] flex-1",
          className
        )}
      >
        <p className="text-[12px] font-medium tablet_col:text-[0.875rem]">
          {title}
        </p>
        <div className="relative flex items-center justify-center">
          <ChevronDown
            className={`absolute transition-all duration-300 ease-in-out ${isOpen ? "rotate-180 scale-75 opacity-0" : "rotate-0 scale-100 opacity-100"} `}
            size={16}
            color="#A5A5A5"
          />
          <ChevronUp
            className={`transition-all duration-300 ease-in-out ${isOpen ? "rotate-0 scale-100 opacity-100" : "-rotate-180 scale-75 opacity-0"} `}
            size={16}
            color="#A5A5A5"
          />
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{drawerTitle}</DrawerTitle>
        </DrawerHeader>
        <DrawerFooter className="max-h-[300px] overflow-x-auto">
          <div className="flex items-center gap-[10px]">
            <Checkbox
              checked={isAllSelected}
              onCheckedChange={() => handleItemToggle("", "전체")} // 클릭해도 상태 변화 없음
            />
            <span>전체</span>
          </div>
          {data.map((item) => (
            <div key={item.id} className="flex items-center gap-[10px]">
              <Checkbox
                checked={selectedId === item.id}
                onCheckedChange={() =>
                  handleItemToggle(item.id, item.standardName)
                }
              />
              <span>{item.standardName}</span>
            </div>
          ))}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

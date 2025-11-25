"use client";

import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

type DropDownMenuType = {
  label: string;
  options: string[];
  isReadOnly?: boolean;
  onSelect?: (value: string) => void; // 부모 컴포넌트로 값을 전달하기 위한 콜백 함수
  className?: string;
  resetLabel?: string;
  showContent?: boolean;
};

const DropDownMenu: React.FC<DropDownMenuType> = ({
  label,
  options,
  isReadOnly,
  onSelect,
  className,
  resetLabel,
  showContent = true
}) => {
  const [selectedOption, setSelectedOption] = useState<string>(label);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (resetLabel) {
      setSelectedOption(label);
    }
  }, [resetLabel, label]);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    if (onSelect) {
      onSelect(option);
    }
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger
        className={`flex items-center justify-between min-w-[21vw] rounded-sm border border-[#DDD] h-[2.5rem] ${isReadOnly ? "bg-[#F4F4F4] p-[0.8rem_0.7rem]" : "bg-white p-[0.8rem_0.7rem] hover:border-[#3C7CFD] hover:bg-[#F6F9FF]"}`}
        disabled={isReadOnly}
      >
        <p className="text-left text-[12px] font-medium tablet_col:text-[0.875rem]">
          {selectedOption}
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
      </DropdownMenuTrigger>
      {showContent && (
        <DropdownMenuContent
          className={`max-h-[10rem] min-w-[21vw] cursor-pointer overflow-y-auto rounded-sm border border-gray-300 bg-white p-[0.5rem]`}
        >
          {options.map((option, index) => (
            <DropdownMenuItem
              key={index}
              className="cursor-pointer rounded-sm text-[0.875rem] font-medium text-gray-800 hover:bg-gray-100"
              onClick={() => handleSelect(option)}
            >
              {option}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
};

export default DropDownMenu;

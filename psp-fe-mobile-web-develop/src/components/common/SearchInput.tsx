import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface SearchInputProps {
  className?: string;
  placeholder?: string;
  initialValue?: string;
  onClick?: () => void;
  isDebounce?: boolean;
  useInstantSearch?: boolean;
  debounceTime?: number;
  setKeyword: (query: string) => void;
}

export default function SearchInput({
  className,
  placeholder = "검색어를 입력해 주세요.",
  initialValue = "",
  onClick,
  isDebounce = false,
  useInstantSearch = false,
  debounceTime = 300,
  setKeyword
}: SearchInputProps) {
  const [inputValue, setInputValue] = useState(initialValue);
  const [searchValue, setSearchValue] = useState("");
  const [showXButton, setShowXButton] = useState(false);

  const debouncedValue = useDebounce(searchValue, debounceTime);

  useEffect(() => {
    setInputValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (isDebounce && debouncedValue.trim() !== "") {
      triggerSearch(debouncedValue);
    }
  }, [debouncedValue, isDebounce]);

  const handleSearch = () => {
    // isDebounce가 false일 때는 Enter나 Search 버튼 클릭 시 검색 실행
    if (!isDebounce && inputValue.trim() !== "") {
      triggerSearch(inputValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const triggerSearch = (query: string) => {
    setKeyword?.(query);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setShowXButton(newValue.length > 0);

    if (useInstantSearch) {
      triggerSearch(newValue);
    } else {
      setSearchValue(newValue);
    }

    if (newValue === "") {
      setKeyword?.("");
    }
  };

  const handleClearInput = () => {
    setInputValue("");
    setSearchValue("");
    setShowXButton(false);
    setKeyword?.("");
  };

  const handleFocus = () => {
    if (inputValue) setShowXButton(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowXButton(false);
    }, 200);
  };

  const SEARCH_INPUT_STYLE = cn(
    `h-[40px] pl-[34px] ${showXButton && "pr-[30px]"} placeholder:text-[14px] placeholder:font-medium placeholder:text-gray60`,
    className
  );

  return (
    <div className="relative flex items-center gap-[2px] w-full">
      <Input
        placeholder={placeholder}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={SEARCH_INPUT_STYLE}
        value={inputValue}
        onClick={onClick}
      />
      <Button
        type="button"
        onClick={handleSearch}
        className="absolute left-0 bg-transparent pl-[12px] pr-[8px] border-none hover:bg-transparent"
      >
        <Search color="#A5A5A5" />
      </Button>
      {showXButton && (
        <Button
          type="button"
          className="absolute right-0 bg-transparent pl-[8px] pr-[12px] border-none hover:bg-transparent"
          onClick={handleClearInput}
        >
          <X
            size={16}
            className="cursor-pointer rounded-full bg-[#BDBDBD] p-[2px]"
            color="#FFFFFF"
          />
        </Button>
      )}
    </div>
  );
}

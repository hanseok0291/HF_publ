import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import HeaderContainer from "./HeaderContainer";

type CloseHeaderType = {
  onClose: Function;
  title?: string;
  className?: string;
};
export default function CloseHeader({
  onClose,
  title,
  className
}: CloseHeaderType) {
  // 모바일/PC 분기 스타일
  const CLOSE_HEADER_STYLE = cn(
    "justify-between relative z-[1]",
    // 모바일 스타일 (기본)
    "",
    // PC 스타일 (필요시 추가)
    "lg:",
    className
  );
  
  // HeaderContainer에 전달할 PC/모바일 분기 스타일
  const HEADER_CONTAINER_STYLE = cn(
    // 모바일 스타일 (기본)
    "",
    // PC 스타일 (필요시 추가)
    "lg:",
    className
  );
  
  return (
    <>
      <HeaderContainer className={HEADER_CONTAINER_STYLE}>
        <div></div>
        {/* 모바일/PC 분기 처리 */}
        <h4 className="text-[16px] lg:text-[20px] font-bold text-black mr-auto">
          {title}
        </h4>
        <button 
          onClick={() => onClose()}
          className="lg:hidden"
        >
          <X />
        </button>
        {/* PC 버전 버튼 (필요시 추가) */}
        <button 
          onClick={() => onClose()}
          className="hidden lg:block"
        >
          <X />
        </button>
      </HeaderContainer>
    </>
  );
}

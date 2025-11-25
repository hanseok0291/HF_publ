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
  const CLOSE_HEADER_STYLE = cn("justify-between relative z-[1]", className);
  return (
    <>
      <HeaderContainer className={CLOSE_HEADER_STYLE}>
        <div></div>
        <h4 className="text-[16px] font-bold text-black">{title}</h4>
        <button onClick={() => onClose()}>
          <X />
        </button>
      </HeaderContainer>
    </>
  );
}

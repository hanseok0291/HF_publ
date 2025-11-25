import { HeaderButtonType } from "@/types/components/common/CommonComponents.type";
import Image from "next/image";
import { X } from "lucide-react";

export default function HeaderButton({ isOpen, setIsOpen }: HeaderButtonType) {
  return (
    <button
      className="relative flex items-center justify-center"
      onClick={() => setIsOpen(!isOpen)}
      aria-label="메뉴 열기/닫기"
    >
      <Image
        src={`/icons/menu.svg`}
        alt="mobile menu button"
        className={`absolute transition-all duration-300 ease-in-out ${
          isOpen
            ? "rotate-180 scale-75 opacity-0"
            : "rotate-0 scale-100 opacity-100"
        }`}
        width={24}
        height={24}
      />
      <X
        className={`transition-all duration-300 ease-in-out ${
          isOpen
            ? "rotate-0 scale-100 opacity-100"
            : "-rotate-180 scale-75 opacity-0"
        }`}
        width={24}
        height={24}
      />
    </button>
  );
}

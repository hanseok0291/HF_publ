import { DetailedHTMLProps, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface LoginErrorAlertProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: React.ReactNode;
}

export default function LoginErrorAlert({
  children,
  className = "",
  ...props
}: LoginErrorAlertProps) {
  return (
    <div
      className={cn(
        "flex items-start gap-[8px] w-full p-[12px_16px] rounded-[12px] bg-[#FFF8F7]",
        className
      )}
      {...props}
    >
      {/* 경고 아이콘 - 빨간색 원형 배경에 흰색 느낌표 */}
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        <circle cx="10" cy="10" r="10" fill="#F54336" />
        <path
          d="M10 5V11M10 15H10.01"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      {/* 에러 메시지 텍스트 */}
      <p className="text-[#F54336] text-[14px] font-medium leading-[20px] whitespace-pre-wrap flex-1">
        {children}
      </p>
    </div>
  );
}


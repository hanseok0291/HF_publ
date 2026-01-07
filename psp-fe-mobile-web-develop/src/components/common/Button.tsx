"use client";

import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";
import { cn } from "@/lib/utils";

type ButtonType = {
  buttonType?: "default" | "outline" | "cancel";
};

const Button: FC<
  DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > &
    ButtonType
> = ({ children, className = "", buttonType = "default", disabled, ...bttonAttr }) => {
  const buttonStyles = {
    default:
      "flex justify-center items-center h-[52px] border-none rounded bg-main text-white font-semibold",
    outline:
      "flex justify-center items-center p-[12px_48px] rounded bg-white text-[14px] border-[1px] border-solid border-black text-black font-semibold self-start",
    cancel:
      "flex justify-center items-center w-[108px] h-[52px] border-none rounded bg-gray40 text-black font-semibold"
  };
  
  // disabled 상태일 때 스타일 오버라이드 (className으로 전달된 스타일이 우선)
  const BUTTON_STYLE = cn(
    buttonStyles[buttonType],
    disabled && buttonType === "default" && "bg-gray40 text-gray60 cursor-not-allowed",
    className
  );

  return (
    <button {...bttonAttr} disabled={disabled} className={BUTTON_STYLE}>
      {children}
    </button>
  );
};

export default Button;

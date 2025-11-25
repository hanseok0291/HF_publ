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
> = ({ children, className = "", buttonType = "default", ...bttonAttr }) => {
  const buttonStyles = {
    default:
      "flex justify-center items-center h-[52px] border-none rounded bg-main text-white font-semibold",
    outline:
      "flex justify-center items-center p-[12px_48px] rounded bg-white text-[14px] border-[1px] border-solid border-black text-black font-semibold self-start",
    cancel:
      "flex justify-center items-center w-[108px] h-[52px] border-none rounded bg-gray40 text-black font-semibold"
  };
  const BUTTON_STYLE = cn(buttonStyles[buttonType], className);

  return (
    <button {...bttonAttr} className={BUTTON_STYLE}>
      {children}
    </button>
  );
};

export default Button;

"use client";

import { DetailedHTMLProps, FC, InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const Input: FC<
  Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    "size"
  > & {
    size?: "normal" | "large";
  }
> = ({ size = "normal", className = "", ...inputAttr }) => {
  const INPUT_STYLE = cn(
    "border border-gray40 rounded outline-none focus:border-black",
    size === "normal" ? "h-[40px] p-[12px]" : "",
    size === "large" ? "h-[48px] py-[16px] px-[12px]" : "",
    className
  );

  return <input {...inputAttr} className={INPUT_STYLE} />;
};

export default Input;

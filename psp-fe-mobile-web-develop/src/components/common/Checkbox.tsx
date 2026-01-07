"use client";

import { DetailedHTMLProps, FC, InputHTMLAttributes, useId } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const Checkbox: FC<
  Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    "type"
  > & {
    label?: string;
    labelPosition?: "top" | "right" | "left" | "bottom";
  }
> = ({ label, labelPosition = "right", id, className = "", ...inputAttr }) => {
  const componentId = id ?? useId().replaceAll(":", "").trim();

  const CONTAINER_STYLE = cn(
    "text-[13px] text-nowrap font-medium",
    ["right", "bottom"].includes(labelPosition)
      ? "after:content-[attr(label-text)]"
      : "before:content-[attr(label-text)]",
    ["right", "left"].includes(labelPosition) ? "flex items-center gap-2" : "",
    !label ? "gap-0" : ""
  );

  const CHECKBOX_STYLE = cn(
    "flex items-center justify-center size-[20px] p-[5px] border border-gray40 rounded-[4px] cursor-pointer bg-white peer-checked:bg-main peer-checked:border-main",
    className
  );

  return (
    <div label-text={label} className={CONTAINER_STYLE}>
      <input
        {...inputAttr}
        id={componentId}
        type="checkbox"
        className={"peer hidden"}
      />
      <label htmlFor={componentId} className={CHECKBOX_STYLE}>
        {inputAttr.checked && (
          <Image
            src="/icons/check_icon.svg"
            alt="Checked"
            width={10}
            height={10}
          />
        )}
      </label>
    </div>
  );
};

export default Checkbox;

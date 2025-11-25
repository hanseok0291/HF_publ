import { DetailedHTMLProps, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export default function ErrorText({
  children,
  className = "",
  ...errorTextAttr
}: DetailedHTMLProps<
  HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
>) {
  const TEXT_STYLE = cn("text-fail text-[12px] font-medium", className);
  return (
    <p {...errorTextAttr} className={TEXT_STYLE}>
      {children}
    </p>
  );
}

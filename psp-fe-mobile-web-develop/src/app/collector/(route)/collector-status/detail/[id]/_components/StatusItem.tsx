"use client";

import { BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";

type StatusItemType = {
  isActive: boolean;
  label: string;
  statusMessage?: string;
  messageStyle?: string;
};
export default function StatusItem({
  isActive,
  label,
  statusMessage,
  messageStyle
}: StatusItemType) {
  const STATUS_MESSAGE_STYLE = cn(
    "text-[12px] pl-[6px] text-center text-fail",
    messageStyle
  );
  return (
    <BreadcrumbItem className="flex flex-col items-center">
      <BreadcrumbLink asChild>
        <div>
          <p
            className={`text-[14px] border-[1px] p-[8px_16px] border-solid rounded-full
               ${isActive ? "border-main text-main" : "border-gray40 text-gray80"}`}
          >
            {label}
          </p>
          {statusMessage && (
            <span className={STATUS_MESSAGE_STYLE}>{statusMessage}</span>
          )}
        </div>
      </BreadcrumbLink>
    </BreadcrumbItem>
  );
}

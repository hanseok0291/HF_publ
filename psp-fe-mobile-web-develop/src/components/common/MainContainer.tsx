"use client";

import { MainContainerType } from "@/types/components/common/CommonComponents.type";
import { cn } from "@/lib/utils";
import { isEdge, isiOS } from "@/utils/WebViewHandler";

export default function MainContainer({
  children,
  className
}: MainContainerType) {
  const MAIN_CONTAINER_STYLE = cn(
    isEdge()
      ? "animate-fade-in h-auto overflow-visible min-h-0"
      : "animate-fade-in h-svh overflow-y-auto" +
          (isiOS()
            ? " overscroll-y-contain [-webkit-overflow-scrolling:touch]"
            : ""),
    className
  );
  return <section className={MAIN_CONTAINER_STYLE}>{children}</section>;
}

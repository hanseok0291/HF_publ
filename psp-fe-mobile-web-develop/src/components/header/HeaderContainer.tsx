import { HeaderContainerType } from "@/types/components/common/CommonComponents.type";
import { cn } from "@/lib/utils";

export default function HeaderContainer({
  children,
  className
}: HeaderContainerType) {
  const HEADER_CONTAINER_STYLE = cn(
    "relative flex justify-between bg-white items-center p-[16px_20px]",
    className
  );
  return <nav className={HEADER_CONTAINER_STYLE}>{children}</nav>;
}

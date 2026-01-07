import { HeaderContainerType } from "@/types/components/common/CommonComponents.type";
import { cn } from "@/lib/utils";

export default function HeaderContainer({
  children,
  className
}: HeaderContainerType) {
  const HEADER_CONTAINER_STYLE = cn(
    "relative flex justify-between items-center w-full",
    // 모바일 스타일 (기본) - 배경색 제거 (상위 컨테이너에서 관리)
    "p-[16px_20px] bg-transparent",
    // PC 스타일 (필요시 추가)
    "lg:bg-white",
    className
  );
  return <nav className={HEADER_CONTAINER_STYLE}>{children}</nav>;
}

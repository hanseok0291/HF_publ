import { DetailListContainerType } from "@/types/store/waste-sticker/DetailListContainer.type";
import { cn } from "@/lib/utils";

export default function DetailListContainer({
  children,
  className
}: DetailListContainerType) {
  const CONTAINER_STYLE = cn(
    "p-[20px] pb-[24px] bg-white flex flex-col first:gap-[20px] gap-[24px]",
    className
  );
  return <section className={CONTAINER_STYLE}>{children}</section>;
}

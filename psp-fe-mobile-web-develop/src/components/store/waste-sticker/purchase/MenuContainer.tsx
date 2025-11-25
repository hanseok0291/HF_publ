import { MenuContainerType } from "@/types/store/waste-sticker/Waste-Sticker.type";
import { cn } from "@/lib/utils";

export default function MenuContainer({
  children,
  className
}: MenuContainerType) {
  const MENU_CONTAINER_STYLE = cn(
    "shadow-menu_container inline-block rounded-md p-[16px_28px] bg-white",
    className
  );
  return <section className={MENU_CONTAINER_STYLE}>{children}</section>;
}

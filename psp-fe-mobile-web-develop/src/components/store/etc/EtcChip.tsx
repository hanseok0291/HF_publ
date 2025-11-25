import { EtcChipType } from "@/types/store/etc/BaseEtc.type";
import { cn } from "@/lib/utils";

export default function EtcChip({ text, className }: EtcChipType) {
  const ETC_CHIP_STYLE = cn(
    "p-[0.1rem] w-[5.3rem] text-center text-[0.75rem] rounded-xl bg-[#F4F4F4] text-[#777777]",
    className
  );
  return <p className={ETC_CHIP_STYLE}>{text}</p>;
}

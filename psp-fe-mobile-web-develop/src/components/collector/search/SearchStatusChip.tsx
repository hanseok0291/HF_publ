import { SearchStatusChipType } from "@/types/collector/SearchAddress.type";
import { cn } from "@/lib/utils";

export default function SearchStatusChip({ status }: SearchStatusChipType) {
  const BASE_STYLE =
    "inline-block rounded-2xl text-[12px] p-[4px_8px] font-semibold";
  const SUCCESS_STYLE = cn("bg-[#F6F9FF] text-main", BASE_STYLE);
  const FAIL_STYLE = cn("bg-[#FFF8F7] text-fail", BASE_STYLE);

  return (
    <p className={status !== true ? SUCCESS_STYLE : FAIL_STYLE}>
      {status !== true ? "정상수거" : "수거예외"}
    </p>
  );
}

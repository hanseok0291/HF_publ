import { CollectorStatusChipType } from "@/types/collector/collector-status/CollectorStatus.type";
import { TypeOf } from "zod";
import { COLLECT_STATUS_ENUM } from "@/enums/WasteSticker.enum";
import { cn } from "@/lib/utils";

export default function CollectorStatusChip({
  status
}: CollectorStatusChipType) {
  const BASE_STYLE =
    "inline-block rounded-2xl text-[12px] p-[4px_8px] font-semibold w-fit";

  const STATUS_STYLES: Record<
    TypeOf<typeof COLLECT_STATUS_ENUM> | string,
    string
  > = {
    TKAWY_STAT_001: cn("bg-[#F6FDF7] text-[#3EB34A]", BASE_STYLE),
    TKAWY_STAT_002: cn("bg-[#F6FDF7] text-[#3EB34A]", BASE_STYLE),
    TKAWY_STAT_003: cn("bg-[#F6F9FF] text-main", BASE_STYLE),
    TKAWY_STAT_007: cn("bg-[#FDF2FF] text-[#9704BB]", BASE_STYLE),
    TKAWY_STAT_008: cn("bg-gray40 text-black", BASE_STYLE),
    TKAWY_STAT_004: cn("bg-[#FFFBEF] text-[#FFB803]", BASE_STYLE),
    TKAWY_STAT_005: cn("bg-[#f8ecde] text-[#FF8A00]", BASE_STYLE),
    TKAWY_STAT_006: cn("bg-[#FFF8F7] text-fail", BASE_STYLE),
    TKAWY_STAT_009: cn("bg-gray20 text-gray60", BASE_STYLE)
  };

  const STATUS_TEXT: Record<
    TypeOf<typeof COLLECT_STATUS_ENUM> | string,
    string
  > = {
    TKAWY_STAT_001: "배출대기",
    TKAWY_STAT_002: "수거대기",
    TKAWY_STAT_003: "수거완료",
    TKAWY_STAT_007: "취소/환불",
    TKAWY_STAT_008: "수거불가",
    TKAWY_STAT_004: "12시간 미수거",
    TKAWY_STAT_005: "24시간 미수거",
    TKAWY_STAT_006: "48시간 미수거",
    TKAWY_STAT_009: "취소요청"
  };

  const style = STATUS_STYLES[status] || BASE_STYLE;
  const text = STATUS_TEXT[status] || "에러발생";

  return <p className={style}>{text}</p>;
}

import { DetailContainerType } from "@/types/collector/collector-status/CollectorStatus.type";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TypeOf } from "zod";
import { COLLECT_STATUS_ENUM } from "@/enums/WasteSticker.enum";
import { cn } from "@/lib/utils";
import CollectorStatusChip from "./CollectorStatusChip";

export default function CollectorStatusListContainer({
  onClick,
  selectList,
  data,
  requestId,
  isFocus
}: DetailContainerType) {
  const STATUS_STYLES: Record<
    TypeOf<typeof COLLECT_STATUS_ENUM> | string,
    string
  > = {
    TKAWY_STAT_001: "border-[#3EB34A]",
    TKAWY_STAT_002: "border-[#3EB34A]",
    TKAWY_STAT_003: "border-main",
    TKAWY_STAT_007: "border-[#9704BB]",
    TKAWY_STAT_008: "border-black",
    TKAWY_STAT_004: "border-[#FFB803]",
    TKAWY_STAT_005: "border-[#FF8A00]",
    TKAWY_STAT_006: "border-fail",
    TKAWY_STAT_009: "border-gray60"
  };
  const router = useRouter();
  const BASE_STYLE = cn(
    `shadow-menu_container bg-white rounded p-[16px] flex flex-col gap-[12px] ${(selectList || isFocus) && `border-[6px] border-solid ${STATUS_STYLES[data.disposeStatus]}`}`,
    ""
  );
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    sessionStorage.setItem("prevPath", window.location.pathname);
    router.push(`/collector/collector-status/detail/${requestId}`);
    onClick();
  };

  return (
    <Link href={`/collector/collector-status/detail/${requestId}`}>
      <div onClick={handleClick} className={BASE_STYLE}>
        <div className="flex justify-between items-center font-normal">
          <CollectorStatusChip status={data.disposeStatus} />

          <span className="text-gray80 text-[11px]">
            수거번호 {data.disposeNumber}
          </span>
        </div>
        <p className="text-[12px] font-normal">{`${data.requestName} ${data.requestNumber}`}</p>
        <hr className="bg-[#ECECEC]" />
        <div className="flex flex-col gap-[10px]">
          <div className="flex items-center justify-between">
            <p className="text-gray80 text-[12px]">
              {/* 0건 일 때는 외 건 미 표기, 2건 일 땐 외 1건 미표기 */}
              {`${data.representWasteName}`}
              {(data.wasteKindQuantity === 0 && data.totalQuantity === 2) ||
              data.wasteKindQuantity === 0
                ? ""
                : ` 외 ${data.wasteKindQuantity} 건`}
            </p>
            <span className="text-gray80 text-[12px]">
              {data.wasteKindQuantity !== 0 && ` ${data.totalQuantity}개`}
            </span>
          </div>
          <p className="text-[14px] leading-[22px] break-words">
            {`${data.disposeAddress} ${data.disposeDetailAddress}`}
          </p>
        </div>
      </div>
    </Link>
  );
}

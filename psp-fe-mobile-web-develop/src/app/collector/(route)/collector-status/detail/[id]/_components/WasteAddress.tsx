import { WasteCollectorDetailType } from "@/types/apiType/collector/collector-status/WasteCollectorList.type";
import Link from "next/link";
import EtcChip from "@/components/store/etc/EtcChip";

export default function WasteAddress({
  detailData
}: {
  detailData: WasteCollectorDetailType;
}) {
  return (
    <div>
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-[8px]">
          <h4 className="text-gray80 text-[12px] font-medium">배출주소</h4>
          <Link
            href={{
              pathname: "/collector/collector-status/map",
              query: {
                requestId: detailData.requestId
              }
            }}
            className="text-[12px] font-medium text-main underline"
          >
            지도확인
          </Link>
        </div>
        <p className="text-[14px] leading-[22px] mb-[10px] break-words">
          {`(${detailData.zipCode}) ${detailData.disposeAddress} ${detailData.disposeDetailAddress}`}
        </p>
        {detailData.specialNotes && (
          <EtcChip
            text={detailData.specialNotes}
            className="w-full rounded-none p-[12px]"
          />
        )}
      </div>
    </div>
  );
}

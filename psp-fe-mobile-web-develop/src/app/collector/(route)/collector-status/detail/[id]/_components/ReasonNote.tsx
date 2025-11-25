import { WasteCollectorDetailType } from "@/types/apiType/collector/collector-status/WasteCollectorList.type";
import Link from "next/link";

export default function ReasonNote({
  detailData
}: {
  detailData: WasteCollectorDetailType;
}) {
  return (
    <div className="p-[12px] mt-[16px] bg-gray20 text-gray80 rounded">
      <div className="flex items-center justify-between text-[12px] mb-[8px]">
        <p className="font-semibold">수거불가 사유</p>
        <Link
          href={{
            pathname: `/collector/collector-status/reason/${detailData.requestId}`,
            query: { fix: "true" }
          }}
          className="underline text-main"
        >
          수정
        </Link>
      </div>
      <p className="text-[12px] leading-[19px]">
        {detailData.disposeRefusalReason ?? "-"}
      </p>
    </div>
  );
}

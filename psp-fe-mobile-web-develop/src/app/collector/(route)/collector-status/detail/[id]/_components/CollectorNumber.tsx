import { WasteCollectorDetailType } from "@/types/apiType/collector/collector-status/WasteCollectorList.type";

export default function CollectorNumber({
  detailData
}: {
  detailData: WasteCollectorDetailType;
}) {
  return (
    <div className="flex flex-col gap-[12px] px-[20px]">
      <h4 className="font-bold">수거번호</h4>
      <p className="text-gray80 text-[14px] font-semibold">
        {detailData.disposeNumber}
      </p>
    </div>
  );
}

import { WasteCollectorDetailType } from "@/types/apiType/collector/collector-status/WasteCollectorList.type";
import Image from "next/image";

export default function CollectorPhoto({
  detailData
}: {
  detailData: WasteCollectorDetailType;
}) {
  const hasImages = detailData.imageFileList.length > 0;
  const hasAdminImages =
    detailData.disposeStatus === "TKAWY_STAT_008" &&
    detailData.adminUploadFileList.length > 0;

  if (!hasImages && !hasAdminImages) {
    return null;
  }

  return (
    <div>
      <h4 className="text-gray80 text-[12px] font-medium mb-[8px]">품목사진</h4>

      <div className="flex items-center gap-[10px] flex-wrap">
        {/* 일반 품목 사진 표시 */}
        {detailData.imageFileList.map((item) => (
          <Image
            key={item}
            src={item}
            width={100}
            height={100}
            alt="품목사진"
            className="w-[100px] h-[100px] rounded object-cover"
          />
        ))}

        {/* 수거 불가 상태에서 등록한 수거 불가 이미지 */}
        {detailData.disposeStatus === "TKAWY_STAT_008" &&
          detailData.adminUploadFileList.map((item) => (
            <Image
              key={item}
              src={item}
              width={100}
              height={100}
              alt="수거불가 사진"
              className="w-[100px] h-[100px] rounded object-cover"
            />
          ))}
      </div>
    </div>
  );
}

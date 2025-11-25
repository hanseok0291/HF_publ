import { WasteCollectorDetailType } from "@/types/apiType/collector/collector-status/WasteCollectorList.type";
import { formatDateWithTime } from "@/utils/formatUtils";

export default function RequestInfo({
  detailData
}: {
  detailData: WasteCollectorDetailType;
}) {
  const infoData = [
    { id: 1, title: "신청인", content: detailData.requestName },
    { id: 2, title: "연락처", content: detailData.requestNumber },
    {
      id: 3,
      title: "신청일시",
      content: formatDateWithTime(detailData.requestDateTime, "detail")
    }
  ];
  return (
    <div className="px-[20px]">
      <h4 className="font-bold mb-[20px]">신청정보</h4>
      <div className="flex flex-col gap-[24px]">
        {infoData.map((list) => {
          return (
            <div className="flex flex-col gap-[8px]" key={list.id}>
              <p className="text-gray80 text-[12px] font-medium">
                {list.title}
              </p>
              <span className="text-[14px] font-normal">{list.content}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import { CollectorInfoType } from "@/types/collector/collector-status/CollectorStatus.type";
import { DataTable } from "@/components/common/DataTable";
import { formatDateWithTime } from "@/utils/formatUtils";
import CollectorPhoto from "./CollectorPhoto";
import WasteAddress from "./WasteAddress";

export default function CollectorInfo({
  data,
  columns,
  detailData
}: CollectorInfoType) {
  const infoData = [
    {
      id: 1,
      title: "배출일시",
      content: formatDateWithTime(detailData.disposeDateTime, "detail")
    },
    {
      id: 2,
      title: "작업일시",
      content: formatDateWithTime(detailData.operationDateTime, "detail") ?? "-"
    },
    { id: 3, title: "수거담당자", content: detailData.keyManName ?? "-" },
    { id: 4, title: "담당지자체", content: detailData.keyLocgovName ?? "-" },
    { id: 5, title: "행정동", content: detailData.legalEmdNm ?? "-" },
    {
      id: 6,
      title: "담당 주민센터/수거업체",
      content: detailData.keyIsttName ?? "-"
    }
  ];
  return (
    <div className="px-[20px] pb-[20px]">
      <h4 className="font-bold mb-[20px]">배출정보</h4>
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
        <WasteAddress detailData={detailData} />
        <DataTable data={data} columns={columns} variant="clean" />
        <CollectorPhoto detailData={detailData} />
      </div>
    </div>
  );
}

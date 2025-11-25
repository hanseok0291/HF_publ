"use client";

import { BreadcrumbCollapsedType } from "@/types/collector/collector-status/CollectorStatus.type";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import StatusItem from "./StatusItem";

const STATUS = {
  WASTE_WAITING: "TKAWY_STAT_001",
  COLLECTOR_WAITING: "TKAWY_STAT_002",
  COMPLETED: "TKAWY_STAT_003",
  HOUR_12: "TKAWY_STAT_004",
  HOUR_24: "TKAWY_STAT_005",
  HOUR_48: "TKAWY_STAT_006",
  CANCELED: "TKAWY_STAT_007",
  NOT: "TKAWY_STAT_008",
  CANCELED_REQ: "TKAWY_STAT_009"
} as const;

const STATUS_MESSAGES = {
  CANCELED_REQ: "취소요청",
  HOUR_12: "12시간 미수거",
  HOUR_24: "24시간 미수거",
  HOUR_48: "48시간 미수거",
  NOT: "수거불가"
} as const;

export default function BreadcrumbCollapsed({
  detailData
}: BreadcrumbCollapsedType) {
  const status = detailData.disposeStatus;

  const getCollectionStatusMessage = () => {
    switch (status) {
      case STATUS.HOUR_12:
        return STATUS_MESSAGES.HOUR_12;
      case STATUS.HOUR_24:
        return STATUS_MESSAGES.HOUR_24;
      case STATUS.HOUR_48:
        return STATUS_MESSAGES.HOUR_48;
      default:
        return undefined;
    }
  };

  const statusItemLable = () => {
    switch (status) {
      case STATUS.COMPLETED:
        return "수거완료";
      case STATUS.NOT:
        return "수거불가";
      case STATUS.CANCELED:
        return "취소/환불";
      default:
        return "수거완료";
    }
  };

  const isCollectionWaiting = [
    STATUS.COLLECTOR_WAITING,
    STATUS.HOUR_12,
    STATUS.HOUR_24,
    STATUS.HOUR_48
  ].includes(status as any);

  return (
    <Breadcrumb>
      <BreadcrumbList className="justify-between items-start">
        <StatusItem
          isActive={
            status === STATUS.WASTE_WAITING || status === STATUS.CANCELED_REQ
          }
          label="배출대기"
          statusMessage={
            status === STATUS.CANCELED_REQ
              ? STATUS_MESSAGES.CANCELED_REQ
              : undefined
          }
          messageStyle="ml-[14px]"
        />
        <BreadcrumbSeparator className="w-[10px] mt-[10px]" />
        <StatusItem
          isActive={isCollectionWaiting}
          label="수거대기"
          statusMessage={getCollectionStatusMessage()}
        />
        <BreadcrumbSeparator className="w-[10px] mt-[10px]" />

        <StatusItem
          isActive={
            status === STATUS.NOT ||
            status === STATUS.CANCELED ||
            status === STATUS.COMPLETED
          }
          label={statusItemLable()}
        />
      </BreadcrumbList>
    </Breadcrumb>
  );
}

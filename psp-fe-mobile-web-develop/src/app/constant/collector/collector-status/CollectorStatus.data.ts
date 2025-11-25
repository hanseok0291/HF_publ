import { ConllectorStatusListType } from "@/types/collector/collector-status/CollectorStatus.type";
import { TypeOf } from "zod";
import { COLLECT_STATUS_ENUM } from "@/enums/WasteSticker.enum";

export const collectorSelect = [
  { id: 1, content: "전체", value: "#" },
  { id: 2, content: "담당 행정동명1", value: "#" },
  { id: 3, content: "담당 행정동명2", value: "#" },
  { id: 4, content: "담당 행정동명3", value: "#" },
  { id: 5, content: "담당 행정동명4", value: "#" }
];

export const collectorStatus: {
  id: number;
  content: string;
  value: TypeOf<typeof COLLECT_STATUS_ENUM> | string;
}[] = [
  {
    id: 1,
    content: "배출대기/수거대기",
    value: "TKAWY_STAT_001,TKAWY_STAT_002"
  },
  { id: 2, content: "수거완료", value: "TKAWY_STAT_003" },
  { id: 3, content: "12시간 미수거", value: "TKAWY_STAT_004" },
  { id: 4, content: "24시간 미수거", value: "TKAWY_STAT_005" },
  { id: 5, content: "48시간 미수거", value: "TKAWY_STAT_006" },
  { id: 6, content: "취소/환불", value: "TKAWY_STAT_007" },
  { id: 7, content: "수거불가", value: "TKAWY_STAT_008" },
  { id: 8, content: "취소요청", value: "TKAWY_STAT_009" }
];

export const searchObject = [
  { id: 1, content: "전체", value: "#" },
  { id: 2, content: "등록 폐기물(대분류)", value: "#" },
  { id: 3, content: "등록 폐기물(대분류)", value: "#" },
  { id: 4, content: "등록 폐기물(대분류)", value: "#" },
  { id: 5, content: "등록 폐기물(대분류)", value: "#" },
  { id: 6, content: "등록 폐기물(대분류)", value: "#" }
];

export const searchDetailObject = [
  { id: 1, content: "전체", value: "#" },
  { id: 2, content: "등록된 품목에 대한 세부품목명(중분류)", value: "#" },
  { id: 3, content: "등록된 품목에 대한 세부품목명(중분류)", value: "#" },
  { id: 4, content: "등록된 품목에 대한 세부품목명(중분류)", value: "#" },
  { id: 5, content: "등록된 품목에 대한 세부품목명(중분류)", value: "#" },
  { id: 6, content: "등록된 품목에 대한 세부품목명(중분류)", value: "#" }
];

export const allData = {
  collectorSelect,
  collectorStatus,
  searchObject,
  searchDetailObject
};

export const statusListData: ConllectorStatusListType = [
  { id: 1, content: "TKAWY_STAT_001" },
  { id: 2, content: "TKAWY_STAT_002" },
  { id: 3, content: "TKAWY_STAT_003" },
  { id: 4, content: "TKAWY_STAT_007" },
  { id: 5, content: "TKAWY_STAT_008" },
  { id: 6, content: "TKAWY_STAT_004" },
  { id: 7, content: "TKAWY_STAT_005" },
  { id: 8, content: "TKAWY_STAT_006" },
  { id: 9, content: "TKAWY_STAT_009" }
];

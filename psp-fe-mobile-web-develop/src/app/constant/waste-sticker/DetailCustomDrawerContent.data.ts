import { TypeOf } from "zod";
import { PAY_METHOD_ENUM, PAY_STATUS_ENUM } from "@/enums/Common.enum";
import {
  RECEIPT_ENUM,
  STORE_DELIVERY_FILTER_ENUM
} from "@/enums/WasteSticker.enum";

export const paymentType: {
  id: number;
  content: string;
  value: TypeOf<typeof PAY_METHOD_ENUM> | string;
}[] = [
  { id: 0, content: "결제 수단 전체", value: "null" },
  { id: 2, content: "신용카드", value: "PMT_MEAN_001" },
  { id: 3, content: "내통장결제", value: "PMT_MEAN_003" },
  { id: 4, content: "가상계좌", value: "PMT_MEAN_002" },
  { id: 5, content: "직접수납", value: "PMT_MEAN_004" }
];

export const paymentStatus: {
  id: number;
  content: string;
  value: TypeOf<typeof PAY_STATUS_ENUM> | string;
}[] = [
  { id: 0, content: "결제 상태 전체", value: "null" },
  { id: 2, content: "결제대기", value: "PMT_STAT_001" },
  { id: 3, content: "결제완료", value: "PMT_STAT_002" },
  { id: 4, content: "부분결제", value: "PMT_STAT_003" },
  { id: 5, content: "취소/환불", value: "PMT_STAT_004" }
];

export const receiptStatus: {
  id: number;
  content: string;
  value: string;
}[] = [
  { id: 0, content: "수령 여부 전체", value: "null" },
  { id: 2, content: "수령완료", value: "true" },
  { id: 3, content: "미수령", value: "false" }
];

export const receiptType: {
  id: number;
  content: string;
  value: TypeOf<typeof RECEIPT_ENUM> | string;
}[] = [
  { id: 0, content: "수령 방식 전체", value: "null" },
  { id: 2, content: "직접수령", value: "RECPT_TY_001" },
  { id: 3, content: "배송", value: "RECPT_TY_002" }
];

export const searchFilter: {
  id: number;
  content: string;
  value: TypeOf<typeof STORE_DELIVERY_FILTER_ENUM> | string;
}[] = [
  { id: 1, content: "검색 조건 전체", value: "ALL" },
  { id: 2, content: "권종", value: "STICKER_NAME" },
  { id: 3, content: "담당자 이름", value: "KEYMAN_NAME" }
];

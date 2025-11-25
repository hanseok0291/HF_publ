import { TypeOf, z } from "zod";

/**
 * 수령방식 열거형
 * @constant
 * @property {string} RECPT_TY_001 - 직접 수령
 * @property {string} RECPT_TY_002 - 배송
 */
export const RECEIPT_ENUM = z.enum(["RECPT_TY_001", "RECPT_TY_002"]);

/**
 * 스티커 구매 내역 필터 열거형 (store 전용)
 * @constant
 * @property {string} ALL - 전체
 * @property {string} STICKER_NAME - 권종
 * @property {string} KEYMAN_NAME - 담당자 이름
 */
export const STORE_DELIVERY_FILTER_ENUM = z.enum([
  "ALL", // 전체
  "STICKER_NAME", // 권종
  "KEYMAN_NAME" // 담당자 이름
]);

/**
 * 폐기물 수거 상태 열거형
 * @constant
 * @property {string} TKAWY_STAT_001 - 배출대기
 * @property {string} TKAWY_STAT_002 - 수거대기
 * @property {string} TKAWY_STAT_003 - 수거완료
 * @property {string} TKAWY_STAT_004 - 12시간 미수거
 * @property {string} TKAWY_STAT_005 - 24시간 미수거
 * @property {string} TKAWY_STAT_006 - 48시간 미수거
 * @property {string} TKAWY_STAT_007 - 취소&환불
 * @property {string} TKAWY_STAT_008 - 수거불가
 * @property {string} TKAWY_STAT_009 - 취소요청
 */
export const COLLECT_STATUS_ENUM = z.enum([
  "TKAWY_STAT_001", // 배출대기
  "TKAWY_STAT_002", // 수거대기
  "TKAWY_STAT_003", // 수거완료
  "TKAWY_STAT_004", // 12시간 미수거
  "TKAWY_STAT_005", // 24시간 미수거
  "TKAWY_STAT_006", // 48시간 미수거
  "TKAWY_STAT_007", // 취소&환불
  "TKAWY_STAT_008", // 수거불가
  "TKAWY_STAT_009" // 취소요청
]);

type COLLECT_STATUS_ENUM_MAP = z.infer<typeof COLLECT_STATUS_ENUM>;
export const COLLECT_STATUS_MAPPING_ENUM: Record<
  string,
  COLLECT_STATUS_ENUM_MAP
> = {
  TKAWY_STAT_001: "TKAWY_STAT_001",
  TKAWY_STAT_002: "TKAWY_STAT_002",
  TKAWY_STAT_003: "TKAWY_STAT_003",
  TKAWY_STAT_004: "TKAWY_STAT_002",
  TKAWY_STAT_005: "TKAWY_STAT_002",
  TKAWY_STAT_006: "TKAWY_STAT_002",
  TKAWY_STAT_007: "TKAWY_STAT_007",
  TKAWY_STAT_008: "TKAWY_STAT_008",
  TKAWY_STAT_009: "TKAWY_STAT_009",
  undefiend: "TKAWY_STAT_001"
};

export const COLLECT_STATUS: Record<
  TypeOf<typeof COLLECT_STATUS_ENUM>,
  string
> = {
  TKAWY_STAT_001: "배출대기",
  TKAWY_STAT_002: "수거대기",
  TKAWY_STAT_003: "수거완료",
  TKAWY_STAT_004: "12시간 미수거",
  TKAWY_STAT_005: "24시간 미수거",
  TKAWY_STAT_006: "48시간 미수거",
  TKAWY_STAT_007: "취소&환불",
  TKAWY_STAT_008: "수거불가",
  TKAWY_STAT_009: "취소요청"
} as const;

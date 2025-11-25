import { TypeOf, z } from "zod";

/** 프론트엔드 권한 스키마 */
export const AUTHOR_ENUM = z.enum(["bo", "local-gov", "collector", "store"]);

/** 코드 검색 필터 Enum */
export const CODE_FILTER_ENUM = z.enum([
  "ALL", // 전체
  "GROUP", // 분류명
  "CODE", // 코드ID
  "NAME" // 코드명
]);

/** 노출상태 Enum */
export const DISPLAY_STATUS_ENUM = z.enum([
  "ALL", // 전체
  "YES", // 노출
  "NO" // 미노출고
]);

/** 검색 조건 Enum */
export const SEARCH_WITH_ENUM = z.enum([
  "ALL", // 전체 검색
  "TITLE", // 제목으로 검색
  "WRITER" // 작성자명으로 검색
]);

/** 제품(스티커&종량제 봉투 등) 입고 내역 필터 Enum */
export const WAREHOUSE_FILTER_ENUM = z.enum([
  "ALL", // 전체
  "REPRESENTATION", // 대표자명
  "BIZRNO", // 사업자번호
  "REPRESENTATIVE_NUMBER", // 대표연락처
  "REPRESENTATIVE_EMAIL" // 대표이메일
]);

/** 제품(스티커&종량제 봉투 등) 거래 내역 필터 Enum */
export const BIZ_CONECTION_FILTER_ENUM = z.enum([
  "ALL", // 전체
  "NAME", // 거래처명
  "REPRESENTATIVE", // 대표자명
  "BIZRNO", // 사업자번호
  "COPRNO", // 법인번호
  "EMAIL" // 대표이메일
]);

/** 입출고 상태 Enum */
export const STOCK_STATUS_ENUM = z.enum([
  "WAREHOUSING", // 입고
  "DELIVERY" // 출고
]);

/**
 * 결제 수단 열거형
 * @constant
 * @property {string} PMT_MEAN_001 - 신용카드
 * @property {string} PMT_MEAN_002 - 내통장결제
 * @property {string} PMT_MEAN_003 - 가상계좌
 * @property {string} PMT_MEAN_004 - 직접 수납
 */
export const PAY_METHOD_ENUM = z.enum([
  "PMT_MEAN_001", // 신용카드
  "PMT_MEAN_003", // 내통장결제
  "PMT_MEAN_002", // 가상계좌
  "PMT_MEAN_004" // 직접 수납
]);

/**
 * 결제 상태 열거형
 * @constant
 * @property {string} PMT_STAT_001 - 결제 대기
 * @property {string} PMT_STAT_002 - 결제 완료
 * @property {string} PMT_STAT_003 - 부분 결제
 * @property {string} PMT_STAT_004 - 취소&환불
 */
export const PAY_STATUS_ENUM = z.enum([
  "PMT_STAT_001",
  "PMT_STAT_002",
  "PMT_STAT_003",
  "PMT_STAT_004"
]);

/** 결제 상태 */
export const PAY_STATUS: Record<TypeOf<typeof PAY_STATUS_ENUM>, string> = {
  PMT_STAT_001: "결제대기",
  PMT_STAT_002: "결제완료",
  PMT_STAT_003: "부분결제",
  PMT_STAT_004: "취소/환불"
} as const;

/** 판매 품목 Enum */
export const SELL_ENUM = z.enum(
  [
    "SELL_TY_001", // 모두 판매
    "SELL_TY_002", // 스티커
    "SELL_TY_003" // 종량제
  ],
  { required_error: "판매구분은 필수 선택 항목입니다." }
);

/** 수령방식 Enum */
export const RECEIPT_ENUM = z.enum([
  "RECPT_TY_001", // 직접 수령
  "RECPT_TY_002" // 배송
]);

/** 날짜 선택 Enum */
export const DATE_KIND_ENUM = z.enum([
  "TODAY", // 오늘
  "YESTERDAY", // 어제
  "CALENDAR" // 캘린더
]);

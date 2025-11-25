import { z } from "zod";

/**
 * 로그인 2차 인증 수단 코드 열거형
 * @constant
 * @property {string} SCD_AUTH_001 - 이메일
 * @property {string} SCD_AUTH_002 - 휴대전화
 */
export const AUTH_METHOD_ENUM = z.enum(
  [
    "SCD_AUTH_001", // 이메일
    "SCD_AUTH_002" // 휴대전화
  ],
  { required_error: "로그인 2차 인증은 필수 선택 항목입니다." }
);

/**
 * 담당자 검색 필터터 열거형
 * @constant
 * @property {string} ALL - 전체
 * @property {string} NAME - 담당자명
 * @property {string} EMAIL - 이메일
 * @property {string} TELEPHONE - 유선전화
 * @property {string} CELLPHONE - 휴대전화
 * @property {string} POSITION_NAME - 소속명
 */
export const KEYMAN_FILTER_ENUM = z.enum([
  "ALL",
  "NAME",
  "EMAIL",
  "TELEPHONE",
  "CELLPHONE",
  "POSITION_NAME"
]);

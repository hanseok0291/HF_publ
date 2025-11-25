import { z } from "zod";

/**
 * 필수 값 에러 메세지 상수
 */
const VALIDATION_MESSAGES = {
  // 로그인 에러 메세지
  NOT_MATCH_LOGIN: `계정 정보가 일치하지 않습니다.\n
아이디 또는 비밀번호를 다시 확인해 주세요.(1/5)`,
  TRY_TOO_MANY_LOGIN:
    "임시 비밀번호가 등록하신 이메일로 발급됐습니다. 임시 비밀번호를 확인해주세요.",
  NOT_HAVE_USER_INFO: "등록된 계정 정보가 없습니다. 관리자에게 문의해 주세요.",
  // 계정 정보 찾기
  // 공통 에러 메세지
  INVALID_VALUE: "정상적인 값이 아닙니다.",
  NUMBERS_ONLY: "숫자만 입력 가능합니다.",
  REQUIRED: (field: string) => `${field}을(를) 입력해 주세요.`
} as const;

/**
 * 비밀번호 유효성 함수
 *
 * length: 입력창의 최대 입력 수
 */
const passwordRegEx =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]$/;
export const createPasswordSchema = (length: number, fieldName: string) =>
  z
    .string()
    .length(length, { message: VALIDATION_MESSAGES.REQUIRED(fieldName) })
    .regex(passwordRegEx, { message: VALIDATION_MESSAGES.NUMBERS_ONLY });

/**
 * 일반 유효성 함수
 *
 * fieldName: 입력창 필드 이름 (필수 값 누락 에러 메세지)
 */
export const createRequiredSchema = (fieldName: string) =>
  z
    .string({ message: VALIDATION_MESSAGES.INVALID_VALUE })
    .min(1, { message: VALIDATION_MESSAGES.REQUIRED(fieldName) });

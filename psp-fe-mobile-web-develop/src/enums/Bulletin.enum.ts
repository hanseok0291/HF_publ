import { z } from "zod";

/** 게시판 페이지 구분 Enum */
export const BULLETIN_ENUM = z.enum([
  "notice", // 공지사항
  "faq", // FAQ
  "inquiry" // 업무문의
]);

/** 작성자 구분 Enum */
export const WRITER_ENUM = z.enum([
  "ALL", // 전체
  "BACK", // 헥토파이낸셜
  "LOCAL" // 지자체
]);

/** 게시글 노출 대상 Enum */
export const DISPLAY_TARGET_ENUM = z.enum([
  "ALL", // 전체
  "LOCGOV", // 지자체
  "ISTT", // 주민센터/ 수거업체
  "SELL", // 판매소
  "SELL_ALL", // 판매소(모두 판매)
  "SELL_STICKER", // 판매소(스티커)
  "SELL_TRASH" // 판매소(종량제)
]);

/** 답변 상태 Enum */
export const ANSWER_STATUS_ENUM = z.enum([
  "ALL", // 전체
  "YES", // 답변완료
  "NO" // 답변미완료
]);

/** 공지사항 작성자 Enum */
export const NOTICE_WRITER_ENUM = z.enum([
  "ALL", // 전체
  "BACK", // 헥토파이낸셜
  "LOCAL" // 지자체
]);

/** 업무문의 작성자 필터 Enum */
export const JOB_INQ_WRITER_ENUM = z.enum([
  "ALL", // 전체
  "TITLE", // 제목
  "NAME", // 작성자 이름
  "EMAIL", // 작성자 이메일
  "CONTACT" // 작성자 연락처
]);

export const JOB_INQ_FILTER_ENUM = z.enum([
  "ALL", // 전체
  "ISTT", // 지자체
  "LOCAL" // 주민센터
]);

/**
 * 업무 문의 탭 필터
 */

/** QnA 필터 조건 Enum */
export const QNA_FILTER_ENUM = z.enum([
  "ALL", // 전체 검색
  "TITLE", // 제목으로 검색
  "ANSWER" // 답변으로 검색
]);

/** QnA 필터 조건 Enum(local-gov 전용) */
export const LOCALGOV_QNA_FILTER_ENUM = z.enum([
  "ALL", // 전체 검색
  "TITLE", // 제목 검색
  "WRITER", // 문의자 검색
  "NUMBER" // 문의자 연락처 검색
]);

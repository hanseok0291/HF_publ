import { z } from "zod";

/** 고정 파라미터에 대한 함수 반환 타입 */
export type ReturnTypeWithParam<
  T extends (...args: any[]) => any,
  Param
> = T extends (firstParam: Param, ...args: infer Rest) => infer R
  ? R extends z.ZodType<any, any, any> // Zod 스키마 반환 타입 처리
    ? ReturnType<R["parse"]> // Zod 스키마가 반환하는 타입 (parse 메서드의 반환 타입)
    : R // 일반적인 반환 타입
  : never;

/** 특정 타입의 모든 속성을 null로 설정 */
export type Nullable<T> = { [K in keyof T]: T[K] | null };

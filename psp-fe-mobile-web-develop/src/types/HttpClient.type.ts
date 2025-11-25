/** Backend API 응답 try catch error 공통 스키마(임시) */
export type ApiError = {
  code: number;
  error: string;
  message: string;
  path: string;
  timeStamp: string;
};

/** API 공통 응답 전문 */
type ApiResponse<T> = {
  code: number;
  message: string;
  content: T;
};

/** 페이지네이션 요청 전문 필드 */
export type Pageable = {
  page: number;
  size: number;
  sort: string[];
};

/** 페이지네이션 API 요청 전문 */
type PageableRequest<T extends Record<string, any> = {}> = Pageable & T;

/** 페이지네이션 API 응답 전문 */
type PageableResponse<T> = Omit<ApiResponse<T>, "content"> & {
  content: {
    content: T[];
    totalElements: number;
    totalPages: number;
    number: number;
  };
};

/** 커서 요청 전문 필드 */
export type Cursor = {
  cursorId: string | number | null;
  size: number;
};

/** 커서 API 요청 전문 */
type CursorRequest<T extends Record<string, any>> = Cursor & T;

/** 커서 API 응답 전문 */
type CursorResponse<T> = Omit<ApiResponse<T>, "content"> & {
  content: {
    hasNext: boolean;
    content: T[];
  };
};

/** 커스텀 SWR Mutate 함수 */
export type CustomMutate<T> = () => Promise<ApiResponse<T>>;

/** 커스텀 SWR 응답 */
export type CustomSwrResponse<T> = {
  swrKey: string | null;
  preFetch: () => Promise<unknown>;
  swrResponse: {
    data: T;
    error: any;
    isLoading: boolean;
    isValidating: boolean;
    mutate: CustomMutate<T>;
  };
};

/** API 함수 타입 */
export type ApiFunction<Params, Result> = (params: Params) => Promise<{
  code: number;
  message: string;
  content: Result;
}>;

/** 일반 API 요청용 커스텀 SWR */
export type CustomSWR<T extends Record<string, any> | void, Result> = (
  params: T
) => CustomSwrResponse<ApiResponse<Result>>;

/** 페이지네이션 전용 SWR */
export type PageableSWR<T extends Record<string, any>, Result> = (
  params: PageableRequest<T>
) => CustomSwrResponse<PageableResponse<Result>>;

/** 커서 전용 SWR */
export type CursorSWR<T extends Record<string, any>, Result> = (
  params: CursorRequest<T>
) => CustomSwrResponse<CursorResponse<Result>>;

/** 함수에서 첫 번째 파라미터 추출 */
export type ExtractParam<T extends (...params: any) => any> = Parameters<T>[0];

/** ExtractContent 타입 확장 */
export type ExtractContent<
  T extends
    | ((...params: any) => Promise<ApiResponse<any>>)
    | PageableSWR<any, any>
    | CursorSWR<any, any>
> = T extends (...params: any) => CustomSwrResponse<infer U>
  ? U extends PageableResponse<infer R>
    ? R[]
    : U extends CursorResponse<infer R>
      ? R[]
      : never
  : T extends (...params: any) => Promise<ApiResponse<infer R>>
    ? R
    : never;

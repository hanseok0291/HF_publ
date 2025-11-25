import { z } from "zod";

/** 백엔드 API 응답 전문 공통 스키마 */
export const ResponseSchema = z.object({
  code: z.number(),
  message: z.string(),
  content: z.any()
});

/** 페이지네이션 API 요청 스키마 */
export const PageableRequestSchema = z.object({
  page: z.number(),
  size: z.number(),
  sort: z.array(
    z
      .string()
      .regex(/,(ASC|DESC)$/, "정렬 값은 ',ASC' 또는 ',DESC'로 끝나야 합니다.")
  )
});

/** 페이지네이션 API 응답 스키마 */
export const PageableResponseSchema = z.object({
  empty: z.boolean(),
  first: z.boolean(),
  last: z.boolean(),
  number: z.number(),
  numberOfElements: z.number(),
  size: z.number(),
  sort: z.object({
    empty: z.boolean(),
    sorted: z.boolean(),
    unsorted: z.boolean()
  }),
  totalElements: z.number(),
  totalPages: z.number()
});

/** SWR mutate 스키마 */
export const SWRMutateSchema = z
  .function()
  .args(
    z.union([z.unknown(), z.promise(z.unknown())]).optional(),
    z.union([z.boolean(), z.object({})]).optional()
  )
  .returns(z.promise(z.unknown()));

/** API 함수 스키마 */
export const ApiFunctionSchema = <
  Params extends z.ZodTypeAny,
  Result extends z.ZodTypeAny
>(
  paramsSchema: Params,
  resultSchema: Result
) =>
  z
    .function()
    .args(paramsSchema)
    .returns(
      z.promise(
        ResponseSchema.extend({
          content: resultSchema
        })
      )
    );

/** 페이지네이션 API 함수 스키마 */
export const PageableApiFunctionSchema = <
  AdditionalParams extends z.ZodRawShape,
  Content extends z.ZodTypeAny
>(
  additionalParams: z.ZodObject<AdditionalParams>,
  contentSchema: Content
) => {
  const swrResponseSchema = z.object({
    swrKey: z.string(),
    preFetch: z.function().args(z.void()).returns(z.promise(z.unknown())),
    swrResponse: z.object({
      data: z.object({
        content: z.object({
          ...PageableResponseSchema.shape,
          content: z.array(contentSchema)
        })
      }),
      error: z.any(),
      isLoading: z.boolean(),
      isValidating: z.boolean(),
      mutate: SWRMutateSchema
    })
  });

  return z
    .function()
    .args(PageableRequestSchema.merge(additionalParams))
    .returns(swrResponseSchema);
};

/** cursorId API 함수 스키마 */
export const CursorIdApiFunctionSchema = <
  AdditionalParams extends z.ZodRawShape,
  Content extends z.ZodTypeAny
>(
  additionalParams: z.ZodObject<AdditionalParams>,
  contentSchema: Content
) => {
  const swrResponseSchema = z.object({
    swrKey: z.string(),
    preFetch: z.function().args(z.void()).returns(z.promise(z.unknown())),
    swrResponse: z.object({
      data: z.object({
        content: z.array(contentSchema)
      }),
      error: z.any(),
      isLoading: z.boolean(),
      isValidating: z.boolean(),
      mutate: SWRMutateSchema
    })
  });

  return z.function().args(additionalParams).returns(swrResponseSchema);
};

export type ExtractContentType<
  T extends (...params: any) => Promise<z.infer<typeof ResponseSchema>>
> = Awaited<ReturnType<T>>["content"];

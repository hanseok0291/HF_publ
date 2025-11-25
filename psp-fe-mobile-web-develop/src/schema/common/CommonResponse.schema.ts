import { z } from "zod";

//response page
export const PageableResponse = z.object({
  pageNumber: z.number(),
  pageSize: z.number()
});

// 필터링 및 키워드 검색
export const ReqSchema = z.object({
  keyWord: z.string(),
  filterType: z.string()
});

//페이지 정보
export const PageableSchema = z.object({
  page: z.number(),
  size: z.number(),
  sort: z.array(z.string())
});

// content params
export const ContentParams = z.object({
  reqDto: ReqSchema,
  pageable: PageableSchema
});

import { z } from "zod";
import { ApiFunctionSchema } from "../api/HttpClient.schema";
import {
  PageableResponse,
  PageableSchema,
  ReqSchema
} from "../common/CommonResponse.schema";

//response FAQ
const FAQlItemResponse = z.object({
  faqId: z.number(),
  title: z.string(),
  insertionName: z.string(),
  insertionIstt: z.string(),
  insertionEmail: z.string(),
  insertionDate: z.string(),
  contents: z.string().optional() // content 필드는 옵션으로 설정
});

//FAQ 조회 params
export const FAQParam = z.object({
  reqDto: ReqSchema,
  pageable: PageableSchema
});

// reponse schema
const ApiFAQResponseSchema = z.object({
  content: z.array(FAQlItemResponse),
  pageable: PageableResponse,

  totalPages: z.number()
});

// FAQ 리스트 param, response
export const FAQListSchema = ApiFunctionSchema(FAQParam, ApiFAQResponseSchema);

// FAQ ID 상세보기 param, response
export const FAQIdSchema = ApiFunctionSchema(z.number(), FAQlItemResponse);

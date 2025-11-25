import { z } from "zod";
import { ApiFunctionSchema } from "../api/HttpClient.schema";
import {
  PageableResponse,
  PageableSchema,
  ReqSchema
} from "../common/CommonResponse.schema";

//response manual
const ManualItemResponse = z.object({
  manualId: z.number(),
  title: z.string(),
  insertionName: z.string(),
  insertionIstt: z.string(),
  fileExtensionType: z.union([z.string(), z.null()]),
  insertionDate: z.string(),
  fileDownloadUrl: z.union([z.string(), z.null()])
});

//매뉴얼 조회 params
export const ManualParam = z.object({
  reqDto: ReqSchema,
  pageable: PageableSchema
});

// reponse schema
const ApiManualResponseSchema = z.object({
  content: z.array(ManualItemResponse),
  pageable: PageableResponse,

  totalPages: z.number()
});

// 매뉴얼 리스트 param, response
export const ManualListSchema = ApiFunctionSchema(
  ManualParam,
  ApiManualResponseSchema
);

import { z } from "zod";
import { ApiFunctionSchema } from "../api/HttpClient.schema";
import {
  PageableResponse,
  PageableSchema
} from "../common/CommonResponse.schema";

//response Notice
const NoticeItemResponse = z.object({
  noticeId: z.number(),
  parentFixingYn: z.boolean(),
  title: z.string(),
  insertionEmail: z.string(),
  insertionName: z.string(),
  insertionIstt: z.string(),
  insertionDate: z.string()
});

//Notice 조회 params
export const NoticeParam = z.object({
  reqDto: z.object({
    keyWord: z.string(),
    filterType: z.string(),
    writerType: z.string()
  }),
  pageable: PageableSchema
});

// reponse schema
const ApiNoticeResponseSchema = z.object({
  content: z.array(NoticeItemResponse),
  pageable: PageableResponse,

  totalPages: z.number()
});

// response id schema
const ApiNoticeIdResponse = z.object({
  noticeId: z.number(),
  title: z.string(),
  insertionName: z.string(),
  insertionEmail: z.string(),
  insertionIstt: z.string(),
  contents: z.string(),
  insertionDate: z.string(),
  parentFixingYn: z.boolean()
});

// 공지사항 리스트 param, response
export const NoticeListSchema = ApiFunctionSchema(
  NoticeParam,
  ApiNoticeResponseSchema
);

// 공지사항 ID 상세보기 param, response
export const NoticeIdSchema = ApiFunctionSchema(
  z.number(),
  ApiNoticeIdResponse
);

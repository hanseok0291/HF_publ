import { ContactDetailResponseType } from "@/types/apiType/collector/contact/Contact.type";
import { ApiFunction, PageableSWR } from "@/types/HttpClient.type";
import { TypeOf } from "zod";
import {
  JOB_INQ_FILTER_ENUM,
  JOB_INQ_WRITER_ENUM
} from "@/enums/Bulletin.enum";
import useCustomSWR from "@/hooks/useCustomSWR";
import { getRequest, postRequest } from "@/lib/httpClients";

/**
 * @description 업무문의 리스트 조회
 * @param keyWord - 검색어
 * @param searchStartDate - 검색할 시작 날짜
 * @param searchEndDate - 검색할 끝 날짜짜
 * @param writerType - 검색 조건
 * @param filterType - 작성자 조건
 * @returns
 */
export const getJobInquiryList: PageableSWR<
  {
    keyWord: string;
    searchStartDate: string;
    searchEndDate: string;
    writerType: TypeOf<typeof JOB_INQ_WRITER_ENUM>;
    filterType: TypeOf<typeof JOB_INQ_FILTER_ENUM>;
  },
  {
    jobInqId: string;
    title: string;
    insertionDate: string;
    authorName: string;
    inquiryWriterName: string;
    jobInqWriterEmail: string;
    jobInqWriterTeleNum: string;
    jobInqWriterCellNum: string;
    commentCount: number;
  }
> = (params) => useCustomSWR("/v1/institution/app/job-inquiry", params);

/**
 * @description 업무문의 리스트 조회
 * @param keyWord - 검색어
 * @param searchStartDate - 검색할 시작 날짜
 * @param searchEndDate - 검색할 끝 날짜짜
 * @param writerType - 검색 조건
 * @param filterType - 작성자 조건
 * @returns
 */
export const getJobInquiryListDetail: ApiFunction<
  {
    jobInqId: string;
  },
  ContactDetailResponseType
> = ({ jobInqId }) =>
  getRequest({
    url: `/v1/institution/app/job-inquiry/${jobInqId}`
  });

/**
 * @description 업무문의 댓글 등록록
 * @param jobInqId - 담당자 ID
 * @returns
 */
export const postJobInquiryAnswers: ApiFunction<
  {
    jobInqId: string;
    contents: string;
  },
  string
> = (params) =>
  postRequest({
    url: `/v1/institution/app/job-inquiry/${params.jobInqId}/answers`,
    params
  });

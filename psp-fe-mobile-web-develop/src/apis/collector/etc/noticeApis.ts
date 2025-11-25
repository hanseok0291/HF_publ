import { ApiFunction, PageableSWR } from "@/types/HttpClient.type";
import { TypeOf } from "zod";
import { WRITER_ENUM } from "@/enums/Bulletin.enum";
import { SEARCH_WITH_ENUM } from "@/enums/Common.enum";
import useCustomSWR from "@/hooks/useCustomSWR";
import { getRequest } from "@/lib/httpClients";

/** 공지사항 리스트 조회 */
export const getCollectorNoticeList: PageableSWR<
  {
    keyWord: string;
    filterType: TypeOf<typeof SEARCH_WITH_ENUM>;
    writerType: TypeOf<typeof WRITER_ENUM>;
  },
  {
    noticeId: string;
    parentFixYn: boolean;
    title: string;
    insertionName: string;
    insertionEmail: string;
    insertionIstt: string;
    insertionDate: string;
  }
> = (params) => useCustomSWR("/v1/institution/app/notice", params);

/** 공지사항 상세 조회 */
export const getNoticeId: ApiFunction<
  { noticeId: string },
  {
    noticeId: string;
    title: string;
    insertionName: string;
    insertionEmail: string;
    insertionIstt: string;
    contents: string;
    insertionDate: string;
    parentFixYn: boolean;
  }
> = ({ noticeId }) =>
  getRequest({
    url: `/v1/institution/app/notice/${noticeId}`
  });

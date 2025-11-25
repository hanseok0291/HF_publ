import { ApiFunction, PageableSWR } from "@/types/HttpClient.type";
import { z } from "zod";
import { WRITER_ENUM } from "@/enums/Bulletin.enum";
import { SEARCH_WITH_ENUM } from "@/enums/Common.enum";
import useCustomSWR from "@/hooks/useCustomSWR";
import { getRequest } from "@/lib/httpClients";

/** FAQ 조회 */
export const getCollectorFaqList: PageableSWR<
  {
    keyWord: string;
    filterType: z.infer<typeof SEARCH_WITH_ENUM>;
    writerType: z.infer<typeof WRITER_ENUM>;
  },
  {
    faqId: string;
    title: string;
    insertionName: string;
    insertionIstt: string;
    insertionDate: string;
    insertionEmail: string;
  }
> = (params) => useCustomSWR("/v1/institution/app/faq", params);

/** FAQ 상세 조회 */
export const getCollectorFaqDetail: ApiFunction<
  { faqId: string },
  {
    faqId: string;
    title: string;
    insertionIstt: string;
    insertionName: string;
    insertionEmail: string;
    contents: string;
    insertionDate: string;
  }
> = ({ faqId }) =>
  getRequest({
    url: `/v1/institution/app/faq/${faqId}`
  });

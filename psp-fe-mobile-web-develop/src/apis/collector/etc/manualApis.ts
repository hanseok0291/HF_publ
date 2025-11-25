import { PageableSWR } from "@/types/HttpClient.type";
import useCustomSWR from "@/hooks/useCustomSWR";

export const getCollectorManualList: PageableSWR<
  {
    filterType: string;
    keyWord: string;
    page: number;
    size: number;
    sort: string[];
  },
  {
    manualId: string;
    title: string;
    insertionName: string;
    insertionIstt: string;
    fileExtensionType: string | null;
    insertionDate: string;
    manualFiles: {
      manualFileId: string;
      originalFileName: string;
      fileExtensionType: string;
      fileDownloadUrl: string;
    }[];
  }
> = (params) => useCustomSWR("/v1/institution/app/manual", params);

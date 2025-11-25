import { ApiFunction, PageableSWR } from "@/types/HttpClient.type";
import { File } from "buffer";
import useCustomSWR from "@/hooks/useCustomSWR";
import { getRequest } from "@/lib/httpClients";

export const getStoreManualList: PageableSWR<
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
> = (params) => useCustomSWR("/v1/store/app/manual", params);

export const getStoreManualFile: ApiFunction<
  { manualFileId: string },
  File
> = ({ manualFileId }) =>
  getRequest({
    url: `/v1/common/manual/file/download/${manualFileId}`
  });

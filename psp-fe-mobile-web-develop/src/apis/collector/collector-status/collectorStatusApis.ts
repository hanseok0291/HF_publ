import {
  WasteCollectorDetailType,
  WasteCollectorListType
} from "@/types/apiType/collector/collector-status/WasteCollectorList.type";
import { ApiFunction, PageableSWR } from "@/types/HttpClient.type";
import { TypeOf } from "zod";
import { COLLECT_STATUS_ENUM } from "@/enums/WasteSticker.enum";
import useCustomSWR from "@/hooks/useCustomSWR";
import { getRequest, postRequest } from "@/lib/httpClients";
import { fileToBase64 } from "@/lib/utils";

/**
 * @description 수거처리 현황 리스트 조회
 * @param keyWord - 검색어
 * @param thisDisposeDate - 검색할 날짜
 * @param standardIds - 품목 조회 드롭다운 메뉴
 * @param detailStandardIds - 세부 품목 조회 드롭다운 메뉴
 * @param disposeStatusCode - 수거 상태 드롭다운 메뉴
 * @param legalEmdNm - 행정동 드롭다운 메뉴
 * @returns
 */
export const getWasteCollectionList: PageableSWR<
  {
    keyWord: string | null;
    thisDisposeDate: string;
    standardIds: string[] | null;
    detailStandardIds: string[] | null;
    disposeStatusCode: string | null;
    legalEmdNm: string | null;
    requestId: string | null;
  },
  WasteCollectorListType
> = (params) =>
  useCustomSWR("/v1/institution/app/waste-collection/request", params);
// {
//   revalidateOnFocus: false
// }
/**
 * @description 수거처리 현황 상세 조회
 * @param requestId - 수거처리 현황 ID
 * @returns
 */
export const getWasteCollectionDetail: ApiFunction<
  { requestId: string },
  WasteCollectorDetailType
> = ({ requestId }) =>
  getRequest({
    url: `/v1/institution/app/waste-collection/request/${requestId}`
  });

/**
 * @description 수거처리 현황 상태 수정
 * @param wasteCollectionRequestId - 수거처리 현황 ID
 * @param disposeStatus - 수거처리 현황 상태
 * @returns
 */
export const putCollectorStatus: ApiFunction<
  {
    wasteCollectionRequestId: string;
    disposeStatus: TypeOf<typeof COLLECT_STATUS_ENUM>;
  },
  boolean
> = (params) =>
  postRequest({
    url: "/v1/institution/app/waste-collection/request/update-status",
    params
  });

/**
 * @description 수거처리 현황 - 수거 완료일 시 사진 업로드 API
 * @param wasteCollectionRequestId - 수거처리 현황 ID
 * @returns
 */
export const postWastePhoto: ApiFunction<
  { wasteCollectionRequestId: string; files: File[] },
  string
> = async (params) => {
  const { files, ...reqDto } = params;

  // const formData = new FormData();

  // files.forEach((file) => {
  //   formData.append("files", file);
  // });

  // const reqParams = {
  //   // ...reqDto,
  //   files: await Promise.all(files.map((file) => fileToBase64(file)))
  // };
  const file = await Promise.all(files.map((file) => fileToBase64(file)));

  return postRequest({
    url: `/v1/institution/app/waste-collection/request/file/${params.wasteCollectionRequestId}`,
    params: file
  });
};

/**
 * @description 수거처리 수거 완료일 때 사진 삭제
 * @param fileId - 이미지 파일 ID
 * @returns
 */
export const deleteWastetPhoto: ApiFunction<{ fileId: string }, string> = (
  params
) =>
  postRequest({
    url: `/v1/institution/app/waste-collection/request/file/remove/${params.fileId}`,
    params
  });

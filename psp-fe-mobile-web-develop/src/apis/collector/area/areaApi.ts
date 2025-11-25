import { ApiFunction, CustomSWR, PageableSWR } from "@/types/HttpClient.type";
import useCustomSWR from "@/hooks/useCustomSWR";
import { postRequest } from "@/lib/httpClients";

export type InstitutionArea = {
  sdNm: string;
  sggNm: string;
  legalEmdNm: string;
  legalRiNm: string | null;
  roadNm: string;
  jibunMainNo: number;
  jibunSubNo: number;
  sggBuldNm: string | null;
  institutionName: string;
  takeAwayExceptionYn: false;
  memo: string | null;
};

type MapPinInfo = {
  requestId: string;
  disposeLatitude: number;
  disposeLongitude: number;
};

export const getInstitutionArea: PageableSWR<
  {
    keyWord: string;
  },
  InstitutionArea
> = (params) => useCustomSWR("/v1/institution/app/area", params);

/** 지역 관리 수정 */
export const putInstitutionArea: ApiFunction<
  {
    sdNm: string;
    sggNm: string;
    legalEmdNm: string;
    legalRiNm: string;
    roadNm: string;
    jibunMainNo: number;
    jibunSubNo: number;
    memo: string;
  },
  InstitutionArea
> = (params) =>
  postRequest({
    url: `/v1/institution/area`,
    params
  });
/**
 * @description 수거 지도 API 함수
 * @param legalEmdNm - 행정동 명
 * @returns
 */
export const getWasteCollectionRequestMapInfo: CustomSWR<
  {
    legalEmdNm?: string;
    keyWord?: string;
  },
  {
    /** 배출/수거 대기 */
    ready: MapPinInfo[];
    /** 수거 완료 */
    completed: MapPinInfo[];
    /** 12시간 미수거 */
    ready12h: MapPinInfo[];
    /** 24시간 미수거 */
    ready24h: MapPinInfo[];
    /** 48시간 미수거 */
    ready48h: MapPinInfo[];
    /** 취소 환불 */
    refunded: MapPinInfo[];
    /** 수거 불가 */
    refused: MapPinInfo[];
    /** 취소 요청 */
    cancelRequest: MapPinInfo[];
  }
> = (params) =>
  useCustomSWR("/v1/institution/app/waste-collection/request/list-map", params);

/**
 * @description 수거 지도 상세 내역 API 함수
 * @param requestId - 배출 품목 ID
 * @returns
 */
export const getWasteCollectionDetailMap: CustomSWR<
  { requestId: string },
  {
    requestId: string;
    disposeLatitude: number;
    disposeLongitude: number;
    zipCode: string;
    disposeAddress: string;
    disposeDetailAddress: string;
    specialNotes: string;
    legalEmdNm: string;
  }
> = (params) =>
  useCustomSWR(
    `/v1/common/waste-collection/request/${params.requestId}`,
    params
  );

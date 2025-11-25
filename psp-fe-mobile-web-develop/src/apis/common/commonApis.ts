import {
  AllMainMenuType,
  MenuAllType,
  MyInfoResponseType,
  WasteAllMenuType
} from "@/types/apiType/Common.type";
import { ApiFunction, CustomSWR } from "@/types/HttpClient.type";
import useCustomSWR from "@/hooks/useCustomSWR";
import { getRequest, postRequest } from "@/lib/httpClients";

/**
 * @description 로그인 권한에 따라 모든 메뉴 API 함수
 * @param authorityGroupId - 관리자 권한 ID
 * @returns
 */
export const getMenuAll: ApiFunction<void, MenuAllType> = () =>
  getRequest({
    url: `/v1/menu/all`
  });

/**
 * @description 내 정보 확인 API 함수
 * @returns
 */
export const getMyInfo: ApiFunction<void, MyInfoResponseType> = () =>
  getRequest({
    url: `/v1/my-info`
  });

/**
 * @description 내 정보 수정 API 함수
 * @param telePhoneNumber - 유선 전화번호
 * @param cellPhoneNumber - 전화번호
 * @param secondAuthKindCode - 2차 인증 코드 (필수 값)
 * @returns
 */
export const putMyInfo: ApiFunction<
  {
    telePhoneNumber: string;
    cellPhoneNumber: string;
    secondAuthKindCode: string;
  },
  string
> = (params) => postRequest({ url: `/v1/my-info`, params });

/**
 * @description 비밀번호 수정 API 함수
 * @param currentPassword - 현재 비밀번호
 * @param newPassword - 새로운 비밀번호
 * @returns
 */
export const putChangePassword: ApiFunction<
  {
    currentPassword: string;
    newPassword: string;
  },
  boolean
> = (params) => postRequest({ url: `/v1/password`, params });

/**
 * @description 행정동 드롭다운 메뉴 조회 API
 * @returns
 */
export const getLegalMenu: CustomSWR<{ institutionId: string }, string[]> = (
  params
) => useCustomSWR("/v1/address/administrative-district/institution", params);

/**
 * @description 폐기물 품목 조회 API 함수
 * @param localGovernmentId - 지자체 담당자 ID
 * @returns
 */
export const getWasteTopMenu: CustomSWR<
  { localGovernmentId: string },
  { wasteId: string; standardName: string }[]
> = (params) => useCustomSWR("/v1/waste/top", params);

/**
 * @description 폐기물 세부 품목 조회 API 함수
 * @param wasteId - 폐기물 품목 ID
 * @returns
 */
export const getWasteMiddleMenu: CustomSWR<
  { wasteId: string },
  { wasteId: string; standardName: string }[]
> = (params) => useCustomSWR("/v1/waste/middle", params);

/**
 * @description 폐기물 품목 전체 조회 API 함수
 * @param localGovernmentId - 지자체 관리자 ID
 * @returns
 */
export const getAllWasteMenu: ApiFunction<
  {
    localGovernmentId: string;
    topWasteId?: string;
    middleWasteId?: string | null;
    standardName?: string;
  },
  WasteAllMenuType
> = (params) => getRequest({ url: "/v1/waste", params });

/**
 * @description 판매소 메인 메뉴 조회 API 함수
 */
export const getAllMainMenu: ApiFunction<void, AllMainMenuType[]> = () =>
  getRequest({ url: "/v1/menu/app" });

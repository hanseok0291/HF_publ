import { ApiFunction, PageableSWR } from "@/types/HttpClient.type";
import { TypeOf } from "zod";
import { AUTH_METHOD_ENUM, KEYMAN_FILTER_ENUM } from "@/enums/Employee.enum";
import useCustomSWR from "@/hooks/useCustomSWR";
import { getRequest, postRequest } from "@/lib/httpClients";

/**
 * @description 담당자 정보 등록 함수
 * @param name - 이름
 * @param email - 이메일
 * @param secondAuthKindCode - 로그인 2차 인증
 * @param useYn - 계정 사용 가능 여부
 * @param telePhoneNumber - 유선 전화 번호
 * @param cellPhoneNumber - 휴대 전화 번호
 * @param authorityGroupId - 관리자 권한명
 * @returns
 */
export const postEmployeeInfo: ApiFunction<
  {
    name: string;
    email: string;
    secondAuthKindCode: TypeOf<typeof AUTH_METHOD_ENUM>;
    useYn: boolean;
    telePhoneNumber: string | null;
    cellPhoneNumber: string;
    authorityGroupId: string | null;
  },
  string
> = (params) => postRequest({ url: `/v1/store/key-man`, params });

/**
 * @description 담당자 정보 리스트 조회 함수
 * @param keyManId - 관리자 ID
 * @param name - 이름
 * @param email - 이메일
 * @param telePhoneNumber - 유선 전화 번호
 * @param cellPhoneNumber - 휴대 전화 번호
 * @param authorityGroupName - 권한명
 * @param useYn - 계정 사용 가능 여부
 * @returns
 */
export const getEmployeeList: PageableSWR<
  {
    useYn: boolean | null;
    searchFilter: TypeOf<typeof KEYMAN_FILTER_ENUM> | null;
    keyWord: string | null;
    authorityGroupName: string | null;
  },
  {
    keyManId: string;
    name: string;
    email: string;
    telePhoneNumber: string;
    cellPhoneNumber: string;
    authorityGroupName: string;
    useYn: true;
  }
> = (params) => useCustomSWR("/v1/store/key-man", params);

/**
 * @description 스티커 구매 내역 상세 페이지 API 함수
 * @param stickerDeliveryId - 상세 페이지
 * @returns
 */
export const getEmployeeDetail: ApiFunction<
  {
    keyManId: string;
  },
  {
    keyManId: string;
    name: string;
    email: string;
    secondAuthKindCode: TypeOf<typeof AUTH_METHOD_ENUM>;
    secondAuthKindCodeName: string;
    useYn: boolean;
    telePhoneNumber: string;
    cellPhoneNumber: string;
    authorityGroupId: string;
    authorityGroupName: string;
    lastLoginDate: string | null;
    logList: {
      roleCodeName: string;
      organizationName: string;
      name: string;
      email: string;
      insertionDate: string;
      logs: string[];
    }[];
  }
> = ({ keyManId }) =>
  getRequest({
    url: `/v1/store/key-man/${keyManId}`
  });

/**
 * @description 담당자 정보 수정 API 함수
 * @param keyManId - 담당자 ID (필수 값)
 * @param authorityGroupId - 담당자 권한명
 * @param secondAuthKindCode - 로그인 2차 인증 코드 (필수 값)
 * @param useYn - 계정 사용 (필수 값)
 * @param telePhoneNumber - 유선 번호
 * @param cellPhoneNumber - 휴대 전화 (필수 값)
 * @returns
 */
export const putEmployeeDetail: ApiFunction<
  {
    keyManId: string;
    authorityGroupId: string | null;
    secondAuthKindCode: TypeOf<typeof AUTH_METHOD_ENUM>;
    useYn: boolean;
    telePhoneNumber: string | null;
    cellPhoneNumber: string;
  },
  string
> = (params) =>
  postRequest({
    url: `/v1/store/key-man/${params.keyManId}`,
    params
  });

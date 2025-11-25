import { ApiFunction, PageableSWR } from "@/types/HttpClient.type";
import { AuthorityGroupDetailType } from "@/types/store/employee/AddAdminPower.type";
import useCustomSWR from "@/hooks/useCustomSWR";
import { getRequest, postRequest } from "@/lib/httpClients";

/**
 * @description 관리자 권한 리스트 API 함수
 * @param authorityGroupName - 관리자 권한 ID
 * @returns
 */
export const getAuthorityGroupList: PageableSWR<
  {
    authorityGroupName: string;
  },
  {
    authorityGroupId: string;
    authorityGroupName: string;
    updatedDate: string;
    updateUserId: string;
    updateUserName: string;
    updateUserEmail: string;
    assignmentCount: number;
  }
> = (params) => useCustomSWR(`/v1/store/authority-group`, params);

/**
 * @description 관리자 권한 등록 API 함수
 * @param authorityGroupName - 관리자 권한명
 * @param menuList - 권한 리스트
 * @param menuId - 권한 메뉴 ID
 * @param inquiryYn - 조회 권한
 * @param editYn - 편집 권한
 * @returns
 */
export const postAuthorityGroup: ApiFunction<
  {
    authorityGroupName: string;
    menuList: {
      menuId: string;
      inquiryYn: boolean;
      editYn: boolean;
    }[];
  },
  string
> = (params) => postRequest({ url: `/v1/store/authority-group`, params });

export const getAuthorityGroupDetail: ApiFunction<
  { authorityGroupId: string },
  AuthorityGroupDetailType
> = ({ authorityGroupId }) =>
  getRequest({
    url: `/v1/store/authority-group/${authorityGroupId}`
  });

/**
 * @description 관리자 권한 수정 API 함수
 *  @param authorityGroupId - 관리자 권한 ID
 * @param authorityGroupName - 관리자 권한명
 * @param menuList - 권한 리스트
 * @param menuId - 권한 메뉴 ID
 * @param inquiryYn - 조회 권한
 * @param editYn - 편집 권한
 * @returns
 */
export const putAuthorityGroup: ApiFunction<
  {
    authorityGroupId: string;
    authorityGroupName: string;
    menuList: {
      menuId: string;
      inquiryYn: boolean;
      editYn: boolean;
    }[];
  },
  string
> = (params) =>
  postRequest({
    url: `/v1/store/authority-group/${params.authorityGroupId}`,
    params
  });

/**
 * @description 관리자 권한 삭제 API 함수
 * @param authorityGroupId - 관리자 권한 ID
 * @returns
 */
export const deleteAuthorityGroup: ApiFunction<
  {
    authorityGroupId: string;
  },
  string
> = ({ authorityGroupId }) =>
  postRequest({
    url: `/v1/store/authority-group/remove/${authorityGroupId}`
  });

/**
 * @description 관리자 권한 드롭다운 API 함수
 */
export const getAuthorityGroupDropDown: ApiFunction<
  void,
  { authorityGroupId: string; authorityGroupName: string }[]
> = () =>
  getRequest({
    url: `/v1/store/authority-group/all`
  });

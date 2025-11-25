import { TypeOf } from "zod";
import { AUTH_METHOD_ENUM } from "@/enums/Employee.enum";

export type EmployeeDetailResponseType = {
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
};

// 공통으로 사용되는 메뉴 속성들을 위한 인터페이스
export type BaseAuthorityDetailType = {
  authorityGroupId: string;
  authorityGroupName: string;
  updateUserEmail: string;
  updateUserId: string;
  updateUserName: string;
  updatedDate: string;
};

export type ChildrenAuthorityDetailType = {
  menuId: string;
  menuName: string;
  path: string;
  icon: string | null;
  type: string;
  displayYn: boolean;
  inquiryYn: boolean;
  editYn: boolean;
  children: ChildrenMenuItem[];
  addMenuName: string | null;
  detailMenuName: string | null;
  optionalMenuName: string | null;
};

// 재귀적 구조를 위한 메뉴 아이템 타입
interface ChildrenMenuItem extends ChildrenAuthorityDetailType {
  children: ChildrenMenuItem[];
}

export type AuthorityGroupDetailType = ChildrenMenuItem[];

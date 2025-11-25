import { TypeOf } from "zod";
import { AUTH_METHOD_ENUM } from "@/enums/Employee.enum";
import { MyInfoSchema } from "@/schema/common/MyInfo.schema";

export type ApiCommonResponse<T> = Promise<{
  code: number;
  message: string;
  content: T;
}>;

export type ApiContentResponse<T> = {
  content: T;
  pageable: {
    pageNumber: number;
    pageSize: number;
  };
  totalPages: number;
};

export type VerificationLoginType = {
  adminId: string;
  name: string;
  roleCode: string;
  roleTitle: string;
  accessToken: string;
  accessDate: string;
  expireDate: string;
  accessExpireIn: string;
  refreshToken: string;
  refreshExpireIn: string;
  passwordChangeRequireYn: boolean;
  localGovernmentId: null;
  positionName: string;
  institutionId: string;
  storeId: string;
};

// 공통으로 사용되는 메뉴 속성들을 위한 인터페이스
export type BaseMenuItem = {
  menuId: string;
  menuName: string;
  path: string | null;
  icon: string | null;
  type: "MAIN" | "PAGE";
  displayYn: boolean;
  inquiryYn: boolean;
  editYn: boolean;
  addMenuName: string | null;
  detailMenuName: string | null;
  optionalMenuName: string | null;
};

// 재귀적 구조를 위한 메뉴 아이템 타입
interface MenuItem extends BaseMenuItem {
  children: MenuItem[];
}

export type MenuAllType = MenuItem[];

// 내정보 확인 api
export type MyInfoResponseType = {
  adminId: string;
  name: string;
  loginId: string;
  telePhoneNumber: string;
  cellPhoneNumber: string;
  secondAuthKindCode: TypeOf<typeof AUTH_METHOD_ENUM>;
  secondAuthKindCodeName: string;
  positionName: string;
  authorCodeName: string;
  localGovernmentId: string;
  address: string;
  logoImage: string;
};

export type MyInfoFormValues = TypeOf<typeof MyInfoSchema>;

// 수거 지도 api
export type CollectorListMapType = {
  ready: {
    requestId: string;
    disposeLatitude: number;
    disposeLongitude: number;
  }[];
  completed: {
    requestId: string;
    disposeLatitude: number;
    disposeLongitude: number;
  }[];
  ready12h: {
    requestId: string;
    disposeLatitude: number;
    disposeLongitude: number;
  }[];
  ready24h: {
    requestId: string;
    disposeLatitude: number;
    disposeLongitude: number;
  }[];
  ready48h: {
    requestId: string;
    disposeLatitude: number;
    disposeLongitude: number;
  }[];
  refunded: {
    requestId: string;
    disposeLatitude: number;
    disposeLongitude: number;
  }[];
  refused: {
    requestId: string;
    disposeLatitude: number;
    disposeLongitude: number;
  }[];
  cancelRequest: {
    requestId: string;
    disposeLatitude: number;
    disposeLongitude: number;
  }[];
};

export type AddressCheckParams = {
  sdNm: string; //siNm
  sggNm: string; //sggNm
  legalEmdNm: string; //emdNm
  roadNm: string; // rn
  jibunMainNo: number; //lnbrMnnm
  jibunSubNo: number; //lnbrSlno
};

export interface WasteMenuItem {
  wasteId: string;
  topStandardName: string;
  middleStandardName: string;
  standardName: string;
  fee: number;
  quantity: number;
}

// API 응답의 content에 들어갈 타입
export type WasteAllMenuType = WasteMenuItem[];

// 메인 메뉴 앱
export type AllMainMenuType = {
  menuId: string;
  menuName: string;
  menuType: string; // S: 스티커, T:종량제
  path: string;
  icon: string;
  type: string;
  displayYn: boolean;
  inquiryYn: boolean;
  editYn: boolean;
};

export type AccountPurchaseResponse = {
  /** 은행명 */
  bankName: string;
  /** 계좌 번호 */
  bankAccount: string;
  /** 입금자명 */
  inputName: string;
  /** 금액 */
  pmtAmt: string;
  /** 납부 기한 */
  expireDate: string;
}
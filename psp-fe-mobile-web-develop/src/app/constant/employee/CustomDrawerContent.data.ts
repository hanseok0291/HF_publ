import { TypeOf } from "zod";
import { SEARCH_WITH_ENUM } from "@/enums/Common.enum";
import { KEYMAN_FILTER_ENUM } from "@/enums/Employee.enum";

export const searchId: {
  id: number;
  content: string;
  value: string;
}[] = [
  { id: 0, content: "전체", value: "null" },
  { id: 1, content: "사용", value: "true" },
  { id: 2, content: "미사용", value: "false" }
];

export const searchFilter: {
  id: number;
  content: string;
  value: TypeOf<typeof KEYMAN_FILTER_ENUM>;
}[] = [
  { id: 1, content: "전체", value: "ALL" },
  { id: 2, content: "이름", value: "NAME" },
  { id: 3, content: "아이디", value: "EMAIL" },
  { id: 4, content: "유선번호", value: "TELEPHONE" },
  { id: 5, content: "휴대전화", value: "CELLPHONE" }
];

export const noticeSearchFilter: {
  id: number;
  content: string;
  value: TypeOf<typeof SEARCH_WITH_ENUM>;
}[] = [
  { id: 1, content: "전체", value: "ALL" },
  { id: 2, content: "제목", value: "TITLE" },
  { id: 3, content: "작성자", value: "WRITER" }
];

export const adminPower = [
  { id: 1, content: "권한명1", value: "1" },
  { id: 2, content: "권한명2", value: "2" },
  { id: 3, content: "권한명3", value: "3" },
  { id: 4, content: "권한명4", value: "4" },
  { id: 5, content: "권한명5", value: "5" }
];

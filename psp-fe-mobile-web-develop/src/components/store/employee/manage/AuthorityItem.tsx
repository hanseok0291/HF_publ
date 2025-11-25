"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  formatDateWithTime,
  formatMaskingEmail,
  formatMaskingName
} from "@/utils/formatUtils";
import EmployeeName from "../list/EmployeeName";

export type AuthorityItemType = {
  authorityGroupId: string;
  authorityGroupName: string;
  updatedDate: string;
  updateUserId: string;
  updateUserName: string;
  updateUserEmail: string;
  assignmentCount: number;
};

export default function AuthorityItem({ item }: { item: AuthorityItemType }) {
  const router = useRouter();

  // const handleClick = () => {
  //   router.push("/store/employee/change");
  // };

  const authorityList = [
    {
      id: 1,
      text: "등록일시",
      data: formatDateWithTime(item.updatedDate, "detail")
    },
    //TODO: 서버 개발 일정 이슈로 임시 미노출, 서버 개발 완료 후 원복 예정
    // {
    //   id: 2,
    //   text: "등록자 정보",
    //   data: `${formatMaskingName(item.updateUserName)}(${formatMaskingEmail(item.updateUserEmail)})`
    // },
    { id: 3, text: "배정", data: item.assignmentCount }
  ];
  return (
    <Link
      href={`/store/employee/manage/detail/${item.authorityGroupId}`}
      className="shadow-menu_container bg-white p-[16px] flex flex-col gap-[12px]"
    >
      <EmployeeName
        title={item.authorityGroupName}
        listNum={item.authorityGroupId}
      />
      <hr className="bg-[#ECECEC]" />
      {authorityList.map((item) => {
        return (
          <div className="flex justify-between items-center" key={item.id}>
            <p className="text-gray80 text-[12px] font-medium">{item.text}</p>
            <p className="text-black text-[12px] font-normal">{item.data}</p>
          </div>
        );
      })}
    </Link>
  );
}

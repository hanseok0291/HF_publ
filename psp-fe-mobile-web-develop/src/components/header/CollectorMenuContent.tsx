"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next/client";
import { clearServerCookie } from "@/utils/cookieUtil.sever";
import Modal from "../common/Modal";
import BasicMenu from "./_components/collector/BasicMenu";

type CollectorMenuContentType = {
  handleToggleMenu: any;
};
export default function CollectorMenuContent({
  handleToggleMenu
}: CollectorMenuContentType) {
  const [isShowLogoutConfirm, setIsShowLogoutConfirm] = useState(false);
  const [userName, setUserName] = useState("");
  const router = useRouter();
  useEffect(() => {
    const name = getCookie("userName")?.toString() ?? "-";

    setUserName(name);
  }, []);

  const handleLogOut = () => {
    console.log("logOut");
    clearServerCookie();
    handleToggleMenu();
    router.replace("collector/login");
  };
  const headerLinkData = [
    { id: 1, text: "관할 지역 리스트", link: "/collector/collector-area" },
    { id: 2, text: "매뉴얼", link: "/collector/manual" },
    { id: 3, text: "업무 문의", link: "/collector/contact" },
    { id: 4, text: "공지사항", link: "/collector/notice" },
    { id: 5, text: "FAQ", link: "/collector/faq" }
  ];
  return (
    <section className="h-dvh">
      <div className="bg-gray10">
        <h4 className="mb-[16px]">
          <span className="font-bold">{userName}</span>님
        </h4>
        <BasicMenu handleToggleMenu={handleToggleMenu} />
      </div>

      <div className="h-[432px] flex flex-col justify-between">
        <div className="flex flex-col">
          {headerLinkData.map((item) => {
            return (
              <Link
                href={item.link}
                key={item.id}
                className="py-[16px]"
                onClick={handleToggleMenu}
              >
                {item.text}
              </Link>
            );
          })}
        </div>
        <div className="flex items-center justify-between">
          <Link
            href={"/collector/government-info"}
            className="text-[13px] text-gray60 font-medium"
            onClick={handleToggleMenu}
          >
            소속 지자체 정보
          </Link>
          <Modal
            trigger="로그아웃"
            triggerClassName="text-[13px] text-gray60 font-medium cursor-pointer hover:font-bold"
            open={isShowLogoutConfirm}
            onOpenChange={setIsShowLogoutConfirm}
            description={`로그아웃 하시겠습니까?`}
            onConfirm={handleLogOut}
            cancelButton={{ text: "취소" }}
          />
        </div>
      </div>
    </section>
  );
}

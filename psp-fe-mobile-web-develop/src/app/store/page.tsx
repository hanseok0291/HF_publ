"use client";

import { AllMainMenuType } from "@/types/apiType/Common.type";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next/client";
import { useShallow } from "zustand/react/shallow";
import { getAllMainMenu } from "@/apis/common/commonApis";
import Modal from "@/components/common/Modal";
import LogoHeader from "@/components/header/LogoHeader";
import MainContent from "@/components/store/waste-sticker/purchase/MainContent";
import useMenuList from "@/stores/useMenu";
import { clearServerCookie } from "@/utils/cookieUtil.sever";

export default function Page() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isShowLogoutConfirm, setIsShowLogoutConfirm] = useState(false);
  const [cookieData, setCookieData] = useState({
    userName: "-"
  });
  const [menu, setMenu] = useState<AllMainMenuType[]>([]);
  const { setMenuList } = useMenuList(
    useShallow((state) => ({
      setMenuList: state.setMenuList
    }))
  );
  useEffect(() => {
    const name = getCookie("userName")?.toString() ?? "-";
    setCookieData({
      userName: name
    });
  }, []);

  useEffect(() => {
    try {
      const fetchAllMenu = async () => {
        const response = await getAllMainMenu();
        setMenu(response.content);
        setMenuList(response.content);
      };
      console.log(menu);
      fetchAllMenu();
    } catch (error) {}
  }, []);

  useEffect(() => {
    console.log("1,", menu);
  }, [menu]);

  const handleLogOut = () => {
    console.log("logOut");
    clearServerCookie();
    router.replace("store/login");
  };
  return (
    <div className="animate-fade-in bg-gray10 h-[100svh] overflow-y-auto">
      <LogoHeader isOpen={isOpen} setIsOpen={setIsOpen} />
      <section className="px-[20px] pt-[20px]">
        {/* user name (store 생성 후 대체체) */}
        <div className="flex justify-between items-center mb-[20px]">
          <h4 className="text-[16px] font-medium">
            <span className="text-[16px] font-bold cursor-pointer">
              {cookieData.userName}
            </span>
            님
          </h4>
          <Modal
            trigger="로그아웃"
            triggerClassName="cursor-pointer hover:font-bold"
            open={isShowLogoutConfirm}
            onOpenChange={setIsShowLogoutConfirm}
            description={`로그아웃 하시겠습니까?`}
            onConfirm={handleLogOut}
            cancelButton={{ text: "취소" }}
          />
        </div>
        <div className="grid grid-cols-2 gap-[12px] [&>*:last-child]:col-span-2">
          {menu.map((list) => {
            return (
              <MainContent
                key={list.menuId}
                img={list.icon}
                imgAlt={list.menuName}
                menuText={list.menuName}
                link={list.path}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}

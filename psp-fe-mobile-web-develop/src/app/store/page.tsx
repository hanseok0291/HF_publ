"use client";

import { AllMainMenuType } from "@/types/apiType/Common.type";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
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

  // 임시 메뉴 데이터 (API 데이터가 없을 때 사용)
  const mockMenu: AllMainMenuType[] = [
    {
      menuId: "1",
      menuName: "스티커 구매 신청",
      menuType: "S",
      path: "/store/waste-sticker/add",
      icon: "/icons/buy_sticker.png",
      type: "MAIN",
      displayYn: true,
      inquiryYn: true,
      editYn: true
    },
    {
      menuId: "2",
      menuName: "스티커 구매 내역",
      menuType: "S",
      path: "/store/waste-sticker/detail",
      icon: "/icons/buy_sticker.png",
      type: "MAIN",
      displayYn: true,
      inquiryYn: true,
      editYn: true
    },
    {
      menuId: "3",
      menuName: "봉투 구매 신청",
      menuType: "T",
      path: "/store/trash-bag/add",
      icon: "/icons/buy_trash_bag.png",
      type: "MAIN",
      displayYn: true,
      inquiryYn: true,
      editYn: true
    },
    {
      menuId: "4",
      menuName: "봉투 구매 내역",
      menuType: "T",
      path: "/store/trash-bag/detail",
      icon: "/icons/buy_trash_bag.png",
      type: "MAIN",
      displayYn: true,
      inquiryYn: true,
      editYn: true
    },
    {
      menuId: "5",
      menuName: "공지사항",
      menuType: "N",
      path: "/store/notice",
      icon: "",
      type: "MAIN",
      displayYn: true,
      inquiryYn: true,
      editYn: true
    }
  ];

  // 메뉴 데이터가 없으면 임시 데이터 사용
  const displayMenu = menu.length > 0 ? menu : mockMenu;

  // 공지사항 메뉴 찾기 (마지막 메뉴로 가정)
  const noticeMenu = displayMenu[displayMenu.length - 1];
  const regularMenus = displayMenu.slice(0, -1);

  return (
    <div className="animate-fade-in bg-login-gradient lg:bg-login-gradient h-[100svh] overflow-y-auto">
      {/* 모바일: 헤더 */}
      <div className="lg:hidden">
        <LogoHeader isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>

      {/* PC: 헤더 */}
      <header className="hidden lg:flex items-center justify-between bg-main px-[40px] py-[16px]">
        {/* 왼쪽: 로고 + 판매소명 노출 버튼 */}
        <div className="flex items-center gap-[16px]">
          <div className="flex items-center gap-[8px]">
            <Image
              src="/images/logo_white.svg"
              alt="greenOne Logo"
              width={154}
              height={27}
              className="object-contain"
            />
          </div>
          <button className="px-[16px] py-[8px] border-[1px] border-solid border-white/40 rounded-full text-white text-[14px] font-medium">
            판매소명 노출
          </button>
        </div>

        {/* 오른쪽: 사용자명 + 로그아웃 */}
        <div className="flex items-center gap-[12px]">
          <span className="text-white text-[14px] font-medium">
            {cookieData.userName}
            <span className="font-normal">님</span>
          </span>
          <div className="w-[1px] h-[16px] bg-white/30"></div>
          <Modal
            trigger="로그아웃"
            triggerClassName="text-white text-[14px] font-medium cursor-pointer hover:opacity-80 transition-opacity"
            open={isShowLogoutConfirm}
            onOpenChange={setIsShowLogoutConfirm}
            description={`로그아웃 하시겠습니까?`}
            onConfirm={handleLogOut}
            cancelButton={{ text: "취소" }}
          />
        </div>
      </header>

      {/* 모바일: 메인 콘텐츠 */}
      <main className="lg:hidden flex flex-col min-h-[calc(100svh-64px)] px-[20px] pt-[32px] pb-[40px]">
        {/* 사용자 인사말 */}
        <h1 className="text-[24px] font-bold text-[#0F0F10] mb-[32px]">
          {cookieData.userName}
          <span className="font-normal">님</span>
        </h1>

        {/* 메뉴 그리드 */}
        <div className="flex flex-col gap-[12px] mb-[40px]">
          {/* 상단 2x2 그리드 */}
          <div className="grid grid-cols-2 gap-[12px]">
            {regularMenus.map((list) => {
              return (
                <Link
                  key={list.menuId}
                  href={list.path}
                  className="flex flex-col items-center justify-center gap-[8px] bg-white rounded-[12px] p-[16px] shadow-[0_2px_8px_rgba(0,0,0,0.1)] active:scale-[0.98] transition-transform"
                >
                  {list.icon && (
                    <Image
                      src={list.icon}
                      width={28}
                      height={28}
                      alt={list.menuName}
                      className="object-contain"
                      unoptimized
                    />
                  )}
                  <span className="text-[16px] font-semibold text-[#222] text-center">
                    {list.menuName}
                  </span>
                </Link>
              );
            })}
          </div>
          {/* 하단 넓은 카드 */}
          {noticeMenu && (
            <Link
              href={noticeMenu.path}
              className="flex items-center justify-center bg-white rounded-[12px] p-[16px] shadow-[0_2px_8px_rgba(0,0,0,0.1)] active:scale-[0.98] transition-transform"
            >
              <span className="text-[16px] font-semibold text-[#222]">
                {noticeMenu.menuName}
              </span>
            </Link>
          )}
        </div>

        {/* 로그아웃 버튼 */}
        <div className="mt-auto flex justify-center">
          <Modal
            trigger="로그아웃"
            triggerClassName="text-[#3F3F46] text-[16px] font-medium cursor-pointer hover:text-black transition-colors"
            open={isShowLogoutConfirm}
            onOpenChange={setIsShowLogoutConfirm}
            description={`로그아웃 하시겠습니까?`}
            onConfirm={handleLogOut}
            cancelButton={{ text: "취소" }}
          />
        </div>
      </main>

      {/* PC: 메인 콘텐츠 */}
      <main className="hidden lg:flex flex-col items-center justify-center min-h-[calc(100vh-72px)] px-[40px] py-[60px]">
        <div className="flex flex-col items-center gap-[20px]">
          {/* 상단 2x2 그리드 */}
          <div className="grid grid-cols-2 gap-[20px]">
            {regularMenus.map((list) => {
              return (
                <Link
                  key={list.menuId}
                  href={list.path}
                  className="flex flex-col items-center justify-center gap-[16px] bg-white rounded-[12px] p-[24px] w-[247px] h-auto shadow-[0_2px_8px_rgba(0,0,0,0.1)] transition-shadow cursor-pointer"
                >
                  {list.icon && (
                    <Image
                      src={list.icon}
                      width={48}
                      height={48}
                      alt={list.menuName}
                      className="object-contain"
                      unoptimized
                    />
                  )}
                  <span className="text-[20px] font-semibold text-[#222]">
                    {list.menuName}
                  </span>
                </Link>
              );
            })}
          </div>
          {/* 하단 넓은 카드 */}
          {noticeMenu && (
            <Link
              href={noticeMenu.path}
              className="flex items-center justify-center bg-white rounded-[12px] p-[40px] w-full h-[80px] shadow-[0_2px_8px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-shadow cursor-pointer"
            >
              <span className="text-[20px] font-semibold text-[#222]">
                {noticeMenu.menuName}
              </span>
            </Link>
          )}
        </div>
      </main>
    </div>
  );
}

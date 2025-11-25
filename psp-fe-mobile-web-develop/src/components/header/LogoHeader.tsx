"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { getCookie } from "cookies-next/client";
import { X } from "lucide-react";
import AccordionMenu from "./AccordionMenu";
import CollectorMenuContent from "./CollectorMenuContent";
import HeaderContainer from "./HeaderContainer";

const MENU_OPEN_CLASS = "menu-open";

export default function LogoHeader({
  isOpen,
  setIsOpen
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) {
  const [cookieData, setCookieData] = useState({
    positionName: "",
    logoImage: ""
  });
  const pathname = usePathname();

  const getServiceType = (path: string) => {
    if (path.startsWith("/store")) return "store";
    if (path.startsWith("/collector")) return "collector";
    return "store";
  };
  const service = getServiceType(pathname);

  useEffect(() => {
    // 컴포넌트 마운트 시 초기 상태 설정
    toggleMenuOpenClass(isOpen);
    // 클린업 함수
    return () => {
      toggleMenuOpenClass(false);
    };
  }, [isOpen]);

  useEffect(() => {
    const positionName = getCookie("positionName")?.toString() ?? "";
    const logoImage = getCookie("logoImage")?.toString() ?? "-";
    console.log(logoImage);
    setCookieData({
      positionName: positionName,
      logoImage: logoImage
    });
  }, []);

  const handleCloseMenu = () => {
    setIsOpen(false);
  };

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const RenderHeaderContent = (service: string) => {
    if (service === "store") {
      return <AccordionMenu />;
    } else if (service === "collector") {
      return <CollectorMenuContent handleToggleMenu={handleToggleMenu} />;
    }
  };

  const toggleMenuOpenClass = (shouldAdd: boolean) => {
    // html 요소를 직접 선택
    const htmlElement = document.documentElement;
    if (!htmlElement) return;

    if (shouldAdd) {
      htmlElement.classList.add(MENU_OPEN_CLASS);
    } else {
      htmlElement.classList.remove(MENU_OPEN_CLASS);
    }
  };

  return (
    <>
      <HeaderContainer
        className={`${service === "collector" ? "p-[16px_20px]" : ""} relative z-[50]`}
      >
        <div className="flex items-center gap-[10px]">
          {cookieData.logoImage ? (
            <Image
              src={cookieData.logoImage}
              alt="로고 이미지"
              width={42}
              height={42}
            />
          ) : (
            <span className="bg-black inline-block text-white text-[12px] rounded-md p-[2px_8px]">
              지자체
              <br />
              LOGO
            </span>
          )}

          <p className="text-[16px] max-w-[15ch] truncate font-bold text-black">
            {cookieData.positionName}
          </p>
        </div>

        <button
          className="relative flex items-center justify-center"
          onClick={handleToggleMenu}
          aria-label="메뉴 열기/닫기"
        >
          <Image
            src={`/icons/menu.svg`}
            alt="mobile menu button"
            className={`absolute transition-all duration-300 ease-in-out ${
              isOpen
                ? "rotate-180 scale-75 opacity-0"
                : "rotate-0 scale-100 opacity-100"
            }`}
            width={24}
            height={24}
          />
          <X
            className={`transition-all duration-300 ease-in-out ${
              isOpen
                ? "rotate-0 scale-100 opacity-100"
                : "-rotate-180 scale-75 opacity-0"
            }`}
            width={24}
            height={24}
          />
        </button>
      </HeaderContainer>

      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 z-20 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleCloseMenu}
      />

      <div
        className={`fixed top-0 left-0 right-0 h-screen bg-white z-40 transition-transform duration-300 ease-in-out transform flex flex-col ${
          isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        {/* 메뉴 상단 여백 */}
        <div className="h-[64px]" />

        {/* 스크롤 가능한 메뉴 컨텐츠 */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-[20px_16px]">{RenderHeaderContent(service)}</div>
        </div>
      </div>
    </>
  );
}

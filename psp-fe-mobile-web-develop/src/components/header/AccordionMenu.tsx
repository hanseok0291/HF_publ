"use client";

import { AllMainMenuType } from "@/types/apiType/Common.type";
import { MenuListType } from "@/types/components/header/MenuList.type";
import { useShallow } from "zustand/react/shallow";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  employeeMenu,
  etcMenu
} from "@/app/constant/components/header/MenuList.data";
import useMenuList from "@/stores/useMenu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "../ui/accordion";
import MenuList from "./MenuList";
import { Clock, ShoppingBag, Users, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AccordionMenu() {
  const pathname = usePathname();
  const { menuList } = useMenuList(
    useShallow((state) => ({
      menuList: state.menuList
    }))
  );

  // 현재 경로에 따라 기본으로 펼쳐질 아코디언 결정
  const getDefaultValue = () => {
    if (pathname.startsWith("/store/waste-sticker") || pathname.startsWith("/store/trash-bag")) {
      if (pathname.startsWith("/store/waste-sticker")) {
        return "item-1"; // 폐기물 스티커 구매 관리
      } else if (pathname.startsWith("/store/trash-bag")) {
        return "item-2"; // 종량제 봉투 구매 관리
      }
    }
    return undefined;
  };

  const [defaultValue, setDefaultValue] = useState<string | undefined>(getDefaultValue());

  useEffect(() => {
    setDefaultValue(getDefaultValue());
  }, [pathname]);

  // 임시 메뉴 데이터 (API 데이터가 없을 때 사용)
  const mockStickerMenu: AllMainMenuType[] = [
    {
      menuId: "1",
      menuName: "스티커 구매 신청",
      menuType: "S",
      path: "/store/waste-sticker/add",
      icon: "",
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
      icon: "",
      type: "MAIN",
      displayYn: true,
      inquiryYn: true,
      editYn: true
    }
  ];

  const mockTrashBagMenu: AllMainMenuType[] = [
    {
      menuId: "3",
      menuName: "봉투 구매 신청",
      menuType: "T",
      path: "/store/trash-bag/add",
      icon: "",
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
      icon: "",
      type: "MAIN",
      displayYn: true,
      inquiryYn: true,
      editYn: true
    }
  ];

  const stickerFilter = menuList.filter((item) => {
    return item.menuType === "S";
  });

  const trashBagFilter = menuList.filter((item) => {
    return item.menuType === "T";
  });

  // 메뉴 데이터가 없으면 임시 데이터 사용
  const displayStickerFilter = stickerFilter.length > 0 ? stickerFilter : mockStickerMenu;
  const displayTrashBagFilter = trashBagFilter.length > 0 ? trashBagFilter : mockTrashBagMenu;

  const converterMenu = (menu: MenuListType): AllMainMenuType[] => {
    const menuList: AllMainMenuType[] = [];
    menu.menuText.map((item, index) => {
      const convertMenu: AllMainMenuType = {
        menuId: item.id.toString(),
        menuName: item.text,
        path: menu.link[index].text,
        icon: "",
        type: "",
        displayYn: false,
        inquiryYn: false,
        editYn: false,
        menuType: ""
      };
      menuList.push(convertMenu);
    });

    return menuList;
  };

  return (
    <Accordion type="single" collapsible defaultValue={defaultValue}>
      <AccordionItem className="border-0 py-0" value="item-1">
        <AccordionTrigger 
          className={cn(
            "px-[12px] hover:no-underline rounded-[4px]",
            "data-[state=open]:bg-[#F0F4FF]",
            "[&[data-state=open]_svg]:text-[#3c7cfd]",
            "[&[data-state=open]_span]:text-[#3c7cfd]"
          )}
        >
          <div className="flex items-center gap-[8px]">
            <Clock className="w-[18px] h-[18px] text-gray-700" />
            <span className="text-[14px] font-medium text-gray-900">폐기물 스티커 구매 관리</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pt-0 pb-[8px] px-0">
          <MenuList menu={displayStickerFilter} />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem className="border-0 py-0" value="item-2">
        <AccordionTrigger 
          className={cn(
            "px-[12px] hover:no-underline rounded-[4px]",
            "data-[state=open]:bg-[#F0F4FF]",
            "[&[data-state=open]_svg]:text-[#3c7cfd]",
            "[&[data-state=open]_span]:text-[#3c7cfd]"
          )}
        >
          <div className="flex items-center gap-[8px]">
            <ShoppingBag className="w-[18px] h-[18px] text-gray-700" />
            <span className="text-[14px] font-medium text-gray-900">종량제 봉투 구매 관리</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pt-0 pb-[8px] px-0">
          <MenuList menu={displayTrashBagFilter} />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem className="border-0 py-0" value="item-3">
        <AccordionTrigger 
          className={cn(
            "px-[12px] hover:no-underline rounded-[4px]",
            "data-[state=open]:bg-[#F0F4FF]",
            "[&[data-state=open]_svg]:text-[#3c7cfd]",
            "[&[data-state=open]_span]:text-[#3c7cfd]"
          )}
        >
          <div className="flex items-center gap-[8px]">
            <Users className="w-[18px] h-[18px] text-gray-700" />
            <span className="text-[14px] font-medium text-gray-900">직원 관리</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pt-0 pb-[8px] px-0">
          <MenuList menu={converterMenu(employeeMenu)} />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem className="border-0 py-0" value="item-4">
        <AccordionTrigger 
          className={cn(
            "px-[12px] hover:no-underline rounded-[4px]",
            "data-[state=open]:bg-[#F0F4FF]",
            "[&[data-state=open]_svg]:text-[#3c7cfd]",
            "[&[data-state=open]_span]:text-[#3c7cfd]"
          )}
        >
          <div className="flex items-center gap-[8px]">
            <Settings className="w-[18px] h-[18px] text-gray-700" />
            <span className="text-[14px] font-medium text-gray-900">기타 지원</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pt-0 pb-[8px] px-0">
          <MenuList menu={converterMenu(etcMenu)} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

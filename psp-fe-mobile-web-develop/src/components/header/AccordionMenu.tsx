import { AllMainMenuType } from "@/types/apiType/Common.type";
import { MenuListType } from "@/types/components/header/MenuList.type";
import { useShallow } from "zustand/react/shallow";
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

export default function AccordionMenu() {
  const { menuList } = useMenuList(
    useShallow((state) => ({
      menuList: state.menuList
    }))
  );

  const stickerFilter = menuList.filter((item) => {
    return item.menuType === "S";
  });

  const trashBagFilter = menuList.filter((item) => {
    return item.menuType === "T";
  });

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
    <Accordion type="single" collapsible>
      {stickerFilter.length > 0 && (
        <AccordionItem className="border-0 py-5" value="item-1">
          <AccordionTrigger className="p-0">
            폐기물 스티커 구매관리
          </AccordionTrigger>
          <AccordionContent>
            <MenuList menu={stickerFilter} />
          </AccordionContent>
        </AccordionItem>
      )}
      {trashBagFilter.length > 0 && (
        <AccordionItem className="border-0 py-5" value="item-2">
          <AccordionTrigger className="p-0">
            종량제 봉투 구매관리
          </AccordionTrigger>
          <AccordionContent>
            <MenuList menu={trashBagFilter} />
          </AccordionContent>
        </AccordionItem>
      )}
      <AccordionItem className="border-0 py-5" value="item-3">
        <AccordionTrigger className="p-0">직원관리</AccordionTrigger>
        <AccordionContent>
          <MenuList menu={converterMenu(employeeMenu)} />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem className="border-0 py-5" value="item-4">
        <AccordionTrigger className="p-0">기타지원</AccordionTrigger>
        <AccordionContent>
          <MenuList menu={converterMenu(etcMenu)} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

"use client";

import { ArrowAndMenuHeaderType } from "@/types/components/common/CommonComponents.type";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import HeaderButton from "./_components/store/HeaderButton";
import HeaderTitle from "./_components/store/HeaderTitle";
import OpenHeaderContent from "./_components/store/OpenHeaderContent";
import HeaderContainer from "./HeaderContainer";

const MENU_OPEN_CLASS = "menu-open";
export default function ArrowAndMenuHeader({
  headerTitle,
  className,
  isModal = false
}: ArrowAndMenuHeaderType) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();
  const service = pathname.split("/")[1];

  const toggleMenuOpenClass = (shouldAdd: boolean) => {
    const htmlElement = document.documentElement;
    if (!htmlElement) return;

    if (shouldAdd) {
      htmlElement.classList.add(MENU_OPEN_CLASS);
    } else {
      htmlElement.classList.remove(MENU_OPEN_CLASS);
    }
  };

  useEffect(() => {
    toggleMenuOpenClass(isOpen);
    return () => {
      toggleMenuOpenClass(false);
    };
  }, [isOpen]);

  const handleOnclick = () => {
    router.push(`/${service}`);
  };

  const handleCloseMenu = () => {
    setIsOpen(false);
  };

  const HEADER_CONTAINER_STYLE = cn("relative z-[99] bg-white", className);
  return (
    <>
      <HeaderContainer className={HEADER_CONTAINER_STYLE}>
        <HeaderTitle
          isOpen={isOpen}
          handleClick={handleOnclick}
          headerTitle={headerTitle}
          isModal={isModal}
        />
        <HeaderButton isOpen={isOpen} setIsOpen={setIsOpen} />
      </HeaderContainer>
      <OpenHeaderContent isOpen={isOpen} onClick={() => handleCloseMenu()} />
    </>
  );
}

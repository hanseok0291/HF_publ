import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { headerData } from "@/app/constant/components/header/MenuList.data";

type CollectorMenuContentType = {
  handleToggleMenu: any;
};
export default function BasicMenu({
  handleToggleMenu
}: CollectorMenuContentType) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-white p-4 shadow-menu_container">
      {headerData.map((item, index) => (
        <Fragment key={item.id}>
          <Link
            href={item.link}
            className="min-w-[80px]"
            onClick={handleToggleMenu}
          >
            <div className="flex flex-col justify-center gap-[12px]">
              <div className="flex justify-center p-[2px]">
                <Image
                  src={item.img}
                  alt={`${item.text} 아이콘`}
                  width={24}
                  height={24}
                />
              </div>
              <p className="text-center text-[13px] font-medium text-[#222]">
                {item.text}
              </p>
            </div>
          </Link>
          {index < headerData.length - 1 && (
            <div className="inline-block h-14 w-[1px] bg-[#F4F4F4]" />
          )}
        </Fragment>
      ))}
    </div>
  );
}

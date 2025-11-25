import { MainContentType } from "@/types/store/waste-sticker/Waste-Sticker.type";
import Image from "next/image";
import Link from "next/link";
import MenuContainer from "./MenuContainer";

export default function MainContent({
  img,
  menuText,
  imgAlt,
  link
}: MainContentType) {
  return (
    <MenuContainer>
      <Link href={link}>
        <div className="flex flex-col items-center gap-2">
          {img && <Image src={img} width={24} height={24} alt={imgAlt} />}
          <span className="font-semibold text-[14px] text-black">
            {menuText}
          </span>
        </div>
      </Link>
    </MenuContainer>
  );
}

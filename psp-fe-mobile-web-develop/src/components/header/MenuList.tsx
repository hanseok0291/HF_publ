import { AllMainMenuType } from "@/types/apiType/Common.type";
import Link from "next/link";

export default function MenuList({ menu }: { menu?: AllMainMenuType[] }) {
  return (
    <ul className="list-disc ml-3 py-5 pb-0 flex flex-col gap-[24px]">
      {menu?.map((item) => {
        return (
          <li key={item.menuId} className="ml-2">
            <Link href={item.path}>{item.menuName}</Link>
          </li>
        );
      })}
    </ul>
  );
}

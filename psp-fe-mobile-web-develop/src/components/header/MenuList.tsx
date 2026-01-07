"use client";

import { AllMainMenuType } from "@/types/apiType/Common.type";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function MenuList({ menu }: { menu?: AllMainMenuType[] }) {
  const pathname = usePathname();

  return (
    <ul className="list-disc ml-[26px] py-2 pb-0 flex flex-col">
      {menu?.map((item) => {
        const isActive = pathname === item.path || pathname.startsWith(item.path + "/");
        return (
          <li 
            key={item.menuId} 
            className={cn(
              "ml-2 py-[10px]",
              isActive ? "marker:text-[#0F0F10]" : "marker:text-[#A1A1AA]"
            )}
          >
            <Link 
              href={item.path}
              className={cn(
                "transition-colors",
                isActive ? "text-[#0F0F10] font-medium" : "text-[#A1A1AA]"
              )}
            >
              {item.menuName}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

"use client";

import { MenuItem } from "@/types/store/employee/AddAdminPower.type";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { useOpenAccordion } from "@/stores/useOpenAccordion";

type OpenAccordionProps = {
  trigger: string;
  content: string;
  menuItems: MenuItem[];
  row: any;
};

export default function OpenAccordion({ menuItems, row }: OpenAccordionProps) {
  const { openMenus, toggleMenu } = useOpenAccordion();
  const isOpen = openMenus.has(row.original.menuName);
  return (
    <Accordion type="single" collapsible className="w-full">
      {menuItems.map((menu, index) => (
        <AccordionItem
          key={index}
          value={`menu-${index}`}
          className="border-none"
          onClick={() => toggleMenu(row.original.menuName)}
        >
          {/* Accordion Header */}
          <AccordionTrigger className="py-2">
            <span className="text-[14px] font-normal">{menu.title}</span>
          </AccordionTrigger>

          {/* Accordion Content */}

          <AccordionContent>
            <div className="space-y-4">
              {menu.subItems.map((subItem, subIndex) => (
                <div key={subIndex} className="flex items-center">
                  <span className="text-sm text-gray-700">{subItem.label}</span>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

"use client";

import { CustomDrawerType } from "@/types/collector/Components.type";
import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer";

export default function CustomDrawer({
  trigger,
  title,
  content
}: CustomDrawerType) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger className="p-0 text-left w-full">{trigger}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
        </DrawerHeader>
        <DrawerFooter>{content}</DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

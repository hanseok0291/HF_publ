import { Drawer, DrawerContent, DrawerTitle } from "../ui/drawer";

type AreaDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  valueOnClick1: () => void;
  valueOnClick2: () => void;
};

export default function AreaDrawer({
  isOpen,
  onClose,
  valueOnClick1,
  valueOnClick2
}: AreaDrawerProps) {
  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="w-full px-[20px] shadow-drawer">
        <DrawerTitle className="my-6 text-center">지역선택</DrawerTitle>
        <div className="flex flex-col gap-7 max-h-[28rem] mb-10">
          <p onClick={valueOnClick1}>지도로 보기</p>
          <p onClick={valueOnClick2}>지역정보 보기</p>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

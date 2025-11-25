import { OpenHeaderContentType } from "@/types/components/common/CommonComponents.type";
import AccordionMenu from "../../AccordionMenu";

export default function OpenHeaderContent({
  isOpen,
  onClick
}: OpenHeaderContentType) {
  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 z-40 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClick}
      />
      <div
        className={`fixed top-0 left-0 right-0 h-screen bg-white z-40 transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex w-full flex-col pt-2 pl-5 pr-2 mt-[64px]">
          <AccordionMenu />
        </div>
      </div>
    </>
  );
}

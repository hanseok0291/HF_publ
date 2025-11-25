import { TabsTopFixStatusSectionType } from "@/types/store/etc/notice/Notice.type";
import Image from "next/image";
import EtcChip from "@/components/store/etc/EtcChip";

export default function TabsTopFixStatusSection({
  currentFixPin,
  insertionIstt
}: TabsTopFixStatusSectionType) {
  return (
    <div className="flex justify-between">
      <EtcChip text={insertionIstt} />
      {currentFixPin && (
        <Image src="/icons/pin.svg" alt="pin" width={20} height={20} />
      )}
    </div>
  );
}

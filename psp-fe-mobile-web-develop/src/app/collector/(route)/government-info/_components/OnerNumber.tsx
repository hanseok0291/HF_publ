import Input from "@/components/common/Input";
import { Label } from "@/components/ui/label";

export default function OnerNumber({
  representationNumber
}: {
  representationNumber: string;
}) {
  return (
    <div className="flex flex-col gap-[12px]">
      <Label className="text-[16px] font-bold">대표자번호</Label>
      <Input
        readOnly
        value={representationNumber}
        className="read-only:bg-gray20 h-[48px] text-[14px]"
      />
    </div>
  );
}

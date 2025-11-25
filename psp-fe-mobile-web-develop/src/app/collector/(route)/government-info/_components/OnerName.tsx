import Input from "@/components/common/Input";
import { Label } from "@/components/ui/label";

export default function OnerName({
  representativeName
}: {
  representativeName: string;
}) {
  return (
    <div className="flex flex-col gap-[12px]">
      <Label className="text-[16px] font-bold">대표자명</Label>
      <Input
        readOnly
        value={representativeName}
        className="read-only:bg-gray20 h-[48px] text-[14px]"
      />
    </div>
  );
}

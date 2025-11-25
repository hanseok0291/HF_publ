import Input from "@/components/common/Input";
import { Label } from "@/components/ui/label";

export default function GovernmentAddress({
  zipCode,
  address,
  detailAddress
}: {
  zipCode: string;
  address: string;
  detailAddress: string;
}) {
  return (
    <div className="flex flex-col gap-[8px]">
      <Label className="text-[16px] font-bold">지자체 주소</Label>
      <div className="flex flex-col gap-[8px] text-[14px]">
        <Input
          readOnly
          value={zipCode}
          className="read-only:bg-gray20 h-[48px]"
        />
        <Input
          readOnly
          value={address}
          className="read-only:bg-gray20 h-[48px]"
        />
        <Input
          readOnly
          value={detailAddress}
          className="read-only:bg-gray20 h-[48px]"
        />
      </div>
    </div>
  );
}

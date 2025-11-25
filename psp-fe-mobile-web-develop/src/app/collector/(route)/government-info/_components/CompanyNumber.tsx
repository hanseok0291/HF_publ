import Input from "@/components/common/Input";
import { Label } from "@/components/ui/label";

export default function CompanyNumber({
  businessRegisterationNumber
}: {
  businessRegisterationNumber: string;
}) {
  return (
    <div className="flex flex-col gap-[12px]">
      <Label className="text-[16px] font-bold">사업자번호</Label>
      <Input
        readOnly
        value={businessRegisterationNumber}
        className="read-only:bg-gray20 h-[48px] text-[14px]"
      />
    </div>
  );
}

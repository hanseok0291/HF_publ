import { Label } from "@/components/ui/label";

export default function PcLogInfo() {
  return (
    <div className="flex flex-col gap-[12px]">
      <Label className="text-[16px] font-bold">수정 로그</Label>
      <h4 className="text-gray80 font-medium text-[14px]">
        PC에서 확인해 주세요.
      </h4>
    </div>
  );
}

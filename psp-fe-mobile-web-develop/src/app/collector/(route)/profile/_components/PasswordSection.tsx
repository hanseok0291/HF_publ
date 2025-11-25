import { useRouter } from "next/navigation";
import Button from "@/components/common/Button";
import { Label } from "@/components/ui/label";

export default function PasswordSection() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/collector/profile/change");
  };

  return (
    <div className="flex flex-col gap-[12px]">
      <Label className="text-[16px] font-bold">비밀번호</Label>
      <div className="flex items-center gap-[8px]">
        <Button
          type="button"
          buttonType="outline"
          className="p-[12px_36px] w-[96px] h-[48px] whitespace-nowrap"
          onClick={handleClick}
        >
          변경
        </Button>
      </div>
    </div>
  );
}

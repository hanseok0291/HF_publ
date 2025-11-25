import Input from "@/components/common/Input";
import { Label } from "@/components/ui/label";

export default function PasswordInput() {
  // const { control } = useFormContext<AddEmployeeFormValues>();
  return (
    <div className="flex flex-col gap-[12px]">
      <Label className="text-[16px] font-bold">비밀번호</Label>

      {/* <Controller
        name="password"
        control={control}
        render={({ field: { value } }) => (
          <Input
            value={value}
            type="password"
            disabled={true}
            placeholder="비밀번호를 입력해 주세요."
            className="w-[100%] h-[48px] p-[16px_12px] placeholder:text-[14px] disabled:bg-gray20"
          />
        )}
      /> */}
      <Input
        maxLength={20}
        // value={value}
        type="password"
        disabled={true}
        placeholder="비밀번호를 입력해 주세요."
        className="w-[100%] h-[48px] p-[16px_12px] placeholder:text-[14px] disabled:bg-gray20"
      />
    </div>
  );
}

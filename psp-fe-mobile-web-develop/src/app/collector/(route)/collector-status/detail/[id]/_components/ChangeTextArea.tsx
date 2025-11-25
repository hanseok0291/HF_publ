import { Controller, useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ReasonFormType } from "@/schema/collector/reason/Reason.schema";

export default function ChangeTextArea() {
  const { control } = useFormContext<ReasonFormType>();
  return (
    <div className="flex flex-col gap-[12px]">
      <Label className="font-bold text-[16px]">내용</Label>
      <Controller
        control={control}
        name="disposeRefusalReason"
        render={({ field: { onChange, onBlur, value } }) => (
          <Textarea
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            maxLength={80}
            className="rounded p-[16px_12px] min-h-[209px]"
          />
        )}
      />
    </div>
  );
}

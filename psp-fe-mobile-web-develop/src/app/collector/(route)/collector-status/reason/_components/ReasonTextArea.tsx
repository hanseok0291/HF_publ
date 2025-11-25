import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ReasonFormType } from "@/schema/collector/reason/Reason.schema";
import useReasonData from "@/stores/useReasonData";

export default function ReasonTextArea() {
  const { control, setValue } = useFormContext<ReasonFormType>();
  const { memo } = useReasonData();
  useEffect(() => {
    const memoValue = localStorage.getItem("disposeRefusalReason") ?? "";
    if (memoValue === "null") {
      return setValue("disposeRefusalReason", "");
    } else {
      return setValue("disposeRefusalReason", memoValue);
    }
  }, []);
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
            value={value === "null" ? "" : value}
            maxLength={80}
            className="rounded p-[16px_12px] min-h-[209px]"
          />
        )}
      />
    </div>
  );
}

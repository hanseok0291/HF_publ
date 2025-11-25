import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatPhoneNumber } from "@/utils/formatUtils";

export default function ProfileFormField({
  label,
  name,
  control,
  disabled = false,
  defaultValue = "",
  placeholder,
  type = "text",
  maxLength,
  onValueChange
}: {
  label: string;
  name: string;
  control: any;
  disabled?: boolean;
  defaultValue?: string;
  placeholder: string;
  type?: string;
  maxLength?: number;
  onValueChange?: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-[12px]">
      <Label className="text-[16px] font-bold">{label}</Label>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <Input
            {...field}
            type={type}
            disabled={disabled}
            maxLength={maxLength}
            placeholder={placeholder}
            className="w-[100%] h-[48px] p-[16px_12px] placeholder:text-[14px] disabled:bg-gray20 disabled:border-gray40"
            onChange={(e) => {
              const value =
                type === "tel"
                  ? formatPhoneNumber(e.target.value)
                  : e.target.value;
              field.onChange(value);
              onValueChange?.(value);
            }}
            readOnly={disabled}
          />
        )}
      />
    </div>
  );
}

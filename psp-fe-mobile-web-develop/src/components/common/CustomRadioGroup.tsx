import { CustomRadioGroupType } from "@/types/components/common/CommonComponents.type";
import { Controller } from "react-hook-form";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

export default function CustomRadioGroup({
  control,
  name,
  options,
  className
}: CustomRadioGroupType) {
  return (
    <Controller
      name={name}
      control={control as any}
      render={({ field: { onChange, value } }) => (
        <RadioGroup
          className={className}
          value={value as string}
          onValueChange={onChange}
        >
          <div className="flex gap-[24px]">
            {options.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem
                  value={option.value as string}
                  id={String(option.value)}
                  className="bg-gray30 border-none"
                />
                <Label htmlFor={String(option.value)}>{option.label}</Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      )}
    />
  );
}

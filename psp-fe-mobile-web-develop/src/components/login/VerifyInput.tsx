"use client";

import { useController } from "react-hook-form";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { VerifyInputProps } from "@/schema/common/Auth.schema";
import ErrorText from "../common/ErrorText";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";

export default function VerifyInput({ control, name }: VerifyInputProps) {
  const {
    field: { onChange, value },
    fieldState: { error }
  } = useController({ control, name });
  return (
    <InputOTP
      maxLength={5}
      pattern={REGEXP_ONLY_DIGITS}
      onChange={onChange}
      value={value as string}
    >
      <InputOTPGroup className="w-full justify-between">
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
      </InputOTPGroup>
      <ErrorText>{error?.message}</ErrorText>
    </InputOTP>
  );
}

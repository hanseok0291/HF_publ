import { Controller, useFormContext } from "react-hook-form";
import Button from "@/components/common/Button";
import Checkbox from "@/components/common/Checkbox";
import Input from "@/components/common/Input";
import { LoginValues } from "@/schema/common/Auth.schema";

// PageClientInput 컴포넌트 수정
interface PageClientInputProps {
  isSaveAccount: boolean;
  onSaveAccountChange: (checked: boolean) => void;
}

export default function PageClientInput({
  isSaveAccount,
  onSaveAccountChange
}: PageClientInputProps) {
  const { control } = useFormContext<LoginValues>();

  return (
    <>
      <Controller
        name="loginId"
        control={control}
        render={({ field }) => (
          <Input
            maxLength={64}
            type="email"
            {...field}
            size="large"
            placeholder="아이디(이메일)"
            className="w-full mt-[20px] mb-[12px]"
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <Input
            maxLength={20}
            {...field}
            type="password"
            size="large"
            placeholder="비밀번호"
            className="w-full"
            minLength={8}
          />
        )}
      />

      <div className="flex items-center justify-between w-full my-[20px]">
        <Checkbox
          label="계정 정보 저장"
          checked={isSaveAccount}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onSaveAccountChange(e.target.checked)
          }
        />
      </div>
      <Button className="w-[calc(100%-8px)]" type="submit">
        로그인
      </Button>
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getCookie } from "cookies-next/client";
import { ChevronRightIcon } from "lucide-react";
import { useShallow } from "zustand/react/shallow";
import { sendCode } from "@/apis/common/authApis";
import ErrorText from "@/components/common/ErrorText";
import VerifyInput from "@/components/login/VerifyInput";
import { toast } from "@/hooks/use-toast";
import { useVerifyUtil } from "@/hooks/useVerifyUtil";
import { PhoneVerifyValues } from "@/schema/common/Auth.schema";
import { useSaveUserInfo } from "@/stores/useSaveUserInfo";

const Page = () => {
  const [cookieData, setCookieData] = useState("");
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<PhoneVerifyValues>({
    mode: "onChange",
    defaultValues: {
      verificationCode: ""
    }
  });
  const { formError, onSubmit } = useVerifyUtil();
  const otpVerify = watch("verificationCode");
  const { user } = useSaveUserInfo(
    useShallow((state) => ({
      user: state.user
    }))
  );

  const fetchSendCode = async () => {
    if (cookieData !== "") {
      toast({
        description: "인증 코드를 재발송 하였습니다."
      });
      await sendCode({ adminId: cookieData });
    }
  };

  useEffect(() => {
    const adminId = getCookie("adminId")?.toString() ?? "";
    setCookieData(adminId);
  }, []);

  useEffect(() => {
    if (otpVerify.length === 5) {
      onSubmit({
        verificationCode: otpVerify,
        adminId: user.adminId!
      });

      setValue("verificationCode","")
    }
  }, [otpVerify]);

  return (
    <form
      className="animate-fade-in px-[6.4%] lg:pt-[102px] pt-[20%]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-[32px]">
        <h4 className="font-bold text-[20px]">
          {user.secondAuthType}로 코드가 <br />
          발송되었습니다.
        </h4>
        <p className="text-black font-normal mb-[32px]">
          <span className="text-black font-semibold">
            {user.secondAuthValue}
          </span>
          으로 2차 인증 코드가 발송 됐습니다. 2차 인증 코드는 10분 후
          만료됩니다.
        </p>
      </div>

      <VerifyInput control={control} name="verificationCode" />
      <div className="flex items-center justify-end mt-[16px]">
        <h4
          className="cursor-pointer text-gray80 text-[13px]"
          onClick={() => fetchSendCode()}
        >
          {user.secondAuthType}로 코드 재발송
        </h4>
        <ChevronRightIcon size={16} className="text-gray60" />
      </div>

      {errors && (
        <ErrorText className="whitespace-pre-wrap leading-error-text-heigth mt-[32px]">
          {formError}
        </ErrorText>
      )}
    </form>
  );
};

export default Page;

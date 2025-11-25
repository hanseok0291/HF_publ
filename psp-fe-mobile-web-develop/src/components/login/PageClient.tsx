"use client";

import { ApiError } from "@/types/HttpClient.type";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { setCookie } from "cookies-next/client";
import { useShallow } from "zustand/react/shallow";
import { requestFirstLogin } from "@/apis/common/authApis";
import Loading from "@/app/loading";
import { toast } from "@/hooks/use-toast";
import { LoginSchema, LoginValues } from "@/schema/common/Auth.schema";
import { useSaveUserInfo } from "@/stores/useSaveUserInfo";
import {
  CompareVersionType,
  getAppInfo,
  isLowAppVersion
} from "@/utils/compareVersion";
import { isWebView } from "@/utils/WebViewHandler";
import ErrorText from "../common/ErrorText";
import Modal from "../common/Modal";
import PageClientInput from "./_components/PageClientInput";

// TODO : submit 보내고 초기 화면 (로그인 화면) -> 로딩창 -> 초기화면 -> OTP 입력 페이지로 되는 흐름 수정
const PageClient = ({ service }: { service: string }) => {
  const [errorTry, setErrorTry] = useState<number>(0);
  const [formError, setFormError] = useState<string>("");
  const [isSaveAccount, setIsSaveAccount] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const isKeep = useSearchParams().get("keep") ?? false;

  const form = useForm<LoginValues>({
    resolver: zodResolver(LoginSchema),
    mode: "onSubmit",
    defaultValues: {
      loginId: "",
      password: ""
    }
  });

  const {
    handleSubmit,
    setValue,
    formState: { errors, isLoading }
  } = form;

  const { setUser } = useSaveUserInfo(
    useShallow((state) => ({
      setUser: state.setUser
    }))
  );

  useEffect(() => {
    // 로그인 화면에서 탭으로 로그인 화면 이동이 아니고, 모바일 앱이 아닌 경우
    const appInfo = getAppInfo();
    const compareVer: CompareVersionType = {
      appVersion: appInfo.appVersion,
      requireVersion: "1.1" // 1.1 버전에 CallApp으로 받아 앱에서 role 저장처리 추가 됨.
    };

    if (!isKeep && (!isWebView() || isLowAppVersion(compareVer))) {
      const role = localStorage.getItem("role") ?? "";

      // 이전 로그인은 판매소이고, 로드하는 페이지가 수거업체인 경우 판매소 로드 처리
      if (role === "ROLE_STORE" && service === "collector") {
        router.replace("/store/login");
      } else if (role === "ROLE_ISTT" && service === "store") {
        // 이전 로그인은 수거업체이고, 로드하는 페이지가 판매소인 경우 수거업체 로드 처리
        router.replace("/collector/login");
      }
    }

    const bye = localStorage.getItem("bye");
    if (bye) {
      setOpen((prev) => !prev);
    }
    return () => {
      localStorage.removeItem("bye");
    };
  });
  useEffect(() => {
    // 저장된 계정 정보 로드
    const savedLoginId = localStorage.getItem("savedLoginId");

    if (savedLoginId) {
      setValue("loginId", savedLoginId as string);
      setIsSaveAccount(true);
    }
  }, [setValue]);

  const handleSaveAccountChange = (checked: boolean) => {
    setIsSaveAccount(checked);
    if (!checked) {
      localStorage.removeItem("savedLoginId");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (data: LoginValues) => {
    try {
      setIsSubmitting(true);
      const { code, content } = await requestFirstLogin(data);
      if (data.loginId && data.password && code === 0) {
        // 계정 정보 저장 처리
        if (isSaveAccount) {
          localStorage.setItem("savedLoginId", data.loginId);
        } else {
          localStorage.removeItem("savedLoginId");
        }

        setCookie("adminId", content.adminId);
        setFormError("");
        console.log(content);
        setUser({ ...content, nextStep: !code ? "otp" : "prev" });
        router.push(`/${service}/login/verify`);
        return;
      }
    } catch (error: any) {
      setIsSubmitting(false);

      if ([400, 401, 403, 409].includes(error?.code)) {
        setFormError((error as ApiError).message);

        if (error?.code === 400 && errorTry < 5) {
          setErrorTry((prev) => prev + 1);
        }

        return;
      }

      toast({
        title: "오류가 발생했습니다.",
        description: `${(error as ApiError).message}`
      });
    }
  };

  const summaryOption = {
    title: service === "store" ? "판매소 ADMIN" : "수거 담당자 APP",
    description:
      service === "store"
        ? "대형 폐기물 스티커 종량제 봉투"
        : "대형 폐기물 처리"
  };

  type summary = { title: string };
  const storeSummary: summary = {
    title: "판매소"
  };
  const collectorSummary: summary = {
    title: "수거업체"
  };

  const getTabUI = (loadService: string) => {
    const summary = loadService === "store" ? storeSummary : collectorSummary;
    return (
      <div
        className={`flex flex-col items-center gap-1 py-6 ${service === loadService ? "border-b-2 border-[#3c7cfd]" : ""} w-full`}
        onClick={() => router.replace(`/${loadService}/login?keep=true`)}
      >
        <span
          className={`font-bold text-lg ${service === loadService ? "text-[#3c7cfd]" : "text-[#474747]"}`}
        >
          {summary.title}
        </span>
      </div>
    );
  };

  if (isLoading || isSubmitting) return <Loading />;

  return (
    <FormProvider {...form}>
      <div className="container grid grid-rows-[auto,1fr] justify-items-center bg-main peer">
        <Image
          src={"/images/HF_vertical_white.png"}
          priority
          width={70}
          height={40}
          alt="logo"
          className="py-[40px]"
        />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="animate-fade-in sticky flex flex-col items-center bg-white w-full rounded-t-[32px]"
        >
          <div className="flex flwx-row items-center w-full">
            {getTabUI("collector")}
            {getTabUI("store")}
          </div>

          <div className="flex flex-col w-full items-center px-[6.4%]">
            <div className="flex flex-col items-center gap-2 pt-11 pb-3">
              <span className="font-medium text-sm">
                {summaryOption.description}
              </span>
              <span className="font-bold text-xl">{summaryOption.title}</span>
            </div>
            <PageClientInput
              isSaveAccount={isSaveAccount}
              onSaveAccountChange={handleSaveAccountChange}
            />
            <Link
              href={`/${service}/login/find`}
              className="p-2 mt-[18px] text-sm text-gray80 font-medium"
            >
              계정 정보 찾기
            </Link>
            {(Object.keys(errors).length > 0 || formError) && (
              <ErrorText className="whitespace-pre-wrap leading-error-text-heigth">
                {errors.loginId?.message ||
                  errors.password?.message ||
                  formError}
              </ErrorText>
            )}
          </div>
        </form>
        {open && (
          <Modal
            open={open}
            onOpenChange={setOpen}
            triggerClassName="bg-main w-full text-white h-[52px] rounded"
            description={`로그인 유지시간이 지나\n 자동 로그아웃 처리 되었습니다.`}
            onConfirm={() => handleClose}
            confirmButton={{ className: "max-w-[136px]", text: "확인" }}
          />
        )}
      </div>
    </FormProvider>
  );
};

export default PageClient;

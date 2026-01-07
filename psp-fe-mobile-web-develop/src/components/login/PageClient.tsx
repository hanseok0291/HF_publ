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
      
      // 테스트용: 특정 이메일로 에러 툴팁 테스트
      if (data.loginId === "error@test.com") {
        setFormError("계정 정보가 일치하지 않습니다.\n아이디 또는 비밀번호를 다시 확인해 주세요.(1/5)");
        setIsSubmitting(false);
        return;
      }
      
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

      // 퍼블리싱 작업 중 서버 연결 없을 때 500 에러는 모킹 데이터로 다음 화면 이동
      if (error?.code === 500) {
        console.warn("서버 연결 없음 (퍼블리싱 작업 중):", error.message);
        
        // 모킹 데이터로 다음 화면으로 이동
        const mockAdminId = "mock-admin-id";
        const mockContent = {
          adminId: mockAdminId,
          secondAuthType: "이메일",
          secondAuthValue: data.loginId || "test@test.com",
          expiredDate: new Date(Date.now() + 10 * 60 * 1000).toISOString() // 10분 후
        };

        // 계정 정보 저장 처리
        if (isSaveAccount) {
          localStorage.setItem("savedLoginId", data.loginId);
        } else {
          localStorage.removeItem("savedLoginId");
        }

        setCookie("adminId", mockAdminId);
        setFormError("");
        setUser({ ...mockContent, nextStep: "otp" });
        router.push(`/${service}/login/verify`);
        return;
      }

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
        className={`flex flex-col items-center gap-1 py-[14px] ${service === loadService ? "border-b-2 border-[#3c7cfd]" : "border-b-2 border-[#E4E4E7]"} w-full`}
        onClick={() => router.replace(`/${loadService}/login?keep=true`)}
      >
        <span
          className={`font-bold text-lg ${service === loadService ? "text-[#3c7cfd]" : "text-[#71717A]"}`}
        >
          {summary.title}
        </span>
      </div>
    );
  };

  if (isLoading || isSubmitting) return <Loading />;

  return (
    <FormProvider {...form}>
      <div className="container grid grid-rows-[auto,1fr] justify-items-center bg-main lg:bg-login-gradient lg:flex lg:min-h-screen lg:items-center lg:justify-center peer relative">
        {/* 모바일: 상단 로고 */}
        <div className="w-full ml-[42px] lg:hidden">
          <Image
            src={"/images/HF_horizontal_white.png"}
            priority
            width={180}
            height={27}
            alt="logo"
            className="py-[76px] pb-[35px] relative z-10"
          />
        </div>
        
        {/* 모바일: 일러스트레이션 (absolute 배치) */}
        <div className="absolute right-0 top-0 w-[170px] h-[170px] lg:hidden z-0">
          <Image
            src={"/images/main.png"}
            width={170}
            height={170}
            alt="illustration"
            className="object-contain"
            unoptimized
            priority
          />
        </div>

        {/* PC: 왼쪽 로그인 폼 영역 */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="animate-fade-in sticky flex flex-col items-center bg-white w-full lg:shadow-[5px_5px_45px_0px_rgba(214,215,246,0.42)] lg:w-full lg:h-[648px] lg:relative lg:justify-start lg:flex-shrink-0 lg:rounded-[4px]"
        >
          {/* 모바일: 탭 UI */}
          <div className="flex flwx-row items-center w-full lg:hidden">
            {getTabUI("collector")}
            {getTabUI("store")}
          </div>

          <div className="flex flex-col w-full items-center px-[6.4%] lg:px-[90px] lg:pt-[100px] lg:pb-0 h-full">
            {/* 타이틀 영역 */}
            <div className="flex flex-col items-center gap-1 py-8 lg:items-start lg:gap-0 lg:pt-0 lg:pb-0 lg:mb-[40px]">
              <span className="font-medium text-sm lg:text-base lg:text-[#3f3f46] lg:font-medium lg:mb-0 lg:leading-[1.45]">
                {summaryOption.description}
              </span>
              <span className="font-bold text-[28px] lg:text-[32px] lg:font-semibold lg:text-[#0f0f10] lg:leading-[1.45]">
                {summaryOption.title}
              </span>
            </div>

            <PageClientInput
              isSaveAccount={isSaveAccount}
              onSaveAccountChange={handleSaveAccountChange}
              errorMessage={
                Object.keys(errors).length > 0 || formError
                  ? errors.loginId?.message ||
                    errors.password?.message ||
                    formError ||
                    ""
                  : undefined
              }
            />

            <Link
              href={`/${service}/login/find`}
              className="mt-[20px] text-sm text-gray80 font-medium mb-5 lg:mt-[20px] lg:text-base lg:text-[#52525b] lg:font-medium lg:mb-auto"
            >
              계정 정보 찾기
            </Link>
          </div>
        </form>

        {/* PC: 오른쪽 일러스트레이션 영역 */}
        <div className="hidden lg:flex lg:bg-main lg:w-[560px] lg:h-[648px] lg:items-center lg:justify-center lg:px-[30px] lg:py-[52px] lg:flex-shrink-0">
          <div className="flex flex-col gap-[15px] items-center w-full justify-center">
            {/* 일러스트레이션 영역 */}
            <div className="h-full w-full relative overflow-hidden flex justify-center">
              <Image
                src={"/images/main.png"}
                width={480}
                height={480}
                alt="Hecto Financial Logo"
                className="object-contain"
              />
            </div>
            {/* 로고 */}
            <div className="h-[29px] w-[193px] flex items-center justify-center">
              <Image
                src={"/images/HF_horizontal_white.png"}
                width={193}
                height={29}
                alt="Hecto Financial Logo"
                className="object-contain"
              />
            </div>
          </div>
        </div>

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

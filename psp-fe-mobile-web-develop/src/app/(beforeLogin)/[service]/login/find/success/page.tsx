"use client";

import { useParams, useRouter } from "next/navigation";
import { useShallow } from "zustand/react/shallow";
import Button from "@/components/common/Button";
import { useSaveUserInfo } from "@/stores/useSaveUserInfo";

export default function Page() {
  const router = useRouter();
  const params = useParams();
  const { resetUser, content } = useSaveUserInfo(
    useShallow((state) => ({
      resetUser: state.resetUser,
      content: state.user.content
    }))
  );

  const handleMoveLogin = () => {
    router.push(`/${params.service}/login?keep=true`);
    resetUser();
  };

  return (
    <section className="animate-fade-in px-[6.4%] pt-[60px]">
      <div className="flex flex-col gap-[32px]">
        <h4 className="text-[20px] text-black font-bold text-left block">
          계정 정보 찾기
        </h4>
        <div className="flex flex-col gap-2">
          <p className="text-[14px] text-black font-normal leading-[22px]">
            등록하신 계정{" "}
            <span className="text-[14px] text-black font-semibold">
              {content}
            </span>
            으로
            <br /> 임시 비밀번호가 발급됐습니다.
          </p>
          <p className="text-[14px] text-black font-normal leading-[22px]">
            임시 비밀번호로 로그인 진행 후 비밀번호를 변경해 주세요.
          </p>
        </div>
      </div>

      <Button
        type="button"
        className="w-[calc(100%)] font-semibold mt-[92px]"
        onClick={() => handleMoveLogin()}
      >
        로그인 화면으로 이동
      </Button>
    </section>
  );
}

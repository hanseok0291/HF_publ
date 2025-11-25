"use client";

import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Modal from "@/components/common/Modal";
import { cn } from "@/lib/utils";
import HeaderContainer from "./HeaderContainer";

type ArrowAndMenuHeaderType = {
  headerTitle: string;
  className?: string;
  isModal?: boolean;
  moveRoute?: string;
};

export default function ArrowHeader({
  headerTitle,
  className,
  isModal = false,
  moveRoute
}: ArrowAndMenuHeaderType) {
  const router = useRouter();
  const pathname = usePathname();
  const service = pathname.split("/")[1];

  const handleOnclick = () => {
    const prevPath = sessionStorage.getItem("prevPath");
    const defaultPath = service === "store" ? "/store" : "/collector";

    if (prevPath && prevPath !== pathname) {
      sessionStorage.removeItem("prevPath");
      return router.push(prevPath);
    }

    router.push(defaultPath);
  };

  const HEADER_CONTAINER_STYLE = cn("relative z-[50] bg-white", className);
  return (
    <HeaderContainer className={HEADER_CONTAINER_STYLE}>
      {isModal ? (
        <Modal
          trigger={<ArrowLeft />}
          onConfirm={handleOnclick}
          description={`작성 중인 내용이 있습니다. \n나가시겠습니까?`}
          cancelButton={{ text: "취소" }}
        />
      ) : (
        <ArrowLeft onClick={handleOnclick} />
      )}

      <h4 className="text-black text-[16px] font-bold">{headerTitle}</h4>
      <div />
    </HeaderContainer>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Search } from "lucide-react";
import Modal from "@/components/common/Modal";
import { cn } from "@/lib/utils";
import HeaderContainer from "./HeaderContainer";

type ArrowAndMenuHeaderType = {
  headerTitle: string;
  className?: string;
};

export default function ArrowAndSearchHeader({
  headerTitle,
  className
}: ArrowAndMenuHeaderType) {
  const router = useRouter();
  const handleOnClick = () => {
    router.back();
  };

  const HEADER_CONTAINER_STYLE = cn("relative z-[50] bg-white", className);
  return (
    <HeaderContainer className={HEADER_CONTAINER_STYLE}>
      <Modal
        trigger={<ArrowLeft />}
        onConfirm={handleOnClick}
        description={`작성 중인 내용이 있습니다. \n나가시겠습니까?`}
        cancelButton={{ text: "취소" }}
      />

      <h4 className="text-black text-[16px] font-bold">{headerTitle}</h4>
      <Search width={24} height={24} />
    </HeaderContainer>
  );
}

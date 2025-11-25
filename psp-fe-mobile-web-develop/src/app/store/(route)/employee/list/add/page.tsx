"use client";

import { useRouter } from "next/navigation";
import MainContainer from "@/components/common/MainContainer";
import CloseHeader from "@/components/header/CloseHeader";
import SelectedPowerFormClient from "./_components/SelectedPowerFormClient";

export default function Page() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <MainContainer>
      <CloseHeader title="담당자 정보 등록" onClose={() => handleBack()} />
      <SelectedPowerFormClient />
    </MainContainer>
  );
}

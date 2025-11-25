"use client";

import { useRouter } from "next/navigation";
import CloseHeader from "@/components/header/CloseHeader";
import DetailFormClient from "./DetailFormClient";

export default function EmployeeListDetailClient() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <>
      <CloseHeader title="담당자 정보 등록" onClose={() => handleBack()} />
      <DetailFormClient />
    </>
  );
}

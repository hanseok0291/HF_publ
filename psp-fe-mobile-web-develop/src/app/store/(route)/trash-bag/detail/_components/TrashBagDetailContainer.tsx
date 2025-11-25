"use client";

import { notFound, usePathname } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { useTrashBagList } from "@/hooks/useTrashBagList";
import { ToastAction } from "../../../../../../components/ui/toast";
import TrashBagItem from "./TrashBagItem";

type ServiceType = "waste-sticker" | "trash-bag";

const VALID_SERVICES: ServiceType[] = ["waste-sticker", "trash-bag"];

export default function TrashBagDetailContainer() {
  const pathname = usePathname();
  const pathParts = pathname.split("/");
  const service = pathParts[2]?.toLowerCase() as ServiceType;

  const {
    data: trashBagData,
    error: trashBagError,
    isLoading: trashBagLoading
  } = useTrashBagList();

  if (!VALID_SERVICES.includes(service)) {
    notFound();
  }

  const showToast = (message: string) => {
    toast({
      title: message,
      action: <ToastAction altText="닫기">닫기</ToastAction>
    });
  };

  // 에러 상태 처리
  if (trashBagError) {
    showToast("오류가 발생했습니다.");
    return null;
  }

  // 데이터 존재 여부 확인
  if (!trashBagData) {
    showToast("종량제 봉투 데이터가 없습니다.");
    return null;
  }

  return (
    <>
      {trashBagData.content.map((item, index) => (
        <TrashBagItem key={index} item={item} />
      ))}
    </>
  );
}

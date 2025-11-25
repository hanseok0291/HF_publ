import WasteStickerItem from "@/components/common/WasteStickerItem";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/hooks/use-toast";
import { useWasteStickerList } from "@/hooks/useWasteStickerList";

export default function WasteStickerDetailContainer() {
  const {
    data: wasteStickerData,
    error: wasteStickerError,
    isLoading: wasteStickerLoading
  } = useWasteStickerList();

  const showToast = (message: string) => {
    toast({
      title: message,
      action: <ToastAction altText="닫기">닫기</ToastAction>
    });
  };

  // 에러 상태 처리
  if (wasteStickerError) {
    showToast("오류가 발생했습니다.");
    return null;
  }

  // 데이터 존재 여부 확인
  if (!wasteStickerData) {
    showToast("폐기물 스티커 데이터가 없습니다.");
    return null;
  }

  return (
    <>
      {wasteStickerData.content.map((item, index) => (
        <WasteStickerItem
          key={`${item.stickerDeliveryId}-${index}`}
          item={item}
        />
      ))}
    </>
  );
}

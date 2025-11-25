export default function PayStatus({ payStatus }: { payStatus: string }) {
  const renderPayStatus = () => {
    if (payStatus === "PMT_STAT_002") {
      return (
        <p className="text-main text-[12px] inline-block p-[4px_8px] rounded-full bg-[#F6F9FF]">
          결제완료
        </p>
      );
    }
    if (payStatus === "PMT_STAT_004") {
      return (
        <p className="text-fail text-[12px] inline-block p-[4px_8px] rounded-full bg-[#FFF8F7]">
          취소/환불
        </p>
      );
    }
    if (payStatus === "PMT_STAT_003") {
      return (
        <p className="text-cancel text-[12px] block p-[4px_8px] rounded-full bg-[#FFF4E7]">
          부분결제
        </p>
      );
    }
    if (payStatus === "PMT_STAT_001") {
      return (
        <p className="text-wating text-[12px] inline-block p-[4px_8px] rounded-full bg-[#F6FDF7]">
          결제대기
        </p>
      );
    }
  };

  return <>{renderPayStatus()}</>;
}

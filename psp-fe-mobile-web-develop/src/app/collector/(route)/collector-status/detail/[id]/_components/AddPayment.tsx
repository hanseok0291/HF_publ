import { AddPaymentType } from "@/types/collector/collector-status/change/Change.type";
import { formatNumberWithCommas } from "@/utils/formatUtils";

export default function AddPayment({ amount }: AddPaymentType) {
  console.log(amount);
  return (
    <p className="text-fail text-[18px] font-bold whitespace-nowrap self-center">
      +{formatNumberWithCommas(amount)}
      {amount === 0 ? "" : "원"}
    </p>
  );
}

import Link from "next/link";
import {
  formatDateWithTime,
  formatNumberWithCommas
} from "@/utils/formatUtils";
import DetailRow from "../../../../../../components/common/DetailRow";
import PayStatus from "../../../../../../components/common/PayStatus";

type TrashBagItem = {
  trashBagDeliveryId: string;
  paymentStatusCodeName: string | null;
  orderDate: string;
  purchaseQuantity: number;
  totalOrderAmount: number;
  paymentMethodCodeName: string | null;
  receiptTypeCodeName: string;
  paymentStatusCode: string;
  receiptYn: boolean;
};

export default function TrashBagItem({ item }: { item: TrashBagItem }) {
  return (
    <Link
      href={`/store/trash-bag/detail/${item.trashBagDeliveryId}`}
      key={item.trashBagDeliveryId}
      className="shadow-menu_container bg-white p-[16px] flex flex-col gap-[12px] mb-[12px]"
    >
      <div className="flex items-center gap-[10px] font-normal">
        <PayStatus payStatus={item.paymentStatusCode ?? "-"} />
      </div>
      <hr className="bg-[#ECECEC]" />
      <div className="grid grid-cols-2 gap-[10px]">
        <DetailRow
          label="주문일시"
          value={formatDateWithTime(item.orderDate)}
        />
        <DetailRow label="구매권종수" value={`${item.purchaseQuantity}종`} />
        <DetailRow
          label="결제금액"
          value={
            formatNumberWithCommas(String(item.totalOrderAmount)) as string
          }
        />
        <DetailRow label="결제수단" value={item.paymentMethodCodeName ?? "-"} />
        <DetailRow label="수령여부" value={item.receiptTypeCodeName} />
      </div>
    </Link>
  );
}

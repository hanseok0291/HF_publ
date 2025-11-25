import { PurchaseInfoContainerType } from "@/types/store/waste-sticker/PurchaseInfoContainer.type";
import { formatNumberWithCommas } from "@/utils/formatUtils";

type PurchaseInfoResponseType = {
  trashBagList: {
    // 수량
    deliveryQuantity: number;
    // 가격
    fee: number;
    // 품목명
    trashBagName: string;
  };
};

export default function TrashBagPurchaseInfoContainer({
  singleItem = false,
  trashBagList
}: PurchaseInfoContainerType & PurchaseInfoResponseType) {
  return (
    <div className="p-4 rounded border border-solid border-gray40 text-xs">
      {!singleItem && (
        <h4 className="mb-4 font-normal">[세부품목명] 규격명 규격명 규격명</h4>
      )}

      <div className="flex flex-col gap-[10px]">
        <div className="flex justify-between items-center">
          <span className="text-gray80">수량</span>
          <p>{trashBagList.deliveryQuantity}</p>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray80">장당가격(원)</span>
          <p>{formatNumberWithCommas(String(trashBagList.fee))}</p>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray80">구매합계(원)</span>
          <p>
            {formatNumberWithCommas(
              String(trashBagList.deliveryQuantity * trashBagList.fee)
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

import { StickerListType } from "@/types/apiType/waste-sticker/WasteSticker.type";
import { PurchaseInfoContainerType } from "@/types/store/waste-sticker/PurchaseInfoContainer.type";
import { formatNumberWithCommas } from "@/utils/formatUtils";

export type PurchaseInfoResponseType = {
  stickerList: StickerListType[];
};

export default function PurchaseInfoContainer({
  singleItem = false,
  stickerList
}: PurchaseInfoContainerType & PurchaseInfoResponseType) {
  return (
    <>
      {stickerList.map((item) => (
        <div className="p-4 rounded border border-solid border-gray40 text-xs">
          {!singleItem && (
            <h4 className="mb-4 font-normal">{`[${item.topStickerName}/${item.middleStickerName}] ${item.stickerName}`}</h4>
          )}
          <div className="flex flex-col gap-[10px]">
            <div className="flex justify-between items-center">
              <span className="text-gray80">수량</span>
              <p>{item.deliveryQuantity}</p>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray80">장당가격(원)</span>
              <p>{formatNumberWithCommas(String(item.fee))}</p>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray80">구매합계(원)</span>
              <p>
                {formatNumberWithCommas(
                  String(item.deliveryQuantity * item.fee)
                )}
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

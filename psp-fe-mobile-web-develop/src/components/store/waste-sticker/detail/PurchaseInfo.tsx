import { StickerListType } from "@/types/apiType/waste-sticker/WasteSticker.type";
import { formatNumberWithCommas } from "@/utils/formatUtils";
import DetailListContainer from "./DetailListContainer";

export type PurchaseInfoResponseType = {
  stickerList: StickerListType[];
};

export default function PurchaseInfo({
  stickerList
}: PurchaseInfoResponseType) {
  return (
    <DetailListContainer>
      <p className="text-[16px] font-bold">구매정보</p>
      {stickerList.map((item, index) => (
        <div
          key={index}
          className="p-4 rounded border border-solid border-gray40 text-xs"
        >
          <h4 className="mb-4 font-normal">{`[${item.topStickerName}/${item.middleStickerName ?? "-"}] ${item.stickerName}`}</h4>

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
    </DetailListContainer>
  );
}

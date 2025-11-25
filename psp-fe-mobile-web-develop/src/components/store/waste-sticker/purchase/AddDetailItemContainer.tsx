import { AddDetailItemContainerType } from "@/types/store/waste-sticker/AddWasteSticker.type";
import { ChangeEvent, useEffect } from "react";
import { X } from "lucide-react";
import { useShallow } from "zustand/react/shallow";
import usePurcase from "@/stores/usePurcase";
import {
  formatNumberWithCommas,
  formatNumberWithoutCommas
} from "@/utils/formatUtils";
import Input from "../../../common/Input";

type FormValues = {
  stickerList?: { id: string; purchaseQuantity: number }[];
  trashBagList?: { id: string; purchaseQuantity: number }[];
  paymentMethod?:
    | "PMT_MEAN_001"
    | "PMT_MEAN_002"
    | "PMT_MEAN_003"
    | "PMT_MEAN_004";
};

export default function AddDetailItemContainer<T extends FormValues>({
  data,
  register,
  index,
  setValue,
  isDelete = false
}: AddDetailItemContainerType<T>) {
  const {
    addStickers,
    removeSticker,
    setTotalQuantity,
    totalQuantity,
    setAddStickers
  } = usePurcase(
    useShallow((state) => ({
      addStickers: state.addStickers,
      removeSticker: state.removeSticker,
      setTotalQuantity: state.setTotalQuantity,
      totalQuantity: state.totalQuantity,
      setAddStickers: state.setAddStickers
    }))
  );
  if (!data) {
    return <div>재시도 해주세요.</div>;
  }

  // const handleClick = () => {
  //   setValue(`stickerList.${index}.purchaseQuantity`, "");
  // };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value, 10) || 0;

    if (value > data.holdInventory) {
      value = data.holdInventory;
      e.target.value = value.toString();
    }

    // if (value <= 0) {
    //   value = 1;
    //   e.target.value = value.toString();
    // }

    // setValue(`stickerList.${index}.purchaseQuantity`, value);
    // setValue(`stickerList.${index}.id`, data.id);

    const newAddStickers = [...addStickers];
    const existingSticker = newAddStickers.find((item) => item.id === data.id);
    if (existingSticker) {
      existingSticker.purchaseQuantity = value;
    } else {
      newAddStickers.push({ id: data.id, purchaseQuantity: value });
    }
    setAddStickers(newAddStickers);

    const newTotal = newAddStickers.reduce(
      (acc, item) => acc + item.purchaseQuantity,
      0
    );
    setTotalQuantity(newTotal);
  };

  const handleDelete = () => {
    const itemToRemove = addStickers.find((item) => item.id === data.id);
    if (itemToRemove) {
      const newTotal = totalQuantity - itemToRemove.purchaseQuantity;
      setTotalQuantity(newTotal);
    }
    removeSticker(data.id);
  };

  useEffect(() => {
    console.log("addStickers", addStickers);
    const newTotal = addStickers.reduce(
      (acc, item) => acc + item.purchaseQuantity,
      0
    );
    setTotalQuantity(newTotal);
  }, [addStickers]);

  return (
    <div className="p-4 rounded border border-solid border-gray40 text-xs">
      <h4 className="mb-4 font-normal">
        [{data.topStandardName}/{data.middleStandardName}] {data.standardName}
      </h4>
      <div className="flex gap-2 mb-2.5 text-gray80">
        <p>개당 수수료 {data.fee.toLocaleString()}</p>
        <span className="text-gray40">|</span>
        <p>남은 재고 {data.holdInventory.toLocaleString()}</p>
      </div>
      <div className="flex gap-3 items-center">
        <p className="flex-shrink-0 w-[42px]">구매수량</p>
        <Input type="hidden" {...register(`list.${index}.id` as any)} />
        <Input
          className="flex-1 min-w-0"
          type="text"
          inputMode={"numeric"}
          placeholder="구매 수량을 입력해주세요."
          {...register(`list.${index}.purchaseQuantity` as any, {
            onChange: handleInputChange,
            min: 1,
            setValueAs: (v) => formatNumberWithoutCommas(v),
            onBlur: (e) => {
              e.currentTarget.value =
                formatNumberWithoutCommas(e.target.value) >= data.holdInventory
                  ? formatNumberWithCommas(data.holdInventory)
                  : formatNumberWithCommas(e.target.value);
            }
          })}
          min={1}
          onInput={(e) => {
            const input = e.currentTarget;

            const newValue = input.value
              .replace(/[^0-9]/g, "")
              .replace(/^0+/, "");
            if (input.value !== newValue) {
              input.value = newValue;
              input.setSelectionRange(newValue.length, newValue.length);
            }
          }}
          // value={addStickers.find((item) => item.id === data.id)?.purchaseQuantity || 1}
          max={data.holdInventory}
          // onClick={handleClick}
        />
        {isDelete && (
          <button
            type="button"
            onClick={handleDelete}
            className="cursor-pointer"
          >
            <X size={20} />
          </button>
        )}
      </div>
    </div>
  );
}

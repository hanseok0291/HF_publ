"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useShallow } from "zustand/react/shallow";
import { ResultSchema } from "@/schema/store/purchase/AddWasteSticker.schema";
import usePurcase from "@/stores/usePurcase";
import useParchaseSuccessCheck from "@/stores/usePurchaseSuccessCheck";
import Button from "../../../common/Button";
import AddDetailItemContainer from "./AddDetailItemContainer";

type FormValues = {
  list: { id: string; purchaseQuantity: number }[];
  paymentMethod?:
    | "PMT_MEAN_001"
    | "PMT_MEAN_002"
    | "PMT_MEAN_003"
    | "PMT_MEAN_004";
};

type AddSecondStepProps = {
  pushLink: string;
  listType: string;
};

// 스티커 아이템 타입 정의
type StickerItem = {
  id: string;
  stickerId?: string;
  topStandardName: string;
  middleStandardName: string;
  standardName: string;
  fee: number;
  holdInventory: number;
  singlenessStandardYn: boolean;
  originalIndex: number;
};

// 그룹화된 항목을 위한 타입 정의
type GroupedItemsType = {
  [key: string]: StickerItem[];
};

export default function AddSecondStep({
  pushLink,
  listType
}: AddSecondStepProps) {
  const { selectedList, addStickers, setAddStickers } = usePurcase(
    useShallow((state) => ({
      selectedList: state.selectedList,
      addStickers: state.addStickers,
      setAddStickers: state.setAddStickers
    }))
  );

  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<FormValues>({
    mode: "onSubmit",
    resolver: zodResolver(ResultSchema),
    defaultValues: {
      list: selectedList.map((item) => ({
        id: item.id,
        purchaseQuantity:
          addStickers.find((add) => add.id === item.id)?.purchaseQuantity || 1
      })),
      paymentMethod: "PMT_MEAN_001"
    }
  });

  console.log("폼 에러", errors);

  const watchValue = watch("list");
  const { setSelection } = useParchaseSuccessCheck();
  const isButtonVisible =
    watchValue &&
    watchValue.length > 0 &&
    watchValue.every(
      (item) => item.purchaseQuantity !== 0 && item.purchaseQuantity !== null
    );

  const onSubmit = (data: FormValues) => {
    console.log("addStep2 data: ", data);
    if (isButtonVisible) {
      setAddStickers(data.list);

      router.push(`${pushLink}?ok`);
      setSelection();
      return;
    }
  };

  // 선택된 목록이 변경되면 폼 값도 업데이트
  useEffect(() => {
    // 기존 폼 값 가져오기
    const currentValues = watch("list");

    // 새로운 폼 값 생성
    const newValues = selectedList.map((sticker) => {
      // 기존에 해당 ID를 가진 항목이 있는지 확인
      const existingItem = currentValues?.find(
        (item) => item.id === sticker.id
      );
      return {
        id: sticker.id,
        // 기존 항목이 있으면 그 수량을 유지, 없으면 1로 설정
        purchaseQuantity: existingItem ? existingItem.purchaseQuantity : 1
      };
    });
    // 폼 값 업데이트
    setValue("list", newValues);

    // addStickers 업데이트
    setAddStickers(newValues);

    console.log("폼 값 업데이트됨:", newValues);
  }, [selectedList, setValue, watch, setAddStickers]);

  // 선택된 항목이 없을 때 표시할 안내 메시지
  if (selectedList.length === 0) {
    return (
      <section className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto px-5 flex items-center justify-center">
          <div className="text-center">
            <p className="mb-4 text-gray80">선택된 항목이 없습니다.</p>
            <Button className="w-full" onClick={() => router.back()}>
              돌아가기
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto px-5">
        <div className="space-y-3">
          {selectedList.map((item, index) => (
            <AddDetailItemContainer
              key={item.id}
              setValue={setValue}
              data={item}
              register={register}
              index={index}
              isDelete={true}
            />
          ))}
        </div>
      </div>

      <div className="px-5 pb-[40px] flex gap-2 pt-4 mt-2">
        <Button
          buttonType="cancel"
          onClick={() => {
            router.back();
          }}
        >
          이전
        </Button>
        <Button className="flex-1" onClick={handleSubmit(onSubmit)}>
          확인
        </Button>
      </div>
    </section>
  );
}

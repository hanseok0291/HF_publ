import {
  PaymentMethodType,
  ResultFormValues,
  ResultTrashFormValues
} from "@/types/store/waste-sticker/AddWasteSticker.type";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useShallow } from "zustand/react/shallow";
import PaymentRadio from "@/components/store/waste-sticker/purchase/PaymentRadio";
import { toast } from "@/hooks/use-toast";
import { ResultSchema } from "@/schema/store/purchase/AddWasteSticker.schema";
import usePurcase from "@/stores/usePurcase";
import useParchaseSuccessCheck from "@/stores/usePurchaseSuccessCheck";
import { formatNumberWithCommas } from "@/utils/formatUtils";
import AddDetailItemContainer from "./AddDetailItemContainer";
import ClientButtons from "./ClientButtons";
import PaymentAmount from "./PaymentAmount";
import ShowResultModal from "./ShowResultModal";

type FormValues = {
  list?: { id: string; purchaseQuantity: number }[];
  paymentMethod:
    | "PMT_MEAN_001"
    | "PMT_MEAN_002"
    | "PMT_MEAN_003"
    | "PMT_MEAN_004";
};

type GroupedItemsType = {
  [key: string]: StickerItem[];
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

type AddWasteStickerResultProps = {
  createList: (data: any) => void;
  listType: string;
  successSubmit?: boolean;
  setSuccessSubmit?: (value: boolean) => void;
  paymentMethodList?: PaymentMethodType[];
};

export default function AddWasteStickerResult({
  createList,
  listType,
  successSubmit = false,
  setSuccessSubmit,
  paymentMethodList = []
}: AddWasteStickerResultProps) {
  // 리스트 유형을 결정하는 상태 (예시로 상태 관리)
  const {
    selectedList,
    addStickers,
    totalQuantity,
    resetTotal,
    setAddStickers
  } = usePurcase(
    useShallow((state) => ({
      selectedList: state.selectedList,
      addStickers: state.addStickers,
      totalQuantity: state.totalQuantity,
      resetTotal: state.resetTotal,
      setAddStickers: state.setAddStickers
    }))
  );
  const [tempSelectedList, setTempSelectedList] = useState<
    { id: string; fee: number }[]
  >([]);

  const { clearSelection } = useParchaseSuccessCheck();
  //담당자 확인 후 구매 신청건 - 직접 수납
  const [showReceipt, setShowReceipt] = useState(false);
  //초기화
  const [resetForm, setResetForm] = useState(false);
  const router = useRouter();

  useEffect(() => {
    tempList();
  }, []);
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
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
      paymentMethod: undefined
    }
  });

  useEffect(() => {
    if (paymentMethodList[0]) {
      const result = paymentMethodList[0].paymentMethodId
        ? paymentMethodList[0].paymentMethodId
        : "PMT_MEAN_001";
      reset({ paymentMethod: result as FormValues["paymentMethod"] });
    }
  }, [paymentMethodList]);

  const watchPayment = watch("paymentMethod");

  const handleShowReceiptClose = () => {
    setShowReceipt(false);
    if (listType === "sticker") {
      router.push(`/store/waste-sticker/detail`);
    } else {
      router.push(`/store/trash-bag/detail`);
    }
  };

  const handleResetClose = () => {
    resetTotal();
    clearSelection();
    setResetForm(false);
  };

  const onSubmit = (data: ResultFormValues | ResultTrashFormValues) => {
    if (addStickers.length > 0) {
      console.log("addWasteResult Data : ", data);
      createList(data);
    } else {
      toast({ description: "구매 권종을 등록해주세요." });
    }
  };

  const handleSubmitClose = () => {
    if (setSuccessSubmit) {
      setSuccessSubmit(false);
      if (listType === "sticker") {
        router.push(`/store/waste-sticker/detail`);
      } else {
        router.push(`/store/trash-bag/detail`);
      }
    }
  };

  const tempList = () => {
    const data = selectedList.map((item) => {
      return {
        id: item.id,
        fee: item.fee
      };
    });
    setTempSelectedList(data);
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
        purchaseQuantity: formatNumberWithCommas(
          existingItem ? existingItem.purchaseQuantity : 1
        )
      };
    });
    console.log("newValues", newValues);

    // 폼 값 업데이트
    setValue("list", newValues);

    // addStickers 업데이트
    setAddStickers(newValues);

    console.log("폼 값 업데이트됨:", newValues);
  }, [selectedList, setValue, watch, setAddStickers]);

  return (
    <form className="flex flex-col">
      <div className="flex flex-col gap-2 mb-[12px]">
        <div className="space-y-3">
          {selectedList.map((item, index) => (
            <AddDetailItemContainer
              key={item.id || item.stickerId}
              setValue={setValue}
              data={item}
              register={register}
              index={index}
              isDelete={true}
            />
          ))}
        </div>
      </div>

      {/* 결제 금액 */}
      <PaymentAmount
        addStickers={addStickers}
        selectedList={tempSelectedList}
      />
      {/* 결제 수단 */}
      <PaymentRadio control={control} paymentMethodList={paymentMethodList} />
      {/* 버튼 */}
      <ShowResultModal
        handleShowReceiptClose={handleShowReceiptClose}
        handleResetClose={handleResetClose}
        setResetForm={setResetForm}
        resetForm={resetForm}
        setShowReceipt={setShowReceipt}
        showReceipt={showReceipt}
        handleSubmitClose={handleSubmitClose}
        successSubmit={successSubmit}
        setSuccessSubmit={setSuccessSubmit}
      />
      <ClientButtons
        resetForm={setResetForm}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        watchPayment={paymentMethodList.length === 0 ? undefined : watchPayment}
      />
    </form>
  );
}

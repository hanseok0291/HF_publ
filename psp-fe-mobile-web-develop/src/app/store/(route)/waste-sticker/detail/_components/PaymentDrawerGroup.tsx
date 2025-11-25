import { Controller, useFormContext } from "react-hook-form";
import { TypeOf } from "zod";
import { useShallow } from "zustand/react/shallow";
import {
  paymentStatus,
  paymentType
} from "@/app/constant/waste-sticker/DetailCustomDrawerContent.data";
import BasicDrawer from "@/components/common/BasicDrawer";
import CustomDrawerContent from "@/components/common/CustomDrawerContent";
import { PAY_METHOD_ENUM, PAY_STATUS_ENUM } from "@/enums/Common.enum";
import useDrawerSelect from "@/stores/useDrawerSelect";
import { WasteStickerListParam } from "../page";

type PaymentMethodType = TypeOf<typeof PAY_METHOD_ENUM>;
type PaymentStatusType = TypeOf<typeof PAY_STATUS_ENUM>;
export default function PaymentDrawerGroup() {
  const { control } = useFormContext<WasteStickerListParam>();
  const {
    selectedPayment,
    setSelectedPayment,
    selectedPaymentStatus,
    setSelectedPaymentStatus
  } = useDrawerSelect(
    useShallow((state) => ({
      selectedPayment: state.selectedPayment as PaymentMethodType,
      setSelectedPayment: state.setSelectedPayment,
      selectedPaymentStatus: state.selectedPaymentStatus as PaymentStatusType,
      setSelectedPaymentStatus: state.setSelectedPaymentStatus
    }))
  );

  const handleTypeChange = (
    value: string,
    onChange: (value: string | null) => void
  ) => {
    onChange(value === "null" ? null : value);
  };

  return (
    <div className="flex gap-[8px]">
      <Controller
        name="paymentMethod"
        control={control}
        render={({ field: { onChange, value } }) => (
          <BasicDrawer
            value={value === null ? "null" : value}
            onChange={(newValue) => handleTypeChange(newValue, onChange)}
            drawerTitle="조회 결제수단 선택"
            title="결제수단"
            selectedValue={selectedPayment}
            onSelect={setSelectedPayment}
            Content={CustomDrawerContent}
            contentProps={{
              data: paymentType
            }}
          />
        )}
      />
      <Controller
        name="paymentStatus"
        control={control}
        render={({ field: { onChange, value } }) => (
          <BasicDrawer
            value={value === null ? "null" : value}
            onChange={(newValue) => handleTypeChange(newValue, onChange)}
            drawerTitle="조회 결제상태 선택"
            title="결제상태"
            selectedValue={selectedPaymentStatus}
            onSelect={setSelectedPaymentStatus}
            Content={CustomDrawerContent}
            contentProps={{
              data: paymentStatus
            }}
          />
        )}
      />
    </div>
  );
}

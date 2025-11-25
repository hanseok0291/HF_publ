import { PaymentRadioType } from "../../../../types/store/waste-sticker/AddWasteSticker.type";
import React from "react";
import { Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { isMobile, isSafari, isWebView } from "@/utils/WebViewHandler";

export default function PaymentRadio({
  control,
  paymentMethodList
}: PaymentRadioType) {
  if (!paymentMethodList[0]) {
    return null;
  }

  return (
    <div>
      <h4 className="mb-4 font-semibold">결제 수단</h4>
      <Controller
        name="paymentMethod"
        control={control}
        render={({ field: { onChange, value } }) => {
          return (
            <RadioGroup className="mb-7" value={value} onValueChange={onChange}>
              <div className="grid grid-cols-3 gap-4">
                {paymentMethodList.map(
                  ({ paymentMethodId, paymentMethodName }) => (
                    <div
                      key={paymentMethodId}
                      className="flex items-center space-x-2"
                    >
                      <RadioGroupItem
                        value={paymentMethodId}
                        id={paymentMethodId}
                        className="bg-gray30 border-none"
                      />
                      <Label htmlFor={paymentMethodId}>
                        {paymentMethodName}
                      </Label>
                    </div>
                  )
                )}
              </div>

              {isMobile() && isSafari() && !isWebView() ? (
                <p className="pt-4 text-sm text-red-600">
                  *결제를 위해 팝업창 허용이 필요합니다.
                  <br />
                  설정 {">"} 앱 {">"} Safari {">"} '팝업 차단'이 해제 상태인지
                  확인해 주세요.
                </p>
              ) : null}
            </RadioGroup>
          );
        }}
      />
    </div>
  );
}

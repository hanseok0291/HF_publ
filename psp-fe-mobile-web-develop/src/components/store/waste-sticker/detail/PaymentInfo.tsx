import { PaymentResponseType } from "@/types/apiType/waste-sticker/WasteSticker.type";
import { Fragment } from "react";
import DetailResponseOverview from "@/components/common/DetailResponseOverview";
import HeadLessTable from "@/components/common/HeadLessTable";
import { PAY_STATUS } from "@/enums/Common.enum";
import {
  formatDateWithTime,
  formatNumberWithCommas
} from "@/utils/formatUtils";
import DetailListContainer from "./DetailListContainer";

export default function PaymentInfo({
  payment,
  wasteListData
}: PaymentResponseType) {
  const renderPaymentMethodCodeName = (paymentMethodCode: string) => {
    console.log(paymentMethodCode);
    if (paymentMethodCode === "PMT_MEAN_002" || "PMT_MEAN_003") {
      return "은행";
    } else {
      return "카드사";
    }
  };

  const renderPaymentInfoTitle = (paymentMethodCode: string) => {
    // 가상계좌
    if (paymentMethodCode === "PMT_MEAN_002") {
      return "가상계좌번호";
    }
    // 내통장결제
    if (paymentMethodCode === "PMT_MEAN_003") {
      return "출금계좌번호";
    }
    return "결제승인번호";
  };
  console.log(wasteListData);
  const item = payment[0];
  return (
    <DetailListContainer>
      <p className="text-[16px] font-bold">결제정보</p>
      <Fragment key={item.paymentId}>
        <DetailResponseOverview
          title="결제수단"
          response={item.paymentMethodCodeName}
        />
        <DetailResponseOverview
          title={renderPaymentMethodCodeName(item.paymentMethodCodeName)}
          response={item.meanNm}
        />
        <DetailResponseOverview
          title="승인일시"
          response={
            item.trdDtm ? formatDateWithTime(item.trdDtm, "second") : "-"
          }
        />
        <DetailResponseOverview
          title="취소일시"
          response={
            item.cancelDtm ? formatDateWithTime(item.cancelDtm, "second") : "-"
          }
        />
        <DetailResponseOverview
          title="수납여부"
          response={PAY_STATUS[item.paymentStatusCode]}
        />
        <DetailResponseOverview title="결제자명" response={item.settlerName} />
        <DetailResponseOverview
          title="휴대전화"
          response={item.settlerCellPhoneNumber}
        />
        <DetailResponseOverview
          title="결제금액"
          response={formatNumberWithCommas(item.trdAmt)}
        />

        <DetailResponseOverview
          title={renderPaymentInfoTitle(item.paymentMethodCode)}
          response={item.paymentInfo}
        />

        <div>
          <span className="text-[12px] inline-block mb-[8px] text-gray80">
            결제품목
          </span>
          <p className="text-[14px] font-normal">{item.pmtPrdNm ?? "-"}</p>
        </div>
        {item.cancelList && item.cancelList.length !== 0 && (
          <div>
            <span className="text-[12px] text-gray80 font-medium">
              원거래 상세 이력
            </span>
            <HeadLessTable data={wasteListData} />
          </div>
        )}
      </Fragment>
    </DetailListContainer>
  );
}

import { formatNumberWithCommas } from "@/utils/formatUtils";

export const detailReceiptType = [
  { id: 1, content: "직접수령", value: "#" },
  { id: 2, content: "배송", value: "#" }
];

export const paymentInfo = [
  { id: 1, title: "결제수단", content: "신용카드" },
  { id: 2, title: "카드사", content: "KB국민카드" },
  { id: 3, title: "승인일시", content: "YYYY-MM-DD(HH:MM:SS)" },
  { id: 4, title: "취소일시", content: "YYYY-MM-DD(HH:MM:SS)" },
  { id: 5, title: "수납여부", content: "취소완료" },
  { id: 6, title: "결제자명", content: "홍길동" },
  { id: 7, title: "휴대전화", content: "010-0000-0000" },
  { id: 8, title: "결제금액", content: formatNumberWithCommas("0000") },
  { id: 9, title: "결제 승인번호", content: "20005678" }
];

export const paymentItems = [
  {
    id: 1,
    title: "결제품목",
    content: [
      "[품목/세부품목명] 규격명1(지자체가 등록한 권종 내용 노출)",
      "[품목/세부품목명] 규격명2(지자체가 등록한 권종 내용 노출)"
    ]
  }
];

export const paymentDetailInfo = [
  {
    id: 1,
    title: "원거리 상세 이력",
    content: {
      date: "YYYY-MM-DD (HH:MM:SS)",
      status: "결제완료",
      purchase: formatNumberWithCommas("0000"),
      name: "홍길동"
    }
  },
  {
    id: 2,
    title: "원거리 상세 이력",
    content: {
      date: "YYYY-MM-DD (HH:MM:SS)",
      status: "결제완료",
      purchase: formatNumberWithCommas("0000"),
      name: "홍길동"
    }
  }
];

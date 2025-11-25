export interface DrawerSelectType {
  // 기존 속성들
  selectedPayment: string;
  selectedPaymentStatus: string;
  selectedReceiptStatus: string;
  selectedReceiptType: string;
  selectedSearchFilter: string;
  selectedAdminPower: string;

  // BasicDrawerGroup 속성들 추가
  selectedLegalEmdNm: string;
  selectedWasteTopMenu: string;
  selectedCollectorStatus: string;
  selectedWasteMiddleMenu: string;

  // 기존 메서드들
  setSelectedPayment: (value: string) => void;
  setSelectedPaymentStatus: (value: string) => void;
  setSelectedReceiptStatus: (value: string) => void;
  setSelectedReceiptType: (value: string) => void;
  setSelectedSearchFilter: (value: string) => void;
  setSelectedAdminPower: (value: string) => void;

  // BasicDrawerGroup 메서드들 추가
  setSelectedLegalEmdNm: (value: string) => void;
  setSelectedWasteTopMenu: (value: string) => void;
  setSelectedCollectorStatus: (value: string) => void;
  setSelectedWasteMiddleMenu: (value: string) => void;
}

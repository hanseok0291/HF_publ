export const wasteStickerMenu = {
  menuText: [
    { id: 1, text: "스티커 구매 신청" },
    { id: 2, text: "스티커 구매 내역" }
  ],
  link: [
    { id: 1, text: "/store/waste-sticker/add" },
    { id: 2, text: "/store/waste-sticker/detail" }
  ]
};

export const trashBagMenu = {
  menuText: [
    { id: 1, text: "봉투 구매 신청" },
    { id: 2, text: "봉투 구매 내역" }
  ],
  link: [
    { id: 1, text: "/store/trash-bag/add" },
    { id: 2, text: "/store/trash-bag/detail" }
  ]
};

export const employeeMenu = {
  menuText: [
    { id: 1, text: "직원 리스트" },
    { id: 2, text: "직원 권한 관리" },
    { id: 3, text: "내 정보 확인 및 수정" }
  ],
  link: [
    { id: 1, text: "/store/employee/list" },
    { id: 2, text: "/store/employee/manage" },
    { id: 3, text: "/store/employee/profile" }
  ]
};

export const etcMenu = {
  menuText: [
    { id: 1, text: "공지사항" },
    { id: 2, text: "FAQ" },
    { id: 3, text: "매뉴얼" }
  ],
  link: [
    { id: 1, text: "/store/notice" },
    { id: 2, text: "/store/faq" },
    { id: 3, text: "/store/manual" }
  ]
};

export const headerData = [
  {
    id: 1,
    img: "/icons/collector/header-3d-marker.svg",
    text: "수거지도",
    link: "/collector"
  },
  {
    id: 2,
    img: "/icons/collector/header-3d-truck.svg",
    text: "수거처리 현황",
    link: "/collector/collector-status"
  },
  {
    id: 3,
    img: "/icons/collector/header-3d-profile.svg",
    text: "내 정보 확인",
    link: "/collector/profile"
  }
];

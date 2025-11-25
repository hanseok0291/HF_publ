import { create } from "zustand";

type data = {
  noticeId: string;
  title: string;
  insertionName: string;
  insertionIstt: string;
  insertionEmail?: string;
  insertionDate: string;
  contents?: string;
  parentFixYn?: boolean;
};

export type NoticeTapType = {
  //공지사항
  noticeId: string | null;
  setNoticeId: (id: string) => void;

  //상세보기 클릭 여부
  clickDetail: boolean;
  setClickDetail: (value: boolean) => void; // 상세보기 클릭 여부
  activeTab: "ALL" | "BACK" | "LOCAL" | "ISTT";
  setActiveTab: (tab: "ALL" | "BACK" | "LOCAL" | "ISTT") => void;
  resetActive: () => void;

  //id Data
  detailData: data | null;
  setDetailData: (value: data) => void;

  dataList: data[];
  setDataList: (value: data[]) => void;

  //reset
  resetNotice: () => void;
};

const useNoticeTap = create<NoticeTapType>((set) => ({
  noticeId: null,
  setNoticeId: (id) => set({ noticeId: id }),
  clickDetail: false,
  setClickDetail: (value) => set({ clickDetail: value }),
  detailData: null,
  setDetailData: (value) => set({ detailData: value }),
  activeTab: "ALL",
  setActiveTab: (tab) => set({ activeTab: tab }),
  resetActive: () => set({ activeTab: "ALL" }),
  dataList: [],
  setDataList: (value) => set({ dataList: value }),
  resetNotice: () =>
    set({
      noticeId: null,
      clickDetail: false
    })
}));

export default useNoticeTap;

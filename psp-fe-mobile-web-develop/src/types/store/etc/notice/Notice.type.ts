import { ReactNode } from "react";
import { TypeOf } from "zod";
import { WRITER_ENUM } from "@/enums/Bulletin.enum";
import { SEARCH_WITH_ENUM } from "@/enums/Common.enum";

export type TabsTopFixType = {
  clickDetail: boolean;
};

export type TabsTopFixHeadSectionType = {
  title: string;
  name: string;
  date: string;
  email?: string;
  telNumber?: string;
  cellNumber?: string;
};

export type TabsTopFixContentSectionType = {
  contents: string;
};

export type TabsTopFixStatusSectionType = {
  currentFixPin: boolean;
  insertionIstt: string;
};

export type NoticeTabsContentContainerType = {
  children: ReactNode;
};

export type NoticeTabsTitleType = {
  text: string;
  parentFixYn: boolean;
  commentYn?: boolean;
  commentCount?: number;
  isActive?: boolean;
};

export type NoticeTabUserInfoType = {
  name: string;
  email?: string;
  date: string;
};

export type NoticeData = {
  noticeId: string;
  parentFixYn?: boolean;
  title: string;
  insertionEmail: string;
  insertionName: string;
  insertionIstt: string;
  insertionDate: string;
  contents?: string;
};

export type NoticeParams = {
  keyWord: string;
  filterType: TypeOf<typeof SEARCH_WITH_ENUM>;
  writerType: TypeOf<typeof WRITER_ENUM>;
  page: number;
  size: number;
  sort: string[];
};

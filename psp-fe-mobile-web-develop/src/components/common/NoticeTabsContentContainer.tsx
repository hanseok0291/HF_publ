import { NoticeTabsContentContainerType } from "@/types/store/etc/notice/Notice.type";

export default function NoticeTabsContentContainer({
  children
}: NoticeTabsContentContainerType) {
  return <div className="flex flex-col gap-[0.5rem]">{children}</div>;
}

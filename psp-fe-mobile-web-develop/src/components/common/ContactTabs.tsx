"use client";

import Link from "next/link";
import Loading from "@/app/loading";
import { useJobInquiryList } from "@/hooks/useContact";
import EtcChip from "../store/etc/EtcChip";
import NoticeTabsContentContainer from "./NoticeTabsContentContainer";
import NoticeTabsTitle from "./NoticeTabsTitle";
import NoticeTabUserInfo from "./NoticeTabUserInfo";

export default function ContactTabs() {
  const { data, isLoading, error } = useJobInquiryList();
  if (isLoading) return <Loading />;
  if (error) return <p>데이터를 가져오는 과정에 문제가 발생했습니다.</p>;
  if (!data) return null;
  if (data.content.length === 0)
    return (
      <div className="flex justify-center items-center h-screen">
        <p>해당하는 메뉴의 업무문의가 없습니다.</p>
      </div>
    );

  return (
    <div>
      {data.content.map((item, index) => (
        <Link href={`/collector/contact/detail/${item.jobInqId}`} key={index}>
          <div className="flex flex-col p-[1.25rem]">
            <div className="flex flex-col justify-between">
              <EtcChip text={item.authorName} className="mb-[12px] w-fit p-2" />
              <NoticeTabsContentContainer>
                <NoticeTabsTitle
                  text={item.title}
                  parentFixYn={false}
                  commentYn={true}
                  commentCount={item.commentCount}
                />
                <NoticeTabUserInfo
                  name={item.inquiryWriterName}
                  email={item.jobInqWriterEmail}
                  date={item.insertionDate}
                />
              </NoticeTabsContentContainer>
            </div>
          </div>
          <hr className="w-full" />
        </Link>
      ))}
    </div>
  );
}

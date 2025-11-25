"use client";

import { ContactDetailResponseType } from "@/types/apiType/collector/contact/Contact.type";
import NoticeTabsContentContainer from "@/components/common/NoticeTabsContentContainer";
import NoticeTabsTitle from "@/components/common/NoticeTabsTitle";
import NoticeTabUserInfo from "@/components/common/NoticeTabUserInfo";
import EtcChip from "@/components/store/etc/EtcChip";

export default function ContactAnswers({
  detailData
}: {
  detailData: ContactDetailResponseType;
}) {
  if (!detailData) return;
  return (
    <section className="p-[20px] pb-0">
      <span className="text-[12px] inline-block mb-[20px]">
        전체 댓글 {detailData.jobInquiryAnswers.length}
      </span>
      <div className="animate-fade-in">
        {detailData.jobInquiryAnswers.map((item) => (
          <div key={item.jobInqAnsrId} className="mb-[24px]">
            <div className="flex flex-col">
              <div>
                <EtcChip
                  text={detailData.jobInqIsttName}
                  className="mb-[12px] w-fit p-1"
                />
                <NoticeTabsContentContainer>
                  <NoticeTabsTitle text={item.contents} parentFixYn={false} />
                  <NoticeTabUserInfo
                    name={item.inquiryWriterName}
                    email={item.jobInqWriterEmail}
                    date={item.insertionDate}
                  />
                </NoticeTabsContentContainer>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

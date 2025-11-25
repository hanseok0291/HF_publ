"use client";

import { ContactDetailResponseType } from "@/types/apiType/collector/contact/Contact.type";
import TabsTopFixHeadSection from "@/app/store/(route)/(etc)/notice/_components/TabsTopFixHeadSection";
import TabsTopFixStatusSection from "@/app/store/(route)/(etc)/notice/_components/TabsTopFixStatusSection";

const ContactTabsTopContent = ({
  detailData
}: {
  detailData: ContactDetailResponseType;
}) => {
  return (
    <section>
      {detailData && (
        <>
          <div
            className="flex flex-col p-[1.25rem] gap-[0.75rem]"
            key={detailData.jobInqId}
          >
            <TabsTopFixStatusSection
              currentFixPin={false}
              insertionIstt={detailData.jobInqIsttName}
            />
            <TabsTopFixHeadSection
              title={detailData.title}
              name={detailData.inquiryWriterName}
              date={detailData.insertionDate}
              email={detailData.jobInqWriterEmail}
              telNumber={detailData.jobInqWriterTeleNum}
              cellNumber={detailData.jobInqWriterCellNum}
            />

            <div
              dangerouslySetInnerHTML={{
                __html: detailData.contents ?? "내용이 존재하지 않습니다."
              }}
            />
          </div>
          <hr className="h-2 bg-[#F4F4F4] border-0" />
        </>
      )}
    </section>
  );
};

export default ContactTabsTopContent;

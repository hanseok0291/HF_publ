"use client";

import { useShallow } from "zustand/react/shallow";
import TabsTopFixHeadSection from "@/app/store/(route)/(etc)/notice/_components/TabsTopFixHeadSection";
import TabsTopFixStatusSection from "@/app/store/(route)/(etc)/notice/_components/TabsTopFixStatusSection";
import useNoticeTap from "@/stores/useNoticeTap";

const TabsTopFixContent = () => {
  const { noticeId, detailData } = useNoticeTap(
    useShallow((state) => ({
      noticeId: state.noticeId,
      detailData: state.detailData
    }))
  );

  return (
    <section>
      {detailData && (
        <>
          <div
            className="flex flex-col p-[1.25rem] gap-[0.75rem]"
            key={noticeId}
          >
            <TabsTopFixStatusSection
              currentFixPin={detailData.parentFixYn ? true : false}
              insertionIstt={detailData.insertionIstt}
            />
            <TabsTopFixHeadSection
              title={detailData.title}
              name={detailData.insertionName}
              date={detailData.insertionDate}
              email={detailData.insertionEmail}
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

export default TabsTopFixContent;

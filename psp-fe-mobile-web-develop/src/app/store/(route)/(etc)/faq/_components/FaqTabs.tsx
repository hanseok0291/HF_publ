"use client";

import { useFormContext } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { getStoreFaqList } from "@/apis/etc/faqApi";
import Loading from "@/app/loading";
import NoticeTabsContentContainer from "@/components/common/NoticeTabsContentContainer";
import NoticeTabsTitle from "@/components/common/NoticeTabsTitle";
import NoticeTabUserInfo from "@/components/common/NoticeTabUserInfo";
import EtcChip from "@/components/store/etc/EtcChip";
import { FAQStoreParam } from "../page";

const FAQTabs = () => {
  const formContext = useFormContext<FAQStoreParam>();
  const router = useRouter();
  const params = useParams();
  const currentFaqId = params?.id as string;
  const { watch } = formContext;
  const { swrResponse } = getStoreFaqList(watch());

  if (swrResponse.error) {
    return <div>Error loading FAQ data</div>;
  }

  if (!swrResponse || !swrResponse.data) {
    return <Loading />;
  }

  const result = swrResponse.data.content?.content || [];

  return (
    <div className="animate-fade-in">
      {result.length === 0 ? (
        <p className="text-center">해당하는 메뉴의 FAQ가 없습니다.</p>
      ) : (
        result.map((item) => (
          <div key={item.faqId}>
            <div
              className="flex flex-col p-[1.25rem] cursor-pointer"
              onClick={() => router.replace(`/store/faq/${item.faqId}`)}
            >
              <div>
                <EtcChip text={item.insertionIstt} className="mb-[12px]" />
                <NoticeTabsContentContainer>
                  <NoticeTabsTitle
                    text={item.title}
                    parentFixYn={false}
                    isActive={currentFaqId === item.faqId}
                  />
                  <NoticeTabUserInfo
                    name={item.insertionName}
                    date={item.insertionDate}
                    email={item.insertionEmail}
                  />
                </NoticeTabsContentContainer>
              </div>
            </div>
            <hr className="w-full" />
          </div>
        ))
      )}
    </div>
  );
};

export default FAQTabs;

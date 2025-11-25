"use client";

import { ApiError } from "@/types/HttpClient.type";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { useShallow } from "zustand/react/shallow";
import { getCollectorFaqDetail } from "@/apis/collector/etc/faqApis";
import TabsTopFixContent from "@/components/common/TabsTopFixContent";
import CloseHeader from "@/components/header/CloseHeader";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/hooks/use-toast";
import useNoticeTap from "@/stores/useNoticeTap";
import { isEdge } from "@/utils/WebViewHandler";
import CollectorFAQTabs from "../../_components/CollectorFaqTabs";
import { FAQCollectorParam } from "../../page";

const FAQId = () => {
  const params = useParams();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const { noticeId, setClickDetail, setDetailData, resetNotice, setNoticeId } =
    useNoticeTap(
      useShallow((state) => ({
        noticeId: state.noticeId,
        setClickDetail: state.setClickDetail,
        setDetailData: state.setDetailData,
        resetNotice: state.resetNotice,
        setNoticeId: state.setNoticeId
      }))
    );

  const router = useRouter();
  const form = useForm<FAQCollectorParam>({
    mode: "onChange",
    defaultValues: {
      filterType: "ALL",
      writerType: "ALL",
      page: currentPage,
      size: 10,
      sort: []
    }
  });

  const onClose = () => {
    setClickDetail(false);
    resetNotice();
    router.push("/collector/faq");
  };

  const fetchData = async (id: string) => {
    try {
      const response = await getCollectorFaqDetail({ faqId: id });
      console.log("getNoticeId data fetched successfully:", response);
      setDetailData({
        noticeId: response.content.faqId,
        insertionDate: response.content.insertionDate,
        insertionIstt: response.content.insertionIstt,
        insertionName: response.content.insertionName,
        insertionEmail: response.content.insertionEmail,
        title: response.content.title,
        contents: response.content.contents
      });
    } catch (error: any) {
      [400, 401, 403, 409, 500].includes(error?.code) &&
        toast({
          title: "오류가 발생했습니다.",
          description: `에러 내용 : ${(error as ApiError).message} \n${new Date()}`,
          action: (
            <ToastAction
              altText="닫기"
              className="sm:right-0 sm:bottom-0"
              onClick={() => {
                router.push("/collector/faq");
              }}
            >
              닫기
            </ToastAction>
          )
        });
    }
  };

  useEffect(() => {
    const urlNoticeId = params?.id as string;

    if (urlNoticeId) {
      if (!noticeId) {
        setNoticeId(urlNoticeId);
      }
      fetchData(urlNoticeId);
    } else {
      toast({
        title: "관리자 ID가 없습니다.",
        description: `${new Date()}`,
        action: (
          <ToastAction
            altText="닫기"
            className="sm:right-0 sm:bottom-0"
            onClick={() => {
              router.push("/collector/faq");
            }}
          >
            닫기
          </ToastAction>
        )
      });
    }
  }, [params?.id]);

  return (
    <FormProvider {...form}>
      <div
        className={
          isEdge()
            ? undefined
            : "h-[100dvh] overflow-y-auto overscroll-y-contain [-webkit-overflow-scrolling:touch]"
        }
        style={isEdge() ? undefined : { touchAction: "pan-y" }}
      >
        <CloseHeader onClose={onClose} title="FAQ 상세" />
        <TabsTopFixContent />
        <CollectorFAQTabs />
      </div>
    </FormProvider>
  );
};

export default FAQId;

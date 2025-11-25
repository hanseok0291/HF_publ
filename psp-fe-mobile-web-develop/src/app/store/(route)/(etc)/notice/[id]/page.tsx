"use client";

import { ApiError } from "@/types/HttpClient.type";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { useShallow } from "zustand/react/shallow";
import { getStoreNoticeId, getStoreNoticeList } from "@/apis/etc/noticeApi";
import { tabsTypesData } from "@/app/constant/etc/notice/MockTabsTypeData.data";
import { NoticeStoreParam } from "@/app/store/(route)/(etc)/notice/page";
import CustomPagination from "@/components/common/CustomPagination";
import CustomTabs from "@/components/common/CustomTabs";
import TabsTopFixContent from "@/components/common/TabsTopFixContent";
import CloseHeader from "@/components/header/CloseHeader";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/hooks/use-toast";
import useNoticeTap from "@/stores/useNoticeTap";
import { isEdge } from "@/utils/WebViewHandler";

const NoticeId = () => {
  const params = useParams();
  const {
    noticeId,
    setClickDetail,
    setDetailData,
    resetNotice,
    setNoticeId,
    setActiveTab
  } = useNoticeTap(
    useShallow((state) => ({
      noticeId: state.noticeId,
      setClickDetail: state.setClickDetail,
      setDetailData: state.setDetailData,
      resetNotice: state.resetNotice,
      setNoticeId: state.setNoticeId,
      setActiveTab: state.setActiveTab
    }))
  );

  const router = useRouter();
  const form = useForm<NoticeStoreParam>({
    mode: "onChange",
    defaultValues: {
      filterType: "ALL",
      writerType: "ALL",
      page: 0,
      size: 10,
      sort: []
    }
  });

  const { watch, setValue } = form;
  const { totalPages = 0 } =
    getStoreNoticeList(watch())?.swrResponse?.data?.content ?? {};

  const onClose = () => {
    setClickDetail(false);
    resetNotice();
    router.back();
  };

  const fetchData = async (id: string) => {
    try {
      const response = await getStoreNoticeId({ noticeId: id });
      console.log("getNoticeId data fetched successfully:", response);
      setDetailData(response.content);
    } catch (error: any) {
      toast({
        title: "오류가 발생했습니다.",
        description: `에러 내용 : ${(error as ApiError).message} \n${new Date()}`,
        action: (
          <ToastAction
            altText="닫기"
            className="sm:right-0 sm:bottom-0"
            onClick={() => {
              router.push("/store/notice");
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
        title: "오류가 발생했습니다.",
        action: (
          <ToastAction
            altText="닫기"
            className="sm:right-0 sm:bottom-0"
            onClick={() => {
              router.push("/store/notice");
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
        <CloseHeader onClose={onClose} title="공지사항 상세" />
        <TabsTopFixContent />
        <CustomTabs data={tabsTypesData} />
        <div className="flex flex-col px-[20px] pt-[20px] pb-[32px] gap-[1rem] w-full">
          <CustomPagination
            pageNumber={watch("page")}
            onClick={(page) => setValue("page", page)}
            totalPages={totalPages}
          />
        </div>
      </div>
    </FormProvider>
  );
};

export default NoticeId;

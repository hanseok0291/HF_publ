"use client";

import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { useShallow } from "zustand/react/shallow";
import {
  getCollectorNoticeList,
  getNoticeId
} from "@/apis/collector/etc/noticeApis";
import { tabsTypesData } from "@/app/constant/etc/notice/MockTabsTypeData.data";
import CustomPagination from "@/components/common/CustomPagination";
import CustomTabs from "@/components/common/CustomTabs";
import TabsTopFixContent from "@/components/common/TabsTopFixContent";
import CloseHeader from "@/components/header/CloseHeader";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/hooks/use-toast";
import useNoticeTap from "@/stores/useNoticeTap";
import { isEdge } from "@/utils/WebViewHandler";
import { NoticeCollectorParam } from "../../page";

const NoticeId = () => {
  const params = useParams();
  const {
    noticeId: storeNoticeId,
    setClickDetail,
    setDetailData,
    resetNotice
  } = useNoticeTap(
    useShallow((state) => ({
      noticeId: state.noticeId,
      setClickDetail: state.setClickDetail,
      setDetailData: state.setDetailData,
      resetNotice: state.resetNotice
    }))
  );

  // URL 파라미터에서 id 가져오기
  const urlNoticeId = params.id as string;

  // URL의 id와 store의 noticeId 중 하나를 사용
  const noticeId = urlNoticeId || storeNoticeId;

  const form = useForm<NoticeCollectorParam>({
    mode: "onChange",
    defaultValues: {
      filterType: "ALL",
      writerType: "ALL",
      page: 0,
      size: 10,
      sort: []
    }
  });
  const router = useRouter();
  const { watch, setValue } = form;
  const { totalPages = 0 } =
    getCollectorNoticeList(watch())?.swrResponse?.data?.content ?? {};

  const onClose = () => {
    setClickDetail(false);
    resetNotice();
    router.back();
  };

  const fetchData = async () => {
    if (noticeId) {
      try {
        const response = await getNoticeId({ noticeId: noticeId });
        console.log("getNoticeId data fetched successfully:", response);
        setDetailData(response.content);
        // 스토어에 noticeId 설정 (URL에서 가져온 경우에만)
        if (urlNoticeId && !storeNoticeId) {
          setClickDetail(true);
        }
      } catch (error) {
        console.error("getNoticeId data fetch failed:", error);
        showErrorToast();
      }
    } else {
      showErrorToast();
    }
  };

  const showErrorToast = () => {
    toast({
      title: "다시 시도해주세요.",
      description: `${new Date()}`,
      action: <ToastAction altText="닫기">닫기</ToastAction>
    });
    router.push("/collector/notice");
  };

  useEffect(() => {
    if (noticeId) {
      fetchData();
    } else {
      showErrorToast();
    }
  }, [noticeId]);

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

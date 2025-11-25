"use client";

import { ExtractParam } from "@/types/HttpClient.type";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useShallow } from "zustand/react/shallow";
import { getStoreNoticeList } from "@/apis/etc/noticeApi";
import { tabsTypesData } from "@/app/constant/etc/notice/MockTabsTypeData.data";
import Loading from "@/app/loading";
import CustomPagination from "@/components/common/CustomPagination";
import CustomTabs from "@/components/common/CustomTabs";
import MainContainer from "@/components/common/MainContainer";
import ArrowAndMenuHeader from "@/components/header/ArrowAndMenuHeader";
import useNoticeTap from "@/stores/useNoticeTap";
import NoticeInputGroup from "./_components/NoticeInputGroup";

export type NoticeStoreParam = ExtractParam<typeof getStoreNoticeList>;
export default function Notice() {
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
  const { resetActive } = useNoticeTap(
    useShallow((state) => ({
      clickDetail: state.clickDetail,
      noticeId: state.noticeId,
      resetActive: state.resetActive
    }))
  );

  const { swrResponse } = getStoreNoticeList(watch());
  const { totalPages = 0 } =
    getStoreNoticeList(watch())?.swrResponse?.data?.content ?? {};

  useEffect(() => {
    return () => {
      resetActive();
    };
  }, []);

  if (!swrResponse || !swrResponse.data) {
    return <div>데이터를 가져오는 과정에 문제가 생겼습니다.</div>;
  }

  return (
    <FormProvider {...form}>
      <MainContainer>
        <ArrowAndMenuHeader headerTitle="공지사항" />
        {swrResponse.error && !swrResponse.isLoading && (
          <p className="text-center">
            데이터 가져오는 과정에 문제가 발생했습니다.
          </p>
        )}
        {!swrResponse.error && swrResponse.isLoading && <Loading />}
        {!swrResponse.error && !swrResponse.isLoading && (
          <CustomTabs data={tabsTypesData} />
        )}
        <div className="flex flex-col px-[20px] pt-[20px] pb-[32px] gap-[1rem] w-full">
          <CustomPagination
            pageNumber={watch("page")}
            onClick={(page) => setValue("page", page)}
            totalPages={totalPages}
          />
          <NoticeInputGroup />
        </div>
      </MainContainer>
    </FormProvider>
  );
}

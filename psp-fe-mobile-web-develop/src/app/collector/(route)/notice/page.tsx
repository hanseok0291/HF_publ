"use client";

import { ExtractParam } from "@/types/HttpClient.type";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useShallow } from "zustand/react/shallow";
import { getCollectorNoticeList } from "@/apis/collector/etc/noticeApis";
import { tabsTypesData } from "@/app/constant/etc/notice/MockTabsTypeData.data";
import Loading from "@/app/loading";
import CustomPagination from "@/components/common/CustomPagination";
import CustomTabs from "@/components/common/CustomTabs";
import MainContainer from "@/components/common/MainContainer";
import ArrowHeader from "@/components/header/ArrowHeader";
import useNoticeTap from "@/stores/useNoticeTap";
import NoticeInputGroup from "./_components/NoticeInputGroup";

export type NoticeCollectorParam = ExtractParam<typeof getCollectorNoticeList>;
export default function Notice() {
  const router = useRouter();
  const form = useForm<NoticeCollectorParam>({
    mode: "onChange",
    defaultValues: {
      writerType: "ALL",
      filterType: "ALL",
      page: 0,
      size: 10,
      sort: []
    }
  });
  const { watch, setValue } = form;
  const { swrResponse } = getCollectorNoticeList(watch());
  const { totalPages = 0 } =
    getCollectorNoticeList(watch())?.swrResponse?.data?.content ?? {};
  const { clickDetail, noticeId } = useNoticeTap(
    useShallow((state) => ({
      clickDetail: state.clickDetail,
      noticeId: state.noticeId
    }))
  );

  useEffect(() => {
    if (clickDetail) {
      router.push(`/collector/notice/detail/${noticeId}`);
    }
  }, [clickDetail]);

  return (
    <FormProvider {...form}>
      <MainContainer>
        <ArrowHeader headerTitle="공지사항" />
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

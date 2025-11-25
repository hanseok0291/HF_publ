"use client";

import { ExtractParam } from "@/types/HttpClient.type";
import { useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useShallow } from "zustand/react/shallow";
import { getCollectorFaqList } from "@/apis/collector/etc/faqApis";
import { noticeSearchFilter } from "@/app/constant/employee/CustomDrawerContent.data";
import Loading from "@/app/loading";
import BasicDrawer from "@/components/common/BasicDrawer";
import CustomDrawerContent from "@/components/common/CustomDrawerContent";
import CustomPagination from "@/components/common/CustomPagination";
import MainContainer from "@/components/common/MainContainer";
import SearchInput from "@/components/common/SearchInput";
import ArrowHeader from "@/components/header/ArrowHeader";
import useNoticeTap from "@/stores/useNoticeTap";
import CollectorFAQTabs from "./_components/CollectorFaqTabs";

export type FAQCollectorParam = ExtractParam<typeof getCollectorFaqList>;
export default function Page() {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(0); // 현재 페이지
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
  const { control, watch, setValue } = form;
  const { clickDetail, noticeId, setDataList } = useNoticeTap(
    useShallow((state) => ({
      clickDetail: state.clickDetail,
      noticeId: state.noticeId,
      setDataList: state.setDataList
    }))
  );

  const { swrResponse } = getCollectorFaqList(watch());
  const { totalPages = 0 } =
    getCollectorFaqList(watch())?.swrResponse?.data?.content ?? {};
  useEffect(() => {
    if (clickDetail) {
      router.push(`/collector/faq/detail/${noticeId}`);
    }
  }, [currentPage, clickDetail, noticeId]);

  return (
    <FormProvider {...form}>
      <MainContainer>
        <ArrowHeader headerTitle="FAQ" />
        {swrResponse.error && !swrResponse.isLoading && (
          <p className="text-center">
            데이터 가져오는 과정에 문제가 발생했습니다.
          </p>
        )}
        {!swrResponse.error && swrResponse.isLoading && <Loading />}
        {!swrResponse.error && !swrResponse.isLoading && <CollectorFAQTabs />}
        <div className="flex flex-col gap-[1rem] p-[1.5rem] w-full">
          <CustomPagination
            pageNumber={watch("page")}
            onClick={(page) => setValue("page", page)}
            totalPages={totalPages}
          />
          <div className="flex gap-[0.38rem] w-full">
            <Controller
              name="filterType"
              control={control}
              render={({ field: { onChange, value } }) => (
                <BasicDrawer
                  value={value}
                  onChange={onChange}
                  drawerTitle="조회 검색필터 선택"
                  title="검색전체"
                  selectedValue={filterType}
                  onSelect={setFilterType}
                  Content={CustomDrawerContent}
                  contentProps={{
                    data: noticeSearchFilter
                  }}
                  className="min-w-[84px]"
                />
              )}
            />
            <Controller
              name="keyWord"
              control={control}
              render={({ field: { onChange, value } }) => (
                <SearchInput
                  initialValue={value ? decodeURIComponent(value) : ""}
                  className="h-[48px] border-gray40 rounded"
                  placeholder="검색어를 입력해주세요"
                  useInstantSearch={false}
                  setKeyword={(newValue) => {
                    const processedValue = newValue
                      ? decodeURIComponent(newValue)
                      : "";
                    setSearch(processedValue);
                    onChange(processedValue);
                  }}
                />
              )}
            />
          </div>
        </div>
      </MainContainer>
    </FormProvider>
  );
}

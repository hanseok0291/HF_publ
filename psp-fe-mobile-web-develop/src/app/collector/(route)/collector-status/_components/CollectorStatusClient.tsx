"use client";

import { WasteCollectorListType } from "@/types/apiType/collector/collector-status/WasteCollectorList.type";
import { ExtractParam } from "@/types/HttpClient.type";
import { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useInView } from "react-intersection-observer";
import { useRouter, useSearchParams } from "next/navigation";
import { getWasteCollectionList } from "@/apis/collector/collector-status/collectorStatusApis";
import { statusListData } from "@/app/constant/collector/collector-status/CollectorStatus.data";
import Loading from "@/app/loading";
import BasicDrawerGroup from "@/components/collector/collector-status/BasicDrawerGroup";
import CollectorStatusListContainer from "@/components/collector/collector-status/CollectorStatusListContainer";
import HorizontalCalendar from "@/components/collector/collector-status/HorizontalCalendar";
import MainContainer from "@/components/common/MainContainer";
import ArrowHeader from "@/components/header/ArrowHeader";
import { formatDateWithTime } from "@/utils/formatUtils";

export type WasteCollectionListParam = ExtractParam<
  typeof getWasteCollectionList
>;

// 필터 값 타입 정의
type FilterValues = {
  detailStandardIds: string[] | null;
  standardIds: string[] | null;
  disposeStatusCode: string | null;
  legalEmdNm: string | null;
};

export function CollectorStatusClient() {
  const [list] = useState(statusListData);
  const [clickList, setClickList] = useState(list.slice(1).map(() => false));
  const [currentPage, setCurrentPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const router = useRouter();
  // infinite scroll state
  const [loading, setLoading] = useState(true);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [ref, inView] = useInView({ delay: 200, trackVisibility: true });
  const [prevData, setPrevData] = useState<WasteCollectorListType[]>([]);

  // 이전 필터 값을 저장하기 위한 ref
  const prevFiltersRef = useRef<FilterValues>({
    detailStandardIds: null,
    standardIds: null,
    disposeStatusCode: null,
    legalEmdNm: null
  });

  // 초기 마운트 여부 체크
  const isInitialMount = useRef(true);
  const params = useSearchParams();
  // url query parameter value
  const requestId = params.get("requestId");
  const thisDisposeDate = params.get("thisDisposeDate") ?? "";
  const [selectedDate, setSelectedDate] = useState(
    thisDisposeDate === "" ? new Date() : new Date(thisDisposeDate)
  );
  const postSelectedDate = formatDateWithTime(selectedDate.toString());

  const form = useForm<WasteCollectionListParam>({
    mode: "onChange",
    defaultValues: {
      detailStandardIds: null,
      standardIds: null,
      disposeStatusCode: null,
      legalEmdNm: null,
      keyWord: null,
      thisDisposeDate: postSelectedDate,
      page: currentPage,
      size: 10,
      sort: []
    }
  });

  const { watch, setValue } = form;
  const formValues = watch();

  // watch value
  const detailStandardIdsValue = watch("detailStandardIds");
  const standardIdsValue = watch("standardIds");
  const disposeStatusCodeValue = watch("disposeStatusCode");
  const legalEmdNmValue = watch("legalEmdNm");
  const page = watch("page");
  const requestValues = {
    ...formValues,
    requestId: requestId,
    thisDisposeDate: postSelectedDate
  };
  const { swrResponse } = getWasteCollectionList(requestValues);
  const { totalPages = 0 } = swrResponse?.data?.content || {};

  // selectedDate가 변경될 때 폼 값 업데이트
  useEffect(() => {
    setValue("thisDisposeDate", postSelectedDate);
  }, [selectedDate, setValue, postSelectedDate]);

  // 배열 깊은 비교 함수
  const arraysEqual = (a: any[] | null, b: any[] | null): boolean => {
    if (a === b) return true;
    if (a === null || b === null) return a === b;
    if (a.length !== b.length) return false;

    // 배열의 모든 요소를 정렬하고 비교
    const sortedA = [...a].sort();
    const sortedB = [...b].sort();

    for (let i = 0; i < sortedA.length; i++) {
      if (sortedA[i] !== sortedB[i]) return false;
    }

    return true;
  };

  // 필터 값이 변경되었는지 확인
  const isFilterChanged = (): boolean => {
    const currentFilters: FilterValues = {
      detailStandardIds: detailStandardIdsValue,
      standardIds: standardIdsValue,
      disposeStatusCode: disposeStatusCodeValue,
      legalEmdNm: legalEmdNmValue
    };

    const prevFilters = prevFiltersRef.current;

    // 각 필드별로 정확한 비교 수행
    const detailStandardIdsChanged = !arraysEqual(
      currentFilters.detailStandardIds,
      prevFilters.detailStandardIds
    );

    const standardIdsChanged = !arraysEqual(
      currentFilters.standardIds,
      prevFilters.standardIds
    );

    const disposeStatusCodeChanged =
      currentFilters.disposeStatusCode !== prevFilters.disposeStatusCode;

    const legalEmdNmChanged =
      currentFilters.legalEmdNm !== prevFilters.legalEmdNm;

    const changed =
      detailStandardIdsChanged ||
      standardIdsChanged ||
      disposeStatusCodeChanged ||
      legalEmdNmChanged;

    // 변경점이 있으면 현재 필터 값 저장
    if (changed) {
      prevFiltersRef.current = {
        detailStandardIds: currentFilters.detailStandardIds
          ? [...currentFilters.detailStandardIds]
          : null,
        standardIds: currentFilters.standardIds
          ? [...currentFilters.standardIds]
          : null,
        disposeStatusCode: currentFilters.disposeStatusCode,
        legalEmdNm: currentFilters.legalEmdNm
      };
    }

    return changed;
  };

  // 필터 값이 변경될 때만 데이터 초기화 및 새로고침
  useEffect(() => {
    // 컴포넌트 마운트 시 초기 실행은 건너뜀
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // 필터 값이 변경되었는지 확인
    if (isFilterChanged()) {
      // 데이터 초기화 및 새로고침 시작
      setIsRefreshing(true);
      setPrevData([]);
      setCurrentPage(1);
      setHasNextPage(true);
    }
  }, [
    detailStandardIdsValue,
    standardIdsValue,
    disposeStatusCodeValue,
    legalEmdNmValue
  ]);

  // currentPage가 변경될 때 폼 값 업데이트
  useEffect(() => {
    if (isRefreshing) return;
    if (currentPage !== page) {
      setValue("page", currentPage);
    }
  }, [currentPage, setValue, page]);

  // SWR 응답이 변경될 때 데이터 업데이트
  useEffect(() => {
    if (swrResponse?.data?.content?.content) {
      const newData = swrResponse.data.content.content;

      if (page === 1) {
        // 페이지가 1일 때는 데이터를 대체
        setPrevData(newData);
      } else {
        // 페이지가 1보다 클 때는 데이터를 추가
        setPrevData((prev) => [...prev, ...newData]);
      }

      setHasNextPage(page < totalPages);
      setLoading(false);
      // 리프레시 완료
      if (isRefreshing) {
        setIsRefreshing(false);
      }
    }
  }, [swrResponse?.data]);

  // 무한 스크롤
  useEffect(() => {
    if (inView && !loading && hasNextPage && !isRefreshing) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [inView, loading, hasNextPage, isRefreshing]);

  // 데이터 로딩 중 상태 확인
  const isLoading = !swrResponse?.data && !swrResponse?.error;

  const handleSelect = (index: number) => {
    if (params.get("filter")) {
      console.log(params.get("filter"));
    }
    const newVisible = [...clickList];
    newVisible[index] = !newVisible[index];
    console.log(newVisible);
    setClickList(newVisible);
  };

  return (
    <FormProvider {...form}>
      <MainContainer>
        <ArrowHeader headerTitle="수거처리현황" />
        <div className="px-5 py-3">
          <HorizontalCalendar
            selected={selectedDate}
            onSelect={setSelectedDate}
          />
          <BasicDrawerGroup />
        </div>
        {swrResponse.error && (
          <p>데이터를 가져오는 과정에 문제가 생겼습니다.</p>
        )}
        {isLoading || isRefreshing ? (
          <div className="flex justify-center items-center h-40">
            <Loading />
          </div>
        ) : prevData && prevData.length > 0 ? (
          <div className="px-5 pt-5 pb-24 bg-gray10">
            {prevData.map((list, index) => (
              <div key={`${index}`} className="mb-3">
                <CollectorStatusListContainer
                  onClick={() => handleSelect(index)}
                  selectList={clickList[index]}
                  data={list}
                  requestId={list.requestId}
                  isFocus={list.focusYn === true}
                />
              </div>
            ))}
            {hasNextPage && !loading && <div ref={ref} className="h-10" />}
            {!hasNextPage && !loading && (
              <p className="text-center">
                더 이상의 데이터가 존재하지 않습니다.
              </p>
            )}
          </div>
        ) : (
          <div className="flex justify-center items-center h-40">
            <p>조회된 데이터가 없습니다.</p>
          </div>
        )}
      </MainContainer>
    </FormProvider>
  );
}

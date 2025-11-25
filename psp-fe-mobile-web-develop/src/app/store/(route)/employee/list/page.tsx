"use client";

import { ExtractParam } from "@/types/HttpClient.type";
import { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useInView } from "react-intersection-observer";
import { useRouter } from "next/navigation";
import { getEmployeeList } from "@/apis/employee/employeeApis";
import Loading from "@/app/loading";
import Button from "@/components/common/Button";
import MainContainer from "@/components/common/MainContainer";
import ArrowAndMenuHeader from "@/components/header/ArrowAndMenuHeader";
import DrawerGroup from "@/components/store/employee/list/DrawerGroup";
import EmployeeItem, {
  EmployeeItemType
} from "@/components/store/employee/list/EmployeeItem";

export type EmployeeListParam = ExtractParam<typeof getEmployeeList>;
// 필터 값 타입 정의
type FilterValues = {
  useYn: boolean | null;
  searchFilter: string | null;
  keyWord: string | null;
  authorityGroupName: string | null;
};

// NOTE : 검색어 enter시 페이지 새로 고침 되는 부분 확인 필요
export default function Page() {
  const router = useRouter();
  // const [tempPassWord, setTempPassWord] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  // infinite scroll
  const [loading, setLoading] = useState(true);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [ref, inView] = useInView({ delay: 200, trackVisibility: true });
  const [prevData, setPrevData] = useState<EmployeeItemType[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  // 이전 필터 값을 저장하기 위한 ref
  const prevFiltersRef = useRef<FilterValues>({
    useYn: null,
    searchFilter: null,
    keyWord: null,
    authorityGroupName: null
  });

  // 초기 마운트 여부 체크
  const isInitialMount = useRef(true);

  const form = useForm<EmployeeListParam>({
    mode: "onChange",
    defaultValues: {
      useYn: null,
      searchFilter: "ALL",
      page: currentPage,
      size: 10,
      sort: []
    }
  });
  const { watch, setValue } = form;
  const useYnValue = watch("useYn");
  const searchFilterValue = watch("searchFilter");
  const keywordValoue = watch("keyWord");
  const athorityGroupNameValue = watch("authorityGroupName");
  const page = watch("page");

  const { data, mutate, error } = getEmployeeList(watch()).swrResponse;
  const { totalPages = 0 } = data?.content || {};

  // 필터 값이 변경되었는지 확인
  const isFilterChanged = (): boolean => {
    const currentFilters: FilterValues = {
      useYn: useYnValue,
      searchFilter: searchFilterValue,
      keyWord: keywordValoue,
      authorityGroupName: athorityGroupNameValue
    };

    const prevFilters = prevFiltersRef.current;

    const useYnChanged = currentFilters.useYn !== prevFilters.useYn;

    const searchFilterChanged =
      currentFilters.searchFilter !== prevFilters.searchFilter;

    const keyWordChanged = currentFilters.keyWord !== prevFilters.keyWord;

    const authorityGroupNameChanged =
      currentFilters.authorityGroupName !== prevFilters.authorityGroupName;

    const changed =
      useYnChanged ||
      searchFilterChanged ||
      keyWordChanged ||
      authorityGroupNameChanged;

    // 변경점이 있으면 현재 필터 값 저장
    if (changed) {
      prevFiltersRef.current = {
        useYn: currentFilters.useYn,
        searchFilter: currentFilters.searchFilter,
        keyWord: currentFilters.keyWord,
        authorityGroupName: currentFilters.authorityGroupName
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

      // 필터 값 설정
      setValue("useYn", useYnValue);
      setValue("searchFilter", searchFilterValue);
      setValue("keyWord", keywordValoue);
      setValue("authorityGroupName", athorityGroupNameValue);

      // 데이터 다시 가져오기
      mutate().then(() => {
        setIsRefreshing(false);
      });
    }
  }, [
    useYnValue,
    searchFilterValue,
    keywordValoue,
    athorityGroupNameValue,
    setValue,
    mutate
  ]);

  // currentPage가 변경될 때 폼 값 업데이트
  useEffect(() => {
    if (currentPage !== page) {
      setValue("page", currentPage);
    }
  }, [currentPage, setValue, page]);

  // SWR 응답이 변경될 때 데이터 업데이트
  useEffect(() => {
    if (data?.content?.content) {
      const newData = data.content.content;

      if (page === 1) {
        // 페이지가 1일 때는 데이터를 대체
        setPrevData(newData);
      } else {
        // 페이지가 0보다 클 때는 데이터를 추가
        setPrevData((prev) => [...prev, ...newData]);
      }

      setHasNextPage(page < totalPages);
      setLoading(false);
    }
  }, [data]);

  // 무한 스크롤
  useEffect(() => {
    if (inView && !loading && hasNextPage && !isRefreshing) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [inView, loading, hasNextPage, isRefreshing]);

  const handleClick = () => {
    router.push("/store/employee/list/add");
  };

  // 데이터 로딩 중 상태 확인
  const isLoading = !data && !error;

  return (
    <FormProvider {...form}>
      <MainContainer>
        <ArrowAndMenuHeader headerTitle="직원 리스트" />
        <section className="px-[16px]">
          <section className="pt-[8px] pb-[16px] flex flex-col gap-[10px]">
            <Button
              className="self-end text-[13px] w-[96px] h-[40px] p-[12px_24px]"
              onClick={() => handleClick()}
            >
              등록
            </Button>
            <DrawerGroup />
          </section>
          {error && <p>데이터를 가져오는 과정에 문제가 생겼습니다.</p>}
          {isLoading || isRefreshing ? (
            <div className="flex justify-center items-center h-40">
              <Loading />
            </div>
          ) : prevData && prevData.length > 0 ? (
            <div className="pt-5 pb-24 bg-gray10">
              {prevData.map((list, index) => (
                <div key={`${index}`} className="mb-3">
                  <EmployeeItem item={list} />
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
        </section>
      </MainContainer>
    </FormProvider>
  );
}

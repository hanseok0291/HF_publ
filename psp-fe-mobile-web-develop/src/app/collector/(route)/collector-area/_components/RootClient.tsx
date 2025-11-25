"use client";

import { ExtractParam } from "@/types/HttpClient.type";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { useShallow } from "zustand/react/shallow";
import {
  getInstitutionArea,
  InstitutionArea
} from "@/apis/collector/area/areaApi";
import SearchAddressResult from "@/components/collector/search/SearchAddressResult";
import SearchInfoText from "@/components/collector/search/SearchInfoText";
import AreaDrawer from "@/components/common/AreaDrawer";
import CustomPagination from "@/components/common/CustomPagination";
import MainContainer from "@/components/common/MainContainer";
import SearchInput from "@/components/common/SearchInput";
import ArrowBackButton from "@/components/header/ArrowBackButton";
import useResultAddress from "@/stores/useResultAddress";
import AreaDetailPage from "../detail/[id]/_components/AreaDetail";

type AreaKeyWordParam = ExtractParam<typeof getInstitutionArea>;
export default function RootClient() {
  const [drawerOpen, setDrawerOpen] = useState(false); // 드로어 상태 관리
  const [keyword, setKeyword] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<InstitutionArea>(); // 선택된 아이템 상태 추가
  const [isDetail, setIsDetail] = useState<boolean>(false);
  const [searchClick, setSearchClick] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchClickQuery = searchParams.get("searchClick") === "true"; // 'true' 문자열을 불린 값으로 변환
  const { setResultAddress } = useResultAddress(
    useShallow((state) => ({
      setResultAddress: state.setResultAddress
    }))
  );
  const form = useForm<AreaKeyWordParam>({
    defaultValues: {
      keyWord: "",
      page: currentPage,
      size: 10,
      sort: []
    }
  });

  const { watch, control, setValue } = form;
  const { swrResponse } = getInstitutionArea(watch());
  const { totalPages = 0 } =
    getInstitutionArea(watch())?.swrResponse?.data?.content ?? {};

  useEffect(() => {
    if (!isDetail) {
      swrResponse.mutate();
      setDrawerOpen(false);
    }
  }, [isDetail, swrResponse.mutate]);

  useEffect(() => {
    if (searchClickQuery) {
      setSearchClick(true);
    }
  }, []);

  if (swrResponse.error || !swrResponse.data) {
    return null;
  }

  const handleInput = (query: string, onChange: (value: string) => void) => {
    const processedValue = query ? decodeURIComponent(query) : "";
    searchQuery(processedValue);
    onChange(processedValue);
  };

  const handleMove = () => {
    if (keyword === "") {
      setSearchClick(true);
    }
  };

  const handleBack = () => {
    const hasKeyword = keyWordValue !== "";

    // 1. 검색 모드이고 검색어가 있는 경우: 검색어 초기화 및 검색 모드 유지
    if (searchClick && hasKeyword) {
      console.log("1");
      form.setValue("keyWord", "");
      setKeyword("");
      router.back();
      return;
    }

    // 2. 검색 모드이고 검색어가 없는 경우: 검색 모드 종료
    if (searchClick && !hasKeyword) {
      setSearchClick(false);
      router.back();
      return;
    }

    // 3. 검색 모드가 아니고 검색어가 있는 경우: 검색어 초기화
    if (!searchClick && hasKeyword) {
      form.setValue("keyWord", "");
      setKeyword("");
      return;
    }

    // 4. 검색 모드가 아니고 검색어도 없는 경우: 이전 페이지로 이동
    router.back();
  };

  const handleCityClick = () => {
    if (selectedItem && selectedItem.legalEmdNm) {
      console.log(selectedItem);
      const sdNmValue = selectedItem.sdNm;
      const sggNmValue = selectedItem.sggNm;
      const legalEmdNmValue = selectedItem.legalEmdNm;
      const roadNmValue = selectedItem.roadNm;
      const lotNumber = `${selectedItem.legalEmdNm} ${selectedItem.jibunMainNo}-${selectedItem.jibunSubNo}`;
      const resultValue = `${sdNmValue} ${sggNmValue} ${legalEmdNmValue} ${roadNmValue}`;
      // 주소 정보를 스토어에 저장
      setResultAddress(resultValue);
      localStorage.setItem("roadAddr", resultValue);
      // 키워드를 URL 파라미터로 전달하며 페이지 이동
      router.push(
        `/collector?legalEmdNm=${legalEmdNmValue}&keyWord=${resultValue}&lotNumber=${lotNumber}`
      );
    }
  };

  const searchQuery = (query: string) => {
    const keywordValue = decodeURIComponent(query);
    setKeyword(keywordValue);
    setSearchClick(false);
  };

  const keyWordValue = watch("keyWord");
  const isSearchResultVisible =
    keyWordValue !== "" &&
    !searchClick &&
    swrResponse.data.content.content.length > 0;

  return (
    <MainContainer>
      {swrResponse.error && !swrResponse.isLoading && (
        <p>불러온 데이터가 존재하지 않습니다</p>
      )}
      {!isDetail ? (
        <>
          <div className="w-full px-[20px]">
            {keyWordValue === "" ||
              (!searchClick && (
                <h4 className="font-bold text-center pt-[20px]">
                  관할지역 리스트
                </h4>
              ))}
            <section className="flex items-center gap-[12px] py-[8px]">
              <ArrowBackButton onBack={handleBack} />
              <Controller
                name="keyWord"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <SearchInput
                    initialValue={value ? decodeURIComponent(value) : ""}
                    placeholder="도로명 주소를 입력해주세요"
                    onClick={handleMove}
                    setKeyword={(newValue) => {
                      handleInput(newValue, onChange);
                    }}
                  />
                )}
              />
            </section>
          </div>

          {swrResponse.data.content.content.length === 0 ? (
            <div className="flex justify-center p-10">
              조회된 지역이 없습니다.
            </div>
          ) : searchClick || keyWordValue === "" ? (
            <section className="px-7">
              <SearchInfoText />
            </section>
          ) : (
            swrResponse.data.content.content.map((item, index) => (
              <section key={index}>
                <SearchAddressResult
                  item={item}
                  onClick={() => {
                    setSelectedItem(item); // 선택한 아이템 저장
                    setDrawerOpen(true);
                  }}
                />
              </section>
            ))
          )}

          <AreaDrawer
            isOpen={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            valueOnClick1={handleCityClick}
            valueOnClick2={() => setIsDetail(true)}
          />
          {isSearchResultVisible && (
            <CustomPagination
              pageNumber={watch("page")}
              onClick={(page) => setValue("page", page)}
              totalPages={totalPages}
            />
          )}
        </>
      ) : (
        <AreaDetailPage
          selectedItem={selectedItem}
          setIsDetail={() => setIsDetail(false)}
          memoValue={selectedItem?.memo}
        />
      )}
    </MainContainer>
  );
}

"use client";

import { ApiError, ExtractParam } from "@/types/HttpClient.type";
import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { getCookie } from "cookies-next/client";
import { getWasteCollectionRequestMapInfo } from "@/apis/collector/area/areaApi";
import Loading from "@/app/loading";
import MapView from "@/components/common/MapView";
import SearchInput from "@/components/common/SearchInput";
import LogoHeader from "@/components/header/LogoHeader";
import { toast } from "@/hooks/use-toast";
import useNaverMaps from "@/hooks/useNaverMaps";
import { isiOS } from "@/utils/WebViewHandler";

// Naver 전역 객체 타입 선언
declare global {
  interface Window {
    naver: any;
  }
}

export type ModalMapParam = ExtractParam<
  typeof getWasteCollectionRequestMapInfo
>;

// 필터 타입 정의
export type FilterType =
  | "ready"
  | "completed"
  | "cancelRequest"
  | "refused"
  | "refunded"
  | "ready48h"
  | "ready24h"
  | "ready12h";

// 핀 색상과 필터 타입 매핑
const PIN_FILTER_MAPPING = {
  green: "ready",
  blue: "completed",
  purple: "refused",
  black: "refunded",
  yellow: "ready12h",
  orange: "ready24h",
  red: "ready48h",
  gray: "cancelRequest"
} as const;

// 필터 타입과 핀 색상 매핑 (역방향)
const FILTER_TO_PIN_COLOR: Record<FilterType, keyof typeof PIN_FILTER_MAPPING> =
  {
    ready: "green",
    completed: "blue",
    refused: "purple",
    refunded: "black",
    ready12h: "yellow",
    ready24h: "orange",
    ready48h: "red",
    cancelRequest: "gray"
  };

// 좌표 변환 유틸리티 함수
const convertToCoords = (data: any[] = []) => {
  return data.map(
    ({ disposeLatitude, disposeLongitude, requestId, thisDisposeDate }) => ({
      lat: disposeLatitude,
      lng: disposeLongitude,
      requestId,
      thisDisposeDate
    })
  );
};

export default function RootClient() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const legalEmdNmUrl = searchParams.get("legalEmdNm");
  const roadNmUrl = searchParams.get("keyWord");
  const filterParam = searchParams.get("filter");
  const lotNumber = searchParams.get("lotNumber");
  const [searchKeyword, setSearchKeyword] = useState(legalEmdNmUrl);
  const [roadName, setRoadName] = useState(roadNmUrl);
  const [searchCoords, setSearchCoords] = useState<{
    lat: number;
    lng: number;
    requestId: string;
    thisDisposeDate: string;
  } | null>(null);
  const { naverMaps, isLoading } = useNaverMaps();

  // 필터 상태 관리 (단일 문자열)
  const [activeFilter, setActiveFilter] = useState<FilterType | "">(
    (filterParam as FilterType) || ""
  );

  // 지도 상태 관리
  const [shouldRenderMap, setShouldRenderMap] = useState(false);

  // API 호출 파라미터 생성 함수 - 필터는 제외하고 기본 검색 파라미터만 포함
  const getApiParams = useCallback(() => {
    return {
      legalEmdNm: legalEmdNmUrl ?? "",
      keyWord: roadNmUrl ?? ""
    };
  }, [legalEmdNmUrl, roadNmUrl]);

  // API 호출 및 데이터 가져오기 - 필터와 관계없이 모든 데이터를 가져옴
  const { swrResponse } = getWasteCollectionRequestMapInfo(getApiParams());

  // 필터 변경 핸들러 - API 호출 없이 클라이언트 측에서 필터링
  const handleFilterChange = (newFilter: FilterType | "") => {
    setActiveFilter(newFilter);

    // URL에 필터 파라미터 추가
    const currentUrl = new URL(window.location.href);
    if (newFilter) {
      currentUrl.searchParams.set("filter", newFilter);
    } else {
      currentUrl.searchParams.delete("filter");
    }

    // Next.js router를 사용하여 URL 업데이트 (히스토리 추가 없이)
    router.replace(currentUrl.pathname + currentUrl.search);

    // 지도 다시 렌더링
    triggerMapRender();
  };

  // 지도 렌더링 트리거 함수
  const triggerMapRender = useCallback(() => {
    setShouldRenderMap(false);
    setTimeout(() => setShouldRenderMap(true), 0);
  }, []);

  useEffect(() => {
    // 페이지가 로드될 때마다 실행되는 로직
    if (!legalEmdNmUrl && !roadNmUrl) {
      localStorage.removeItem("roadAddr");
    }
    // 초기 렌더링 설정
    setShouldRenderMap(true);
  }, [legalEmdNmUrl, roadNmUrl]);

  // URL 파라미터에서 검색어 가져오기
  useEffect(() => {
    if (legalEmdNmUrl && roadNmUrl) {
      setSearchKeyword(decodeURIComponent(legalEmdNmUrl));
      setRoadName(decodeURIComponent(roadNmUrl));
    }

    // URL에서 필터 파라미터 가져오기
    const filterFromUrl = searchParams.get("filter") as FilterType | null;
    if (filterFromUrl) {
      setActiveFilter(filterFromUrl);
    }
  }, [searchParams]);

  // localStorage에서 저장된 도로명 주소를 가져와서 좌표로 변환
  useEffect(() => {
    const savedAddress = localStorage.getItem("roadAddr");
    const defaultAddress = getCookie("address")?.toString() ?? "";
    if (!isLoading && naverMaps && lotNumber) {
      try {
        naverMaps.addressSearch(lotNumber, (response) => {
          if (response.v2.addresses && response.v2.addresses.length > 0) {
            const address = response.v2.addresses[0];
            console.log("address : ", address);
            const lat = parseFloat(address.y);
            const lng = parseFloat(address.x);
            setSearchCoords({ lat, lng, requestId: "", thisDisposeDate: "" });

            // 검색 후 지도 렌더링 트리거
            triggerMapRender();
          }
        });
      } catch (error) {
        console.error("Naver Maps address search error:", error);
      }
      // my info address로 기본 주소 설정 (api data, 관할 지역 리스트 없을 시)
    } else if (
      !isLoading &&
      naverMaps &&
      !savedAddress &&
      !swrResponse.isLoading &&
      !swrResponse.data
    ) {
      try {
        naverMaps.addressSearch(defaultAddress, (response) => {
          if (response.v2.addresses && response.v2.addresses.length > 0) {
            const address = response.v2.addresses[0];
            console.log("address : ", address);
            const lat = parseFloat(address.y);
            const lng = parseFloat(address.x);
            setSearchCoords({ lat, lng, requestId: "", thisDisposeDate: "" });

            // 검색 후 지도 렌더링 트리거
            triggerMapRender();
          }
        });
      } catch (error) {
        toast({ title: "지도를 불러오는 과정에 오류가 발생했습니다." });
        console.error("Naver Maps address search error:", error);
      }
    }
  }, [
    isLoading,
    naverMaps,
    triggerMapRender,
    lotNumber,
    swrResponse.isLoading,
    swrResponse.data
  ]);

  // 네이버 맵 로딩 완료 후 지도 렌더링 트리거
  useEffect(() => {
    if (!isLoading && naverMaps) {
      triggerMapRender();
    }
  }, [isLoading, naverMaps, triggerMapRender]);

  const form = useForm<ModalMapParam>({
    mode: "onChange"
  });

  const { control, setValue } = form;

  // 검색어가 변경되면 form 값도 업데이트
  useEffect(() => {
    if (searchKeyword !== null && roadName !== null) {
      setValue("legalEmdNm", searchKeyword);
      setValue("keyWord", roadName);
    }
  }, [searchKeyword, setValue, roadName]);

  // 데이터 추출
  const {
    completed = [],
    ready = [],
    ready12h = [],
    ready24h = [],
    ready48h = [],
    refunded = [],
    refused = [],
    cancelRequest = []
  } = swrResponse?.data?.content ?? {};

  // 데이터 로드 완료 시 지도 렌더링 트리거
  useEffect(() => {
    try {
      if (swrResponse?.data?.content) {
        triggerMapRender();
      }
    } catch (error: any) {
      toast({
        title: "오류가 발생했습니다.",
        description: `${(error as ApiError).message}`
      });
    }
  }, [swrResponse?.data, triggerMapRender]);

  // 검색 버튼 클릭 핸들러 - 검색어를 URL 파라미터로 추가하여 리다이렉트
  const handleSearchClick = () => {
    const encodedKeyword = encodeURIComponent(searchKeyword ?? "");
    const url = new URL(window.location.origin + "/collector/collector-area");
    url.searchParams.set("searchClick", "true");
    url.searchParams.set("legalEmdNm", encodedKeyword);

    // 현재 활성화된 필터가 있으면 URL에 추가
    if (activeFilter) {
      url.searchParams.set("filter", activeFilter);
    }

    router.push(url.pathname + url.search);
  };

  // 윈도우 로드 이벤트에 대한 리스너 추가
  useEffect(() => {
    const handleLoad = () => {
      // 페이지 완전히 로드 시 지도 렌더링 트리거
      triggerMapRender();
    };

    window.addEventListener("load", handleLoad);

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, [triggerMapRender]);

  const getFilteredData = (dataType: FilterType, data: any[]) => {
    // 필터가 없거나 현재 데이터 타입 일치하면 데이터 반환
    if (!activeFilter || activeFilter === dataType) {
      return convertToCoords(data);
    }
    // 필터가 있고 현재 데이터 타입과 일치하지 않으면 빈 배열 반환
    return [];
  };

  return (
    <section
      className={
        "animate-fade-in bg-white h-[100svh] overflow-y-auto" +
        (isiOS()
          ? " overscroll-y-contain [-webkit-overflow-scrolling:touch]"
          : "")
      }
    >
      <div>
        <LogoHeader isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="px-[20px] pb-[12px]">
          <Controller
            name="keyWord"
            control={control}
            render={({ field: { onChange, value } }) => (
              <SearchInput
                initialValue={value ? decodeURIComponent(value) : ""}
                onClick={handleSearchClick}
                className="h-[48px] border-gray40 rounded"
                placeholder="검색어를 입력해주세요"
                useInstantSearch={false}
                setKeyword={(newValue) => {
                  const processedValue = newValue
                    ? decodeURIComponent(newValue)
                    : "";
                  setSearchKeyword(processedValue);
                  onChange(processedValue);
                }}
              />
            )}
          />
        </div>
      </div>

      <section>
        {swrResponse.isLoading && (
          <div className="flex justify-center items-center h-[50vh]">
            <p>데이터를 불러오는 중입니다...</p>
            <Loading />
          </div>
        )}
        {!isOpen && (
          <div id="map-container" className="w-full h-[calc(100vh-180px)]">
            {shouldRenderMap && (
              <MapView
                green={{
                  title: "배출/수거 대기",
                  coords: getFilteredData("ready", ready),
                  counts: ready.length
                }}
                blue={{
                  title: "수거 완료",
                  coords: getFilteredData("completed", completed),
                  counts: completed.length
                }}
                purple={{
                  title: "수거 불가",
                  coords: getFilteredData("refused", refused),
                  counts: refused.length
                }}
                black={{
                  title: "취소 환불",
                  coords: getFilteredData("refunded", refunded),
                  counts: refunded.length
                }}
                yellow={{
                  title: "12시간 미수거",
                  coords: getFilteredData("ready12h", ready12h),
                  counts: ready12h.length
                }}
                orange={{
                  title: "24시간 미수거",
                  coords: getFilteredData("ready24h", ready24h),
                  counts: ready24h.length
                }}
                red={{
                  title: "48시간 미수거",
                  coords: getFilteredData("ready48h", ready48h),
                  counts: ready48h.length
                }}
                gray={{
                  title: "취소 요청",
                  coords: getFilteredData("cancelRequest", cancelRequest),
                  counts: cancelRequest.length
                }}
                center={searchCoords || undefined}
                usePinDescription={true}
                filter={activeFilter}
                onFilterChange={handleFilterChange}
              />
            )}
          </div>
        )}
      </section>
    </section>
  );
}

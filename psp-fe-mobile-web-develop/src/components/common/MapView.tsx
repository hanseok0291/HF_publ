"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useNaverMaps from "@/hooks/useNaverMaps";
import { numWithComma } from "@/lib/formatUtils";

const GREEN_MARK_IMG = "/icons/collector/waste-waiting.svg";
const BLUE_MARK_IMG = "/icons/collector/waste-success.svg";
const PURPLE_MARK_IMG = "/icons/collector/waste-cancel.svg";
const BLACK_MARK_IMG = "/icons/collector/waste-not.svg";
const YELLOW_MARK_IMG = "/icons/collector/waste-12hour.svg";
const ORANGE_MARK_IMG = "/icons/collector/waste-24hour.svg";
const RED_MARK_IMG = "/icons/collector/waste-48hour.svg";
const GRAY_MARK_IMG = "/icons/collector/waste-cancel-request.svg";

// 필터 타입 매핑 정의
const PIN_FILTER_MAPPING = {
  green: "ready",
  blue: "completed",
  purple: "refused",
  black: "refunded",
  yellow: "ready12h",
  orange: "ready24h",
  red: "ready48h",
  gray: "cancelRequest"
};

type Coords = {
  lat: number;
  lng: number;
  requestId?: string;
  thisDisposeDate?: string;
};

type CoordsPin = {
  title?: string;
  coords: Coords[];
  counts?: number;
};

type FilterType =
  | "ready"
  | "completed"
  | "cancelRequest"
  | "refused"
  | "refunded"
  | "ready48h"
  | "ready24h"
  | "ready12h";

/** 지도화면 공통 컴포넌트 */
const MapView = ({
  green = { title: "", coords: [] },
  blue = { title: "", coords: [] },
  purple = { title: "", coords: [] },
  black = { title: "", coords: [] },
  yellow = { title: "", coords: [] },
  orange = { title: "", coords: [] },
  red = { title: "", coords: [] },
  gray = { title: "", coords: [] },
  center,
  usePinDescription = false,
  filter,
  onFilterChange
}: {
  // 컴포넌트 사용부 마다 관심사가 다르기 때문에 색상을 prop 이름으로 사용한다.
  green?: CoordsPin;
  blue?: CoordsPin;
  purple?: CoordsPin;
  black?: CoordsPin;
  yellow?: CoordsPin;
  orange?: CoordsPin;
  red?: CoordsPin;
  gray?: CoordsPin;
  /** 지도 중심 */
  center?: Coords;
  /** 지도 하단에 핀 표시 여부 */
  usePinDescription?: boolean;
  /** 필터 상태 (단일 문자열 또는 배열 지원) */
  filter?: FilterType | "";
  /** 필터 변경 핸들 */
  onFilterChange?: (newFilter: FilterType) => void;
}) => {
  const { naverMaps, isLoading } = useNaverMaps();
  const router = useRouter();

  // 현재 활성화된 필터 (단일 문자열)
  const [activeFilter, setActiveFilter] = useState<FilterType | "">("");

  // 필터 토글 함수
  const toggleFilter = (pinType: keyof typeof PIN_FILTER_MAPPING) => {
    const filterType = PIN_FILTER_MAPPING[pinType] as FilterType;

    // 현재 필터와 같으면 필터 해제, 다르면 새 필터 설정
    const newFilter = activeFilter === filterType ? "" : filterType;

    setActiveFilter(newFilter);
    if (onFilterChange) {
      onFilterChange(newFilter as FilterType);
    }
  };

  // 필터 활성화 여부 확인 함수
  const isFilterActive = (pinType: keyof typeof PIN_FILTER_MAPPING) => {
    const filterType = PIN_FILTER_MAPPING[pinType] as FilterType;
    return activeFilter === filterType;
  };

  // filter prop이 변경되면 내부 상태 업데이트
  useEffect(() => {
    if (filter) {
      // 배열인 경우 첫 번째 요소 사용, 문자열인 경우 그대로 사용
      const filterValue = Array.isArray(filter) ? filter[0] || "" : filter;
      setActiveFilter(filterValue);
    } else {
      setActiveFilter("");
    }
  }, [filter]);

  useEffect(() => {
    if (isLoading || !naverMaps) return;
    
    // 퍼블리싱 작업 중: naver.maps가 없으면 지도 영역만 표시
    if (typeof window === "undefined" || !window.naver?.maps) {
      console.warn("네이버 지도 API가 로드되지 않았습니다. (퍼블리싱 작업 중)");
      return;
    }

    /**
     * 중앙좌표
     * @description center props이 있다면 center 사용, 없다면 좌표 목록에서 첫번째 아이템을 중앙 좌표로 사용하고, 그마저도 없다면 서울시를 중앙 좌표로 사용한다. */
    const centerCoords =
      center?.lat && center?.lng
        ? center
        : ([
            ...red.coords,
            ...blue.coords,
            ...green.coords,
            ...purple.coords,
            ...black.coords,
            ...yellow.coords,
            ...orange.coords,
            ...gray.coords
          ][0] ?? {
            lat: 37.3595704,
            lng: 127.105399
          });

    const mapOptions = {
      center: new window.naver.maps.LatLng(centerCoords.lat, centerCoords.lng),
      zoom: 15
    };

    const map = new naverMaps.Map("map", mapOptions);

    //NOTE : center 값이 있을 때만 기본 마커 생성하는 로직 추가
    if (center?.lat && center?.lng) {
      new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(centerCoords.lat, centerCoords.lng),
        map: map
      });
    }

    const pinGroups = [
      { data: green, icon: GREEN_MARK_IMG },
      { data: blue, icon: BLUE_MARK_IMG },
      { data: purple, icon: PURPLE_MARK_IMG },
      { data: black, icon: BLACK_MARK_IMG },
      { data: yellow, icon: YELLOW_MARK_IMG },
      { data: orange, icon: ORANGE_MARK_IMG },
      { data: red, icon: RED_MARK_IMG },
      { data: gray, icon: GRAY_MARK_IMG }
    ];

    pinGroups.forEach(({ data, icon }) => {
      data.coords.forEach((coord) => {
        const marker = new naverMaps.Marker({
          position: new naverMaps.LatLng(coord.lat, coord.lng),
          map,
          title: data.title,
          icon: {
            url: icon,
            size: new window.naver.maps.Size(50, 50),
            scaledSize: new window.naver.maps.Size(50, 50),
            origin: new window.naver.maps.Point(0, 0),
            anchor: new window.naver.maps.Point(12, 37)
          }
        });
        window.naver.maps.Event.addListener(marker, "click", function () {
          sessionStorage.setItem("prevPath", window.location.pathname);
          router.push(
            `/collector/collector-status?requestId=${coord.requestId}&thisDisposeDate=${coord.thisDisposeDate}`
          );
          // router.push(`/collector/collector-status/detail/${coord.requestId}`);
        });
      });
    });

    // /** green prop을 지도에 Pin으로 표시 */
    // green.coords.forEach((coord) => {
    //   const marker = new naverMaps.Marker({
    //     position: new naverMaps.LatLng(coord.lat, coord.lng),
    //     map,
    //     title: green.title,
    //     icon: {
    //       url: GREEN_MARK_IMG,
    //       size: new naver.maps.Size(50, 50),
    //       scaledSize: new naver.maps.Size(50, 50),
    //       origin: new naver.maps.Point(0, 0),
    //       anchor: new naver.maps.Point(12, 37)
    //     },
    //   });
    //
    //   naver.maps.Event.addListener(marker, 'click', function () {
    //     sessionStorage.setItem("prevPath", window.location.pathname);
    //     router.push(`/collector/collector-status/detail/${coord.requestId}`);
    //   });
    // });
    //
    // /** blue prop을 지도에 Pin으로 표시 */
    // blue.coords.forEach((coord) => {
    //   const marker = new naverMaps.Marker({
    //     position: new naverMaps.LatLng(coord.lat, coord.lng),
    //     map,
    //     title: blue.title,
    //     icon: {
    //       url: BLUE_MARK_IMG,
    //       size: new naver.maps.Size(50, 50),
    //       scaledSize: new naver.maps.Size(50, 50),
    //       origin: new naver.maps.Point(0, 0),
    //       anchor: new naver.maps.Point(12, 37)
    //     }
    //   });
    //
    //   naver.maps.Event.addListener(marker, 'click', function () {
    //     sessionStorage.setItem("prevPath", window.location.pathname);
    //     router.push(`/collector/collector-status/detail/${coord.requestId}`);
    //   });
    // });
    //
    // /** purple prop을 지도에 Pin으로 표시 */
    // purple.coords.forEach((coord) => {
    //   const marker = new naverMaps.Marker({
    //     position: new naverMaps.LatLng(coord.lat, coord.lng),
    //     map,
    //     title: purple.title,
    //     icon: {
    //       url: PURPLE_MARK_IMG,
    //       size: new naver.maps.Size(50, 50),
    //       scaledSize: new naver.maps.Size(50, 50),
    //       origin: new naver.maps.Point(0, 0),
    //       anchor: new naver.maps.Point(12, 37)
    //     }
    //   });
    //
    //   naver.maps.Event.addListener(marker, 'click', function () {
    //     sessionStorage.setItem("prevPath", window.location.pathname);
    //     router.push(`/collector/collector-status/detail/${coord.requestId}`);
    //   });
    // });
    //
    // /** black prop을 지도에 Pin으로 표시 */
    // black.coords.forEach((coord) => {
    //   const marker = new naverMaps.Marker({
    //     position: new naverMaps.LatLng(coord.lat, coord.lng),
    //     map,
    //     title: black.title,
    //     icon: {
    //       url: BLACK_MARK_IMG,
    //       size: new naver.maps.Size(50, 50),
    //       scaledSize: new naver.maps.Size(50, 50),
    //       origin: new naver.maps.Point(0, 0),
    //       anchor: new naver.maps.Point(12, 37)
    //     }
    //   });
    //
    //   naver.maps.Event.addListener(marker, 'click', function () {
    //     sessionStorage.setItem("prevPath", window.location.pathname);
    //     router.push(`/collector/collector-status/detail/${coord.requestId}`);
    //   });
    // });
    //
    // /** yellow prop을 지도에 Pin으로 표시 */
    // yellow.coords.forEach((coord) => {
    //   const marker = new naverMaps.Marker({
    //     position: new naverMaps.LatLng(coord.lat, coord.lng),
    //     map,
    //     title: yellow.title,
    //     icon: {
    //       url: YELLOW_MARK_IMG,
    //       size: new naver.maps.Size(50, 50),
    //       scaledSize: new naver.maps.Size(50, 50),
    //       origin: new naver.maps.Point(0, 0),
    //       anchor: new naver.maps.Point(12, 37)
    //     }
    //   });
    //
    //   naver.maps.Event.addListener(marker, 'click', function () {
    //     sessionStorage.setItem("prevPath", window.location.pathname);
    //     router.push(`/collector/collector-status/detail/${coord.requestId}`);
    //   });
    // });
    //
    // /** orange prop을 지도에 Pin으로 표시 */
    // orange.coords.forEach((coord) => {
    //   const marker = new naverMaps.Marker({
    //     position: new naverMaps.LatLng(coord.lat, coord.lng),
    //     map,
    //     title: orange.title,
    //     icon: {
    //       url: ORANGE_MARK_IMG,
    //       size: new naver.maps.Size(50, 50),
    //       scaledSize: new naver.maps.Size(50, 50),
    //       origin: new naver.maps.Point(0, 0),
    //       anchor: new naver.maps.Point(12, 37)
    //     }
    //   });
    //
    //   naver.maps.Event.addListener(marker, 'click', function () {
    //     sessionStorage.setItem("prevPath", window.location.pathname);
    //     router.push(`/collector/collector-status/detail/${coord.requestId}`);
    //   });
    // });
    //
    // /** red prop을 지도에 Pin으로 표시 */
    // red.coords.forEach((coord) => {
    //   const marker = new naverMaps.Marker({
    //     position: new naverMaps.LatLng(coord.lat, coord.lng),
    //     map,
    //     title: red.title,
    //     icon: {
    //       url: RED_MARK_IMG,
    //       size: new naver.maps.Size(50, 50),
    //       scaledSize: new naver.maps.Size(50, 50),
    //       origin: new naver.maps.Point(0, 0),
    //       anchor: new naver.maps.Point(12, 37)
    //     }
    //   });
    //
    //   naver.maps.Event.addListener(marker, 'click', function () {
    //     sessionStorage.setItem("prevPath", window.location.pathname);
    //     router.push(`/collector/collector-status/detail/${coord.requestId}`);
    //   });
    // });
    //
    // /** gray prop을 지도에 Pin으로 표시 */
    // gray.coords.forEach((coord) => {
    //   const marker = new naverMaps.Marker({
    //     position: new naverMaps.LatLng(coord.lat, coord.lng),
    //     map,
    //     title: gray.title,
    //     icon: {
    //       url: GRAY_MARK_IMG,
    //       size: new naver.maps.Size(50, 50),
    //       scaledSize: new naver.maps.Size(50, 50),
    //       origin: new naver.maps.Point(0, 0),
    //       anchor: new naver.maps.Point(12, 37)
    //     }
    //   });
    //
    //   naver.maps.Event.addListener(marker, 'click', function () {
    //     sessionStorage.setItem("prevPath", window.location.pathname);
    //     router.push(`/collector/collector-status/detail/${coord.requestId}`);
    //   });
    // });
  }, [
    isLoading,
    naverMaps,
    center,
    green,
    blue,
    purple,
    black,
    yellow,
    orange,
    red,
    gray
  ]);

  return (
    <div className="max-h-[600px]">
      <div className="flex flex-col gap-5">
        <div id="map" className="w-full h-[400px]"></div>
        {usePinDescription ? (
          <div className="grid grid-cols-1 text-sm gap-[10px] pl-[20px] pb-[40px]">
            {!!green.title ? (
              <div
                className={`flex items-center gap-1 cursor-pointer ${isFilterActive("green") ? "font-bold" : ""}`}
                onClick={() => toggleFilter("green")}
              >
                <Image
                  src={GREEN_MARK_IMG}
                  width={18}
                  height={18}
                  alt="map pin"
                />
                <span>{`${green.title}\u00A0${numWithComma(green.counts || green.coords.length)}건`}</span>
              </div>
            ) : null}
            {!!blue.title ? (
              <div
                className={`flex items-center gap-1 cursor-pointer ${isFilterActive("blue") ? "font-bold" : ""}`}
                onClick={() => toggleFilter("blue")}
              >
                <Image
                  src={BLUE_MARK_IMG}
                  width={18}
                  height={18}
                  alt="map pin"
                />
                <span>{`${blue.title}\u00A0${numWithComma(blue.counts || blue.coords.length)}건`}</span>
              </div>
            ) : null}

            {!!purple.title ? (
              <div
                className={`flex items-center gap-1 cursor-pointer ${isFilterActive("purple") ? "font-bold" : ""}`}
                onClick={() => toggleFilter("purple")}
              >
                <Image
                  src={PURPLE_MARK_IMG}
                  width={18}
                  height={18}
                  alt="map pin"
                />
                <span>{`${purple.title}\u00A0${numWithComma(purple.counts || purple.coords.length)}건`}</span>
              </div>
            ) : null}
            {!!black.title ? (
              <div
                className={`flex items-center gap-1 cursor-pointer ${isFilterActive("black") ? "font-bold" : ""}`}
                onClick={() => toggleFilter("black")}
              >
                <Image
                  src={BLACK_MARK_IMG}
                  width={18}
                  height={18}
                  alt="map pin"
                />
                <span>{`${black.title}\u00A0${numWithComma(black.counts || black.coords.length)}건`}</span>
              </div>
            ) : null}
            {!!yellow.title ? (
              <div
                className={`flex items-center gap-1 cursor-pointer ${isFilterActive("yellow") ? "font-bold" : ""}`}
                onClick={() => toggleFilter("yellow")}
              >
                <Image
                  src={YELLOW_MARK_IMG}
                  width={18}
                  height={18}
                  alt="map pin"
                />
                <span>{`${yellow.title}\u00A0${numWithComma(yellow.counts || yellow.coords.length)}건`}</span>
              </div>
            ) : null}

            {!!orange.title ? (
              <div
                className={`flex items-center gap-1 cursor-pointer ${isFilterActive("orange") ? "font-bold" : ""}`}
                onClick={() => toggleFilter("orange")}
              >
                <Image
                  src={ORANGE_MARK_IMG}
                  width={18}
                  height={18}
                  alt="map pin"
                />
                <span>{`${orange.title}\u00A0${numWithComma(orange.counts || orange.coords.length)}건`}</span>
              </div>
            ) : null}

            {!!red.title ? (
              <div
                className={`flex items-center gap-1 cursor-pointer ${isFilterActive("red") ? "font-bold" : ""}`}
                onClick={() => toggleFilter("red")}
              >
                <Image
                  src={RED_MARK_IMG}
                  width={18}
                  height={18}
                  alt="map pin"
                />
                <span>{`${red.title}\u00A0${numWithComma(red.counts || red.coords.length)}건`}</span>
              </div>
            ) : null}

            {!!gray.title ? (
              <div
                className={`flex items-center gap-1 cursor-pointer ${isFilterActive("gray") ? "font-bold" : ""}`}
                onClick={() => toggleFilter("gray")}
              >
                <Image
                  src={GRAY_MARK_IMG}
                  width={18}
                  height={18}
                  alt="map pin"
                />
                <span>{`${gray.title}\u00A0${numWithComma(gray.counts || gray.coords.length)}건`}</span>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default MapView;

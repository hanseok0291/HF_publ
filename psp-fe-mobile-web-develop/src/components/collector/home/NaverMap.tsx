"use client";

import { useEffect, useRef, useState } from "react";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/hooks/use-toast";

type NaverMapType = {
  debouncedSearchKeyword?: string;
  setResultAddress?: any;
};

export const NaverMap = ({
  debouncedSearchKeyword,
  setResultAddress
}: NaverMapType) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<naver.maps.Map | null>(null);
  const [marker, setMarker] = useState<naver.maps.Marker | null>(null);
  const initMap = () => {
    const mapOptions = {
      // center: new naver.maps.LatLng(37.394291, 126.956753),
      zoom: 15,
      scaleControl: false,
      logoControl: false,
      mapDataControl: false
      // zoomControl: true,
    };

    const mapInstance = new naver.maps.Map("map", mapOptions);
    const markerInstance = new naver.maps.Marker({
      position: new naver.maps.LatLng(37.394286, 126.956885),
      map: mapInstance
    });

    mapInstance.setOptions({
      zoomControl: false,
      zoomControlOptions: {
        position: naver.maps.Position.BOTTOM_RIGHT,
        style: naver.maps.ZoomControlStyle.LARGE
      }
    });

    setMap(mapInstance);
    setMarker(markerInstance);
  };

  useEffect(() => {
    if (window.naver && window.naver.maps) {
      initMap();
      // 맵이 로드된 후 로고의 z-index 조정
      const logoElements = document.getElementsByClassName("overlay-bottom");
      if (logoElements.length > 0) {
        for (let i = 0; i < logoElements.length; i++) {
          (logoElements[i] as HTMLElement).style.zIndex = "30";
        }
      }
    } else {
      // naver map api script tag가 불러지지 않았을 경우
      const mapScript = document.createElement("script");
      mapScript.onload = () => initMap();
      mapScript.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}&submodules=geocoder`;
      document.head.appendChild(mapScript);
    }
  }, []);

  // 디바운스된 검색어로 지오코딩 수행
  useEffect(() => {
    if (!debouncedSearchKeyword || !map || !marker || !naver.maps.Service)
      return;
    console.log("search keyword : ", debouncedSearchKeyword);
    naver.maps.Service.geocode(
      {
        query: debouncedSearchKeyword
      },
      function (status, response) {
        console.log("map status : ", status);
        console.log("response result : ", response);
        if (status === naver.maps.Service.Status.ERROR) {
          toast({
            title: "지도 검색에 실패했습니다.",
            description: `${new Date()}`,
            action: <ToastAction altText="닫기">닫기</ToastAction>
          });
        }
        if (response.v2.meta.totalCount === 0) {
          toast({
            title: "검색 결과가 없습니다.",
            description: `${new Date()}`,
            action: <ToastAction altText="닫기">닫기</ToastAction>
          });
        }

        const item = response.v2.addresses[0];
        const point = new naver.maps.Point(Number(item.x), Number(item.y));
        console.log(item.roadAddress);
        if (response.result) {
          console.log(response.result);
        }

        setResultAddress(item.roadAddress);
        if (map && marker) {
          // 마커 위치 업데이트
          marker.setPosition(point);
          // 지도 중심 이동
          map.setCenter(point);
          // 적절한 줌 레벨 설정
          map.setZoom(15);
        }
      }
    );
  }, [debouncedSearchKeyword, map, marker]);

  return (
    <div>
      <div
        id="map"
        ref={mapRef}
        className="m-auto h-[360px] w-full relative"
        style={{ zIndex: "10" }}
      />
    </div>
  );
};

"use client";

import { useEffect, useState } from "react";

export type NaverMaps = typeof naver.maps & {
  addressSearch: (
    address: string,
    callBack: (response: naver.maps.Service.GeocodeResponse) => any
  ) => Promise<void>;
};

const useNaverMaps = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [naverMaps, setNaverMaps] = useState<NaverMaps>();

  const setAddOns = (): Pick<NaverMaps, "addressSearch"> => ({
    addressSearch: async (address, callBack) =>
      naver.maps.Service.geocode(
        { query: address },
        async (status, response) => {
          if (status === naver.maps.Service.Status.ERROR) {
            throw new Error("Naver Maps address search Failed...");
          }
          callBack(response);
        }
      )
  });

  const initializeMap = () => {
    if (window.naver?.maps) {
      // 모든 필요한 API가 로드되었는지 확인
      if (
        typeof naver.maps.LatLng !== "function" ||
        !naver.maps.Service ||
        typeof naver.maps.Service.geocode !== "function"
      ) {
        setTimeout(initializeMap, 100);
        return;
      }

      const mapsWithAddons = Object.assign(naver.maps, {
        ...naver.maps,
        ...setAddOns()
      });
      setNaverMaps(mapsWithAddons as NaverMaps);
      setIsLoading(false);
    }
  };

  const downloadNaverMapsScript = () => {
    if (typeof window === "undefined") {
      console.error("Naver Maps Download Failed: Window is undefined...");
      return;
    }

    const existingScript = document.querySelector(
      'script[src*="maps.js?ncpClientId="]'
    );

    if (existingScript) {
      console.log("네이버 지도 API 이미 로드됨");
      setTimeout(initializeMap, 100);
      return;
    }

    // naver maps 로드 전에 기본 객체 설정
    if (!window.naver) {
      window.naver = {} as typeof window.naver;
    }

    // 단일 스크립트로 모든 기능 로드
    const script = document.createElement("script");
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID}&submodules=geocoder`;
    script.async = true;

    script.onload = () => {
      // 스크립트 로드 완료 후 초기화 시도
      const checkAndInitialize = () => {
        if (window.naver?.maps) {
          initializeMap();
        } else {
          setTimeout(checkAndInitialize, 100);
        }
      };
      checkAndInitialize();
    };

    document.head.appendChild(script);
  };

  useEffect(() => {
    downloadNaverMapsScript();
  }, []);

  return {
    isLoading,
    naverMaps,
    refresh: downloadNaverMapsScript
  };
};

export default useNaverMaps;

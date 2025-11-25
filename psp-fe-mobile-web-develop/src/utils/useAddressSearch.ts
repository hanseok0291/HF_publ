"use client";

import { useState } from "react";
import { useShallow } from "zustand/react/shallow";
import useResultAddress from "@/stores/useResultAddress";
import useResultDetailAddress from "@/stores/useResultDetailAddress";

type AddressDataType = {
  roadAddrPart1?: string;
  jibunAddr?: string;
  zipNo?: string;
  roadAddrPart2?: string;
  addrDetail?: string;
  bdNm?: string;
  [key: string]: any;
};

type JusoResponse = {
  results: {
    common: {
      totalCount: string;
      currentPage: string;
      countPerPage: string;
    };
    juso: AddressDataType[];
  };
};

export const useAddressSearch = () => {
  const [addresses, setAddresses] = useState<AddressDataType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { setResultAddress } = useResultAddress();
  const { setBdName, setJibunAddress } = useResultDetailAddress(
    useShallow((state) => ({
      setBdName: state.setBdName,
      setJibunAddress: state.setJibunAddress
    }))
  );

  const searchAddress = async (keyword: string) => {
    if (!keyword.trim()) {
      setAddresses([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const WEB_KEY = process.env.NEXT_PUBLIC_JUSO_SEARCH_SECRET_KEY as string;
      const params = new URLSearchParams({
        confmKey: WEB_KEY,
        currentPage: "1",
        countPerPage: "10",
        keyword: keyword,
        resultType: "json",
        hstryYn: "N",
        firstSort: "none",
        addInfoYn: "N"
      });

      const response = await fetch(
        `https://business.juso.go.kr/addrlink/addrLinkApi.do?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error("주소 검색에 실패했습니다.");
      }

      const data: JusoResponse = await response.json();

      if (data.results.juso) {
        setAddresses(data.results.juso);
      } else {
        setAddresses([]);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다."
      );
      setAddresses([]);
    } finally {
      setIsLoading(false);
    }
  };

  const selectAddress = (address: AddressDataType) => {
    setResultAddress(address.roadAddrPart1 || "");
    setBdName(address.bdNm || "");
    setJibunAddress(address.jibunAddr || "");
  };

  return {
    addresses,
    isLoading,
    error,
    searchAddress,
    selectAddress
  };
};

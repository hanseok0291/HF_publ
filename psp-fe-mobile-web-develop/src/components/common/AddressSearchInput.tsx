"use client";

import { useState } from "react";
import { useAddressSearch } from "@/utils/useAddressSearch";

export default function AddressSearchInput() {
  const [searchTerm, setSearchTerm] = useState("");
  const { addresses, isLoading, error, searchAddress, selectAddress } =
    useAddressSearch();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchAddress(searchTerm);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSearch} className="mb-4">
        <div className="flex gap-2">
          <input
            maxLength={80}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="주소를 입력하세요"
            className="flex-1 p-2 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            disabled={isLoading}
          >
            {isLoading ? "검색 중..." : "검색"}
          </button>
        </div>
      </form>

      {error && (
        <div className="p-2 mb-4 text-red-500 bg-red-50 rounded">{error}</div>
      )}

      <div className="border rounded divide-y">
        {addresses.map((address, index) => (
          <div
            key={index}
            className="p-3 hover:bg-gray-50 cursor-pointer"
            onClick={() => selectAddress(address)}
          >
            <p className="font-medium">{address.roadAddrPart1}</p>
            <p className="text-sm text-gray-500">{address.jibunAddr}</p>
            {address.bdNm && (
              <p className="text-sm text-gray-500">건물명: {address.bdNm}</p>
            )}
          </div>
        ))}
        {addresses.length === 0 && !isLoading && searchTerm && (
          <div className="p-3 text-center text-gray-500">
            검색 결과가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}

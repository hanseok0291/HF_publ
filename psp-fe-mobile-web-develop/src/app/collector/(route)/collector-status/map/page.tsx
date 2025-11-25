"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useShallow } from "zustand/react/shallow";
import { getWasteCollectionDetailMap } from "@/apis/collector/area/areaApi";
import MainContainer from "@/components/common/MainContainer";
import MapView from "@/components/common/MapView";
import CloseHeader from "@/components/header/CloseHeader";
import EtcChip from "@/components/store/etc/EtcChip";
import useResultAddress from "@/stores/useResultAddress";

interface MapData {
  zipCode?: string;
  disposeAddress?: string;
  disposeDetailAddress?: string;
}
//TODO: /v1/common/waste-collection/request/{requestId}로 상세 지도 api 붙이기
export default function Page() {
  const { resultAddress, setResultAddress, reset } = useResultAddress(
    useShallow((state) => ({
      resultAddress: state.resultAddress,
      setResultAddress: state.setResultAddress,
      reset: state.reset
    }))
  );
  const router = useRouter();
  const query = useSearchParams();
  const requestId = query.get("requestId");
  if (requestId === null) {
    router.back();
  }
  const { swrResponse } = getWasteCollectionDetailMap({
    requestId: requestId as string
  });
  if (!swrResponse.data) {
    return null;
  }
  const result = swrResponse.data.content;
  const handleClose = () => {
    router.back();
  };

  return (
    <MainContainer>
      <CloseHeader title="배출주소 지도" onClose={handleClose} />
      <MapView
        center={{ lat: result.disposeLatitude, lng: result.disposeLongitude }}
      />
      <section className="px-[20px] h-[400px] flex flex-col gap-[10px] mt-[24px]">
        <h4 className="font-semibold">배출위치</h4>
        <p className="text-[14px] leading-[22px]">
          {`(${result.zipCode}) ${result.disposeAddress} ${result.disposeDetailAddress}`}
        </p>
        {result.specialNotes && (
          <EtcChip
            text={result.specialNotes}
            className="w-full rounded-none p-[12px]"
          />
        )}
      </section>
    </MainContainer>
  );
}

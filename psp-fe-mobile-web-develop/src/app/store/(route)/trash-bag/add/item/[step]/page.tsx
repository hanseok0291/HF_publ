"use client";

import { use, useEffect, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import { getCookie } from "cookies-next/client";
import { useShallow } from "zustand/react/shallow";
import { getTrashBag } from "@/apis/trash-bag/trashBagApis";
import CloseHeader from "@/components/header/CloseHeader";
import AddFirstStep from "@/components/store/waste-sticker/purchase/AddFirstStep";
import AddSecondStep from "@/components/store/waste-sticker/purchase/AddSecondStep";
import usePurcase from "@/stores/usePurcase";

type AddItemType = {
  params: Promise<{ step: string }>;
};

type wasteStickerType = {
  id: string;
  standardName: string;
};

export default function Page({ params }: AddItemType) {
  const [keyword, setKeyword] = useState<string>("");
  const router = useRouter();
  const { step } = use(params);
  const { dataList, setDataList } = usePurcase(
    useShallow((state) => ({
      dataList: state.dataList,
      setDataList: state.setDataList
    }))
  );

  const headerOption = {
    title: ""
  };

  if (step !== "1" && step !== "2") {
    notFound();
  }

  if (step === "1") {
    Object.assign(headerOption, { title: "구매 희망 종량제 봉투 권종 선택" });
  }

  if (step === "2") {
    Object.assign(headerOption, { title: "구매 희망 종량제 봉투 수량 기재" });
  }

  //품목 리스트 조회
  const fetchData = async () => {
    const localId = getCookie("localGovernmentId");
    if (localId) {
      const data = {
        localGovernmentId: localId,
        standardName: keyword
      };
      getTrashBag(data)
        .then((res) => {
          if (res.content && Array.isArray(res.content)) {
            // 데이터 변환 로직
            const modifiedData = res.content.map((item) => {
              return {
                ...item,
                id: item.trashBagId,
                type:
                  item.topStandardName || item.middleStandardName
                    ? "accordion"
                    : "text"
              };
            });
            setDataList(modifiedData);
          } else {
            console.error("종량제 품목 데이터가 배열 형식이 아님");
          }
        })
        .catch((error) => console.log(error.message));
    }
  };

  useEffect(() => {
    fetchData();
  }, [keyword]);

  return (
    <div className="animate-fade-in h-svh">
      <CloseHeader
        title={`${headerOption.title} (${step}/2)`}
        onClose={() => router.back()}
      />

      <div className="flex-1 overflow-y-auto">
        {step === "1" && (
          <AddFirstStep
            setKeyword={setKeyword}
            SearchInputPlaceholder="분류명을 검색해 주세요."
            dataList={dataList}
            pushLink={`/store/trash-bag/add/item/${2}`}
          />
        )}
        {step === "2" && (
          <AddSecondStep
            pushLink="/store/trash-bag/add"
            listType="trashBagList"
          />
        )}
      </div>
    </div>
  );
}

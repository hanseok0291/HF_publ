"use client";

import { use, useEffect, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import { getCookie } from "cookies-next/client";
import { useShallow } from "zustand/react/shallow";
import {
  getStickerList,
  getStickerMiddle,
  getStickerTop
} from "@/apis/waste-sticker/wasteStickerApis";
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

// TODO : useForm 형식으로 바꿔서 api 로직 변경할지 고민, 검색창 쪽 api 누락, store 값 바로 적용되도록 수정, 이전 버튼 누를 시 런타임 에러
export default function Page({ params }: AddItemType) {
  const { dataList, setDataList } = usePurcase(
    useShallow((state) => ({
      dataList: state.dataList,
      setDataList: state.setDataList
    }))
  );
  console.log(dataList);
  //첫번째 드롭다운
  const [fData, setFData] = useState<wasteStickerType[]>([]);
  //top id
  const [topId, setTopId] = useState<string>("");
  //두번째 드롭다운
  const [sData, setSData] = useState<wasteStickerType[]>([]);
  //middle id
  const [middleId, setMiddleId] = useState<string>("");
  //검색어
  const [keyword, setKeyword] = useState<string>("");
  const router = useRouter();
  const { step } = use(params);

  const headerOption = {
    title: ""
  };

  if (step !== "1" && step !== "2") {
    notFound();
  }

  if (step === "1") {
    Object.assign(headerOption, { title: "구매 희망 스티커 분류 선택" });
  }

  if (step === "2") {
    Object.assign(headerOption, { title: "구매 희망 스티커 수량 기재" });
  }

  //품목 리스트 조회
  const fetchData = async () => {
    const localId = getCookie("localGovernmentId");
    if (localId) {
      const data = {
        localGovernmentId: localId,
        topStickerId: topId,
        middleStickerId: middleId,
        standardName: keyword
      };
      const submitData = {};
      getStickerList(data)
        .then((res) => {
          if (res.content && Array.isArray(res.content)) {
            const modifiedData = res.content.map((item) => {
              return {
                ...item,
                id: item.stickerId,
                type:
                  item.topStandardName || item.middleStandardName
                    ? "accordion"
                    : "text"
              };
            });
            setDataList(modifiedData);
          } else {
            console.error("스티커 데이터가 배열 형식이 아님");
          }
        })
        .catch((error) => console.log(error.message));
    }
  };

  // 스티커 품목 리스트 조회
  const getTopList = async () => {
    const localId = getCookie("localGovernmentId");
    console.log("localId", localId);
    if (localId) {
      getStickerTop({ localGovernmentId: localId })
        .then((res) => {
          if (res.content && Array.isArray(res.content)) {
            const modifiedData = res.content.map((item) => {
              return {
                ...item,
                id: item.stickerId || item.trashBagId
              };
            });
            setFData(modifiedData);
          } else {
            console.error("스티커 데이터가 배열 형식이 아님");
          }
        })
        .catch((error) => console.log(error.message));
      if (topId !== "") {
        getMiddleList();
      }
    }
  };

  // 스티커 세부 품목 리스트 조회
  const getMiddleList = async () => {
    getStickerMiddle({ stickerId: topId }).then((res) => {
      if (res.content && Array.isArray(res.content)) {
        const modifiedData = res.content.map((item) => {
          return {
            id: item.stickerId || item.trashBagId,
            ...item
          };
        });
        setSData(modifiedData);
        console.log("품목 세부 리스트: ", res.content);
      } else {
        console.error("스티커 데이터가 배열 형식이 아님");
      }
    });
  };

  useEffect(() => {
    fetchData();
    getTopList();
  }, [topId, middleId, keyword]);

  return (
    <div className="animate-fade-in flex flex-col h-svh overflow-y-auto">
      <CloseHeader
        title={`${headerOption.title} (${step}/2)`}
        onClose={() => router.back()}
      />

      <div className="flex-grow flex flex-col">
        {step === "1" && (
          <AddFirstStep
            setKeyword={setKeyword}
            SearchInputPlaceholder="스티커 권종 이름을 검색해 주세요."
            dataList={dataList}
            pushLink={`/store/waste-sticker/add/item/${2}`}
          />
        )}
        {step === "2" && (
          <AddSecondStep
            pushLink="/store/waste-sticker/add"
            listType="sticker"
          />
        )}
      </div>
    </div>
  );
}

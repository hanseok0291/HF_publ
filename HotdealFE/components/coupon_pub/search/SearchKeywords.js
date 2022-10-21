import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import styleDefaultLayout from "../../../styles/common/DefaultLayout.module.css";
import styleCommon from "../../../styles/coupon_pub/Common.module.css";
import styleSearch from "../../../styles/coupon_pub/Search.module.css";

const SearchKeywords = ({ searchKeywords, inSearch }) => {
  const [keywords, setKeywords] = useState([]);

  //검색어 스토리지 로드
  // if (typeof window !== "undefined") {
  //   const result = localStorage.getItem("keywords") || "[]";
  //   const keywordJson = JSON.parse(result);

  //   setKeywords(keywordJson.splice(0, 5));
  // }

  // 모두 지우기
  const handleRemoveKeyword = (text) => {
    const newKeyword = {
      id: Date.now(),
      text: text,
    };
    setKeywords([]);
  };

  return (
    <>
      <div className={`${styleSearch.searchWrap}`}>
        <div className={`${styleCommon.container} ${styleSearch.titleBox}`}>
          <h2 className={`${styleSearch.title}`}>
            최근 찾아봤어요<span>🔍</span>
          </h2>
          <button
            className={`${styleSearch.btnDel}`}
            onClick={handleRemoveKeyword}
          >
            모두 지우기
          </button>
        </div>
      </div>
      <div className={`${styleSearch.searchWrap}`}>
        <div className={`${styleCommon.container} ${styleSearch.searchBox}`}>
          <ul className={`${styleSearch.search}`}>
            <li>
              <a href="#">가나 초콜릿 가나 초콜릿 가나 초콜릿 가나 초콜릿</a>
            </li>
            <li>
              <a href="#">가나 초콜릿</a>
            </li>
            <li>
              <a href="#">가나 초콜릿</a>
            </li>
            <li>
              <a href="#">가나 초콜릿</a>
            </li>
            <li>
              <a href="#">가나 초콜릿</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default SearchKeywords;

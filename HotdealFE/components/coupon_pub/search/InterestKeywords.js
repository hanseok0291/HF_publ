import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import styleDefaultLayout from "../../../styles/common/DefaultLayout.module.css";
import styleCommon from "../../../styles/coupon_pub/Common.module.css";
import styleSearch from "../../../styles/coupon_pub/Search.module.css";

const InterestKeywords = ({ InterestKeywords, inSearch }) => {
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
            지금 인기있어요<span>💗</span>
          </h2>
        </div>
      </div>
      <div className={`${styleSearch.searchWrap} ${styleSearch.interestWrap}`}>
        <div className={`${styleCommon.container} ${styleSearch.searchBox}`}>
          <ul className={`${styleSearch.search} ${styleSearch.interest}`}>
            <li>
              <a href="#">
                <span className={`${styleSearch.searchNum}`}>1</span> 아이스
                아메리카노
              </a>
            </li>
            <li>
              <a href="#">
                <span className={`${styleSearch.searchNum}`}>2</span> 식빵
              </a>
            </li>
            <li>
              <a href="#">
                <span className={`${styleSearch.searchNum}`}>3</span> 가나
                초콜릿
              </a>
            </li>
            <li>
              <a href="#">
                <span className={`${styleSearch.searchNum}`}>4</span> 가나
                초콜릿
              </a>
            </li>
            <li>
              <a href="#">
                <span className={`${styleSearch.searchNum}`}>5</span> 가나
                초콜릿
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default InterestKeywords;

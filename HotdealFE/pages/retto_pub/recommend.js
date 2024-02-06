import React from "react";

// component
import LayerRecommend from "../../components/retto_pub/LayerRecommend";
import ModalRecommendEnd from "../../components/retto_pub/common/modal/ModalRecommendEnd";
import Toast from "../../components/retto_pub/common/Toast";
import ModalAlert from "../../components/coupon_pub/common/Modal/ModalAlert";
import ModalRecommendBlock from "../../components/retto_pub/common/modal/ModalRecommendBlock";

const index = () => {
  return (
    <>
      {/* 추천 코드 입력하기 */}
      <LayerRecommend />
      {/* 추천 코드 입력 마감 */}
      {/* <ModalRecommendEnd /> */}
      {/* <ModalRecommendBlock /> */}
      {/* 추천 코드 입력 완료 토스트 */}
      {/* <Toast width={250}>카드 발급 선물 신청이 완료되었어요!</Toast> */}
      {/* 리또 선물 코드 입력하기 Error */}
      {/* <ModalAlert cancle={false} message="일치하는 선물 코드를 찾지 못했어요." /> */}
      <ModalAlert message={`추천 코드는 010PAY 앱에서 입력 가능해요.`} />
      {/* <ModalAlert cancle={false} subTitle={"이미 선물 받아 이번 리또는 못받아요."} message="친구에게 리또 선물하고 리또 더 받아요." /> */}
    </>
  );
};

export default index;

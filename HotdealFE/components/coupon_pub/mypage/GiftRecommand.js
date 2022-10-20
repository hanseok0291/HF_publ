import SwiperItem from "../main/SwiperItem";
import styleCommon from "../../../styles/coupon_pub/Common.module.css";

const GiftRecommand = () => {
  return (
    <>
      <SwiperItem
        title={[
          "친구가 좋아할 것 같아요",
          <i className={`${styleCommon.italic}`}>!</i>,
        ]}
        moreBtnShow="false"
        labelShow="true"
        bgColor="#fbfbfb"
        fontSize="17px"
      />
    </>
  );
};

export default GiftRecommand;

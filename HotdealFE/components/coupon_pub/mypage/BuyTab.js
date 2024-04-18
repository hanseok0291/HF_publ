import TabGroup from "../common/TabGroup";

const BuyTab = ({ tabLink }) => {

  return (
    <>
      {tabLink && <TabGroup navList={["사용 가능", "사용 완료"]} tabList={["전체", "일반", "PAY", "프로모션"]} />}
    </>
  );
};

export default BuyTab;

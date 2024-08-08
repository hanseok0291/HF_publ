import ModalAlert from "../../components/coupon_pub/common/modal/ModalAlert";

export default {
  title: "Pages/Modal",
  component: ModalAlert,
};


const Template = (args) => <ModalAlert {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "알림",
  cancle : "취소",
  confirm : "확인",
  content: "알림 내용을 확인해주세요."
};
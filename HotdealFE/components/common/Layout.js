import styleDefaultLayout from "../../styles/common/DefaultLayout.module.css";
import styleCommon from "../../styles/coupon_pub/Common.module.css";

const Layout = (props) => {
  return <div className={`${styleDefaultLayout.wrap}`}>{props.children}</div>;
};

export default Layout;

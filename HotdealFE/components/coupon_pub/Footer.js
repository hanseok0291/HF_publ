import router from "next/router";
import styleDefaultLayout from "../../styles/common/DefaultLayout.module.css";

export default function Header({ pageTitle, isBackClose, isClose, closeFunc }) {
  return (
    <div
      className={`${styleDefaultLayout.pageHeader} ${styleDefaultLayout.defaultHeader}`}
    >
    </div>
  );
}

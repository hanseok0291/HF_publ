import router from "next/router";
import styleDefaultLayout from "../../styles/common/DefaultLayout.module.css";

export default function Header({ pageTitle, isBackClose, isClose, closeFunc }) {
  return (
    <div
      className={`${styleDefaultLayout.pageHeader} ${styleDefaultLayout.defaultHeader}`}
    >
      <div className={`${styleDefaultLayout.container} `}>
        {!isClose && (
          <button
            type="button"
            className={`${styleDefaultLayout.btnIcon} ${styleDefaultLayout.btnBack}`}
            onClick={(e) => {
              if (history.state.idx > 0 && !isBackClose) {
                router.back();
              } else {
                window.appInterface.exec("close");
              }
            }}
          >
            뒤로 가기
          </button>
        )}

        <h1 className={styleDefaultLayout.pageTitle}>{pageTitle}</h1>

        {isClose && (
          <button
            type="button"
            className={`${styleDefaultLayout.btnIcon} ${styleDefaultLayout.btnClose}`}
            onClick={closeFunc}
          >
            닫기
          </button>
        )}
      </div>
    </div>
  );
}

"use client";

import { useEffect } from "react";

const PaymentResultView = () => {
  // const searchParams = useSearchParams();
  // const [state, setState] = useState("");

  // useEffect(() => {
  //   const status = searchParams.get("status");
  //   setState(status!);
  //   window.close();
  // }, [searchParams]);
  useEffect(() => {
    window.close();
  }, []);

  return (
    <div>
      {/* {state === "OK" ? (
        <>
          결제가 완료되었습니다. <br /> 기존 페이지로 돌아가서 확인해주세요.
        </>
      ) : (
        <>
          결제에 실패했습니다. <br /> 기존 페이지로 돌아가 다시 시도해주세요.
        </>
      )} */}
    </div>
  );
};

export default PaymentResultView;

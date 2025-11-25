export const getJusoApi = async () => {
  try {
    // 쿼리 파라미터 인코딩 확인
    const params = new URLSearchParams({
      confmKey: "U01TX0FVVEgyMDI0MTIwNTA5MjMwNjExNTMwMjE=",
      resultType: "1",
      returnUrl: "http://localhost:5000"
    });

    // 전체 URL 로깅
    const fullUrl = `https://business.juso.go.kr/addrlink/addrMobileLinkUrl.do?${params}`;
    console.log("Full Request URL:", fullUrl);

    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Origin: "http://localhost:5000"
      }
    });

    // 응답 상태 확인
    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error:", errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseText = await response.text();
    console.log("Raw Response:", responseText);

    // HTML 응답 처리
    return responseText;
  } catch (error) {
    console.error("주소 API 호출 오류:", error);
    throw error;
  }
};

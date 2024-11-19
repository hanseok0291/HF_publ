window.onload = function () {
  document
    .getElementById("firstName")
    .addEventListener("input", validateInputs);
  document.getElementById("lastName").addEventListener("input", validateInputs);
};

// 영문명 유효성
function validateInputs() {
  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const firstNameError = document.getElementById("firstNameError");
  const lastNameError = document.getElementById("lastNameError");
  const globalError = document.getElementById("globalError");

  // 초기화
  document.getElementById("firstName").classList.remove("error");
  document.getElementById("lastName").classList.remove("error");
  firstNameError.style.display = "none";
  lastNameError.style.display = "none";
  globalError.style.display = "none";

  // 두 필드가 모두 비어 있는 경우, 오류 없이 종료
  if (firstName === "" && lastName === "") {
    return true;
  }

  // 정규식을 통한 유효성 검사
  const nameRegex = /^[a-zA-Z-]+$/;
  let isValid = true;

  // 개별 필드 유효성 검사
  if (firstName.length > 0) {
    if (!nameRegex.test(firstName)) {
      firstNameError.textContent = "영문, 특수문자(-)만 입력해주세요.";
      firstNameError.style.display = "block";
      document.getElementById("firstName").classList.add("error");
      isValid = false;
    } else if (firstName.length < 3) {
      firstNameError.textContent = "영문명을 다시 확인해 주세요";
      firstNameError.style.display = "block";
      document.getElementById("firstName").classList.add("error");
      isValid = false;
    }
  }

  if (lastName.length > 0) {
    if (!nameRegex.test(lastName)) {
      lastNameError.textContent = "영문, 특수문자(-)만 입력해주세요.";
      lastNameError.style.display = "block";
      document.getElementById("lastName").classList.add("error");
      isValid = false;
    } else if (lastName.length < 3) {
      lastNameError.textContent = "영문명을 다시 확인해 주세요";
      lastNameError.style.display = "block";
      document.getElementById("lastName").classList.add("error");
      isValid = false;
    }
  }

  // 성과 이름 중 하나라도 비어 있는 경우 공통 오류 메시지
  if (isValid && (firstName === "" || lastName === "")) {
    if(lastName === "") {
      document.getElementById("lastName").classList.add("error");
    }
    if(firstName === "") {
      document.getElementById("firstName").classList.add("error");
    }
    globalError.textContent = "영문명을 다시 확인해 주세요";
    globalError.style.display = "block";
    isValid = false;
  }

  return isValid;
}

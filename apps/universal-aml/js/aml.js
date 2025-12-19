$(document).ready(function () {
  // input-dot 엘리먼트
  var inputDot = document.querySelector(".input-dot");
  // inputDotBox 엘리먼트
  var inputDotBox = document.getElementById("inputDotBox");

  if (inputDotBox) {
    // input-dot을 클릭하면 inputDotBox로 포커스 이동
    inputDot.addEventListener("click", function () {
      inputDotBox.focus();
    });
  }
});

document.querySelectorAll(".select-list li").forEach((item) => {
  item.addEventListener("click", () => {
    var parentId = item.closest("[id]").id; // 부모 요소의 id 값을 가져옴
    var targetElement = document.querySelector("[data-target='" + parentId + "']"); // 해당 parentId 값을 가진 요소를 찾음

    // balance-standard-list는 제외
    if (item.closest(".balance-standard-list")) {
      return;
    }

    modalOther = 1;
    // 클릭한 li 요소의 텍스트 값을 가져옴
    const selectedText = item.textContent;

    // select 요소를 선택
    // const selectInput = document.querySelectorAll(".custom-select .select li");
    const targetQuery = document.querySelector("[data-target='" + parentId + "']");
    if (!targetQuery) {
      return;
    }
    const selectInput = targetQuery.querySelectorAll(".select li");

    // 클릭한 li의 텍스트를 rcptIdGb_01 값으로 설정
    selectInput.forEach((input) => {
      input.textContent = selectedText;
      // 선택된 상태를 나타내는 클래스 추가
      input.classList.add("selected");
    });

    // 기존에 bold 클래스가 추가된 요소가 있으면 제거
    document.querySelectorAll("#" + parentId + " .select-list li").forEach((el) => {
      el.classList.remove("bold");
    });
    // 현재 선택된 li에 bold 클래스 추가
    item.classList.add("bold");

    scrollOn();
    $(".modal").removeClass("modal-open");

    $(".modal").addClass("modal-close");
    setTimeout(() => {
      $(".modal").css("display", "none");
      $(".modal").removeClass("modal-close");
    }, 200);
  });
});

// 약관 체크박스 제어
const otherCheckboxes = document.querySelectorAll(".checkSelect");

function updateSendButtonClass() {
  const allAgreeCheckbox = document.getElementById("check-all");
  const nextStep = document.getElementById("nextStep");
  if (allAgreeCheckbox && nextStep) {
    nextStep.disabled = !allAgreeCheckbox.checked;
  }
}

function updateNextButtonStatus() {
  const allAgreeCheckbox = document.getElementById("check-all");
  const next = document.getElementById("next");
  if (!allAgreeCheckbox || !next) return;

  const allChecked = [...otherCheckboxes].every((cb) => cb.checked);
  next.disabled = !(allChecked && allAgreeCheckbox.checked);
}

// 전체동의 체크박스
const allAgreeCheckbox = document.getElementById("check-all");
if (allAgreeCheckbox) {
  allAgreeCheckbox.addEventListener("change", function () {
    otherCheckboxes.forEach((cb) => {
      cb.checked = allAgreeCheckbox.checked;
    });
    updateSendButtonClass();
    updateNextButtonStatus();
  });
}

// 개별 체크박스 상태 변경
otherCheckboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    const allAgreeCheckbox = document.getElementById("check-all");
    if (allAgreeCheckbox) {
      allAgreeCheckbox.checked = [...otherCheckboxes].every((cb) => cb.checked);
    }
    updateSendButtonClass();
    updateNextButtonStatus();
  });
});

const footerButtons = document.querySelectorAll(".modal-footer .btn");

// footer 버튼 클릭 시 이벤트 추가
footerButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const target = this.getAttribute("data-target"); // 클릭한 버튼의 data-target 값 가져오기
    const targetButton = document.getElementById(target); // 해당하는 버튼 선택
    const allAgreeCheckbox = document.getElementById("check-all");

    if (targetButton) {
      targetButton.checked = true; // 해당하는 버튼을 체크된 상태로 만들기
    }

    if (allAgreeCheckbox) {
      allAgreeCheckbox.checked = [...otherCheckboxes].every((cb) => cb.checked);
    }

    updateNextButtonStatus(); // 항상 상태 갱신 시도
  });
});

// 다른 체크박스의 변경 이벤트를 감지하여 "check-all" 체크박스와 "check-pay" 체크박스의 상태를 업데이트합니다.
otherCheckboxes.forEach(function (checkbox) {
  checkbox.addEventListener("change", function () {
    updateNextButtonStatus();
  });
});

// 함수를 만들어 체크 상태를 확인하고 "next" 버튼의 disabled 값을 변경합니다.
function updateNextButtonStatus() {
  const allChecked = [...otherCheckboxes].every((cb) => cb.checked);
  const allAgreeCheckbox = document.getElementById("check-all");
  const nextBtn = document.getElementById("next");

  if (!allAgreeCheckbox || !nextBtn) return; // null 체크

  if (allChecked && allAgreeCheckbox.checked) {
    nextBtn.disabled = false;
  } else {
    nextBtn.disabled = true;
  }
}

// 
 // ✅ "이용약관 전체 동의" 버튼 클릭 시 전체 체크
 const nextStepButton = document.getElementById("nextStep");
 if (nextStepButton) {
   nextStepButton.addEventListener("click", function () {
     otherCheckboxes.forEach((cb) => (cb.checked = true));
     if (allAgreeCheckbox) allAgreeCheckbox.checked = true;
     updateSendButtonClass();
     updateNextButtonStatus();
   });
 }
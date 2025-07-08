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

    modalOther = 1;
    // 클릭한 li 요소의 텍스트 값을 가져옴
    const selectedText = item.textContent;

    // select 요소를 선택
    // const selectInput = document.querySelectorAll(".custom-select .select li");
    const selectInput = document.querySelector("[data-target='" + parentId + "']").querySelectorAll(".select li");

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

// 전체약관동의 체크박스
const allAgreeCheckbox = document.getElementById("check-all");
// 나머지 체크박스들
const otherCheckboxes = document.querySelectorAll(".checkSelect");

// "check-all" 체크박스의 변경 이벤트를 감지합니다.
if (allAgreeCheckbox) {
  allAgreeCheckbox.addEventListener("change", function () {
    otherCheckboxes.forEach(function (checkbox) {
      checkbox.checked = allAgreeCheckbox.checked;
    });
    updateSendButtonClass();
  });
}

// 다른 체크박스의 변경 이벤트를 감지하여 "check-all" 체크박스와 "check-pay" 체크박스의 상태를 업데이트합니다.
otherCheckboxes.forEach(function (checkbox) {
  checkbox.addEventListener("change", function () {
    if ([...otherCheckboxes].every((cb) => cb.checked)) {
      allAgreeCheckbox.checked = true;
    } else {
      allAgreeCheckbox.checked = false;
    }
    updateSendButtonClass();
  });
});

// 함수를 만들어 체크 상태를 확인하고 클래스를 추가합니다.
function updateSendButtonClass() {
  if (allAgreeCheckbox.checked) {
    document.getElementById("next").disabled = false;
  } else {
    document.getElementById("next").disabled = true;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const footerButtons = document.querySelectorAll(".modal-footer .btn");

  footerButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const targetId = this.getAttribute("data-target");

      if (!targetId) return;

      // targetId가 'check-all'이면 그 체크박스를 체크
      if (targetId === "check-all") {
        const checkAllBox = document.getElementById("check-all");
        if (checkAllBox) checkAllBox.checked = true;
      }

      // 그 외에 개별 약관 체크박스 처리
      const targetCheckbox = document.getElementById(targetId);
      if (targetCheckbox) {
        targetCheckbox.checked = true;
      }

      // 모달 닫기
      const modal = this.closest(".modal");
      if (modal) {
        modal.style.display = "none";
      }
    });
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
  if (allChecked && allAgreeCheckbox.checked) {
    document.getElementById("next").disabled = false;
  } else {
    document.getElementById("next").disabled = true;
  }
}

// 
const nextStepButton = document.getElementById("nextStep");

if (nextStepButton) {
  nextStepButton.addEventListener("click", function () {
    // 1. 모든 체크박스 체크
    document.querySelectorAll(".checkSelect").forEach((cb) => (cb.checked = true));

    // 2. 전체동의 체크박스도 체크 (존재할 경우)
    if (allAgreeCheckbox) {
      allAgreeCheckbox.checked = true;
    }

    // 3. 다음 단계로 이동하거나 모달 닫기 등
/*     const modal = document.getElementById("modalSlide02");
    if (modal) {
      modal.classList.remove("modal-open");
      modal.classList.add("modal-close");
      setTimeout(() => {
        modal.style.display = "none";
        modal.classList.remove("modal-close");
      }, 200);
    } */

    // 4. 필요하다면 다음 작업 콜백 추가
    // ex) sendVerificationRequest();
  });
}

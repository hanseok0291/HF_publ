// 바디 스크롤 제거/해제
var scrollHeight = 0;
function scrollOff() {
  scrollHeight = $(document).scrollTop();
  $("body").addClass("modal-open");
  $("#wrap").css({
    "position": "fixed",
    "top": -scrollHeight + "px",
    "width": "100%",
    "left": "0",
    "right": "0"
  });
  $("#header").css("top", "-0.9px");
}
function scrollOn() {
  $("body").removeClass("modal-open");
  $("#wrap").css({
    "position": "relative",
    "top": "0",
    "width": "auto",
    "left": "auto",
    "right": "auto"
  });
  $("#header").css("top", "-1px");
  $(document).scrollTop(scrollHeight);
}

var wrap = document.getElementById("wrap");
var modal = document.getElementById("modalSlide");
var modal02 = document.getElementById("modalSlide02");
var btn = document.getElementById("openModalBtn");
var span = document.getElementsByClassName("close")[0];

// modalOpen 함수가 실행되었는지 여부를 나타내는 변수
var modalOpenExecuted = false;
var modalNext;
// 모달 열기 함수
function modalOpen(obj1, obj2) {
  var temp = $("#" + obj1);
  modalNext = obj2;
  modalOpenExecuted = true;
  temp.addClass("modal-open");
  temp.css("display", "block");
  scrollOff(); // 바디 스크롤 제거

  // 슬라이드 모달 닫기
  function modalOut() {
    temp.removeClass("modal-open");
    temp.css("display", "none");

    // 이중 모달이 아닌 경우
    if (!$(temp).hasClass("depth2")) {
      // scrollOn(); // 바디 스크롤 제거 해제
    }
  }

  // 팝업 내 닫기 버튼 클릭 시 팝업 닫기
  $(temp)
    .find(".modal-close")
    .click(function () {
      modalOut();
    });
}

// 모달 닫기 함수
function modalClose() {
  $("body").removeClass("modal-open");
  $(".modal").removeClass("modal-open");
  $(".modal").addClass("modal-close");
  setTimeout(function () {
    $(".modal").css("display", "none");
    $(".modal").removeClass("modal-close");
    modalOther = 0;
    scrollOn();
  }, 100); // 애니메이션 지속 시간
}

// 모달 열기 버튼
$(".js-modal-slide").click(function () {
  var chk = $(this).attr("data-chk"); // 모달이 열리는지 체크
  var target = $(this).attr("data-target"); // 모달 ID
  if (chk == "false") {
  } else {
    // modal-slide 클래스를 가진 모달은 modalOpenSlide 함수 사용
    var targetModal = $("#" + target);
    if (targetModal.hasClass("modal-slide")) {
      if (typeof modalOpenSlide === "function") {
        modalOpenSlide(target);
      } else {
        modalOpen(target);
      }
    } else {
      modalOpen(target);
    }
  }
});

// 모달 내에서 다음 단계로 이동할 경우
var modalOther = 0;
window.addEventListener("click", function (event) {
  if (modalNext == "true" && modalOther == "0") {
  } else if (modalNext == "false" && modalOther == "1") {
    modalClose();
  }
});

// 모달(레이어 팝업), 배너, 팝오버
$(function () {
  // 모달 열기
  $("[data-toggle='modal']").click(function () {
    var openBtn = $(this);
    var target = $(this).attr("data-target"); // 모달 ID
    $(target).show().focus(); // 모달 열기, 포커스
    // scrollOff(); // 바디 스크롤 제거

    // 모달 위치
    var thisDialog = $(target).find(".modal-dialog");
    var marginValue = thisDialog.outerHeight() / 2;
    $(thisDialog).css("margin-top", "-" + marginValue + "px");

    // 모달 닫기
    $("[data-dismiss='modal']").click(function () {
      $(openBtn).focus(); // 열기 버튼 포커스
      // scrollOff(); // 바디 스크롤 제거
    });

    $("#wrap").css({
      "position": "fixed",
      "width": "100%",
      "left": "0",
      "right": "0"
    });
  });

  // 모달 닫기
  $("[data-dismiss='modal']").click(function () {
    var target = $(this).parents(".modal");
    $(target).hide(); // 모달 닫기
    // scrollOn(); // 바디 스크롤 제거 해제
    // scrollOff(); // 바디 스크롤 제거
    $("#wrap").css({
      "position": "relative",
      "width": "auto",
      "left": "auto",
      "right": "auto"
    });
  });

  // 배너 닫기(플로팅 배너)
  $("[data-dismiss='banner']").click(function () {
    var target = $(this).parents(".banner");
    $(target).hide();
  });

  // popover
  $("[data-dismiss='popover']").click(function () {
    var target = $(this).parents(".popover");
    $(target).hide();
  });
});

// maxlength
function maxLengthCheck(object) {
  if (object.value.length > object.maxLength) {
    object.value = object.value.slice(0, object.maxLength);
  }
}
// 전화번호 체크
function formatPhoneNumber() {
  var phoneChk = document.getElementById("phone");
  if (phoneChk) {
    phoneChk.addEventListener("input", function () {
      // 현재 입력된 값
      var inputValue = this.value;
      // 숫자 이외의 문자는 모두 제거
      var phoneNumber = inputValue.replace(/\D/g, "");
      // 전화번호 형식에 맞게 "-" 추가
      var formattedNumber = phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
      // 입력된 값을 형식에 맞게 업데이트
      this.value = formattedNumber;
    });
  }
}

// 각 버튼에 클릭 이벤트 추가
var buttons = document.querySelectorAll(".btn");
buttons.forEach(function (button) {
  button.addEventListener("click", function () {
    // 클릭한 버튼의 data-target 속성 값을 가져옴
    var targetId = this.getAttribute("data-target");

    // 해당하는 id를 가진 요소를 보여줌
    var targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.checked = true;
      updateSendButtonClass();
    }
  });
});

// 공통 모달 열기 (메시지 추가, 모달 버튼 포커스)
// Common Alert Modal
$.alertMessage = function (title, contents, alertObj) {
  // 모달 제목 설정
  alertObj.find("#alertTitle").html(title);

  // 내용을 HTML로 설정 (br 태그 등이 포함된 경우를 위해)
  alertObj.find(".prompt-contents").html(contents);

  // 모달 열기
  alertObj.show().focus();
  
  // 모달 위치 조정
  var thisDialog = alertObj.find(".modal-dialog");
  var marginValue = thisDialog.outerHeight() / 2;
  thisDialog.css("margin-top", "-" + marginValue + "px");
  
  // 바디 스크롤 제거
  scrollOff();
};

$(document).ready(function () {
  // 페이지 로드 시 스크롤 위치 초기화
  scrollHeight = 0;
  $(document).scrollTop(0);
  
  $(".modal").on("click", function (event) {
    if ($(event.target).closest(".modal-dialog").length > 0) {
    } else {
      // modalBalanceStandard의 경우 이 핸들러는 실행하지 않음 (design_renewal.js에서 처리)
      if ($(this).attr("id") === "modalBalanceStandard") {
        return false;
      }
      // modal-slide 클래스를 가진 모달 중 modalAccountSelect와 modalSlide02는 제외하지 않음 (외부 클릭 닫기 동작해야 함)
      // modalSlide02는 슬라이드 모달이므로 modalCloseSlide()로 닫기
      if ($(this).attr("id") === "modalSlide02") {
        if (typeof modalCloseSlide === "function") {
          modalCloseSlide();
        } else {
          modalClose();
        }
        return false;
      }
      // 다른 modal-slide 모달들은 design_renewal.js에서 처리하므로 제외
      if ($(this).hasClass("modal-slide") && $(this).attr("id") !== "modalAccountSelect") {
        return false;
      }
      modalClose();
    }
  });
});

$.popupMessage = function (title, contents, alertObj) {
  $("#popupTitle").html(title);
  $("#popupContents").html(contents);
  modalOpen(alertObj.attr("id"));
  setTimeout(() => {
    $("#commonPopup").hide();
    scrollOn();
  }, 1000);
};

$.promptMessage = function (title, ...rest) {
  // 마지막 인자는 promptObj, 나머지는 콘텐츠로 처리
  const promptObj = rest.pop(); // 마지막은 모달 요소
  const contents = rest; // 나머지는 문단 내용

  promptObj.find(".prompt-title").html(title);

  // 각각의 문장을 <div>로 감싸기 (p 태그 중첩 방지)
  const formattedContents = contents
    .map((line) => `<div class="line">${line}</div>`)
    .join("");

  promptObj.find(".prompt-contents").html(formattedContents);

  modalOpen(promptObj.attr("id"));
};


document.addEventListener("DOMContentLoaded", function () {
  var btnGroup = document.querySelectorAll(".btn-group li");

  if (btnGroup) {
    // 각 li 요소에 대해 이벤트 리스너 추가
    btnGroup.forEach(function (li, index) {
      li.addEventListener("click", function () {
        // 모든 li에서 active 클래스 제거
        btnGroup.forEach(function (item) {
          item.classList.remove("active");
        });

        // 클릭된 li에 active 클래스 추가
        this.classList.add("active");
      });
    });
  }
});

// 최하단 버튼 활성화
// input 요소에 대한 NodeList를 가져옵니다.
var inputs = document.querySelectorAll('input[type="text"]');
// send 버튼의 요소를 가져옵니다.
var sendButton = document.getElementById("send");

// input 요소에 대해 각각의 입력 이벤트를 추가합니다.
inputs.forEach(function (input) {
  input.addEventListener("input", function () {
    // 입력할 때마다 모든 input 요소에 값이 있는지 확인합니다.
    var allValuesEntered = true;
    inputs.forEach(function (input) {
      if (input.value.trim() === "") {
        allValuesEntered = false;
      }
    });

    // 만약 모든 input 요소에 값이 들어가 있으면 send 버튼의 disabled 속성을 해제합니다.
    if (allValuesEntered) {
      sendButton.removeAttribute("disabled");
    } else {
      sendButton.setAttribute("disabled", "disabled");
    }
  });
});

var inputs = document.querySelectorAll("input[type=text], input[type=password], input[type=tel], input[type=email], input[type=number], select, textarea, .input");
var rows = document.querySelectorAll(".input input, .input select");

// Input Focus
inputs.forEach(function (input) {
  input.addEventListener("focus", function () {
    this.classList.add("focus");
  });
  input.addEventListener("blur", function () {
    this.classList.remove("focus");
  });
});

// Blur initially
inputs.forEach(function (input) {
  input.blur();
});

// 모든 popover 숨기기 함수
function hideAllPopovers() {
  document.querySelectorAll('.popover').forEach(popover => {
    popover.style.display = 'none';
  });
}

// 툴팁 토글 함수
function toggleTooltip(button) {
  hideAllPopovers();
  
  const popover = button.nextElementSibling;
  if (popover && popover.classList.contains('popover')) {
    const isVisible = popover.style.display !== 'none';
    popover.style.display = isVisible ? 'none' : 'block';
  }
}

// 외부 클릭 시 툴팁 닫기 함수
function closeTooltipOnOutsideClick(e) {
  if (
    !e.target.closest('.btn-tooltip') &&
    !e.target.closest('.popover')
  ) {
    hideAllPopovers();
  }
}

// 이벤트 리스너 등록
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('btn-tooltip')) {
    e.preventDefault();
    toggleTooltip(e.target);
  }
});

document.addEventListener('click', closeTooltipOnOutsideClick);

// progress-steps의 step 개수에 따라 클래스 자동 추가
$(document).ready(function() {
  $('.progress-steps').each(function() {
    var stepCount = $(this).find('.step').length;
    // 기존 클래스 제거
    $(this).removeClass('steps-2 steps-3 steps-4');
    // step 개수에 따라 클래스 추가
    if (stepCount === 2) {
      $(this).addClass('steps-2');
    } else if (stepCount === 3) {
      $(this).addClass('steps-3');
    } else if (stepCount === 4) {
      $(this).addClass('steps-4');
    }
  });
});

// 키패드 열릴 때
document.getElementById("wrap").classList.add("keypad-on");

// 키패드 닫힐 때
document.getElementById("wrap").classList.remove("keypad-on");

(function () {
  var ua = navigator.userAgent || navigator.vendor || window.opera;

  // iPhone / iPad / iPod 체크
  var isIOS = /iP(hone|ad|od)/i.test(ua);

  if (isIOS) {
    // <html class="is-ios"> 형태로 클래스 추가
    document.documentElement.classList.add('is-ios');
  }
})();
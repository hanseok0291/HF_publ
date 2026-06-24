// form
$(function () {
  var input = $(
    "input[type=text], input[type=password], input[type=tel], input[type=email], input[type=number], select, textarea, .input"
  );
  var row = $(".input input, .input select, .input .select");

  // input Focus
  input
    .on("focus", function () {
      $(this).addClass("focus");
      $(".bottom-banner-area.fixed").addClass("hidden-mobile");
      $(this).parents(".input-container").addClass("focus-on");

      var floatingLabel = $(this)
        .closest(".input-container")
        .find(".floating-label");

      // .label-error가 있으면 기존 문구 유지
      if ($(this).closest(".input-container").hasClass("label-error")) {
        return;
      }

      // .floating-label.first 텍스트를 변경
      if ($(this).closest(".input-container").hasClass("focus-on")) {
        var floatingLabel = $(this)
          .closest(".input-container")
          .find(".floating-label");

        // id-number 클래스 처리
        if ($(this).closest(".id-number").length) {
          floatingLabel.text("주민 등록 번호 앞 7자리");
        }
        // type-text 클래스 처리
        else if ($(this).closest(".type-text").length) {
          floatingLabel.text("텍스트");
        }
        // type-timer 클래스 처리
        else if ($(this).closest(".type-timer").length) {
          floatingLabel.text("인증 번호");
        }
      }
    })
    .on("blur", function () {
      $(this).removeClass("focus");
      $(".bottom-banner-area.fixed").removeClass("hidden-mobile");
      $(this).parents(".input-container").removeClass("focus-on");

      // id-number 하위 input인 경우, 값이 비어 있지 않으면 focus-on 유지
      var hasValue = false;
      $(this)
        .parents(".input-container")
        .find("input, select, textarea")
        .each(function () {
          if ($(this).val().trim() !== "") {
            hasValue = true;
          }
        });

      // input에 값이 있으면 focus-on 유지, 없으면 제거
      if (hasValue) {
        $(this).parents(".input-container").addClass("comp"); // .comp 클래스 추가 (값이 있을 때)

        var inputContainer = $(this).closest(".input-container");

        if (inputContainer.length && inputContainer.hasClass("label-error")) {
          return;
        }

        // id-number 하위 input인 경우, 텍스트가 "주민 등록 번호 앞 7자리"로 유지되도록 설정
        if ($(this).closest(".id-number").length) {
          $(this).parents(".input-container").addClass("fill");
          var floatingLabel = $(this)
            .closest(".input-container")
            .find(".floating-label");
          floatingLabel.text("주민 등록 번호 앞 7자리");
        }
      } else {
        $(this).parents(".input-container").removeClass("focus-on");
        $(this).parents(".input-container").removeClass("comp");

        // id-number 하위 input인 경우, 원래 텍스트로 복원 ("생년월일")
        if ($(this).closest(".id-number").length) {
          $(this).parents(".input-container").removeClass("fill");
          var floatingLabel = $(this)
            .closest(".input-container")
            .find(".floating-label");
          floatingLabel.text("생년월일");
        }
        // type-text 하위 input인 경우, 원래 텍스트로 복원 ("텍스트 입력")
        else if ($(this).closest(".type-text").length) {
          var floatingLabel = $(this)
            .closest(".input-container")
            .find(".floating-label");
          floatingLabel.text("텍스트를 입력 하세요");
        }
        // type-timer 하위 input인 경우, 원래 텍스트로 복원 ("6자리 숫자 입력")
        else if ($(this).closest(".type-timer").length) {
          var floatingLabel = $(this)
            .closest(".input-container")
            .find(".floating-label");
          floatingLabel.text("6자리 숫자 입력");
        }
      }
    });

  row
    .on("focus", function () {
      $(this).parents(".input").addClass("focus");
      $(this).removeClass("focus");
    })
    .blur(function () {
      $(this).parents(".input").removeClass("focus");
    })
    .blur();

  var totalInputLength = 0;
  if ($(".id-number").length) {
    $(".id-number input")
      .on("input change", function () {
        totalInputLength = 0;
        var inputContainer = $(this).closest(".id-number");
        var input = inputContainer.find("input");
        input.each(function (i, e) {
          var inputLength = $(e).val().length;
          totalInputLength += inputLength;
          if (i === 0 && inputLength === 6) {
            input[1].focus();
            inputContainer.addClass("focus-on");
          }
        });
        if (totalInputLength > 0) {
          inputContainer.find(".icon-del").show();
        } else {
          inputContainer.find(".icon-del").hide();
        }
      })
      .on("blur", function () {
        $(this).closest(".id-number").find(".icon-del").hide();
      })
      .on("focus", function () {
        if (totalInputLength > 0) {
          $(this).closest(".id-number").find(".icon-del").show();
        } else {
          $(this).closest(".id-number").find(".icon-del").hide();
        }
      });
  }

  $(".toggle-switch").on("click", function () {
    $(this).toggleClass("active");
  });

  if($(".modal-terms").length > 0){
    var $h2 = $(".modal-terms h2");
    var text = $h2.text().trim();
    $h2.html(`<span>${text}</span>`);
    $('.modal-terms .modal-content').on('scroll', function(){
      var terms_title = $(".modal-terms .title-text");
      var top = terms_title.offset().top;
      // console.log(terms_title.offset().top)
      if(top === 16) {
        $(this).addClass("fixed");
      } else if(top > 17) {
        $(this).removeClass("fixed");
      }
    });
  }
});

// 바디 스크롤 제거/해제
var scrollHeight = 0;
function scrollOff() {
  scrollHeight = $(document).scrollTop();
  $("body").addClass("modal-open");
  $("#wrap").css("position", "fixed");
  $("#wrap").css("top", -scrollHeight);
  $("#header").css("top", "-0.9px");
}
function scrollOn() {
  $("body").removeClass("modal-open");
  $("#wrap").css("top", 0);
  $("#wrap").css("position", "relative");
  $("#header").css("top", "-1px");
  $(document).scrollTop(scrollHeight);
}

// 레이어 팝업(모달) 열기
function modalOpen(obj) {
  var temp = $("#" + obj);
  temp.show();
  scrollOff(); // 바디 스크롤 제거

  // 위치
  var thisDialog = temp.children(".modal-dialog");
  var marginValue = thisDialog.outerHeight() / 2;
  $(thisDialog).css("margin-top", "-" + marginValue + "px");

  // js-modal-close 버튼 클릭 시 모달 닫기 실행
  temp.find(".js-modal-close").on("click", function () {
    modalClose();
  });
}

// 얼럿 (모달) 닫기
function modalCloseAlert() {
  $(".modal").hide();
  scrollOn(); // 바디 스크롤 제거 해제

  // vertical 클래스 제거
  const footer = document.querySelector("#commonPrompt .modal-footer");
  if (footer && footer.classList.contains("vertical")) {
    footer.classList.remove("vertical");
  }
}

// 레이어 팝업(풀모달) 닫기
function modalClose() {
  $(".modal-full").hide();
  scrollOn(); // 바디 스크롤 제거 해제
}

// bottom modal(슬라이드모달) 닫기
function modalCloseSlide() {
  $(".modal-slide").fadeOut(200);
  $(".modal-slide").find(".modal-content").animate({ bottom: modalH }, 200);

  // 이중 모달이 아닌 경우
  if (!$(".modal-slide").hasClass("depth2")) {
    scrollOn(); // 바디 스크롤 제거 해제
  }
}

function modalClose(obj) {
  if (obj != null && obj != undefined && obj != "") {
    var temp = $("#" + obj);
    temp.hide();
  } else {
    $(".modal-full").hide();
  }
  scrollOn(); // 바디 스크롤 제거 해제
}

// 레이어 팝업(모달) 닫기 (오류 페이지 외)
function modalAllClose() {
  $(".modal").hide();
  $("body").removeClass("modal-open"); // 바디 스크롤 제거 해제
}

// 모달 내에서 또다른 모달이 열렸을때 닫기
function modalCloseSubAlert() {
  // 클릭한 버튼이 속한 모달 찾기
  var clickedModal = $(event.target).closest(".modal");

  // 해당 모달만 닫기
  clickedModal.hide();
}

// 레이어 애니메이션 외
$(function () {
  // 셀렉트 옵션 선택(통신사, 머니 충전 계좌, 이용내역 필터 등)
  $(".modal-slide .btn-list .btn").click(function () {
    $(this).parents(".btn-list").find(".btn").removeClass("on");
    $(this).addClass("on");
  });

  // 모든 input 및 select-box 요소의 값이 채워져 있는지 확인하는 함수
  function checkAllInputsAndSelects() {
    const allInputs = document.querySelectorAll(".section input");
    const allSelectBoxes = document.querySelectorAll(".select-box");

    // 모든 input 요소가 채워졌는지 확인
    const inputsFilled = Array.from(allInputs).every(
      (input) => input.value.trim() !== ""
    );
    // 모든 select-box 요소에 comp 클래스가 있는지 확인
    const selectsFilled = Array.from(allSelectBoxes).every((box) =>
      box.classList.contains("comp")
    );

    return inputsFilled && selectsFilled;
  }

  // input 삭제 버튼
  document.querySelectorAll(".js-text-del").forEach((button) => {
    button.addEventListener("mousedown", function (e) {
      e.preventDefault();
      const inputField =
        this.closest(".input-container").querySelectorAll(".custom-input");
      $(this).closest(".input-container").find(".icon-eye").hide();
      inputField.forEach((e, i) => {
        e.value = "";
        if (i === 0) {
          e.focus();
        }
      });
      if (this.closest(".id-number")) {
        this.style.display = "none";
      }
    });
  });

  $(".input-container.password input").on("input", function () {
    if ($(this).val().length > 0) {
      $(this).closest(".input-container").find(".icon-eye").show();
    } else {
      $(this).closest(".input-container").find(".icon-eye").hide();
    }
  });

  $(".icon-eye").on("mousedown", function () {
    if ($(this).hasClass("icon-eye-off")) {
      $(this).parent().find("input").attr("type", "text");
      $(this).removeClass("icon-eye-off").addClass("icon-eye-on");
    } else {
      $(this).parent().find("input").attr("type", "password");
      $(this).removeClass("icon-eye-on").addClass("icon-eye-off");
    }
  });

  // 검색 인풋
  $(".input-container.search input").on("input", function (e) {
    showCountryList(e.target.value.trim(), $(this).closest(".input-container"));
  });

  $(".input-container.search input").on("focus", function () {
    showCountryList($(this).val().trim(), $(this).closest(".input-container"));
  });

  function showCountryList(searchValue, $inputContainer) {
    var countryList = $inputContainer.attr("data-country");
    var countryArray = JSON.parse(countryList);

    var $searchList = $inputContainer.find(".search-list");

    // <ul> 요소가 없으면 생성
    if ($searchList.length === 0) {
      $searchList = $("<ul class='search-list'></ul>").appendTo(
        $inputContainer
      );
    }

    // 기존 <ul> 내용 지우기
    $searchList.empty();

    // 일치하는 항목 찾기
    var matchedItems = countryArray.filter(function (country) {
      return country.toLowerCase().includes(searchValue.toLowerCase());
    });

    // 일치하는 항목이 있을 경우 <li> 추가 및 <ul> 표시, 없으면 숨기기
    if (matchedItems.length > 0) {
      matchedItems.forEach(function (country) {
        $searchList.append(`<li>${country}</li>`);
      });
      $searchList.show(); // 일치하는 항목이 있을 때만 표시
    } else {
      $searchList.hide(); // 일치하는 항목이 없으면 숨기기
    }
  }

  // blur 시 <ul> 숨기기
  $(".input-container.search input").on("blur", function () {
    var $this = $(this);
    setTimeout(function () {
      $this.closest(".input-container").find(".search-list").hide();
    }, 10);
  });

  // <li> 클릭 시 해당 항목의 텍스트를 <input>에 설정하고 <ul> 숨기기
  $(document).on("click", ".search-list li", function () {
    var selectedCountry = $(this).text();
    var $input = $(this).closest(".input-container").find("input");
    $input.val(selectedCountry); // 선택한 텍스트를 <input> 값으로 설정
    $(this).closest(".search-list").hide(); // 리스트 숨기기
  });

  /* 비밀번호 입력 */
  // $(".input-container.password input").on("input", function () {
  //   if ($(this).val().length > 0) {
  //     $(this).closest(".input-container").find(".icon-eye").show();
  //   } else {
  //     $(this).closest(".input-container").find(".icon-eye").hide();
  //   }
  // });
});

// 레이아웃, 토글
$(function () {
  // 하단 fixed + 본문 스크롤 — content-foot-fixed 레이아웃
  function updateContentScrollPadding() {
    var $layout = $("#content.content-foot-fixed");
    if (!$layout.length) {
      return;
    }

    var $foot = $layout.find(".bottom-area");
    var $scroll = $layout.find(".content-scroll");

    if ($foot.length && $scroll.length) {
      $scroll.css("padding-bottom", $foot.outerHeight(true));
    }
  }
  window.updateContentScrollPadding = updateContentScrollPadding;

  // 짧은 화면 버튼 하단 고정
  function fixFootBtn() {
    // requestAnimationFrame으로 DOM 렌더링 완료 후 실행
    requestAnimationFrame(function () {
      // content-foot-fixed — 항상 하단 fixed + 본문 스크롤
      if ($("#content.content-foot-fixed").length) {
        $("#content.content-foot-fixed .bottom-area").addClass("fixed");
        updateContentScrollPadding();
        return;
      }

      // visualViewport API가 있으면 사용 (모바일에서 더 정확)
      var winHeight = window.visualViewport 
        ? window.visualViewport.height 
        : $(window).innerHeight();
      
      // 콘텐츠 높이 계산 (스크롤 포함)
      var contentHeight = $("#content").outerHeight(true);
      var gap = winHeight - contentHeight; // 콘텐츠가 짧은 경우

      if (gap >= 0) {
        $(".bottom-area").addClass("fixed");
        $("#content.newType .bottom-area").removeClass("fixed");
        $(".layout-payment .bottom-area").removeClass("fixed");
        /* 계좌 충전 v2 — wrap flex + visualViewport 높이 연동 */
        $(".bottom-area.charge-account-v2-foot").removeClass("fixed");
        $(".bottom-area.withdrawal-v2-foot").removeClass("fixed");
      } else {
        $(".bottom-area").removeClass("fixed");
      }
    });
  }
  
  // 초기 실행 (약간의 지연을 주어 DOM이 완전히 렌더링된 후 실행)
  setTimeout(fixFootBtn, 100);
  
  // 이미지 로딩 완료 후에도 재계산
  $(window).on('load', function() {
    setTimeout(fixFootBtn, 100);
  });

  // 하단 고정 영역 여백 확보
  function wrapPadding() {
    if ($("#content.content-foot-fixed").length) {
      updateContentScrollPadding();
      return;
    }

    var fixFoot = $(".bottom-area.fixed:visible");
    const matchesMediaQuery = window.matchMedia(
      "(max-width:999px) and (orientation:landscape)"
    ).matches;
    const matchesSpecialSize = window.matchMedia(
      "(min-width:690px) and (max-width:720px) and (min-height:720px) and (max-height:750px)"
    ).matches;

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    if (fixFoot.length > 0 && (!matchesMediaQuery || matchesSpecialSize)) {
      var fixFootHeight = $(fixFoot).innerHeight();
      // $("#content").css("padding-bottom", fixFootHeight);
      $(".wrap.oneStore").removeClass("horizontal");
    } else {
      $(".wrap.oneStore").addClass("horizontal");
      $("#content").css("padding-bottom", 20);
    }

    // fold 6 대응
    if (matchesSpecialSize) {
      console.log("matchesSpecialSize:", matchesSpecialSize);
      var fixFootHeight = $(fixFoot).innerHeight();
      $("#content").addClass("fold-style");
      $("#content").css("padding-bottom", fixFootHeight);
      $(".wrap.oneStore").removeClass("horizontal");

      // accNo input 요소에 대한 포커스/블러 이벤트 처리
      $("#accNo").on("focus", function () {
        // 포커스가 될 때 .bottom-area에 fold-top-0 클래스 추가
        $(".bottom-area").addClass("fold-top-0");
      });

      $("#accNo").on("blur", function () {
        // 포커스가 해제될 때 .bottom-area에서 fold-top-0 클래스 제거
        $(".bottom-area").removeClass("fold-top-0");
      });
    } else {
      $("#content").removeClass("fold-style");
    }
  }
  wrapPadding();

  // 보안 키패드 상단 링크 위치
  function keypadOffset() {
    if ($(".kpd-wrap").length) {
      var keypadOffset = $(".kpd-wrap").offset().top; // 키패드 상단 오프셋
      var topAreaH = $(".keypad-top-area").innerHeight(); // 키패드 상단 영역 padding-bottom 포함 높이
      var keypadOffsetT = keypadOffset - topAreaH;
      $(".keypad-top-area").css("top", keypadOffsetT);
    }
  }
  keypadOffset();

  // 리사이즈 debounce 함수
  var resizeTimer;
  function handleResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      fixFootBtn();
      wrapPadding();
      keypadOffset();
    }, 150);
  }

  // 리사이즈 이벤트
  $(window).on('resize', handleResize);
  
  // visualViewport 이벤트 (모바일 브라우저 주소창 변화 대응)
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', handleResize);
    window.visualViewport.addEventListener('scroll', handleResize);
  }
  
  // 화면 회전 이벤트
  $(window).on('orientationchange', function () {
    setTimeout(function () {
      fixFootBtn();
      wrapPadding();
      keypadOffset();
    }, 300);
  });

  // popover
  $(".open-popover").click(function () {
    $(this).next().toggleClass("hidden");
  });
});

// 하단 레이어 팝업(슬라이드 모달) 기본 세팅
var modalCont = $(".modal-info .modal-content");
var modalH = $(window).height();
modalH = modalH * -1;
$(modalCont).css("bottom", modalH); // 팝업들 bottom 값 setting

// 하단 레이어 팝업(슬라이드 모달) 열기
function modalOpenSlide(obj) {
  var temp = $("#" + obj);
  var modalCont = $(temp).find(".modal-content");
  var containHeight;
  var contentsHeight;
  setTimeout(function () {
    containHeight = modalCont[0].querySelector(".modal-body").clientHeight;
    contentsHeight = modalCont[0].querySelector(".modal-body").scrollHeight;
    if (containHeight < contentsHeight) {
      modalCont.addClass("scroll");
    }
  }, 100);

  $(modalCont[0])
    .find(".modal-body")
    .on("scroll", function () {
      var bodyScrollTop = $(this).scrollTop();
      if (contentsHeight - containHeight - 60 <= bodyScrollTop) {
        $(modalCont[0]).removeClass("scroll");
      } else {
        $(modalCont[0]).addClass("scroll");
      }
    });

  temp.show();
  $(modalCont).animate({ bottom: 0 }, 200);
  // 이중 모달이 아닌 경우
  if (obj === "modal-useCoupon") {
    $("body").addClass("modal-open");
  } else if (!$(this).hasClass("depth2")) {
    scrollOff(); // 바디 스크롤 제거
  }

  // 팝업 내 하단 버튼 클릭 시 팝업 닫힘
  else
    $(temp)
      .find(".modal-footer .btn")
      .on("click", function (e) {
        if (!$(this).hasClass("not-close")) {
          modalCloseSlide();
        }
      });

  // 모달 외부 클릭 시 닫기 처리
  temp.on("click", function (e) {
    // 외부를 클릭했는지 확인
    if (
      !$(e.target).closest(".modal-content").length &&
      !temp.hasClass("not-dim-close")
    ) {
      // 열린 모달 확인 (display: block 기준)
      const openedModal = $(".modal:visible"); // 현재 보이는 모달 선택
      if (openedModal.attr("id") === "modal-select-bank") {
        $("#btnHidden").show();
      }
      modalCloseSlide(); // 모달 닫기
    }
  });
  // js-modal-close 버튼 클릭 시 모달 닫기 실행
  temp
    .find(".js-modal-close")
    .off("click")
    .on("click", function () {
      if (temp.hasClass("alert-check")) {
        const $changeBtn = $(".js-change-btn"); // 해당 버튼을 찾기
        const title = $changeBtn.data("title") || "";
        const message = $changeBtn.data("message") || "";
        const cancelText = $changeBtn.data("cancel") || "취소";
        const confirmText = $changeBtn.data("confirm") || "확인";

        // `commonPrompt` 모달 내부 요소에 텍스트 설정
        $("#promptTitle2").html(title);
        $("#promptContents2").html(message);
        $("#commonPrompt2 .btn-cancel").html(cancelText);
        $("#commonPrompt2 .btn-confirm").html(confirmText);

        // `commonPrompt` 모달 열기
        modalOpen("commonPrompt2");
      } else {
        modalCloseSlide();
      }
    });

  // 클릭된 버튼의 부모 select-box에 comp 클래스 추가
  let button;
  let selectBox;

  $(".select-box").each(function (i, e) {
    const $button = $(e).find("button"); // 현재 순회 중인 select-box의 버튼
    if (obj === $button.attr("data-target")) {
      selectBox = $(e); // data-target과 obj가 일치하는 select-box 설정
    } else {
      const button = $(e.currentTarget); // 이벤트 핸들러에서 전달된 이벤트 객체를 사용
      selectBox = button.closest(".select-box"); // 부모 select-box 찾기
    }
  });

  // 모달 높이가 큰 경우 포지션 변경
  function modalContPos() {
    var modalContent = temp.find(".modal-content");
    var modalContentH = temp.find(".modal-content").height();
    var modalDialogH = temp.find(".modal-dialog").height();
    var gap = modalDialogH - modalContentH;
    if (gap < 0) {
      modalContent.css("position", "absolute");
    } else {
      modalContent.css("position", "fixed");
    }
  }
  modalContPos();

  // 리사이즈
  $(window).resize(function () {
    modalContPos();
  });

  // 리스트에서 선택한 항목을 버튼에 반영
  $(".option-item button").on("click", function () {
    var selectedBank = $(this).text().trim(); // 선택한 이름 가져오기
    var selectBox = $(".select-input");
    if (selectBox && selectBox.find(".label").length > 0) {
      selectBox.find(".label").text(selectedBank); // 버튼에 텍스트 업데이트
    }
    if (selectBox) {
      selectBox.addClass("comp");
    }
    $("#btnHidden").hide();

    // step-list에서 현재 on 클래스가 있는 li 찾고 다음 li에 on 클래스 추가
    var currentStep = $(".step-list li.on"); // 현재 on 클래스가 있는 li
    var nextStep = currentStep.next("li"); // 다음 li 요소 찾기

    // 다음 li가 있을 경우에만 on 클래스 추가
    if (nextStep.length) {
      nextStep.addClass("on"); // 다음 li에 on 클래스 추가
    }
    modalCloseSlide(); // 모달 닫기
  });
}

// 토스트 팝업 노출 비노출
function modalToastOpen(id) {
  $(".modal-toast").hide();
  clearTimeout(toastTimeout);
  var toastId = $("#" + id);
  toastId.fadeIn();
  var toastTimeout = setTimeout(function () {
    toastId.addClass('toast-view');
  }, 100);
  var toastTimeout = setTimeout(function () {
    toastId.removeClass('toast-view');
  }, 2000);
  var toastTimeout = setTimeout(function () {
    toastId.fadeOut();
  }, 3000);
}

// 버튼 클릭시 텍스트 변경
document.querySelectorAll(".js-change-btn").forEach((button) => {
  button.addEventListener("click", function () {
    const title = this.dataset.title || ""; // 버튼의 데이터 속성에서 제목 가져오기
    const message = this.dataset.message || ""; // 버튼의 데이터 속성에서 메시지 가져오기
    const cancelText = this.dataset.cancel || "취소"; // 취소 버튼 텍스트
    const confirmText = this.dataset.confirm || "확인"; // 확인 버튼 텍스트
    const showCancel = this.dataset.showCancel !== "false"; // 취소 버튼 표시 여부

    // 모달 내용 업데이트
    document.getElementById("promptTitle").innerHTML = title;
    document.getElementById("promptContents").innerHTML = message;
    document.querySelector("#commonPrompt .btn-cancel").innerHTML = cancelText;
    document.querySelector("#commonPrompt .btn-confirm").innerHTML =
      confirmText;

    // 취소 버튼 표시/숨기기
    const cancelButton = document.getElementById("promptNo");
    if (cancelButton) {
      if (showCancel) {
        cancelButton.style.display = "inline-block";
        cancelButton.innerHTML = cancelText;
      } else {
        cancelButton.style.display = "none";
      }
    }

    // 모달 표시 (여기서 modalOpen은 모달을 여는 함수로 가정)
    modalOpen("commonPrompt");
  });
});

// 공통 얼럿 호출 함수
function showAlertModal({
  title,
  message,
  confirmText = "확인",
  cancelText = "취소",
  noShowBtn = "7일 동안 안보기",
  showCancel = true,
  vertical = false,
  styleType = "default",
  onConfirm = null,
} = {}) {
  document.getElementById("executeTitle").innerHTML = title || "";
  document.getElementById("executeContents").innerHTML = message || "";
  document.getElementById("executeOk").innerHTML = confirmText;
  document.getElementById("executeNo").innerHTML = cancelText;
  document.getElementById("executeNoShow").innerHTML = noShowBtn;

  const cancelButton = document.getElementById("executeNo");
  cancelButton.style.display = showCancel ? "inline-block" : "none";

  const modal = document.getElementById("commonExecute");
  const footer = modal.querySelector(".modal-footer");
  footer.classList.toggle("vertical", vertical);

  // styleType 처리
  modal.classList.remove("type2");
  if (styleType && styleType !== "default") {
    modal.classList.add(styleType);
  }

  modalOpen("commonExecute");

  const okButton = document.getElementById("executeOk");
  const clone = okButton.cloneNode(true);
  okButton.parentNode.replaceChild(clone, okButton);

  clone.addEventListener("click", function () {
    modalCloseAlert();
    if (typeof onConfirm === "function") {
      onConfirm();
    }
  });
}

// 버튼 클릭 시 분기 처리
document.querySelectorAll(".js-alert-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const type = btn.dataset.execute;
    const noShowBtn = document.getElementById("executeNoShow");

    if (type === "long") {
      showAlertModal({
        title: "고객확인제도 재이행 대상이에요.",
        message:
          "<p class='execute-title'>재이행 기간: YYYY-MM-DD까지</p>" +
          "<div class='execute-wrap'>" +
          "[특정금융정보법] 시행령 재 10조6에 따라<br>" +
          "고객확인 재이행 기간이 도래하여<br>" +
          "정보 재등록이 필요해요.<br>" +
          "기한 내 고객확인을 이행하지 않을 경우 관련 법에<br>" +
          "따라 서비스 이용이 제한됩니다." +
          "</div>" +
          "<p class='execute-text-wrap'>고객확인 중 추가 심사가 진행될 수 있으며,<br>" +
          "추가 심사 결과는 별도로 안내해드릴게요.</p>",
        confirmText: "재입력하기",
        cancelText: "다음에",
        showCancel: true,
        vertical: true,
      });

      if (noShowBtn) {
        noShowBtn.style.display = "block";
        noShowBtn.innerText = "7일 동안 안보기";
        noShowBtn.onclick = function () {
          modalCloseAlert();
          localStorage.setItem(
            "hideExecuteModal",
            Date.now() + 7 * 24 * 60 * 60 * 1000
          );
        };
      }
    } else if (type === "soon") {
      showAlertModal({
        title: "고객확인제도 재이행 대상이에요.",
        message:
          "<p class='execute-title'>재이행 기간: YYYY-MM-DD까지</p>" +
          "<div class='execute-wrap'>" +
          "[특정금융정보법] 시행령 재 10조6에 따라<br>" +
          "고객확인 재이행 기간이 도래하여<br>" +
          "정보 재등록이 필요해요.<br>" +
          "기한 내 고객확인을 이행하지 않을 경우 관련 법에<br>" +
          "따라 서비스 이용이 제한됩니다." +
          "</div>" +
          "<p class='execute-text-wrap'>고객확인 중 추가 심사가 진행될 수 있으며,<br>" +
          "추가 심사 결과는 별도로 안내해드릴게요.</p>",
        confirmText: "재입력하기",
        cancelText: "다음에",
        showCancel: true,
        vertical: true,
      });

      if (noShowBtn) {
        noShowBtn.style.display = "block";
        noShowBtn.innerText = "하루 동안 안보기";
        noShowBtn.onclick = function () {
          modalCloseAlert();
          // 여기에 '하루 동안 안보기' 기능 추가
          localStorage.setItem(
            "hideExecuteModal",
            Date.now() + 1 * 24 * 60 * 60 * 1000
          );
        };
      }
    } else if (type === "info") {
      showAlertModal({
        title: "안전한 서비스 이용을 위해 고객확인을<br>먼저 진행해주세요.",
        message:
          "<div class='execute-wrap'>" +
          "라운드 페이에서는 자금 세탁 등으로부터 계좌를<br>" +
          " 보호하기 위해 고객님의 정보와 실제 계좌 소유 여부를정기적으로 확인하고 있습니다<br>" +
          "지금 바로 고객님의 정보를 업데이트 해주세요." +
          "</div>" +
          "<p class='execute-text-wrap'>고객확인을 통해 수집된 정보는 안전하게<br>" +
          "보호되고 있으며, 라운드 페이에서 제공하는<br>" +
          "모든 서비스에 함께 활용돼요.</p>",
        confirmText: "동의하고 진행하기",
        cancelText: "다음에",
        showCancel: true,
        showHideText: true,
        vertical: true,
      });

        if (noShowBtn) {
          noShowBtn.style.display = "none";
        }
      } else if (type === "type2") {
        showAlertModal({
          title: "본인인증으로 로그인할까요?",
          message:
            "<div class='execute-text-wrap'>휴대폰 본인인증으로 로그인할 경우 <br>앱 잠금이 해제됩니다.</div>",
          confirmText: "본인인증으로 로그인하기",
          cancelText: "취소",
          showCancel: true,
          vertical: true,
          styleType: "type2",
        });
      
        const noShowBtn = document.getElementById("executeNoShow");
        if (noShowBtn) {
          noShowBtn.style.display = "none";
        }
      }
  });
});

// 아이콘 버튼 클릭 시 > 형제 .pop-wrap 열기/닫기
document.querySelectorAll(".js-pop-toggle-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    const pop = this.parentElement.querySelector(".pop-wrap");
    if (!pop) return;

    const isVisible = getComputedStyle(pop).display !== "none";
    pop.style.display = isVisible ? "none" : "block";
  });
});

// 닫기 버튼 클릭 시 > 툴팁 닫기
document.querySelectorAll(".js-pop-close-btn").forEach((closeBtn) => {
  closeBtn.addEventListener("click", function (e) {
    e.stopPropagation();

    const pop = this.closest(".pop-wrap.tooltip-wrap");
    if (pop) {
      pop.style.display = "none";
    }
  });
});

// aos 하단버튼 스크롤 이슈
function adjustViewportHeight() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
window.addEventListener('resize', adjustViewportHeight);
window.addEventListener('load', adjustViewportHeight);

// 100dvh 적용 안되는 현상 수정
function updateVH() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('load', updateVH);
window.addEventListener('resize', updateVH);
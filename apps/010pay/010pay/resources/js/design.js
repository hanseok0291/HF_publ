// form
$(function () {
  var input = $("input[type=text], input[type=password], input[type=tel], input[type=email], input[type=number], select, textarea, .input");
  var row = $(".input input, .input select, .input .select");

  // input Focus
  input
    .focus(function () {
      $(this).addClass("focus");
      $(".bottom-banner-area.fixed").addClass("hidden-mobile"); //키패드 노출 시 하단 배너 영역 숨김 - 2020-03-09 추가
    })
    .blur(function () {
      $(this).removeClass("focus");
      $(".bottom-banner-area.fixed").removeClass("hidden-mobile"); //키패드 미노출 시 하단 배너 영역 보임 - 2020-03-09 추가
    })
    .blur();

  row
    .focus(function () {
      $(this).parents(".input").addClass("focus");
      $(this).removeClass("focus");
    })
    .blur(function () {
      $(this).parents(".input").removeClass("focus");
    })
    .blur();

  // input value 삭제 버튼
  $(".form-type input")
    .on("input change", function () {
      var $this = $(this);
      var visible = Boolean($this.val());
      $this.next(".form-control-clear").toggleClass("hidden", !visible);
    })
    .trigger("propertychange");
  $(".form-control-clear").on("click", function () {
    $(this).prev("input").val("").trigger("change").focus();
    $(this).toggleClass("hidden", true);
  });

  // 비밀번호 설정 입력상태 표시
  $(".input-mark input").bind("keyup input", function (e) {
    var keyCode = e.keyCode || e.which;
    var byte = $(this).val();
    var del = $(this).val() + 1;
    $(".input-mark .mark i").removeClass();
    if (byte.length == 1) {
      $(".input-mark .mark i:eq(0)").addClass("on");
    } else if (byte.length == 2) {
      $(".input-mark .mark i:eq(0), .input-mark .mark i:eq(1)").addClass("on");
    } else if (byte.length == 3) {
      $(".input-mark .mark i:eq(0), .input-mark .mark i:eq(1), .input-mark .mark i:eq(2)").addClass("on");
    } else if (byte.length == 4) {
      $(".input-mark .mark i:eq(0), .input-mark .mark i:eq(1), .input-mark .mark i:eq(2), .input-mark .mark i:eq(3)").addClass("on");
    } else if (byte.length == 5) {
      $(".input-mark .mark i:eq(0), .input-mark .mark i:eq(1), .input-mark .mark i:eq(2), .input-mark .mark i:eq(3), .input-mark .mark i:eq(4)").addClass("on");
    } else if (byte.length == 6) {
      $(".input-mark .mark i:eq(0), .input-mark .mark i:eq(1), .input-mark .mark i:eq(2), .input-mark .mark i:eq(3), .input-mark .mark i:eq(4), .input-mark .mark i:eq(5)").addClass("on");
    } else {
      $(".input-mark .mark i").removeClass();
    }
    // console.log(byte.length);
  });

  // IE9 이하 jquery.placeholder.js 적용
  $("input, textarea").placeholder();
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
}

// 레이어 팝업(모달) 닫기
function modalClose() {
  $(".modal").hide();
  scrollOn(); // 바디 스크롤 제거 해제
}

function modalCloseNoMove() {
  $(".modal").hide();
  // scrollOn(); // 바디 스크롤 제거 해제
}

function modalClose(obj) {
  if (obj != null && obj != undefined && obj != "") {
    var temp = $("#" + obj);
    temp.hide();
  } else {
    $(".modal").hide();
  }
  scrollOn(); // 바디 스크롤 제거 해제
}
function modalCloseNoMove(obj) {
  if (obj != null && obj != undefined && obj != "") {
    var temp = $("#" + obj);
    temp.hide();
  } else {
    $(".modal").hide();
  }
  // scrollOn(); // 바디 스크롤 제거 해제
}

// 레이어 팝업(모달) 닫기 (오류 페이지 외)
function modalAllClose() {
  $(".modal").hide();
  $("body").removeClass("modal-open"); // 바디 스크롤 제거 해제
}

// 레이어 애니메이션 외
$(function () {
  // 약관 네비 슬라이드
  $(".modal-terms .nav.owl-carousel").owlCarousel({
    items: 1,
    nav: true,
    dots: false,
    smartSpeed: 300,
  });

  // 약관 상세 팝업 > 제목 네비 > 시행일 표시 여백
  $(".modal-terms .nav.owl-carousel .select-sm").parents(".item").addClass("has-select");

  // 셀렉트 옵션 레이어 열기(통신사, 머니 충전 계좌, 이용내역 필터)
  $(".select-modal").click(function () {
    var selectId = $(this).attr("id");
    var optionLayer = "modal-" + selectId;
    var temp = $("#" + optionLayer);
    temp.show();
    temp.find(".modal-content").animate({ bottom: 0 }, 200);
    scrollOff(); // 바디 스크롤 제거

    // 셀렉트 옵션 선택, 레이어 닫기(텍스트 전달)
    temp.find(".btn-list .btn").click(function () {
      var thisOption = $(this).find("em").text();
      $("#" + selectId).text(thisOption);
    });
  });

  // 은행 선택 레이어 열기
  $(".bank-select").click(function () {
    $(".modal-banklist").show();
    $(".modal-banklist .modal-content").animate({ bottom: 0 }, 200);

    // 이중 모달 아닌 경우
    if (!$(this).hasClass("depth2")) {
      scrollOff(); // 바디 스크롤 제거
    }
  });

  // 모달 슬라이드 닫기(셀렉트 옵션, 은행 선택 레이어 팝업)
  $(".modal-slide .btn-close, .modal-slide .btn-list button, .modal-slide .bank-list button").click(function () {
    var temp = $(this).parents(".modal");
    $(temp).fadeOut(200);
    $(this).parents(".modal-content").animate({ bottom: -450 }, 200);
    $(".bank-list").scrollTop(0);

    // 이중 모달 아닌 경우
    if (!$(temp).hasClass("depth2")) {
      scrollOn(); // 바디 스크롤 제거 해제
    }
  });

  // 셀렉트 옵션 선택(통신사, 머니 충전 계좌, 이용내역 필터 등)
  $(".modal-slide .btn-list .btn").click(function () {
    $(this).parents(".btn-list").find(".btn").removeClass("on");
    $(this).addClass("on");
  });

  // 슬라이드 모달, 은행 선택 레이어 닫기
  $(".modal-banklist, .modal-slide").click(function (e) {
    if (!$(".modal-content").has(e.target).length && !$("#wrap").hasClass("gigworker")) {
      $(this).fadeOut(200);
      $(this).find(".modal-content").animate({ bottom: -450 }, 200);
      $(".bank-list").scrollTop(0);

      // 이중 모달 아닌 경우
      if (!$(this).hasClass("depth2")) {
        scrollOn(); // 바디 스크롤 제거 해제
      }
    }
  });

  // 은행 선택 버튼에 은행명 전달, 선택 은행 표시
  $(".modal-banklist .bank-list button").click(function () {
    //2021.08.15 00~04 기업은행 점검 등록 불가
    if ($(this).attr("name") == "003") {
      //month : 0(1월) ~ 11(12월)
      var startDate = new Date(2021, 07, 15, 00, 00, 00);
      var endDate = new Date(2021, 07, 15, 04, 59, 59);
      var nowDate = new Date();

      if (startDate < nowDate && nowDate < endDate) {
        $.alertMessage("", "기업은행 점검 시간입니다.<br/>(2021.08.15 00:00 ~ 05:00)", $("#commonAlert"));
        $("#bankCd").val("");
        $(".bank-select").html("목록에서 선택");
        $(":focus").blur();
        return;
      }
    }

    $(this).parents(".bank-list").find("button").removeClass("active");
    $(this).addClass("active");
    var bankCd = $(this).html();
    $(".bank-select").html(bankCd);
    $(".bank-list").scrollTop(0);
  });
});

// 레이아웃, 토글
$(function () {
  // 광고 팝업(무료 충전) 닫기
  $(".btn-pop-close").click(function () {
    $(this).parents(".pop-ad").hide();
  });

  // 짧은 화면 버튼 하단 고정
  function fixFootBtn() {
    var winHeight = $(window).innerHeight();
    var contentHeight = $("#content").innerHeight();
    var gap = winHeight - contentHeight; // 콘텐츠가 짧은 경우

    if (gap >= 0) {
      $(".bottom-area").addClass("fixed");
      $("#content.newType .bottom-area").removeClass("fixed");
      $(".layout-payment .bottom-area").removeClass("fixed");
    } else {
      $(".bottom-area").removeClass("fixed");
    }
  }
  fixFootBtn();

  // 하단 고정 영역 여백 확보
  function wrapPadding() {
    var fixFoot = $(".bottom-area.fixed");
    const matchesMediaQuery = window.matchMedia("(max-width:999px) and (orientation:landscape)").matches;

    if (fixFoot.length > 0 && !matchesMediaQuery) {
      var fixFootHeight = $(fixFoot).innerHeight();
      $("#content").css("padding-bottom", fixFootHeight);
      $(".wrap.oneStore").removeClass("horizontal");
    } else {
      $(".wrap.oneStore").addClass("horizontal");
      $("#content").css("padding-bottom", 24);
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

  // 리사이즈
  $(window).resize(function () {
    fixFootBtn();
    wrapPadding();
    keypadOffset();
  });

  // popover
  $(".open-popover").click(function () {
    $(this).next().toggleClass("hidden");
  });

  // 약관 펼치기/접기
  $(".agree-all .btn").click(function () {
    $(this).parents(".agree-all").find(".btn").toggleClass("hidden");
    $(this).parents(".agree-all").next(".agree-list").toggle();
    fixFootBtn();
    wrapPadding();
  });
});

// 민앤지 작업본 + 수정
$(function () {
  // 모달 팝업 setting 및 이벤트
  if ($(".modal-info").length > 0) {
    modalSet();
    chargeIpForm(); // 충전하기 이벤트
  }

  // 계좌관리 순서 설정
  if ($("#sort-account").length > 0) {
    $("#sort-account").sortable({
      axis: "y",
      handle: ".icon-area",
    });
    $("#sort-account").disableSelection(); //내부 선택 불가 처리
  }

  // checkbox 하나만 선택
  $.fn.checkedOne = function () {
    var wrap = $(this);
    var child = $(wrap).find('.checkbox input[type="checkbox"]');
    $(child).on("change", function () {
      $(child).prop("checked", false);
      $(this).prop("checked", true);
    });
  };
  $(".checked-one").checkedOne();
});

// 모달 setting 및 이벤트
function modalSet() {
  var modalCont = $(".modal-info .modal-content");
  var modalH = $(window).height();
  modalH = modalH * -1;
  $(modalCont).css("bottom", modalH); // 팝업들 bottom 값 setting

  // bottom modal 열기
  $(".info-chg").click(function () {
    var selectId = $(this).attr("id");
    var optionLayer = "modal-" + selectId;
    var temp = $("#" + optionLayer);
    temp.show();
    $(temp).find(".modal-content").animate({ bottom: 0 }, 200);

    // 이중 모달이 아닌 경우
    if (!$(this).hasClass("depth2")) {
      scrollOff(); // 바디 스크롤 제거
    }

    // 바깥 영역 클릭 시 팝업 닫힘
    $(temp).on("click", function (e) {
      if (!$(".modal-content").has(e.target).length) {
        modalOut();
      }
    });

    // 팝업 내 하단 버튼 클릭 시 팝업 닫힘
    $(temp)
      .find(".modal-footer .btn")
      .on("click", function (e) {
        modalOut();
      });

    // bottom modal 닫기
    function modalOut() {
      temp.fadeOut(200);
      $(temp).find(".modal-content").animate({ bottom: modalH }, 200);

      // 이중 모달이 아닌 경우
      if (!$(temp).hasClass("depth2")) {
        scrollOn(); // 바디 스크롤 제거 해제
      }
    }

    // 모달 높이가 큰 경우 포지션 변경
    function modalContPos() {
      var modalContent = temp.find(".modal-content");
      var modalContentH = temp.find(".modal-content").height();
      var modalDialogH = temp.find(".modal-dialog").height();
      var gap = modalDialogH - modalContentH;
      if (gap < 0) {
        modalContent.css("position", "relative");
      } else {
        modalContent.css("position", "fixed");
      }
    }
    modalContPos();

    // 리사이즈
    $(window).resize(function () {
      modalContPos();
    });
  });
}

// 하단 레이어 팝업(슬라이드 모달) 기본 세팅
var modalCont = $(".modal-info .modal-content");
var modalH = $(window).height();
modalH = modalH * -1;
$(modalCont).css("bottom", modalH); // 팝업들 bottom 값 setting

// 하단 레이어 팝업(슬라이드 모달) 열기
function modalOpenSlide(obj) {
  var temp = $("#" + obj);
  var modalCont = $(temp).find(".modal-content");

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

  // bottom modal 닫기
  function modalCloseSlide() {
    temp.fadeOut(200);
    $(temp).find(".modal-content").animate({ bottom: modalH }, 200);

    // 이중 모달이 아닌 경우
    if (!$(temp).hasClass("depth2")) {
      scrollOn(); // 바디 스크롤 제거 해제
    }
  }

  // 모달 높이가 큰 경우 포지션 변경
  function modalContPos() {
    var modalContent = temp.find(".modal-content");
    var modalContentH = temp.find(".modal-content").height();
    var modalDialogH = temp.find(".modal-dialog").height();
    var gap = modalDialogH - modalContentH;
    if (gap < 0) {
      modalContent.css("position", "relative");
    } else {
      modalContent.css("position", "fixed");
    }
  }
  modalContPos();

  // 리사이즈
  $(window).resize(function () {
    modalContPos();
  });
}

// 하단 레이어 팝업(슬라이드 모달) 열기 + 상단 이동 막기
function modalOpenSlideNoMove(obj) {
  var temp = $("#" + obj);
  var modalCont = $(temp).find(".modal-content");

  temp.show();
  $(modalCont).animate({ bottom: 0 }, 200);
  // 이중 모달이 아닌 경우
  if (obj === "retto") {
    $("body").addClass("modal-open");
  } else if (!$(this).hasClass("depth2")) {
    // scrollOff(); // 바디 스크롤 제거
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

  // bottom modal 닫기
  function modalCloseSlide() {
    var temp = $("#" + obj);
    temp.fadeOut(200);
    var modalContent = $(temp).find(".modal-content");

    // $(modalContent).animate({ bottom: modalH }, 200, function () {
    // 	// 애니메이션 완료 후 실행될 코드
    // 	if (!$(temp).hasClass("depth2")) {
    // 		scrollOn(); // 바디 스크롤 제거 해제
    // 	}
    // });
  }

  // 리사이즈
  $(window).resize(function () {
    modalContPos();
  });
}

// 충전하기 이벤트
function chargeIpForm() {
  var chargeIp, chargeLi, chargeBtn;
  chargeIp = $(".charge-form .form-type input");
  chargeIp.on({
    focus: function () {
      chargeLi = $(this).parents("li");
      $(chargeLi).addClass("shw");
      // $(chargeBtn).fadeIn();
    },
    blur: function () {
      chargeLi = $(this).parents("li");
      if (!$(this).val()) {
        $(chargeLi).removeClass("shw");
      }
      // $(chargeBtn).fadeOut();
    },
  });
}

// 체크박스 라디오 선택 시 컨테이너 컬러 변경
function checkBorderChange() {
  $(".coupon-wrap input").on("click", function () {
    $(".border-change").removeClass("on");
    $(".coupon-wrap input").not($(this)).prop("checked", false);
    if ($(this).is(":checked")) {
      $(this).closest(".border-change").addClass("on");
      $("#modal-useCoupon .title-text strong").addClass("text-error");
    } else {
      $("#modal-useCoupon .title-text strong").removeClass("text-error");
    }
    modalOpenSlide("modal-useCoupon");
  });
}
checkBorderChange();

// 쿠폰함 탭
function couponTab() {
  $(window).on("scroll", function () {
    if ($(window).scrollTop() > $(".main-coupon .top-banner").offset().top + $(".main-coupon .top-banner").outerHeight() - 60) {
      $(".main-coupon .tab-btn-wrap, .main-coupon .tab-wrap").addClass("fixed");
    } else {
      $(".main-coupon .tab-btn-wrap, .main-coupon .tab-wrap").removeClass("fixed");
    }
  });
  $(".main-coupon .tab-btn-wrap li").click("on", function () {
    var idx = $(this).index();
    $(".main-coupon .tab-btn-wrap li, .main-coupon .tab-wrap .tab").removeClass("on");
    $(this).addClass("on");
    $(".main-coupon .tab-wrap .tab").eq(idx).addClass("on");
  });
}

if ($("#wrap").is(".main-coupon")) {
  couponTab();
}

/* 개발 시 추가
 * -------------------------------------------------------------------- */
//종료
$(function () {
  $("#header .btn-close").click(function () {
    //가맹점 cancelUrl 호출 페이지 이동
    var processType = $(this).attr("data-processType");
    var formId = $(this).attr("data-formId");
    var returnUrl = $(this).attr("data-returnUrl");

    $.closeAction(processType, formId, returnUrl);
  });

  // sys error 페이지 X버튼 클릭 (token 값이 없기 때문에 바로 cancl url을 submit 해준다.)
  $(".btn-close-error").click(function () {
    var cancelUrl = $("#cancelFm").attr("action");
    if (cancelUrl == "") {
      self.close();
    } else {
      $("#cancelFm").submit();
    }
  });

  $(".btn-exit").click(function () {
    $.promptMessage(naviAlertTitle.orderEnd, naviAlertMsg.orderBrandEnd, $("#commonPrompt"), $("#promptOk"), "self.close()");
  });
});

//서비스관리 화면 이동
$(function () {
  $("#header .btn-svc").click(function () {
    javascript: SettlePay.svc_execute(document.iaDirectFrm);
  });
});

$.closeAction = function (processType, formId, returnUrl) {
  if (processType == "MP") {
    $.closeAlertMessageCallback(naviAlertTitle.orderEnd, naviAlertMsg.orderBrandEnd, $("#closeAlert"), "$.closeMPUrl()");
  } else if (processType == "M") {
    $.promptMessage(naviAlertTitle.orderEnd, naviAlertMsg.orderBrandEnd, $("#commonPrompt"), $("#promptOk"), "$.closeUrl()");
  } else if (processType == "B") {
    $.promptMessage(naviAlertTitle.orderEnd, naviAlertMsg.orderBrandEnd, $("#commonPrompt"), $("#promptOk"), '$.closeBack("' + formId + '", "' + returnUrl + '")');
  } else if (processType == "Z") {
    //모바일 GW용
    $.promptMessageEx2(naviAlertTitle.orderEnd, naviAlertMsg.mobileAppEnd, $("#commonPromptZeroapp"), $("#promptOkZeroapp"), '$.closeZeroApp("' + formId + '", "' + returnUrl + '")');
  } else if (processType == "ZE") {
    //모바일 GW용 (종료 메시지)
    $.promptMessage(naviAlertTitle.orderEnd, naviAlertMsg.orderBrandEnd, $("#commonPrompt"), $("#promptOk"), '$.closeBack("' + formId + '", "' + returnUrl + '")');
  } else {
    $.promptMessage(naviAlertTitle.orderEnd, naviAlertMsg.orderEnd, $("#commonPrompt"), $("#promptOk"), "$.close()");
  }
};

$.closeZeroApp = function (formId, returnUrl) {
  $.closeAlertMessageCallback(naviAlertTitle.orderEnd, "결제가 취소되었습니다.", $("#closeAlert"), "$.closeMPUrl()");
};

$.close = function () {
  $.closeAlertMessageCallback(naviAlertTitle.orderEnd, naviAlertMsg.orderEndOk, $("#closeAlert"), "$.closeUrl()");
};
$.closeUrl = function () {
  var mercntId = $("#mercntId").val();
  var ordNo = $("#ordNo").val();
  var trPrice = $("#trPrice").val();
  var trDay = $("#trDay").val();
  var trTime = $("#trTime").val();
  var mercntParam1 = $("#mercntParam1").val();
  var mercntParam2 = $("#mercntParam2").val();
  var cancelUrl = $("#cancelUrl").val();
  var token = $("#token").val();
  var processType = $("#processType").val();
  var contactType = $("#contactType").val();

  var form = makeBodyForm("POST", "/std/closeAction.do");
  makeBodyFormInput(form, "token", token);
  makeBodyFormInput(form, "mercntId", mercntId);
  makeBodyFormInput(form, "ordNo", ordNo);
  makeBodyFormInput(form, "trPrice", trPrice);
  makeBodyFormInput(form, "trDay", trDay);
  makeBodyFormInput(form, "trTime", trTime);
  makeBodyFormInput(form, "mercntParam1", mercntParam1);
  makeBodyFormInput(form, "mercntParam2", mercntParam2);
  makeBodyFormInput(form, "cancelUrl", cancelUrl);
  makeBodyFormInput(form, "processType", processType);
  makeBodyFormInput(form, "contactType", contactType);
  makeBodyFormSubmit(form);
};

$.closeBack = function (formId, returnUrl) {
  $("#" + formId).attr("action", returnUrl);
  $("#" + formId).submit();
};
$.closeMPUrl = function () {
  $("#cancelFm").submit();
};

function maxLengthCheck(object) {
  if (object.value.length > object.maxLength) {
    object.value = object.value.slice(0, object.maxLength);
  }
}

function makeBodyForm(method, action) {
  var num = Math.floor(Math.random() * 10000) + 1;
  var formName = "SETTLE_FORM_" + num;
  var el = document.getElementsByTagName("body")[0];

  var resultForm = document.createElement("form");
  resultForm.setAttribute("id", formName);
  resultForm.setAttribute("name", formName);
  resultForm.setAttribute("method", method);
  resultForm.setAttribute("action", action);

  el.appendChild(resultForm);

  return formName;
}

function makeBodyFormInput(form, name, value) {
  var formInput = document.createElement("input");

  formInput.setAttribute("type", "hidden");
  formInput.setAttribute("name", name);
  formInput.setAttribute("value", value);

  var el = document.getElementById(form);
  el.appendChild(formInput);
}

function makeBodyFormSubmit(form) {
  var el = document.getElementById(form);
  if (el != null) {
    el.submit();

    setTimeout(function () {
      el.remove();
    }, 1000);
  }
}

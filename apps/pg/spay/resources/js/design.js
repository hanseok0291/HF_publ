/**
 * Design Script
 */

// 스크롤 시 헤더 동작
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var headerHeight = $("#header").outerHeight();

$(window).scroll(function () {
  didScroll = true;
});
setInterval(function () {
  if (didScroll) {
    hasScrolled();
    didScroll = false;
  }
}, 250);
function hasScrolled() {
  var st = $(this).scrollTop();
  // Make sure they scroll more than delta
  if (Math.abs(lastScrollTop - st) <= delta) {
    return;
  }
  // If they scrolled down and are past the header, add class .header-up.
  // This is necessary so you never see what is "behind" the header.
  if (st > lastScrollTop && st > headerHeight) {
    // Scroll Down
    $("#header").removeClass("header-down").addClass("header-up");
    $(".krc .time-count").removeClass("time-count-down").addClass("time-count-up");
  } else {
    // Scroll Up
    if (st + $(window).height() < $(document).height()) {
      $("#header").removeClass("header-up").addClass("header-down");
      $(".krc .time-count").removeClass("time-count-up").addClass("time-count-down");
    }
  }
  lastScrollTop = st;

  // 스크롤 시 헤더 하단 선 추가
  if (lastScrollTop > 0) {
    $("#header").css("border-bottom", "1px solid #ececec");
  } else {
    $("#header").css("border-bottom", "0");
    $("#header").removeClass("header-up").addClass("header-down");
  }
}

// form
$(function () {
  var input = $("input[type=text], input[type=password], input[type=tel], input[type=email], input[type=number], select, textarea, .input");
  var row = $(".input input, .input select");

  // input Focus
  input
    .focus(function () {
      $(this).addClass("focus");
    })
    .blur(function () {
      $(this).removeClass("focus");
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

  // IE9 이하 jquery.placeholder.js 적용
  $("input, textarea").placeholder();

  // 약관 동의 - 전체 선택 체크박스 클릭
  $(".agree-terms .agree-all [type=checkbox]").click(function () {
    var child = $(this).parents(".agree-all").next(".terms-list").find("[type=checkbox]");
    // 전체 선택 체크박스가 체크된 경우
    if ($(this).is(":checked")) {
      $(child).prop("checked", true);
      // 전체 선택 체크박스가 해제된 경우
    } else {
      $(child).prop("checked", false);
    }
  });
  // 약관 동의 - 하위 체크박스 클릭
  $(".agree-terms .terms-list [type=checkbox]").click(function () {
    var all = $(this).parents(".terms-list").prev(".agree-all").find("[type=checkbox]");
    var childCount = $(this).parents(".terms-list").find("[type=checkbox]").length; // 하위 체크박스 수
    var childCheckedCount = $(this).parents(".terms-list").find("[type=checkbox]:checked").length; // 체크된 하위 체크박스 수
    // 하위 선택 체크박스가 모두 체크된 경우
    if (childCheckedCount == childCount) {
      $(all).prop("checked", true);
      // 하위 선택 체크박스가 모두 체크되지 않은 경우
    } else {
      $(all).prop("checked", false);
    }
  });

  // card active
  $(".card-check [type=checkbox]").click(function () {
    var checkedInput = $(".card-check-input").is(":checked"); // prop('checked');
    if (checkedInput == true) {
      $(this).parents(".card-check").addClass("active");
    } else {
      $(this).parents(".card-check").removeClass("active");
    }
  });
});

// 바디 스크롤 제거/해제
var scrollHeight = 0;
function scrollOff() {
  scrollHeight = $(document).scrollTop();
  // $("body").addClass("modal-open");
  // $("#wrap").css("position", "fixed");
  // $("#wrap").css("top", - scrollHeight);
}
function scrollOn() {
  $("body").removeClass("modal-open");
  $("#wrap").css("top", 0);
  $("#wrap").css("position", "relative");
  $("#header").css("top", "-1px");
  $(document).scrollTop(scrollHeight);
}

// 모달(레이어 팝업), 배너, 팝오버
$(function () {
  // 모달 열기
  $("[data-toggle='modal']").click(function () {
    var openBtn = $(this);
    var target = $(this).attr("data-target"); // 모달 ID
    //		var targetBtn = $(target).find("button:first-child");	// 모달 내 첫번째 버튼
    //		$(target).show()										// 모달 열기
    //		if($(target).is("#commonAlert") || $(target).is("#commonConfirm")){ // 모달 내 첫번재 버튼 포커스
    //			$(targetBtn).focus();
    //		} else {												// 모달 포커스
    //			$(target).focus();
    //		}
    $(target).show().focus(); // 모달 열기, 포커스
    scrollOff(); // 바디 스크롤 제거

    // 모달 위치
    var thisDialog = $(target).find(".modal-dialog");
    var marginValue = thisDialog.outerHeight() / 2;
    $(thisDialog).css("margin-top", "-" + marginValue + "px");

    // 모달 닫기
    $("[data-dismiss='modal']").click(function () {
      //$(target).hide();									// 모달 닫기
      $(openBtn).focus(); // 열기 버튼 포커스
      //scrollOn();										// 바디 스크롤 제거 해제
    });
  });

  // 모달 닫기
  $("[data-dismiss='modal']").click(function () {
    var target = $(this).parents(".modal");
    $(target).hide(); // 모달 닫기
    //$(openBtn).focus();									// 열기 버튼 포커스
    scrollOn(); // 바디 스크롤 제거 해제
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

// 레이아웃, 토글, 슬라이드
$(function () {
  // 약관 페이지일때만 실행

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
    } else {
    }
    // 팝업 내 하단 버튼 클릭 시 팝업 닫힘
    $(temp)
      .find(".modal-footer .btn")
      .on("click", function (e) {
        if (!$(this).hasClass("not-close")) {
          modalCloseSlide();
        } else {
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
  }

  // 농어촌공사 약관페이지 일때만 실행
  // modalOpenSlide('modalSlideType1');

  // 푸터 고정 토글
  function fixedFooter() {
    // 짧은 화면 푸터 고정
    var winHeight = $(window).innerHeight();
    var mainHeight = $("#content").height() + $("#header").innerHeight() + $("#footer").innerHeight();
    var gap = winHeight - mainHeight; // 콘텐츠가 짧은 경우
    if (gap > 0) {
      $("#footer").addClass("fixed");
    } else {
      $("#footer").removeClass("fixed");
    }

    // 푸터 고정 시 하단 여백 확보
    var fixFoot = $("#footer.fixed");
    if (fixFoot.length > 0) {
      var fixFootHeight = $(fixFoot).innerHeight();
      $("#content").css("padding-bottom", fixFootHeight);
    } else {
      $("#content").css("padding-bottom", 0);
    }
  }
  fixedFooter();

  // 클릭 시 콘텐츠 높이 변경되는 경우
  $(".fixedFooterJS, #send").click(function () {
    fixedFooter();
  });

  // 리사이즈
  $(window).resize(function () {
    fixedFooter();
  });

  // 약관 네비 슬라이드
  $(".modal-terms .nav").owlCarousel({
    items: 1,
    nav: true,
    dots: false,
    smartSpeed: 300,
  });

  // 결제 완료 내역 더보기
  $(".pay-complete .btn-more .btn").click(function () {
    $(".btn-more .btn i, .item-more").toggleClass("hidden");
    fixedFooter();
  });
});

// 농어촌공사 커스텀
// 결제해야할 금액
// var payMoney = document.getElementById("payMoney").value;
// var element = document.getElementById('payMoney').innerText;
// var regex = /[^0-9]/g; // 숫자가 아닌 문자열을 선택하는 정규식
// var payMoneyInt = element.replace(regex, "");	// 원래 문자열에서 숫자가 아닌 모든 문자열을 빈 문자로 변경
// var payMoneyResult = parseInt(payMoneyInt);

// // 입력 가능 금액 계산
// var totalMoney = parseFloat(document.getElementById('totalMoney').value);
// var formatResult = formatNumber(totalMoney);
// var resultEle = document.getElementById('result');

// resultEle.textContent = formatResult;

// function formatNumber(number) {
// 	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// }

// function formatNumberInput(inputEl) {
// 	var value = inputEl.value.replace(/,/g, '');
// 	inputEl.value = formatNumber(value);
// }

// function calculate() {
// 	var totalMoney = parseFloat(document.getElementById('totalMoney').value);
// 	var num1 = parseFloat(document.getElementById('num1').value.replace(/,/g, ''));
// 	var num2 = parseFloat(document.getElementById('num2').value.replace(/,/g, ''));
// 	var num3 = parseFloat(document.getElementById('num3').value.replace(/,/g, ''));
// 	var resultEle = document.getElementById('result');

// 	//빈 값일 경우 0으로 대체하여 계산
// 	num1 = isNaN(num1) ? 0 : num1;
// 	num2 = isNaN(num2) ? 0 : num2;
// 	num3 = isNaN(num3) ? 0 : num3;

// 	var result = totalMoney - num1 - num2 - num3;
// 	var formatResult = formatNumber(result);
// 	resultEle.textContent = formatResult;
// }

// // 초기화 함수
// function resetCal() {
// 	document.getElementById('num1').value = '';
// 	document.getElementById('num2').value = '';
// 	document.getElementById('num3').value = '';
// 	document.getElementById('result').value = '';
// 	calculate();
// }

// // 카드정보 입력 1000단위 콤마
// 	$("input.num-only").change(function() {
// 		var num1 = parseFloat(document.getElementById('num1').value);
// 		var num2 = parseFloat(document.getElementById('num2').value);
// 		var num3 = parseFloat(document.getElementById('num3').value);

// 		var formatResult1 = formatNumber(num1);
// 		var formatResult2 = formatNumber(num2);
// 		var formatResult3 = formatNumber(num3);
// 	});

// 		// 푸터 고정 토글
// 		function fixedFooter(){
// 			// 짧은 화면 푸터 고정
// 			var winHeight = $(window).innerHeight();
// 			var mainHeight = $("#content").height() + $("#header").innerHeight() + $("#footer").innerHeight();
// 			var gap = winHeight - mainHeight; // 콘텐츠가 짧은 경우
// 			if(gap > 0) {
// 				$("#footer").addClass("fixed");
// 			} else {
// 				$("#footer").removeClass("fixed");
// 			}

// 			// 푸터 고정 시 하단 여백 확보
// 			var fixFoot = $("#footer.fixed");
// 			if(fixFoot.length > 0){
// 				var fixFootHeight = $(fixFoot).innerHeight();
// 				$("#content").css("padding-bottom", fixFootHeight);
// 			} else {
// 				$("#content").css("padding-bottom", 0);
// 			}
// 		}

// 		// 아코디언
// 		$(".accodian-header").click(function(){
// 			var selItem = $(this).parent('.accodian-item');
// 			if(selItem.hasClass('open')) {
// 				$(".accodian-item").removeClass('open');
// 				selItem.find('.accodian-content').slideUp();
// 			} else {
// 				$(".accodian-item").removeClass('open');
// 				$('.accodian-item .accodian-content').slideUp();
// 				selItem.addClass('open');
// 				selItem.find('.accodian-content').slideDown();
// 			}
// 			return false;
// 		});

// 		// 입력 가능금액 툴팁 버튼
// 		$(".btn-tooltip").click(function(){
// 			$(".popover").toggle();
// 		});

// 		// 결제하기 모달
// 		var num1Chk = false;
// 		var num2Chk = false;
// 		var num3Chk = false;
// 		var btnCount = 0;

// 		$("#send").click(function() {
// 				var resultEle = $('#result').text();
// 				var resultEleInt = resultEle.replace(regex, "");	// 원래 문자열에서 숫자가 아닌 모든 문자열을 빈 문자로 변경
// 				var num1 = parseFloat(document.getElementById('num1').value.replace(/,/g, ''));
// 				var num2 = parseFloat(document.getElementById('num2').value.replace(/,/g, ''));
// 				var num3 = parseFloat(document.getElementById('num3').value.replace(/,/g, ''));
// 				num1 = isNaN(num1) ? 0 : num1;
// 				num2 = isNaN(num2) ? 0 : num2;
// 				num3 = isNaN(num3) ? 0 : num3;

// 				var numResult = num1 + num2 + num3;
// 				var resultEleInt = parseInt(resultEleInt);

// 				if (payMoneyResult == numResult) {
// 					console.log('금액 검증 성공');
// 					if (errChk1 == undefined) {
// 					} else if (resultEle >= '0') {
// 							console.log(errChk1);
// 					} else if (resultEle >= '0' && errChk1 == false) {
// 							return false;
// 					} else if (num2Chk || (!num2Chk && num3Chk)) {
// 							return false;
// 					} else if (!num2Chk || (!num2Chk && !num3Chk)) {
// 							return false;
// 					}
// 					alert('성공');
// 				} else { //금액 검증 실패
// 					showAlertMessage();
// 					return false;
// 				}
// 		});

// 		$(".btn-add").click(btnAddClick);

// 		function showAlertMessageOver() {
// 				$.alertMessage("결제금액 입력 안내", "고객님의 입력하신 결제금액의 합계가 총 결제금액을 초과하였습니다. <br><br>입력한 결제금액 수정 후 재시도 해주세요.", "");
// 		}
// 		function showAlertMessage() {
// 				$.alertMessage("결제금액 입력 안내", "고객님의 입력하신 결제금액의 합계가 총 결제금액과 다릅니다. <br><br>입력한 결제금액 수정 후 재시도 해주세요.", "");
// 		}

// 		var errChk1, errChk2, errChk3;
// 		function btnAddClick() {
// 				var resultEle = $('#result').text();
// 				var num1 = parseFloat(document.getElementById('num1').value.replace(/,/g, ''));
// 				var num2 = parseFloat(document.getElementById('num2').value.replace(/,/g, ''));
// 				var num3 = parseFloat(document.getElementById('num3').value.replace(/,/g, ''));
// 				num1 = isNaN(num1) ? 0 : num1;
// 				num2 = isNaN(num2) ? 0 : num2;
// 				num3 = isNaN(num3) ? 0 : num3;

// 				var numResult = num1 + num2 + num3;
// 				var resultEleInt = parseInt(resultEle);

// 				if (btnCount === 0) {
// 					if (resultEleInt >= 0) {
// 						errChk1 = true;
// 						num1Chk = checkAndShowError(errChk1, $(".accodian-item").eq(0));
// 						openNextAccodian(0, 1);
// 					} else {
// 						errChk1 = false;
// 						num1Chk = checkAndShowError(errChk1, $(".accodian-item").eq(0));
// 						showAlertMessageOver();
// 						return false;
// 					}
// 				} else if (btnCount === 1) {
// 					if (resultEle >= '0') {
// 						errChk2 = true;
// 						num3 = $('#num3').val(resultEle);
// 						resultEle = (resultEle - num3.val() +'');
// 						$('#result').val(resultEle - resultEle);
// 						$('#result').text('0');
// 						num2Chk = checkAndShowError(errChk2, $(".accodian-item").eq(1));
// 						openNextAccodian(1, 2);
// 					} else {
// 						errChk2 = false;
// 						num2Chk = checkAndShowError(errChk2, $(".accodian-item").eq(1));
// 						showAlertMessageOver();
// 						return false;
// 					}
// 						$('.btn-add').hide();
// 				}
// 				btnCount++;
// 		}

// 		function checkAndShowError(errChk, accodianItem) {
// 				if (errChk == true) {
// 						accodianItem.find('.label, .text-error').hide();
// 						return true;
// 				} else {
// 						accodianItem.find('.label, .text-error').show();
// 						return false;
// 				}
// 		}

// 		function openNextAccodian(currentIndex, nextIndex) {
// 				$(".accodian-item").removeClass('open');
// 				$(".accodian-item").eq(nextIndex).addClass('open');
// 				setTimeout(function() {
// 						$('.accodian .accodian-item').children('.accodian-content').slideUp();
// 				}, 100);
// 				setTimeout(function() {
// 						$('.accodian .accodian-item').eq(nextIndex).slideDown();
// 						$('.accodian .accodian-item').eq(nextIndex).children('.accodian-content').slideDown();
// 				}, 350);
// 		}
// 농어촌공사 커스텀

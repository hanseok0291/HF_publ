// form
$(function(){
	var input = $("input[type=text], input[type=password], input[type=tel], input[type=email], input[type=number], select, textarea, .input");
	var row = $(".input input, .input select");
	
	// input Focus
	input.focus(function(){
		$(this).addClass("focus");
	}).blur(function(){
		$(this).removeClass("focus");
	}).blur();
	
	row.focus(function(){
		$(this).parents(".input").addClass("focus");
		$(this).removeClass("focus");
	}).blur(function(){
		$(this).parents(".input").removeClass("focus");
	}).blur();

	// 주민번호 뒤 첫째 자리 동그라미 label / input
	var inputText = $(".input-help .input-text, .input-myid .input-text");
	$(".input-help > label, .input-myid .num > label").css("position","absolute");
	inputText.focus(function(){
		$(this).prev("label").css("visibility","hidden");
	}).blur(function(){
		if($(this).val() == ""){
			$(this).prev("label").css("visibility","visible");
		} else {
			$(this).prev("label").css("visibility","hidden");
		}
	}).change(function(){
		if($(this).val() == ""){
			$(this).prev("label").css("visibility","visible");
		} else {
			$(this).prev("label").css("visibility","hidden");
		}
	}).blur();

	// 비밀번호 설정 입력상태 표시
	$('.input-mark input').bind("keyup input", function(e) {
		var keyCode = e.keyCode || e.which;
		var byte = $(this).val();
		var del = $(this).val() + 1;
		$('.input-mark .mark i').removeClass();
		if (byte.length == 1) {
			$('.input-mark .mark i:eq(0)').addClass('on');
		} else if (byte.length == 2) {
			$('.input-mark .mark i:eq(0), .input-mark .mark i:eq(1)').addClass('on');
		} else if (byte.length == 3) {
			$('.input-mark .mark i:eq(0), .input-mark .mark i:eq(1), .input-mark .mark i:eq(2)').addClass('on');
		} else if (byte.length == 4) {
			$('.input-mark .mark i:eq(0), .input-mark .mark i:eq(1), .input-mark .mark i:eq(2), .input-mark .mark i:eq(3)').addClass('on');
		} else if (byte.length == 5) {
			$('.input-mark .mark i:eq(0), .input-mark .mark i:eq(1), .input-mark .mark i:eq(2), .input-mark .mark i:eq(3), .input-mark .mark i:eq(4)').addClass('on');
		} else if (byte.length == 6) {
			$('.input-mark .mark i:eq(0), .input-mark .mark i:eq(1), .input-mark .mark i:eq(2), .input-mark .mark i:eq(3), .input-mark .mark i:eq(4), .input-mark .mark i:eq(5)').addClass('on');
		} else {
			$('.input-mark .mark i').removeClass();
		}
		// console.log(byte.length);
	});

	// IE9 이하 jquery.placeholder.js 적용
	$("input, textarea").placeholder();
});

// 바디 스크롤 제거/해제
var scrollHeight = 0;
function scrollOff(){
	scrollHeight = $(document).scrollTop();
	$("body").addClass("modal-open");
	$("#wrap").css("position", "fixed");
	$("#wrap").css("top", - scrollHeight);
}
function scrollOn(){
	$("body").removeClass("modal-open");
	$("#wrap").css("top", 0);
	$("#wrap").css("position", "relative");
	$(document).scrollTop(scrollHeight);
}

// 하단 슬라이드 모달 (통신사 modal-carrier-v3 — modal-banklist와 동일 패턴)
var SLIDE_MODAL_OFFSET = -450;
var SLIDE_MODAL_SPEED = 200;

function isSlideBottomModal($modal) {
	return $modal.hasClass("modal-carrier-v3");
}

// 약관 상세 모달 슬라이드 닫힘 위치 (통신사 -450과 분리)
function getTermsSlideOffset() {
	return -$(window).height();
}

// 약관 상세 모달 열기 (modal-terms 전용 — 개발 termsModal·modal-slide·modal-info)
function openTermsModal($modal) {
	if (!$modal || !$modal.length) {
		return;
	}
	$modal.find(".modal-dialog").css("margin-top", "");
	$modal.show();
	if ($modal.hasClass("modal-slide")) {
		var $content = $modal.find(".modal-content");
		var slideOffset = getTermsSlideOffset();
		scrollOff();
		$content.stop(true, true).css("bottom", slideOffset).animate({ bottom: 0 }, SLIDE_MODAL_SPEED);
	} else {
		scrollOff();
	}
}

// 약관 상세 모달 닫기 (modal-terms 전용 — 개발 modal-slide·modal-info 조합 포함)
function closeTermsModal($modal, callback) {
	if (!$modal || !$modal.length) {
		return;
	}
	var $content = $modal.find(".modal-content");
	$modal.find(".modal-dialog").css("margin-top", "");
	if ($modal.hasClass("modal-slide")) {
		var slideOffset = getTermsSlideOffset();
		$content.stop(true, true).animate({ bottom: slideOffset }, SLIDE_MODAL_SPEED, function () {
			$modal.hide();
			$content.css("bottom", "");
			scrollOn();
			if (typeof callback === "function") {
				callback();
			}
		});
	} else {
		$modal.hide();
		$content.css("bottom", "");
		scrollOn();
		if (typeof callback === "function") {
			callback();
		}
	}
}

function openSlideBottomModal($modal) {
	$modal.show();
	$modal.find(".modal-content").stop(true, true).css("bottom", SLIDE_MODAL_OFFSET + "px").animate({ bottom: 0 }, SLIDE_MODAL_SPEED);
	scrollOff();
}

function closeSlideBottomModal($modal, callback) {
	$modal.find(".modal-content").stop(true, true).animate({ bottom: SLIDE_MODAL_OFFSET }, SLIDE_MODAL_SPEED, function () {
		$modal.hide();
		scrollOn();
		if (typeof callback === "function") {
			callback();
		}
	});
}

// 레이어 팝업(모달) 
function modalOpen(obj){
	var temp = $("#" + obj);
	temp.show();
	scrollOff(); // 바디 스크롤 제거
	
	// 위치
	var thisDialog = temp.children(".modal-dialog");
	var marginValue = thisDialog.outerHeight() / 2;
	$(thisDialog).css("margin-top", "-"+marginValue+"px");
}

// 레이어 팝업(모달) 닫기
function modalClose(){
	var $terms = $(".modal.modal-terms:visible");
	if ($terms.length) {
		closeTermsModal($terms.first());
		return;
	}
	$('.modal').hide();
	scrollOn(); // 바디 스크롤 제거 해제
}

// 레이어 애니메이션 외
$(function(){
	// 약관 네비 슬라이드
	$(".modal-terms .nav").owlCarousel({
		items: 1,
		nav: true,
		dots: false,
		smartSpeed: 300
	});

	// 셀렉트 옵션 레이어 열기(알뜰폰 통신사 셀렉트박스)
	$(".select-modal").click(function(){
		var selectId = $(this).attr("id");
		var optionLayer = "modal-" + selectId;
		var temp = $("#" + optionLayer);
		if (!temp.length) {
			optionLayer = "select-" + selectId;
			temp = $("#" + optionLayer);
		}
		if (!temp.length) {
			return;
		}
		if (isSlideBottomModal(temp)) {
			openSlideBottomModal(temp);
		} else {
			temp.show();
			scrollOff(); // 바디 스크롤 제거
			// 위치
			var thisDialog = temp.children(".modal-dialog");
			var marginValue = thisDialog.outerHeight() / 2;
			$(thisDialog).css("margin-top", "-"+marginValue+"px");
		}
		
		// 셀렉트 옵션 선택, 레이어 닫기(텍스트 전달 — em 있으면 라벨만, sr-only 등 제외)
		$("#" + optionLayer).find(".btn").click(function(){
			var $btn = $(this);
			var thisOption = $btn.find("em").length ? $btn.find("em").text() : $btn.text();
			$("#" + selectId).text(thisOption);
		});
	});

	// 셀렉트 옵션 선택(알뜰폰 통신사 셀렉트박스)
	$(".btn-list .btn").click(function(){
		$(this).parents(".btn-list").find(".btn").removeClass("on");
		$(this).addClass("on");
		var $modal = $(this).parents(".modal");
		if (isSlideBottomModal($modal)) {
			closeSlideBottomModal($modal);
		} else {
			$modal.hide();
			scrollOn(); // 바디 스크롤 제거 해제
		}
	});

	// 통신사 바텀시트 — dim(배경) 터치 시 닫기
	$(".modal.modal-carrier-v3").on("click", function (e) {
		var $modal = $(this);
		if (!$modal.find(".modal-content").has(e.target).length) {
			closeSlideBottomModal($modal);
		}
	});

	// 약관 상세 모달 — 취소·확인·dim 닫기 (modal-terms만, 통신사 모달과 분리)
	$(".modal.modal-terms").on("click", function (e) {
		var $modal = $(this);
		if (!$modal.find(".modal-content").has(e.target).length) {
			closeTermsModal($modal);
		}
	});
	$(".modal-terms").on("click", ".btn-close", function (e) {
		e.preventDefault();
		closeTermsModal($(this).closest(".modal"));
	});
	$(".modal-terms").on("click", ".modal-footer .btn, .modal-submit-btn .btn", function () {
		closeTermsModal($(this).closest(".modal"));
	});

	// 은행 선택 레이어 열기
	$(".bank-select").click(function(){
		$(".modal-banklist").show();
		$(".modal-banklist .modal-content").animate({bottom: 0}, 300);
		$("body").addClass("modal-open"); // 바디 스크롤 제거
	});

	// 은행 선택 레이어 닫기
	$(".modal-banklist button").click(function(){
		$(".modal-banklist .modal-content").animate({bottom: -450}, 300);
		$(".modal-banklist").fadeOut();
		$(".bank-list").scrollTop(0);
		$("body").removeClass("modal-open"); // 바디 스크롤 제거 해제
		
		// 은행 선택 버튼에 은행명 전달
		var bankCd = $(this).children(".name").text();
		$('.bank-select').text(bankCd);
	});
	
	// 이중 모달 닫기
	$(".modal-banklist.depth2 button, .modal.depth2 .btn-list .btn").click(function(){
		$("body").addClass("modal-open"); // 바디 스크롤 제거
	});
});

// 레이아웃, 토글
$(function(){
	// 짧은 화면 버튼 하단 고정
	function fixFootBtn(){
		var winHeight = $(window).innerHeight();
		var mainHeight = $("#header").innerHeight() + $("#content").innerHeight();
		var gap = winHeight - mainHeight; 			// 콘텐츠가 짧은 경우
		var agreeList = $(".agree-list").length; 	// 약관 목록 있는 경우
		if(gap > 0 && agreeList == 0) {
			$(".submit-btn").addClass("fixed");
		} else {
			$(".submit-btn").removeClass("fixed");
		}
	}
	fixFootBtn();

	// 하단 고정 영역 여백 확보 - 버튼 영역
	function wrapPadding(){
		var fixFoot = $(".submit-btn.fixed");
		if(fixFoot.length > 0){
			var fixFootHeight = $(fixFoot).innerHeight();
			$("#content").css("padding-bottom", fixFootHeight); //30 = 버튼 상단 여백 -> KT멤버십 제거
		} else {
			$("#content").css("padding-bottom", 20); //20 = 하단 여백 -> KT멤버십 변경
		}
	}
	wrapPadding();

	// 보안 키패드 상단 링크 위치
	function keypadOffset(){
		if($(".kpd-wrap").length) {
			var keypadOffsetT = $(".kpd-wrap").offset().top-40; //40 = 상단 링크 높이 30 + 여백 10
			$(".link-keypad-top").css("top", keypadOffsetT);
		}
	}
	keypadOffset();

	// 리사이즈
	$(window).resize(function(){
		fixFootBtn();
		wrapPadding();
		keypadOffset();
	});

	// 약관 펼치기/접기
	$(".agree-all .btn").click(function(){
		$(this).parents(".agree-all").find(".btn").toggleClass("hidden");
		$(this).parents(".agree-all").next(".agree-list").slideToggle(200);
	});
});

// 뒤로가기
$(function(){
	$("#btnBack").click(function(){
		window.history.back();
	});
});
// 스크롤 시 헤더 동작
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var headerHeight = $("#header").outerHeight();
$(window).scroll(function(){
	didScroll = true;
});
setInterval(function() {
	if (didScroll) {
		hasScrolled();
		didScroll = false;
	}
}, 250);
function hasScrolled() {
	var st = $(this).scrollTop();
	// Make sure they scroll more than delta
	if(Math.abs(lastScrollTop - st) <= delta) {
		return;
	}
	// If they scrolled down and are past the header, add class .header-up.
	// This is necessary so you never see what is "behind" the header.
	if (st > lastScrollTop && st > headerHeight){
		// Scroll Down
		$("#header").removeClass("header-down").addClass("header-up");
	} else {
		// Scroll Up
		if(st + $(window).height() < $(document).height()) {
			$("#header").removeClass("header-up").addClass("header-down");
		}
	}
	lastScrollTop = st;

	// 스크롤 시 헤더 하단 선 추가
	if(lastScrollTop > 0){
		// $("#header").css("border-bottom","1px solid #ececec");
		$("#header").removeClass("header-shadow-none").addClass("header-shadow-on");
	} else {
		// $("#header").css("border-bottom","0");
		$("#header").removeClass("header-shadow-on");
		$("#header").removeClass("header-up").addClass("header-down");
	}
}

// form
$(function(){
	var input = $("input[type=text], input[type=password], input[type=tel], input[type=email], input[type=number], select, textarea, .input");
	var row = $(".input input, .input select, .input .select");

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

	// input value 삭제 버튼
	$(".form-type li input").on("input change", function() {
		var $this = $(this);
		var visible = Boolean($this.val());
		$this.next(".form-control-clear").toggleClass("hidden", !visible);
	}).trigger("propertychange");
	$(".form-control-clear").on("click", function() {
		$(this).prev("input").val("").trigger("change").focus();
		$(this).toggleClass("hidden", true);
	});

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

// 레이어 팝업(모달) 열기
function modalOpen(obj){
	var temp = $("#" + obj);
	temp.show();
	scrollOff(); // 바디 스크롤 제거

	// 위치
	var thisDialog = temp.children(".modal-dialog");
	var marginValue = thisDialog.outerHeight() / 2;
	// $(thisDialog).css("margin-top", "-"+marginValue+"px"); 22.06.14 모달 위치 수직정렬 안되고 위로 올라가서 주석처리
}

// 레이어 팝업(모달) 닫기
function modalClose(){
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

	// 약관 상세 팝업 > 제목 네비 > 시행일 표시 여백
	$(".modal-terms .nav .select-sm").parents(".item").addClass("has-select");

	// 모달 슬라이드 닫기(셀렉트 옵션 레이어 팝업)
	$(".modal-slide .btn-close").click(function(){
		$(this).parents(".modal").fadeOut();
		$(this).parents(".modal-content").animate({bottom: -450}, 200);
		scrollOn(); // 바디 스크롤 제거 해제
	});
});

// 레이아웃, 토글
$(function(){
	// 헤더 브랜드명 로고 이미지
	if($("#header .shop-logo").length > 0) { // 상점 관리자에서 브랜드명 설정
		$("#header .my-logo .logo").attr("src", "../../images/logo-black.png"); // 블랙 로고
	}

	// 짧은 화면 버튼 하단 고정
	function fixFootBtn(){
		var winHeight = $(window).innerHeight();
		var contentHeight = $("#content").innerHeight();
		var gap = winHeight - contentHeight; 		// 콘텐츠가 짧은 경우
		if(gap >= 0) {
			$(".bottom-area").addClass("fixed");
		} else {
			$(".bottom-area").removeClass("fixed");
		}
	}
	fixFootBtn();

	// 하단 고정 영역 여백 확보
	function wrapPadding(){
		var fixFoot = $(".bottom-area.fixed");
		if(fixFoot.length > 0){
			var fixFootHeight = $(fixFoot).innerHeight();
			$("#content").css("padding-bottom", fixFootHeight);
		} else {
			$("#content").css("padding-bottom", 0);
		}
	}
	wrapPadding();

	// 리사이즈
	$(window).resize(function(){
		fixFootBtn();
		wrapPadding();
	});

	// popover
	$(".open-popover").click(function() {
		$(this).toggleClass("active");
	});
	$(".popover-help .open-popover").click(function() {
		var docW = $(document).innerWidth();
		var btnOffsetL = $(this).offset().left;
		var posX = (btnOffsetL / docW * 100);
		$(this).next(".popover").css({
			"-webkit-transform": "translateX(-" + posX + "%)",
			"-ms-transform": "translateX(-" + posX + "%)",
			"transform": "translateX(-" + posX + "%)"
		});
	});

	// 약관 펼치기/접기
	// $(".agree-all .btn").click(function(){
	// 	$(this).parents(".agree-all").find(".btn").toggleClass("hidden");
	// 	$(this).parents(".agree-all").next(".agree-list").slideToggle(200);
	// });
});


// 민앤지 작업본 + 수정
$(function() {
    // 모달 팝업 setting 및 이벤트
    if ($('.modal-info').length > 0) {
        modalSet();
    }
});

// 모달 setting 및 이벤트
function modalSet() {
	var modalCont = $('.modal-info .modal-content');
	var modalH = $(window).height() - 60;
	modalH = modalH * -1;
	$(modalCont).css('bottom', modalH); // 팝업들 bottom 값 setting

	// bottom modal 열기(약관 상세 모달)
	$(".info-chg").click(function () {
		/*var selectId = $(this).attr("id");
		var optionLayer = "modal-" + selectId;
		var temp = $("#" + optionLayer);*/

		var targetStep = $(this).data('step');
		var temp = $("#modal-"+targetStep);
		temp.show();
		$(temp).find('.modal-content').stop().animate({bottom: 0}, 300);
		scrollOff(); // 바디 스크롤 제거

		// 바깥 영역 클릭 시 팝업 닫힘
		// $(temp).on('click', function (e) {
		// 	if (!$('.modal-content').has(e.target).length) {
		// 		modalOut();
		// 	}
		// });
		// 팝업 내 하단 버튼 클릭 시 팝업 닫힘
		$(temp).find('.modal-footer .btn').on('click', function (e) {
			modalOut();
		});

		// bottom modal 닫기
		function modalOut() {
			temp.fadeOut();
			$(temp).find('.modal-content').stop().animate({bottom: modalH}, 200);
			scrollOn(); // 바디 스크롤 제거 해제
		}

		// 모달 높이가 큰 경우 포지션 변경
		function modalContPos() {
			var modalContent = temp.find(".modal-content");
			var modalContentH = temp.find(".modal-content").height();
			var modalDialogH = temp.find(".modal-dialog").height();
			var gap = modalDialogH - modalContentH;
			if(gap < 0) {
				modalContent.css("position", "relative");
				modalContent.css("left", "0");
				modalContent.css("transform", "none");
			} else {
				modalContent.css("position", "fixed");
				modalContent.css("left", "50%");
				modalContent.css("transform", "translateX(-50%)");
			}
		}
		modalContPos();

		// 리사이즈
		$(window).resize(function(){
			modalContPos();
		});
		
	});
}

// 하단 레이어 팝업(슬라이드 모달) 기본 세팅
var modalCont = $('.modal-info .modal-content');
var modalH = $(window).height();
modalH = modalH * -1;
$(modalCont).css('bottom', modalH); // 팝업들 bottom 값 setting

// 하단 레이어 팝업(슬라이드 모달) 열기
function modalOpenSlide(obj){
	var temp = $("#" + obj);
	var modalCont = $(temp).find('.modal-content');

	temp.show();
	$(modalCont).animate({bottom: 0}, 200);

	// 이중 모달이 아닌 경우
	if(!$(this).hasClass("depth2")) {
		scrollOff(); // 바디 스크롤 제거
	}

	// 바깥 영역 클릭 시 팝업 닫힘
	$(temp).on('click', function(e) {
		if(!$('.modal-content').has(e.target).length) {
			modalCloseSlide();
		}
	});

	// 팝업 내 하단 버튼 클릭 시 팝업 닫힘
	$(temp).find('.modal-footer .btn').on('click', function(e) {
		modalCloseSlide();
	});

	// bottom modal 닫기
	function modalCloseSlide() {
		temp.fadeOut(200);
		$(temp).find('.modal-content').stop().animate({bottom: modalH}, 200);

		// 이중 모달이 아닌 경우
		if(!$(temp).hasClass("depth2")) {
			scrollOn(); // 바디 스크롤 제거 해제
		}
	}

	// 모달 높이가 큰 경우 포지션 변경
	function modalContPos() {
		var modalContent = temp.find(".modal-content");
		var modalContentH = temp.find(".modal-content").height();
		var modalDialogH = temp.find(".modal-dialog").height();
		var gap = modalDialogH - modalContentH;
		if(gap < 0) {
			modalContent.css("position", "relative");
			modalContent.css("left", "0");
			modalContent.css("transform", "none");
		} else {
			modalContent.css("position", "fixed");
			modalContent.css("left", "50%");
			modalContent.css("transform", "translateX(-50%)");
		}
	}
	modalContPos();

	// 리사이즈
	$(window).resize(function(){
		modalContPos();
	});
}

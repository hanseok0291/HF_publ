/**
 * Design Script
 */


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
		$("#header").css("border-bottom","1px solid #ececec");
	} else {
		$("#header").css("border-bottom","0");
		$("#header").removeClass("header-up").addClass("header-down");
	}
}


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

	// IE9 이하 jquery.placeholder.js 적용
	$("input, textarea").placeholder();

	// 약관 동의 - 전체 선택 체크박스 클릭
	$(".agree-terms .agree-all [type=checkbox]").click(function(){
		var child = $(this).parents(".agree-all").next(".terms-list").find("[type=checkbox]");
		// 전체 선택 체크박스가 체크된 경우
		if($(this).is(":checked")){
			$(child).prop("checked", true);
		// 전체 선택 체크박스가 해제된 경우
		} else {
			$(child).prop("checked", false);
		}
	});
	// 약관 동의 - 하위 체크박스 클릭
	$(".agree-terms .terms-list [type=checkbox]").click(function(){
		var all = $(this).parents(".terms-list").prev(".agree-all").find("[type=checkbox]");
		var childCount = $(this).parents(".terms-list").find("[type=checkbox]").length; // 하위 체크박스 수
		var childCheckedCount = $(this).parents(".terms-list").find("[type=checkbox]:checked").length; // 체크된 하위 체크박스 수
		// 하위 선택 체크박스가 모두 체크된 경우
		if(childCheckedCount == childCount){
			$(all).prop("checked", true);
		// 하위 선택 체크박스가 모두 체크되지 않은 경우
		} else {
			$(all).prop("checked", false);
		}
	});

	// card active
	$(".card-check [type=checkbox]").click(function(){
		var checkedInput = $(".card-check-input").is(":checked"); // prop('checked');
		if(checkedInput == true) {
			$(this).parents(".card-check").addClass("active");
		} else {
			$(this).parents(".card-check").removeClass("active");
		}
	});
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


// 모달(레이어 팝업), 배너, 팝오버
$(function(){
	// 모달 열기
	$("[data-toggle='modal']").click(function(){
		var openBtn = $(this);
		var target =  $(this).attr("data-target");				// 모달 ID
//		var targetBtn = $(target).find("button:first-child");	// 모달 내 첫번째 버튼
//		$(target).show()										// 모달 열기
//		if($(target).is("#commonAlert") || $(target).is("#commonConfirm")){ // 모달 내 첫번재 버튼 포커스
//			$(targetBtn).focus();
//		} else {												// 모달 포커스
//			$(target).focus();
//		}
		$(target).show().focus();								// 모달 열기, 포커스
		scrollOff();											// 바디 스크롤 제거

		// 모달 위치
		var thisDialog = $(target).find(".modal-dialog");
		var marginValue = thisDialog.outerHeight() / 2;
		$(thisDialog).css("margin-top", "-" + marginValue + "px");

		// 모달 닫기
		$("[data-dismiss='modal']").click(function(){
			//$(target).hide();									// 모달 닫기
			$(openBtn).focus();									// 열기 버튼 포커스
			//scrollOn();										// 바디 스크롤 제거 해제
		});
	});

	// 모달 닫기
	$("[data-dismiss='modal']").click(function(){
		var target = $(this).parents(".modal");
		$(target).hide();										// 모달 닫기
		//$(openBtn).focus();									// 열기 버튼 포커스
		scrollOn();												// 바디 스크롤 제거 해제
	});

	// 배너 닫기(플로팅 배너)
	$("[data-dismiss='banner']").click(function(){
		var target = $(this).parents(".banner");
		$(target).hide();
	});

	// popover
	$("[data-dismiss='popover']").click(function(){
		var target = $(this).parents(".popover");
		$(target).hide();
	});
});


// 레이아웃, 토글, 슬라이드
$(function(){
	// 푸터 고정 토글
	function fixedFooter(){
		// 짧은 화면 푸터 고정
		var winHeight = $(window).innerHeight();
		var mainHeight = $("#content").height() + $("#header").innerHeight() + $("#footer").innerHeight();
		var gap = winHeight - mainHeight; // 콘텐츠가 짧은 경우
		if(gap > 0) {
			$("#footer").addClass("fixed");
		} else {
			$("#footer").removeClass("fixed");
		}

		// 푸터 고정 시 하단 여백 확보
		var fixFoot = $("#footer.fixed");
		if(fixFoot.length > 0){
			var fixFootHeight = $(fixFoot).innerHeight();
			$("#content").css("padding-bottom", fixFootHeight);
		} else {
			$("#content").css("padding-bottom", 0);
		}
	}
	fixedFooter();

	// 클릭 시 콘텐츠 높이 변경되는 경우
	$(".fixedFooterJS, #send").click(function(){
		fixedFooter();
	});

	// 리사이즈
	$(window).resize(function(){
		fixedFooter();
	});

	// 약관 네비 슬라이드
	$(".modal-terms .nav").owlCarousel({
		items: 1,
		nav: true,
		dots: false,
		smartSpeed: 300
	});

	// 결제 완료 내역 더보기
	$(".pay-complete .btn-more .btn").click(function(){
		$(".btn-more .btn i, .item-more").toggleClass("hidden");
		fixedFooter();
	});
});

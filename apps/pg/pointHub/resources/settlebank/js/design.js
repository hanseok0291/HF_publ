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

	// popover
	$(".open-popover").click(function(){
		$(this).next(".popover").toggleClass("hidden");
	});
});

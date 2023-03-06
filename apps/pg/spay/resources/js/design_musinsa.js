/**
 * Design Script
 */
// 모바일 위주로 구별
var mobileKeyWords = new Array('iPhone', 'iPod', 'BlackBerry', 'Android', 'Windows CE', 'Windows CE;', 'LG', 'MOT', 'SAMSUNG', 'SonyEricsson', 'Mobile', 'Symbian', 'Opera Mobi', 'Opera Mini', 'IEmobile');
  for (var word in mobileKeyWords) {
    if (navigator.userAgent.match(mobileKeyWords[word]) != null) {
			$("body").removeClass("pc");
   		break;
  } else {
		$("body").addClass("pc");
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

});

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
			$(openBtn).focus();									// 열기 버튼 포커스
		});
	});

	// 모달 닫기
	$("[data-dismiss='modal']").click(function(){
		var target = $(this).parents(".modal");
		$(target).hide();										// 모달 닫기
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

	// 약관 네비 슬라이드
	$(".modal-terms .nav").owlCarousel({
		items: 1,
		nav: true,
		dots: false,
		smartSpeed: 300
	});

	$(".accordion-list li").removeClass("active").find(".list-body").hide(); // 아이템 감추기
	$(".accordion-list li").eq(0).addClass("active").find(".list-body").slideDown(300); // 첫번째 아이템 활성
	$(".accordion-list .list-header button").click(function(){
		var thisItem = $(this).parents("li");
		var otherItem = $(thisItem).siblings("li");
		$(thisItem).toggleClass("active").find(".list-body").slideToggle(300);
		$(otherItem).removeClass("active").find(".list-body").slideUp(300);
	});

	});
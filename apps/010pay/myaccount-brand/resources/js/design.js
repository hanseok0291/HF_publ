$(document).ready(function(){
	// header
	$("header .btn-menu").click(function(){
		$(this).toggleClass("open");
		$(".gnb").fadeToggle(100);
	});

	// 위로 이동 버튼
	$(window).scroll(function () {
		if ($(this).scrollTop() > 150) {
			$("header").addClass("fixed");
			$("#btnTop").fadeIn(200);
		} else {
			$("header").removeClass("fixed");
			$("#btnTop").fadeOut(200);
		}
	});
	// scroll body to 0px on click
	$("#btnTop").click(function () {
		$("body, html").animate({
			scrollTop: 0
		}, 500);
		return false;
	});

	// 토글 버튼 목록(FAQ 카테고리)
	$(".btn-toggle > li").click(function(){
		$(this).addClass("active").siblings("li").removeClass("active");
	});

	// IE9 이하 jquery.placeholder.js 적용
	$("input, textarea").placeholder();
});

// 내통장결제 이용약관
function provisionPopup(){
	var url = "provision.html";
	window.open(url, "provision", "width=960, height=760, top=0, left=0, scrollbars=no");
}

// 전자금융거래 이용약관
function provisionElecPopup(){
	var url = "https://www.hectofinancial.co.kr/provision";
	window.open(url, "provision", "width=960, height=760, top=0, left=0, scrollbars=no");
}

// 개인정보처리방침
function privacyPopup(){
	var url = "https://www.hectofinancial.co.kr/privacy";
	window.open(url, "privacyP", "width=960, height=760, top=0, left=0, scrollbars=no");
}

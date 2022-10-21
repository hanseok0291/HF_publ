// 바디 스크롤 제거/해제
var scrollHeight = 0;
function scrollOff(){
	scrollHeight = $(document).scrollTop();
	$("body").addClass("modal-open");
	$("#wrap").css("position", "fixed");
	$("#wrap").css("top", - scrollHeight);
	$("#header").css("top", "-0.9px");
}
function scrollOn(){
	$("body").removeClass("modal-open");
	$("#wrap").css("top", 0);
	$("#wrap").css("position", "relative");
	$("#header").css("top", "-1px");
	$(document).scrollTop(scrollHeight);
}

// 레이어 팝업(모달) 열기
function modalOpen(obj){
	var temp = $("#" + obj);
	temp.show();
	temp.find(".slide-dialog").animate({bottom: 0}, 200);
	scrollOff(); // 바디 스크롤 제거

	// 바깥 영역 클릭 시 팝업 닫힘
	$(".dim-hide").on('click', function(e) {
		if (!$('.modal-content').has(e.target).length) {
			$(".dim-hide").find(".slide-dialog").animate({bottom: "-100%"}, 200);
			modalOut();
		}
	});

	// 팝업 내 하단 버튼 클릭 시 팝업 닫힘
	$(temp).find('.modal-close').on('click', function (e) {
		temp.find(".slide-dialog").animate({bottom: "-100%"}, 200);
		modalOut();
	});

	// bottom modal 닫기
	function modalOut() {
		$(".modal").fadeOut(200);
		temp.fadeOut(200);
		$(temp).find('.modal-content').animate({bottom: modalH}, 200);

		// 이중 모달이 아닌 경우
		if(!$(temp).hasClass("depth2")) {
			scrollOn(); // 바디 스크롤 제거 해제
		}
	}
}

// 레이어 팝업(모달) 닫기
function modalClose(){
	$(".modal").hide();
	scrollOn(); // 바디 스크롤 제거 해제	
}

function modalClose(obj){
	if (obj != null && obj != undefined && obj != ''){
		var temp = $("#" + obj);
		temp.hide();
		temp.find(".slide-dialog").animate({bottom: "-100%"}, 200);
	}else{
		$(".modal").hide();
		$(".slide-dialog").animate({bottom: "-100%"}, 200);
	}

	scrollOn(); // 바디 스크롤 제거 해제
}

// 레이어 팝업(모달) 닫기 (오류 페이지 외)
function modalAllClose(){
	$(".modal").hide();
	$(".slide-dialog").animate({bottom: "-100%"}, 200);
	$("body").removeClass("modal-open"); // 바디 스크롤 제거 해제
}

$(".modal-close").click(function(){
	$(".modal").hide();
	$(".slide-dialog").animate({bottom: "-100%"}, 200);
	$("body").removeClass("modal-open"); // 바디 스크롤 제거 해제
});
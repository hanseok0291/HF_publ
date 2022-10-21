// 바디 스크롤 제거/해제
var scrollHeight = 0;
function scrollOff(){
	scrollHeight = $(document).scrollTop();
	$("body").addClass("modalOpen");
	$(".wrap").css("position", "fixed");
	$(".wrap").css("top", -scrollHeight);
}
function scrollOn(){
	$("body").removeClass("modalOpen");
	$(".wrap").css("top", 0);
	$(".wrap").css("position", "relative");
	$(document).scrollTop(scrollHeight);
}

// 레이어 팝업(모달) 열기
function modalOpen(obj){
	var temp = $("#" + obj);
	temp.fadeIn(100).addClass("open");
	scrollOff(); // 바디 스크롤 제거

	// 슬라이드 모달 닫기
	function modalOut() {
		temp.fadeOut(300).removeClass("open");

		// 이중 모달이 아닌 경우
		if (!$(temp).hasClass("depth2")) {
			scrollOn(); // 바디 스크롤 제거 해제
		}
	}
<<<<<<< HEAD
	
=======
>>>>>>> e8517960fab2fff300ec9968a9f92dfcb1dde46c

	// 팝업 내 닫기 버튼 클릭 시 팝업 닫기
	$(temp).find('.modalClose').click(function() {
		modalOut();
	});

	// 바깥 영역 클릭 시 팝업 닫기
	$(".backdrop").click(function(e){
		if (!$('.modalContent').has(e.target).length){
			modalOut();
		}
	});
}

// 레이어 팝업(모달) 닫기
function modalClose(obj){
	if (obj != null && obj != undefined && obj != '') {
		var temp = $("#" + obj);
		temp.fadeOut(300).removeClass("open");
	} else {
		$(".modal").fadeOut(300).removeClass("open");
	}
	scrollOn(); // 바디 스크롤 제거 해제
}

$(document).ready(function(){
	// 모달 숨기기 - (css display:none 설정 시 리액트 애니메이션 오류 -> js로 처리)
	$(".modal").hide();
});

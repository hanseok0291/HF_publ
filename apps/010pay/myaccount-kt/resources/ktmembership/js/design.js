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
		temp.show();
		scrollOff(); // 바디 스크롤 제거
		
		// 위치
		var thisDialog = temp.children(".modal-dialog");
		var marginValue = thisDialog.outerHeight() / 2;
		$(thisDialog).css("margin-top", "-"+marginValue+"px");
		
		// 셀렉트 옵션 선택, 레이어 닫기(텍스트 전달)
		$("#" + optionLayer).find(".btn").click(function(){
			var thisOption = $(this).text();
			$("#" + selectId).text(thisOption);
		});
	});

	// 셀렉트 옵션 선택(알뜰폰 통신사 셀렉트박스)
	$(".btn-list .btn").click(function(){
		$(this).parents(".btn-list").find(".btn").removeClass("on");
		$(this).addClass("on");
		$(this).parents(".modal").hide();
		scrollOn(); // 바디 스크롤 제거 해제
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
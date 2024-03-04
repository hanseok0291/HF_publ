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
	// $(".accordion-list li").eq(0).addClass("active").find(".list-body").slideDown(300); // 첫번째 아이템 활성
	// $(".accordion-list .list-header .arrow-toggle").click(function(){
	// 	var thisItem = $(this).parents("li");
	// 	var otherItem = $(thisItem).siblings("li");
	// 	$(thisItem).toggleClass("active").find(".list-body").slideToggle(300);
	// 	$(otherItem).removeClass("active").find(".list-body").slideUp(300);
	// });

});
	
	// 하단 레이어 팝업(슬라이드 모달) 기본 세팅
var modalCont = $('.modal-info .modal-content');
var modalH = $(window).height();
modalH = modalH * -1;
$(modalCont).css('bottom', modalH); // 팝업들 bottom 값 setting

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

// 레이어 팝업(모달) 닫기
function modalClose(){
	$('.modal').hide();
	scrollOn(); // 바디 스크롤 제거 해제
}

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
	
	$(temp).find('.btn-close').on('click', function(e) {
		modalCloseSlide();
	});

	// bottom modal 닫기
	function modalCloseSlide() {
		temp.fadeOut(200);
		$(temp).find('.modal-content').animate({bottom: modalH}, 200);

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
		} else {
			modalContent.css("position", "fixed");
		}
	}
	modalContPos();

	// 리사이즈
	$(window).resize(function(){
		modalContPos();
	});
}

// Common Toast Modal
$.toastMessage = function(title, contents, callbackFunc) {
	var target = $("#commonToast");
	$(target).removeClass('hidden');
	// 모달 제목/내용
	// $('#alertTitle').html(title);
	// $('#alertContents1').html(contents);
	$('.toast-title').html(contents);

	// 모달 열기
	$(target).show().focus();

	// 모달 위치
	var thisDialog = $(target).find(".modal-dialog");
	var marginValue = thisDialog.outerHeight() / 2;
	$(thisDialog).css("margin-top", "-" + marginValue + "px");

	setTimeout(() => {
		$(target).fadeOut(200);
	}, 2000);
}

$.promptMessage = function(title, contents, promptObj, promptOkObj, callbackFunc) {
	$('#promptTitle').html(title);
	$('#promptContents').html(contents);

	var clickEvent = new Function(callbackFunc);
	promptOkObj.prop('onclick', null).off('click'); 	//기존에 등록된 함수가 반복 실행을 막음. reset
	promptOkObj.prop('onclick', '').click(clickEvent); 	//callback 함수 등록

    modalOpen(promptObj.attr("id"));
}

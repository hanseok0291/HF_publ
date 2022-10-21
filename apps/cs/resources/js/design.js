/**
 * Design Script
 */


 $(document).ready(function(){
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
	}, 200);
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
		if(lastScrollTop > 1){
			$("#header").css("border-bottom","1px solid #ececec");
		} else {
			$("#header").css("border-bottom","0");
			$("#header").removeClass("header-up").addClass("header-down");
		}
	}

	// 전체 메뉴(sidebar gnb)
	$("#gnb .depth2").prev("a").addClass("has-depth2"); // gnb depth 2 토글 아이콘 표시
	$("#gnb a").click(function(){
		$(this).parents("li").siblings().find("a").removeClass("active");
		if( $(this).hasClass("has-depth2") == true ){
			$(this).toggleClass("active");
		} else {
			$(this).addClass("active");
		}
	});

	// 콘텐츠 하단 여백
	function wrapPadding(){
		var bottomArea = $("#bottomArea:not(.hidden), :not(.hidden) #bottomArea");
		if(bottomArea.length > 0){
			var bottomAreaHeight = $(bottomArea).innerHeight()+50;
			$("#content").css("padding-bottom", bottomAreaHeight);
		} else {
			$("#content").css("padding-bottom", 40);
		}
	}
	wrapPadding();

	// 사이드바 열기/닫기
	$("#openSidebar").click(function(){
		$("body").addClass("modal-open");
		$("#sidebar").fadeIn(100);
		$("#sidebar .sidebar-content").animate({right: 0}, 200);
	});
	$("#closeSidebar, #sidebar .backdrop").click(function(){
		$("#gnb a").removeClass("active");
		$("body").removeClass("modal-open");
		$("#sidebar .sidebar-content").animate({right: '-100%'}, 200);
		$("#sidebar").fadeOut(350);
		$("#openSidebar").focus();
	});

	//form
	var input = $(".form-group .form-control");

	// input Focus
	input.focus(function(){
		$(this).parents(".form-group").addClass("focus");
	}).blur(function(){
		$(this).parents(".form-group").removeClass("focus");
	}).blur();

	// input value 확인, 삭제 버튼
	$(".form-group .form-control").on("input change", function() {
		var $this = $(this);
		var visible = Boolean($this.val());
		$this.next(".form-control-clear").toggleClass("hidden", !visible);
		$this.parents(".form-group").toggleClass("fill", visible);
	}).trigger("propertychange");
	$(".form-control-clear").on("click", function() {
		var $this = $(this);
		$this.prev(".form-control").val("").trigger("change").focus();
		$this.addClass("hidden");
		$this.parents(".form-group").removeClass("fill");
	});

	// select value 확인
	$("select.form-control").on("change", function() {
		var $this = $(this);
		var idx = $this.find("option").index( $this.find("option:selected") );
		if(idx == 0) {
			$this.parents(".form-group").removeClass("fill");
		} else {
			$this.parents(".form-group").addClass("fill");
		}
	});

	// 은행 선택
	$(".select-bank").click(function(){
		modalOpenSlide("modalBankList");
	});
	$(".modal-banklist .bank-list button").click(function(){
		// 모달 닫기
		modalCloseSlide("modalBankList");
		$(".bank-list").scrollTop(0);
		//은행 선택 버튼에 은행명 전달
		$(this).parents(".bank-list").find("button").removeClass("active");
		$(this).addClass("active");
		var bankCd = $(this).html();
		$('.select-bank').html(bankCd).focus();
	});

	// tab style radio slider (iOS 15 애니메이션 버그 해결 : 위치 % -> px)
	function checkSlider() {
		var checkItem = $(".check-group > input[type='radio']").eq(1); // 2번째 input
		var sliderWidth = $(".check-group").innerWidth() / 2; // input이 2개인 경우 50% 위치 값 -> px 계산
		if($(checkItem).is(":checked")){
			$(".check-group .slider ").css("left", sliderWidth);
		} else {
			$(".check-group .slider ").css("left", 0);
		}
	}
	checkSlider();
	$(".check-group").click(function(){
		checkSlider();
	});
	$(window).resize(function(){
		checkSlider();
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

// 레이어 팝업(모달) 열기
function modalOpen(obj){
	var temp = $("#" + obj);
	temp.show().focus();
	scrollOff(); // 바디 스크롤 제거

	// 위치
	var thisDialog = temp.children(".modal-dialog");
	var marginValue = thisDialog.outerHeight() / 2;
	$(thisDialog).css("margin-top", "-"+marginValue+"px");
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
	}else{
		$(".modal").hide();
	}
	scrollOn(); // 바디 스크롤 제거 해제
}

// 하단 레이어 팝업(슬라이드 모달) 기본 세팅
var modalCont = $('.modal-slide .modal-content');
var modalH = $(window).height();
modalH = modalH * -1;
$(modalCont).css('bottom', modalH); // 팝업들 bottom 값 setting

// 하단 레이어 팝업(슬라이드 모달) 열기
function modalOpenSlide(obj){
	var temp = $("#" + obj);
	var modalCont = $(temp).find(".modal-content");

	temp.show();
	$(modalCont).animate({bottom: 0}, 200);
	$(modalCont).find(".modal-body").focus();
	scrollOff(); // 바디 스크롤 제거

	// 바깥 영역 클릭 시 팝업 닫힘
	$(temp).on('click', function(e) {
		if(!$(".modal-content").has(e.target).length) {
			modalCloseSlide(obj);
		}
	});

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

// 하단 레이어 팝업(슬라이드 모달) 닫기
function modalCloseSlide(obj) {
	var temp = $("#" + obj);
	$(temp).fadeOut(150);
	$(temp).find(".modal-content").animate({bottom: modalH}, 100);
	scrollOn(); // 바디 스크롤 제거 해제
}

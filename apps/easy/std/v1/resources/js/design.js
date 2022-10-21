/* ie 버전 체크 */
function getInternetVersion(ver) {
	var rv = -1; // Return value assumes failure.
	var ua = navigator.userAgent;
	var re = null;
	if(ver == "MSIE"){
		re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
	}else{
	re = new RegExp(ver+"/([0-9]{1,}[\.0-9]{0,})");
		}
	if (re.exec(ua) != null){
		rv = parseFloat(RegExp.$1);
	}
	return rv;
}

//Layer Popup
function layer_open(obj){
	var temp = $('#'+obj);
	var bg = temp.parent().find(".bg").hasClass('bg');
	if(bg){
		temp.parent().show();
	}
	temp.find('.btn_cls').click(function(e){
		if(bg){
			$('.ly_pop').hide();
		}
		e.preventDefault();
	});
}
function layer_close(){
	$('.ly_pop').hide();
}
$(function(){
	$('.ly_pop').bind("click touchend", function(e) { //영역외 클릭 팝업 닫기
		if(!$('.ly_pop').hasClass('full')){
			if(!$('.ele').has(e.target).length) {
				layer_close();
			}
		}
	});
});

// form
$(function(){
	var ver = 0; // Browser Version
	var input = $('input[type=text],input[type=password],input[type=tel],input[type=email],textarea');
	var row = $('.input input');
	
	// input Focus
	input.focus(function(){
		$(this).addClass('focus');
	}).blur(function(){
		$(this).removeClass('focus');
	}).blur();
	
	row.focus(function(){
		$(this).parents('.input').addClass('focus');
		$(this).removeClass('focus');
		//현금영수증 설정 레이어 라디오 버튼
		if($('.checkbox').length > 0){
			$(this).prev('.checkbox').find('input').prop("checked",true);
			$(this).prev('.checkbox').find('label').addClass('on');
			$(this).parent('.input').siblings('.input').find('label').removeClass('on');
		}
	}).blur(function(){
		$(this).parents('.input').removeClass('focus');
	}).blur();
	
	// 체크박스 이미지
	if($('.checkbox input').is(':checked') == true) {
		$(this).next('label').addClass("on");
	}
	
	$(".checkbox").on('click', function(){
		if ($(".checkbox").children("input").length) {
			$("label").each(function(){ 
				$(this).removeClass("on");
			});
			$("input:checked").each(function(){ 
				$(this).next("label").addClass("on");
			});
		}
	});
	
	// placeholder 적용 안될 때, 주민번호 뒤 첫째 자리 배경
	var i_text = $('.input_help>label, .input_myid .num>label').next('.i_text');
	$('.input_help>label, .input_myid.num>label').css('position','absolute');
	i_text.focus(function(){
		$(this).prev('label').css('visibility','hidden');
	}).blur(function(){
		if($(this).val() == ''){
			$(this).prev('label').css('visibility','visible');
		} else {
			$(this).prev('label').css('visibility','hidden');
		}
	}).change(function(){
		if($(this).val() == ''){
			$(this).prev('label').css('visibility','visible');
		} else {
			$(this).prev('label').css('visibility','hidden');
		}
	}).blur();
	
	// input 값 삭제
	var valDel = $('.input .btn_del');
	valDel.on('click', function(){
		$(this).parent().find('input').val('').blur();
		$(this).parent().removeClass('on');
	});
	
	// 비밀번호 설정 입력상태 표시
	$('.input_mark input').bind("keyup input", function(e) {
		var keyCode = e.keyCode || e.which;
		var byte = $(this).val();
		var del = $(this).val() + 1;
		$('.input_mark .mark i').removeClass();
		if (byte.length == 1) {
			$('.input_mark .mark i:eq(0)').addClass('on');
		} else if (byte.length == 2) {
			$('.input_mark .mark i:eq(0), .input_mark .mark i:eq(1)').addClass('on');
		} else if (byte.length == 3) {
			$('.input_mark .mark i:eq(0), .input_mark .mark i:eq(1), .input_mark .mark i:eq(2)').addClass('on');
		} else if (byte.length == 4) {
			$('.input_mark .mark i:eq(0), .input_mark .mark i:eq(1), .input_mark .mark i:eq(2), .input_mark .mark i:eq(3)').addClass('on');
		} else if (byte.length == 5) {
			$('.input_mark .mark i:eq(0), .input_mark .mark i:eq(1), .input_mark .mark i:eq(2), .input_mark .mark i:eq(3), .input_mark .mark i:eq(4)').addClass('on');
		} else if (byte.length == 6) {
			$('.input_mark .mark i:eq(0), .input_mark .mark i:eq(1), .input_mark .mark i:eq(2), .input_mark .mark i:eq(3), .input_mark .mark i:eq(4), .input_mark .mark i:eq(5)').addClass('on');
		} else {
			$('.input_mark .mark i').removeClass();
		}
		// console.log(byte.length);
	});
});

$(document).ready(function() {
	//로고 이미지 1/2  축소
	$(".logo_area img").each(function() {
		var imgWidth = this.naturalWidth;
		$(this).css('width',imgWidth/2);
	});
	
	//하단 고정 버튼 여백
	var btmFix = $('.fix_btm_btn');
	if(btmFix.length > 0){
		var btmValue = $(btmFix).innerHeight();
		$('#wrap').css('padding-bottom',btmValue);
	}
	
	// 아코디언 (약관 펼쳐보기)
	$('.accordion .toggle_btn').click(function() {
		if ($(this).parents('li').hasClass('active')) {
			$(this).parents('li').removeClass('active');
			$(this).parents('.list_header').siblings('.list_content').slideUp('fast');
		} else {
			$(this).parents('.accordion_wrap').find('.list_content').slideUp('fast');
			$(this).parents('.accordion_wrap').find('li.active').removeClass('active');
			$(this).parents('li').addClass('active');
			$(this).parent('.list_header').next('.list_content').slideDown('fast');
		}
	});
	
	//레이어 토글(결제 > 즉시할인정보 레이어)
	$('.btn_help').click(function(event) {
		event.stopPropagation();
		$(this).toggleClass('active');
		$(this).next('.pop_help').toggle();
	});
	$('.pop_help').click(function(event) {
		event.stopPropagation();
	});
	$(document).click(function() {
		$('.btn_help').removeClass('active');
		$('.pop_help').hide();
	});

	//드롭다운(현금영수증 설정 팝업)
	$('.dropdown .head').click(function(event) {
		event.stopPropagation();
		$(this).toggleClass('focus');
		$(this).next('.list').toggle();
	});
	$(document).click(function() {
		$('.dropdown .head').removeClass('focus');
		$('.dropdown .list').hide();
	});
	
	$('.dropdown .list a').click(function() {
		//헤드 교체(selected)
		if ($(this).parent('li').hasClass('active')) {
			$(this).parents('.list').hide();
		} else {
			var text = $(this).html();
			$(this).parents('.dropdown').find('.head').html(text);
			$(this).parent('li').addClass('active').siblings('li').removeClass('active');
			$(this).parents('.list').hide();
		}
		$('.dropdown .head').removeClass('focus');
		
		//드롭다운 콘텐트 토글
		var thisHref = $(this).attr('href');
		$('.dropdown_wrap').find('#'+thisHref).addClass('active').siblings('.list_content').removeClass('active');
		return false;
	});

	// 본인인증 > 통신사 선택
	$('.form_type .telecom button').click(function() {
		$(this).parent('li').siblings('li').children('button').removeClass('selected');
		$(this).addClass('selected');
	});
	
	//본인인증 > 통신사 > 알뜰폰 통신사 선택
	$('.ly_frugal .btn').click(function() {
		$('.ly_frugal .btn').removeClass('btn_primary');
		$(this).addClass('btn_primary');
	});
	
	//관리 > 계좌관리 > 주거래 계좌 선택(별 표시)
	$('.list_bank .btn_star').click(function() {
		$('.list_bank .btn_star.on').removeClass('on');
		$(this).addClass('on');
	});
	
});
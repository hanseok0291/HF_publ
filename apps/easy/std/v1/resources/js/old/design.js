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
$(function(){
	var ver = 0; // Browser Version
	if(navigator.appName.charAt(0) == "M"){
		ver = getInternetVersion("MSIE");
		if (ver < "10"){
			$('body').addClass('ie');
		}
	}
});	

// form
$(function(){
	// 체크박스 이미지
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
	// placeholder
	var i_text = $('.input_help>label').next('.i_text');
	$('.input_help>label').css('position','absolute');
	i_text.focus(function(){
		$(this).prev('label').css('visibility','hidden');
		$(this).parent().addClass("focus");
	}).blur(function(){
		if($(this).val() == ''){
			$(this).prev('label').css('visibility','visible');
			$(this).parent().removeClass("focus");
		} else {
			$(this).parent().removeClass("focus");
			$(this).prev('label').css('visibility','hidden');
		}
	}).change(function(){
		if($(this).val() == ''){
			$(this).prev('label').css('visibility','visible');
			$(this).parent().removeClass("focus");
		} else {
			$(this).parent().removeClass("focus");
			$(this).prev('label').css('visibility','hidden');
		}
	}).blur();	
	// 비밀번호 설정 입력상태 표시
	$('.input_mark input').bind("focus keyup", function(e) {
		var keyCode = e.keyCode || e.which;
		var byte = $(this).val();
		var del = $(this).val()+1;
		$(this).parent().find('.mark i').removeClass();
		if(byte.length == 1){			
			$(this).parent().find('.mark i:eq(0)').addClass('on');
		}else if(byte.length == 2){
			$(this).parent().find('.mark i:eq(0), .mark i:eq(1)').addClass('on');
		}else if(byte.length == 3){
			$(this).parent().find('.mark i:eq(0), .mark i:eq(1), .mark i:eq(2)').addClass('on');
		}else if(byte.length == 4){
			$(this).parent().find('.mark i:eq(0), .mark i:eq(1), .mark i:eq(2), .mark i:eq(3)').addClass('on');
		}else if(byte.length == 5){
			$(this).parent().find('.mark i:eq(0), .mark i:eq(1), .mark i:eq(2), .mark i:eq(3), .mark i:eq(4)').addClass('on');
		}else if(byte.length == 6){
			$(this).parent().find('.mark i:eq(0), .mark i:eq(1), .mark i:eq(2), .mark i:eq(3), .mark i:eq(4), .mark i:eq(5)').addClass('on');
		}else{
			$(this).parent().find('.mark i').removeClass();
		}
	}).blur();
	// selectbox
	var top = $('.select').height();
	$(".select ul").css('top',top-1);
	$(".select ul li:first-child").addClass('first');
	$(".select ul li:last-child").addClass('last');
	$(".select.bank ul li:nth-child(4n)").addClass('even');
	$(".select .head").click(function(){
		$(this).parent().css('z-index','9');	
		$(this).parent().find("ul").toggleClass("show");
		$(this).parent().find("ul>li").click(function(){
			$(this).parent().parent().find(".head").text($(this).text());
			$(this).parent().parent().find("ul").removeClass("show");			
		});		
	});
	$('#ct').click(function(e){ //selectbox 외 클릭
		if(!$('.select').has(e.target).length) {
			$('.select').removeAttr('style');
			$(".select ul").removeClass("show");
		}
	});
});

// 설정
$(function(){	
	// 비밀번호 변경
	$('.pw_form .input_mark input').focus(function(){
		$(this).parent().addClass("focus");
	}).blur(function(){
		if($(this).val() == ''){
			$(this).parent().removeClass("focus");
		} else {
			$(this).parent().removeClass("focus");
		}
	}).change(function(){
		if($(this).val() == ''){
			$(this).parent().removeClass("focus");
		} else {
			$(this).parent().removeClass("focus");
		}
	}).blur();	
	// 현금영수증 관리
	$('.tax_form .input_help input').focus(function(){
		$(this).parent().parent().find('.select').removeClass('selected');
	}).blur(function(){
		if($(this).parent().parent().parent().find('.checkbox input').prop("checked")){
			$(this).parent().parent().find('.select').addClass('selected');
		}
	});
	$(".tax_form .checkbox").on('click', function(){
		$(".tax_form .select").removeClass('selected');
		$(this).next().find('.select').addClass('selected');
	});
	// 계좌추가/삭제
	$(".bankup_area .upload .select li").on('click', function(){
		var _index = $(this).index();
		if(_index == 0){
			$('.btn_plus').removeClass('on');			
		}else{
			$('.btn_plus').addClass('on');
		}
	});
});

// 은행선택
$(function(){
	$(".bank_select li>button").on('click', function(){
		$(".bank_select li>button").removeClass();
		$(this).addClass('selected');
	});
	$(".btn_event").hover(
		function(){
			$(this).next('.ly_event_ball').show();
			if($('.ly_event_ball .txt').height() < 17){
				$('.ly_event_ball .txt').addClass('tc');
			}else{
				$('.ly_event_ball .txt').removeClass('tc');
			}
		}, function(){
			$(this).next('.ly_event_ball').hide();
		}
	);
});

// tab
$(function(){
	$(".tab_type li:first-child").addClass('first');
	$(".tab_type a").on('click', function(e){
		$(".tab_type a").removeClass();
		$(this).addClass('selected');
		e.preventDefault();
	});
});
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

// body 폰트사이트
var winW = $(window).width();
function fontSize(w) {
	var fontSize = w / 5.12;
	$('html').css('font-size', Math.floor(fontSize*100)/100 + '%');	
}
fontSize(winW);
$(window).resize(function(){
	var winW = $(window).width();
	fontSize(winW);
});

//Layer Popup
function layer_open(obj){
	var temp = $('#'+obj);
	var bg = temp.parent().find(".bg").hasClass('bg');
	if(bg){
		temp.parent().show();
	}	
	var ver = 0; // Browser Version
	if(navigator.appName.charAt(0) == "M"){
		ver = getInternetVersion("MSIE");
		if (ver < "8"){
			if (temp.outerHeight() <= $(document).height() ) temp.css('margin-top', '-'+temp.outerHeight()/5+'px');
			if (temp.outerWidth() <= $(document).width() ) temp.css('margin-left', '-'+temp.outerWidth()/2.5+'px');
		}else{
			if (temp.outerHeight() < $(document).height() ) temp.css('margin-top', '-'+temp.outerHeight()/2+'px');
			else temp.css('top', '0');
			if (temp.outerWidth() < $(document).width() ) temp.css('margin-left', '-'+temp.outerWidth()/2+'px');
			else temp.css('left', '0');
		}
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

// bottom value
$(function(){
	var btmFix = $('.fix_btm_btn');
	if(btmFix.length > 0){
		var btmValue = $('.fix_btm_btn').innerHeight();
		$('#wrap').css('padding-bottom',btmValue);
	}	
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
		$(this).parent().addClass('focus');
		$(this).removeClass('focus');
		if($('.checkbox').length > 0){
				$(this).prev().find('input').prop("checked",true);
			}
	}).blur(function(){
		$(this).parent().removeClass('focus');
	}).blur();	
	// placeholder 적용 안될때
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
	// 현금영수증 설정
	var taxbtn = $('.taxbx h3 button');
	taxbtn.on('click', function(){
		$('.tax_set article').removeClass('active');
		$(this).parent().parent().addClass('active');
	});
	// input 값 삭제
	var valDel = $('.input .btn_del');
	valDel.on('click', function(){
		$(this).parent().find('input').val('').blur();
		$(this).parent().removeClass('on');
	});
	// 통신사선택
	var telBtn = $('.form_type .telecom button');
	telBtn.on('click', function(e){
		$(this).parent().parent().find('button').removeClass('selected');
		$(this).addClass('selected');
	});
	// 비밀번호 설정 입력상태 표시
	$('.input_mark input').bind("keyup input", function(e) {
		var keyCode = e.keyCode || e.which;
		var byte = $(this).val();
		var del = $(this).val()+1;
		$('.input_mark .mark i').removeClass();
		if(byte.length == 1){			
			$('.input_mark .mark i:eq(0)').addClass('on');
		}else if(byte.length == 2){
			$('.input_mark .mark i:eq(0), .input_mark .mark i:eq(1)').addClass('on');
		}else if(byte.length == 3){
			$('.input_mark .mark i:eq(0), .input_mark .mark i:eq(1), .input_mark .mark i:eq(2)').addClass('on');
		}else if(byte.length == 4){
			$('.input_mark .mark i:eq(0), .input_mark .mark i:eq(1), .input_mark .mark i:eq(2), .input_mark .mark i:eq(3)').addClass('on');
		}else if(byte.length == 5){
			$('.input_mark .mark i:eq(0), .input_mark .mark i:eq(1), .input_mark .mark i:eq(2), .input_mark .mark i:eq(3), .input_mark .mark i:eq(4)').addClass('on');
		}else if(byte.length == 6){
			$('.input_mark .mark i:eq(0), .input_mark .mark i:eq(1), .input_mark .mark i:eq(2), .input_mark .mark i:eq(3), .input_mark .mark i:eq(4), .input_mark .mark i:eq(5)').addClass('on');
		}else{
			$('.input_mark .mark i').removeClass();
		}
		// console.log(byte.length);
	});
});

//tab
$(function(){
	var btn = $('.tab_type button');
	btn.on('click', function(e){
		btn.removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});
});

// 은행선택
$(function(){
	var btn = $('.bank_list button');
	$('.bank_list li:nth-child(3n)').addClass('last');
	btn.on('click', function(){
		btn.removeClass('selected');
		$(this).addClass('selected');
	});
});

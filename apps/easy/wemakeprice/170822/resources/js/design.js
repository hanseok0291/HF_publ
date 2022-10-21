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
		temp.parent().fadeIn();
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
			$('.ly_pop').fadeOut();
		}
		e.preventDefault();
	});	
}
function layer_close(){
	$('.ly_pop').fadeOut();
}

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
	}).blur(function(){
		$(this).parent().removeClass('focus');
	}).blur();
	// 브라우저 확인 후 적용
	if(navigator.appName.charAt(0) == "M"){
		ver = getInternetVersion("MSIE");		
		if (ver < "10"){ // ie10 이하
			// placeholder
			$('[placeholder]').focus(function() {
				var input = $(this);
				if (input.val() == input.attr('placeholder')) {
					input.val('');
					input.removeClass('placeholder');					
				}
				}).blur(function() {
				var input = $(this);
				if (input.val() == '' || input.val() == input.attr('placeholder')) {
					input.addClass('placeholder');
					input.val(input.attr('placeholder'));
				}
			}).blur();
		}
	}
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
	// placeholder 적용 안될때
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
			$(this).prev('label').css('visibility','hidden');
		}
	}).change(function(){
		if($(this).val() == ''){
			$(this).prev('label').css('visibility','visible');
			$(this).parent().removeClass("focus");
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

//toggle
$(function(){
	// 약관
	var obj = $('.agree_set .btn_aree');
	var ans = $('.agree_set li.a');
	obj.on('click', function(e){
		if(!$(this).hasClass('active')){
			obj.removeClass('active');
			ans.removeClass('open');
			ans.filter(':visible').css('display', 'none');
			$(this).addClass('active').parent().next('li.a').css('display', 'block');
		}else{
			$(this).removeClass('active');
			$(this).parent().next('li.a').css('display', 'none');
		}
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

// 알뜬폰(팝업) 선택
$(function(){
	var btn = $('.ly_subphone li button');
	btn.on('click', function(){
		btn.removeClass('selected');
		$(this).addClass('selected');
	});
});
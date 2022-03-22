
$(document).ready(function(){
	setRatio();		//img 사이즈 비율
	iconCtl();		//아이콘 제어
	gnbCtl();		//gnb 서브메뉴 제어
	//accordionCtl(); //QnA 펼침

	dropMenu();	//관련사이트 버튼 제어
	urlHotdealCopy()//핫딜 페이지 URL 복사
	urlCopy();		//URL 복사
	browser_ver();	//브라우저 버전 체크

	positionCtl.topBtn();		// top 버튼 제어
	positionCtl.navP();			// GNB 고정
	positionCtl.tabP();			// Tab 고정
	positionCtl.notice_tabP();	// 소식 Tab 고정
	
	motionCtrl();	// 스왑 이미지 모션제어
	introAuto();	// 인트로 모션
	
	positionCtl.insertTargetPosition(); // 애니메이션 위치값 할당
	positionCtl.aniActive();			// 애니메이션 활성화
	
});

$(window).on('resize',function(){
	var windowW = $(window).innerWidth();
	    _hidden	= $('body.hidden').length;

	// console.log('resize');

	setRatio();		//img 사이즈 비율

	positionCtl.navP();					// GNB 고정
	positionCtl.tabP();					// Tab 고정
	positionCtl.notice_tabP();			// 소식 Tab 고정
	positionCtl.insertTargetPosition(); // 애니메이션 위치값 할당 

	$('.navbar-nav >.nav-item.active').removeClass('hover');
	if(_hidden>0){ //모바일에서 GNB 가 열린 상태에서
		if (windowW > 767) { //PC버전으로 넘어갈 경우
			$('.navbar-nav >.nav-item.active').on('mouseover', function(){
				$(this).addClass('hover');
			});
			$('.navbar-nav >.nav-item.active').on('mouseleave', function(){
				$(this).removeClass('hover');
			});
		};
	}else if(_hidden<=1){//모바일에서 GNB 가 닫힌 상태에서  
		if (windowW > 751) { //PC버전으로 넘어갈 경우
			$('.navbar-nav >.nav-item.active').on('mouseover', function(){
				$(this).addClass('hover');
			});
			$('.navbar-nav >.nav-item.active').on('mouseleave', function(){
				$(this).removeClass('hover');
			});
		};
	}
});

$(window).on('scroll',function(){
	motionCtrl();	//모션제어

	positionCtl.topBtn();		//top 버튼 제어
	positionCtl.navP();			// GNB 고정
	positionCtl.tabP();			// Tab 고정
	positionCtl.notice_tabP();	// 소식 Tab 고정
	positionCtl.aniActive();	// 애니메이션 활성화
});

/* 이전페이지로 이동 */
back = function(){
	history.back();
}

/* icon 제어 */
iconCtl = function(){
	var windowW = window.innerWidth;
		_btnN	= $('.btn_menu').length;
		_backN	= $('.go_back').length;
		_arrow	= $('.navbar-nav >.nav-item.active >a i').length;

	if(_btnN<1 && _backN<1){
		$('.GNB .container').append('<div class="btn_menu"><i class="one"></i><i class="two"></i><i class="three"></i></div>');
		$('.detail .section:first-child .container').prepend('<a href="javascript:back();" title="이전페이지로 이동" class="go_back"></a>');
	}	

	// 마커라인
	$('.mark_line').append('<i></i>');

	// open /close 버튼
	$('body').append('<div class="dim"></div>');
	$(".GNB .btn_menu").on('click keypress', function(){
		$('.GNB').toggleClass('open');
		$('.dim').toggle();
		$('body').toggleClass('hidden');
	});

	/* GNB */
	if($('.GNB .nav-item').find('ul').length){



		$('.navbar-nav >.nav-item ul').parent().addClass('active');
		if(_arrow < 1){
			$('.navbar-nav >.nav-item.active >a').append('<i></i>');
		}
	}

	$('.dim').on('click keypress', function(){
        $(this).fadeOut();
        $('.GNB').removeClass('open');
        // $(document).off(".disableScroll");
        $('body').toggleClass('hidden');
        return false;
    });

	// 상단으로 이동 버튼
	$(".btn_top:not(.share)").on('click keypress',function () {
		$("body, html").animate({scrollTop: 0}, 500);
		return false;
	});	
}

/* img ratio */
setRatio = function(){
	//동영상 비율
	var mediaH = $('.intro_top .media').width();	
	$('.intro_top .media iframe').css('height', mediaH*.562);
}

/* gnb 서브메뉴 제어 */
gnbCtl = function(){
	var windowW = $(window).width();

	if (windowW > 750) { //PC버전
		// console.log('pc windowW:'+windowW);
		$('.navbar-nav >.nav-item.active').on('mouseover', function(){
			$(this).addClass('hover');
		});
		$('.navbar-nav >.nav-item.active').on('mouseleave', function(){
			$(this).removeClass('hover');
		});
	}else if(windowW < 768){ //모바일 버전
		// console.log('mobile windowW:'+windowW);
		$('.navbar-nav >.nav-item.active >a').on('click keypress', function(){
			$(this).parent().toggleClass('open');
			return false;
		});		
	}

}

/* 페이지 위치에 따른 제어 */
var positionCtl = { // 스크롤에 따른 GNB , TAB  위치고정 & 모션
	
	// GNB 
	navP : function (obj) {
		if ($(window).scrollTop() > 0) {
			$("header").addClass("fixed");
		} else {
			$("header").removeClass("fixed");
		}
	},

	// 소식 Tab
	notice_tabP : function(obj){
		var windowW = $(window).width(),				//화면 가로 사이즈
			gnbH	= $('.GNB').outerHeight(),			// GNB 높이 
			tabNavH	= $('.tab_nav').outerHeight(),		// Tab 높이
			tabNavPos = gnbH + tabNavH;					// tab 좌표

		if (windowW < 751 && $(window).scrollTop() > tabNavPos) { // 모바일버전
				$('.tab_nav').parent().addClass('fixed');
		}else{ // PC버전 
			$('.tab_nav').parent().removeClass('fixed');
		}
	},

	// main Tab
	tabP : function(){
		var introH  = $('.intro').outerHeight(),		// 인트로 높이값
			tabH	= $('.tab').outerHeight(),			// Tab 높이
			gnbH	= $('.GNB').outerHeight(),			// GNB 높이
			tabPos 	= introH - tabH - gnbH;				// tab 좌표

		if ($(window).scrollTop() > tabPos){
			$('.tab').addClass('fixed');
		}else{
			$('.tab').removeClass('fixed');
		}
	},

	//애니메이션 
	aniActive : function(obj){
		var windowH	= $(window).height(),	//화면 세로 사이즈
			delayPosition = windowH/4; 		// 다음 섹션이 브라우저 하단으로부터 1/4 만큼 보여질때

      	var position = $(window).scrollTop() + windowH - delayPosition;
      	// 현재의 위치 = 스크롤이 이동한 값 + 윈도우 높이 - 처음에 선언한 지연 위치값(200);
 
	    $('.section.ready').each(function() {
            if(!$(this).hasClass('animation') && $(this).data('offsetTop') < position) {
				$(this).addClass('animation');
				$(this).removeClass('ready');
            }
        });

		$('.hotdeal .section').each(function() {
            if(!$(this).hasClass('animation') && $(this).data('offsetTop') < position) {
				$(this).addClass('animation');
            }
        });
	},

	//애니메이션 위치값 할당
	insertTargetPosition : function(obj) {
		windowH = $(window).height(); // 브라우저의 높이값 할당

		$('.section').each(function() { // 모든 대상 엘리먼트에
            $(this).data('offsetTop', ($(this).offset().top)); // 각자의 위치 값을 할당
        });
    },

    // Top 버튼 제어
    topBtn : function(obj){
    	var windowH = $(window).innerHeight(), 		// 브라우저의 높이값 할당
    		bodyH 	= document.body.scrollHeight,	//body 사이즈
    		btnPos 	= bodyH - windowH;				// btn 좌표

		// Top 버튼 표출
		if($(window).scrollTop()< windowH/3){
			$(".btn_top").removeClass('on');
			$(".btn_top").fadeOut('fast');			
		}else{
			$(".btn_top").addClass('on');
			$(".btn_top").fadeIn('fast');			
		}

		//페이지 하단까지 스크롤 한경우 top버튼 위치 조정
		if ($(window).scrollTop() >= btnPos) {
			$(".btn_top").addClass('fixed');
		}else{
			$(".btn_top").removeClass('fixed');
		}
	}	
}

// 인트로 인터랙션
introAuto = function(){
	$('.intro').addClass('animation').stop(1000);
    $('.section.card').addClass('animation');

	var _obj		= $('.img_link li');
	var _objNum		= $('.img_link li').length;
	var _iconNum 	= _objNum;
	var	_icM 		= $('.img_link li >div div');
	var _stop, _rollInterval;

	var nextPlay	= function(){
		_iconNum++;
		if(_iconNum >= _objNum) _iconNum = 0;
		indcateChange(_iconNum);
      	return false;
	}

	var stopPlay	= function(){
    	clearInterval(_rollInterval);
    }

	var autoPlay	= function(){
	   	_rollInterval	= setInterval(nextPlay, 2000);
	}

	var indcateChange = function(idx){
    	var _thisIdx = _icM.parent().parent().eq(idx);

    	_thisIdx.siblings().removeClass('on');
		_thisIdx.addClass('on');
    }

	autoPlay();
}

/* 모션	*/
motionCtrl = function(){
	var windowH = window.innerHeight,				//화면 사이즈
		footerH = $('.footer').outerHeight(),		//footer 사이즈
		gnbH	= $('.GNB').outerHeight(),			// GNB 높이
		cardH	= $('.check_card .card').outerHeight(),
		tabH	= $('.tab').outerHeight()			// Tab 높이

	// 행운카드 swap
	$(function lucky(){
		if ($(window).scrollTop() >= cardH - gnbH) {
			$('.img_area_01').delay(3000).animate({opacity: '0',left:'-100%',},300);
			$('.img_area_02').delay(3000).animate({opacity: '1',left:'0px'},300);
			$('.img_area_01').delay(3000).animate({opacity: '1',left:'0px',},300);
			$('.img_area_02').delay(3000).animate({opacity: '0',left:'-100%'},300,lucky);
		};
	});

}
	
/* FAQ 아코디언 메뉴 */
accordionCtl = function(){
	$(".faq_tit").on('click keypress',function(){
		$(this).siblings(".faq_answer").slideToggle('fast');

		// 선택한 외의 list 닫기
		// $(this).parent().siblings().find(".faq_answer").slideUp('fast');
	});
}

/* 관련사이트 제어 */
dropMenu  = function(){
	$(".dropup .family").on('click keypress',function(){
		$(this).parent().toggleClass('active');
	});	
}

/* URL 복사*/
urlCopy = function(){
	$(".tit_area .link").on("click kepress", function(e) {
		// 링크복사 시 화면 크기 고정 
		$('html').find('meta[name=viewport]').attr('content', 'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no'); 
		var html = "<input id='clip_target' type='text' value='' style='position:absolute;top:-9999em;'/>";
		$(this).append(html); 

		var input_clip = document.getElementById("clip_target"); //현재 url 가져오기 
		var _url = $(location).attr('href');
				
		$("#clip_target").val(_url); 
		if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) { 
			var editable = input_clip.contentEditable;

	 		var readOnly = input_clip.readOnly;
	 			input_clip.contentEditable = true;
	 			input_clip.readOnly = false;
	 		var range = document.createRange();
	 			range.selectNodeContents(input_clip);
	 		var selection = window.getSelection();
	 			selection.removeAllRanges();
	 			selection.addRange(range);
	 			input_clip.setSelectionRange(0, 999999);
	 			input_clip.contentEditable = editable;
	 			input_clip.readOnly = readOnly;
		} else { 
			input_clip.select();
		} try { 
			var successful = document.execCommand('copy');
			input_clip.blur();
		if (successful) { alert("URL이 복사 되었습니다. 원하시는 곳에 붙여넣기 해 주세요.");
			// 링크복사 시 화면 크기 고정 
			$('html').find('meta[name=viewport]').attr('content', 'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=yes');
		} else {
			alert('이 브라우저는 지원하지 않습니다.'); }
		} catch (err) {
			alert('이 브라우저는 지원하지 않습니다.'); 
		} 
		return false;
	}); //클립보드 복사
}

/* URL 복사*/
urlHotdealCopy = function(){
	$(".btn_top.share").on("click kepress", function(e) {
		// 링크복사 시 화면 크기 고정 
		$('html').find('meta[name=viewport]').attr('content', 'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no'); 
		var html = "<input id='clip_target' type='text' value='' style='position:absolute;top:-9999em;'/>";
		$(this).append(html); 

		var input_clip = document.getElementById("clip_target"); //현재 url 가져오기 
		var _url = $(location).attr('href');
				
		$("#clip_target").val(_url); 
		if (navigator.userAgent.match(/(iPod|iPhone|iPad)/)) { 
			var editable = input_clip.contentEditable;

	 		var readOnly = input_clip.readOnly;
	 			input_clip.contentEditable = true;
	 			input_clip.readOnly = false;
	 		var range = document.createRange();
	 			range.selectNodeContents(input_clip);
	 		var selection = window.getSelection();
	 			selection.removeAllRanges();
	 			selection.addRange(range);
	 			input_clip.setSelectionRange(0, 999999);
	 			input_clip.contentEditable = editable;
	 			input_clip.readOnly = readOnly;
		} else { 
			input_clip.select();
		} try { 
			var successful = document.execCommand('copy');
			input_clip.blur();
		if (successful) { alert("URL이 복사되었어요\n핫딜을 친구들에게 알려주세요!");
			// 링크복사 시 화면 크기 고정 
			$('html').find('meta[name=viewport]').attr('content', 'width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=yes');
		} else {
			alert('이 브라우저는 지원하지 않습니다.'); }
		} catch (err) {
			alert('이 브라우저는 지원하지 않습니다.'); 
		} 
		return false;
	}); //클립보드 복사
}

/* browser  버전 체크 */
get_version_of_IE = function() { 
	 var word; 
	 var agent = navigator.userAgent.toLowerCase(); 

	 // IE old version ( IE 10 or Lower ) 
	 if ( navigator.appName == "Microsoft Internet Explorer" ) word = "msie "; 
	 // IE 11 
	 else if ( agent.search( "trident" ) > -1 ) word = "trident/.*rv:"; 
	 // Microsoft Edge  
	 else if ( agent.search( "edge/" ) > -1 ) return -1;
	 // 그외, IE가 아니라면 ( If it's not IE or Edge )  
	 else return -1; 

	 var reg = new RegExp( word + "([0-9]{1,})(\\.{0,}[0-9]{0,1})" ); 

	 if (  reg.exec( agent ) != null  ) return parseFloat( RegExp.$1 + RegExp.$2 ); 
	 return -1; 
}

browser_ver	= function(){
	var verNumber = get_version_of_IE();
	
	if ( verNumber == -1 ||  verNumber >= 9) { 
		$('#verCheck').hide();
	} else { 
		$('#verCheck').show();
	}
}

/* 팝업창 제어 */
popup1 = function(url, name) {
    var options  = 'width= 420, height=610, top=30, left=20, status=no, scrollbars=yes, resizable, toolbar=no';
	window.open(url, name, options);
}
popup2 = function(url, name) {
  var options  = 'width= 800, height=700, top=30, left=20, resizable=no, scrollbars=yes, location=no';
  window.open(url, name, options);
}
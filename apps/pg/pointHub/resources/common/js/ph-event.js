/**
 * Copyright (c) 2018 KT, Inc.
 * All right reserved.
 *
 * This software is the confidential and proprietary information of KT,
 * Inc. You shall not disclose such Confidential Information and
 * shall use it only in accordance with the terms of the license agreement
 * you entered into with KT.
 *
 * Revision History
 * Author            Date              Description
 * ------            -----             ------------
 * lys               2018.07.07        공통 이벤트 관리 
 */
PHEvt = function(){
	this.isLog = true;
};

//공통 이벤트 펑션
PHEvt.prototype.commEvent = function(obj) {
	
	// 숫자 체크
	PHEvt.commNum();

	// 금액 체크
	PHEvt.commComma();
	
	// 한글제거 체크
	PHEvt.commExpHg();
};


//공통 이벤트 펑션 - 사업자번호
PHEvt.prototype.commBizNo = function(bizNo1, bizNo2, bizNo3) {
	
	//인증공용모듈 이벤트 바인딩 - 카드
	$('#'+bizNo1+', #'+bizNo2+', #'+bizNo3).on('keyup', function(){
		var _self = $(this);
		
		//PHFnc.log('_self val==>'+_self.val());
		if(event.keyCode != 46 &&  event.keyCode != 8 && event.keyCode != 37 && event.keyCode != 39){
			_self.val(_self.val().replace(/[^0-9]/gi,""));
		}
		
		//포커스 이동
		if( (_self.attr('id') != bizNo3) ) {
			if( _self.attr('id') == bizNo1  ){
				if(_self.val().length == 3){
					$('#'+bizNo2).select();
				}
			} else if( _self.attr('id') == bizNo2 ) {
				if(_self.val().length == 2){
					$('#'+bizNo3).select();
				}
			}
		}	
		
		return false;
	});
};

/* 
 * 공통합수 - 여기서 부터 사용하세요.
 */
//1.주민번호,전화번호 키 포커스 이벤트
//예) PHEvt.commFocus('ssnoFr', 'ssnoTo', 6);
PHEvt.prototype.commFocus = function(focusFr, focusTo, num) {

	//인증공용모듈 이벤트 바인딩 - 휴대전화 인증
	$('#'+focusFr+', #'+focusTo).on('keyup', function(e){
		var _self = $(this);
		
		//일반일 경우
		if(_self.attr('id') == focusFr) {
			
			/* event.keyCode != 16 shift event.keyCode == 46 delete  event.keyCode == 8 backspace  event.keyCode == 37 왼쪽화살표   event.keyCode == 39 오른쪽 화살표*/
			if(event.keyCode != 16 && event.keyCode != 46  && event.keyCode != 8 &&  event.keyCode != 37 && event.keyCode != 39){
				if(_self.val() != null && _self.val() != ""){
					_self.val(_self.val().replace(/[^0-9]/gi,""));
		    	}
		    }
		//암호화일 경우
		}else{
			//잉카 로직에서 처리
		}
		
		//포커스 이동
		if(_self.attr('id') == focusFr) {
			if(_self.val().length == num){
				$('#'+focusTo).select();
			}
		}	

		return false;
		
	});
};

//2.공통 이벤트 펑션 - 숫자 체크
//예) <input type="text" id="popCal-loanIrt" name="popCal-loanIrt" value="0" numeric="Y">
PHEvt.prototype.commNum = function(obj) {
	
	//IE면 ime-mode 정의
	if( PHUtil.isIE() ) $('input:text[numeric="Y"]').attr("style", "ime-mode:disabled;");
	
	//인증공용모듈 이벤트 바인딩 - 휴대전화 인증
	$('input:text[numeric="Y"], input:password[numeric="Y"]').on('keydown', function(e){
		var _self = $(this);
		//PHFnc.log('event.keyCode==>'+event.keyCode);
		//PHFnc.log(event.shiftKey);
		
		//일반일 경우
		if(_self.attr('type') == "text") {
			/* event.keyCode != 9 tab event.keyCode != 16 shift event.keyCode == 46 delete  event.keyCode == 8 backspace  event.keyCode == 37 왼쪽화살표   event.keyCode == 39 오른쪽 화살표*/
			if( event.keyCode != 35 && event.keyCode != 36 && 
				(event.keyCode != 67 && event.keyCode != 9 && event.keyCode != 46  && event.keyCode != 8 &&  event.keyCode != 37 && event.keyCode != 39) ) {
				//_self.val(_self.val().replace(/[^0-9]/gi,""));
				if( (!event.shiftKey) && ((event.keyCode >= 48 && event.keyCode <=57) ||(event.keyCode >= 96 && event.keyCode <=105)) ) {
					return true;
					
				} else if( (event.keyCode == 86) ) {
					//ctrl + v
					$(event.target).one('keyup', function(e) {
						//PHFnc.log( $(this).val() );
						$(this).val( $(this).val().replace(/[^0-9]/gi,"") );
					});
					return true;
				};
				
				return false;
				
			} else {
		    	return true;
		    }
		//암호화일 경우
		} else {
			//nppfs-1.9.0.js에서 숫자만 입력받게 처리.
		}
		
	});
};

//3.공통 이벤트 펑션 - 금액 체크
//예) <input type="text" id="popCal-loanIrt" name="popCal-loanIrt" value="0" comma="Y">
PHEvt.prototype.commComma = function(obj) {

	//인증공용모듈 이벤트 바인딩 - 휴대전화 인증
	$('input:text[comma="Y"], input:password[comma="Y"]').on('keyup', function(e){
		
		var _self = $(this);
		//PHFnc.log('numeric val==>'+_self.val());
		
		/* event.keyCode != 16 shift event.keyCode == 46 delete  event.keyCode == 37 왼쪽화살표   event.keyCode == 39 오른쪽 화살표*/
		if(event.keyCode != 16 && event.keyCode != 46 &&  event.keyCode != 37 && event.keyCode != 39){
			if(_self.val() != null && _self.val() != ""){
				_self.val(PHUtil.setComma(_self.val().replace(/[^0-9]/gi,"")));
	    	}
	    }
		
		return false;
	});
};

//4.공통 이벤트 펑션 - 한글제거 체크
//예) <input type="text" id="popCal-loanIrt" name="popCal-loanIrt" value="0" style="ime-mode:disabled;" maxlength="20" expHg="Y">
PHEvt.prototype.commExpHg = function(obj) {
	
	//인증공용모듈 이벤트 바인딩 - 휴대전화 인증
	$('input:text[expHg="Y"], input:password[expHg="Y"]').on('keyup', function(e){

		var _self = $(this);
		var expHg = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g;//한글제거
		
		//PHFnc.log('expHg2==>'+_self.val().replace(expHg,""));
		//키보드보안 적용된 항목의 경우, 키보드보안에서 자체적으로 한글입력을 막기 때문에 Pass 한다.
		if( _self.is("input[npkencrypt=on]") ) {
			return;
    	} else if ( _self.val() != null && _self.val() != "" ) {
    		_self.val(_self.val().replace(expHg,""));
    	}
	});
};

//key press
function chkKeyPress(e)
{
	var keyCode = 0;
	var shiftKey = false;
	keyCode = (window.event)?e.keyCode:e.which; // 파이어폭스는 keycode == which
	shiftKey = e.shiftKey;

	if ((keyCode >= 65 && keyCode <= 90) && !shiftKey){
		var x = $(e.target).offset().left;
		var y = $(e.target).offset().top;
			y = (y + parseInt($(e.target).css("height").replace("px",""))+5); // y + 타겟높이 + 여백(5)
			
		showCapsLockMsg(x, y);
	} else {
		hideCapsLockMsg(x, y);
	}
}

// key down - capslock opt
function chkKeyDown(e)
{
	var keyCode  = 0;
	keyCode = e.keyCode;
	if (keyCode == 20) hideCapsLockMsg();
}

// show Caps Lock msg - capslock opt
function showCapsLockMsg(x, y)
{
	var cl = $("#capsLock");
	cl.css("left", x);
	cl.css("top", y);
	cl.show();
	setTimeout(function() { cl.hide();},5000);
}

// hide Caps Lock msg
function hideCapsLockMsg()
{
	$("#capsLock").hide();
}

//클래스 생성
var PHEvt = new PHEvt();
/*정규식*/
var re = {
			seqFormat:/^([a-zA-Z]{3})(\d{17})$/,			//SEQ 정규식
			seqFormat2:/^([a-zA-Z]{3})(\d{15})$/,			//SEQ2 정규식
			nameFormat:/^[가-힣]{2,10}|[a-zA-Z\s]{2,30}$/,		//성명 정규식
			nameFormatKo:/^[가-힣]{2,10}$/,		            //성명 정규식(한글)
			nameFormatEn:/^[a-zA-Z\s]{2,30}$/,		        //성명 정규식(영어)
			birthdayFormat:/^(\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/,	//생년월일  yymmdd
			birthdayRangeFormat:/^\d{6}$/,					//생년월일  정규식(숫자 6자리)
			phoneFormat:/^01([016789])(\d{3,4})(\d{4})$/,	//핸드폰 정규식
			actionTypeFormat:/^\d{2}$/,						//화면수행구분 정규식(숫자 2자리)
			sexFormat:/^[1-8]{1}$/,							//성별 정규식
			telCoFormat:/^\d{1}$/,							//통신사코드 정규식
			numberFormat:/^[0-9]+$/,						//숫자 형식 정규식
			cashRcptCardFormat:/^[0-9]{16,18}$/,			//현금영수증카드 형식 정규식(자릿수 체크16~18자)
			bizNoFormat:/^[0-9]{10}$/,						//사업자번호 정규식(자릿수 체크10자)
			cnumFormat:/^\d{6}$/,							//인증번호 정규식
			cnumFourFormat:/^\d{4}$/,							//인증번호 4자리 숫자 정규식
			captchaFormat:/^\d{5}$/,						//보안문자 입력값 정규식
			accountFormat:/^\d{8,15}$/,					    //계좌번호 정규식
			bankCdFormat:/^\d{2,4}$/,						//은행코드 정규식
			pinFormat:/^\d{6}$/,							//PIN번호 정규식
			bankAuthStrFormat:/^[가-힣]{4}$/,				//계좌점유인증 문자열4자리 정규식
			emailFormat:/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,	//이메일정규식
			prFormat:/^[0-9A-Z]{64}$/	//pay정규식
		};

/*정규식 확인*/
var inputObj;

$.check = function(re, what, message, message2) {

	inputObj = what;

	what.val(what.val().replace(/\s/gi,""));

	if(!$.emptyCheck(what, message2)){
		return false;
	}

   	if(re.test(what.val())){
   		return true;
   	}

   	alert(message, function(){$.checkNext()});
}

$.checkVal = function(re, what) {

	inputObj = what;

	what.val(what.val().replace(/\s/gi,""));

	if(!what.val()){
		return false;
	}

   	if(re.test(what.val())){
   		return true;
   	}

}

$.checkValNoRep = function(re, what) {

	inputObj = what;

	what.val(what.val());

	if(!what.val()){
		return false;
	}

   	if(re.test(what.val())){
   		return true;
   	}

}

$.checkNext = function() {
	inputObj.focus();
}

$.emptyCheck = function (what, message){
	if(!what.val()){
		alert(message, function(){$.checkNext()});
		return false;
   	}else{
   		return true;
   	}
}

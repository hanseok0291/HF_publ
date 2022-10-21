/**
 *
 */


$.alertMessage = function(contents, alertObj) {
	$('#alertContents').html(contents);
	modalOpen(alertObj.attr("id"));
}

$.closeAlertMessageCallback = function(contents, alertObj, callbackFunc) {
	$('#closeAlertContents').html(contents);

	if (callbackFunc != null && alertObj != null){
		callbackFunc += ";modalClose('"+alertObj.attr("id")+"');";
		var clickEvent = new Function(callbackFunc);
		alertObj.prop('onclick', null).off('click'); 	//기존에 등록된 함수가 반복 실행을 막음. reset
		alertObj.find("#alertOk").prop('onclick', '').click(clickEvent); 	//callback 함수 등록

		modalOpen(alertObj.attr("id"));
	}
}

$.alertMessageCallback = function(contents, alertObj, callbackFunc) {
	$('#alertContents').html(contents);

	//확인 클릭시 닫기 함수 추가
	callbackFunc += ";modalClose('"+alertObj.attr("id")+"');";

	var clickEvent = new Function(callbackFunc);
	alertObj.prop('onclick', null).off('click'); 	//기존에 등록된 함수가 반복 실행을 막음. reset
	alertObj.find("#alertOk").prop('onclick', '').click(clickEvent); 	//callback 함수 등록
	modalOpen(alertObj.attr("id"));
}

$.alertMessageCallbackEx = function(contents, alertObj, alertOkObj, callbackFunc) {
	$('#alertContents').html(contents);

	var clickEvent = new Function(callbackFunc);
	alertOkObj.prop('onclick', null).off('click'); 	//기존에 등록된 함수가 반복 실행을 막음. reset
	alertOkObj.prop('onclick', '').click(clickEvent); 	//callback 함수 등록

	modalOpen(alertObj.attr("id"));
}

$.alertCallback = function(alertObj, alertOkObj, callbackFunc) {
	var clickEvent = new Function(callbackFunc);
	alertOkObj.prop('onclick', null).off('click'); 	//기존에 등록된 함수가 반복 실행을 막음. reset
	alertOkObj.prop('onclick', '').click(clickEvent); 	//callback 함수 등록

	modalOpen(alertObj.attr("id"));
}

$.confirmMessage = function(contents, confirmObj, confirmOkObj, callbackFunc) {
	$('#confirmContents').html(contents);

	var clickEvent = new Function(callbackFunc);
	confirmOkObj.prop('onclick', null).off('click'); 	//기존에 등록된 함수가 반복 실행을 막음. reset
	confirmOkObj.prop('onclick', '').click(clickEvent); 	//callback 함수 등록

	modalOpen(confirmObj.attr("id"));
}

$.confirmMessageYn = function(contents, confirmObj, confirmOkObj, confirmNoObj, callbackOkFunc, callbackNoFunc) {
	$('#confirmContents').html(contents);

	var clickOkEvent = new Function(callbackOkFunc);
	confirmOkObj.prop('onclick', null).off('click'); 	//기존에 등록된 함수가 반복 실행을 막음. reset
	confirmOkObj.prop('onclick', '').click(clickOkEvent); 	//callback 함수 등록

	var clickNoEvent = new Function(callbackNoFunc);
	confirmNoObj.prop('onclick', null).off('click'); 	//기존에 등록된 함수가 반복 실행을 막음. reset
	confirmNoObj.prop('onclick', '').click(clickNoEvent); 	//callback 함수 등록

	modalOpen(confirmObj.attr("id"));
}

$.confirmMessageShort = function(confirmObj, confirmOkObj, callbackFunc) {
	var clickEvent = new Function(callbackFunc);
	confirmOkObj.prop('onclick', null).off('click'); 	//기존에 등록된 함수가 반복 실행을 막음. reset
	confirmOkObj.prop('onclick', '').click(clickEvent); 	//callback 함수 등록

	modalOpen(confirmObj.attr("id"));
}

$.confirmMessageEx = function(titleObj, contentsObj, contents, confirmObj, confirmOkObj, callbackFunc) {
	titleObj.html(title);
	contentsObj.html(contents);

	var clickEvent = new Function(callbackFunc);
	confirmOkObj.prop('onclick', null).off('click'); 	//기존에 등록된 함수가 반복 실행을 막음. reset
	confirmOkObj.prop('onclick', '').click(clickEvent); 	//callback 함수 등록

	modalOpen(confirmObj.attr("id"));
}

$.confirmMessageEx2 = function(contents, confirmObj, confirmOkObj, callbackFunc) {
	$('#confirmContentsZeroapp').html(contents);

	var clickEvent = new Function(callbackFunc);
	confirmOkObj.prop('onclick', null).off('click'); 	//기존에 등록된 함수가 반복 실행을 막음. reset
	confirmOkObj.prop('onclick', '').click(clickEvent); 	//callback 함수 등록

	modalOpen(confirmObj.attr("id"));
}

$.confirmMessageCustomBtn = function(contents, confirmObj, confirmOkObj, confirmNoObj, confirmOkNm, confirmNoNm, callbackOkFunc, callbackNoFunc) {
	$('#confirmContents').html(contents);

	var clickOkEvent = new Function(callbackOkFunc);
	confirmOkObj.text(confirmOkNm);
	confirmOkObj.prop('onclick', null).off('click'); 	//기존에 등록된 함수가 반복 실행을 막음. reset
	confirmOkObj.prop('onclick', '').click(clickOkEvent); 	//callback 함수 등록

	var clickNoEvent = new Function(callbackNoFunc);
	confirmNoObj.text(confirmNoNm);
	confirmNoObj.prop('onclick', null).off('click'); 	//기존에 등록된 함수가 반복 실행을 막음. reset
	confirmNoObj.prop('onclick', '').click(clickNoEvent); 	//callback 함수 등록

	modalOpen(confirmObj.attr("id"));
}

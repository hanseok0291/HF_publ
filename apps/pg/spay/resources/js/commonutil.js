/**
 * Common Javascript
 */

// 공통 모달 열기 (메시지 추가, 모달 버튼 포커스)
// Common Alert Modal
$.alertMessage = function(title, contents, callbackFunc) {
	var target = $("#commonAlert");

	// 모달 제목/내용
	$('#alertTitle').html(title);
	$('#alertContents').html(contents);

	// 모달 열기
	$(target).show().focus();

	// 모달 위치
	var thisDialog = $(target).find(".modal-dialog");
	var marginValue = thisDialog.outerHeight() / 2;
	$(thisDialog).css("margin-top", "-" + marginValue + "px");
}

// Common Confirm Modal
$.confirmMessage = function(title, contents, confiemOkObj, callbackFunc) {
	var target = $("#commonConfirm");

	// 모달 제목/내용
	$('#confirmTitle').html(title);
	$('#confirmContents').html(contents);

	// 모달 열기
	$(target).show().focus();

	// 모달 위치
	var thisDialog = $(target).find(".modal-dialog");
	var marginValue = thisDialog.outerHeight() / 2;
	$(thisDialog).css("margin-top", "-" + marginValue + "px");
}

$(function(){
	// 결제 종료(창 닫기) 모달
	$("#closeWindow").click(function(){
		$.confirmMessage(confirmTitle.closeWindow, confirmMsg.closeWindow, $('#confirmOk'), "");
	});
});

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
	// design.js보다 먼저 실행되도록 이벤트 위임 사용
	$(document).on("click", "#closeWindow", function(e){
		// data 속성에서 커스텀 제목/내용 가져오기
		var customTitle = $(this).attr("data-confirm-title");
		var customContents = $(this).attr("data-confirm-contents");
		
		// 제목: 속성이 있으면 그대로 사용(빈 문자열 포함), 없으면 기본값 사용
		var title;
		if (customTitle !== undefined) {
			title = customTitle; // 빈 문자열이어도 그대로 사용
		} else {
			title = confirmTitle.closeWindow; // 속성이 없으면 기본값
		}
		
		// 내용: 속성이 있으면 그대로 사용(빈 문자열 포함), 없으면 기본값 사용
		var contents;
		if (customContents !== undefined) {
			contents = customContents; // 빈 문자열이어도 그대로 사용
		} else {
			contents = confirmMsg.closeWindow; // 속성이 없으면 기본값
		}
		
		// design.js의 data-toggle 이벤트가 실행되지 않도록 preventDefault
		e.preventDefault();
		e.stopPropagation();
		
		// 모달 열기 및 내용 설정
		$.confirmMessage(title, contents, $('#confirmOk'), "");
	});
});

$(function(){
	// 결제 종료(창 닫기) 모달 영문
	$("#closeWindowEn").click(function(){
		$.confirmMessage(confirmTitleEn.closeWindow, confirmMsgEn.closeWindow, $('#confirmOk'), "");
	});
});
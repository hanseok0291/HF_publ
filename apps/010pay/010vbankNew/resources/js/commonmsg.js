/**
 * Common Message Javascript
 */
// <------------------------------ 010가상계좌 발급 관련 ------------------------------>
var vBankAlertTitle = {
		phoneTitleFormat: 		"휴대폰 번호 입력 오류",
		phoneAuthFormat: 		"휴대폰 인증 정지",
		cnumSendErrFormat: 		"인증번호 발송 오류",
		cnumTitleFormat:		"인증번호 불일치",
		acntNoCopyFormat:		"계좌번호 복사",
		phoneNoSaveFormat:		"휴대폰번호 저장 안내",
		versionNotiFormat:		"버전 안내"

};

var vBankAlertMsg = {
		phoneFormat:	[vBankAlertTitle.phoneTitleFormat, "휴대폰 번호 입력값이 잘못되었습니다."],
		phoneNoEmpty:	[vBankAlertTitle.phoneTitleFormat, "휴대폰 번호를 입력해주세요."],
		phoneAuthErrMsg:[vBankAlertTitle.phoneAuthFormat, "휴대폰인증 이용이 제한되었습니다.\n잠시 후에 이용이 가능합니다."],
		cnumSendErrMsg:[vBankAlertTitle.cnumSendErrFormat, "인증번호 발송을 실패했습니다."],
		cnumFormat:		[vBankAlertTitle.cnumTitleFormat, "인증번호가 일치하지 않습니다.\n인증번호를 확인해 주세요."],
		cnumEmpty:		[vBankAlertTitle.cnumTitleFormat, "인증번호를 입력해주세요."],
		saveCookieMsg : [vBankAlertTitle.phoneNoSaveFormat, "본 기능은 PC에 전화번호가 저장될 수 있으므로 공용 PC에서는 이용을 자제해주세요.\n만약, 공용 PC에서 이용 시에는 꼭! 설정을 해제하여 주세요."],
		savedAcntNoMsg : [vBankAlertTitle.acntNoCopyFormat, "010 가상계좌번호가 복사되었습니다."],
		authCntErrMsg :  [vBankAlertTitle.cnumTitleFormat, "인증번호 5회 불일치\n인증번호를 다시 요청합니다."],
		versionNotiMsg : [vBankAlertTitle.versionNotiFormat, "지원하지 않는 버전으로 사용이 제한됩니다. IE 9 이상, Android 5.0 롤리팝 이상, IOS 10 이상 정상 사용 가능합니다."],
		unkonwnErrMsg :  "기타오류"
};
//<------------------------------ 010가상계좌 발급 관련 ------------------------------>

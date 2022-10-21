<%@  page language="java" contentType="text/html; charset=UTF-8" buffer="16kb"
%><%--
 **********************************************************************************************
 * @desc : MB 공통 LAYOUT -> Footer
 * @FileName : /pointHub/src/main/webapp/WEB-INF/views/mb/include/incFooter.jsp
 * @author lys
 * @since 2018.07.07
 * @version 1.0
 * @see
 * <pre>
 * << 개정이력(Modification Information) >>
 * 수 정 일              수 정 자          수정내용
 * ----------   --------   -----------------------------
 * 2018.07.07   lys        공통 LAYOUT -> Footer
 * </pre>
 **********************************************************************************************
--%>

<%--
	**************************************************************************
	Footer HTML 소스 구현
	**************************************************************************
 --%>

<%-- 공통 js --%>
<script src="${ResRoot}/common/js/ph-const.js?${TimeStamp}"></script>
<script src="${ResRoot}/common/js/ph-fnc.js?${TimeStamp}"></script>
<script src="${ResRoot}/common/js/ph-util.js?${TimeStamp}"></script>
<script src="${ResRoot}/common/js/ph-valid.js?${TimeStamp}"></script>
<%--
<script type="text/javascript">
$(function(){
	// javascript 구현
});
</script>
<section id="pop-loading" class="popup loading" style="position:fixed;">
	<div class="bg"></div>
	<img src="${ResRoot}/mb/images/common/loading.gif" alt="로딩중"/>
</section>

<footer>
	<small>Copyright (c) 2018 KT, Inc.</small>
</footer>
--%>

<form id="formReturn" action="${return_url_2}" method="post">
	<input type="hidden" name="pg_tr_no" id="return_pgTrNo" value="${pg_tr_no}">
	<input type="hidden" name="phub_tr_no" id="return_phubTrNo" value="">
	<input type="hidden" name="pay_amt" id="return_payAmt" value="">
	<input type="hidden" name="points" id="return_points" value="">
	<input type="hidden" name="points_amt" id="return_pointsAmt" value="0">
	<input type="hidden" name="won_amt" id="return_wonAmt" value="">
	<input type="hidden" name="auth_limit_dtm" value="">
	<input type="hidden" name="pay_method" id="return_payMethod" value="">
	<input type="hidden" name="ret_code" id="return_retCode" value="${ret_code}">
	<input type="hidden" name="ret_msg" id="return_retMsg" value="${ret_msg}">
</form>

<form id="dnlFormReturn" action="${return_url_2}" method="post">
	<input type="hidden" name="pg_tr_no" id="dnl_return_pgTrNo" value="${pg_tr_no}">
	<input type="hidden" name="phub_tr_no" id="dnl_return_phubTrNo" value="">
	<input type="hidden" name="pay_amt" id="dnl_return_payAmt" value="">
	<input type="hidden" name="points" id="dnl_return_points" value="">
	<input type="hidden" name="points_amt" id="dnl_return_pointsAmt" value="">
	<input type="hidden" name="won_amt" id="dnl_return_wonAmt" value="">
	<input type="hidden" name="auth_limit_dtm" value="">
	<input type="hidden" name="pay_method" id="dnl_return_payMethod" value="">
	<input type="hidden" name="ret_code" id="dnl_return_retCode" value="${ret_code}">
	<input type="hidden" name="ret_msg" id="dnl_return_retMsg" value="${ret_msg}">
</form>

<form id="formErr" action="/error_custom.do" method="post">
	<input type="hidden" name="eCode" id="eCode">
	<input type="hidden" name="eMsg" id="eMsg">
</form>

<script type="text/javascript">
	function errCustom(data){
		$('#eCode').val(data.ret_code);
		$('#eMsg').val(data.ret_msg);
		var url = $('#formErr').attr('action');
		var attrObj = {'form' : '#formErr'};
		PHFnc.doAction(url, '', attrObj);
	}
</script>

        <div class="tab">
            <div class="popup_toggle3">
                <p class="popup_title">브라우저 쿠키 설정 차단으로</p>
                <p class="popup_title">서비스 이용이 불가합니다.</p>
                <p class="popup_title">&nbsp;</p>
                <p class="popup_text">브라우저 쿠키 사용 설정 후,</p>
                <p class="popup_text">다시 접속해 주시기 바랍니다.</p>
                <span class="closeBtn">닫기</span>
            </div>
        </div>

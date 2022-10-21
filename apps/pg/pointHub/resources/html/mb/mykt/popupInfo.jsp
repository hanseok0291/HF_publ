<%@page import="org.json.JSONObject"%>
<%@  page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"
%><%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"
%><%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%--
 **********************************************************************************************
 * @desc : MyKt 팝업정보
 * @FileName : /pointHub/src/main/webapp/WEB-INF/views/mb/mykt/popupInfo.jsp
 * @author jungukjae
 * @since 2020.04.16
 * @version 1.0
 * @see 
 * <pre>
 * << 개정이력(Modification Information) >>
 *  수 정 일      수 정 자             수정내용
 * ----------   -----------   -----------------------------
 * 2020.04.16    jungukjae      	   최초생성
 * </pre>
 **********************************************************************************************
--%> 

<!-- popup : 통신료할인, 회원가입유도 Pop -->
<!-- <div class="popup-s3 popup-confirm-ly1" style="">
	<div class="popup-s3__inner">
		<div class="popup-s3__box">
			<div class="popTxt">
				KT 슈퍼리워드 회원이 되시면 <br>K포인트로 통신료 할인을 <br>받으실 수 있습니다.				
			</div>
			<div class="btnWrap">
				<button class="popup-close-ly1 btnCancel">취소</button>
				<button class="popup-open-ly2 btnJoin">간편 가입하기</button>
			</div>
		</div>
	</div>
</div> -->

<!-- 만 14세 미만 차단 popup -->
<div class="popup-s3 popup-confirm-ly12" style="">
	<div class="popup-s3__inner">
		<div class="popup-s3__box">
			<div class="popTxt">
				KT 슈퍼리워드 회원은 <br>만 14세 이상부터 가입 가능합니다.				
			</div>
			<div class="btnWrap">
				<button class="popup-close-ly12 btnJoin">확인</button>
			</div>
		</div>
	</div>
</div>

<!-- 핀크럭스 이벤트 참여문의 popup -->
<div class="popup-s3 popup-confirm-ly13" id="event_join_pop" style="">
	<div class="popup-s3__inner">
		<div class="popup-s3__box">
			<div class="popTxt">
				이벤트에 참여 하시겠습니까?			
			</div>
			<div class="btnWrap">
				<button class="popup-close-ly13 btnCancel">취소</button>
				<button class="popup-open-ly13 btnJoin" onclick="javascript:reqOfferDetail();">참여하기</button>
			</div>
		</div>
	</div> 
</div>

<!-- 서비스 이용 약관 동의 popup -->
<div class="popup-s3 popup-confirm-ly1" style="display: none;">
	<div class="popup-s3__inner">
		<div class="popup-s3__box">
			<div class="popTitle">
				서비스 이용 약관 동의
				<button class="popup-close-ly1 btnClose">닫기</button>
			</div>
			<div class="provision" id="termsList">
				<div class="atc all">
					<div class="subject">
						<div class="checkbox" id="userCheckBox">
							<input type="checkbox" id="prov-all"> 
							<label for="prov-all">약관 전체동의</label>
						</div>
					</div>
				</div>
				<div class="atc">
					<div class="subject">
						<div class="checkbox" id="userCheckBox">
							<input type="checkbox" id="prov-1" class="chk" >
							<label for="prov-1">개인정보 제3자가 제공[필수]</label>
						</div>
					</div>
					<div class="bg-box">
						<ul class="list-st1">
							<li>제공받는 자 : KT</li>
							<li>이용 정보 : 멤버십가입 및 이용</li>
							<li>개인정보항목 : 이름, 휴대폰번호, 생년월일, 성별, 주소, 이메일, 인증정보(CI)</li>
							<li>이용 및 보관기관 : 서비스 가입기간<br>(가입일~해지일) 동안</li>
							<li class="last">※ 고객님은 개인정보 제3자 제공 동의를 거부할 권리가 있으니 동의 하셔야 멤버십 서비스 가입 및 이용이 가능합니다.</li>
						</ul>
					</div>
				</div>
				<div class="reward-box">
					<div class="atc tits">
						KT 슈퍼리워드 이용약관
					</div>
					<div class="atc">
						<div class="subject">
							<div class="checkbox" id="userCheckBox">
								<input type="checkbox" id="prov-2" class="chk">
								<label for="prov-2">이용약관[필수]</label>
							</div>
							<button class="popup-open-ly2 btnMore">내용보기</button>
						</div>
					</div>
					<div class="atc">
						<div class="subject">
							<div class="checkbox" id="userCheckBox">
								<input type="checkbox" id="prov-3" class="chk">
								<label for="prov-3">개인정보 수집/이용 동의[필수]</label>
							</div>
							<button class="popup-open-ly3 btnMore">내용보기</button>
						</div>
						<div class="noti">※ KT 슈퍼리워드 서비스 제공에 필요하므로 동의를 해 주셔야 서비스를 이용할 수 있습니다.</div>
					</div>
				</div>
			</div>
			<div class="btnWrap">
				<button class="popup-close-ly1 btnCancel">취소</button>
				<button class="btnJoin" onclick="javascript:superRewardMemberJoin();">확인</button>
			</div>
		</div>
	</div>
</div>
<!-- // 서비스 이용 약관 동의 popup -->

<!-- 이용약관 popup -->
<div class="popup-s3 popup-multiple popup-confirm-ly2" style="display: none;">
	<div class="popup-s3__inner">
		<div class="popup-s3__box">
			<div class="popTitle">
				이용약관
				<button class="popup-close-ly2 btnClose">닫기</button>
			</div>
			<div class="provision">
				<div class="reward-terms clipProv">
					
				</div>
			</div>
			<div class="btnWrap">
				<button class="popup-close-ly2 btnJoin">닫기</button>
			</div>
		</div>
	</div>
</div>
<!-- // 이용약관 popup -->

<!-- 개인정보 수집/이용 동의 popup -->
<div class="popup-s3 popup-multiple popup-confirm-ly3" style="display: none;">
	<div class="popup-s3__inner">
		<div class="popup-s3__box">
			<div class="popTitle">
				개인정보 수집/이용 동의
				<button class="popup-close-ly3 btnClose">닫기</button>
			</div>
			<div class="provision">
				<div class="reward-terms perInfo">
					
				</div>
			</div>
			<div class="btnWrap">
				<button class="popup-close-ly3 btnJoin">닫기</button>
			</div>
		</div>
	</div>
</div>
<!-- // 개인정보 수집/이용 동의 popup -->
<!-- // 200421_수정 [ 팝업 수정 ] -->

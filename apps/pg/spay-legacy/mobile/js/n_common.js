(function($){
	
	fn_init = function init(){
		
		
		
		
		
	};
	
	$(document).on('contextmenu dragstart',function(e){
		return false;
	});
	
	check_esc = function checkEsc(){
		
		if($('#escRegNo').val() == ''){
			show_slide('2');
			show_alert("주민등록번호 또는 사업자번호를 정확하게 입력해주세요.", "tp1");
			//$('#escRegNo').focus();
			return false;
		}

		if($("#escRegNo").val().length != 7 && $("#escRegNo").val().length != 10){
			show_slide('2');
			show_alert("주민(사업자)번호는 7자리(10자리) 입니다.", "tp1");
			//$("#escRegNo").focus();
			return false;
		}
			
		if($('#escHpFirm').val() == ''){
			show_slide('2');
			show_alert("통신사를 선택해주세요.", "tp1");	
			//$('#escHpFirm').focus();
			return false;
		}

		if($('#escTel').val() == ''){
			show_slide('2');	
			show_alert("휴대폰번호를 입력해주세요.", "tp1");	
			//$('#escTel').focus();
			return false;
		}

		if($('#escToAccntNm').val() == ''){
			show_slide('2');
			show_alert("환불계좌예금주를 정확하게 입력해주세요.", "tp1");		
			//$('#escToAccntNm').focus();
			return false;
		}

		return true;
			
		
	};

	 check_rcpt = function checkRcpt(){
		show_slide('3');
		
		if($('input:radio[name="rcptRegGb"]:checked').length ==0){
			show_alert("현금영수증발급용도를 선택해주세요.", "tp1");	
			return false;						
		}
		
		if($('#rcptIdGb').val()==''){
			show_alert("현금영수증 등록구분을 선택해주세요.", "tp1");
			return false;						
		}

		if($('#PSocId').val()==''){
			show_alert("현금영수증 등록번호를 입력해주세요.", "tp1");
			return false;						
		}

		return true;
	};

	show_slide = function checkSlide(idx){
	
		if($('#box_detail_'+idx).css("display")=='none'){
			$(".box_detail").slideUp("slow");
			$('#box_detail_'+idx).slideDown("slow");
			$("h2").removeClass("selected");
			$('#h2_'+idx).addClass("selected");
		}
			
		//step_on 이미지
		step_on(idx);
		
	};

	/* param : msg, type 
	 * 
	 * type : tp1(alert type), tp2(comfirm type)
	 */
	show_alert = function showAlert(msg, type){//$('.pop_alert').css("position","absolute");
		//alert($('.pop_alert').css("position"));
		if($('#alert1').css("display") !='none')
			$('#alert1').css("display","none");
		if(type == 'tp2'){
			$('#confirmAlert').css("display","");
			$('#okAlert').css("display","none");
		}else{
			$('#confirmAlert').css("display","none");
			$('#okAlert').css("display","");
		}
		$('#alertMsg').text(msg);
		$('#alert1').css("display","");
		if($('#media').val()=="PC"){
			block_layer();
		}else if($('#media').val() == "MOBILE"){
			block_scroll();
		}
	};

	block_layer =  function blockLayer() {
		if(document.getElementById("blockLayer")){
			$("#blockLayer").remove();
		}
		var $div = $("<div/>").attr("id", "blockLayer").css({position:"fixed", top:0, left:0, width:"100%", height:"100%",background:"#000",opacity:"0", filter:"alpha(opacity=0)","z-index":30000});
		var iframeStr = "<iframe width='100%' height='100%' frameborder=0 scrolling=0 style='position:fixed;left:0px;top:0px;filter:alpha(opacity=0);'/>";
		$div.append(iframeStr);
		$('body').append($div);
	
	};
	
	block_scroll = function blockScroll(){
			$("body").bind('touchmove', function(e){e.preventDefault()});
	};

	/* param : form , url
	 * 
	 * form : cofirm 일때 전송할 form id
	 * url : cofirm 일때 form 전송 action url
	 */
	  unShow_alert = function unShowAlert(form, url){
		if(url == undefined || url == ''){
			$('#alert1').css("display","none");
			$('#comfirmAlert').css("display","none");
			$('#okAlert').css("display","");
			if($('#media').val() == "PC" && document.getElementById("blockLayer")!=null){
				$("#blockLayer").remove();
			}
			if($('#media').val() == "MOBILE"){
				$("body").unbind('touchmove');
			}

		}else{
			$("#"+form).attr('action',url).submit();
			url = '';
		}
	};
	
	
	
})(jQuery);
$(document).ready(function(){
	window.alert = function(msg, func){
		if ($(".ly_pop2").css("display") == "block"){
			return;
		}
		var alertId = new Date().getTime();
		
		msg = msg.replace(/\n/gi,"<br/>");
		
		var alertHTML = "<div class=\"ly_pop2\"><div class=\"bg\"></div><div id=\""+alertId+"\" class=\"cont\">"
			+"<div class=\"ele\"><section class=\"inner2\"><h2>"+msg+"</h2></section><ul class=\"btn_area5\">"
			+"<li class=\"bt3 dialog_okBtn\" style=\"cursor: pointer;\" ><button type=\"button\" class=\"btn_xr btn_type3 fc_reg\">확인</button></li></ul></div></div></div>";
		
		$("body").append(alertHTML);
		
		$(".dialog_okBtn").click(function(){
			if(!isNull(func)) func();
			lyClose(alertId);
		});
		
		lyOpen(alertId);
		
		$('.ly_pop2 a').click(function(){
			var bankNm = $("button[class='selected']").find('span').text();
			var href = $(this).attr('href');
			if(href.indexOf('tel:') != -1){
				SettleBank.gaEvent('은행 미사용안내 전화연결', bankNm+" 전화 연결 클릭");
			}
		});
		
	};
	
	window.confirm = function(msg, func, canlFunc){
		if ($(".ly_pop2").css("display") == "block"){
			return;
		}
		var alertId = new Date().getTime();
		
		msg = msg.replace(/\n/gi,"<br/>");
		
		var alertHTML = "<div class=\"ly_pop2\"><div class=\"bg\"></div><div id=\""+alertId+"\" class=\"cont\">"
		+"<div class=\"ele\"><section class=\"inner2\"><h2>"+msg+"</h2></section><ul class=\"btn_area3 \">"
		+"<li class=\"bt4 dialog_cnlBtn\" style=\"border-left: 0px;\"><button type=\"button\" class=\"btn_xr btn_type3\">취소</button></li>"
		+"<li class=\"bt4 dialog_okBtn\"><button type=\"button\" class=\"btn_xr btn_type3 fc_reg\">확인</button></li></ul></div></div></div>";
	
		$("body").append(alertHTML);
		
		$(".dialog_okBtn").click(function(){
			if(!isNull(func)) func();
			lyClose(alertId);
			
		});
		
		$(".dialog_cnlBtn").click(function(){
			if(!isNull(canlFunc)) canlFunc();
			lyClose(alertId);
		});
		
		lyOpen(alertId);
	}
	
	function lyOpen(alertId){
		var temp = $('#'+alertId);
		var bg = temp.parent().find(".bg").hasClass('bg');
		if(bg){
			temp.parent().fadeIn();
		}
		
		//레이어 오픈 후 포커스 확인버튼으로 이동
		setInterval(function(){
			temp.find('.dialog_okBtn button').focus();
		},100);
	}
	
	function lyClose(alertId){
		$('#'+alertId).parents('div').fadeOut();
		setInterval(function(){
			$("#"+alertId).parents('div').remove();
		}, 1000);
	}
	
	function isNull(obj){
		return (typeof obj != "undefined" && obj != null && obj != "") ? false : true;
	}
});

	

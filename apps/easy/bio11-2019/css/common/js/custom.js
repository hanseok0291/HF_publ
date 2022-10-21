var CSS_URL_INFO = [
					{mid : ["cjmall1t", "cjmall1r", "cjmall1g"], css : "/css/common/css/custom/cjmall/cjmall.css", script : "/css/common/js/custom/cjmall.js" , ie9lower : "/css/common/css/custom/cjmall/pc/cjmall.css"}
					,{mid : ["nexonpyt", "nexonpyr", "nexonpyg"], css : "", script : "/css/common/js/custom/nexon.js", ie9lower: ""}
					];
var CSS_PATH, SCRIPT_PATH, CSS_9_PATH;

SettleBankCSS = {
		
		init: function(mid){
			if(mid){
				var flag = false;
				for(var i = 0 ; i < CSS_URL_INFO.length ; i++){
					var _mid = CSS_URL_INFO[i].mid;
					for(var j = 0 ; j < _mid.length ; j++){
						if(_mid[j] == mid){
							CSS_PATH = CSS_URL_INFO[i].css;
							SCRIPT_PATH = CSS_URL_INFO[i].script;
							CSS_9_PATH = CSS_URL_INFO[i].ie9lower;
							flag = true;
							break;
						}
					}	
				}

				//커스텀 css, script 적용
				if(flag){
					var ie9lower = false;
						if(navigator.appName.charAt(0) == "M"){
						var ver = getIEVersion("MSIE");
						if ( ver < "9"){
							ie9lower = true;
						}
					}
					
					var dt = new Date().getTime();
					if(SCRIPT_PATH){
						var s = document.createElement('script');
						s.setAttribute('src',SCRIPT_PATH+'?dt='+dt);
						document.getElementsByTagName('body')[0].appendChild(s);
					}
					
					if(CSS_PATH){
					
						var s = document.createElement('link');
						s.setAttribute('rel','stylesheet');
						if(ie9lower){
							s.setAttribute('href',CSS_9_PATH+'?dt='+dt);
						}else{
							s.setAttribute('href',CSS_PATH+'?dt='+dt);
						}
						document.getElementsByTagName('body')[0].appendChild(s);
					}
				}
			}
		}
};


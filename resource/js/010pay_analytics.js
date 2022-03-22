var TRACKER_ID = "UA-137962581-9";
var USE_GTAG = true;

analytics = {
		init: function() {
			
			var ver = 0; // Browser Version

			if(navigator.appName.charAt(0) == "M"){
				ver = this.getIEVersion("MSIE");
				if ( ver < "9"){
					//구글 애널리틱스 IE8이하 지원 중단
					USE_GTAG = false;
				}
			}
				
			if(USE_GTAG){
				var tag = document.createElement('script');
				tag.src = "https://www.googletagmanager.com/gtag/js?id="+TRACKER_ID; 
				tag.setAttribute('async', '');
				var firstScriptTag = document.getElementsByTagName('script')[0];
				firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
				window.dataLayer = window.dataLayer || [];
			}
		},

		gtag: function() {
			try{
				dataLayer.push(arguments);
			}catch(e){console.log(e)}	
		},
		
		gaTracker: function(path){
			try{
				if(USE_GTAG){
					var title = document.title;
					
					this.gtag('js', new Date());
					this.gtag('config', TRACKER_ID, { 
						'page_title' : title,
						'page_path' : path
					});
				}
			}catch(e){}	
			
		},
		
		gaEvent: function(category, label){
			if(USE_GTAG){
				if(TRACKER_ID){
					this.gtag('event', 'click', {
						'event_category' : category,
						'event_label' : label
					});
				}
			}
		},
		
		getIEVersion:function(ver) {
			var rv = -1; // Return value assumes failure.
			var ua = navigator.userAgent;
			var re = null;
			if(ver == "MSIE"){
				re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
			}else{
			re = new RegExp(ver+"/([0-9]{1,}[\.0-9]{0,})");
				}
			if (re.exec(ua) != null){
				rv = parseFloat(RegExp.$1);
			}
			return rv;
		}
};
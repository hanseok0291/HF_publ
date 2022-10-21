$(document).ready(function() {

    /**
     *  UI 스크립트 init
     */

    //project.init();



});


var project = {
    init : function () {
        project.popupClause();

    },

    //라이트박스
    popupClause : function () {
        var modal = document.getElementById('myPopup');
        var btn = document.getElementById("popupBtn");
        var span = document.getElementsByClassName("close")[0];
        var spanpop = document.getElementsByClassName("close_btn")[0];
        
        if( btn != undefined ) {
            btn.onclick = function() {
                modal.style.display = "block";
            }        	
        }

        if( span != undefined ) {
	        span.onclick = function() {
	            modal.style.display = "none";
	        }
        }
        
        if( spanpop != undefined ) {
	        spanpop.onclick = function() {
	            modal.style.display = "none";
	        }
        }
        
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }
};
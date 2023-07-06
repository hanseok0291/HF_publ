// 바디 스크롤 제거/해제
var scrollHeight = 0;
function scrollOff(){
    scrollHeight = $(document).scrollTop();
    $("body").addClass("modal-open");
    $(".content_wrap").css("position", "fixed");
    $(".content_wrap").css("top", - scrollHeight);
}
function scrollOn(){
    $("body").removeClass("modal-open");
    $(".content_wrap").css("top", 0);
    $(".content_wrap").css("position", "relative");
    $(document).scrollTop(scrollHeight);
}

// 레이어 팝업(모달) 열기
function modalOpen(obj){
    var temp = $("#" + obj);
    temp.fadeIn(100).addClass("open");
    scrollOff(); // 바디 스크롤 제거

    // 슬라이드 모달 닫기
    function modalOut() {
        temp.fadeOut(300).removeClass("open");

        // 이중 모달이 아닌 경우
        if (!$(temp).hasClass("depth2")) {
            scrollOn(); // 바디 스크롤 제거 해제
        }
    }

    // 팝업 내 닫기 버튼 클릭 시 팝업 닫기
    $(temp).find('.modal-close').click(function() {
        modalOut();
    });
}

// 레이어 팝업(모달) 닫기
function modalClose(obj){
    if (obj != null && obj != undefined && obj != '') {
        var temp = $("#" + obj);
        temp.fadeOut(300).removeClass("open");
    } else {
        $(".modal").fadeOut(300).removeClass("open");
    }
    scrollOn(); // 바디 스크롤 제거 해제
}

// 화면 너비에 따라 열리는 방식 지정
$(".btn-modal-hotdeal").click(function(){
    if($(window).width() > 738){
        modalOpen("modal-qr");
    }else{
        alert("모바일입니다.");
        return false;
    }
});

$(document).ready(function(){
    // 화면 너비에 따라 열리는 방식 지정
    $(".btn-modal-main-qr").click(function (e) {
        if ($(window).width() > 738) {
            e.preventDefault();
            modalOpen("modal-main-qr");
        }
    });
});


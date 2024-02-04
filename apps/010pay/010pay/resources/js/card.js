$(document).ready(function () {
  positionCtl.insertTargetPosition(); // 애니메이션 위치값 할당
  positionCtl.aniActive(); // 애니메이션 활성화
});

$(window).on("scroll", function () {
  positionCtl.aniActive(); // 애니메이션 활성화
});

/* 페이지 위치에 따른 제어 */
var positionCtl = {
  //애니메이션
  aniActive: function (obj) {
    var windowH = $(window).height(), //화면 세로 사이즈
      delayPosition = windowH / 10; // 다음 섹션이 브라우저 하단으로부터 1/10 만큼 보여질때

    var position = $(window).scrollTop() + windowH - delayPosition;
    var position_top = $(window).scrollTop();
    // 현재의 위치 = 스크롤이 이동한 값 + 윈도우 높이 - 처음에 선언한 지연 위치값(200);
    
    $(".credit_card .section").each(function () {
      if (
        !$(this).hasClass("animation") &&
        $(this).data("offsetTop") < position &&
        position <
          $(this).data("offsetTop") +
            $(this).data("outerHeight") +
            delayPosition * 2
      ) {
        $(this).addClass("animation");
        $(this).addClass("active");
      } else if (
        $(this).hasClass("animation") &&
        $(this).hasClass("message") &&
        ($(this).data("offsetTop") +
          $(this).data("outerHeight") +
          delayPosition * 2 <
          position ||
          $(this).data("offsetTop") > position)
      ) {
        $(this).removeClass("animation");
        $(this).removeClass("active");
      }
    });
  },
  insertTargetPosition: function (obj) {
    windowH = $(window).height(); // 브라우저의 높이값 할당

    $(".section").each(function () {
      // 모든 대상 엘리먼트에
      $(this).data("offsetTop", $(this).offset().top); // 각자의 위치 값을 할당
      $(this).data("outerHeight", $(this).outerHeight()); // 각자의 위치 값을 할당
    });
  },
};
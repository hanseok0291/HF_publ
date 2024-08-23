$(document).ready(function () {
  // GNB (상단 메인 메뉴)
  $(".gnb .nav").hover(
    function () {
      $(".gnb .submenu, .gnb_sub_bg").slideDown(100);
      $(".gnb_dimmed").fadeIn(200);
    },
    function () {
      $(".gnb .submenu, .gnb_sub_bg").stop().slideUp(100);
      $(".gnb_dimmed").stop().fadeOut(100);
    }
  );

  // 로그인 레이어
  /*	$("#show_login").click(function(){
		$("#login_layer").show();
		return false;
	});*/

  // 사이트맵 레이어
  $("#show_sitemap").click(function () {
    $("#sitemap_layer").show();
  });

  // 레이어 닫기 (공통)
  $(".layer_pop .close_pop").click(function () {
    $(this).parents(".layer_pop").hide();
  });

  // LNB (snb - 좌측 서브 메뉴)
  $(".snb>ul>li>a").click(function () {
    if ($(this).parent().hasClass("on")) {
      $(this).parent().removeClass("on");
    } else {
      $(this).parent().addClass("on");
      $(this).parent().siblings().removeClass("on");
    }
  });
  $(".snb>ul>li:has(ul)").find("a i").show();

  // Footer > 관련사이트
  $(".family .select_btn").click(function () {
    $(this).next().stop().slideToggle(200);
    $(this).parents(".family").toggleClass("open");
  });
  $(".family").mouseleave(function () {
    $(".family .option").stop().slideUp(200);
    $(this).removeClass("open");
  });

  // 위로 이동 버튼
  $(window).scroll(function () {
    if ($(this).scrollTop() > 150) {
      $("#btn_top").fadeIn(200);
    } else {
      $("#btn_top").fadeOut(200);
    }
  });
  // scroll body to 0px on click
  $("#btn_top").click(function () {
    $("body, html").animate(
      {
        scrollTop: 0,
      },
      500
    );
    return false;
  });

  // Tab
  $(".tab_area_content").hide();
  $("ul.tab_area li:first").addClass("active").show();
  $(".tab_area_content:first").show();
  $("ul.tab_area li").click(function () {
    $("ul.tab_area li").removeClass("active");
    $(this).addClass("active");
    $(".tab_area_content").hide();
    var activeTab = $(this).find("a").attr("href");
    $(activeTab).show();
    return false;
  });

  // Form
  var select = $("select#sel");
  select.change(function () {
    var select_name = $(this).children("option:selected").text();
    $(this).siblings("label").text(select_name);
  });
});

// 이용약관
function provision1Popup() {
  var url = "../provision/provision1.html";
  window.open(
    url,
    "이용약관",
    "width=960, height=760, top=0, left=0, scrollbars=no"
  );
}
// 전자금융거래 이용약관
function provisionPopup() {
  var url = "../provision/provision.html";
  window.open(
    url,
    "전자금융거래 이용약관",
    "width=960, height=760, top=0, left=0, scrollbars=no"
  );
}
// 개인정보처리방침
function privacyPopup() {
  var url = "../provision/privacy.html";
  window.open(
    url,
    "개인정보처리방침",
    "width=960, height=760, top=0, left=0, scrollbars=no"
  );
}

function openCenteredPopup(url, title, width, height) {
  const screenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
  const screenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;

  const innerWidth = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
  const innerHeight = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

  const left = ((innerWidth - width) / 2) + screenLeft;
  const top = ((innerHeight - height) / 2) + screenTop;

  window.open(url, title, `scrollbars=yes, width=${width}, height=${height}, top=${top}, left=${left}`);
}

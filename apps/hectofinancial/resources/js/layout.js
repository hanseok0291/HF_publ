$(document).ready(function () {
  // 로딩 시 GNB 위치에 따라 클래스 추가 제거
  if ($(window).scrollTop() > 0) {
    $('#header').addClass('fixed');
  } else {
    $('#header').removeClass('fixed');
  }

  // GNB (상단 메인 메뉴)
  $('.gnb').hover(
    function () {
      $('#header').addClass('open');
      $('.gnb .submenu, .gnb_sub_bg').fadeIn(200);
      $('.gnb_dim').fadeIn(200);
    },
    function () {
      $('#header').removeClass('open');
      $('.gnb .submenu, .gnb_sub_bg').stop().fadeOut(200);
      $('.gnb_dim').stop().fadeOut(100);
    }
  );

  // GNB 언어 선택
  $('#language_btn').on('click', function (e) {
    $(this).next('.language_box').fadeToggle();
  });

  $('.lagnuage_wrap').hover(
    function () {
      $('.lagnuage_wrap .language_box').fadeIn();
    },
    function () {
      $('.lagnuage_wrap .language_box').fadeOut();
    }
  );

  // FOOTER 파트너 사 토글
  $('.partners_wrap button').on('click', function (e) {
    $(this).toggleClass('open');
    $(this).next('.list_wrap').fadeToggle();
  });

  // selectbox 토글 및 선택
  $('.selectbox_wrap button').on('click', function (e) {
    $(this).toggleClass('open');
    $(this).next('.list_wrap').fadeToggle();
  });

  // selectbox 목록의 항목 클릭 시
  $('.list_wrap li a').on('click', function (e) {
    e.preventDefault(); // 기본 링크 동작 방지
    var selectedText = $(this).text(); // 클릭한 항목의 텍스트 가져오기
    $(this).closest('.list_wrap').prev().text(selectedText); // 버튼 텍스트 변경
    $(this).closest('.list_wrap').hide(); // 목록 숨기기
  });

  // selectbox 외부 클릭 시 목록 숨김
  $(document).on('click', function (e) {
    if (!$(e.target).closest('.selectbox_wrap').length) {
      $('.selectbox_wrap .list_wrap').hide();
    }
  });

  //TAB 버튼 클릭 시 활성화
  $('.tab_btn_wrap .tab_btn').on('click', function () {
    $('.tab_btn_wrap .tab_btn').removeClass('on');
    $(this).addClass('on');
  });

  // 로그인 레이어
  /*	$("#show_login").click(function(){
		$("#login_layer").show();
		return false;
	});*/

  // 사이트맵 레이어
  $('#show_sitemap').click(function () {
    $('#sitemap_layer').show();
  });

  // 레이어 닫기 (공통)
  $('.layer_pop .close_pop').click(function () {
    $(this).parents('.layer_pop').hide();
  });

  // LNB (snb - 좌측 서브 메뉴)
  $('.snb>ul>li>a').click(function () {
    if ($(this).parent().hasClass('on')) {
      // $(this).parent().removeClass("on"); 서비스안내 페이지 좌측 snb 메뉴 토글때문에 주석처리.
    } else {
      $(this).parent().addClass('on');
      $(this).parent().siblings().removeClass('on');
    }
  });
  $('.snb>ul>li:has(ul)').find('a i').show();

  // Footer > 관련사이트
  $('.family .select_btn').click(function () {
    $(this).next().stop().slideToggle(200);
    $(this).parents('.family').toggleClass('open');
  });
  $('.family').mouseleave(function () {
    $('.family .option').stop().slideUp(200);
    $(this).removeClass('open');
  });

  var lastScrollTop = 0; // 마지막 스크롤 위치를 저장할 변수

  $(window).scroll(function () {
    // 위로 이동 버튼
    if ($(this).scrollTop() > 150) {
      $('#btn_top').fadeIn(200);
    } else {
      $('#btn_top').fadeOut(200);
    }

    var currentScroll = $(this).scrollTop(); // 현재 스크롤 위치

    if (currentScroll > lastScrollTop) {
      // 스크롤 다운 시
      $('#header .container').css('top', '-84px'); // 헤더를 위로 숨김
    } else {
      // 스크롤 업 시
      $('#header .container').css('top', '0'); // 헤더를 다시 보여줌
    }
    lastScrollTop = currentScroll; // 현재 스크롤 위치를 lastScrollTop에 저장

    if ($(this).scrollTop() > 0) {
      $('#header').addClass('fixed');
    } else {
      $('#header').removeClass('fixed');
    }
  });
  // scroll body to 0px on click
  $('#btn_top').click(function () {
    $('body, html').animate(
      {
        scrollTop: 0,
      },
      500
    );
    return false;
  });

  // Tab
  $('.tab_area_content').hide();
  $('ul.tab_area li:first').addClass('active').show();
  $('.tab_area_content:first').show();
  $('ul.tab_area li').click(function () {
    $('ul.tab_area li').removeClass('active');
    $(this).addClass('active');
    $('.tab_area_content').hide();
    var activeTab = $(this).find('a').attr('href');
    $(activeTab).show();
    return false;
  });

  // Form
  var select = $('select#sel');
  select.change(function () {
    var select_name = $(this).children('option:selected').text();
    $(this).siblings('label').text(select_name);
  });
});

// 이용약관
function provision1Popup() {
  var url = '../provision/provision1.html';
  window.open(
    url,
    '이용약관',
    'width=960, height=760, top=0, left=0, scrollbars=no'
  );
}
// 전자금융거래 이용약관
function provisionPopup() {
  var url = '../provision/provision.html';
  window.open(
    url,
    '전자금융거래 이용약관',
    'width=960, height=760, top=0, left=0, scrollbars=no'
  );
}
// 개인정보처리방침
function privacyPopup() {
  var url = '../provision/privacy.html';
  window.open(
    url,
    '개인정보처리방침',
    'width=960, height=760, top=0, left=0, scrollbars=no'
  );
}

function openCenteredPopup(url, title, width, height) {
  const screenLeft =
    window.screenLeft !== undefined ? window.screenLeft : window.screenX;
  const screenTop =
    window.screenTop !== undefined ? window.screenTop : window.screenY;

  const innerWidth = window.innerWidth
    ? window.innerWidth
    : document.documentElement.clientWidth
    ? document.documentElement.clientWidth
    : screen.width;
  const innerHeight = window.innerHeight
    ? window.innerHeight
    : document.documentElement.clientHeight
    ? document.documentElement.clientHeight
    : screen.height;

  const left = (innerWidth - width) / 2 + screenLeft;
  const top = (innerHeight - height) / 2 + screenTop;

  window.open(
    url,
    title,
    `scrollbars=yes, width=${width}, height=${height}, top=${top}, left=${left}`
  );
}

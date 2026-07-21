$(document).ready(function () {
  // 현재 활성화된 GNB 로직을 추적하기 위한 변수
  var gnbInitialized = false;

  // 함수 정의: 해상도에 따라 GNB 로직을 적용
  function applyGnbLogic() {
    if ($(window).width() >= 1280) {
      $('.gnb').show();
      // 1280px 이상일 때만 hover 이벤트를 등록
      if (!gnbInitialized) {
        // 로딩 시 GNB 위치에 따라 클래스 추가 제거
        if ($(window).scrollTop() > 0) {
          $('#header').addClass('fixed');
        } else {
          $('#header').removeClass('fixed');
        }

        // GNB (상단 메인 메뉴) - hover 이벤트 설정
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

        $('.lagnuage_wrap').hover(
          function () {
            $('.lagnuage_wrap .language_box').fadeIn();
          },
          function () {
            $('.lagnuage_wrap .language_box').fadeOut();
          }
        );

        // GNB 로직이 초기화되었음을 표시
        gnbInitialized = true;
      }
    } else {
      // 1280px 미만일 때
      $('.gnb').hide();
      $('#header').removeClass('fixed open');

      // 1280px 미만일 때는 hover 이벤트를 해제
      if (gnbInitialized) {
        $('.gnb').off('mouseenter mouseleave'); // hover 이벤트 해제
        gnbInitialized = false; // GNB 로직이 해제되었음을 표시
      }

      // 모바일 또는 작은 화면용 로직 추가 가능
      // 예: 모바일 GNB 메뉴 토글
      var bodyPos = 0;

      $('.mo_gnb_btn')
        .off('click')
        .on('click', function () {
          if (!$('#header').hasClass('open')) {
            bodyPos = $(window).scrollTop();
            $('body').css({
              position: 'fixed',
              top: -bodyPos + 'px',
              width: '100%',
            });
            $('.logo img').attr('src', '../resources/images/logo.svg'); // 회사소개 아닐경우 로고
          } else {
            $('body').css({
              position: '',
              top: '',
              width: '',
            });
            $(window).scrollTop(bodyPos);
            if (!$('#wrap').hasClass('company')) {
            } else {
              $('.logo img').attr('src', '../resources/images/logo_white.svg'); // 회사소개 로고 변경
            }
          }
          $('#header').toggleClass('open');
          $('.gnb').fadeToggle();
        });
    }
  }

  // footer 인증 영역 size 조절
  function footerAward() {
    var $awardWrap = $('.award_wrap .award_box');
    var maxWidth = 0;
    var maxHeight = 0;

    $awardWrap.each(function (i, e) {
      var width = Math.ceil($(e).find('.text_wrap').width()) + 68;
      var height = Math.ceil($(e).find('.text_wrap').height()) + 1;

      maxWidth = Math.max(maxWidth, width);
      maxHeight = Math.max(maxHeight, height);
    });
    if ($(window).width() <= 768) {
      $awardWrap.height(maxHeight).width('100%');
    } else {
      $awardWrap.height(maxHeight).width(maxWidth);
    }
  }

  footerAward();

  // 모바일 GNB 하위 메뉴 노출
  $('.gnb .down_arrow').on('click', function () {
    if ($(window).width() <= 1280) {
      if ($(this).hasClass('open')) {
        $(this).removeClass('open').next().slideUp(200);
      } else {
        $('.gnb .submenu').slideUp();
        $('.gnb .down_arrow').removeClass('open');
        $(this).addClass('open').next().slideDown();
      }
    } else {
      return false;
    }
  });

  // 페이지 로드 시 초기화
  applyGnbLogic();

  // 윈도우 리사이즈 이벤트 감지
  $(window).resize(function () {
    applyGnbLogic();
    footerAward();
  });

  var lastScrollTop = 0; // 마지막 스크롤 위치를 저장할 변수

  // 스크롤 이벤트로 GNB 위치 확인 (1280px 이상일 때만)
  $(window).on('scroll', function () {
    // if ($(window).width() >= 1280) {
    if ($(window).scrollTop() > 0) {
      $('#header').addClass('fixed');
    } else {
      $('#header').removeClass('fixed');
    }

    if ($(this).scrollTop() > 0) {
      $('#header').addClass('fixed');
    } else {
      $('#header').removeClass('fixed');
    }
    // }
  });

  // GNB 언어 선택
  $('#language_btn').on('click', function (e) {
    $(this).next('.language_box').fadeToggle();
  });

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

  // 탭 이벤트
  $('.tab_btn_wrap .tab_btn').on('click', function () {
    var $idx = $(this).index();
    $('.tab_btn_wrap .tab_btn').removeClass('on');
    $(this).addClass('on');
    $('.tab_contents_wrap > div').removeClass('on');
    $('.tab_contents_wrap > div').eq($idx).addClass('on');
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

  $(window).on('resize', function () {
    if ($(window).width() >= 768) {
      // 기존 스크롤 이벤트 핸들러 제거
      $(window).off('scroll');
      $('#wrap').removeClass('animation');

      // 새로운 스크롤 이벤트 핸들러 추가
      $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
          $('#wrap').addClass('animation');
          $('#header').addClass('fixed');
        } else {
          $('#wrap').removeClass('animation');
          $('#header').removeClass('fixed');
        }
      });
    } else {
      // 768px 미만에서는 기존 스크롤 이벤트 핸들러 제거
      $('.company').addClass('style');
      $('#wrap').addClass('white');
      $('#wrap').addClass('animation');
    }
  });

  // 초기 로드 시에도 실행
  $(window).trigger('resize');

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

  // Tab — HTML에 active가 있으면 유지, 없으면 첫 번째 탭
  $('.tab_area_content').hide();
  var $activeTabLi = $('ul.tab_area li.active');
  if (!$activeTabLi.length) {
    $activeTabLi = $('ul.tab_area li:first').addClass('active');
  }
  $activeTabLi.show();
  var initialTab = $activeTabLi.find('a').attr('href');
  if (initialTab) {
    $(initialTab).show();
  } else {
    $('.tab_area_content:first').show();
  }
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

  if ($('.rolling-container').length > 0) {
    var rolling = new Swiper('.rolling-container', {
      slidesPerView: 'auto',
      loop: true,
      loopAdditionalSlides: 1,
      loopAddBlankSlides: true,
      autoplay: {
        delay: 0,
        disableOnInteraction: true,
      },
      speed: 3000,
      // freeMode: true,
      // freeModeMomentum: false,
    });

    var isPlaying = true; // 현재 슬라이드 상태를 추적
    var isHovering = false; // 마우스 hover 상태를 추적
    var savedSwiperX = 0; // Swiper X 값을 저장할 변수
    var savedActualX = 0; // 실제 X 값을 저장할 변수
    var remainingDuration = 3000; // 남은 transition-duration 값을 저장할 변수
    var slideStartTime = 0; // 슬라이드가 시작된 시간을 저장할 변수
    var slideDuration = 3000; // 슬라이드가 진행되는 전체 시간 (3000ms)
    var elapsedTime = 0; // 경과된 시간을 저장할 변수
    var totalElapsedTime = 0; // 전체 경과 시간을 축적하기 위한 변수

    // Swiper가 설정한 translate3d()의 X 값을 가져오는 함수 (Swiper X)
    function getSwiperTranslateX() {
      const swiperWrapper = document.querySelector(
        '.rolling-container .swiper-wrapper'
      );
      const transformValue = swiperWrapper.style.transform; // 인라인 스타일에서 transform 값 가져오기

      if (transformValue && transformValue.includes('translate3d')) {
        const translateValues = transformValue
          .match(/translate3d\((.*?)\)/)[1]
          .split(', ');
        return parseFloat(translateValues[0]); // Swiper X축 값 반환
      }
      return 0; // 기본 값 0 반환
    }

    // 현재 진행 중인 실제 X 값을 가져오는 함수 (Actual X)
    function getActualTranslateX() {
      const swiperWrapper = document.querySelector(
        '.rolling-container .swiper-wrapper'
      );
      const style = window.getComputedStyle(swiperWrapper); // 현재 스타일 가져오기
      const matrix = new WebKitCSSMatrix(style.transform); // transform 값을 matrix로 변환
      return matrix.m41; // 실제 X축 값 (m41은 translateX 값)
    }

    // 정지 시 슬라이드가 진행된 시간을 계산하는 함수
    function calculateElapsedTime() {
      const currentTime = Date.now();
      return currentTime - slideStartTime; // 슬라이드 시작 후 경과된 시간(ms)
    }

    // 슬라이드를 정지시키기 전 Swiper X 값을 미리 저장하고, 정지
    function pauseRolling() {
      elapsedTime = calculateElapsedTime(); // 이번 정지 시 경과된 시간(ms)
      totalElapsedTime += elapsedTime; // 이번까지 누적된 전체 경과 시간

      // 남은 시간을 계산할 때는 처음부터 진행된 전체 시간을 기준으로 빼줌
      remainingDuration = slideDuration - totalElapsedTime; // 3000ms에서 누적된 시간 빼기

      savedSwiperX = getSwiperTranslateX(); // Swiper X 값을 미리 저장
      savedActualX = getActualTranslateX(); // 실제 X 값을 저장
      rolling.autoplay.stop(); // Swiper의 자동 재생 멈춤

      // 실제 X 값으로 .swiper-wrapper에 transform 적용하여 정지
      $('.rolling-container .swiper-wrapper').css(
        'transform',
        `translate3d(${savedActualX}px, 0, 0)`
      ); // 실제 X 값으로 고정
    }

    // 슬라이드를 다시 시작하는 함수 (저장된 Swiper X 값으로 재개)
    function startRolling() {
      // 남은 시간을 이용해 transition-duration 설정
      $('.rolling-container .swiper-wrapper').css(
        'transition',
        `transform ${remainingDuration}ms ease`
      ); // 남은 시간 적용
      $('.rolling-container .swiper-wrapper').css(
        'transform',
        `translate3d(${savedSwiperX}px, 0, 0)`
      ); // Swiper X 값으로 복구

      // 약간의 지연 후 다시 transition 적용하여 자연스럽게 재생
      setTimeout(function () {
        rolling.autoplay.start(); // Swiper 자동 재생 다시 시작
        slideStartTime = Date.now(); // 슬라이드가 다시 시작된 시간 저장
      }, 50); // 50ms 지연 후 재생
    }

    // 슬라이드가 끝날 때 호출되는 함수
    function resetSlideStatus() {
      totalElapsedTime = 0; // 슬라이드가 끝나면 전체 경과 시간을 초기화
      remainingDuration = slideDuration; // 남은 시간도 초기화
    }

    // 버튼 클릭 시 슬라이드를 정지 또는 다시 시작하는 이벤트 핸들러
    $('.slide_control').on('click', function () {
      if (isPlaying) {
        pauseRolling(); // 슬라이드 정지
        $(this).removeClass('pause');
        isPlaying = false;
      } else {
        startRolling(); // 슬라이드 재시작
        $(this).addClass('pause');
        isPlaying = true;
      }
    });

    // .swiper-wrapper에 hover 시에도 슬라이드를 정지하고, 다시 시작
    $('.rolling-container .swiper-wrapper').on('mouseenter', function () {
      if (isPlaying && !isHovering) {
        // 이미 정지된 상태가 아니라면
        pauseRolling(); // Hover 시 슬라이드 정지
        $('.slide_control').removeClass('pause');
        isPlaying = false; // 상태를 정지로 변경
        isHovering = true; // Hover 상태 기록
      }
    });

    $('.rolling-container .swiper-wrapper').on('mouseleave', function () {
      if (!isPlaying && isHovering) {
        // 이미 재생 중인 상태가 아니라면
        startRolling(); // Hover 해제 시 슬라이드 재시작
        $('.slide_control').addClass('pause');
        isPlaying = true; // 상태를 재생으로 변경
        isHovering = false; // Hover 상태 해제
      }
    });

    // 슬라이드가 처음 시작될 때 현재 시간을 저장하고, 슬라이드가 끝날 때만 초기화
    rolling.on('slideChange', function () {
      totalElapsedTime = 0; // 슬라이드가 변경되면 누적 경과 시간을 초기화
      slideStartTime = Date.now(); // 슬라이드가 시작된 시간 저장
    });

    // 슬라이드가 완료될 때만 초기화하는 이벤트
    rolling.on('reachEnd', function () {
      resetSlideStatus(); // 슬라이드가 끝났을 때만 전체 경과 시간과 남은 시간을 초기화
    });
  }
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

// 스크롤 위치를 저장할 변수
var scrollPosition = 0;

// 팝업을 보이게 하는 함수
function showPopup(popupId) {
  // 현재 스크롤 위치를 저장
  scrollPosition = $(window).scrollTop();

  // 팝업을 보이게 하고, 스크롤을 비활성화
  $('#' + popupId).css({ display: 'flex' });
  $('body').css({
    position: 'fixed',
    top: -scrollPosition + 'px',
    width: '100%',
  });
}

// 팝업을 숨기는 함수
function hidePopup(popupId) {
  // 팝업을 숨기고, 스크롤을 활성화하면서 이전 스크롤 위치로 복원
  $('#' + popupId).hide();
  $('body').css({
    position: '',
    top: '',
    width: '',
  });
  $(window).scrollTop(scrollPosition);
}

// 모든 팝업 닫기 버튼에 이벤트 리스너를 추가하는 함수
function initializePopupButtons() {
  $('.popup_container button').on('click', function () {
    var popup = $(this).closest('.popup_container');
    popup.hide();

    // 스크롤을 활성화하면서 이전 스크롤 위치로 복원
    $('body').css({
      position: '',
      top: '',
      width: '',
    });
    $(window).scrollTop(scrollPosition);
  });
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

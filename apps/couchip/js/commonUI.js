var FE =
  window.FE ||
  (function () {
    return {
      init: function () {
        FE.baseUI($(document));
        FE.gnbUI();
      },
      baseUI: function ($this) {
        var _ = $this;

        //placeholder(공통 - IE9 이하 부터 실행)
        _.find(".input-base, .textarea-base").placeholder();

        // _.find('input[type="checkbox"], input[type="radio"]').ezMark();

        _.find(".select-base").fakeselect();
        _.find(".sel-base select")
          .on("change", function () {
            $(this).prev().html($(this).find("option:selected").text());
          })
          .prev()
          .html(function () {
            return $(this).next().find("option:selected").text();
          });

        _.find(".o-scrollbar").mCustomScrollbar({ theme: "minimal-dark" });

        _.find(".btn-top").on("click", function (e) {
          e.preventDefault();
          $("html, body").animate({ scrollTop: 0 }, 300);
        });

        _.find(".datepicker").datepicker({
          dateFormat: "yy.mm.dd",
          dayNamesMin: ["일", "월", "화", "수", "목", "금", "토"],
          // minDate: 0,
          numberOfMonths: 1,
        });

        _.find(".cal-num .plus").on("click", function () {
          var input = $(this).closest(".cal-num").find("input.num");
          if (Number(input.val()) >= input.data("max")) return;
          input.val(Number(input.val()) + 1);
        });
        _.find(".cal-num .minus").on("click", function () {
          var input = $(this).closest(".cal-num").find("input.num");
          if (Number(input.val()) <= input.data("min")) return;
          input.val(Number(input.val()) - 1);
        });

        _.find(".s-tooltip:not(.only-css)").tooltip({ align: "r" });
        _.find(".s-tooltip.only-css").on("click", function () {
          $(this).next(".pop-simple").css("display", "block");
        });
        _.find(".pop-simple .btn-close").on("click", function (e) {
          e.preventDefault();
          $(this).closest(".pop-simple").css("display", "none");
        });
        _.find(".s-tip").tooltip();

        _.find(".other-info > li .member").on("click", function (e) {
          e.preventDefault();
          if (!$(this).hasClass("on")) {
            $(this).addClass("on");
            $(this).next(".other-box").addClass("on");
          } else {
            $(this).removeClass("on");
            $(this).next(".other-box").removeClass("on");
          }
        });

        $(window).on("load resize", function () {
          _.find(".layer-popup.lg .layer-cont").css({
            height: $(window).height() - 260,
          });
        });

        _.find("#footer .foot-menu li.privacy a").on("click", function (e) {
          e.preventDefault();
          windowPopup("http://www.settlebank.kr/privacy", 800, 600);
        });
      },
      gnbUI: function () {
        var menu = 1;
        var sub = 1;
        var $submenu = $(".submenu-wrap");

        function hide() {
          if (menu && sub) {
            $submenu.slideUp("fast");
            $("#gnb .on").removeClass("on");
          }
        }

        $("#gnb > li > a").bind("mouseover focus", function () {
          $("#gnb .on").removeClass("on");
          $(this).closest("li").addClass("on");
          $submenu.stop().slideDown("fast");
        });
        $("#gnb").mouseenter(function () {
          menu = 0;
        });
        $submenu.mouseenter(function () {
          sub = 0;
        });
        $("#gnb").mouseleave(function () {
          menu = 1;
          setTimeout(hide, 500);
        });
        $submenu.mouseleave(function () {
          sub = 1;
          setTimeout(hide, 500);
        });
      },
      slideUI: function () {
        var mainFullVisual = $(".main-full-visual .main-banner").slick({
          dots: true,
          appendDots: $(".main-slick-pager"),
          autoplay: false,
          fade: true,
          infinite: true,
          speed: 500,
          arrows: false,
          touchThreshold: 100,
          slidesToShow: 1,
          slidesToScroll: 1,
        });

        var mainBanner = $(".main-banner-wrap .main-banner").slick({
          autoplay: true,
          autoplaySpeed: 3000,
          // fade: true,
          dots: true, // 201230 수정
          infinite: true,
          speed: 500,
          arrows: false,
          draggable: true,
          touchThreshold: 100,
          slidesToShow: 1,
          slidesToScroll: 1,
        });
        var mainBannerPrev = $(".main-banner-btn.prev");
        var mainBannerNext = $(".main-banner-btn.next");
        mainBannerPrev.on("click", function (e) {
          e.preventDefault();
          mainBanner.slick("slickPrev");
        });
        mainBannerNext.on("click", function (e) {
          e.preventDefault();
          mainBanner.slick("slickNext");
        });

        var pkgSlick = $(".pkg-slick").slick({
          dots: true,
          appendDots: $(".pkg-slick-pager"),
          infinite: true,
          arrows: false,
          autoplay: true,
          autoplaySpeed: 3000,
          variableWidth: true,
          touchThreshold: 100,
          slidesToShow: 4,
          slidesToScroll: 1,
        });
        var $pkgPrev = $(".pkg-slick-btn.prev");
        var $pkgNext = $(".pkg-slick-btn.next");
        $pkgPrev.on("click", function (e) {
          e.preventDefault();
          pkgSlick.slick("slickPrev");
        });
        $pkgNext.on("click", function (e) {
          e.preventDefault();
          pkgSlick.slick("slickNext");
        });
      },
      initPriceRange: function (_min, _max) {
        /* 설명   : 검색 결과 조건 - 요금 범위
			   사용처 : 필요시 호출 ex) FE.initPriceRange(0,1000000); */
        var priceRS = $("#priceRangeSet");
        var priceRMax = $("#priceRangeMax");
        var priceRMin = $("#priceRangeMin");

        priceRS.slider({
          range: true,
          min: _min,
          max: _max,
          values: [_min, _max],
          slide: function (e, ui) {
            priceRMin.text(FE.numberSetComma(ui.values[0]));
            priceRMax.text(FE.numberSetComma(ui.values[1]));
          },
        });
        priceRMin.text(FE.numberSetComma(priceRS.slider("values", 0)));
        priceRMax.text(FE.numberSetComma(priceRS.slider("values", 1)));
      },
      numberSetComma: function (val) {
        /* 설명   : 요금 단위 콤마로 변환 */
        while (/(\d+)(\d{3})/.test(val.toString())) {
          val = val.toString().replace(/(\d+)(\d{3})/, "$1" + "," + "$2");
        }
        return val;
      },
      authTimer: function (time, target, callback) {
        $(target).text(generateAuthTime(time));
        var timer = time - 1;
        authInterval = setInterval(function () {
          $(target).text(generateAuthTime(timer));
          if (timer <= 0) {
            clearAuthTimer();
            callback();
            return false;
          }
          --timer;
        }, 1000);
      },
    };
  })();

$(function () {
  FE.init();
});

function layerPopup(id, mode, callback) {
  $this = $("#" + id);
  $(".layer-dimm").fadeIn(300);
  $this.fadeIn(300);
  if (mode === "bodyFix") {
    $("html, body").css("overflow-y", "hidden");
    $("html, body").on(
      "touchmove scroll mousewheel DOMMouseScroll",
      function (e) {
        e.preventDefault();
      },
      false
    );
  }
  $(".layer-dimm, .layer-popup .btn-close").on("click", function (e) {
    e.preventDefault();
    $(".layer-dimm, .layer-popup").fadeOut(300);
    $("html, body").css("overflow-y", "");
    $("html, body").off("touchmove scroll mousewheel DOMMouseScroll");
  });
  if (typeof callback === "function") {
    callback();
  }
}

/**
 * 라디오 버튼에 따른 UI(SHOW/HIDE) 처리를 위한 함수
 */
var getScreenAsRadio = function (selector, $target, reverse) {
  var selectorId = selector.substr(1);
  $(selector).each(function () {
    if (
      $(this).attr("id") === selectorId + "1" &&
      $(this).is(":checked") === true
    ) {
      if (typeof $target === "string") {
        toggleClass($target, 1, reverse);
      } else {
        toggleClass($target[0], 2, reverse);
        toggleClass($target[1], 1, reverse);
      }
    }
    if (
      $(this).attr("id") === selectorId + "2" &&
      $(this).is(":checked") === true
    ) {
      if (typeof $target === "string") {
        toggleClass($target, 2, reverse);
      } else {
        toggleClass($target[1], 2, reverse);
        toggleClass($target[0], 1, reverse);
      }
    }
  });
  $(selector).on("click", function () {
    if (
      $(this).attr("id") === selectorId + "1" &&
      $(this).is(":checked") === true
    ) {
      if (typeof $target === "string") {
        toggleClass($target, 1, reverse);
      } else {
        toggleClass($target[0], 2, reverse);
        toggleClass($target[1], 1, reverse);
      }
    }
    if (
      $(this).attr("id") === selectorId + "2" &&
      $(this).is(":checked") === true
    ) {
      if (typeof $target === "string") {
        toggleClass($target, 2, reverse);
      } else {
        toggleClass($target[1], 2, reverse);
        toggleClass($target[0], 1, reverse);
      }
    }
  });
};
var toggleClass = function (target, type, reverse) {
  if (type === 1) {
    if (!reverse) {
      $(target).addClass("off").removeClass("on");
    } else {
      $(target).addClass("on").removeClass("off");
    }
  } else {
    if (!reverse) {
      $(target).addClass("on").removeClass("off");
    } else {
      $(target).addClass("off").removeClass("on");
    }
  }
};

var windowPopup = function (url, width, height) {
  var popOption =
    "width=" +
    width +
    ", height=" +
    height +
    ", left=30, top=30, resizable=no, scrollbars=yes, status=no;";
  window.open(url, "", popOption);
};

// FE.authTimer를 위한 변수 및 함수
var authInterval = null;
var generateAuthTime = function (timer) {
  if (timer) {
    var minute = Math.floor(timer / 60);
    var second = timer % 60;
    if (minute < 10) {
      minute = "0" + minute;
    }
    if (second < 10) {
      second = "0" + second;
    }
    return minute + ":" + second;
  }
  return "0";
};
var clearAuthTimer = function () {
  clearInterval(authInterval);
};

var lpad = function (str, padLen, padStr) {
  if (padStr.length > padLen) {
    console.log("오류 : 채우고자 하는 문자열이 요청 길이보다 큽니다");
    return str;
  }
  str += ""; // 문자로
  padStr += ""; // 문자로
  while (str.length < padLen) str = padStr + str;
  str = str.length >= padLen ? str.substring(0, padLen) : str;
  return str;
};

if (!String.prototype.padStart) {
  String.prototype.padStart = function padStart(targetLength, padString) {
    if (this.length >= targetLength) {
      return String(this);
    } else {
      if (padString == null || padString == " ") {
        padString = " ";
      } else if (padString.length > 1) {
        padString = padString.substring(0, 1);
      }
      targetLength = targetLength - this.length;
      var prefix = "";
      for (var i = 0; i < targetLength; i++) {
        prefix += padString;
      }
      return prefix + String(this);
    }
  };
}

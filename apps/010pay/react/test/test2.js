var AppDownloadScheme = {
  App010PAY: function () {
    var ua = window.navigator.userAgent;
    var visitedAt = new Date().getTime();

    if (/Android/i.test(ua)) {
      if (ua.search("chrome")) {
        setTimeout(function () {
          location.href = "intent://kr.co.settlebank.sb010pay";
        }, 500);
      } else {
        // 크롬 이외의 브라우저들
        setTimeout(function () {
          if (new Date().getTime() - visitedAt < 2000) {
            location.href = "https://app.adjust.com/oh9uvj8";
          }
        }, 500);

        var iframe = document.createElement("iframe");
        iframe.style.visibility = "hidden";
        iframe.src = "sb010pay://??";
        document.body.appendChild(iframe);
        document.body.removeChild(iframe);
      }
    } else if (/iPhone|iPad|iPod/i.test(ua)) {
      //alert("ios version : "+PassPayScheme.getIosVersion())

      setTimeout(function () {
        if (new Date().getTime() - visitedAt < 2000) {
          location.href = "https://app.adjust.com/oh9uvj8";
        }
      }, 500);

      setTimeout(function () {
        //alert("tauthlink://applink/010pay?"+params);
        location.href = "sb010pay://??";
      }, 0);
    }
  },
};

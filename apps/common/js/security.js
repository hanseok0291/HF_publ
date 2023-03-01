$(function () {
  if (window.location.host == "ux.sbsvc.online") {
    if (Cookies.get("setPassCoocie") == "true") {
    } else {
      //
      var modclass = "password-wrap";
      $(
        "<style type='text/css'> ." +
          modclass +
          ":after{content: ''; position: fixed; top: 0; right: 0; bottom: 0; left: 0; width: 100vw; height: 100vh; background-color: #000 !important; z-index: 1000;}</style>"
      ).appendTo("head");

      $("body").addClass("password-wrap");

      var load = prompt("비밀번호는?", "");

      if (load == "123123") {
        $("body").removeClass("password-wrap");
        Cookies.set("setPassCoocie", "true", { expires: 30 });
      } else {
        document.addEventListener("contextmenu", (event) => {
          alert("우클릭 방지");
          event.preventDefault();
        });

        // disable right click
        document.addEventListener("contextmenu", (event) =>
          event.preventDefault()
        );

        document.onkeydown = function (e) {
          // disable F12 key
          if (e.keyCode == 123) {
            return false;
          }
          // disable C key
          if (e.ctrlKey && e.shiftKey && e.keyCode == 67) {
            return false;
          }
          // disable I key
          if (e.ctrlKey && e.shiftKey && e.keyCode == 73) {
            return false;
          }
          // disable J key
          if (e.ctrlKey && e.shiftKey && e.keyCode == 74) {
            return false;
          }
          // disable U key
          if (e.ctrlKey && e.keyCode == 85) {
            return false;
          }
        };
      }
      //
    }
  } else {
    // console.log("no" + test);
  }
});

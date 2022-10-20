var AppInterface = function () {
  (this.isANDROID = !1),
    (this.isIOS = !1),
    (this.cbId = ""),
    (this.cb = new Array()),
    this.init.apply(this, arguments);
};
(AppInterface.prototype.init = function () {
  (this.isANDROID = "Android" == this.getOS()),
    (this.isIOS = "iOS" == this.getOS());
}),
  (AppInterface.prototype.getOS = function () {
    var e = navigator.userAgent.toLowerCase();
    return e.indexOf("android") > -1
      ? "Android"
      : e.indexOf("iphone") > -1 ||
        e.indexOf("ipad") > -1 ||
        e.indexOf("ipod") > -1
      ? "iOS"
      : "other";
  }),
  (AppInterface.prototype.exec = function () {
    var e = "",
      t = new Array();
    if (arguments.length > 0) {
      if (((e = arguments[0]), arguments.length > 1))
        for (var i = 1; i < arguments.length; i++) t[i - 1] = arguments[i];
      if (t.length > 0 && "function" == typeof t[0].callback) {
        var n = new Date(),
          a = n.getTime();
        (this.cbId = "CB" + a),
          (t[0].callbackId = this.cbId),
          (window.appInterface.cb[this.cbId] = t[0].callback),
          delete t[0].callback;
      }
      if (this.isIOS) {
        var r = { method: e };
        t.length > 0 && (r.args = t[0]);
        try {
          setTimeout(function () {
            window.webkit.messageHandlers.callApp.postMessage(r);
          }, 300);
        } catch (e) {
          return -1;
        }
      } else {
        if (!this.isANDROID)
          return (
            ("close" != e &&
              "goSignUp" != e &&
              "goCard" != e &&
              "address" != e) ||
              (self.close(), parent.close()),
            -1
          );
        try {
          t.length > 0
            ? window.callApp[e](JSON.stringify(t[0]))
            : window.callApp[e]();
        } catch (e) {
          return -1;
        }
      }
    } else alert("1媛� �댁긽�� 留ㅺ컻蹂��섎� �꾨떖�댁빞 �⑸땲��.");
  }),
  (AppInterface.prototype.callback = function (e) {
    var t = e.callbackId;
    window.appInterface.cb[t].call(this, e), delete window.appInterface.cb[t];
  });
var appInterface = new AppInterface();

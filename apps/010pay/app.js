// Express의 미들웨어 불러오기
var express = require("express"),
  http = require("http"),
  path = require("path");
var bodyParser = require("body-parser"),
  serveStatic = require("serve-static");

//express 객체 생성
var app = express();

// body-parser : post로 요쳥했을 때의 요청 파라미터 확인 방법을 제공
// body-parser를 이용해 application/x=www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({ extended: false }));
// body-parser를 이용해 application/json 파싱
app.use(bodyParser.json());

app.use("/010pay", serveStatic(path.join(__dirname, "010pay")));

http.createServer(app).listen(3001, function () {
  console.log("Express server start....");
});

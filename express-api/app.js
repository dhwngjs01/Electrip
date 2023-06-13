// 모듈 로드
var express = require("express");
var createError = require("http-errors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var bodyParser = require("body-parser");

var app = express();

// 템플릿 엔진 설정
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// 미들웨어 설정
// app.use(cors()); // CORS 설정 (Access-Control-Allow-Origin: *)
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(logger("dev")); // 로그 설정 (req.ip, req.method, req.url, res.statusCode, res.statusMessage, res.body) - 개발용 로그 출력
app.use(cookieParser()); // 쿠키 설정 (req.cookies) - 쿠키를 파싱해서 req.cookies 객체에 담아줌
app.use(express.static(path.join(__dirname, "public"))); // 정적 파일 설정 (이미지, css, js 등) - public 폴더를 정적 파일을 제공하는 폴더로 설정

// body-parser 설정
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 경로 설정
app.use("/uploads", express.static("uploads")); // 업로드 폴더를 정적 파일을 제공하는 폴더로 설정

// 라우터 설정
app.use("/", require("./routes/urls/main"));
app.use("/api/reserve", require("./routes/urls/reserve"));
app.use("/api/member", require("./routes/urls/member"));
app.use("/api/admin", require("./routes/urls/admin"));

// 404 처리 미들웨어
app.use(function (req, res, next) {
  next(createError(404));
});

// 에러 핸들러
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

// 모듈 내보내기
module.exports = app;

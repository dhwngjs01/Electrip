// 모듈 로드
var express = require("express");
var createError = require("http-errors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var app = express();

// 템플릿 엔진 설정
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// 미들웨어 설정
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// 라우터 설정
app.use("/api", require("./routes/urls/main"));
app.use("/api/auth", require("./routes/urls/auth"));
app.use("/api/accounts", require("./routes/urls/accounts"));

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

// 모듈 로드
require("dotenv").config({ quiet: true });
var express = require("express");
var path = require("path");
var logger = require("morgan");
var cors = require("cors");
var rateLimit = require("express-rate-limit");

var app = express();
var allowedOrigins = (
  process.env.FRONTEND_ORIGINS ||
  "http://localhost,http://127.0.0.1"
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

if (process.env.TRUST_PROXY) {
  app.set(
    "trust proxy",
    /^\d+$/.test(process.env.TRUST_PROXY)
      ? Number.parseInt(process.env.TRUST_PROXY, 10)
      : process.env.TRUST_PROXY
  );
}

app.use(
  "/api",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    message: { message: "요청이 너무 많습니다. 잠시 후 다시 시도해 주세요." },
  })
);

// 미들웨어 설정
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      const error = new Error("허용되지 않은 Origin입니다.");
      error.status = 403;
      return callback(error);
    },
    credentials: true,
  })
);

if (process.env.NODE_ENV !== "test") {
  app.use(logger("dev")); // 로그 설정 (req.ip, req.method, req.url, res.statusCode, res.statusMessage, res.body) - 개발용 로그 출력
}
app.use(express.static(path.join(__dirname, "public"))); // 정적 파일 설정 (이미지, css, js 등) - public 폴더를 정적 파일을 제공하는 폴더로 설정

app.use(express.urlencoded({ extended: false, limit: "100kb" }));
app.use(express.json({ limit: "100kb" }));

// 경로 설정
// 라우터 설정
app.use("/", require("./routes/urls/main"));
app.use("/api/reserve", require("./routes/urls/reserve"));
app.use("/api/member", require("./routes/urls/member"));
app.use("/api/admin", require("./routes/urls/admin"));

// 404 처리 미들웨어
app.use(function (req, res, next) {
  res.status(404).json({ message: "요청한 경로를 찾을 수 없습니다." });
});

// 에러 핸들러
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "test" && (!err.status || err.status >= 500)) {
    console.error(err);
  }

  res.status(err.status || 500).json({
    message:
      err.status && err.status < 500
        ? err.message
        : "서버 요청을 처리하지 못했습니다.",
  });
});

// 모듈 내보내기
module.exports = app;

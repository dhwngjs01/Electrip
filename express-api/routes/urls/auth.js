const express = require("express");
const router = express.Router();
const controller = require("../controller/authController");

router.get("/kakao", controller.kakaoLogin);
router.post("/login", controller.login);

module.exports = router;
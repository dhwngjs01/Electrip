const express = require("express");
const router = express.Router();
const controller = require("../controller/memberController");

router.get("/myReserve", controller.getMyReserveList);
router.put("/myReserve/cancel", controller.cancelMyReserve);

module.exports = router;

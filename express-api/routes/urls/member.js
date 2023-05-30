const express = require("express");
const router = express.Router();
const controller = require("../controller/memberController");

router.get("/myReserve", controller.getMyReserveList);
router.put("/myReserve/cancel", controller.cancelMyReserve);
router.put("/myReserve/finish", controller.finishMyReserve);

module.exports = router;

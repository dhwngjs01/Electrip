const express = require("express");
const router = express.Router();

const controller = require("../controller/reserveController");
const { authMiddleware } = require("../../util/jwtAuth");

router.get("/zone", controller.getZoneList);
router.get("/zone/:zoneNo", controller.getZoneInfo);
router.get("/zone/:zoneNo/carList", controller.getCarListFromZone);
router.get("/car", controller.getAllCarList);

router.post("/", authMiddleware, controller.reserve);

module.exports = router;

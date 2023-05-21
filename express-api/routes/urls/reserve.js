const express = require("express");
const router = express.Router();

const controller = require("../controller/reserveController");

router.get("/zone", controller.getZoneList);
router.get("/zone/:zoneNo/carList", controller.getCarListFromZone);

router.get("/car", controller.getAllCarList);

module.exports = router;

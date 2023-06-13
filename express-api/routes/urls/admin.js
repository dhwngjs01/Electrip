const express = require("express");
const router = express.Router();
const controller = require("../controller/adminController");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/dashboard", controller.getDashboard);
router.get("/users", controller.getAllUsers);
router.patch("/users/:id", controller.userStateControl);

router.get("/cars", controller.getAllCars);
router.get("/cars/:car_no", controller.getCarInfo);
router.get("/cars/reservations/:car_no", controller.getCarReservations);
router.patch("/cars/:car_no", controller.carStateControl);
router.post("/cars", upload.any(), controller.addCar);
router.put("/cars/:car_no", upload.any(), controller.editCar);
router.delete("/cars/:car_no", controller.deleteCar);

router.get("/zones", controller.getAllZones);
router.get("/zones/:zone_no", controller.getZoneInfo);
router.post("/zones", controller.addZone);
router.patch("/zones/:zone_no", controller.zoneStateControl);
router.put("/zones/:zone_no", controller.editZone);
router.delete("/zones/:zone_no", controller.deleteZone);

router.get("/reservations", controller.getAllReservations);
router.get("/reservations/:reserve_no", controller.getReserveInfo);

module.exports = router;

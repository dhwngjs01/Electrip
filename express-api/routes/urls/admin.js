const express = require("express");
const router = express.Router();
const controller = require("../controller/adminController");

router.get("/dashboard", controller.getDashboard);
router.get("/users", controller.getAllUsers);
router.patch("/users/:id", controller.userStateControl);
router.get("/cars", controller.getAllCars);
router.patch("/cars/:car_no", controller.carStateControl);

module.exports = router;

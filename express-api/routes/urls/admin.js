const express = require("express");
const router = express.Router();
const controller = require("../controller/adminController");

router.get("/dashboard", controller.getDashboard);

module.exports = router;

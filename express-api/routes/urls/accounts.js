const express = require("express");
const router = express.Router();
const controller = require("../controller/accountsController");

router.get("/:user", controller.getAccounts);

router.post("/register", controller.registerUser);

module.exports = router;

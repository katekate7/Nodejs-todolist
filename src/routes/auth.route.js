const express = require("express");
const router = express.Router();
const { userCheck, authCheck } = require("../middleware");
const controller = require("../controllers/auth.controller");

// returns token
router.post("/login", controller.login);

router.post(
  "/register",
  [userCheck.checkDuplicateUsernameOrEmail],
  controller.register
);

router.get("/getUserData", [authCheck.verifyToken], controller.getUserData);

module.exports = router;

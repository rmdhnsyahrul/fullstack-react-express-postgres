const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { body } = require("express-validator");

router.post(
  "/register",
  [body("email").trim().isEmail(), body("password").trim().isStrongPassword()],
  authController.register
);
router.post(
  "/login",
  [body("email").trim().isEmail(), body("password").trim().isStrongPassword()],
  authController.login
);

module.exports = router;

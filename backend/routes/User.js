const express = require("express");
const router = express.Router();

const {
  signUp,
  login,
  sendOTP,
  changePassword,
} = require("../controllers/Auth");
const { auth } = require("../middlewares/auth");
const {
  resetPassword,
  resetPasswordToken,
} = require("../controllers/ResetPassword");

router.post("/signup", signUp);
router.post("/login", login);
router.post("/sendotp", sendOTP);
router.post("/changepassword", auth, changePassword);

// route for generating reset password token
router.post("/reset-password-token", resetPasswordToken);
// route for resetting password after verification
router.post("/reset-password", resetPassword);

module.exports = router;

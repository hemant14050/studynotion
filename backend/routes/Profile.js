const express = require("express");
const router = express.Router();

const {
  updateProfile,
  getUserDetails,
  deleteAccount,
  getEnrolledCourses,
  updateProfilePicture,
  instructorDashboard,
} = require("../controllers/Profile");
const { auth, isInstructor } = require("../middlewares/auth");

router.delete("/deleteProfile", auth, deleteAccount);
router.put("/updateProfile", auth, updateProfile);
router.get("/getUserDetails", auth, getUserDetails);
router.put("/updateProfilePicture", auth, updateProfilePicture);
router.get("/getEnrolledCourses", auth, getEnrolledCourses);

router.get("/instructorDashboard", auth, isInstructor, instructorDashboard);

module.exports = router;

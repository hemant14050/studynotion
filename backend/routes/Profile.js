const express = require("express");
const router = express.Router();

const {updateProfile, getUserDetails, deleteAccount, getEnrolledCourses, updateProfilePicture} = require("../controllers/Profile");
const {auth} = require("../middlewares/auth");

router.delete("/deleteProfile", auth, deleteAccount);
router.put("/updateProfile", auth, updateProfile);
router.get("/getUserDetails", auth, getUserDetails);
router.put("/updateProfilePicture", auth, updateProfilePicture);
router.get("/getEnrolledCourses", auth, getEnrolledCourses);

module.exports = router;

const express = require("express");
const router = express.Router();

const {createCourse, showAllCourses, getCourseDetails} = require("../controllers/Course");
const {showAllCategories, createCategory, categoryPageDetails} = require("../controllers/Category");

const { createSection, updateSection, deleteSection} = require("../controllers/Section");

// Sub-Sections Controllers Import
const { createSubSection, updateSubSection, deleteSubSection} = require("../controllers/Subsection");

// Rating Controllers Import
const { createRating, getAverageRating, getAllRatingAndReviews} = require("../controllers/RatingsAndReviews");

// Importing Middlewares
const { auth, isAdmin, isInstructor, isStudent } = require("../middlewares/auth");

// ********************************************************************************************************
//                                      Course routes
// ********************************************************************************************************

// Courses can Only be Created by Instructors
router.post("/createCourse", auth, isInstructor, createCourse);
//Add a Section to a Course
router.post("/addSection", auth, isInstructor, createSection);
// Update a Section
router.post("/updateSection", auth, isInstructor, updateSection)
// Delete a Section
router.post("/deleteSection", auth, isInstructor, deleteSection);
// Edit Sub Section
router.post("/updateSubSection", auth, isInstructor, updateSubSection);
// Delete Sub Section
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection);
// Add a Sub Section to a Section
router.post("/addSubSection", auth, isInstructor, createSubSection);
// Get all Registered Courses
router.get("/getAllCourses", showAllCourses);
// Get Details for a Specific Courses
router.post("/getCourseDetails", getCourseDetails);

// ********************************************************************************************************
//                                      Category routes (Only by Admin)
// ********************************************************************************************************
// Category can Only be Created by Admin
router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/showAllCategories", auth, showAllCategories);
router.post("/getCategoryPageDetails", auth, categoryPageDetails);

// ********************************************************************************************************
//                                      Rating and Review
// ********************************************************************************************************
router.post("/createRating", auth, isStudent, createRating);
router.get("/getAverageRating", auth, getAverageRating);
router.get("/getReviews", auth, getAllRatingAndReviews);

module.exports = router;

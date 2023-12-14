const User = require("../models/User");
const Profile = require("../models/Profile");
const CourseProgress = require("../models/CourseProgress");
const Course = require("../models/Course");
const { uploadFileToCloudinary } = require("../utils/cloudinaryUploader");
const { convertSecondsToDuration } = require("../utils/secToDuration");

// no need to create now
// method to update profile
exports.updateProfile = async (req, res) => {
  try {
    // get userId
    const userId = req.user.id;
    // get data from req body
    const {
      dateOfBirth = "",
      gender = "",
      about = "",
      contactNumber = "",
    } = req.body;
    // find and update profile
    const userDetails = await User.findById(userId);
    const profileDetails = await Profile.findById(
      userDetails.additionalDetailes
    );

    // update
    profileDetails.dateOfBirth = dateOfBirth;
    profileDetails.about = about;
    profileDetails.gender = gender;
    profileDetails.contactNumber = contactNumber;

    // save in db
    await profileDetails.save();

    // return res
    return res.status(200).json({
      success: true,
      profile: profileDetails,
      message: "Profile updated successfully!",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Something wents wrong",
    });
  }
};

// deleteAccount
exports.deleteAccount = async (req, res) => {
  try {
    // get userId
    const userId = req.user.id;
    // validation
    if (!userId) {
      return res.status(403).json({
        success: false,
        message: "Id missing",
      });
    }
    const userDetails = await User.findById(userId);
    if (!userDetails) {
      return res.status(403).json({
        success: false,
        message: "User not found",
      });
    }

    // SCHEDULE THIS DELETE REQ
    // cron job

    // HANDLE ENROLLED COUNT IN COURSE

    // delete profile
    await Profile.findByIdAndDelete(userDetails.additionalDetailes);
    // delete user
    await User.findByIdAndDelete(userId);

    // return res
    return res.status(200).json({
      success: true,
      message: "User Deleted successfully!",
    });
  } catch (err) {
    console.log("Error while deleting user: ", err);
    return res.status(500).json({
      success: false,
      message: "Something wents wrong",
    });
  }
};

// to getUserDetails
exports.getUserDetails = async (req, res) => {
  try {
    // get id
    const userId = req.user.id;
    const userDetails = await User.findById(userId)
      .populate("additionalDetailes")
      .exec();
    return res.status(200).json({
      success: true,
      message: "User data fetched successfully",
      data: userDetails,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.updateProfilePicture = async (req, res) => {
  try {
    const displayPicture = req.files.displayPicture;
    if (!displayPicture) {
      return res.status(401).json({
        success: false,
        message: "Please select profile pic to upload",
      });
    }
    const userId = req.user.id;
    // console.log(displayPicture);
    const image = await uploadFileToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    );

    // console.log(image);
    const updatedProfile = await User.findByIdAndUpdate(
      { _id: userId },
      { image: image.secure_url },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: `Image Updated successfully`,
      data: updatedProfile,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;
    let userDetails = await User.findOne({ _id: userId })
      .populate({
        path: "courses",
        populate: {
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        },
      })
      .exec();

    userDetails = userDetails.toObject();
    var SubsectionLength = 0;
    for (var i = 0; i < userDetails.courses.length; i++) {
      let totalDurationInSeconds = 0;
      SubsectionLength = 0;
      for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
        totalDurationInSeconds += userDetails.courses[i].courseContent[
          j
        ].subSection.reduce(
          (acc, curr) => acc + parseInt(curr.timeDuration),
          0
        );
        userDetails.courses[i].totalDuration = convertSecondsToDuration(
          totalDurationInSeconds
        );
        SubsectionLength +=
          userDetails.courses[i].courseContent[j].subSection.length;
      }
      let courseProgressCount = await CourseProgress.findOne({
        courseID: userDetails.courses[i]._id,
        userId: userId,
      });
      courseProgressCount = courseProgressCount?.completedVideos.length;
      if (SubsectionLength === 0) {
        userDetails.courses[i].progressPercentage = 100;
      } else {
        // To make it up to 2 decimal point
        const multiplier = Math.pow(10, 2);
        userDetails.courses[i].progressPercentage =
          Math.round(
            (courseProgressCount / SubsectionLength) * 100 * multiplier
          ) / multiplier;
      }
    }

    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userDetails}`,
      });
    }
    return res.status(200).json({
      success: true,
      message: "Fetched successfully!",
      data: userDetails.courses,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.instructorDashboard = async (req, res) => {
  try {
    const courseDetails = await Course.find({ instructor: req.user.id });

    const courseData = courseDetails.map((course) => {
      const totalStudentsEnrolled = course.studentsEnrolled.length;
      const totalAmountGenerated = totalStudentsEnrolled * course.price;

      // Create a new object with the additional fields
      const courseDataWithStats = {
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        // Include other course properties as needed
        totalStudentsEnrolled,
        totalAmountGenerated,
      };

      return courseDataWithStats;
    });

    res.status(200).json({
      success: true,
      courses: courseData,
      message: "Instructor dashboard data fetched successfully!",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const RatingAndReviews = require("../models/RatingAndReviews");
const Course = require("../models/Course");
const { default: mongoose } = require("mongoose");

// createRating
exports.createRating = async (req, res) => {
  try {
    // get userId
    const userId = req.user.userId;
    // fetch data from req body
    const { courseId, rating, review } = req.body;
    // validation
    // check if user is enrolled
    const courseDetails = await Course.findOne({
      _id: courseId,
      studentsEnrolled: { $eleMatch: { $eq: userId } },
    });
    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "Student is not enrolled in course",
      });
    }
    // only one ratingAndReview allowed for same user
    const alreadyReviewed = await RatingAndReviews.findOne({
      user: userId,
      course: courseId,
    });
    if (alreadyReviewed) {
      return res.status(403).json({
        success: false,
        message: "Course is already reviewed by user",
      });
    }
    // create rating and review
    const newRatingAndReviews = await RatingAndReviews.create({
      user: userId,
      rating: rating,
      review: review,
      course: courseId,
    });
    // update course
    const updatedCourseDetails = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          ratingAndReviews: newRatingAndReviews._id,
        },
      },
      { new: true }
    );

    // return response
    return res.status(200).json({
      success: true,
      message: "Ratings and Review created successfully!",
      newRatingAndReviews,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// get avg rating
exports.getAverageRating = async (req, res) => {
  try {
    // get course id
    const { courseId } = req.body;
    // calculate avg rating
    const result = await RatingAndReviews.aggregate(
      {
        $match: {
          course: new mongoose.Types.ObjectId(courseId),
        },
      },
      {
        $group: {
          _id: null,
          averageRating: {
            $avg: "$rating",
          },
        },
      }
    );

    // return rating
    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        message: "Avg rating feched!",
        averageRating: result[0].averageRating,
      });
    }

    // no rating
    return res.status(200).json({
      success: true,
      message: "No rating given to this course till now",
      averageRating: 0,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};

// getAll rating
exports.getAllRatingAndReviews = async (req, res) => {
  try {
    const allRatingsAndReviews = await RatingAndReviews.find({})
      .populate({
        path: "user",
        select: "firstName lastName email image",
      })
      .populate({
        path: "course",
        select: "courseName",
      })
      .sort({ rating: "desc" })
      .exec();

    return res.status(200).json({
      success: true,
      message: "All rating And Reviews fetched!",
      data: allRatingsAndReviews,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

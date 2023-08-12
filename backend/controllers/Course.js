const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const {uploadFileToCloudinary} = require("../utils/cloudinaryUploader");

// createCourse
exports.createCourse = async(req, res) => {
    try {
        // fetch all data
        const {courseName, courseDescription, whatYouWillLearn, price, tag, category, status, instructions} = req.body; 
        // get thumbnail
        const thumbnail = req.files.thumbnailImage;
        // validation
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !category) {
            return res.status(401).json({
                success: false,
                message: "All fields are required"
            });
        }
        if (!status || status === undefined) {
			status = "Draft";
		}
        // check for instructor
        const userId = req.user.id;
        const instructorDetailes = await User.findById(userId);
        // console.log("Details: ", instructorDetailes);
        if(!instructorDetailes) {
            return res.status(404).json({
                success: false,
                message: "Instructor Details not found"
            });
        }
        // check give category is valid or not
        const categoryDetails = await Tag.findById(category);
        if(!categoryDetails) {
            return res.status(404).json({
                success: false,
                message: "Category Details not found"
            });
        }

        // upload image to cloudinary
        const thumbnailImage = await uploadFileToCloudinary(thumbnail, process.env.FOLDER_NAME);

        // make entry in db
        const newCourseDetails = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetailes._id,
            whatYouWillLearn,
            price,
            tag,
            category: categoryDetails._id,
            thumbnail: thumbnailImage.secure_url,
            status,
            instructions: instructions
        });

        // update user -> course list for instructor
        await User.findByIdAndUpdate(
            {_id: instructorDetailes._id}, 
            {
                $push: {
                    courses: newCourseDetails._id,
                }
            },
            {new : true},
            );

        // update Category ka schema
        await Category.findByIdAndUpdate(
            {_id: category}, 
            {
                $push: {
                    courses: newCourseDetails._id,
                }
            },
            {new : true},
            );

        // return respnse
        return res.status(200).json({
            success: true,
            data: newCourseDetails,
            message: "Course created successfully!"
        });

    } catch(err) {
        console.log("Error while adding course: ", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

// showAllCourses
exports.showAllCourses = async(req, res) => {
    try {   
        const allCourses = await Course.find({}, {
            courseName: true,
            price: true,
            thumbnail: true,
            instructor: true,
            ratingAndReviews: true,
            studentsEnrolled: true
            }).populate("instructor").exec();
        
        // return response
        return res.status(200).json({
            success: true,
            data: allCourses,
            message: "Data for all courses fetched successfully!",
        });

    } catch(err) {
        console.log("Error while fetching all courses: ", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

// getCourseDetails
exports.getCourseDetails = async(req, res) => {
    try {
        // get id
        const {courseId} = req.body;
        // courseDetails
        const courseDetails = await Course.findById(courseId)
            .populate({
                path: "instructor",
                populate: {
                    path: "additionalDetails"
                }
            })
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection"
                }
            })
            .populate("ratingAndReviews")
            .populate("category")
            .exec();
        
        // validation
        if(!courseDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find course with id ${courseId}`
            });
        }
        
        return res.status(200).json({
            success: true,
            message: "Course Details fetched successfully!",
            data: courseDetails,
        })

    } catch(err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: `Internal server error`
        });
    }
}
const Section = require("../models/Section");
const Course = require("../models/Course");

exports.createSection = async(req, res) => {
    try {
        // data fetch
        const {sectionName, courseId} = req.body;
        // validation
        if(!sectionName || !courseId) {
            return res.status(401).json({
                success: false,
                message: "Some fields are missing",
            });
        }
        // create section
        const newSection = await Section.create({sectionName});
        // update course
        const updatedCourseDetails = await Course.findByIdAndUpdate(courseId, 
            {
                $push: {
                    courseContent: newSection._id,
                }
            }, 
            {new : true}).populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            }).exec();
        
        if(!updatedCourseDetails) {
            return res.status(401).json({
                success: false,
                message: "Could not update course",
            });
        }
        // return response
        return res.status(200).json({
            success: true,
            updatedCourseDetails: updatedCourseDetails,
            message: "Section created successfully!",
        });
    } catch(err) {
        console.log("Error: ", err);
        return res.status(500).json({
            success: false,
            message: "Internal server Error",
        });
    }
}


// updateSection handler
exports.updateSection = async(req, res) => {
    try{
        // fetch sectionName from req body
        const {sectionName, sectionId} = req.body;
        // validation
        if(!sectionName || !sectionId) {
            return res.status(404).json({
                success: false,
                message: "Some Fields missing",
            });
        }
        // update in db
        const updatedSection = await Section.findByIdAndUpdate(sectionId, 
            {
               sectionName 
            }, 
            {new: true}
            );
        // return response
        return res.status(200).json({
            success: true,
            message: "Section updated successfully!",
        });

    } catch(err) {
        return res.status(500).json({
            success: false,
            message: "Internal server Error",
        });
    }
}

// deleteSection handler
exports.deleteSection = async(req, res) => {
    try {
        // ID in params
        // fetch sectionId from req.body
        const {sectionId} = req.body;
        const {courseId} = req.body;
        // delete from db
        await Section.findByIdAndDelete(sectionId);
        // HW: do we need to remove section id from course - YES
        await Course.findByIdAndUpdate(courseId, 
            {
                $pull: {
                    courseContent: sectionId,
                }
            });
        // return res
        return res.status(200).json({
            success: true,
            message: "Section deleted successfully!",
        });

    } catch(err) {
        return res.status(500).json({
            success: false,
            message: "Internal server Error",
        });
    }
}
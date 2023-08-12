const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const {uploadFileToCloudinary} = require("../utils/cloudinaryUploader");

// createSubSection handler
exports.createSubSection = async(req, res) => {
    try {
        // get data from req body
        const {sectionId, title, timeDuration, description} = req.body;
        // get video from req file
        const video = req.files.videoFile;
        // validation
        if(!sectionId || !title || !timeDuration || !description || !video) {
            return res.status(400).json({
                success: false,
                message: "Some fields are missing"
            });
        }
        // upload to cloudinary
        const uploadDetails = await uploadFileToCloudinary(video, process.env.FOLDER_NAME);
        // create a sub section
        const subSectionDetails = await SubSection.create({
            title,
            timeDuration,
            description,
            videoUrl: uploadDetails.secure_url,
        });
        // update section with this subsection objid
        const sectionUpdateDetails = await Section.findByIdAndUpdate(sectionId, 
            {
                $push: {
                    subSection: subSectionDetails._id,
                }
            },
            {new: true}).populate("subSection"); 
        // return res
        return res.status(200).json({
            success: true,
            data: sectionUpdateDetails,
            message: "Sub Section created successfully!"
        });

    } catch(err) {
        return res.status(500).json({
            success: false,
            message: "Something wents wrong"
        });
    }
}

// updateSubSection
exports.updateSubSection = async(req, res) => {
    try {
        // fetch data from req body
        const {subSectionId, title, timeDuration, description} = req.body;
        const video = req.files.videoFile;
        
        // validation
        if(!subSectionId) {
            return res.status(403).json({
                success: false,
                message: "MIssing sub-section ID"
            });
        }
        const subSectionDetails = await SubSection.findById(subSectionId);
        if(title) {
            subSectionDetails.title = title;
        }
        if(timeDuration) {
            subSectionDetails.timeDuration = timeDuration;
        }
        if(description) {
            subSectionDetails.description = description;
        }

        // update in db
        await subSectionDetails.save();
        // return response
        return res.status(200).json({
            success: true,
            message: "Sub section updated successfully"
        });

    } catch(err) {
        return res.status(500).json({
            success: false,
            message: "Something wents wrong"
        });
    }
}

// deleteSubSection
exports.deleteSubSection = async(req, res) => {
    try {
        // subSection ID in req params
        // fetch data from req body
        const {subSectionId} = req.params;
        const {sectionId} = req.body;
        // validation
        if(!subSectionId) {
            return res.status(403).json({
                success: false,
                message: "SubSection id missing"
            });
        }
        // delete from db
        await SubSection.findByIdAndDelete(subSectionId);
        // update course
        await Section.findByIdAndUpdate(sectionId, 
            {
                $pull: {
                    subSection: subSectionId,
                }
            });
        // return response
        return res.status(200).json({
            success: true,
            message: "SubSection deleted successfully!"
        });

    } catch(err) {
        return res.status(500).json({
            success: false,
            message: "Something wents wrong"
        });
    }
}
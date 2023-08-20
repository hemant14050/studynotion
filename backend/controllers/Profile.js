const User = require("../models/User");
const Profile = require("../models/Profile");
const {uploadFileToCloudinary} = require("../utils/cloudinaryUploader");

// no need to create now
// method to update profile
exports.updateProfile = async(req, res) => {
    try {
        // get userId
        const userId = req.user.id;
        // get data from req body
        const {dateOfBirth="", about="", contactNumber} = req.body;
        // validation
        if(!contactNumber || !userId) {
            return res.status(403).json({
                success: false,
                message: "Some fields are missing"
            });
        }
        // find and update profile
        const userDetails = await User.findById(userId);
        const profileDetails = await Profile.findById(userDetails.additionalDetailes);

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
            message: "Profile updated successfully!"
        });

    } catch(err) {
        return res.status(500).json({
            success: false,
            message: "Something wents wrong"
        });
    }
}

// deleteAccount
exports.deleteAccount = async(req, res) => {
    try {
        // get userId
        const userId = req.user.id;
        // validation
        if(!userId) {
            return res.status(403).json({
                success: false,
                message: "Id missing"
            });
        }
        const userDetails = await User.findById(userId);
        if(!userDetails) {
            return res.status(403).json({
                success: false,
                message: "User not found"
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
            success: false,
            message: "User Deleted successfully!"
        });

    } catch(err) {
        console.log("Error while deleting user: ", err);
        return res.status(500).json({
            success: false,
            message: "Something wents wrong"
        });
    }
}

// to getUserDetails
exports.getUserDetails = async(req, res) => {
    try{
        // get id
        const userId = req.user.id;
        const userDetails = await User.findById(userId).populate("additionalDetailes").exec();
        return res.status(200).json({
            success: true,
            message: "User data fetched successfully",
            data: userDetails
        });

    } catch(err) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

exports.updateProfilePicture = async (req, res) => {
    try {
      const displayPicture = req.files.displayPicture;
      const userId = req.user.id;
      const image = await uploadFileToCloudinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      );

      console.log(image);
      const updatedProfile = await User.findByIdAndUpdate({ _id: userId },
        { image: image.secure_url },
        { new: true });

      res.status(200).json({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      });

    } catch(err) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
};
  
exports.getEnrolledCourses = async(req, res) => {
    try {
      const userId = req.user.id
      const userDetails = await User.findOne({_id: userId,})
        .populate("courses")
        .exec();

      if(!userDetails) {
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

    } catch(err) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
};
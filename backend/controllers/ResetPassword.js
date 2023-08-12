const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");

//reset password Token
exports.resetPasswordToken = async(req, res) => {
    try {
        // get email req. body
        const {email} = req.body;
        // validate email
        if(!email) {
            return res.status(401).json({
                success: false,
                message: "Email is missing"
            })
        }
        // check user for this email
        const user = await User.findOne({email});
        if(!user) {
            return res.status(401).json({
                success: false,
                message: "Your email is not registered with us"
            })
        }
        // generate token
        const token = crypto.randomUUID();
        // update user by adding token and expiration
        const updatedUserDetails = await User.findOneAndUpdate({email: email}, {
            token: token,
            resetPasswordToken: Date.now() + 2*60*60*1000,
        }, {new: true});
        // new: true for update doc to return

        // make frontend link based on token
        const url = `http://localhost:3000/update-password/${token}`;
        // send mail containing url
        await mailSender(
            email, 
            "Password Reset Link", 
            `Password Reset Link: ${url}. Please click on this link to reset your password.`);
        // return response
        return res.status(200).json({
            success: true,
            message: "Email sent successfully, please check mail and change password"
        });

    } catch(err) {
        console.log("Error: ", err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

//reset password
exports.resetPassword = async(req, res) => {
    try {
        // data fetch
        const {password, confirmPassword, token} = req.body;
        // validation
        if(!password || !confirmPassword) {
            return res.status(401).json({
                success: false,
                message: "All fields are required"
            })
        }
        if(password !== confirmPassword) {
            return res.status(401).json({
                success: false,
                message: "Password and confirm password should match"
            })
        }
        // get userdetails from db using token
        const userDetails = await User.findOne({token: token});
        // if no entry --invalid token
        if(!userDetails) {
            return res.status(401).json({
                success: false,
                message: "Token is invalid"
            });
        }
        // check token expires
        if(userDetails.resetPasswordExpires < Date.now()) {
            return res.status(403).json({
                success: false,
                message: "Token expired, please regenerate"
            });
        }
        // hashPassword
        const hashedPassword = await bcrypt.hash(password, 10);
        // update password in db
        await User.findOneAndUpdate({token: token}, 
            {password: hashedPassword},
            {new: true});
        // return response
        return res.status(200).json({
            success: false,
            message: "Password reset successfully!"
        });

    } catch(err) {
        console.log("Error: ", err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}



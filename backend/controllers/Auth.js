const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const Profile = require("../models/Profile");
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailSender");
require("dotenv").config();

//sendOTP
exports.sendOTP = async (req, res) => {
    try {
        //fetch email from req body
        const {email} = req.body;

        // check if user alredy exists
        const chechUserExists = await User.findOne({email});

        //if exists, return response
        if(chechUserExists) {
            return res.status(401).json({
                success: false,
                message: "User already registered",
            })
        }

        // generate OTP
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
        console.log("OTP generated: ", otp);
        
        //check otp is unique or not  -- THIS CODE BLOCK MAKES TO TO MUCH DB CALLS
        const resultOTP = await OTP.findOne({otp: otp});
        while(resultOTP) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            resultOTP = await OTP.findOne({otp: otp});
        }

        // create object of otp
        const otpPayload = {email, otp};
        // create an entry in DB
        const newOTP = await OTP.create(otpPayload);
        console.log("newOTP: ", newOTP);

        //return response successfully
        res.status(200).json({
            success: true,
            message: "OTP sent Successfully",
        })

    } catch(err) {
        console.log("Error: ", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        })
    }
}

//signup
exports.signUp = async(req, res) => {
    try {

        // fetch data from req body
        const {firstName, lastName, email, password, confirmPassword, accountType, contactNumber, otp} = req.body;

        // validate data
        if(!firstName || !lastName || !email || !password || !confirmPassword || !contactNumber || !otp) {
            return res.status(403).json({
                success: false,
                message: "All fields are required",
            });
        }

        // match 2 password
        if(password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password and Confirm password does not match.",
            });
        }

        // check user already exists in db
        const userExists = await User.findOne({email});
        if(userExists) {
            return res.status(401).json({
                success: false,
                message: "User is already exists",
            });
        }

        // find most recent OTP stored for user
        const recentOtp = await OTP.find({email}).sort({createdAt: -1}).limit(1);
        console.log("recentOtp: ", recentOtp);
        // validate otp
        if(recentOtp.length === 0) {
            return res.status(400).json({
                success: false,
                message: "OTP is not valid",
            });
        } else if(otp !== recentOtp[0].otp) {
            // invalid otp
            return res.status(400).json({
                success: false,
                message: "Invalid OTP",
            });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create entry in db
        const profileDetailes = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: contactNumber,
        });
        const userPayload = {
            firstName,
            lastName, 
            email, 
            password: hashedPassword, 
            accountType,
            additionalDetailes: profileDetailes._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}%20${lastName}`,
        }; 
        const newUser = await User.create(userPayload);
        // console.log("newUser: ", newUser);

        // return response successfully
        return res.status(200).json({
            success: true,
            message: "User is registered successfully",
            user: newUser,
        });

    } catch(err) {
        console.log("Error: ", err);
        return res.status(500).json({
            success: false,
            message: "Something wents wrong",
        });
    }
}

//login
exports.login = async(req, res) => {
    try {
        // get data from req body
        const {email, password} = req.body;
        // validate data
        if(!email || !password) {
            // 400 Bad Request
            return res.status(400).json({
                success: false,
                message: "All fields are required!"
            });
        }
        // check user exists
        const user = await User.findOne({email}).populate("additionalDetailes");
        if(!user) {
            // 401 Unauthorized
            return res.status(401).json({
                success: false,
                message: "User not registered, Please signUP"
            });
        }
        // match pass if match // generate JWT 
        if(await bcrypt.compare(password, user.password)) {
            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType,
            }
            
            const token = jwt.sign(payload, process.env.JWT_SECRETE, {
                expiresIn: "24h",
            });
            user.token = token;
            user.password = undefined;

            // create cookie and send response
            const options = {
                expires: new Date(Data.now() + 3*24*60*60*1000),
                httpOnly: true,
            }
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "User logged in successfully"
            })
        } else {
            return res.status(401).json({
                success: false,
                message: "Password is incorrect!"
            });
        }


    } catch(err) {
        console.log("Error in login: ", err);
        // 500 Internal Server Error
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

//change password
exports.changePassword = async(req, res) => {
    try {
        // get user data req.user
        const userDetails = await User.findById(req.user.id);
        // get data from req body
        // get oldPassword, newPassword, confirmNewPassword
        const {oldPassword, newPassword, confirmNewPassword} = req.body;
        // validation
        if(!email || !oldPassword || !newPassword || !confirmNewPassword) {
            return res.status(401).json({
                success: false,
                message: "All fields are required"
            });
        }
        // pass and confirm pass
        if(newPassword !== confirmNewPassword) {
            return res.status(401).json({
                success: false,
                message: "New password and confirm new Password should match"
            });
        }
        if(!userDetails) {
            return res.status(401).json({
                success: false,
                message: "User does not exists"
            });
        }
        if(await bcrypt.compare(userDetails.password, password)) {
            const hashedNewPassword = await bcrypt.hash(newPassword, 10);
            // update in db by encrypting
            const upadatedUserDetails = await User.findOneAndUpdate(req.user.id,
                {password: hashedNewPassword},
                {new: true});

            // send mail password Updated successfully
            try {
                const emailResponse = await mailSender(upadatedUserDetails.email, 
                    `StudyNotion - Password Updated`,
                    `Password updated for user ${upadatedUserDetails.firstName} ${upadatedUserDetails.lastName}`
                    );

                console.log("Email sent successfully: ", emailResponse);

            } catch(err) {
                console.log("Error while sending mail: ", err);
                return res.status(500).json({
                    success: false,
                    message: "Error occurred while sending email",
                });
            }
                
            return res.status(200).json({
                success: false,
                message: "Password updated successfully!"
            });

        } else {
            return res.status(401).json({
                success: false,
                message: "Password is incorrect!"
            });
        }
        // update in db by encrypting


    } catch(err) {
        console.log("Error: ", err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}
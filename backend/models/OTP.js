const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

const OTPSchema = new mongoose.Schema({
    email: {
        type: String, 
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 5*60, // expires in five minutes
    }
});

// function which sends emails for otp
async function sendVerificationEmail(email, otp) {
    try {
        const mailResponse = await mailSender(email, "Verification Email from StudyNotion", `Your OTP is ${otp}`);
        console.log("Email sent Successfully!", mailResponse);
        
    } catch(err) {
        // error occured while sending-email
        console.log("Error while sending verification mail!", err);
        throw err;
    }
}

OTPSchema.pre("save", async function(next){
    await sendVerificationEmail(this.email, this.otp);
    next();
});

module.exports = mongoose.model("OTP", OTPSchema);
const mongoose = require("mongoose");

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

module.exports = mongoose.model("OTP", OTPSchema);
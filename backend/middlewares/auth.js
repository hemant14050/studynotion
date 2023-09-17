const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

//auth
exports.auth = async(req, res, next) => {
    try {
        // extract token
        const token = req.cookies.token || req.body || req.header("Authorization").replace("Bearer ", "");
        // if token missing return res
        if(!token) {
            return res.status(401).json({
                success: false,
                message: "Token is missing"
            })
        }

        // verify token
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            // console.log(decode);
            req.user = decode;

        } catch(err) {
            return res.status(401).json({
                success: false,
                message: "Token is Invalid"
            })
        }
        next();

    } catch(err) {
        console.log("error in middlleware: ", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

//isStudent
exports.isStudent = async(req, res, next) => {
    try {
        if(req.user.accountType !== "Student") {
            return res.status(401).json({
                success: false,
                message: "This is protected route for students",
            })
        }
        
        next();

    } catch(err) {
        console.log("error in middlleware: ", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

//isInstructor
exports.isInstructor = async(req, res, next) => {
    try {
        if(req.user.accountType !== "Instructor") {
            return res.status(401).json({
                success: false,
                message: "This is protected route for Instructor",
            })
        }
        
        next();

    } catch(err) {
        console.log("error in middlleware: ", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

//isAdmin
exports.isAdmin = async(req, res, next) => {
    try {
        if(req.user.accountType !== "Admin") {
            return res.status(401).json({
                success: false,
                message: "This is protected route for Admin",
            })
        }
        
        next();

    } catch(err) {
        console.log("error in middlleware: ", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}
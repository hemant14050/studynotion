const mongoose = require("mongoose");
require("dotenv").config();

exports.connectDB = async () => {
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=> {
        console.log("Connected to DB Successfully!");
    })
    .catch((err)=> {
        console.log("DB Connection failed!");
        console.log(err);
        process.exit(1);
    })
}
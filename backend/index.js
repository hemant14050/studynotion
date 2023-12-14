const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
const courseRoutes = require("./routes/Course");
const profileRoutes = require("./routes/Profile");

const db = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { connectCloudinary } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 4000;

// connect to DB
db.connectDB();
// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/uploads/temp",
  })
);

// connect cloud
connectCloudinary();

// mount routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/profile", profileRoutes);

// TEST MAIL
// const mailSender = require("./utils/mailSender");
// mailSender("patilhemant14050@gmail.com", "Test!", "Test from Hemant - EdTech Project");

app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "The 'STUDY NOTION' SERVER is UP and RUNNING!",
  });
});

app.listen(PORT, () => {
  console.log(`Server running at PORT: ${PORT}`);
});

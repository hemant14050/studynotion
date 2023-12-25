const cloudinary = require("cloudinary").v2;
const fs = require("fs");

exports.uploadFileToCloudinary = async (file, folder, height, quality) => {
  const options = { folder };
  if (height) {
    options.height = height;
  }
  if (quality) {
    options.quality = quality;
  }
  options.resource_type = "auto";
  const image = await cloudinary.uploader.upload(file.tempFilePath, options);
  fs.unlink(file.tempFilePath, () => {
    console.log("Temp file deleted");
  });
  return image;
};

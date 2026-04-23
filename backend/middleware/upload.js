const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

module.exports = upload;

// const uploadImage = async (imagePath) => {

//     // Use the uploaded file's name as the asset's public ID and
//     // allow overwriting the asset with new versions
//     const options = {
//       use_filename: true,
//       unique_filename: false,
//       overwrite: true,
//     };

//     try {
//       // Upload the image
//       const result = await cloudinary.uploader.upload(imagePath, options);
//       console.log(result);
//       return result.public_id;
//     } catch (error) {
//       console.error(error);
//     }
// };

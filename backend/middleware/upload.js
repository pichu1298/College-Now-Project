const multer = require("multer");

// store in memory (better for Cloudinary)
const storage = multer.memoryStorage();

const upload = multer({ storage });

// IMPORTANT: match the field name from frontend
module.exports = upload.single("image");

const multer = require("multer");
const path = require("path");

// Set up multer storage engine to save uploaded images
// Set up multer storage engine to save uploaded images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Folder where images will be stored
  },
  filename: (req, file, cb) => {
    // Create unique filename using current timestamp and file extension
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Create multer upload instance with limits and storage configuration
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit to 10MB per file
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif|pdf/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb("Error: Only image files are allowed!");
    }
  },
});

module.exports = upload;

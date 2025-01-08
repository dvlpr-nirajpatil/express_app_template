const express = require("express");
const router = express.Router();
const upload = require("../utils/uploads");
const response = require("../utils/response");
const multer = require("multer");

router.post("/upload", (req, res, next) => {
  upload.array("files", 5)(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // Handle multer-specific errors (e.g., file size limit exceeded)

      return response(res, 400, "Something went wrong", null, err.message);
    } else if (err) {
      // Handle other errors (e.g., invalid file types)
      return response(res, 400, "Something went wrong", null, err.message);
    }

    if (!req.files || req.files.length === 0) {
      return response(res, 400, "No files uploaded");
    }

    const filePaths = req.files.map((file) => `/uploads/${file.filename}`);
    return response(res, 200, "Files uploaded successfully!", filePaths);
  });
});

module.exports = router;

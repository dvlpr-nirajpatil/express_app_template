const express = require("express");
const router = express.Router();
const uploadFiles = require("../middlewares/uploads");
const response = require("../utils/response");

router.post("/upload", uploadFiles, (req, res) => {
  if (req.files && req.files.length > 0) {
    return response(res, 201, "Files uploaded successfully!", req.files);
  }
  return response(res, 100, "No Files uploaded", req.files);
});

module.exports = router;

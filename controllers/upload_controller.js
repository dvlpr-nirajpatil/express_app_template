const logger = require("../utils/logger");
const response = require("../utils/response");

const uploadFiles = (req, res) => {
  logger.info(req);
  if (!req.files || req.files.length === 0) {
    response(res, 400, "No files uploaded");
  }

  // Generate file paths for all uploaded images
  const filePaths = req.files.map((file) => `/uploads/${file.filename}`);

  response(res, 200, "Files uploaded successfully!", filePaths);
};

module.exports = uploadFiles;

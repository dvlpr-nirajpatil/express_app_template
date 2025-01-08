const mongoose = require("mongoose");
const logger = require("../utils/logger");

exports.connect = async function () {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      logger.info("DB CONNECTION SUCCESSFULL");
    })
    .catch((e) => {
      logger.error(e);
    });
};

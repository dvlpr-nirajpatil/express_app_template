const express = require("express");
const dotenv = require("dotenv");
const db = require("./config/db_con");
const userRoutes = require("./routes/users_routes");
const logger = require("./utils/logger");
const winstonMorganMiddleware = require("./middlewares/winston_morgan");

// INITIALIZATION
dotenv.config();
db.connect();
const app = express();

//MIDDLEWARES

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(winstonMorganMiddleware(logger));

app.use("/api/v1", userRoutes.router);

//STREAMS
app.listen(process.env.PORT, () => {
  logger.info(`SERVER IS RUNNING ON PORT ${process.env.PORT}`);
});

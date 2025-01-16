const express = require("express");
const tokenController = require("../controllers/token_controller");

const router = express.Router();

router.get("/refreshToken", tokenController.refreshToken);

module.exports = router;

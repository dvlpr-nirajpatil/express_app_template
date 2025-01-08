const express = require("express");
const users_controller = require("../controllers/users_controller");

const router = express.Router(); // Correct method to create a router

router.post("/user", users_controller.addUser);
router.get("/user", users_controller.getUsers);
router.get("/user/:id", users_controller.getUserById);
router.delete("/user/:id", users_controller.deleteUserById);

module.exports = router;

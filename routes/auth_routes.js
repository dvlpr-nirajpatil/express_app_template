const express = require("express");
const emailAuthController = require("../controllers/email_auth_controller");
const socialAuthController = require("../controllers/social_auth_controller");
const router = express.Router();

router.post("/signin", emailAuthController.signIn);
router.post("/signup", emailAuthController.signUp);
router.post("/googleSignIn", socialAuthController.signInWithGoogle);
router.post("/appleSignIn", socialAuthController.signInWithApple);

module.exports = router;

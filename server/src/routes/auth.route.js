const express = require("express");
const AuthController = require("../controllers/auth.controller");
const verifyToken = require("../middlewares/verifyToken.middleware");
const router = express.Router();

router.post("/signUp", AuthController.signUp);
router.post("/signIn", AuthController.signIn);
router.get("/refreshToken", AuthController.refreshToken);
router.post("/signOut", verifyToken, AuthController.signOut);
router.post("/forgotPassword", AuthController.forgotPassword);
router.post("/verifyRecovery", AuthController.verifyRecovery);
router.post("/resetPassword", AuthController.resetPassword);

module.exports = router;

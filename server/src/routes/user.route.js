const express = require("express");
const UserController = require("../controllers/user.controller");
const verifyToken = require("../middlewares/verifyToken.middleware");

const router = express.Router();

router.get("/get", verifyToken, UserController.getMe);

module.exports = router;

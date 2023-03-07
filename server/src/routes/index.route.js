const express = require("express");
const router = express.Router();

router.use("/api/product", require("./product.route"));
router.use("/api/image", require("./upload.route"));
router.use("/api/auth", require("./auth.route"));
router.use("/api/user", require("./user.route"));

module.exports = router;

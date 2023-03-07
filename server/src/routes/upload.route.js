const express = require("express");
const asyncWrapperMiddleware = require("../middlewares/asyncWrapper.middleware");
const upload = require("../middlewares/upload.middleware");

const router = express.Router();

router.post(
  "/upload",
  // mutiple upload images upload.array(fieldName,maxImageUpload)
  upload.array("images", 20),
  asyncWrapperMiddleware(async (req, res) => {
    if (!req.files) {
      const newError = new Error("Không có hình ảnh để tải lên.");
      newError.statusCode = 400;
      throw newError;
    }

    // Get url server
    // req.protocol: http | https
    // req.get("host"): localhost:5000
    const url = `${req.protocol}://${req.get("host")}`;

    const images = req.files.map(
      (file) => url + "/images/" + file.originalname
    );

    res.status(201).json({
      message: "Tải ảnh lên thành công.",
      images,
    });
  })
);

module.exports = router;

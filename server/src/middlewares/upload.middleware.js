const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, path.join(__dirname, "/../views/"));
  },
  filename: function (_req, file, cb) {
    cb(null, file.originalname);
  },
});

function fileFilter(_req, file, cb) {
  const filetype = file.mimetype.split("/"); // Ex: ["image","png"]
  if (filetype[0] === "image") {
    cb(null, true);
  } else {
    const error = new Error("Không phải hình ảnh. Vui lòng thử lại!");
    error.statusCode = 400;
    return cb(error, false);
  }
}

const upload = multer({
  storage: storage,
  fileFilter,
});

module.exports = upload;

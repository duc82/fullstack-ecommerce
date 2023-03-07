const express = require("express");
const asyncWrapperMiddleware = require("../middlewares/asyncWrapper.middleware");
const sequelize = require("../configs/db.config");
const productController = require("../controllers/product.controller");

const router = express.Router();

router.get("/get/:category", productController.getProduct);

router.get("/getProductBySlug/:slug", productController.getProductBySlug);

router.post("/create", productController.createProduct);

router.put("/update", productController.updateProduct);

router.delete("/delete", productController.deleteProduct);

router.delete(
  "/delete/all",
  asyncWrapperMiddleware(async (req, res) => {
    await sequelize.query(
      `TRUNCATE TABLE "Images" RESTART IDENTITY CASCADE;
       TRUNCATE TABLE "Reviews" RESTART IDENTITY CASCADE;
       TRUNCATE TABLE "Tags" RESTART IDENTITY CASCADE;
       TRUNCATE TABLE "Products" RESTART IDENTITY CASCADE;`
    );

    res.status(200).json({
      message: "Xóa thành công tất cả sản phẩm",
    });
  })
);

module.exports = router;

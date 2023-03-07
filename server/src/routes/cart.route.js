const express = require("express");
const CartController = require("../controllers/cart.controller");
const router = express.Router();

router.get("/get", CartController.getCart);

router.post("/add", CartController.addCart);

module.exports = router;

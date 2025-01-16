const productController = require("../controllers/product_controller");
const protect = require("../middlewares/protected_route");
const express = require("express");

const router = express.Router();

router.post("/product", protect, productController.addProduct);
router.get("/product/:id", protect, productController.getProduct);
router.get("/product/", protect, productController.getProducts);
router.put("/product/:id", protect, productController.updateProduct);

module.exports = router;
